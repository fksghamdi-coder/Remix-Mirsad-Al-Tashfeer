# الملف الأول المستقل الكامل: `src/lib/centralAdminDB.ts`

```typescript
// File: src/lib/centralAdminDB.ts
import { db as firestoreDB } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { writeAuditLog } from './audit';
import { encrypt, signHMAC, sha256 } from './crypto';

export interface LoginActivityRecord {
  id: string;
  username: string;
  fullName: string;
  academicId: string;
  role: 'admin' | 'doctor' | 'user' | 'guest';
  status: 'success' | 'failed' | 'logout';
  authMethod: 'password' | 'google_oauth' | 'admin_reset';
  timestamp: number;
  isoDate: string;
  userAgent: string;
  note: string;
  encryptedPayload?: string;
  hmacSignature?: string;
  prevHash?: string;
  hash?: string;
}

export interface CentralAccountOverride {
  username: string;
  academicId?: string;
  fullName?: string;
  phone?: string;
  role?: 'admin' | 'doctor' | 'user' | 'guest';
  password?: string;
  passwordHash?: string;
  passwordSalt?: string;
  isDeleted?: boolean;
  lastLoginAt?: number;
  loginCount?: number;
  createdAt?: number;
  updatedAt: number;
}

const LOGIN_LOGS_STORAGE_KEY = 'mirsad_real_login_logs_v1';
const ACCOUNT_OVERRIDES_STORAGE_KEY = 'mirsad_central_account_overrides_v1';
const DELETED_USERS_STORAGE_KEY = 'mirsad_deleted_users_v1';
const ACTIVE_PASSWORDS_STORAGE_KEY = 'mirsad_user_active_passwords_v1';
const ONE_TIME_INITIAL_PURGE_KEY = 'mirsad_initial_10_students_purged_v3';

function hasLocalStorage(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

/**
 * تثبيت علامة التهيئة دون مسح أي حساب جديد يضيفه الأدمن أو يسجله المستخدمون
 */
export async function purgeAllNonAdminAccountsAndSecrets(): Promise<void> {
  if (!hasLocalStorage()) return;
  try {
    if (localStorage.getItem(ONE_TIME_INITIAL_PURGE_KEY) !== '1') {
      localStorage.setItem(ONE_TIME_INITIAL_PURGE_KEY, '1');
    }
  } catch {
    // ignore
  }
}

export function getLocalAccountOverrides(): Record<string, CentralAccountOverride> {
  if (!hasLocalStorage()) return {};
  try {
    const raw = localStorage.getItem(ACCOUNT_OVERRIDES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveLocalAccountOverrides(map: Record<string, CentralAccountOverride>): void {
  if (!hasLocalStorage()) return;
  try {
    localStorage.setItem(ACCOUNT_OVERRIDES_STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('mirsad-users-updated'));
  } catch {
    // ignore
  }
}

function syncPasswordsAndDeletedFromOverrides(merged: Record<string, CentralAccountOverride>): void {
  if (!hasLocalStorage()) return;
  try {
    const customPwRaw = localStorage.getItem(ACTIVE_PASSWORDS_STORAGE_KEY);
    const customPwMap = customPwRaw ? JSON.parse(customPwRaw) : {};
    const deletedRaw = localStorage.getItem(DELETED_USERS_STORAGE_KEY);
    const deletedSet = new Set<string>(deletedRaw ? JSON.parse(deletedRaw) : []);

    for (const [uname, rec] of Object.entries(merged)) {
      const cleanU = (rec.username || uname).toLowerCase().trim();
      if (!cleanU) continue;

      if (rec.isDeleted && cleanU !== 'admin') {
        deletedSet.add(cleanU);
        if (rec.academicId) deletedSet.add(rec.academicId.toLowerCase().trim());
      } else {
        deletedSet.delete(cleanU);
        if (rec.academicId) deletedSet.delete(rec.academicId.toLowerCase().trim());
        if (rec.password || rec.passwordHash) {
          const prevPw = customPwMap[cleanU] || {};
          const pwObj = {
            password: rec.password || prevPw.password || '',
            passwordHash: rec.passwordHash || prevPw.passwordHash || '',
            passwordSalt: rec.passwordSalt || prevPw.passwordSalt || '',
            updatedAt: rec.updatedAt || Date.now(),
          };
          if (pwObj.password || pwObj.passwordHash) {
            customPwMap[cleanU] = pwObj;
            if (rec.academicId) {
              customPwMap[rec.academicId.toLowerCase().trim()] = pwObj;
            }
          }
        }
      }
    }

    localStorage.setItem(DELETED_USERS_STORAGE_KEY, JSON.stringify(Array.from(deletedSet)));
    localStorage.setItem(ACTIVE_PASSWORDS_STORAGE_KEY, JSON.stringify(customPwMap));
  } catch {
    // ignore
  }
}

/**
 * مزامنة جميع الحسابات المعتمدة (الأدمن + أي حساب جديد أضافه الأدمن أو تم تسجيله عبر /register) مع السحابة
 */
export async function syncAdminStateWithCloud(): Promise<void> {
  if (typeof window === 'undefined') return;
  await purgeAllNonAdminAccountsAndSecrets();

  const localOverrides = getLocalAccountOverrides();
  const merged: Record<string, CentralAccountOverride> = { ...localOverrides };

  // 1) قراءة وثيقة السجل الموحد accounts_registry
  try {
    const docRef = doc(firestoreDB, 'mirsad_admin_state', 'accounts_registry');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const cloudData = snap.data() as {
        overrides?: Record<string, CentralAccountOverride>;
      };
      const cloudOverrides = cloudData.overrides || {};
      for (const [k, cloudRec] of Object.entries(cloudOverrides)) {
        const cleanK = (cloudRec.username || k).toLowerCase().trim();
        if (!cleanK) continue;
        const existing = merged[cleanK];
        if (!existing || (cloudRec.updatedAt || 0) >= (existing.updatedAt || 0)) {
          merged[cleanK] = {
            ...existing,
            ...cloudRec,
            username: cleanK,
            password: cloudRec.password || existing?.password,
            passwordHash: cloudRec.passwordHash || existing?.passwordHash,
            passwordSalt: cloudRec.passwordSalt || existing?.passwordSalt,
          };
        }
      }
    }
  } catch {
    // Offline fallback
  }

  // 2) قراءة مجموعة المستخدمين المسجلين المستقلة mirsad_registered_users
  try {
    const usersSnap = await getDocs(collection(firestoreDB, 'mirsad_registered_users'));
    usersSnap.forEach((d) => {
      const cloudRec = d.data() as CentralAccountOverride;
      const cleanK = (cloudRec.username || d.id).toLowerCase().trim();
      if (!cleanK) return;
      const existing = merged[cleanK];
      if (!existing || (cloudRec.updatedAt || 0) >= (existing.updatedAt || 0)) {
        merged[cleanK] = {
          ...existing,
          ...cloudRec,
          username: cleanK,
          password: cloudRec.password || existing?.password,
          passwordHash: cloudRec.passwordHash || existing?.passwordHash,
          passwordSalt: cloudRec.passwordSalt || existing?.passwordSalt,
        };
      }
    });
  } catch {
    // Offline fallback
  }

  saveLocalAccountOverrides(merged);
  syncPasswordsAndDeletedFromOverrides(merged);
}

/**
 * حفظ أو تحديث أو حذف أي حساب في قاعدة البيانات المركزية (محلياً وسحابياً)
 * مع الحفاظ الكامل على الهاش وكلمة المرور والبيانات السابقة عند التحديث الجزئي
 */
export async function pushAdminAccountOverride(
  override: CentralAccountOverride
): Promise<void> {
  const cleanKey = override.username.toLowerCase().trim();
  if (!cleanKey) return;

  const map = getLocalAccountOverrides();
  const prev = map[cleanKey] || { username: cleanKey, updatedAt: 0 };

  const mergedRecord: CentralAccountOverride = {
    ...prev,
    ...override,
    username: cleanKey,
    academicId: override.academicId ?? prev.academicId ?? cleanKey,
    fullName: override.fullName ?? prev.fullName ?? cleanKey,
    phone: override.phone ?? prev.phone ?? '',
    role: override.role ?? prev.role ?? 'user',
    password: override.password ?? prev.password,
    passwordHash: override.passwordHash ?? prev.passwordHash,
    passwordSalt: override.passwordSalt ?? prev.passwordSalt,
    createdAt: override.createdAt ?? prev.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  };

  map[cleanKey] = mergedRecord;
  saveLocalAccountOverrides(map);
  syncPasswordsAndDeletedFromOverrides(map);

  // 1) حفظ في المجموعة المستقلة mirsad_registered_users لضمان عدم تعارض الكتابة المتزامنة من عدة طلاب
  try {
    await setDoc(
      doc(firestoreDB, 'mirsad_registered_users', cleanKey),
      mergedRecord,
      { merge: true }
    );
  } catch {
    // ignore offline error
  }

  // 2) حفظ في السجل المركزي الموحد accounts_registry
  try {
    const docRef = doc(firestoreDB, 'mirsad_admin_state', 'accounts_registry');
    await setDoc(
      docRef,
      {
        overrides: {
          [cleanKey]: mergedRecord,
        },
        updatedAt: Date.now(),
      },
      { merge: true }
    );
  } catch {
    // ignore offline error
  }
}

export function getRealLoginLogs(): LoginActivityRecord[] {
  if (!hasLocalStorage()) return [];
  try {
    const raw = localStorage.getItem(LOGIN_LOGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export async function recordRealLoginActivity(params: {
  username: string;
  fullName: string;
  academicId: string;
  role: 'admin' | 'doctor' | 'user' | 'guest';
  status: 'success' | 'failed' | 'logout';
  authMethod?: 'password' | 'google_oauth' | 'admin_reset';
  note?: string;
}): Promise<LoginActivityRecord> {
  const now = Date.now();
  const isoDate = new Date(now).toISOString();
  const cleanUsername = params.username.toLowerCase().trim();

  const existingLogs = getRealLoginLogs();
  const lastLog = existingLogs[0];
  const prevHash = lastLog?.hash || 'GENESIS_BLOCK_MIRSAD_STAGE7_2026';

  let encryptedPayload = '';
  let hmacSignature = '';
  try {
    const secretPayloadRaw = JSON.stringify({
      username: cleanUsername,
      role: params.role,
      status: params.status,
      authMethod: params.authMethod || 'password',
      timestamp: now,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Server',
      note: params.note || '',
    });
    encryptedPayload = await encrypt(secretPayloadRaw, 'activity_log');
    hmacSignature = await signHMAC(encryptedPayload);
  } catch {
    // fallback
  }

  let hash = '';
  try {
    hash = await sha256(`${prevHash}:${now}:${cleanUsername}:${params.status}:${encryptedPayload}`);
  } catch {
    hash = `${now}_${cleanUsername}`;
  }

  const entry: LoginActivityRecord = {
    id: `login_${now}_${Math.random().toString(36).slice(2, 7)}`,
    username: cleanUsername,
    fullName: params.fullName,
    academicId: params.academicId || cleanUsername,
    role: params.role,
    status: params.status,
    authMethod: params.authMethod || 'password',
    timestamp: now,
    isoDate,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 90) : 'Web Browser',
    note:
      params.note ||
      (params.status === 'success'
        ? `تسجيل دخول فعلي معتمد (${params.role === 'admin' ? 'المشرف العام Admin' : 'حساب مستخدم'})`
        : params.status === 'logout'
        ? 'تسجيل خروج آمن وموثق'
        : `محاولة دخول غير ناجحة للمعرف (${cleanUsername})`),
    encryptedPayload,
    hmacSignature,
    prevHash,
    hash,
  };

  if (hasLocalStorage()) {
    const updated = [entry, ...existingLogs].slice(0, 300);
    localStorage.setItem(LOGIN_LOGS_STORAGE_KEY, JSON.stringify(updated));
  }

  if (params.status === 'success') {
    const overrides = getLocalAccountOverrides();
    const prev = overrides[cleanUsername];
    await pushAdminAccountOverride({
      username: cleanUsername,
      academicId: params.academicId || prev?.academicId || cleanUsername,
      fullName: params.fullName || prev?.fullName || cleanUsername,
      role: params.role,
      isDeleted: false,
      lastLoginAt: now,
      loginCount: (prev?.loginCount || 0) + 1,
      updatedAt: now,
    });
  }

  await writeAuditLog(null, {
    userId: cleanUsername,
    actorName: params.fullName,
    action:
      params.status === 'success'
        ? 'USER_LOGIN_SUCCESS'
        : params.status === 'logout'
        ? 'USER_LOGOUT'
        : 'USER_LOGIN_FAILED',
    category: 'auth',
    details: `${entry.note} [Hash: ${hash.slice(0, 16)}...]`,
  });

  try {
    await setDoc(doc(firestoreDB, 'mirsad_login_logs', entry.id), entry);
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mirsad-login-logs-updated'));
  }

  return entry;
}

export async function fetchAndMergeCloudLoginLogs(): Promise<LoginActivityRecord[]> {
  try {
    const q = query(
      collection(firestoreDB, 'mirsad_login_logs'),
      orderBy('timestamp', 'desc'),
      limit(100)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      const local = getRealLoginLogs();
      const map = new Map<string, LoginActivityRecord>();
      for (const item of local) map.set(item.id, item);
      snap.forEach((d) => {
        const data = d.data() as LoginActivityRecord;
        if (data && data.id) map.set(data.id, data);
      });
      const merged = Array.from(map.values()).sort((a, b) => b.timestamp - a.timestamp);
      if (hasLocalStorage()) {
        localStorage.setItem(LOGIN_LOGS_STORAGE_KEY, JSON.stringify(merged.slice(0, 300)));
      }
      return merged;
    }
  } catch {
    // ignore
  }
  return getRealLoginLogs();
}

export function clearRealLoginLogs(): void {
  if (!hasLocalStorage()) return;
  localStorage.removeItem(LOGIN_LOGS_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('mirsad-login-logs-updated'));
}
```
