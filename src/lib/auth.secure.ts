import { sanitizeId, truncateString } from '@/lib/utils';
import { auth, db, googleProvider } from './firebase';
import { SyncEngine } from './syncEngine';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

export interface UserSession {
  uid: string;
  username: string;
  fullName: string;
  displayName: string;
  role: 'admin' | 'user';
  needs_password_change: boolean;
  authMode: 'firebase' | 'local';
  loginTime: number;
}

const SESSION_KEY = 'mirsad_session_v2';
const GUEST_KEY = 'mirsad_guest_mode';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 أيام موحدة
void SyncEngine;

/** التحقق من دور المشرف عبر Firestore فقط */
export async function isAdminUser(uid: string): Promise<boolean> {
  try {
    const adminRef = doc(db, 'admins', uid);
    const adminSnap = await getDoc(adminRef);
    if (adminSnap.exists()) return true;
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) return userSnap.data()?.role === 'admin';
    return false;
  } catch {
    return false;
  }
}

export async function getAdminEmails(): Promise<string[]> {
  try {
    const snap = await getDocs(collection(db, 'admins'));
    return snap.docs.map((d) => String(d.data()?.email || d.id)).filter(Boolean);
  } catch {
    return [];
  }
}

export function getSession(): UserSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as UserSession;
    if (Date.now() - session.loginTime > SESSION_DURATION) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function setSession(session: UserSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
export function enterGuestMode(): void {
  localStorage.setItem(GUEST_KEY, 'true');
}
export function exitGuestMode(): void {
  localStorage.removeItem(GUEST_KEY);
}
export function isGuestMode(): boolean {
  return localStorage.getItem(GUEST_KEY) === 'true';
}

export async function loginWithGoogle(): Promise<{ success: boolean; session?: UserSession; error?: string }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (!user.emailVerified) {
      await signOut(auth);
      return { success: false, error: 'يجب التحقق من البريد أولاً' };
    }

    const uid = sanitizeId(user.uid);
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);

    let role: 'admin' | 'user' = 'user';
    let displayName = truncateString(user.displayName || user.email?.split('@')[0] || 'مستخدم', 100, 1, 'مستخدم');
    let username = truncateString((user.email?.split('@')[0] || uid).replace(/[^a-zA-Z0-9_\-.]/g, '_'), 64, 3, 'user');

    if (snap.exists()) {
      const data = snap.data();
      role = data.role === 'admin' ? 'admin' : 'user';
      displayName = data.displayName || displayName;
      username = data.username || username;
    } else {
      await setDoc(userRef, {
        uid,
        username,
        displayName,
        role,
        needsPasswordChange: false,
        completedChapters: [1],
        createdAt: serverTimestamp(),
      });
    }

    const session: UserSession = {
      uid,
      username,
      fullName: displayName,
      displayName,
      role,
      needs_password_change: false,
      authMode: 'firebase',
      loginTime: Date.now(),
    };
    setSession(session);
    return { success: true, session };
  } catch (err: unknown) {
    const e = err as { code?: string; message?: string };
    return {
      success: false,
      error: e.code === 'auth/popup-closed-by-user' ? 'تم إغلاق نافذة التسجيل' : e.message || 'تعذر تسجيل الدخول',
    };
  }
}

export async function loginWithEmail(
  email: string,
  password: string
): Promise<{ success: boolean; session?: UserSession; error?: string }> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const uid = sanitizeId(user.uid);
    const snap = await getDoc(doc(db, 'users', uid));
    const data = snap.exists() ? snap.data() : null;
    const role: 'admin' | 'user' = data?.role === 'admin' ? 'admin' : 'user';
    const displayName = data?.displayName || user.displayName || email.split('@')[0];
    const username = data?.username || email.split('@')[0];
    const session: UserSession = {
      uid,
      username,
      fullName: displayName,
      displayName,
      role,
      needs_password_change: Boolean(data?.needsPasswordChange),
      authMode: 'firebase',
      loginTime: Date.now(),
    };
    setSession(session);
    return { success: true, session };
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message || 'تعذر تسجيل الدخول' };
  }
}

export async function registerUser(
  email: string,
  password: string,
  username: string,
  displayName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const uid = sanitizeId(result.user.uid);
    await setDoc(doc(db, 'users', uid), {
      uid,
      username: sanitizeId(username),
      displayName: truncateString(displayName, 100),
      role: 'user',
      needsPasswordChange: true,
      completedChapters: [1],
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message || 'تعذر إنشاء الحساب' };
  }
}

export const registerWithEmail = registerUser;

export async function requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message || 'تعذر إرسال رابط الاستعادة' };
  }
}

export async function changePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!auth.currentUser) return { success: false, error: 'غير مسجل الدخول' };
    await updatePassword(auth.currentUser, newPassword);
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message || 'تعذر تحديث كلمة المرور' };
  }
}

export async function logoutUser(): Promise<void> {
  try {
    if (auth.currentUser) await signOut(auth);
  } catch {
    /* ignore */
  }
  clearSession();
  exitGuestMode();
}

export async function grantAdminRole(uid: string): Promise<{ success: boolean; error?: string }> {
  try {
    await setDoc(doc(db, 'admins', uid), { uid, grantedAt: serverTimestamp(), grantedBy: auth.currentUser?.uid }, { merge: true });
    await updateDoc(doc(db, 'users', uid), { role: 'admin' });
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message || 'تعذر منح الصلاحية' };
  }
}


export async function revokeAdminRole(uid: string): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteDoc(doc(db, 'admins', uid));
    await updateDoc(doc(db, 'users', uid), { role: 'user' });
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: (err as Error).message || 'تعذر سحب الصلاحية' };
  }
}

export const setAdminRole = grantAdminRole;
export const removeAdminRole = revokeAdminRole;

export function onAuthStateChange(callback: (session: UserSession | null, isGuest: boolean) => void) {
  return onAuthStateChanged(auth, async (fbUser) => {
    const guest = isGuestMode();
    if (fbUser) {
      exitGuestMode();
      const uid = sanitizeId(fbUser.uid);
      const userRef = doc(db, 'users', uid);
      const snap = await getDoc(userRef);
      let role: 'admin' | 'user' = 'user';
      let displayName = truncateString(fbUser.displayName || fbUser.email?.split('@')[0] || 'مستخدم', 100);
      let username = truncateString((fbUser.email?.split('@')[0] || uid).replace(/[^a-zA-Z0-9_\-.]/g, '_'), 64, 3, 'user');
      if (snap.exists()) {
        const data = snap.data();
        role = data.role === 'admin' ? 'admin' : 'user';
        displayName = data.displayName || displayName;
        username = data.username || username;
      }
      const session: UserSession = {
        uid,
        username,
        fullName: displayName,
        displayName,
        role,
        needs_password_change: false,
        authMode: 'firebase',
        loginTime: Date.now(),
      };
      setSession(session);
      callback(session, false);
    } else {
      const currentSession = getSession();
      callback(currentSession, guest);
    }
  });
}
