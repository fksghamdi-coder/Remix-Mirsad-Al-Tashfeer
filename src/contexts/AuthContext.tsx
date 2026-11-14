import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getSession,
  setSession as saveLocalSession,
  UserSession,
  clearSession,
  initializeAuth,
  isGuestMode,
  enterGuestMode,
  exitGuestMode,
} from '@/lib/auth';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { sanitizeId, truncateString } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { initSyncEngine } from '@/lib/syncEngine';
import { registerSession, clearToken } from '@/lib/sessionManager';
import { recordRealLoginActivity } from '@/lib/centralAdminDB';

interface AuthCtx {
  session: UserSession | null;
  isLoading: boolean;
  isGuest: boolean;
  isFirebaseConnected: boolean;
  refresh: () => void;
  logout: () => Promise<void>;
  loginAsGuest: () => void;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthCtx>({
  session: null,
  isLoading: true,
  isGuest: false,
  isFirebaseConnected: false,
  refresh: () => {},
  logout: async () => {},
  loginAsGuest: () => {},
  loginWithGoogle: async () => ({ success: false }),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(() => {
    try {
      return isGuestMode() ? null : getSession();
    } catch {
      return null;
    }
  });
  const [isGuest, setIsGuest] = useState<boolean>(() => {
    try {
      return isGuestMode();
    } catch {
      return false;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const navigate = useNavigate();

  const refresh = () => {
    const s = getSession();
    // 🚨 قاعدة ذهبية: الزائر ليس لديه جلسة أبداً
    const guest = isGuestMode();
    if (guest) {
      // إذا كانت هناك جلسة قديمة عالقة، نظّفها
      if (s) clearSession();
      setSession(null);
      setIsGuest(true);
    } else {
      setSession(s);
      setIsGuest(false);
    }
  };

  const logout = async () => {
    const active = session || getSession();
    if (active && active.username && active.username !== '__guest__') {
      try {
        await recordRealLoginActivity({
          username: active.username,
          fullName: active.fullName || active.username,
          academicId: active.username,
          role: active.role,
          status: 'logout',
          authMethod: active.authMode === 'firebase' ? 'google_oauth' : 'password',
        });
      } catch {
        // ignore
      }
    }
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
    } catch {
      // ignore
    }
    clearSession(); // مسح من localStorage
    clearToken(); // مسح JWT token
    exitGuestMode(); // مسح علامة الزائر
    setSession(null);
    setIsGuest(false);
    navigate('/login');
  };

  const loginAsGuest = () => {
    // 🚨 الحل الجذري: امسح أي جلسة قديمة أولاً
    clearSession();
    clearToken();
    setSession(null);
    enterGuestMode();
    setIsGuest(true);
    navigate('/main?mode=guest');
  };

  useEffect(() => {
    initSyncEngine();
    let unsub: (() => void) | undefined;

    (async () => {
      try {
        await Promise.race([
          initializeAuth(),
          new Promise((resolve) => setTimeout(resolve, 1500)),
        ]);
      } catch (err) {
        console.warn('[Auth] Local initialization warning:', err);
      }

      const s = getSession();
      const guest = isGuestMode();

      if (s && !guest) {
        registerSession(s.username, s.role).catch(() => {});
      }

      // 🚨 إذا كان الزائر لكن هناك جلسة عالقة → نظّفها فوراً
      if (guest && s) {
        clearSession();
        setSession(null);
        setIsGuest(true);
      } else if (guest) {
        setSession(null);
        setIsGuest(true);
      } else {
        setSession(s);
        setIsGuest(false);
      }
      setIsLoading(false);

      try {
        unsub = onAuthStateChanged(auth, async fbUser => {
        if (fbUser) {
          exitGuestMode();
          setIsFirebaseConnected(true);
          const uid = sanitizeId(fbUser.uid);
          const isBootstrappedAdmin =
            fbUser.emailVerified && fbUser.email === 'fk.sghamdi@gmail.com';
          const userRef = doc(db, 'users', uid);

          try {
            const snap = await getDoc(userRef);
            let role: 'admin' | 'user' = isBootstrappedAdmin ? 'admin' : 'user';
            let displayName = truncateString(
              fbUser.displayName || fbUser.email?.split('@')[0] || 'مستخدم مِرْصَاد',
              100,
              1,
              'مستخدم'
            );
            let username = truncateString(
              (fbUser.email?.split('@')[0] || uid).replace(/[^a-zA-Z0-9_\-.]/g, '_'),
              64,
              3,
              'user_1'
            );

            if (snap.exists()) {
              const data = snap.data();
              role = isBootstrappedAdmin ? 'admin' : (data.role as 'admin' | 'user') || 'user';
              displayName = data.displayName || displayName;
              username = data.username || username;
            } else if (fbUser.emailVerified) {
              await setDoc(userRef, {
                uid,
                username,
                displayName,
                role,
                needsPasswordChange: false,
                completedChapters: [1],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              });
            }

            const newSession: UserSession = {
              uid,
              username,
              fullName: displayName,
              displayName,
              role,
              needs_password_change: false,
              authMode: 'firebase',
              loginTime: Date.now(),
            };
            saveLocalSession(newSession);
            setSession(newSession);
            setIsGuest(false);
          } catch (error) {
            console.warn('Firestore profile sync warning:', error);
            const fallbackName = fbUser.displayName || fbUser.email || 'مستخدم السحابة';
            const fallbackSession: UserSession = {
              uid,
              username: truncateString(
                fbUser.email?.split('@')[0] || 'user_fb',
                64,
                3,
                'user_fb'
              ),
              fullName: fallbackName,
              displayName: fallbackName,
              role: isBootstrappedAdmin ? 'admin' : 'user',
              needs_password_change: false,
              authMode: 'firebase',
              loginTime: Date.now(),
            };
            saveLocalSession(fallbackSession);
            setSession(fallbackSession);
            setIsGuest(false);
          }
        } else {
          setIsFirebaseConnected(false);
          const currentLocal = getSession();
          const currentGuest = isGuestMode();
          if (currentGuest) {
            if (currentLocal) clearSession();
            setSession(null);
            setIsGuest(true);
          } else if (currentLocal) {
            setSession(currentLocal);
            setIsGuest(false);
          } else {
            setSession(null);
            setIsGuest(false);
          }
        }
          setIsLoading(false);
        });
      } catch (err) {
        console.warn('[Auth] Firebase listener warning:', err);
        setIsLoading(false);
      }
    })();

    return () => {
      if (unsub) unsub();
    };
  }, []);

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      if (cred.user) {
        exitGuestMode();
        const uid = sanitizeId(cred.user.uid);
        const logId = sanitizeId(`log_${Date.now()}_${uid.slice(0, 8)}`);
        const isBootstrappedAdmin =
          cred.user.emailVerified && cred.user.email === 'fk.sghamdi@gmail.com';
        const displayName = truncateString(
          cred.user.displayName || cred.user.email?.split('@')[0] || 'User',
          100,
          1,
          'User'
        );
        const username = truncateString(
          (cred.user.email?.split('@')[0] || uid).replace(/[^a-zA-Z0-9_\-.]/g, '_'),
          64,
          3,
          'user_1'
        );
        try {
          await recordRealLoginActivity({
            username,
            fullName: displayName,
            academicId: uid,
            role: isBootstrappedAdmin ? 'admin' : 'user',
            status: 'success',
            authMethod: 'google_oauth',
            note: 'تسجيل دخول موثق عبر مصادقة Google السحابية المركزية',
          });
        } catch {
          // ignore
        }
        if (cred.user.emailVerified) {
          try {
            await setDoc(doc(db, 'audit_logs', logId), {
              uid,
              actorName: displayName,
              action: 'GOOGLE_OAUTH_LOGIN',
              category: 'auth',
              details: 'تسجيل دخول موثق عبر مصادقة Google السحابية المركزية',
              createdAt: serverTimestamp(),
            });
          } catch (err) {
            handleFirestoreError(err, OperationType.CREATE, `audit_logs/${logId}`);
          }
        }
        return { success: true };
      }
      return { success: false, error: 'لم تكتمل عملية المصادقة' };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر تسجيل الدخول عبر Google';
      return {
        success: false,
        error: msg,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        isGuest,
        isFirebaseConnected,
        refresh,
        logout,
        loginAsGuest,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
