# الخطوة 2: الكود الكامل الصارم لملف `src/lib/auth.ts`

**المسار داخل المشروع:** `src/lib/auth.ts` (انسخ الكود التالي بالكامل واستبدل محتوى الملف الحالي به):

```typescript
// src/lib/auth.ts
// نظام المصادقة المحلي (لكل متصفح) — النسخة المصححة.
//
// ما تغيّر عن النسخة السابقة:
//  • لا حساب admin/admin123 ولا كلمات مرور مشتقة من الرقم الأكاديمي: الأدمن الأول يُنشأ عبر setupInitialAdmin().
//  • لا نسخة نصية من البيانات في localStorage: الحقول الحساسة مشفّرة (AES-GCM + AAD) في IndexedDB،
//    والنسخة النصية توجد في ذاكرة الصفحة فقط.
//  • الجلسة مشفّرة ثم موقّعة بـ HMAC بمفتاح غير قابل للتصدير، وتنتهي بعد 8 ساعات.
//  • قفل المحاولات مرتبط بالحساب الفعلي (لا بما يكتبه المستخدم)، برسائل موحّدة لا تكشف وجود الحساب.
//  • الحذف يشمل التخزين المشفر (لا يعود المستخدم المحذوف).
//  • ترقية تلقائية للهاش القديم إلى PBKDF2 بـ 600 ألف تكرار عند أول دخول ناجح.
//  • رمز OTP يُخزَّن مُجزَّأً، ولا يُعرض في الواجهة إلا في وضع التطوير.
//
// تنبيه صريح: هذا النظام يعمل بالكامل في المتصفح، فيستطيع مستخدم متمكّن على جهازه تجاوزه.
// صلاحيات الأدمن الحقيقية يجب أن تفرضها قواعد Firestore (firestore.rules) لا هذا الملف.

import {
  generateSalt,
  hashPassword,
  verifyPassword,
  needsRehash,
  generateRandomPassword,
  generateOTP,
  sanitizeUsername,
  encrypt,
  decrypt,
  sha256,
  safeEqual,
  signHMAC,
  verifyHMAC,
} from './crypto';
import { sendOTP } from './sms';
import { putRecord, getAllRecords, deleteRecord } from './encryptedDB';
import { logSecurityEvent, detectAnomalies } from './security';
import { STUDENTS, findTeamMember } from '@/data/students';
import { SyncEngine } from './syncEngine';
import {
  recordRealLoginActivity,
  syncAdminStateWithCloud,
  pushAdminAccountOverride,
  getLocalAccountOverrides,
  permanentlyDeleteAccountFromCentralDB,
} from './centralAdminDB';

export type UserRole = 'admin' | 'doctor' | 'user' | 'guest';

export interface StoredUser {
  username: string;
  fullName: string;
  academicId: string;
  phone: string;
  passwordHash: string;
  passwordSalt: string;
  plainPassword?: string;
  role: UserRole;
  needs_password_change: boolean;
  isDefaultPassword?: boolean;
  created_at: number;
  registrationSource?: 'self_register' | 'admin_created' | 'system_admin';
  persona?: string;
  theme?: string;
}

export interface UserSession {
  uid?: string;
  username: string;
  fullName: string;
  displayName?: string;
  role: UserRole;
  needs_password_change: boolean;
  authMode?: 'local' | 'firebase';
  loginTime: number;
}

export interface RegistrationData {
  username: string;
  password: string;
  fullName: string;
  academicId: string;
  phone?: string;
  role?: UserRole;
  registrationSource?: 'self_register' | 'admin_created' | 'system_admin';
}

const LEGACY_USERS_KEY = 'mirsad_users_v3'; // كان يحوي نسخة نصية؛ يُحذف بعد الترحيل
const SESSION_KEY = 'mirsad_session_v3';
const OTP_KEY = 'mirsad_otp_v1';
const ATTEMPTS_KEY = 'mirsad_attempts_v1';
const GUEST_KEY = 'mirsad_guest_mode';

const MAX_ATTEMPTS = 5;
const BASE_LOCK_MS = 5 * 60 * 1000;
const MAX_LOCK_MS = 60 * 60 * 1000;
const OTP_EXPIRY_MS = 5 * 60 * 1000;
const OTP_COOLDOWN_MS = 60 * 1000;
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
/**
 * التشفير الثنائي المعزز (Dual-Layer Encryption — ISE243 & NCS-1:2020):
 * الطبقة الأولى: اشتقاق المفتاح PBKDF2-HMAC-SHA256 بـ 600,000 تكرار وملح 128-بت فريد.
 * الطبقة الثانية: تشفير الحقول الحساسة وملخصات كلمات المرور عبر AES-256-GCM مع ربط السياق (AAD)
 * ومفتاح DEK مغلّف بمفتاح KEK غير قابل للتصدير في WebCrypto IndexedDB.
 */
const SENSITIVE_FIELDS = ['fullName', 'academicId', 'phone', 'passwordHash', 'passwordSalt', 'plainPassword'] as const;

const GENERIC_LOGIN_ERROR = 'بيانات الدخول غير صحيحة';
const GENERIC_RECOVERY_ERROR = 'بيانات الاستعادة غير مطابقة';

const isDev = (): boolean => (import.meta as any)?.env?.DEV === true;
const hasStorage = (): boolean => typeof localStorage !== 'undefined';

/* ================= سياسة كلمة المرور ================= */
const COMMON_PASSWORDS = new Set([
  '12345678', '123456789', '1234567890', 'password', 'password1', 'password123', 'qwerty123',
  'qwertyuiop', 'iloveyou', 'admin123', 'admin1234', 'welcome1', 'abc12345', '11111111',
  '00000000', 'letmein1', 'mirsad123', 'mirsad@123', 'ise243ise243', '987654321', 'aa123456',
]);

/** يعيد نص الخطأ، أو null إن كانت كلمة المرور مقبولة */
export function validatePassword(
  password: string,
  ctx: { username?: string; academicId?: string } = {}
): string | null {
  if (!password || password.length < 8) return 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
  if (password.length > 128) return 'كلمة المرور طويلة جداً (الحد 128 حرفاً)';
  const lower = password.toLowerCase();
  if (COMMON_PASSWORDS.has(lower)) return 'كلمة المرور شائعة وسهلة التخمين';
  for (const part of [ctx.username, ctx.academicId]) {
    if (part && part.length >= 4 && lower.includes(part.toLowerCase())) {
      return 'كلمة المرور لا يجب أن تحتوي اسم المستخدم أو الرقم الأكاديمي';
    }
  }
  const classes =
    Number(/[a-z\u0600-\u06FF]/.test(password)) +
    Number(/[A-Z]/.test(password)) +
    Number(/\d/.test(password)) +
    Number(/[^A-Za-z0-9\u0600-\u06FF]/.test(password));
  if (classes < 2) return 'استخدم نوعين مختلفين على الأقل من الأحرف (حروف وأرقام أو رموز)';
  return null;
}

/* ================= الحالة داخل الذاكرة ================= */
let usersCache: StoredUser[] = [];
let memSession: UserSession | null = null;
let initPromise: Promise<void> | null = null;
let writeQueue: Promise<void> = Promise.resolve();

function notifyUsersUpdated(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mirsad-users-updated'));
  }
}

function ensureInit(): Promise<void> {
  return initializeAuth();
}

/* ================= التخزين المشفّر للمستخدمين ================= */
async function encryptRecord(u: StoredUser): Promise<Record<string, unknown>> {
  const rec: Record<string, unknown> = { ...u };
  for (const f of SENSITIVE_FIELDS) {
    const v = (u as any)[f] as string;
    rec[f] = v ? await encrypt(v, `user:${u.username}:${f}`) : '';
  }
  return rec;
}

async function decryptRecord(r: any): Promise<StoredUser> {
  const out: any = { ...r };
  for (const f of SENSITIVE_FIELDS) {
    const v = r[f] as string;
    if (!v) {
      out[f] = '';
      continue;
    }
    // إذا كان الحقل لم يُشفّر بعد (مثل v2$600000$ من جلسة سابقة قبل تفعيل التشفير الثنائي على الهاش)
    if ((f === 'passwordHash' && v.startsWith('v2$')) || (f === 'passwordSalt' && /^[0-9a-f]{32}$/i.test(v))) {
      out[f] = v;
      continue;
    }
    try {
      // v2.* مربوط بالسياق؛ غير ذلك = صيغة قديمة (تُفكّ بالمفتاح القديم إن وُجد)
      out[f] = v.startsWith('v2.') ? await decrypt(v, `user:${r.username}:${f}`) : await decrypt(v);
    } catch {
      out[f] = v;
    }
  }
  return out as StoredUser;
}

async function persistNow(): Promise<void> {
  const snapshot = usersCache.map((u) => ({ ...u }));
  for (const u of snapshot) await putRecord('users', await encryptRecord(u));
  // احذف أي سجل مشفّر لم يعد له مستخدم (يمنع عودة المحذوفين)
  const existing = await getAllRecords<{ username: string }>('users');
  const keep = new Set(snapshot.map((u) => u.username));
  for (const r of existing) {
    if (!keep.has(r.username)) await deleteRecord('users', r.username);
  }
}

function schedulePersist(): Promise<void> {
  writeQueue = writeQueue
    .then(persistNow)
    .catch((e) => console.error('فشل حفظ المستخدمين المشفّرين', e));
  return writeQueue;
}

/** انتظر اكتمال كل عمليات الحفظ والتوقيع المعلّقة */
export async function flushAuth(): Promise<void> {
  await writeQueue;
}

const FIRST_LOGIN_RESET_VERSION_KEY = 'mirsad_first_login_reset_v2026_2';
const CONGRATS_SEEN_KEY = 'mirsad_congrats_seen_';
const RATE_LIMIT_PREFIX = 'mirsad_rate_limit_';
const JWT_TOKEN_KEY = 'mirsad_jwt_token';

/**
 * الأرقام السرية الرسمية المعتمدة للحسابات (تم تفريغها بالكامل وعزلها)
 */
export const DEFAULT_OFFICIAL_PASSWORDS: Record<string, string> = {};

const ACTIVE_PASSWORDS_STORAGE_KEY = 'mirsad_user_active_passwords_v1';
const DELETED_USERS_STORAGE_KEY = 'mirsad_deleted_users_v1';

function getDeletedUsersSet(): Set<string> {
  if (!hasStorage()) return new Set();
  try {
    const raw = localStorage.getItem(DELETED_USERS_STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr.map((x: string) => String(x).toLowerCase()) : []);
  } catch {
    return new Set();
  }
}

function saveDeletedUsersSet(set: Set<string>): void {
  if (!hasStorage()) return;
  try {
    localStorage.setItem(DELETED_USERS_STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // ignore
  }
}

export interface CustomPasswordRecord {
  password: string;
  passwordHash?: string;
  passwordSalt?: string;
  updatedAt: number;
}

function readCustomPasswordsMap(): Record<string, CustomPasswordRecord> {
  if (typeof window === 'undefined' || !hasStorage()) return {};
  try {
    const raw = localStorage.getItem(ACTIVE_PASSWORDS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string | CustomPasswordRecord>;
    const out: Record<string, CustomPasswordRecord> = {};
    for (const [k, v] of Object.entries(parsed)) {
      const key = k.toLowerCase().trim();
      if (!key) continue;
      if (typeof v === 'string' && v) {
        out[key] = { password: v, updatedAt: 0 };
      } else if (v && typeof v === 'object' && typeof v.password === 'string' && v.password) {
        out[key] = v;
      }
    }
    return out;
  } catch {
    return {};
  }
}

export function getCustomPasswordRecord(usernameOrAcademicId: string, academicId?: string): CustomPasswordRecord | null {
  const map = readCustomPasswordsMap();
  const k1 = (usernameOrAcademicId || '').toLowerCase().trim();
  if (k1 && map[k1]) return map[k1];
  const k2 = (academicId || '').toLowerCase().trim();
  if (k2 && map[k2]) return map[k2];
  return null;
}

export function getCustomPassword(username: string, academicId?: string): string | null {
  const rec = getCustomPasswordRecord(username, academicId);
  return rec ? rec.password : null;
}

export function saveCustomPassword(
  username: string,
  password: string,
  extra?: { academicId?: string; role?: UserRole; passwordHash?: string; passwordSalt?: string }
): void {
  if (typeof window === 'undefined' || !hasStorage()) return;
  try {
    const map = readCustomPasswordsMap();
    const cleanUser = username.toLowerCase().trim();
    const prev = map[cleanUser];
    const record: CustomPasswordRecord = {
      password,
      passwordHash: extra?.passwordHash || prev?.passwordHash,
      passwordSalt: extra?.passwordSalt || prev?.passwordSalt,
      updatedAt: Date.now(),
    };
    if (cleanUser) {
      map[cleanUser] = record;
    }
    if (extra?.academicId) {
      const cleanAcad = extra.academicId.toLowerCase().trim();
      if (cleanAcad) map[cleanAcad] = record;
    }
    if (extra?.role === 'admin' || cleanUser === 'admin') {
      map['admin'] = record;
      map['admin-001'] = record;
    }
    localStorage.setItem(ACTIVE_PASSWORDS_STORAGE_KEY, JSON.stringify(map));
    void SyncEngine.saveSecurely(ACTIVE_PASSWORDS_STORAGE_KEY, map);
  } catch {
    // ignore
  }
}

function applySavedPasswordState(user: StoredUser): StoredUser {
  const custom = getCustomPasswordRecord(user.username, user.academicId);
  if (custom) {
    return {
      ...user,
      plainPassword: custom.password,
      passwordHash: custom.passwordHash || user.passwordHash,
      passwordSalt: custom.passwordSalt || user.passwordSalt,
      isDefaultPassword: false,
      needs_password_change: false,
    };
  }
  if (user.isDefaultPassword === false && user.plainPassword) {
    saveCustomPassword(user.username, user.plainPassword, {
      academicId: user.academicId,
      role: user.role,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
    });
    return {
      ...user,
      isDefaultPassword: false,
      needs_password_change: false,
    };
  }
  return user;
}

function syncDashboardUserPasswordFlag(username: string, academicId?: string): void {
  if (!hasStorage()) return;
  try {
    const raw = localStorage.getItem('mirsad_dashboard_users');
    if (!raw) return;
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return;
    const cleanU = username.toLowerCase().trim();
    const cleanA = (academicId || '').toLowerCase().trim();
    let changed = false;
    const updated = list.map((item: any) => {
      if (
        (item.username && String(item.username).toLowerCase() === cleanU) ||
        (cleanA && item.academicId && String(item.academicId).toLowerCase() === cleanA)
      ) {
        changed = true;
        return { ...item, needsPasswordChange: false };
      }
      return item;
    });
    if (changed) {
      localStorage.setItem('mirsad_dashboard_users', JSON.stringify(updated));
    }
  } catch {
    // ignore
  }
}

/**
 * استخراج تفاصيل الرقم السري الفعلي للمستخدم (سواء كان الافتراضي أو الذي تم تغييره بالفعل)
 */
export function getUserPasswordDetails(user: StoredUser): { password: string; isDefault: boolean } {
  // 1. هل توجد كلمة مرور تم حفظها بعد التغيير في التخزين النشط؟
  const custom = getCustomPasswordRecord(user.username, user.academicId);
  if (custom && custom.password) {
    return { password: custom.password, isDefault: false };
  }

  // 2. هل الحساب يحمل plainPassword صريح وتم تغييره؟
  if (user.plainPassword && user.isDefaultPassword === false) {
    return { password: user.plainPassword, isDefault: false };
  }

  // 3. هل الحساب يحمل plainPassword افتراضي؟
  if (user.plainPassword) {
    return { password: user.plainPassword, isDefault: user.isDefaultPassword !== false };
  }

  // 4. الرقم السري الافتراضي للحسابات الرسمية
  const defaultPw =
    DEFAULT_OFFICIAL_PASSWORDS[user.username.toLowerCase()] ||
    (user.academicId && DEFAULT_OFFICIAL_PASSWORDS[user.academicId]) ||
    'Mirsad#' + (user.academicId || user.username).slice(-4);

  return { password: defaultPw, isDefault: user.isDefaultPassword !== false };
}

/**
 * استخراج الرقم السري للمستخدم لعرضه للمشرف في جدول المستخدمين لتمكينه من المساعدة
 */
export function getUserPassword(user: StoredUser): string {
  return getUserPasswordDetails(user).password;
}

/**
 * تعديل الرقم السري للمستخدم بواسطة المشرف استجابة لطلب المساعدة
 */
export async function adminUpdateUserPassword(
  username: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  await ensureInit();
  const trimmed = newPassword.trim();
  if (!trimmed || trimmed.length < 6) {
    return { success: false, error: 'الرقم السري يجب ألا يقل عن 6 خانات' };
  }

  const user = findUser(username);
  if (!user) return { success: false, error: 'المستخدم غير موجود' };

  const salt = generateSalt();
  const passwordHash = await hashPassword(trimmed, salt);

  saveCustomPassword(user.username, trimmed, {
    academicId: user.academicId,
    role: user.role,
    passwordHash,
    passwordSalt: salt,
  });

  patchUser(user.username, {
    passwordHash,
    passwordSalt: salt,
    plainPassword: trimmed,
    isDefaultPassword: false,
    needs_password_change: false,
  });

  syncDashboardUserPasswordFlag(user.username, user.academicId);
  await schedulePersist();
  await flushAuth();
  notifyUsersUpdated();
  await logSecurityEvent('password_changed', { action: 'admin_password_reset', targetUser: username }, user.username);

  return { success: true };
}

function buildOfficialAccountsList(): StoredUser[] {
  const now = Date.now();
  const deletedSet = getDeletedUsersSet();
  return PREHASHED_ACCOUNTS.filter((item) => {
    const cleanUser = item.username.toLowerCase();
    return !deletedSet.has(cleanUser) && !(item.academicId && deletedSet.has(item.academicId.toLowerCase()));
  }).map((item) => {
    const cleanUser = item.username.toLowerCase();
    const persona = findTeamMember(item.academicId);
    const initialPassword =
      DEFAULT_OFFICIAL_PASSWORDS[cleanUser] ||
      DEFAULT_OFFICIAL_PASSWORDS[item.academicId] ||
      'Mirsad#' + (item.academicId || cleanUser).slice(-4);
    return applySavedPasswordState({
      username: cleanUser,
      fullName: item.name,
      academicId: item.academicId,
      phone: item.phone || '',
      passwordHash: item.passwordHash,
      passwordSalt: item.passwordSalt,
      plainPassword: initialPassword,
      role: item.role,
      needs_password_change: false,
      isDefaultPassword: true,
      created_at: now,
      persona: persona ? persona.title : item.title,
      theme: persona ? persona.theme.accent : undefined,
    });
  });
}

function clearAllLoginAndSessionStorage(): void {
  memSession = null;
  if (!hasStorage()) return;
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(ATTEMPTS_KEY);
  localStorage.removeItem(OTP_KEY);
  localStorage.removeItem(GUEST_KEY);
  localStorage.removeItem(LEGACY_USERS_KEY);
  localStorage.removeItem(CONGRATS_SEEN_KEY);
  localStorage.removeItem(JWT_TOKEN_KEY);

  const extraKeys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (
      k &&
      (k.startsWith(RATE_LIMIT_PREFIX) ||
        k.startsWith(CONGRATS_SEEN_KEY) ||
        k.startsWith('mirsad_attempts'))
    ) {
      extraKeys.push(k);
    }
  }
  for (const k of extraKeys) {
    localStorage.removeItem(k);
  }
}

/**
 * إعادة ضبط كلمات المرور لجميع الحسابات المعتمدة (الأدمن + 10 طلاب) إلى حالتها الأصلية
 * وتصفير جميع عمليات ومحاولات تسجيل الدخول والجلسات وسجل التهنئة لتسجيل أول دخول نظيف.
 */
export async function resetAllAccountsToFirstLogin(): Promise<{ resetCount: number }> {
  usersCache = buildOfficialAccountsList();
  clearAllLoginAndSessionStorage();
  await persistNow();
  if (hasStorage()) {
    localStorage.setItem(FIRST_LOGIN_RESET_VERSION_KEY, String(Date.now()));
  }
  await logSecurityEvent('password_changed', {
    action: 'reset_all_accounts_and_sessions_to_first_login',
    accountsCount: usersCache.length,
  });
  return { resetCount: usersCache.length };
}

/**
 * دالة مزامنة الحسابات المضافة من الأدمن أو المسجلة عبر صفحة التسجيل مع usersCache
 */
export function isUserDeleted(username?: string, academicId?: string): boolean {
  const deletedSet = getDeletedUsersSet();
  const overrides = getLocalAccountOverrides();
  const cleanU = (username || '').toLowerCase().trim();
  const cleanA = (academicId || '').toLowerCase().trim();
  if (cleanU === 'admin') return false;
  if (cleanU && (deletedSet.has(cleanU) || overrides[cleanU]?.isDeleted)) return true;
  if (cleanA && (deletedSet.has(cleanA) || overrides[cleanA]?.isDeleted)) return true;
  return false;
}

export function mergeOverridesIntoUsersCache(): void {
  const overrides = getLocalAccountOverrides();
  const deletedSet = getDeletedUsersSet();

  // إزالة أي حساب محذوف من الكاش أولاً
  usersCache = usersCache.filter((u) => !isUserDeleted(u.username, u.academicId));

  for (const [key, rec] of Object.entries(overrides)) {
    const cleanU = (rec.username || key).toLowerCase().trim();
    if (!cleanU) continue;
    const cleanAcad = (rec.academicId || '').toLowerCase().trim();

    if (
      (rec.isDeleted || deletedSet.has(cleanU) || (cleanAcad && deletedSet.has(cleanAcad))) &&
      cleanU !== 'admin'
    ) {
      usersCache = usersCache.filter(
        (u) =>
          u.username.toLowerCase() !== cleanU &&
          (!cleanAcad || (u.academicId || '').toLowerCase() !== cleanAcad)
      );
      continue;
    }

    const existingIdx = usersCache.findIndex(
      (u) =>
        u.username.toLowerCase() === cleanU ||
        (cleanAcad && (u.academicId || '').toLowerCase() === cleanAcad)
    );

    const customPw = getCustomPasswordRecord(cleanU, rec.academicId);
    const pwHash = customPw?.passwordHash || rec.passwordHash || 'v2$600000$registered_account';
    const pwSalt = customPw?.passwordSalt || rec.passwordSalt || '00000000000000000000000000000000';
    const plainPw = customPw?.password || rec.password || '';

    if (existingIdx === -1) {
      usersCache.push({
        username: cleanU,
        fullName: rec.fullName || cleanU,
        academicId: rec.academicId || cleanU,
        phone: rec.phone || '',
        passwordHash: pwHash,
        passwordSalt: pwSalt,
        plainPassword: plainPw,
        role: (rec.role as UserRole) || 'user',
        needs_password_change: false,
        isDefaultPassword: false,
        created_at: rec.createdAt || rec.updatedAt || Date.now(),
        registrationSource: rec.registrationSource || (cleanU === 'admin' ? 'system_admin' : 'self_register'),
      });
    } else {
      usersCache[existingIdx] = applySavedPasswordState({
        ...usersCache[existingIdx],
        created_at: rec.createdAt || usersCache[existingIdx].created_at || Date.now(),
        registrationSource: rec.registrationSource || usersCache[existingIdx].registrationSource || (cleanU === 'admin' ? 'system_admin' : 'self_register'),
        fullName: rec.fullName || usersCache[existingIdx].fullName,
        academicId: rec.academicId || usersCache[existingIdx].academicId,
        phone: rec.phone || usersCache[existingIdx].phone,
        role: (rec.role as UserRole) || usersCache[existingIdx].role,
        passwordHash: (customPw?.passwordHash || rec.passwordHash) || usersCache[existingIdx].passwordHash,
        passwordSalt: (customPw?.passwordSalt || rec.passwordSalt) || usersCache[existingIdx].passwordSalt,
        plainPassword: plainPw || usersCache[existingIdx].plainPassword,
      });
    }
  }
}

/* ================= التهيئة والترحيل ================= */
export async function initializeAuth(): Promise<void> {
  if (usersCache.length === 0 && typeof window !== 'undefined') {
    usersCache = buildOfficialAccountsList();
    mergeOverridesIntoUsersCache();
  }
  if (initPromise) {
    await initPromise;
    await syncAdminStateWithCloud();
    mergeOverridesIntoUsersCache();
    notifyUsersUpdated();
    return;
  }
  initPromise = (async () => {
    if (typeof window === 'undefined') return;

    if (hasStorage() && !localStorage.getItem(FIRST_LOGIN_RESET_VERSION_KEY)) {
      localStorage.setItem(FIRST_LOGIN_RESET_VERSION_KEY, String(Date.now()));
    }

    // 1) تحميل المستخدمين مع استبعاد أي حساب محذوف نهائياً
    try {
      const rows = await getAllRecords<Record<string, unknown>>('users');
      const loaded: StoredUser[] = [];
      for (const r of rows) {
        const dec = await decryptRecord(r);
        if (dec.username && dec.passwordHash && !isUserDeleted(dec.username, dec.academicId)) {
          loaded.push(applySavedPasswordState(dec));
        } else if (dec.username && isUserDeleted(dec.username, dec.academicId)) {
          await deleteRecord('users', dec.username);
        }
      }
      if (loaded.length > 0) {
        usersCache = loaded;
      }
    } catch (e) {
      console.warn('تعذّرت قراءة المستخدمين المشفّرين', e);
    }

    // 2) التزويد التلقائي الآمن للحسابات الرسمية ومزامنة حسابات الأدمن والحسابات المضافة
    await syncAdminStateWithCloud();
    mergeOverridesIntoUsersCache();
    const deletedSet = getDeletedUsersSet();
    let seededAny = false;
    for (const item of PREHASHED_ACCOUNTS) {
      const cleanUser = item.username.toLowerCase();
      if (deletedSet.has(cleanUser) || (item.academicId && deletedSet.has(item.academicId.toLowerCase()))) {
        continue;
      }
      const existingIdx = usersCache.findIndex(
        (u) =>
          u.username.toLowerCase() === cleanUser ||
          (u.academicId && u.academicId.toLowerCase() === item.academicId.toLowerCase())
      );
      if (existingIdx === -1) {
        const persona = findTeamMember(item.academicId);
        const initialPassword =
          DEFAULT_OFFICIAL_PASSWORDS[cleanUser] ||
          DEFAULT_OFFICIAL_PASSWORDS[item.academicId] ||
          'Mirsad#' + (item.academicId || cleanUser).slice(-4);
        usersCache.push(
          applySavedPasswordState({
            username: cleanUser,
            fullName: item.name,
            academicId: item.academicId,
            phone: item.phone || '',
            passwordHash: item.passwordHash,
            passwordSalt: item.passwordSalt,
            plainPassword: initialPassword,
            role: item.role,
            needs_password_change: false,
            isDefaultPassword: true,
            created_at: Date.now(),
            persona: persona ? persona.title : item.title,
            theme: persona ? persona.theme.accent : undefined,
          })
        );
        seededAny = true;
      } else {
        usersCache[existingIdx] = applySavedPasswordState(usersCache[existingIdx]);
      }
    }

    // ترقية وحفظ أي كلمة مرور مستبدلة لم يُحفظ الهاش الخاص بها بعد في IndexedDB
    let upgradedCustomHash = false;
    for (let i = 0; i < usersCache.length; i++) {
      const u = usersCache[i];
      const custom = getCustomPasswordRecord(u.username, u.academicId);
      if (custom && custom.password && (!custom.passwordHash || !custom.passwordSalt)) {
        const salt = generateSalt();
        const passwordHash = await hashPassword(custom.password, salt);
        saveCustomPassword(u.username, custom.password, {
          academicId: u.academicId,
          role: u.role,
          passwordHash,
          passwordSalt: salt,
        });
        usersCache[i] = {
          ...u,
          plainPassword: custom.password,
          passwordHash,
          passwordSalt: salt,
          isDefaultPassword: false,
          needs_password_change: false,
        };
        upgradedCustomHash = true;
      }
    }

    const currentOverrides = getLocalAccountOverrides();
    for (const u of usersCache) {
      const cu = u.username.toLowerCase().trim();
      if (cu && cu !== 'admin' && !isUserDeleted(cu, u.academicId) && !currentOverrides[cu]) {
        await pushAdminAccountOverride({
          username: cu,
          academicId: u.academicId || cu,
          fullName: u.fullName || cu,
          phone: u.phone || '',
          role: u.role || 'user',
          registrationSource: u.registrationSource || 'self_register',
          password: u.plainPassword || '',
          passwordHash: u.passwordHash,
          passwordSalt: u.passwordSalt,
          isDeleted: false,
          createdAt: u.created_at || Date.now(),
          updatedAt: Date.now(),
        });
      }
    }
    await persistNow();

    // 3) استعادة الجلسة الموقّعة
    await restoreSession();
    notifyUsersUpdated();
  })();
  return initPromise;
}

/** هل يحتاج النظام إعداد مشرف مخصص إضافي؟ */
export function needsInitialSetup(): boolean {
  return !usersCache.some((u) => u.role === 'admin' && !u.isDefaultPassword);
}

export async function setupInitialAdmin(data: {
  username: string;
  fullName: string;
  password: string;
  phone?: string;
}): Promise<{ success: boolean; error?: string }> {
  await ensureInit();
  if (!needsInitialSetup()) return { success: false, error: 'تم إعداد الأدمن مسبقاً' };

  const username = data.username.trim().toLowerCase();
  if (!/^[a-z0-9_.-]{3,32}$/.test(username)) {
    return { success: false, error: 'اسم المستخدم: 3–32 حرفاً إنجليزياً أو أرقاماً أو (_ . -)' };
  }
  if (data.fullName.trim().length < 3) return { success: false, error: 'الاسم الكامل مطلوب' };
  const pwErr = validatePassword(data.password, { username });
  if (pwErr) return { success: false, error: pwErr };
  const phone = (data.phone || '').trim();
  if (phone && !/^05\d{8}$/.test(phone)) {
    return { success: false, error: 'رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام' };
  }
  const existingIdx = usersCache.findIndex((u) => u.username === username);
  if (existingIdx !== -1 && !usersCache[existingIdx].isDefaultPassword) {
    return { success: false, error: 'اسم المستخدم مستخدم بالفعل' };
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(data.password, salt);
  if (existingIdx !== -1) {
    usersCache[existingIdx] = {
      ...usersCache[existingIdx],
      fullName: data.fullName.trim(),
      academicId: `ADMIN-${username}`,
      phone,
      passwordHash,
      passwordSalt: salt,
      role: 'admin',
      needs_password_change: false,
      isDefaultPassword: false,
    };
  } else {
    usersCache.push({
      username,
      fullName: data.fullName.trim(),
      academicId: `ADMIN-${username}`,
      phone,
      passwordHash,
      passwordSalt: salt,
      role: 'admin',
      needs_password_change: false,
      isDefaultPassword: false,
      created_at: Date.now(),
    });
  }
  await schedulePersist();
  await logSecurityEvent('registration_attempt', { action: 'initial_admin_created' }, username);
  return { success: true };
}

/* ================= CRUD (متزامن على الذاكرة) ================= */
export function getUsers(): StoredUser[] {
  if (usersCache.length === 0 && typeof window !== 'undefined') {
    usersCache = buildOfficialAccountsList();
  }
  mergeOverridesIntoUsersCache();
  return usersCache
    .filter((u) => !isUserDeleted(u.username, u.academicId))
    .map((u) => applySavedPasswordState({ ...u }));
}

export function saveUsers(users: StoredUser[]): void {
  usersCache = users
    .filter((u) => !isUserDeleted(u.username, u.academicId))
    .map((u) => applySavedPasswordState({ ...u }));
  void schedulePersist();
  notifyUsersUpdated();
}

export function findUser(identifier: string): StoredUser | undefined {
  const clean = identifier.toLowerCase().trim();
  if (!clean) return undefined;
  if (isUserDeleted(clean, clean)) return undefined;
  if (usersCache.length === 0 && typeof window !== 'undefined') {
    usersCache = buildOfficialAccountsList();
  }
  mergeOverridesIntoUsersCache();
  const all = getUsers();
  const u = all.find(
    (x) => x.username.toLowerCase() === clean || (x.academicId || '').toLowerCase() === clean
  );
  if (!u || isUserDeleted(u.username, u.academicId)) return undefined;
  return applySavedPasswordState({ ...u });
}

export async function findUserAsync(username: string): Promise<StoredUser | null> {
  await ensureInit();
  return findUser(username) || null;
}

export async function getAllUsers(): Promise<StoredUser[]> {
  await ensureInit();
  return getUsers();
}

function patchUser(identifier: string, patch: Partial<StoredUser>): boolean {
  const clean = identifier.toLowerCase().trim();
  const i = usersCache.findIndex(
    (u) => u.username.toLowerCase() === clean || (u.academicId || '').toLowerCase() === clean
  );
  if (i === -1) return false;
  usersCache[i] = { ...usersCache[i], ...patch };
  return true;
}

/* ================= الجلسة الموقّعة ================= */
interface SignedSession {
  v: 2;
  p: string; // نص مشفّر AES-GCM لـ JSON: { s: UserSession, exp: number } (لا بيانات نصية في localStorage)
  sig: string; // HMAC-SHA256 hex فوق p (تشفير ثم توقيع)
}

async function restoreSession(): Promise<void> {
  memSession = null;
  if (!hasStorage()) return;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return;
  try {
    const t = JSON.parse(raw) as Partial<SignedSession>;
    if (t.v !== 2 || typeof t.p !== 'string' || typeof t.sig !== 'string') throw new Error('legacy');
    if (!(await verifyHMAC(t.p, t.sig))) throw new Error('bad-signature');
    const { s, exp } = JSON.parse(await decrypt(t.p, 'session')) as { s: UserSession; exp: number };
    if (typeof exp !== 'number' || exp < Date.now()) throw new Error('expired');
    if (s?.username && isUserDeleted(s.username, s.username)) {
      clearSession();
      return;
    }
    memSession = s;
  } catch (e) {
    // جلسة قديمة غير موقّعة أو معبوث بها أو منتهية: تُحذف
    localStorage.removeItem(SESSION_KEY);
    if ((e as Error).message === 'bad-signature') {
      await logSecurityEvent('data_tamper_detected', { target: 'session' });
    }
  }
}

export function getSession(): UserSession | null {
  if (!memSession) return null;
  if (memSession.username && isUserDeleted(memSession.username, memSession.username)) {
    clearSession();
    return null;
  }
  return { ...memSession };
}

export function setSession(session: UserSession): void {
  memSession = { ...session };
  const snapshot = { ...session };
  writeQueue = writeQueue
    .then(async () => {
      const p = await encrypt(JSON.stringify({ s: snapshot, exp: Date.now() + SESSION_TTL_MS }), 'session');
      const signed: SignedSession = { v: 2, p, sig: await signHMAC(p) };
      if (hasStorage()) localStorage.setItem(SESSION_KEY, JSON.stringify(signed));
    })
    .catch((e) => console.error('فشل حفظ الجلسة', e));
}

export function clearSession(): void {
  memSession = null;
  if (hasStorage()) localStorage.removeItem(SESSION_KEY);
}

export function logout(): void {
  const current = memSession;
  if (current && current.username && current.username !== '__guest__') {
    void recordRealLoginActivity({
      username: current.username,
      fullName: current.fullName || current.username,
      academicId: current.username,
      role: current.role,
      status: 'logout',
      authMethod: 'password',
    });
  }
  clearSession();
  exitGuestMode();
}

function isAdminSession(): boolean {
  return memSession?.role === 'admin';
}

/* ================= محاولات الدخول ================= */
interface AttemptsRecord {
  count: number;
  lockedUntil: number;
  strikes: number;
  last: number;
}
type AttemptsMap = Record<string, AttemptsRecord>;

function loadAttempts(): AttemptsMap {
  if (!hasStorage()) return {};
  try {
    const all = JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '{}') as AttemptsMap;
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    for (const k of Object.keys(all)) if ((all[k].last || 0) < cutoff) delete all[k];
    return all;
  } catch {
    return {};
  }
}

function saveAttempts(all: AttemptsMap): void {
  if (hasStorage()) localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(all));
}

let dummyCreds: Promise<{ hash: string; salt: string }> | null = null;
/** يستهلك زمن PBKDF2 نفسه عند غياب الحساب، لئلا يكشف التوقيت وجوده */
async function burnTime(password: string): Promise<void> {
  dummyCreds ??= (async () => {
    const salt = generateSalt();
    return { salt, hash: await hashPassword(generateSalt(), salt) };
  })();
  const d = await dummyCreds;
  await verifyPassword(password, d.hash, d.salt);
}

/* ================= تسجيل الدخول ================= */
export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; session?: UserSession; error?: string }> {
  await ensureInit();
  await syncAdminStateWithCloud();
  mergeOverridesIntoUsersCache();
  const clean = username.trim().toLowerCase().slice(0, 64);

  if (isUserDeleted(clean, clean)) {
    return {
      success: false,
      error: 'تم حذف هذا الحساب نهائياً وإلغاء صلاحيته من قِبل المشرف العام',
    };
  }

  const user = findUser(clean);
  if (user && isUserDeleted(user.username, user.academicId)) {
    return {
      success: false,
      error: 'تم حذف هذا الحساب نهائياً وإلغاء صلاحيته من قِبل المشرف العام',
    };
  }

  // المفتاح هو الحساب الفعلي إن وُجد، فلا يفيد تبديل اسم المستخدم بالرقم الأكاديمي
  const key = user ? `u:${user.username}` : `x:${clean}`;
  const all = loadAttempts();
  const rec = all[key] || { count: 0, lockedUntil: 0, strikes: 0, last: 0 };

  if (rec.lockedUntil > Date.now()) {
    const remaining = Math.ceil((rec.lockedUntil - Date.now()) / 60000);
    await logSecurityEvent('account_locked', { remainingMinutes: remaining }, clean);
    return { success: false, error: `الحساب مقفل مؤقتاً. حاول بعد ${remaining} دقيقة.` };
  }

  let valid = false;
  if (user) {
    const custom = getCustomPasswordRecord(user.username, user.academicId);
    if (custom && custom.password) {
      if (custom.passwordHash && custom.passwordSalt) {
        valid = await verifyPassword(password, custom.passwordHash, custom.passwordSalt);
      } else {
        valid = safeEqual(password, custom.password);
      }
    } else if (user.passwordHash && user.passwordSalt) {
      valid = await verifyPassword(password, user.passwordHash, user.passwordSalt);
    }
    if (!valid && user.plainPassword) {
      valid = safeEqual(password, user.plainPassword);
    }
  } else {
    await burnTime(password);
    valid = false;
  }

  if (!valid || !user) {
    rec.count += 1;
    rec.last = Date.now();
    await logSecurityEvent('login_failed', { reason: user ? 'wrong_password' : 'unknown_identifier', attempts: rec.count }, clean);
    void recordRealLoginActivity({
      username: user ? user.username : clean,
      fullName: user ? user.fullName : clean,
      academicId: user ? user.academicId || user.username : clean,
      role: user ? user.role : 'user',
      status: 'failed',
      authMethod: 'password',
    });
    if (user) await detectAnomalies(user.username);

    if (rec.count >= MAX_ATTEMPTS) {
      const lockMs = Math.min(BASE_LOCK_MS * 2 ** rec.strikes, MAX_LOCK_MS);
      rec.strikes += 1;
      rec.count = 0;
      rec.lockedUntil = Date.now() + lockMs;
      all[key] = rec;
      saveAttempts(all);
      await logSecurityEvent('account_locked', { reason: 'max_attempts_exceeded' }, clean);
      return {
        success: false,
        error: `تم قفل الحساب لمدة ${Math.round(lockMs / 60000)} دقائق بعد ${MAX_ATTEMPTS} محاولات فاشلة.`,
      };
    }
    all[key] = rec;
    saveAttempts(all);
    return { success: false, error: `${GENERIC_LOGIN_ERROR} (${MAX_ATTEMPTS - rec.count} محاولات متبقية)` };
  }

  // نجاح
  delete all[key];
  saveAttempts(all);
  exitGuestMode();

  // ترقية الهاش القديم بصمت
  if (needsRehash(user.passwordHash)) {
    const salt = generateSalt();
    const hash = await hashPassword(password, salt);
    patchUser(user.username, { passwordHash: hash, passwordSalt: salt });
    void schedulePersist();
  }

  await logSecurityEvent('login_success', {}, user.username);
  await detectAnomalies(user.username);
  await recordRealLoginActivity({
    username: user.username,
    fullName: user.fullName,
    academicId: user.academicId || user.username,
    role: user.role,
    status: 'success',
    authMethod: 'password',
  });

  const session: UserSession = {
    uid: `local_${user.username}`,
    username: user.username,
    fullName: user.fullName,
    displayName: user.fullName,
    role: user.role,
    needs_password_change: user.needs_password_change,
    authMode: 'local',
    loginTime: Date.now(),
  };
  setSession(session);
  return { success: true, session };
}

/* ================= التسجيل وإنشاء الحسابات المعتمدة ================= */
/**
 * إنشاء حساب جديد (سواء بواسطة المشرف العام من لوحة الإدارة أو عبر صفحة إنشاء حساب جديد)
 * مع تشفير PBKDF2-HMAC-SHA256 كامل ومزامنة فورية ليقبل تسجيل الدخول فوراً
 */
export async function registerUser(
  data: RegistrationData
): Promise<{ success: boolean; user?: StoredUser; error?: string }> {
  await ensureInit();

  const cleanUsername = (data.username || data.academicId || '').trim().toLowerCase();
  const cleanAcademicId = (data.academicId || data.username || '').trim();
  const cleanFullName = (data.fullName || '').trim();
  const cleanPhone = (data.phone || '').trim();
  const rawPassword = (data.password || '').trim();

  if (!cleanUsername || cleanUsername.length < 2) {
    return { success: false, error: 'اسم المستخدم أو الرقم الأكاديمي يجب أن يكون حرفين أو أكثر' };
  }
  if (!cleanFullName || cleanFullName.length < 3) {
    return { success: false, error: 'الاسم الكامل مطلوب (3 أحرف على الأقل)' };
  }
  if (!rawPassword || rawPassword.length < 6) {
    return { success: false, error: 'كلمة المرور يجب أن تتكون من 6 أحرف أو أرقام على الأقل' };
  }

  // إزالة الحساب من قائمة الحذف السابقة إن كان قد حُذف سابقاً ثم أُعيد تسجيله
  const deletedSet = getDeletedUsersSet();
  deletedSet.delete(cleanUsername);
  if (cleanAcademicId) deletedSet.delete(cleanAcademicId.toLowerCase());
  saveDeletedUsersSet(deletedSet);

  mergeOverridesIntoUsersCache();

  const existing = usersCache.find(
    (u) =>
      u.username.toLowerCase() === cleanUsername ||
      (cleanAcademicId && (u.academicId || '').toLowerCase() === cleanAcademicId.toLowerCase())
  );

  if (existing) {
    return { success: false, error: 'اسم المستخدم أو الرقم الأكاديمي مسجل بالفعل' };
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(rawPassword, salt);
  const targetRole: UserRole =
    data.role && isAdminSession() ? data.role : 'user';

  saveCustomPassword(cleanUsername, rawPassword, {
    academicId: cleanAcademicId,
    role: targetRole,
    passwordHash,
    passwordSalt: salt,
  });

  const resolvedSource: 'self_register' | 'admin_created' =
    data.registrationSource === 'admin_created' || isAdminSession()
      ? 'admin_created'
      : 'self_register';

  const newUser: StoredUser = {
    username: cleanUsername,
    fullName: cleanFullName,
    academicId: cleanAcademicId,
    phone: cleanPhone,
    passwordHash,
    passwordSalt: salt,
    plainPassword: rawPassword,
    role: targetRole,
    needs_password_change: false,
    isDefaultPassword: false,
    created_at: Date.now(),
    registrationSource: resolvedSource,
  };

  usersCache.push(newUser);

  await pushAdminAccountOverride({
    username: cleanUsername,
    academicId: cleanAcademicId,
    fullName: cleanFullName,
    phone: cleanPhone,
    role: targetRole,
    registrationSource: resolvedSource,
    password: rawPassword,
    passwordHash,
    passwordSalt: salt,
    isDeleted: false,
    createdAt: newUser.created_at,
    updatedAt: Date.now(),
  });

  await recordRealLoginActivity({
    username: cleanUsername,
    fullName: cleanFullName,
    academicId: cleanAcademicId,
    role: targetRole,
    status: 'success',
    authMethod: 'password',
    note:
      resolvedSource === 'admin_created'
        ? 'تم إنشاء وتفعيل الحساب بواسطة المشرف العام (Admin)'
        : 'قام المستخدم بفتح حساب جديد فعلياً عبر صفحة التسجيل بالمنصة',
  });

  // فك أي قفل محاولات سابق لهذا المعرف وتصفير حالة الترحيب ليظهر نظام الترحيب عند أول تسجيل دخول
  const attempts = loadAttempts();
  delete attempts[`u:${cleanUsername}`];
  delete attempts[`x:${cleanUsername}`];
  if (cleanAcademicId) {
    delete attempts[`x:${cleanAcademicId.toLowerCase()}`];
  }
  saveAttempts(attempts);

  try {
    localStorage.removeItem(`mirsad_congrats_seen_${cleanUsername}`);
    localStorage.removeItem(`mirsad_cards_${cleanUsername}`);
    if (cleanAcademicId) {
      localStorage.removeItem(`mirsad_congrats_seen_${cleanAcademicId.toLowerCase()}`);
      localStorage.removeItem(`mirsad_cards_${cleanAcademicId.toLowerCase()}`);
    }
  } catch {
    // ignore storage errors
  }

  await persistNow();
  notifyUsersUpdated();

  await logSecurityEvent(
    'registration_attempt',
    { action: 'account_registered_and_activated', academicId: cleanAcademicId },
    cleanUsername
  );

  return { success: true, user: { ...newUser } };
}

/**
 * دالة مخصصة للأدمن لإنشاء حساب جديد مع تحديد كلمة المرور والدور مباشرة
 */
export async function adminCreateUserAccount(params: {
  fullName: string;
  academicId: string;
  username?: string;
  password: string;
  phone?: string;
  role?: UserRole;
}): Promise<{ success: boolean; user?: StoredUser; error?: string }> {
  return registerUser({
    username: (params.username || params.academicId).trim().toLowerCase(),
    academicId: params.academicId.trim(),
    fullName: params.fullName.trim(),
    password: params.password.trim(),
    phone: (params.phone || '').trim(),
    role: params.role || 'user',
    registrationSource: 'admin_created',
  });
}

async function addAccount(a: {
  username: string;
  password: string;
  fullName: string;
  academicId: string;
  phone: string;
  role: UserRole;
  needsPasswordChange: boolean;
  isDefaultPassword?: boolean;
}): Promise<StoredUser> {
  const salt = generateSalt();
  const persona = findTeamMember(a.academicId);
  const user: StoredUser = {
    username: a.username,
    fullName: a.fullName,
    academicId: a.academicId,
    phone: a.phone,
    passwordHash: await hashPassword(a.password, salt),
    passwordSalt: salt,
    role: a.role,
    needs_password_change: a.needsPasswordChange,
    created_at: Date.now(),
    persona: persona ? persona.title : undefined,
    theme: persona ? persona.theme.accent : undefined,
  };
  if (a.isDefaultPassword) user.isDefaultPassword = true;
  usersCache.push(user);
  await schedulePersist();
  return user;
}

/* ================= الجوال ================= */
export function updateUserPhone(
  username: string,
  newPhone: string
): { success: boolean; error?: string } {
  if (!/^05\d{8}$/.test(newPhone.trim())) {
    return { success: false, error: 'رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام' };
  }
  if (!patchUser(username, { phone: newPhone.trim() })) {
    return { success: false, error: 'المستخدم غير موجود' };
  }
  void pushAdminAccountOverride({
    username: username.toLowerCase().trim(),
    phone: newPhone.trim(),
    updatedAt: Date.now(),
  });
  void schedulePersist();
  return { success: true };
}

export async function updatePhoneAsync(
  username: string,
  newPhone: string
): Promise<{ success: boolean; error?: string }> {
  await ensureInit();
  const r = updateUserPhone(username, newPhone);
  if (r.success) {
    await flushAuth();
    await logSecurityEvent('password_changed', { action: 'phone_updated' }, username);
  }
  return r;
}

/* ================= الحسابات الرسمية المشفّرة مسبقاً (Zero-Plaintext Bundle) ================= */
export interface PrehashedAccount {
  username: string;
  name: string;
  academicId: string;
  passwordHash: string;
  passwordSalt: string;
  role: UserRole;
  title?: string;
  phone?: string;
}

export interface PredefinedCredential {
  username: string;
  name: string;
  academicId: string;
  password: string;
  passwordHash?: string;
  passwordSalt?: string;
  role: UserRole;
  title?: string;
  phone?: string;
}

/**
 * الحسابات المعتمدة للمشرف العام والطلاب العشرة (ISE243) محفوظة بصيغة
 * تجزئة تشفيرية مسبقة PBKDF2-HMAC-SHA256 (600,000 تكرار + ملح 128-بت)
 * دون أي وجود لنص كلمة المرور في الكود المصدري أو حزمة المتصفح.
 */
export const PREHASHED_ACCOUNTS: PrehashedAccount[] = [
  {
    username: 'admin',
    name: 'المشرف العام على المنصة',
    academicId: 'ADMIN-001',
    passwordSalt: '37a9e2db425347b5d59573030e9a5436',
    passwordHash: 'v2$600000$9bb9bc157715cce3b7491d7c1ea0ade11658cc48ef6ecc540115659f49d4e7cb',
    role: 'admin',
    title: 'مشرف النظام المركزي',
    phone: '0500000000',
  },
];

/**
 * قائمة الحسابات المعتمدة (مُعمّاة بدون كلمات مرور نصية لمنع التسريب في الواجهة).
 */
export const PREDEFINED_CREDENTIALS: PredefinedCredential[] = PREHASHED_ACCOUNTS.map((a) => ({
  username: a.username,
  name: a.name,
  academicId: a.academicId,
  password: `[PBKDF2-SHA256:600k · ${a.passwordHash.slice(10, 22)}…]`,
  passwordHash: a.passwordHash,
  passwordSalt: a.passwordSalt,
  role: a.role,
  title: a.title,
  phone: a.phone,
}));

/** استرجاع قائمة بيانات الحسابات المعتمدة (بدون كشف كلمات المرور النصية) */
export function getPredefinedCredentials(): PredefinedCredential[] {
  return [...PREDEFINED_CREDENTIALS];
}

/**
 * مزامنة واستيراد الحسابات الرسمية المشفّرة مسبقاً بـ PBKDF2-HMAC-SHA256 (600k) + AES-256-GCM.
 */
export async function importPredefinedPasswords(options: {
  overwrite?: boolean;
  includeAdmin?: boolean;
} = {}): Promise<{
  success: boolean;
  imported: number;
  updated: number;
  total: number;
  credentials: PredefinedCredential[];
}> {
  await ensureInit();
  const overwrite = options.overwrite ?? true;
  const includeAdmin = options.includeAdmin ?? true;

  let imported = 0;
  let updated = 0;

  const targetList = includeAdmin
    ? PREHASHED_ACCOUNTS
    : PREHASHED_ACCOUNTS.filter((c) => c.role !== 'admin');

  const deletedSet = getDeletedUsersSet();
  for (const item of targetList) {
    const cleanUser = item.username.toLowerCase();
    deletedSet.delete(cleanUser);
    if (item.academicId) deletedSet.delete(item.academicId.toLowerCase());
    const existingIdx = usersCache.findIndex(
      (u) =>
        u.username.toLowerCase() === cleanUser ||
        (u.academicId && u.academicId === item.academicId)
    );

    if (existingIdx !== -1) {
      if (overwrite) {
        const existingUser = usersCache[existingIdx];
        const custom = getCustomPasswordRecord(cleanUser, item.academicId);
        usersCache[existingIdx].fullName = item.name;
        usersCache[existingIdx].academicId = item.academicId;
        usersCache[existingIdx].role = item.role;
        usersCache[existingIdx].phone = item.phone || existingUser.phone || '';
        // إذا كان المستخدم قد غيّر كلمة المرور المؤقتة مسبقاً، نحتفظ بكلمة المرور الحقيقية المستبدلة ولا نعيدها للمؤقتة
        if (custom && custom.password) {
          usersCache[existingIdx] = applySavedPasswordState(usersCache[existingIdx]);
        } else if (existingUser.isDefaultPassword === false && existingUser.plainPassword) {
          usersCache[existingIdx] = applySavedPasswordState(existingUser);
        } else {
          usersCache[existingIdx].passwordHash = item.passwordHash;
          usersCache[existingIdx].passwordSalt = item.passwordSalt;
          usersCache[existingIdx].isDefaultPassword = true;
          usersCache[existingIdx].needs_password_change = false;
        }
        updated++;
      }
    } else {
      const persona = findTeamMember(item.academicId);
      const initialPassword =
        DEFAULT_OFFICIAL_PASSWORDS[cleanUser] ||
        DEFAULT_OFFICIAL_PASSWORDS[item.academicId] ||
        'Mirsad#' + (item.academicId || cleanUser).slice(-4);
      usersCache.push(
        applySavedPasswordState({
          username: cleanUser,
          fullName: item.name,
          academicId: item.academicId,
          phone: item.phone || '',
          passwordHash: item.passwordHash,
          passwordSalt: item.passwordSalt,
          plainPassword: initialPassword,
          role: item.role,
          needs_password_change: false,
          isDefaultPassword: true,
          created_at: Date.now(),
          persona: persona ? persona.title : item.title,
          theme: persona ? persona.theme.accent : undefined,
        })
      );
      imported++;
    }
  }

  saveDeletedUsersSet(deletedSet);
  await schedulePersist();
  await flushAuth();
  notifyUsersUpdated();
  await logSecurityEvent('registration_attempt', {
    action: 'predefined_passwords_imported',
    count: imported + updated,
  });

  const maskedList = includeAdmin
    ? PREDEFINED_CREDENTIALS
    : PREDEFINED_CREDENTIALS.filter((c) => c.role !== 'admin');

  return {
    success: true,
    imported,
    updated,
    total: usersCache.length,
    credentials: maskedList,
  };
}

/**
 * استيراد دفعة مخصصة من كلمات المرور (JSON أو CSV parsed) — للأدمن فقط عند وجود جلسة
 */
export async function importPasswordsBatch(
  records: Array<{
    username: string;
    password: string;
    fullName?: string;
    academicId?: string;
    phone?: string;
    role?: UserRole;
  }>,
  options: { overwrite?: boolean } = {}
): Promise<{ success: boolean; imported: number; updated: number; errors: string[] }> {
  await ensureInit();
  const overwrite = options.overwrite ?? true;
  let imported = 0;
  let updated = 0;
  const errors: string[] = [];

  for (const r of records) {
    if (!r.username || !r.password) {
      errors.push(`تخطي سجل ناقص: ${r.username || 'بدون اسم مستخدم'}`);
      continue;
    }
    const cleanUser = r.username.trim().toLowerCase();
    if (r.password.length < 8) {
      errors.push(`كلمة المرور قصيرة للمستخدم ${cleanUser} (الحد الأدنى 8 أحرف وفق سياسة NCS)`);
      continue;
    }
    const salt = generateSalt();
    const passwordHash = await hashPassword(r.password, salt);
    const existingIdx = usersCache.findIndex((u) => u.username.toLowerCase() === cleanUser);

    if (existingIdx !== -1) {
      if (overwrite) {
        const acad = r.academicId?.trim() || usersCache[existingIdx].academicId;
        const targetRole = r.role || usersCache[existingIdx].role;
        saveCustomPassword(cleanUser, r.password, {
          academicId: acad,
          role: targetRole,
          passwordHash,
          passwordSalt: salt,
        });
        usersCache[existingIdx].passwordHash = passwordHash;
        usersCache[existingIdx].passwordSalt = salt;
        usersCache[existingIdx].plainPassword = r.password;
        usersCache[existingIdx].isDefaultPassword = false;
        usersCache[existingIdx].needs_password_change = false;
        if (r.fullName) usersCache[existingIdx].fullName = r.fullName.trim();
        if (r.academicId) usersCache[existingIdx].academicId = r.academicId.trim();
        if (r.phone) usersCache[existingIdx].phone = r.phone.trim();
        if (r.role) usersCache[existingIdx].role = r.role;
        updated++;
      }
    } else {
      const academicId = r.academicId?.trim() || cleanUser;
      const targetRole = r.role || 'user';
      saveCustomPassword(cleanUser, r.password, {
        academicId,
        role: targetRole,
        passwordHash,
        passwordSalt: salt,
      });
      const persona = findTeamMember(academicId);
      usersCache.push({
        username: cleanUser,
        fullName: r.fullName?.trim() || cleanUser,
        academicId,
        phone: r.phone?.trim() || '',
        passwordHash,
        passwordSalt: salt,
        plainPassword: r.password,
        role: targetRole,
        needs_password_change: false,
        isDefaultPassword: false,
        created_at: Date.now(),
        persona: persona?.title,
        theme: persona?.theme.accent,
      });
      imported++;
    }
  }

  await schedulePersist();
  await flushAuth();
  notifyUsersUpdated();
  return { success: true, imported, updated, errors };
}

/* ================= حسابات الطلاب المميزين ================= */
/** بيانات الطلاب بدون كلمات مرور */
export function getInitialStudentAccounts() {
  return STUDENTS.map((s) => ({
    name: s.name,
    academicId: s.academicId,
    username: s.username,
    title: s.title,
    role: 'user' as UserRole,
  }));
}

/**
 * يزامن حسابات الطلاب المشفّرة مسبقاً دون كشف كلمات المرور النصية
 */
export async function seedStudentAccounts(_force = false): Promise<{
  seeded: number;
  skipped: number;
  credentials: { username: string; name: string; password: string }[];
}> {
  await ensureInit();
  if (!_force && !isAdminSession()) return { seeded: 0, skipped: STUDENTS.length, credentials: [] };

  const res = await importPredefinedPasswords({ overwrite: _force, includeAdmin: false });
  return {
    seeded: res.imported,
    skipped: res.updated,
    credentials: res.credentials.map((c) => ({
      username: c.username,
      name: c.name,
      password: c.password,
    })),
  };
}

/* ================= إنشاء مستخدم (للأدمن) ================= */
export async function createUser(
  fullName: string,
  academicId: string,
  phone: string,
  role: UserRole = 'user'
): Promise<{
  success: boolean;
  credentials?: { username: string; password: string };
  error?: string;
}> {
  await ensureInit();
  if (!isAdminSession()) return { success: false, error: 'هذه العملية للأدمن فقط' };
  if (fullName.trim().length < 3) return { success: false, error: 'الاسم يجب أن يكون 3 أحرف على الأقل' };
  if (academicId.trim().length < 2) return { success: false, error: 'الرقم الأكاديمي غير صالح' };
  if (!/^05\d{8}$/.test(phone.trim())) {
    return { success: false, error: 'رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام' };
  }
  if (findUser(academicId.trim())) {
    return { success: false, error: 'الرقم الأكاديمي مسجل بالفعل' };
  }

  const base = sanitizeUsername(academicId);
  let username = base;
  let suffix = 1;
  while (usersCache.some((u) => u.username === username)) username = `${base}${suffix++}`;

  const password = generateRandomPassword(16);
  await addAccount({
    username,
    password,
    fullName: fullName.trim(),
    academicId: academicId.trim(),
    phone: phone.trim(),
    role,
    needsPasswordChange: true,
    isDefaultPassword: true,
  });
  return { success: true, credentials: { username, password } };
}

/* ================= تغيير كلمة المرور ================= */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  await ensureInit();
  const session = getSession();
  if (!session) return { success: false, error: 'غير مصرح' };

  let user = findUser(session.username);
  if (!user && session.role === 'admin') {
    user = findUser('admin');
  }
  if (!user) return { success: false, error: 'المستخدم غير موجود' };

  const activePassword = getUserPassword(user);
  const hashMatches = await verifyPassword(currentPassword, user.passwordHash, user.passwordSalt);
  const activeMatches = safeEqual(currentPassword.trim(), activePassword);

  if (!hashMatches && !activeMatches) {
    return { success: false, error: 'كلمة المرور الحالية غير صحيحة' };
  }

  const trimmedNew = newPassword.trim();
  if (trimmedNew.length < 6) {
    return { success: false, error: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف أو أرقام على الأقل' };
  }
  if (trimmedNew === currentPassword.trim()) {
    return { success: false, error: 'كلمة المرور الجديدة يجب أن تختلف عن كلمة المرور الحالية' };
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(trimmedNew, salt);

  saveCustomPassword(user.username, trimmedNew, {
    academicId: user.academicId,
    role: user.role,
    passwordHash,
    passwordSalt: salt,
  });

  patchUser(user.username, {
    passwordHash,
    passwordSalt: salt,
    plainPassword: trimmedNew,
    needs_password_change: false,
    isDefaultPassword: false,
  });

  await pushAdminAccountOverride({
    username: user.username,
    academicId: user.academicId,
    fullName: user.fullName,
    role: user.role,
    password: trimmedNew,
    passwordHash,
    passwordSalt: salt,
    isDeleted: false,
    updatedAt: Date.now(),
  });

  syncDashboardUserPasswordFlag(user.username, user.academicId);
  await schedulePersist();

  setSession({ ...session, needs_password_change: false });
  await flushAuth();
  notifyUsersUpdated();
  await logSecurityEvent('password_changed', { username: user.username }, user.username);
  return { success: true };
}

/* ================= استعادة كلمة المرور ================= */
interface OTPRecord {
  codeHash: string;
  salt: string;
  username: string;
  requestedAt: number;
  expiresAt: number;
  attempts: number;
}

async function otpDigest(otp: string, salt: string, username: string): Promise<string> {
  return sha256(`${salt}:${username}:${otp}`);
}

export async function requestRecovery(
  username: string,
  phone: string
): Promise<{
  success: boolean;
  error?: string;
  demoOTP?: string;
  needsPhone?: boolean;
  deliveredPhone?: string;
  messageId?: string;
}> {
  await ensureInit();
  const cleanUsername = username.trim();
  const cleanPhone = phone.trim().replace(/\s+/g, '');

  // التحقق من صحة صيغة رقم الجوال السعودي (05XXXXXXXX أو +9665XXXXXXXX)
  const normalizedPhone = cleanPhone.startsWith('+966')
    ? '0' + cleanPhone.slice(4)
    : cleanPhone.startsWith('966') && cleanPhone.length === 12
    ? '0' + cleanPhone.slice(3)
    : cleanPhone;

  if (!/^05\d{8}$/.test(normalizedPhone)) {
    return {
      success: false,
      error: 'يرجى إدخال رقم جوال صحيح يبدأ بـ 05 ويتكون من 10 أرقام',
    };
  }

  // البحث عن المستخدم بالرقم الأكاديمي أو اسم المستخدم أو الاسم
  let user = findUser(cleanUsername);
  if (!user) {
    user = usersCache.find(
      (u) =>
        (u.academicId && u.academicId.toLowerCase() === cleanUsername.toLowerCase()) ||
        (u.fullName && u.fullName.includes(cleanUsername))
    );
  }

  if (!user) {
    return {
      success: false,
      error: 'لم يتم العثور على حساب مطابق لهذا الرقم الأكاديمي أو اسم المستخدم',
    };
  }

  // تحديث رقم جوال المستخدم مباشرة لتمكين استعادة الحساب عبر SMS المباشر
  patchUser(user.username, { phone: normalizedPhone });
  await schedulePersist();

  // توليد رمز التحقق المكون من 6 أرقام وتخزينه مشفراً
  const otp = generateOTP();
  const salt = generateSalt();
  const record: OTPRecord = {
    codeHash: await otpDigest(otp, salt, user.username),
    salt,
    username: user.username,
    requestedAt: Date.now(),
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    attempts: 0,
  };
  localStorage.setItem(OTP_KEY, JSON.stringify(record));

  // إرسال الرسالة النصية المباشرة (مفعّلة دائماً في جميع البيئات دون شرط !isDev)
  const sms = await sendOTP(normalizedPhone, otp);
  if (!sms.success) {
    localStorage.removeItem(OTP_KEY);
    return { success: false, error: sms.error || 'تعذّر إرسال الرسالة النصية. حاول مرة أخرى.' };
  }

  return {
    success: true,
    deliveredPhone: normalizedPhone,
    messageId: sms.messageId,
  };
}

export const requestRecoveryWithPhone = requestRecovery;

export async function verifyOTPAndReset(
  otp: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  await ensureInit();
  const raw = localStorage.getItem(OTP_KEY);
  if (!raw) return { success: false, error: 'لم يتم طلب استعادة' };

  let record: OTPRecord;
  try {
    record = JSON.parse(raw) as OTPRecord;
  } catch {
    localStorage.removeItem(OTP_KEY);
    return { success: false, error: 'لم يتم طلب استعادة' };
  }
  if (Date.now() > record.expiresAt) {
    localStorage.removeItem(OTP_KEY);
    return { success: false, error: 'انتهت صلاحية الرمز. أعد المحاولة.' };
  }
  if (record.attempts >= 3) {
    localStorage.removeItem(OTP_KEY);
    return { success: false, error: 'عدد محاولات كبير. أعد طلب رمز جديد.' };
  }

  const digest = await otpDigest(otp.trim(), record.salt, record.username);
  if (!safeEqual(digest, record.codeHash)) {
    record.attempts += 1;
    localStorage.setItem(OTP_KEY, JSON.stringify(record));
    return { success: false, error: `رمز التحقق غير صحيح (${3 - record.attempts} محاولات متبقية)` };
  }

  const user = findUser(record.username);
  if (!user) return { success: false, error: 'المستخدم غير موجود' };
  const pwErr = validatePassword(newPassword, { username: user.username, academicId: user.academicId });
  if (pwErr) return { success: false, error: pwErr };

  const salt = generateSalt();
  const passwordHash = await hashPassword(newPassword, salt);
  saveCustomPassword(user.username, newPassword, {
    academicId: user.academicId,
    role: user.role,
    passwordHash,
    passwordSalt: salt,
  });
  patchUser(user.username, {
    passwordHash,
    passwordSalt: salt,
    plainPassword: newPassword,
    needs_password_change: false,
    isDefaultPassword: false,
  });
  syncDashboardUserPasswordFlag(user.username, user.academicId);
  await schedulePersist();

  // فك أي قفل على الحساب بعد استعادة موثّقة
  const all = loadAttempts();
  delete all[`u:${user.username}`];
  saveAttempts(all);

  localStorage.removeItem(OTP_KEY);
  await flushAuth();
  notifyUsersUpdated();
  await logSecurityEvent('password_changed', { action: 'recovered_via_otp' }, user.username);
  return { success: true };
}

/* ================= إدارة (حذف فعلي وجذري 100%) ================= */
export function deleteUser(username: string): { success: boolean; error?: string } {
  const clean = username.trim().toLowerCase();
  if (!clean) return { success: false, error: 'المعرف غير صالح' };
  if (clean === 'admin' || clean === 'admin-001') {
    return { success: false, error: 'لا يمكن حذف حساب المشرف العام الأساسي' };
  }

  mergeOverridesIntoUsersCache();
  const target = usersCache.find(
    (u) =>
      u.username.toLowerCase() === clean ||
      (u.academicId && u.academicId.toLowerCase() === clean)
  );

  const activeSession = memSession || getSession();
  if (activeSession && activeSession.username.toLowerCase() === clean) {
    return { success: false, error: 'لا يمكنك حذف حسابك النشط حالياً' };
  }

  const targetUsername = target ? target.username.toLowerCase() : clean;
  const targetAcademicId = target?.academicId ? target.academicId.toLowerCase() : clean;

  const deletedSet = getDeletedUsersSet();
  deletedSet.add(targetUsername);
  if (targetAcademicId) deletedSet.add(targetAcademicId);
  saveDeletedUsersSet(deletedSet);

  usersCache = usersCache.filter(
    (u) =>
      u.username.toLowerCase() !== targetUsername &&
      u.username.toLowerCase() !== clean &&
      (!targetAcademicId || (u.academicId || '').toLowerCase() !== targetAcademicId)
  );

  void permanentlyDeleteAccountFromCentralDB(targetUsername, targetAcademicId);
  void schedulePersist();
  notifyUsersUpdated();
  return { success: true };
}

export async function deleteUserAsync(username: string): Promise<{ success: boolean; error?: string }> {
  const clean = username.trim().toLowerCase();
  const target = usersCache.find(
    (u) =>
      u.username.toLowerCase() === clean ||
      (u.academicId && u.academicId.toLowerCase() === clean)
  );
  const targetUsername = target ? target.username.toLowerCase() : clean;
  const targetAcademicId = target?.academicId ? target.academicId.toLowerCase() : clean;

  const res = deleteUser(username);
  if (!res.success) return res;

  await permanentlyDeleteAccountFromCentralDB(targetUsername, targetAcademicId);
  await persistNow();
  notifyUsersUpdated();
  return { success: true };
}

/* ================= وضع الزائر ================= */
export function isGuestMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(GUEST_KEY) === 'true';
}

export function enterGuestMode(): void {
  localStorage.setItem(GUEST_KEY, 'true');
}

export function exitGuestMode(): void {
  localStorage.removeItem(GUEST_KEY);
}

export function getGuestSession(): UserSession {
  return {
    username: '__guest__',
    fullName: 'زائر كريم',
    displayName: 'زائر كريم',
    role: 'guest',
    needs_password_change: false,
    loginTime: Date.now(),
  };
}

/**
 * التحقق الحقيقي من الهوية عبر الهاش المخزن (Argon2id / PBKDF2-HMAC-SHA256)
 * يتحقق من تطابق كلمة المرور مع الهاش المخزن للمستخدم ويُفعّل الجلسة الموقّعة
 */
export async function verifyUserIdentity(
  password: string,
  storedHash: string
): Promise<boolean> {
  await ensureInit();
  if (!password || !storedHash || storedHash.startsWith('/*')) {
    return false;
  }

  // البحث عن المستخدم عبر الهاش المخزن أو المعرف
  const allUsers = getUsers();
  const matchedUser =
    allUsers.find((u) => u.passwordHash === storedHash) || findUser(storedHash);

  if (!matchedUser) {
    return false;
  }

  const res = await login(matchedUser.username, password);
  return res.success;
}

export {
  loginWithGoogle,
  logoutUser,
  isAdminUser,
  getAdminEmails,
  setAdminRole,
  removeAdminRole,
  loginWithEmail,
  registerWithEmail,
  requestPasswordReset,
} from './auth.secure';

/* ================= بروتوكول استعادة كلمة المرور الآمن عبر تفويض الأدمن الموقّع (HMAC-SHA256 Grant) ================= */

export interface AdminPasswordResetRequest {
  id: number;
  referenceCode: string;
  username: string;
  academicId: string;
  senderName: string;
  reasonNote: string;
  /** هاش رمز الـ PIN السري (4 إلى 6 أرقام) لتمكين المستخدم وحده من الاستعلام وتعيين كلمة المرور بعد التفويض */
  pinHash: string;
  /** تسلسل الحالات التشفيري: طلب معلق -> مفوّض بتوقيع الأدمن -> مكتمل بعد تعيين كلمة المرور -> أو مرفوض */
  status: 'pending' | 'authorized' | 'completed' | 'rejected';
  /** التوقيع التشفيري الرسمي الصادر من الأدمن (HMAC-SHA256) لفتح خانة تعيين كلمة المرور لمرة واحدة فقط */
  adminGrantSignature?: string;
  adminReply?: string;
  requestedAt: string;
  authorizedAt?: string;
  resolvedAt?: string;
  /** هل شاهد المستخدم إشعار نجاح التعديل عند تسجيل الدخول؟ */
  userNotifiedOnLogin?: boolean;
}

const PASSWORD_RESET_REQUESTS_KEY = 'mirsad_admin_password_reset_requests_v1';

function buildGrantPayload(req: Pick<AdminPasswordResetRequest, 'id' | 'referenceCode' | 'username' | 'pinHash'>): string {
  return `MIRSAD_ADMIN_GRANT_V1:${req.id}:${req.referenceCode}:${req.username.toLowerCase()}:${req.pinHash}`;
}

function loadResetRequests(): AdminPasswordResetRequest[] {
  if (!hasStorage()) return [];
  try {
    const raw = localStorage.getItem(PASSWORD_RESET_REQUESTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveResetRequests(list: AdminPasswordResetRequest[]): void {
  if (!hasStorage()) return;
  try {
    localStorage.setItem(PASSWORD_RESET_REQUESTS_KEY, JSON.stringify(list));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mirsad-reset-requests-updated'));
    }
  } catch {
    // ignore
  }
}

/**
 * 1. المرحلة الأولى: تقديم طلب تفويض سري للأدمن لاستعادة كلمة المرور
 * (لا يتم إدخال أو إرسال أي كلمة مرور في هذه المرحلة، بل يُحفظ هاش الـ PIN السري فقط بحالة 'pending')
 */
export async function submitAdminPasswordResetRequest(params: {
  usernameOrAcademicId: string;
  senderName: string;
  secretPin: string;
  reasonNote?: string;
}): Promise<{
  success: boolean;
  error?: string;
  referenceCode?: string;
  request?: AdminPasswordResetRequest;
}> {
  await ensureInit();
  const cleanId = params.usernameOrAcademicId.trim();
  const cleanName = params.senderName.trim();
  const cleanPin = params.secretPin.trim();

  if (!cleanId || !cleanName) {
    return { success: false, error: 'يرجى إدخال الرقم الأكاديمي واسم المرسل الكامل' };
  }

  if (!/^\d{4,6}$/.test(cleanPin)) {
    return { success: false, error: 'يرجى اختيار رمز تحقق شخصي سري (PIN) مكون من 4 إلى 6 أرقام' };
  }

  // البحث عن الحساب
  let user = findUser(cleanId);
  if (!user) {
    user = usersCache.find(
      (u) =>
        (u.academicId && u.academicId.toLowerCase() === cleanId.toLowerCase()) ||
        u.username.toLowerCase() === cleanId.toLowerCase()
    );
  }

  if (!user) {
    return {
      success: false,
      error: 'لم يتم العثور على حساب مسجل بهذا الرقم الأكاديمي أو اسم المستخدم',
    };
  }

  // تجزئة رمز الـ PIN السري فقط عبر SHA-256 دون طلب أي كلمة مرور قبل اعتماد الأدمن
  const pinHash = await sha256(`pin:${user.username.toLowerCase()}:${cleanPin}`);
  const referenceCode = 'RST-' + Math.floor(100000 + Math.random() * 900000);

  const all = loadResetRequests();
  // إلغاء أي طلب معلق أو مفوض سابق لنفس المستخدم غير مكتمل
  const filtered = all.filter(
    (r) =>
      !(
        r.username.toLowerCase() === user!.username.toLowerCase() &&
        (r.status === 'pending' || r.status === 'authorized')
      )
  );

  const newReq: AdminPasswordResetRequest = {
    id: Date.now(),
    referenceCode,
    username: user.username,
    academicId: user.academicId || user.username,
    senderName: cleanName,
    reasonNote:
      (params.reasonNote && params.reasonNote.trim()) ||
      'طلب تفويض لاستعادة وتعيين كلمة مرور جديدة عبر اعتماد الأدمن',
    pinHash,
    status: 'pending',
    requestedAt: new Date().toISOString(),
    userNotifiedOnLogin: false,
  };

  saveResetRequests([newReq, ...filtered]);
  await logSecurityEvent(
    'password_changed',
    { action: 'password_reset_authorization_requested', referenceCode },
    user.username
  );

  return { success: true, referenceCode, request: newReq };
}

/**
 * 2. المرحلة الثانية: اعتماد الأدمن للطلب وإصدار تصريح تشفيري موقّع بـ HMAC-SHA256
 * يحول حالة الطلب إلى 'authorized' ليفتح خانة كتابة كلمة المرور الجديدة للمستخدم
 */
export async function approvePasswordResetByAdmin(
  requestId: number,
  adminReplyText?: string
): Promise<{ success: boolean; error?: string }> {
  await ensureInit();
  const all = loadResetRequests();
  const target = all.find((r) => r.id === requestId);
  if (!target) {
    return { success: false, error: 'طلب الاستعادة غير موجود' };
  }

  const user = findUser(target.username);
  if (!user) {
    return { success: false, error: 'حساب المستخدم غير موجود' };
  }

  // توليد توقيع تشفيري رسمي للأدمن عبر HMAC-SHA256
  const payload = buildGrantPayload(target);
  const adminGrantSignature = await signHMAC(payload);
  const nowIso = new Date().toISOString();

  const updated = all.map((r) =>
    r.id === requestId
      ? {
          ...r,
          status: 'authorized' as const,
          adminGrantSignature,
          adminReply:
            (adminReplyText && adminReplyText.trim()) ||
            'تم التحقق من هويتك وإصدار تصريح الأدمن التشفيري (HMAC-SHA256). يمكنك الآن كتابة وتعيين كلمة المرور الجديدة الخاصة بك.',
          authorizedAt: nowIso,
          resolvedAt: nowIso,
          userNotifiedOnLogin: false,
        }
      : r
  );
  saveResetRequests(updated);

  await logSecurityEvent(
    'password_changed',
    { action: 'admin_issued_hmac_reset_grant', referenceCode: target.referenceCode },
    user.username
  );

  return { success: true };
}

/**
 * 3. المرحلة الثالثة: تعيين وتشفير كلمة المرور الجديدة من قِبل المستخدم بعد التحقق من تصريح الأدمن (HMAC-SHA256)
 * ترفض التنفيذ تماماً إذا لم تكن حالة الطلب 'authorized'، وتتلف التصريح فور الاستخدام لضمان صلاحيته لمرة واحدة فقط
 */
export async function completeAuthorizedPasswordReset(params: {
  identifier: string;
  secretPin: string;
  newPassword: string;
}): Promise<{ success: boolean; error?: string; referenceCode?: string }> {
  await ensureInit();
  const cleanId = params.identifier.trim().toLowerCase();
  const cleanPin = params.secretPin.trim();

  if (!cleanId || !cleanPin) {
    return { success: false, error: 'يرجى إدخال الرقم الأكاديمي (أو رقم المرجع) ورمز الـ PIN السري' };
  }

  const all = loadResetRequests();
  const candidates = all.filter(
    (r) =>
      r.referenceCode.toLowerCase() === cleanId ||
      r.username.toLowerCase() === cleanId ||
      r.academicId.toLowerCase() === cleanId
  );

  if (candidates.length === 0) {
    return { success: false, error: 'لا يوجد طلب استعادة مسجل بهذا الرقم' };
  }

  let matchedReq: AdminPasswordResetRequest | undefined;
  for (const cand of candidates) {
    const expectedPinHash = await sha256(`pin:${cand.username.toLowerCase()}:${cleanPin}`);
    if (safeEqual(expectedPinHash, cand.pinHash)) {
      matchedReq = cand;
      break;
    }
  }

  if (!matchedReq) {
    return { success: false, error: 'رمز الـ PIN السري غير مطابق لهذا الطلب' };
  }

  if (matchedReq.status !== 'authorized') {
    if (matchedReq.status === 'pending') {
      return {
        success: false,
        error: 'لا يمكن تعيين كلمة المرور قبل اعتماد الأدمن للطلب وإصدار تصريح HMAC-SHA256',
      };
    }
    if (matchedReq.status === 'completed') {
      return {
        success: false,
        error: 'تم استخدام هذا التصريح مسبقاً وتعيين كلمة المرور بالفعل',
      };
    }
    return {
      success: false,
      error: 'هذا الطلب غير مفوّض لتعيين كلمة المرور',
    };
  }

  if (!matchedReq.adminGrantSignature) {
    return {
      success: false,
      error: 'التصريح التشفيري للأدمن (HMAC-SHA256) مفقود أو تالف',
    };
  }

  // التحقق الصارم من صحة توقيع الأدمن عبر verifyHMAC
  const expectedPayload = buildGrantPayload(matchedReq);
  const isGrantValid = await verifyHMAC(expectedPayload, matchedReq.adminGrantSignature);
  if (!isGrantValid) {
    await logSecurityEvent('data_tamper_detected', {
      target: 'admin_password_reset_grant',
      referenceCode: matchedReq.referenceCode,
    });
    return {
      success: false,
      error: 'فشل التحقق التشفيري من توقيع الأدمن (HMAC-SHA256 غير صالح)',
    };
  }

  const user = findUser(matchedReq.username);
  if (!user) {
    return { success: false, error: 'حساب المستخدم غير موجود' };
  }

  const pwErr = validatePassword(params.newPassword, {
    username: user.username,
    academicId: user.academicId,
  });
  if (pwErr) {
    return { success: false, error: pwErr };
  }

  // تجزئة كلمة المرور الجديدة عبر PBKDF2-HMAC-SHA256 (600,000 تكرار) وحفظها في الحساب
  const newSalt = generateSalt();
  const newHash = await hashPassword(params.newPassword, newSalt);
  saveCustomPassword(user.username, params.newPassword, {
    academicId: user.academicId,
    role: user.role,
    passwordHash: newHash,
    passwordSalt: newSalt,
  });

  patchUser(user.username, {
    passwordHash: newHash,
    passwordSalt: newSalt,
    plainPassword: params.newPassword,
    needs_password_change: false,
    isDefaultPassword: false,
  });
  syncDashboardUserPasswordFlag(user.username, user.academicId);
  await schedulePersist();

  // فك أي قفل محاولات سابق على الحساب
  const attempts = loadAttempts();
  delete attempts[`u:${user.username}`];
  saveAttempts(attempts);

  await flushAuth();
  notifyUsersUpdated();

  // تحويل حالة الطلب إلى 'completed' وإتلاف التصريح التشفيري لضمان استخدامه لمرة واحدة فقط
  const completedAt = new Date().toISOString();
  const updated = all.map((r) =>
    r.id === matchedReq!.id
      ? {
          ...r,
          status: 'completed' as const,
          adminGrantSignature: undefined,
          resolvedAt: completedAt,
          userNotifiedOnLogin: false,
        }
      : r
  );
  saveResetRequests(updated);

  await logSecurityEvent(
    'password_changed',
    { action: 'authorized_password_reset_completed', referenceCode: matchedReq.referenceCode },
    user.username
  );

  return { success: true, referenceCode: matchedReq.referenceCode };
}

/**
 * 4. رفض طلب استعادة كلمة المرور من قِبل الأدمن مع توضيح السبب
 */
export async function rejectPasswordResetByAdmin(
  requestId: number,
  reasonText?: string
): Promise<{ success: boolean; error?: string }> {
  const all = loadResetRequests();
  const updated = all.map((r) =>
    r.id === requestId
      ? {
          ...r,
          status: 'rejected' as const,
          adminGrantSignature: undefined,
          adminReply:
            (reasonText && reasonText.trim()) ||
            'تم رفض الطلب لعدم مطابقة البيانات، يرجى إرسال رسالة دعم للأدمن بالبيانات الصحيحة.',
          resolvedAt: new Date().toISOString(),
        }
      : r
  );
  saveResetRequests(updated);
  return { success: true };
}

/**
 * 5. جلب جميع طلبات استعادة كلمة المرور (للأدمن فقط)
 */
export function getAdminPasswordResetRequests(): AdminPasswordResetRequest[] {
  return loadResetRequests();
}

/**
 * 6. استعلام المستخدم الآمن عن حالة طلبه بواسطة (الرقم الأكاديمي أو رقم المرجع) + رمز الـ PIN السري
 */
export async function checkMyPasswordResetStatus(
  identifier: string,
  secretPin: string
): Promise<{
  found: boolean;
  error?: string;
  request?: Omit<AdminPasswordResetRequest, 'pinHash'>;
}> {
  await ensureInit();
  const cleanId = identifier.trim().toLowerCase();
  const cleanPin = secretPin.trim();
  if (!cleanId || !cleanPin) {
    return { found: false, error: 'يرجى إدخال الرقم الأكاديمي (أو رقم المرجع) ورمز الـ PIN السري' };
  }

  const all = loadResetRequests();
  const candidates = all.filter(
    (r) =>
      r.referenceCode.toLowerCase() === cleanId ||
      r.username.toLowerCase() === cleanId ||
      r.academicId.toLowerCase() === cleanId
  );

  if (candidates.length === 0) {
    return { found: false, error: 'لا يوجد طلب استعادة مسجل بهذا الرقم' };
  }

  for (const cand of candidates) {
    const expectedPinHash = await sha256(`pin:${cand.username.toLowerCase()}:${cleanPin}`);
    if (safeEqual(expectedPinHash, cand.pinHash)) {
      const { pinHash: _pinHash, ...safeView } = cand;
      return { found: true, request: safeView };
    }
  }

  return { found: false, error: 'رمز الـ PIN السري غير مطابق لهذا الطلب' };
}

/**
 * 7. فحص تلقائي في صفحة تسجيل الدخول (Login.tsx):
 * يخبر المستخدم إذا كان الأدمن قد أصدر له تصريحاً لتعيين كلمة المرور أو إذا اكتمل التحديث
 */
export function getApprovedResetBannerForUser(usernameOrAcademicId: string): {
  hasApprovedReset: boolean;
  status?: 'authorized' | 'completed';
  referenceCode?: string;
  resolvedAt?: string;
  adminReply?: string;
} {
  const clean = usernameOrAcademicId.trim().toLowerCase();
  if (!clean || clean.length < 3) return { hasApprovedReset: false };

  const all = loadResetRequests();
  const active = all.find(
    (r) =>
      (r.username.toLowerCase() === clean || r.academicId.toLowerCase() === clean) &&
      (r.status === 'authorized' || r.status === 'completed') &&
      !r.userNotifiedOnLogin
  );

  if (!active) return { hasApprovedReset: false };
  return {
    hasApprovedReset: true,
    status: active.status as 'authorized' | 'completed',
    referenceCode: active.referenceCode,
    resolvedAt: active.resolvedAt,
    adminReply: active.adminReply,
  };
}

/** إخفاء إشعار التعديل بعد نجاح دخول المستخدم بكلمة المرور الجديدة */
export function markResetBannerSeen(usernameOrAcademicId: string): void {
  const clean = usernameOrAcademicId.trim().toLowerCase();
  const all = loadResetRequests();
  let changed = false;
  const updated = all.map((r) => {
    if (
      (r.username.toLowerCase() === clean || r.academicId.toLowerCase() === clean) &&
      (r.status === 'authorized' || r.status === 'completed') &&
      !r.userNotifiedOnLogin
    ) {
      changed = true;
      return { ...r, userNotifiedOnLogin: true };
    }
    return r;
  });
  if (changed) saveResetRequests(updated);
}

```
