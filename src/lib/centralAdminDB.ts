// File: src/lib/centralAdminDB.ts
import { db as firestoreDB } from './firebase';
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { writeAuditLog } from './audit';
import { deleteRecord, getAllRecords } from './encryptedDB';
import { encrypt, signHMAC, sha256 } from './crypto';
import { SyncEngine, syncEngine } from './syncEngine';

export const NETLIFY_PROJECT_OVERVIEW_URL =
  'https://app.netlify.com/projects/mirsad-al-tashfeer/overview';
export const NETLIFY_LIVE_SITE_URL = 'https://mirsad-al-tashfeer.netlify.app';

export interface RealSyncReport {
  serverSynced: boolean;
  firestoreSynced: boolean;
  platformVersionChecked: boolean;
  newBuildDetected: boolean;
  buildId: string | null;
  builtAt: string | null;
  activeAccountsCount: number;
  loginLogsCount: number;
  syncedAt: number;
}

export interface LoginActivityRecord {
  id: string;
  username: string;
  fullName: string;
  academicId: string;
  role: 'admin' | 'doctor' | 'user' | 'guest';
  status: 'success' | 'failed' | 'logout';
  authMethod: 'password' | 'google_oauth' | 'admin_reset' | 'registration';
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
  registrationSource?: 'self_register' | 'admin_created' | 'system_admin';
  password?: string;
  passwordHash?: string;
  passwordSalt?: string;
  isDeleted?: boolean;
  deletedAt?: number;
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
const LAST_RESET_AT_KEY = 'mirsad_last_reset_at_v1';
const FULL_RESET_EPOCH_KEY = 'mirsad_full_reset_epoch_2026_11_14_v1';

export function getLastResetAt(): number {
  if (!hasLocalStorage()) return 0;
  try {
    const raw = localStorage.getItem(LAST_RESET_AT_KEY);
    const parsed = Number(raw || 0);
    return Number.isFinite(parsed) ? parsed : 0;
  } catch {
    return 0;
  }
}

function setLastResetAt(ts: number): void {
  if (!hasLocalStorage()) return;
  try {
    localStorage.setItem(LAST_RESET_AT_KEY, String(ts));
  } catch {}
}

function hasLocalStorage(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function getAccountsApiEndpoints(): string[] {
  const endpoints = ['/api/accounts', '/.netlify/functions/accounts'];
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (
      host !== 'localhost' &&
      host !== '127.0.0.1' &&
      host !== 'mirsad-al-tashfeer.netlify.app'
    ) {
      endpoints.push(`${NETLIFY_LIVE_SITE_URL}/.netlify/functions/accounts`);
    }
  }
  return endpoints;
}

async function callServerAccountsApi(
  method: 'GET' | 'POST',
  payload?: Record<string, unknown>
): Promise<{
  ok: boolean;
  overrides?: Record<string, CentralAccountOverride>;
  deletedUsers?: string[];
  loginLogs?: LoginActivityRecord[];
  resetAt?: number;
} | null> {
  if (typeof window === 'undefined' || typeof fetch === 'undefined') return null;
  for (const endpoint of getAccountsApiEndpoints()) {
    try {
      const url = method === 'GET' ? `${endpoint}?_t=${Date.now()}` : endpoint;
      const res = await fetch(url, {
        method,
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
        ...(method === 'POST' && payload ? { body: JSON.stringify(payload) } : {}),
      });
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (data && data.ok) return data;
        }
      }
    } catch {
      // try next endpoint
    }
  }
  return null;
}

function broadcastSyncUpdate(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('mirsad-users-updated'));
  window.dispatchEvent(new CustomEvent('mirsad-login-logs-updated'));
  try {
    if ('BroadcastChannel' in window) {
      const bc = new BroadcastChannel('mirsad_central_sync_v1');
      bc.postMessage({ type: 'SYNC_ACCOUNTS', timestamp: Date.now() });
      bc.close();
    }
  } catch {}
}

export async function purgeAllNonAdminAccountsAndSecrets(): Promise<void> {
  if (!hasLocalStorage()) return;
  try {
    if (localStorage.getItem(ONE_TIME_INITIAL_PURGE_KEY) !== '1') {
      localStorage.setItem(ONE_TIME_INITIAL_PURGE_KEY, '1');
    }
  } catch {}
}

export async function applyLocalResetPurge(
  resetAt: number,
  options: { clearActiveSession?: boolean; preserveAdminAuth?: boolean } = {}
): Promise<CentralAccountOverride | null> {
  const preserveAdminAuth = options.preserveAdminAuth !== false;
  let preservedAdmin: CentralAccountOverride | null = null;

  if (hasLocalStorage()) {
    try {
      const currentOverrides = getLocalAccountOverrides();
      const prevAdmin = currentOverrides.admin;
      const customPwRaw = localStorage.getItem(ACTIVE_PASSWORDS_STORAGE_KEY);
      const customPwMap = customPwRaw ? JSON.parse(customPwRaw) : {};
      const adminPw = customPwMap?.admin || customPwMap?.['admin-001'];

      if (preserveAdminAuth && (prevAdmin?.passwordHash || adminPw?.passwordHash)) {
        preservedAdmin = {
          username: 'admin',
          academicId: prevAdmin?.academicId || 'ADMIN-001',
          fullName: prevAdmin?.fullName || 'المشرف العام على المنصة',
          phone: prevAdmin?.phone || '',
          role: 'admin',
          registrationSource: 'system_admin',
          passwordHash: prevAdmin?.passwordHash || adminPw?.passwordHash || '',
          passwordSalt: prevAdmin?.passwordSalt || adminPw?.passwordSalt || '',
          isDeleted: false,
          deletedAt: 0,
          lastLoginAt: 0,
          loginCount: 0,
          createdAt: prevAdmin?.createdAt || resetAt,
          updatedAt: resetAt,
        };
      }

      if (preservedAdmin) {
        localStorage.setItem(ACCOUNT_OVERRIDES_STORAGE_KEY, JSON.stringify({ admin: preservedAdmin }));
      } else {
        localStorage.removeItem(ACCOUNT_OVERRIDES_STORAGE_KEY);
      }

      if (preserveAdminAuth && adminPw && (adminPw.passwordHash || adminPw.password)) {
        localStorage.setItem(
          ACTIVE_PASSWORDS_STORAGE_KEY,
          JSON.stringify({
            admin: {
              password: adminPw.password || '',
              passwordHash: adminPw.passwordHash || preservedAdmin?.passwordHash || '',
              passwordSalt: adminPw.passwordSalt || preservedAdmin?.passwordSalt || '',
              updatedAt: resetAt,
            },
          })
        );
      } else {
        localStorage.removeItem(ACTIVE_PASSWORDS_STORAGE_KEY);
      }

      const keysToRemove = [
        LOGIN_LOGS_STORAGE_KEY,
        DELETED_USERS_STORAGE_KEY,
        'mirsad_audit_logs_v1',
        'mirsad_dashboard_users',
        'mirsad_attempts_v1',
        'mirsad_otp_v1',
        'mirsad_admin_password_reset_requests_v1',
        'mirsad_security_events_v1',
        'mirsad_security_logs_v1',
        'mirsad_users_v3',
      ];
      if (options.clearActiveSession) {
        keysToRemove.push('mirsad_session_v3', 'mirsad_jwt_token', 'mirsad_guest_mode');
      }
      for (const k of keysToRemove) {
        localStorage.removeItem(k);
      }

      const dynamicKeys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (
          k &&
          (k.startsWith('mirsad_rate_limit_') ||
            k.startsWith('mirsad_congrats_seen_') ||
            k.startsWith('mirsad_cards_') ||
            k.startsWith('mirsad_attempts'))
        ) {
          dynamicKeys.push(k);
        }
      }
      for (const k of dynamicKeys) {
        localStorage.removeItem(k);
      }

      setLastResetAt(resetAt);
    } catch {}
  }

  try {
    const allUsers = await getAllRecords<{ username: string }>('users');
    for (const r of allUsers) {
      const uname = (r.username || '').toLowerCase().trim();
      if (!preserveAdminAuth || uname !== 'admin') {
        await deleteRecord('users', r.username);
      }
    }
  } catch {}

  broadcastSyncUpdate();
  return preservedAdmin;
}

export async function resetAllAccountsAndLoginsGlobally(
  options: { clearActiveSession?: boolean; preserveAdminAuth?: boolean } = {}
): Promise<{ ok: boolean; resetAt: number }> {
  const now = Date.now();
  const preserveAdminAuth = options.preserveAdminAuth !== false;

  if (hasLocalStorage()) {
    try {
      localStorage.setItem(FULL_RESET_EPOCH_KEY, '1');
    } catch {}
  }

  const preservedAdmin = await applyLocalResetPurge(now, options);

  await callServerAccountsApi('POST', {
    action: 'RESET_ALL',
    resetAt: now,
    preserveAdminAuth,
  });

  try {
    const [regSnap, logsSnap, usersSnap, auditSnap] = await Promise.all([
      getDocs(collection(firestoreDB, 'mirsad_registered_users')).catch(() => null),
      getDocs(collection(firestoreDB, 'mirsad_login_logs')).catch(() => null),
      getDocs(collection(firestoreDB, 'users')).catch(() => null),
      getDocs(collection(firestoreDB, 'audit_logs')).catch(() => null),
    ]);

    const deletions: Array<Promise<void>> = [];
    regSnap?.forEach((d) => {
      if (!preserveAdminAuth || d.id.toLowerCase() !== 'admin') {
        deletions.push(deleteDoc(d.ref).catch(() => {}));
      }
    });
    logsSnap?.forEach((d) => {
      deletions.push(deleteDoc(d.ref).catch(() => {}));
    });
    usersSnap?.forEach((d) => {
      deletions.push(deleteDoc(d.ref).catch(() => {}));
    });
    auditSnap?.forEach((d) => {
      deletions.push(deleteDoc(d.ref).catch(() => {}));
    });
    await Promise.all(deletions);

    if (preserveAdminAuth && preservedAdmin) {
      await setDoc(doc(firestoreDB, 'mirsad_registered_users', 'admin'), preservedAdmin).catch(() => {});
    }

    await setDoc(doc(firestoreDB, 'mirsad_admin_state', 'accounts_registry'), {
      overrides: preserveAdminAuth && preservedAdmin ? { admin: preservedAdmin } : {},
      resetAt: now,
      updatedAt: now,
    }).catch(() => {});
  } catch {}

  broadcastSyncUpdate();
  return { ok: true, resetAt: now };
}

export async function ensureOneTimeFullResetEpoch(): Promise<boolean> {
  if (!hasLocalStorage()) return false;
  try {
    if (localStorage.getItem(FULL_RESET_EPOCH_KEY) === '1') {
      return false;
    }
    localStorage.setItem(FULL_RESET_EPOCH_KEY, '1');

    // تحقق أولاً من وجود تصفير معتمد على السيرفر أو Firestore لتجنب مسح أي تسجيلات جديدة بعد التصفير
    let remoteResetAt = 0;
    try {
      const serverState = await callServerAccountsApi('GET');
      if (serverState && serverState.ok && Number(serverState.resetAt || 0) > 0) {
        remoteResetAt = Math.max(remoteResetAt, Number(serverState.resetAt || 0));
      }
    } catch {}

    try {
      const stateSnap = await getDoc(doc(firestoreDB, 'mirsad_admin_state', 'accounts_registry'));
      if (stateSnap.exists()) {
        const data = stateSnap.data() as { resetAt?: number };
        if (Number(data?.resetAt || 0) > 0) {
          remoteResetAt = Math.max(remoteResetAt, Number(data.resetAt || 0));
        }
      }
    } catch {}

    if (remoteResetAt > getLastResetAt()) {
      await applyLocalResetPurge(remoteResetAt, {
        clearActiveSession: true,
        preserveAdminAuth: true,
      });
    } else {
      await resetAllAccountsAndLoginsGlobally({
        clearActiveSession: true,
        preserveAdminAuth: true,
      });
    }
    return true;
  } catch {
    return false;
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
  } catch {}
}

function syncPasswordsAndDeletedFromOverrides(
  merged: Record<string, CentralAccountOverride>,
  extraDeletedUsers: string[] = []
): void {
  if (!hasLocalStorage()) return;
  try {
    const customPwRaw = localStorage.getItem(ACTIVE_PASSWORDS_STORAGE_KEY);
    const customPwMap = customPwRaw ? JSON.parse(customPwRaw) : {};
    const deletedRaw = localStorage.getItem(DELETED_USERS_STORAGE_KEY);
    const deletedSet = new Set<string>(deletedRaw ? JSON.parse(deletedRaw) : []);

    for (const d of extraDeletedUsers) {
      const cd = String(d || '').toLowerCase().trim();
      if (cd && cd !== 'admin') {
        deletedSet.add(cd);
        delete customPwMap[cd];
      }
    }

    for (const [uname, rec] of Object.entries(merged)) {
      const cleanU = (rec.username || uname).toLowerCase().trim();
      if (!cleanU) continue;
      const cleanAcad = (rec.academicId || '').toLowerCase().trim();

      if ((rec.isDeleted || deletedSet.has(cleanU) || (cleanAcad && deletedSet.has(cleanAcad))) && cleanU !== 'admin') {
        deletedSet.add(cleanU);
        if (cleanAcad) deletedSet.add(cleanAcad);
        delete customPwMap[cleanU];
        if (cleanAcad) delete customPwMap[cleanAcad];
      } else {
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
            if (cleanAcad) customPwMap[cleanAcad] = pwObj;
          }
        }
      }
    }

    localStorage.setItem(DELETED_USERS_STORAGE_KEY, JSON.stringify(Array.from(deletedSet)));
    localStorage.setItem(ACTIVE_PASSWORDS_STORAGE_KEY, JSON.stringify(customPwMap));
  } catch {}
}

export async function permanentlyDeleteAccountFromCentralDB(
  username: string,
  academicId?: string
): Promise<void> {
  const cleanU = username.toLowerCase().trim();
  const cleanAcad = (academicId || '').toLowerCase().trim();
  if (!cleanU || cleanU === 'admin') return;

  const now = Date.now();
  let resolvedAcad = cleanAcad;

  if (hasLocalStorage()) {
    const map = getLocalAccountOverrides();
    const prev = map[cleanU];
    if (!resolvedAcad && prev?.academicId) {
      resolvedAcad = prev.academicId.toLowerCase().trim();
    }

    try {
      const deletedRaw = localStorage.getItem(DELETED_USERS_STORAGE_KEY);
      const deletedSet = new Set<string>(deletedRaw ? JSON.parse(deletedRaw) : []);
      deletedSet.add(cleanU);
      if (resolvedAcad) deletedSet.add(resolvedAcad);
      localStorage.setItem(DELETED_USERS_STORAGE_KEY, JSON.stringify(Array.from(deletedSet)));
    } catch {}

    try {
      const customPwRaw = localStorage.getItem(ACTIVE_PASSWORDS_STORAGE_KEY);
      if (customPwRaw) {
        const customPwMap = JSON.parse(customPwRaw);
        delete customPwMap[cleanU];
        if (resolvedAcad) delete customPwMap[resolvedAcad];
        localStorage.setItem(ACTIVE_PASSWORDS_STORAGE_KEY, JSON.stringify(customPwMap));
      }
    } catch {}

    try {
      if (resolvedAcad && resolvedAcad !== cleanU && map[resolvedAcad]) {
        delete map[resolvedAcad];
      }
      map[cleanU] = {
        username: cleanU,
        academicId: resolvedAcad || cleanU,
        fullName: prev?.fullName || cleanU,
        isDeleted: true,
        deletedAt: now,
        password: '',
        passwordHash: '',
        passwordSalt: '',
        updatedAt: now,
      };
      saveLocalAccountOverrides(map);
    } catch {}

    try {
      const logs = getRealLoginLogs();
      const filteredLogs = logs.filter((l) => {
        const lu = (l.username || '').toLowerCase().trim();
        const la = (l.academicId || '').toLowerCase().trim();
        if (lu === cleanU || la === cleanU || (resolvedAcad && (lu === resolvedAcad || la === resolvedAcad))) {
          return false;
        }
        return true;
      });
      localStorage.setItem(LOGIN_LOGS_STORAGE_KEY, JSON.stringify(filteredLogs));
    } catch {}
  }

  try {
    await deleteRecord('users', cleanU);
    if (resolvedAcad) await deleteRecord('users', resolvedAcad);
    const allDbUsers = await getAllRecords<{ username: string; academicId?: string }>('users');
    for (const r of allDbUsers) {
      const ru = (r.username || '').toLowerCase().trim();
      const ra = (r.academicId || '').toLowerCase().trim();
      if (ru === cleanU || ra === cleanU || (resolvedAcad && (ru === resolvedAcad || ra === resolvedAcad))) {
        await deleteRecord('users', r.username);
      }
    }
  } catch {}

  await callServerAccountsApi('POST', {
    action: 'DELETE_USER',
    username: cleanU,
    academicId: resolvedAcad || cleanU,
  });

  try {
    await deleteDoc(doc(firestoreDB, 'mirsad_registered_users', cleanU));
    if (resolvedAcad && resolvedAcad !== cleanU) {
      await deleteDoc(doc(firestoreDB, 'mirsad_registered_users', resolvedAcad));
    }
  } catch {}

  try {
    const docRef = doc(firestoreDB, 'mirsad_admin_state', 'accounts_registry');
    await setDoc(
      docRef,
      {
        overrides: {
          [cleanU]: {
            username: cleanU,
            academicId: resolvedAcad || cleanU,
            isDeleted: true,
            deletedAt: now,
            password: '',
            passwordHash: '',
            passwordSalt: '',
            updatedAt: now,
          },
        },
        updatedAt: now,
      },
      { merge: true }
    );
  } catch {}

  broadcastSyncUpdate();
}

async function performCloudAndServerSync(): Promise<{
  serverSynced: boolean;
  firestoreSynced: boolean;
  activeAccountsCount: number;
  loginLogsCount: number;
}> {
  if (typeof window === 'undefined') {
    return {
      serverSynced: false,
      firestoreSynced: false,
      activeAccountsCount: 0,
      loginLogsCount: 0,
    };
  }
  await purgeAllNonAdminAccountsAndSecrets();

  let serverSynced = false;
  let firestoreSynced = false;
  let effectiveResetAt = getLastResetAt();

  let localOverrides = getLocalAccountOverrides();
  let deletedRaw = hasLocalStorage() ? localStorage.getItem(DELETED_USERS_STORAGE_KEY) : null;
  let deletedSet = new Set<string>(deletedRaw ? JSON.parse(deletedRaw) : []);
  let merged: Record<string, CentralAccountOverride> = { ...localOverrides };

  // 1) Sync with Central Server / Netlify Function API (/api/accounts or /.netlify/functions/accounts)
  try {
    const serverRes = await callServerAccountsApi('POST', {
      action: 'SYNC_MERGE',
      localOverrides: merged,
      localLoginLogs: getRealLoginLogs(),
      lastResetAt: effectiveResetAt,
    });
    if (serverRes && serverRes.ok) {
      serverSynced = true;
      const serverResetAt = Number(serverRes.resetAt || 0);
      if (serverResetAt > effectiveResetAt) {
        effectiveResetAt = serverResetAt;
        await applyLocalResetPurge(serverResetAt, {
          clearActiveSession: false,
          preserveAdminAuth: true,
        });
        localOverrides = getLocalAccountOverrides();
        deletedRaw = hasLocalStorage() ? localStorage.getItem(DELETED_USERS_STORAGE_KEY) : null;
        deletedSet = new Set<string>(deletedRaw ? JSON.parse(deletedRaw) : []);
        merged = { ...localOverrides };
      }

      for (const delU of serverRes.deletedUsers || []) {
        const cd = String(delU || '').toLowerCase().trim();
        if (cd && cd !== 'admin') {
          deletedSet.add(cd);
          if (merged[cd]) {
            merged[cd] = {
              ...merged[cd],
              username: cd,
              isDeleted: true,
              password: '',
              passwordHash: '',
              passwordSalt: '',
              updatedAt: Date.now(),
            };
          }
          void deleteRecord('users', cd).catch(() => {});
        }
      }

      for (const [k, srvRec] of Object.entries(serverRes.overrides || {})) {
        const cleanK = (srvRec.username || k).toLowerCase().trim();
        if (!cleanK) continue;
        const cleanAcad = (srvRec.academicId || '').toLowerCase().trim();
        const existing = merged[cleanK];

        if (srvRec.isDeleted && cleanK !== 'admin') {
          deletedSet.add(cleanK);
          if (cleanAcad) deletedSet.add(cleanAcad);
          merged[cleanK] = {
            ...existing,
            ...srvRec,
            username: cleanK,
            isDeleted: true,
            password: '',
            passwordHash: '',
            passwordSalt: '',
          };
          void deleteRecord('users', cleanK).catch(() => {});
          continue;
        }

        if (existing?.isDeleted && (existing.updatedAt || 0) >= (srvRec.updatedAt || 0)) {
          continue;
        }

        if (!existing || (srvRec.updatedAt || 0) >= (existing.updatedAt || 0)) {
          merged[cleanK] = {
            ...existing,
            ...srvRec,
            username: cleanK,
            isDeleted: false,
            registrationSource: srvRec.registrationSource || existing?.registrationSource,
            createdAt: srvRec.createdAt || existing?.createdAt || srvRec.updatedAt || Date.now(),
            lastLoginAt: Math.max(srvRec.lastLoginAt || 0, existing?.lastLoginAt || 0) || undefined,
            loginCount: Math.max(srvRec.loginCount || 0, existing?.loginCount || 0),
            password: srvRec.password || existing?.password,
            passwordHash: srvRec.passwordHash || existing?.passwordHash,
            passwordSalt: srvRec.passwordSalt || existing?.passwordSalt,
          };
        }
      }

      if (Array.isArray(serverRes.loginLogs) && hasLocalStorage()) {
        const localLogs = getRealLoginLogs().filter((l) => (l.timestamp || 0) >= effectiveResetAt);
        const logMap = new Map<string, LoginActivityRecord>();
        for (const l of localLogs) {
          const lu = (l.username || '').toLowerCase().trim();
          const la = (l.academicId || '').toLowerCase().trim();
          if (!deletedSet.has(lu) && (!la || !deletedSet.has(la))) logMap.set(l.id, l);
        }
        for (const l of serverRes.loginLogs) {
          if (l && l.id && (l.timestamp || 0) >= effectiveResetAt) {
            const lu = (l.username || '').toLowerCase().trim();
            const la = (l.academicId || '').toLowerCase().trim();
            if (!deletedSet.has(lu) && (!la || !deletedSet.has(la))) logMap.set(l.id, l);
          }
        }
        const mergedLogs = Array.from(logMap.values()).sort((a, b) => b.timestamp - a.timestamp);
        localStorage.setItem(LOGIN_LOGS_STORAGE_KEY, JSON.stringify(mergedLogs.slice(0, 300)));
      }
    }
  } catch {}

  // 2) Sync with Google Cloud Firestore (mirsad_registered_users, mirsad_admin_state/accounts_registry, mirsad_login_logs)
  try {
    let pushedBackToServer = false;
    const stateDoc = await getDoc(doc(firestoreDB, 'mirsad_admin_state', 'accounts_registry'));
    if (stateDoc.exists()) {
      firestoreSynced = true;
      const stateData = stateDoc.data() as {
        overrides?: Record<string, CentralAccountOverride>;
        resetAt?: number;
      };
      const fsResetAt = Number(stateData.resetAt || 0);
      if (fsResetAt > effectiveResetAt) {
        effectiveResetAt = fsResetAt;
        await applyLocalResetPurge(fsResetAt, {
          clearActiveSession: false,
          preserveAdminAuth: true,
        });
        deletedSet = new Set<string>();
        merged = getLocalAccountOverrides();
      }

      for (const [k, rec] of Object.entries(stateData.overrides || {})) {
        const cleanK = (rec.username || k).toLowerCase().trim();
        if (!cleanK) continue;
        const cleanAcad = (rec.academicId || '').toLowerCase().trim();
        const existing = merged[cleanK];

        if (rec.isDeleted && cleanK !== 'admin') {
          deletedSet.add(cleanK);
          if (cleanAcad) deletedSet.add(cleanAcad);
          merged[cleanK] = {
            ...existing,
            ...rec,
            username: cleanK,
            isDeleted: true,
            password: '',
            passwordHash: '',
            passwordSalt: '',
          };
          void deleteRecord('users', cleanK).catch(() => {});
          continue;
        }

        if (deletedSet.has(cleanK) || (cleanAcad && deletedSet.has(cleanAcad))) {
          continue;
        }

        if (!existing || (rec.updatedAt || 0) >= (existing.updatedAt || 0)) {
          merged[cleanK] = {
            ...existing,
            ...rec,
            username: cleanK,
            isDeleted: false,
            registrationSource: rec.registrationSource || existing?.registrationSource || 'self_register',
            createdAt: rec.createdAt || existing?.createdAt || rec.updatedAt || Date.now(),
            lastLoginAt: Math.max(rec.lastLoginAt || 0, existing?.lastLoginAt || 0) || undefined,
            loginCount: Math.max(rec.loginCount || 0, existing?.loginCount || 0),
            password: rec.password || existing?.password,
            passwordHash: rec.passwordHash || existing?.passwordHash,
            passwordSalt: rec.passwordSalt || existing?.passwordSalt,
          };
          pushedBackToServer = true;
        }
      }
    }

    const regSnap = await getDocs(collection(firestoreDB, 'mirsad_registered_users'));
    firestoreSynced = true;
    const firestoreRecords = new Map<string, CentralAccountOverride>();

    regSnap.forEach((docSnap) => {
      const rec = docSnap.data() as CentralAccountOverride;
      const cleanK = (rec.username || docSnap.id || '').toLowerCase().trim();
      if (!cleanK) return;
      firestoreRecords.set(cleanK, rec);
      const cleanAcad = (rec.academicId || '').toLowerCase().trim();
      const existing = merged[cleanK];

      if (rec.isDeleted && cleanK !== 'admin') {
        deletedSet.add(cleanK);
        if (cleanAcad) deletedSet.add(cleanAcad);
        merged[cleanK] = {
          ...existing,
          ...rec,
          username: cleanK,
          isDeleted: true,
          password: '',
          passwordHash: '',
          passwordSalt: '',
        };
        void deleteRecord('users', cleanK).catch(() => {});
        return;
      }

      if (deletedSet.has(cleanK) || (cleanAcad && deletedSet.has(cleanAcad))) {
        return;
      }

      if (!existing || (rec.updatedAt || 0) >= (existing.updatedAt || 0)) {
        merged[cleanK] = {
          ...existing,
          ...rec,
          username: cleanK,
          isDeleted: false,
          registrationSource: rec.registrationSource || existing?.registrationSource || 'self_register',
          createdAt: rec.createdAt || existing?.createdAt || rec.updatedAt || Date.now(),
          lastLoginAt: Math.max(rec.lastLoginAt || 0, existing?.lastLoginAt || 0) || undefined,
          loginCount: Math.max(rec.loginCount || 0, existing?.loginCount || 0),
          password: rec.password || existing?.password,
          passwordHash: rec.passwordHash || existing?.passwordHash,
          passwordSalt: rec.passwordSalt || existing?.passwordSalt,
        };
        pushedBackToServer = true;
      }
    });

    // Push missing or newer active accounts back to Firestore so both sides stay 100% synced
    const registryUpdates: Record<string, CentralAccountOverride> = {};
    for (const [cleanK, rec] of Object.entries(merged)) {
      if (rec.isDeleted || deletedSet.has(cleanK)) continue;
      const fsRec = firestoreRecords.get(cleanK);
      if (!fsRec || (!fsRec.isDeleted && (rec.updatedAt || 0) > (fsRec.updatedAt || 0))) {
        registryUpdates[cleanK] = rec;
        try {
          await setDoc(doc(firestoreDB, 'mirsad_registered_users', cleanK), rec, { merge: true });
        } catch {}
      }
    }
    if (Object.keys(registryUpdates).length > 0) {
      try {
        await setDoc(
          doc(firestoreDB, 'mirsad_admin_state', 'accounts_registry'),
          { overrides: registryUpdates, resetAt: effectiveResetAt, updatedAt: Date.now() },
          { merge: true }
        );
      } catch {}
    }

    // مزامنة سجل عمليات تسجيل الدخول الفعلي مع Firestore (mirsad_login_logs)
    try {
      const logsQ = query(
        collection(firestoreDB, 'mirsad_login_logs'),
        orderBy('timestamp', 'desc'),
        limit(200)
      );
      const logsSnap = await getDocs(logsQ);
      if (hasLocalStorage()) {
        const localLogs = getRealLoginLogs().filter((l) => (l.timestamp || 0) >= effectiveResetAt);
        const logMap = new Map<string, LoginActivityRecord>();
        for (const l of localLogs) {
          const lu = (l.username || '').toLowerCase().trim();
          const la = (l.academicId || '').toLowerCase().trim();
          if (!deletedSet.has(lu) && (!la || !deletedSet.has(la))) logMap.set(l.id, l);
        }
        const fsLogIds = new Set<string>();
        logsSnap.forEach((d) => {
          const l = d.data() as LoginActivityRecord;
          if (l && l.id && (l.timestamp || 0) >= effectiveResetAt) {
            fsLogIds.add(l.id);
            const lu = (l.username || '').toLowerCase().trim();
            const la = (l.academicId || '').toLowerCase().trim();
            if (!deletedSet.has(lu) && (!la || !deletedSet.has(la))) logMap.set(l.id, l);
          }
        });
        for (const l of localLogs) {
          if (!fsLogIds.has(l.id)) {
            await setDoc(doc(firestoreDB, 'mirsad_login_logs', l.id), l, { merge: true }).catch(() => {});
          }
        }
        const mergedLogs = Array.from(logMap.values()).sort((a, b) => b.timestamp - a.timestamp);
        localStorage.setItem(LOGIN_LOGS_STORAGE_KEY, JSON.stringify(mergedLogs.slice(0, 300)));
      }
    } catch {}

    if (pushedBackToServer) {
      const pushRes = await callServerAccountsApi('POST', {
        action: 'SYNC_MERGE',
        localOverrides: merged,
        localLoginLogs: getRealLoginLogs(),
        lastResetAt: effectiveResetAt,
      });
      if (pushRes?.ok) serverSynced = true;
    }
  } catch {}

  saveLocalAccountOverrides(merged);
  syncPasswordsAndDeletedFromOverrides(merged, Array.from(deletedSet));

  const activeAccountsCount = Object.values(merged).filter((r) => !r.isDeleted).length;
  return {
    serverSynced,
    firestoreSynced,
    activeAccountsCount,
    loginLogsCount: getRealLoginLogs().length,
  };
}

export async function syncAdminStateWithCloud(): Promise<void> {
  await performCloudAndServerSync();
}

export async function syncPlatformAndAccountsReal(): Promise<RealSyncReport> {
  let platformVersionChecked = false;
  let newBuildDetected = false;
  let buildId: string | null = null;
  let builtAt: string | null = null;

  if (typeof window !== 'undefined') {
    try {
      await SyncEngine.syncWithServer();
      await syncEngine.syncNow();
    } catch {}

    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          regs.map(async (r) => {
            await r.update();
            if (r.waiting) {
              r.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
          })
        );
      }
    } catch {}

    try {
      const res = await fetch(`./version.json?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = (await res.json()) as { buildId?: string; builtAt?: string };
        if (data?.buildId) {
          platformVersionChecked = true;
          buildId = String(data.buildId);
          builtAt = data.builtAt || null;
          const prevBuild = localStorage.getItem('mirsad_deployed_build_id');
          if (prevBuild && prevBuild !== buildId) {
            newBuildDetected = true;
          }
          localStorage.setItem('mirsad_deployed_build_id', buildId);
        }
      }
    } catch {}
  }

  const syncResult = await performCloudAndServerSync();
  broadcastSyncUpdate();

  return {
    serverSynced: syncResult.serverSynced,
    firestoreSynced: syncResult.firestoreSynced,
    platformVersionChecked,
    newBuildDetected,
    buildId,
    builtAt,
    activeAccountsCount: syncResult.activeAccountsCount,
    loginLogsCount: getRealLoginLogs().length,
    syncedAt: Date.now(),
  };
}

export function subscribeToCentralAccounts(onUpdate: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const unsubs: Array<() => void> = [];

  const pollTimer = window.setInterval(() => {
    void syncAdminStateWithCloud().then(onUpdate);
  }, 3000);
  unsubs.push(() => window.clearInterval(pollTimer));

  try {
    const unsubUsers = onSnapshot(
      collection(firestoreDB, 'mirsad_registered_users'),
      () => {
        void syncAdminStateWithCloud().then(onUpdate);
      },
      () => {}
    );
    unsubs.push(unsubUsers);
  } catch {}

  try {
    const unsubRegistry = onSnapshot(
      doc(firestoreDB, 'mirsad_admin_state', 'accounts_registry'),
      () => {
        void syncAdminStateWithCloud().then(onUpdate);
      },
      () => {}
    );
    unsubs.push(unsubRegistry);
  } catch {}

  try {
    const logsQ = query(
      collection(firestoreDB, 'mirsad_login_logs'),
      orderBy('timestamp', 'desc'),
      limit(150)
    );
    const unsubLoginLogs = onSnapshot(
      logsQ,
      (snap) => {
        if (hasLocalStorage()) {
          const resetAt = getLastResetAt();
          const deletedRaw = localStorage.getItem(DELETED_USERS_STORAGE_KEY);
          const deletedSet = new Set<string>(deletedRaw ? JSON.parse(deletedRaw) : []);
          const localLogs = getRealLoginLogs().filter((l) => (l.timestamp || 0) >= resetAt);
          const logMap = new Map<string, LoginActivityRecord>();
          for (const l of localLogs) {
            const lu = (l.username || '').toLowerCase().trim();
            const la = (l.academicId || '').toLowerCase().trim();
            if (!deletedSet.has(lu) && (!la || !deletedSet.has(la))) {
              logMap.set(l.id, l);
            }
          }
          snap.forEach((d) => {
            const l = d.data() as LoginActivityRecord;
            if (l && l.id && (l.timestamp || 0) >= resetAt) {
              const lu = (l.username || '').toLowerCase().trim();
              const la = (l.academicId || '').toLowerCase().trim();
              if (!deletedSet.has(lu) && (!la || !deletedSet.has(la))) {
                logMap.set(l.id, l);
              }
            }
          });
          const mergedLogs = Array.from(logMap.values())
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 300);
          localStorage.setItem(LOGIN_LOGS_STORAGE_KEY, JSON.stringify(mergedLogs));
          window.dispatchEvent(new CustomEvent('mirsad-login-logs-updated'));
        }
        onUpdate();
      },
      () => {}
    );
    unsubs.push(unsubLoginLogs);
  } catch {}

  try {
    if ('BroadcastChannel' in window) {
      const bc = new BroadcastChannel('mirsad_central_sync_v1');
      bc.onmessage = () => {
        void syncAdminStateWithCloud().then(onUpdate);
      };
      unsubs.push(() => bc.close());
    }
  } catch {}

  return () => {
    for (const fn of unsubs) {
      try { fn(); } catch {}
    }
  };
}

export async function pushAdminAccountOverride(
  override: CentralAccountOverride
): Promise<void> {
  const cleanKey = override.username.toLowerCase().trim();
  if (!cleanKey) return;

  if (override.isDeleted && cleanKey !== 'admin') {
    await permanentlyDeleteAccountFromCentralDB(cleanKey, override.academicId);
    return;
  }

  const map = getLocalAccountOverrides();
  const prev = map[cleanKey] || { username: cleanKey, updatedAt: 0 };
  const cleanAcad = (override.academicId || prev.academicId || cleanKey).toLowerCase().trim();

  if (hasLocalStorage()) {
    try {
      const deletedRaw = localStorage.getItem(DELETED_USERS_STORAGE_KEY);
      if (deletedRaw) {
        const deletedSet = new Set<string>(JSON.parse(deletedRaw));
        deletedSet.delete(cleanKey);
        if (cleanAcad) deletedSet.delete(cleanAcad);
        localStorage.setItem(DELETED_USERS_STORAGE_KEY, JSON.stringify(Array.from(deletedSet)));
      }
    } catch {}
  }

  const mergedRecord: CentralAccountOverride = {
    ...prev,
    ...override,
    username: cleanKey,
    academicId: override.academicId ?? prev.academicId ?? cleanKey,
    fullName: override.fullName ?? prev.fullName ?? cleanKey,
    phone: override.phone ?? prev.phone ?? '',
    role: override.role ?? prev.role ?? 'user',
    registrationSource:
      override.registrationSource ??
      prev.registrationSource ??
      (cleanKey === 'admin' ? 'system_admin' : 'self_register'),
    password: override.password ?? prev.password,
    passwordHash: override.passwordHash ?? prev.passwordHash,
    passwordSalt: override.passwordSalt ?? prev.passwordSalt,
    isDeleted: false,
    deletedAt: 0,
    lastLoginAt: override.lastLoginAt ?? prev.lastLoginAt,
    loginCount: override.loginCount ?? prev.loginCount ?? 0,
    createdAt: override.createdAt ?? prev.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  };

  map[cleanKey] = mergedRecord;
  saveLocalAccountOverrides(map);
  syncPasswordsAndDeletedFromOverrides(map);

  await callServerAccountsApi('POST', {
    action: 'UPSERT_USER',
    account: mergedRecord,
  });

  try {
    await setDoc(
      doc(firestoreDB, 'mirsad_registered_users', cleanKey),
      mergedRecord,
      { merge: true }
    );
  } catch {}

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
  } catch {}

  broadcastSyncUpdate();
}

export function getRealLoginLogs(): LoginActivityRecord[] {
  if (!hasLocalStorage()) return [];
  try {
    const raw = localStorage.getItem(LOGIN_LOGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

export async function recordRealLoginActivity(params: {
  username: string;
  fullName: string;
  academicId: string;
  role: 'admin' | 'doctor' | 'user' | 'guest';
  status: 'success' | 'failed' | 'logout';
  authMethod?: 'password' | 'google_oauth' | 'admin_reset' | 'registration';
  note?: string;
}): Promise<LoginActivityRecord> {
  const now = Date.now();
  const isoDate = new Date(now).toISOString();
  const cleanUsername = params.username.toLowerCase().trim();
  const authMethod = params.authMethod || 'password';

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
      authMethod,
      timestamp: now,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Server',
      note: params.note || '',
    });
    encryptedPayload = await encrypt(secretPayloadRaw, 'activity_log');
    hmacSignature = await signHMAC(encryptedPayload);
  } catch {}

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
    authMethod,
    timestamp: now,
    isoDate,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 90) : 'Web Browser',
    note:
      params.note ||
      (authMethod === 'registration'
        ? 'فتح حساب جديد وتفعيله على المنصة'
        : params.status === 'success'
        ? `تسجيل دخول فعلي معتمد (${authMethod === 'google_oauth' ? 'Google OAuth' : params.role === 'admin' ? 'المشرف العام Admin' : 'حساب مستخدم مسجل'})`
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
    broadcastSyncUpdate();
  }

  if (params.status === 'success' && authMethod !== 'registration') {
    const overrides = getLocalAccountOverrides();
    const prev = overrides[cleanUsername];
    const deletedRaw = hasLocalStorage() ? localStorage.getItem(DELETED_USERS_STORAGE_KEY) : null;
    const deletedSet = new Set<string>(deletedRaw ? JSON.parse(deletedRaw) : []);
    if (!prev?.isDeleted && !deletedSet.has(cleanUsername)) {
      await pushAdminAccountOverride({
        username: cleanUsername,
        academicId: params.academicId || prev?.academicId || cleanUsername,
        fullName: params.fullName || prev?.fullName || cleanUsername,
        role: params.role,
        registrationSource:
          prev?.registrationSource ||
          (cleanUsername === 'admin' ? 'system_admin' : 'self_register'),
        isDeleted: false,
        lastLoginAt: now,
        loginCount: (prev?.loginCount || 0) + 1,
        updatedAt: now,
      });
    }
  }

  await callServerAccountsApi('POST', {
    action: 'ADD_LOGIN_LOG',
    log: entry,
  });

  try {
    await setDoc(doc(firestoreDB, 'mirsad_login_logs', entry.id), entry, { merge: true });
  } catch {}

  await writeAuditLog(null, {
    userId: cleanUsername,
    actorName: params.fullName,
    action:
      authMethod === 'registration'
        ? 'USER_REGISTERED'
        : params.status === 'success'
        ? 'USER_LOGIN_SUCCESS'
        : params.status === 'logout'
        ? 'USER_LOGOUT'
        : 'USER_LOGIN_FAILED',
    category: 'auth',
    details: `${entry.note} [Hash: ${hash.slice(0, 16)}...]`,
  });

  broadcastSyncUpdate();
  return entry;
}

export async function fetchAndMergeCloudLoginLogs(): Promise<LoginActivityRecord[]> {
  await syncAdminStateWithCloud();
  const deletedRaw = hasLocalStorage() ? localStorage.getItem(DELETED_USERS_STORAGE_KEY) : null;
  const deletedSet = new Set<string>(deletedRaw ? JSON.parse(deletedRaw) : []);
  const resetAt = getLastResetAt();

  try {
    const q = query(
      collection(firestoreDB, 'mirsad_login_logs'),
      orderBy('timestamp', 'desc'),
      limit(200)
    );
    const snap = await getDocs(q);
    if (!snap.empty && hasLocalStorage()) {
      const localLogs = getRealLoginLogs().filter((l) => (l.timestamp || 0) >= resetAt);
      const logMap = new Map<string, LoginActivityRecord>();
      for (const l of localLogs) {
        const lu = (l.username || '').toLowerCase().trim();
        const la = (l.academicId || '').toLowerCase().trim();
        if (!deletedSet.has(lu) && (!la || !deletedSet.has(la))) logMap.set(l.id, l);
      }
      snap.forEach((d) => {
        const l = d.data() as LoginActivityRecord;
        if (l && l.id && (l.timestamp || 0) >= resetAt) {
          const lu = (l.username || '').toLowerCase().trim();
          const la = (l.academicId || '').toLowerCase().trim();
          if (!deletedSet.has(lu) && (!la || !deletedSet.has(la))) logMap.set(l.id, l);
        }
      });
      const mergedLogs = Array.from(logMap.values()).sort((a, b) => b.timestamp - a.timestamp);
      localStorage.setItem(LOGIN_LOGS_STORAGE_KEY, JSON.stringify(mergedLogs.slice(0, 300)));
    }
  } catch {}

  return getRealLoginLogs().filter((item) => {
    if ((item.timestamp || 0) < resetAt) return false;
    const lu = (item.username || '').toLowerCase().trim();
    const la = (item.academicId || '').toLowerCase().trim();
    return !deletedSet.has(lu) && (!la || !deletedSet.has(la));
  });
}

export function clearRealLoginLogs(): void {
  if (!hasLocalStorage()) return;
  localStorage.removeItem(LOGIN_LOGS_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('mirsad-login-logs-updated'));
}
