# المرحلة التطويرية 7 (منفصلة بالكامل): إصلاح تسجيل الدخول بالحسابات المضافة من الأدمن، وتفعيل إنشاء حساب جديد في صفحة تسجيل الدخول، وتوحيد قاعدة بيانات الحسابات

يعالج هذا الملف المستقل السبب الجذري لعدم تمكن الحساب المضاف من قِبل الأدمن (مثل حساب `25105375` الظاهر في لقطة الشاشة داخل `AdminDashboard.tsx`) من تسجيل الدخول، ويعيد تفعيل ميزة **«إنشاء حساب جديد»** في صفحة تسجيل الدخول (`/login` و`/register`) مع ربطها الكامل بقاعدة بيانات المشرف المركزية.

## أولاً: التشخيص الهندسي الدقيق سطراً بسطر (لماذا لم يسجل الحساب الجديد الدخول؟)

بعد فحص الحزمة المرفقة (`مِرْصَاد-التشفير-_-mirsad-al-tashfeer.zip`) سطراً بسطر، تبيّن وجود **3 أسباب برمجية مباشرة** منعت الحساب الجديد من تسجيل الدخول:

1. **السبب الأول في `src/pages/admin/AdminDashboard.tsx` (الأسطر `52–69` — الشاشة الظاهرة في الصورة المرفقة):**

   * عندما نقرتَ على زر **`+ إضافة مستخدم`** في `AdminDashboard.tsx`، استدعت النافذة الدالة `addDashboardUser(user)` من `src/lib/dashboardData.ts`.

   * هذه الدالة كانت تحفظ بيانات شكلية فقط (`username`, `fullName`, `academicId`) داخل مفتاح منفصل في المتصفح (`mirsad_dashboard_users`) **بدون حقل كلمة مرور، وبدون تشفير `PBKDF2-SHA256`، وبدون إدراج الحساب في نظام المصادقة الفعلي (`src/lib/auth.ts`)!**

   * لذلك عند محاولة تسجيل الدخول في `/login`، لم يجد نظام المصادقة `src/lib/auth.ts` هذا الحساب أصلاً.

2. **السبب الثاني في `src/lib/auth.ts` (السطر `594`):**

   * في دالة `initializeAuth()` في السطر `594` كان يوجد السطر:
     `usersCache = usersCache.filter((u) => u.username.toLowerCase() === 'admin');`

   * هذا السطر كان يقوم في كل مرة تُفتح فيها صفحة تسجيل الدخول **بحذف أي حساب جديد غير حساب `admin`** من الذاكرة (`usersCache`)!

3. **السبب الثالث في `src/lib/centralAdminDB.ts` (الأسطر `56–130`):**

   * كانت دالة `purgeAllNonAdminAccountsAndSecrets()` تعمل في كل مرة يتم فيها تحميل الصفحة وليس لمرة واحدة فقط، فكانت تعيد وضع الرقم `25105375` في قائمة المحذوفات (`mirsad_deleted_users_v1`) وتمسح كلمة مروره من `mirsad_user_active_passwords_v1`.

## ثانياً: أمر النسخ المباشر للمرحلة 7 (انسخه إلى Google AI Studio)

```
قم بتنفيذ المرحلة التطويرية السادسة/السابعة المحدثة (إصلاح تسجيل الدخول بالحسابات الجديدة المضافة من الأدمن، وتفعيل إنشاء حساب جديد في صفحة تسجيل الدخول `/login` و`/register`، وتوحيد إدارة المستخدمين في `AdminDashboard.tsx` و`AdminUsers.tsx`) عبر تحديث الملفات التالية بالكامل كما في الأكواد المرفقة:

1. في `src/lib/centralAdminDB.ts`:
- اجعل دالة التطهير الأولي للحسابات الـ 10 القديمة تعمل لمرة واحدة فقط عند التأسيس (`mirsad_initial_purge_done_v2`) بحيث لا تحذف أبداً أي حساب جديد يضيفه الأدمن أو يسجله المستخدم عبر صفحة إنشاء حساب جديد.
- اسمح في `pushAdminAccountOverride` و`syncAdminStateWithCloud` بحفظ ومزامنة جميع الحسابات الجديدة (سواء حساب الأدمن أو الحسابات المضافة حديثاً) مع كلمات مرورها المشفرة في التخزين المحلي والسحابي (`Firestore`).

2. في `src/lib/auth.ts`:
- احذف السطر `usersCache = usersCache.filter((u) => u.username.toLowerCase() === 'admin');` من دالة `initializeAuth()` لكي يحتفظ النظام بجميع الحسابات الجديدة التي يضيفها الأدمن أو التي يتم تسجيلها من صفحة التسجيل.
- أضف دالة `adminCreateUserAccount(params)` التي تنشئ حساباً حقيقياً مشفراً بـ `PBKDF2-HMAC-SHA256` مع كلمة المرور التي يحددها الأدمن، وتزيل اسمه أو رقمه الأكاديمي من قائمة المحذوفات السابقة (`mirsad_deleted_users_v1`)، وتحفظه فوراً في `usersCache` و`IndexedDB` و`centralAdminDB` و`mirsad_dashboard_users`.
- فعّل دالة `registerUser(data)` لتمكين إنشاء حساب جديد من صفحة `/register` وحفظه وتشفيره بنفس الآلية المعتمدة بحيث يقبل تسجيل الدخول فوراً بالرقم الأكاديمي أو اسم المستخدم.
- في دالة `login(username, password)`، ادمج أي حساب موجود في `getLocalAccountOverrides()` قبل التحقق، وتحقق من كلمة المرور عبر `verifyPassword` أو كلمة المرور النشطة لضمان نجاح الدخول من أول محاولة.

3. في `src/pages/Login.tsx` و`src/pages/Register.tsx`:
- في `Login.tsx`: أعد تفعيل رابط «إنشاء حساب جديد» (`/register`) في أسفل بطاقة الدخول، واجعل عملية الدخول تستدعي `login(username, password)` مباشرة مع إظهار رسالة الخطأ الدقيقة.
- في `Register.tsx`: فعّل نموذج «إنشاء حساب جديد» الكامل (الاسم الكامل، اسم المستخدم، الرقم الأكاديمي، رقم الجوال الاختياري، كلمة المرور وتأكيدها) مع تسجيل الدخول التلقائي أو التحويل لصفحة الدخول فور نجاح الإنشاء.

4. في `src/pages/admin/AdminDashboard.tsx` و`src/pages/admin/AdminUsers.tsx`:
- في `AdminDashboard.tsx`: اربط جدول «إدارة المستخدمين» ونافذة «+ إضافة مستخدم» بـ `getUsers()` و`adminCreateUserAccount()` من `@/lib/auth`، وأضف حقل «كلمة المرور» (مع زر توليد تلقائي وإظهار/نسخ) داخل نافذة إضافة مستخدم، بحيث يُنشأ الحساب فعلياً في قاعدة البيانات ويتمكن من تسجيل الدخول فوراً.
- في `AdminUsers.tsx`: أضف زر ونافذة «+ إضافة مستخدم جديد» بنفس الآلية.

```

## ثالثاً: الأكواد البرمجية الكاملة لملفات المرحلة 7

### 1. الكود الكامل المحدث لملف `src/lib/centralAdminDB.ts`

```
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
import { deleteRecord, getAllRecords } from './encryptedDB';

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
const ONE_TIME_INITIAL_PURGE_KEY = 'mirsad_initial_10_students_purged_v2';

function hasLocalStorage(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

/**
 * تطهير لمرة واحدة فقط للحسابات الـ 10 المسبقة القديمة عند أول تشغيل للنسخة الجديدة
 * دون المساس بأي حساب جديد يضيفه الأدمن أو يسجله المستخدم لاحقاً!
 */
export async function purgeAllNonAdminAccountsAndSecrets(): Promise<void> {
  if (!hasLocalStorage()) return;
  try {
    if (localStorage.getItem(ONE_TIME_INITIAL_PURGE_KEY) === '1') {
      return; // تم التطهير الأولي مسبقاً — نحافظ على جميع الحسابات الجديدة التي يضيفها الأدمن أو يسجلها المستخدمون
    }

    localStorage.removeItem('mirsad_users_v3');
    localStorage.removeItem('mirsad_dashboard_users');
    localStorage.removeItem(DELETED_USERS_STORAGE_KEY);

    const customPwRaw = localStorage.getItem(ACTIVE_PASSWORDS_STORAGE_KEY);
    if (customPwRaw) {
      const customPwMap = JSON.parse(customPwRaw);
      const adminOnly: Record<string, unknown> = {};
      if (customPwMap['admin']) adminOnly['admin'] = customPwMap['admin'];
      localStorage.setItem(ACTIVE_PASSWORDS_STORAGE_KEY, JSON.stringify(adminOnly));
    }

    try {
      const dbUsers = await getAllRecords<{ username: string }>('users');
      for (const u of dbUsers) {
        if (u.username && u.username.toLowerCase() !== 'admin') {
          await deleteRecord('users', u.username);
        }
      }
    } catch {
      // ignore
    }

    localStorage.setItem(ONE_TIME_INITIAL_PURGE_KEY, '1');
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

/**
 * مزامنة جميع الحسابات المعتمدة (الأدمن + أي حساب جديد أضافه الأدمن أو تم تسجيله) مع السحابة
 */
export async function syncAdminStateWithCloud(): Promise<void> {
  if (typeof window === 'undefined') return;
  await purgeAllNonAdminAccountsAndSecrets();

  try {
    const docRef = doc(firestoreDB, 'mirsad_admin_state', 'accounts_registry');
    const snap = await getDoc(docRef);
    const localOverrides = getLocalAccountOverrides();

    if (snap.exists()) {
      const cloudData = snap.data() as {
        overrides?: Record<string, CentralAccountOverride>;
      };
      const cloudOverrides = cloudData.overrides || {};
      const merged: Record<string, CentralAccountOverride> = { ...localOverrides };

      for (const [k, cloudRec] of Object.entries(cloudOverrides)) {
        const localRec = merged[k];
        if (!localRec || (cloudRec.updatedAt || 0) >= (localRec.updatedAt || 0)) {
          merged[k] = cloudRec;
        }
      }

      saveLocalAccountOverrides(merged);

      // تحديث كلمات المرور النشطة وقائمة الحذف بناءً على السجل المدمج
      if (hasLocalStorage()) {
        const customPwRaw = localStorage.getItem(ACTIVE_PASSWORDS_STORAGE_KEY);
        const customPwMap = customPwRaw ? JSON.parse(customPwRaw) : {};
        const deletedRaw = localStorage.getItem(DELETED_USERS_STORAGE_KEY);
        const deletedSet = new Set<string>(deletedRaw ? JSON.parse(deletedRaw) : []);

        for (const [uname, rec] of Object.entries(merged)) {
          const cleanU = uname.toLowerCase().trim();
          if (rec.isDeleted && cleanU !== 'admin') {
            deletedSet.add(cleanU);
            if (rec.academicId) deletedSet.add(rec.academicId.toLowerCase().trim());
          } else {
            deletedSet.delete(cleanU);
            if (rec.academicId) deletedSet.delete(rec.academicId.toLowerCase().trim());
            if (rec.password && rec.passwordHash && rec.passwordSalt) {
              const pwObj = {
                password: rec.password,
                passwordHash: rec.passwordHash,
                passwordSalt: rec.passwordSalt,
                updatedAt: rec.updatedAt,
              };
              customPwMap[cleanU] = pwObj;
              if (rec.academicId) {
                customPwMap[rec.academicId.toLowerCase().trim()] = pwObj;
              }
            }
          }
        }

        localStorage.setItem(DELETED_USERS_STORAGE_KEY, JSON.stringify(Array.from(deletedSet)));
        localStorage.setItem(ACTIVE_PASSWORDS_STORAGE_KEY, JSON.stringify(customPwMap));
      }
    }
  } catch {
    // Offline-first fallback
  }
}

/**
 * حفظ أو تحديث أو حذف أي حساب في قاعدة البيانات المركزية (محلياً وسحابياً)
 */
export async function pushAdminAccountOverride(
  override: CentralAccountOverride
): Promise<void> {
  const cleanKey = override.username.toLowerCase().trim();
  if (!cleanKey) return;

  const map = getLocalAccountOverrides();
  const prev = map[cleanKey] || { username: cleanKey, updatedAt: 0 };
  map[cleanKey] = {
    ...prev,
    ...override,
    username: cleanKey,
    updatedAt: Date.now(),
  };
  saveLocalAccountOverrides(map);

  try {
    const docRef = doc(firestoreDB, 'mirsad_admin_state', 'accounts_registry');
    await setDoc(
      docRef,
      {
        overrides: map,
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
        ? `تسجيل دخول فعلي ناجح (${params.role === 'admin' ? 'المشرف العام Admin' : 'مستخدم مسجل'})`
        : params.status === 'logout'
        ? 'تسجيل خروج آمن من المنصة'
        : `محاولة دخول غير ناجحة للمعرف (${cleanUsername})`),
  };

  if (hasLocalStorage()) {
    const existing = getRealLoginLogs();
    const updated = [entry, ...existing].slice(0, 300);
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
    details: entry.note,
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

### 2. التعديلات الحاسمة في `src/lib/auth.ts` (لضمان عمل الحسابات الجديدة المضافة من الأدمن أو المسجلة من صفحة التسجيل فوراً)

استبدل الدوال `initializeAuth` و`registerUser` و`createUser` و`login` في `src/lib/auth.ts` بالتالي (أو أضف `adminCreateUserAccount`):

```
/**
 * دالة مزامنة الحسابات المضافة من الأدمن أو المسجلة عبر صفحة التسجيل مع usersCache
 */
function mergeOverridesIntoUsersCache(): void {
  const overrides = getLocalAccountOverrides();
  const deletedSet = getDeletedUsersSet();

  for (const [key, rec] of Object.entries(overrides)) {
    const cleanU = (rec.username || key).toLowerCase().trim();
    if (!cleanU) continue;

    if (rec.isDeleted && cleanU !== 'admin') {
      usersCache = usersCache.filter(
        (u) =>
          u.username.toLowerCase() !== cleanU &&
          (!rec.academicId || (u.academicId || '').toLowerCase() !== rec.academicId.toLowerCase())
      );
      continue;
    }

    if (deletedSet.has(cleanU)) continue;

    const existingIdx = usersCache.findIndex(
      (u) =>
        u.username.toLowerCase() === cleanU ||
        (rec.academicId && (u.academicId || '').toLowerCase() === rec.academicId.toLowerCase())
    );

    const customPw = getCustomPasswordRecord(cleanU, rec.academicId);
    const pwHash = customPw?.passwordHash || rec.passwordHash || '';
    const pwSalt = customPw?.passwordSalt || rec.passwordSalt || '';
    const plainPw = customPw?.password || rec.password || '';

    if (existingIdx === -1 && pwHash && pwSalt) {
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
      });
    } else if (existingIdx !== -1) {
      usersCache[existingIdx] = applySavedPasswordState({
        ...usersCache[existingIdx],
        fullName: rec.fullName || usersCache[existingIdx].fullName,
        academicId: rec.academicId || usersCache[existingIdx].academicId,
        role: (rec.role as UserRole) || usersCache[existingIdx].role,
        passwordHash: pwHash || usersCache[existingIdx].passwordHash,
        passwordSalt: pwSalt || usersCache[existingIdx].passwordSalt,
        plainPassword: plainPw || usersCache[existingIdx].plainPassword,
      });
    }
  }
}

```

وفي داخل `initializeAuth()` في `src/lib/auth.ts`:

* **احذف** السطر `usersCache = usersCache.filter((u) => u.username.toLowerCase() === 'admin');` واستبدله بـ:

```
    await syncAdminStateWithCloud();
    mergeOverridesIntoUsersCache();

```

وحدث دالة `registerUser` وأضف دالة `adminCreateUserAccount` في `src/lib/auth.ts`:

```
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
  };

  usersCache.push(newUser);

  await pushAdminAccountOverride({
    username: cleanUsername,
    academicId: cleanAcademicId,
    fullName: cleanFullName,
    phone: cleanPhone,
    role: targetRole,
    password: rawPassword,
    passwordHash,
    passwordSalt: salt,
    isDeleted: false,
    createdAt: newUser.created_at,
    updatedAt: Date.now(),
  });

  // فك أي قفل محاولات سابق لهذا المعرف
  const attempts = loadAttempts();
  delete attempts[`u:${cleanUsername}`];
  delete attempts[`x:${cleanUsername}`];
  if (cleanAcademicId) {
    delete attempts[`x:${cleanAcademicId.toLowerCase()}`];
  }
  saveAttempts(attempts);

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
  });
}

```

وفي داخل `getUsers()` و`findUser()` في `src/lib/auth.ts`:

```
export function getUsers(): StoredUser[] {
  if (usersCache.length === 0 && typeof window !== 'undefined') {
    usersCache = buildOfficialAccountsList();
  }
  mergeOverridesIntoUsersCache();
  const deletedSet = getDeletedUsersSet();
  return usersCache
    .filter((u) => !deletedSet.has(u.username.toLowerCase()))
    .map((u) => applySavedPasswordState({ ...u }));
}

export function findUser(identifier: string): StoredUser | undefined {
  const clean = identifier.toLowerCase().trim();
  if (!clean) return undefined;
  const all = getUsers();
  const u = all.find(
    (x) => x.username.toLowerCase() === clean || (x.academicId || '').toLowerCase() === clean
  );
  return u ? applySavedPasswordState({ ...u }) : undefined;
}

```

### 3. الكود الكامل لصفحة تسجيل الدخول `src/pages/Login.tsx` (مع تفعيل رابط «إنشاء حساب جديد» والتحقق المباشر لجميع الحسابات المضافة)

```
// File: src/pages/Login.tsx
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAssetUrl } from '@/lib/utils';
import {
  Lock,
  User,
  ShieldCheck,
  KeyRound,
  AlertTriangle,
  Fingerprint,
  Cpu,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Headphones,
  X,
  Send,
  UserCheck,
  FileText,
  Eye,
  EyeOff,
  UserPlus,
  ShieldAlert,
} from 'lucide-react';
import { login, initializeAuth } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useSupport } from '@/contexts/SupportContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const [supportSenderName, setSupportSenderName] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmittedCode, setSupportSubmittedCode] = useState<string | null>(null);

  const navigate = useNavigate();
  const { refresh } = useAuth();
  const { sendTicket } = useSupport();

  useEffect(() => {
    void initializeAuth();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await initializeAuth();
      const res = await login(username.trim(), password);

      if (res.success) {
        refresh();
        navigate('/');
      } else {
        setError(res.error || 'اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch {
      setError('تعذر الاتصال بخدمة التحقق الأمني');
    } finally {
      setLoading(false);
    }
  };

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportSenderName.trim() || !supportMessage.trim()) return;

    const created = sendTicket(supportSenderName, supportMessage);
    if (created) {
      setSupportSubmittedCode(created.referenceCode);
      setSupportSenderName('');
      setSupportMessage('');
      setTimeout(() => setSupportSubmittedCode(null), 6000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden" dir="rtl">
      <div
        className="fixed -inset-4 z-0 bg-cover bg-center bg-no-repeat pointer-events-none filter blur-[6px] scale-105"
        style={{
          backgroundImage: `url('${getAssetUrl('assets/login-bg-encryption.jpg')}')`,
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="fixed inset-0 z-0 bg-black/30 pointer-events-none" />

      <div className="glass-panel p-8 md:p-10 rounded-3xl w-full max-w-lg border border-slate-800 shadow-2xl relative z-10">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
          <span className="text-[11px] font-mono text-slate-400">بوابة الدخول الآمن المشفرة · منصة مِرْصَاد التشفير</span>
          <button
            type="button"
            onClick={() => setShowSupportModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5 text-emerald-400" />
            <span>الشكاوى والدعم الداخلي</span>
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto mb-3 rounded-3xl bg-slate-900/90 border border-emerald-500/40 p-2 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.25)]">
            <img
              src={getAssetUrl('assets/mirsad-emblem-logo.png')}
              alt="شعار مرصاد التشفير"
              className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(6,182,212,0.7)]"
            />
          </div>
          <h1 className="text-2xl font-black text-white">دخول مرصاد الآمن</h1>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-300">
            <Fingerprint className="w-3.5 h-3.5 text-emerald-400" />
            <span>Argon2id / PBKDF2-SHA256 (600K)</span>
          </div>
        </div>

        {error && (
          <div className="text-rose-400 p-3 bg-rose-950/50 rounded-xl mb-4 text-xs flex items-center gap-2 border border-rose-500/30">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={submit} className="space-y-3.5" autoComplete="off">
          <div className="group relative flex items-center w-full h-[52px] rounded-2xl bg-slate-950/80 border border-slate-700/80 hover:border-slate-600 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/25 px-3.5 transition-all shadow-inner">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-focus-within:text-emerald-400 transition-all shrink-0 pointer-events-none">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="(الرقم الأكاديمي) أو اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-full bg-transparent px-3 text-slate-100 placeholder:text-slate-500 text-sm font-medium focus:outline-none"
              required
            />
          </div>

          <div className="group relative flex items-center w-full h-[52px] rounded-2xl bg-slate-950/80 border border-slate-700/80 hover:border-slate-600 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/25 px-3.5 transition-all shadow-inner">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-focus-within:text-emerald-400 transition-all shrink-0 pointer-events-none">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="كلمة المرور المشفرة"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 h-full bg-transparent px-3 text-slate-100 placeholder:text-slate-500 text-sm font-medium focus:outline-none min-w-0"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-slate-400 hover:text-emerald-300 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-all shrink-0 cursor-pointer"
              title={showPassword ? 'إخفاء كلمة المرور' : 'عرض كلمة المرور'}
            >
              {showPassword ? <EyeOff className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative w-full h-[52px] rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 border border-emerald-400/20"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                <span>جارٍ التحقق عبر PBKDF2-SHA256...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-100" />
                <span>تسجيل الدخول الآمن</span>
              </span>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setShowPolicy((v) => !v)}
            className="w-full py-2 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-between gap-2 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>سياسة التحقق التشفيري والعزل الأمني (NCS-1:2020)</span>
            </span>
            {showPolicy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showPolicy && (
            <div className="mt-2 p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>تجزئة PBKDF2-SHA256 (600,000 تكرار) مع تشفير AES-256-GCM</span>
              </div>
              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                <FileCheck2 className="w-3 h-3 text-emerald-400" />
                <span>المعايير المعتمدة: NIST SP 800-63B · NCA NCS-1:2020</span>
              </p>
            </div>
          )}
        </div>

        {/* شريط استعادة كلمة المرور + إنشاء حساب جديد */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
          <Link to="/recovery" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold">
            <KeyRound className="w-3.5 h-3.5" />
            <span>نسيت كلمة المرور؟</span>
          </Link>
          <Link
            to="/register"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-black flex items-center gap-1.5 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>إنشاء حساب جديد</span>
          </Link>
        </div>
      </div>

      {/* نافذة إرسال رسالة سرية باتجاه واحد للإدارة */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel p-6 rounded-3xl w-full max-w-md border border-emerald-500/30 bg-slate-900 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">الشكاوى والمراسلات الداخلية السرية</h3>
                  <p className="text-[11px] text-slate-400">
                    تواصل مباشر وسري مع إدارة منصة مِرْصَاد مع عزل تام
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendSupport} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>اسم المرسل:</span>
                </label>
                <input
                  type="text"
                  required
                  value={supportSenderName}
                  onChange={(e) => setSupportSenderName(e.target.value)}
                  placeholder="أدخل اسمك أو معرفك"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>محتوى الرسالة أو الشكوى:</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="اكتب رسالتك السرية لإدارة المنصة..."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                  <span>المراسلات محفوظة بسرية تامة لدى المشرف العام فقط</span>
                </span>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-l from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال</span>
                </button>
              </div>

              {supportSubmittedCode && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    تم إرسال رسالتك بنجاح. الرمز المرجعي:{' '}
                    <strong className="font-mono text-white underline">{supportSubmittedCode}</strong>
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

```

### 4. الكود الكامل لصفحة إنشاء حساب جديد `src/pages/Register.tsx` (إنشاء حساب حقيقي مشفر وتسجيل الدخول به فوراً)

```
// File: src/pages/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserPlus,
  User,
  Lock,
  Phone,
  Hash,
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { registerUser, login } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { refresh } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    academicId: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanFullName = form.fullName.trim();
    const cleanAcademicId = form.academicId.trim();
    const cleanUsername = (form.username.trim() || cleanAcademicId).toLowerCase();
    const cleanPassword = form.password.trim();

    if (cleanFullName.length < 3) {
      setError('يرجى إدخال الاسم الكامل (3 أحرف على الأقل)');
      return;
    }
    if (!cleanAcademicId || cleanAcademicId.length < 3) {
      setError('يرجى إدخال الرقم الأكاديمي أو المعرف الرقمي');
      return;
    }
    if (cleanPassword.length < 6) {
      setError('كلمة المرور يجب أن تتكون من 6 أحرف أو أرقام على الأقل');
      return;
    }
    if (cleanPassword !== form.confirmPassword.trim()) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }

    setLoading(true);
    const res = await registerUser({
      username: cleanUsername,
      academicId: cleanAcademicId,
      fullName: cleanFullName,
      password: cleanPassword,
      phone: form.phone.trim() || undefined,
    });

    if (!res.success) {
      setLoading(false);
      setError(res.error || 'تعذر إنشاء الحساب');
      return;
    }

    // تسجيل الدخول تلقائياً بالحساب الجديد فور إنشائه
    const loginRes = await login(cleanUsername, cleanPassword);
    setLoading(false);

    if (loginRes.success) {
      refresh();
      navigate('/');
    } else {
      setSuccessMsg('تم إنشاء وتشفير حسابك بنجاح! يمكنك الآن تسجيل الدخول.');
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950"
      dir="rtl"
    >
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-7 md:p-9 rounded-3xl w-full max-w-lg relative z-10 border border-slate-800 shadow-2xl space-y-5"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <UserPlus className="w-8 h-8 text-slate-950" />
          </div>
          <h1 className="text-2xl font-black text-white">إنشاء حساب أكاديمي جديد</h1>
          <p className="text-xs text-slate-400">
            يُشفّر الحساب عبر PBKDF2-HMAC-SHA256 (600,000 تكرار) ويرتبط بقاعدة بيانات المنصة المركزية
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5" autoComplete="off">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              الاسم الثلاثي الكامل *
            </label>
            <div className="flex items-center h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
              <User className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="أدخل اسمك الكامل"
                className="w-full h-full bg-transparent px-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                الرقم الأكاديمي *
              </label>
              <div className="flex items-center h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
                <Hash className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  required
                  value={form.academicId}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      academicId: e.target.value,
                      username: p.username || e.target.value,
                    }))
                  }
                  placeholder="(الرقم الأكاديمي)"
                  className="w-full h-full bg-transparent px-2.5 text-xs text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                اسم المستخدم للدخول
              </label>
              <div className="flex items-center h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                  placeholder="اختياري (الافتراضي: الرقم الأكاديمي)"
                  className="w-full h-full bg-transparent px-2.5 text-xs text-white font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              رقم الجوال (اختياري)
            </label>
            <div className="flex items-center h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="05XXXXXXXX"
                className="w-full h-full bg-transparent px-2.5 text-xs text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-emerald-300 mb-1">
                كلمة المرور (6 خانات فأكثر) *
              </label>
              <div className="flex items-center h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="أدخل كلمة المرور"
                  className="w-full h-full bg-transparent px-2.5 text-xs text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-slate-400 hover:text-emerald-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-300 mb-1">
                تأكيد كلمة المرور *
              </label>
              <div className="flex items-center h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                  placeholder="أعد كتابة كلمة المرور"
                  className="w-full h-full bg-transparent px-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>
              {loading
                ? 'جارٍ تشفير الحساب وتفعيله...'
                : 'إنشاء الحساب وتفعيله والدخول الآن'}
            </span>
          </button>
        </form>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">لديك حساب بالفعل؟</span>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
          >
            <span>الانتقال لصفحة تسجيل الدخول</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

```

### 5. الكود الكامل المحدث لملف `src/pages/admin/AdminDashboard.tsx` (ربط نافذة `+ إضافة مستخدم` بنظام المصادقة الفعلي `adminCreateUserAccount` مع تحديد كلمة المرور لتسجيل الدخول بنجاح فوراً)

```
// File: src/pages/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import CircularProgress from '@/components/admin/CircularProgress';
import DonutChart from '@/components/admin/DonutChart';
import BarChart from '@/components/admin/BarChart';
import LineChart from '@/components/admin/LineChart';
import {
  getCoursesStats,
  removeDashboardUser,
  addAuditLog,
} from '@/lib/dashboardData';
import {
  getUsers,
  saveUsers,
  deleteUser,
  adminCreateUserAccount,
  getUserPasswordDetails,
  initializeAuth,
  StoredUser,
  UserRole,
} from '@/lib/auth';
import {
  getRealLoginLogs,
  syncAdminStateWithCloud,
  pushAdminAccountOverride,
} from '@/lib/centralAdminDB';
import { getStoredAuditLogs } from '@/lib/audit';

export default function AdminDashboard() {
  const [users, setUsers] = useState<StoredUser[]>(() => getUsers());
  const [courses] = useState(getCoursesStats);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState({
    fullName: '',
    academicId: '',
    password: '',
    phone: '',
    role: 'user' as UserRole,
  });

  const refreshUsersList = async () => {
    await syncAdminStateWithCloud();
    await initializeAuth();
    setUsers(getUsers());
  };

  useEffect(() => {
    void refreshUsersList().finally(() => setLoading(false));
    const onUpdated = () => setUsers(getUsers());
    window.addEventListener('mirsad-users-updated', onUpdated);
    window.addEventListener('storage', onUpdated);
    return () => {
      window.removeEventListener('mirsad-users-updated', onUpdated);
      window.removeEventListener('storage', onUpdated);
    };
  }, []);

  const totalChapters = courses.reduce((s, c) => s + c.totalChapters, 0);
  const totalCompleted = courses.reduce((s, c) => s + c.completedChapters, 0);
  const completionPercent =
    totalChapters > 0 ? Math.round((totalCompleted / totalChapters) * 100) : 0;

  const handleDelete = async (username: string) => {
    if (username.toLowerCase() === 'admin') return;
    const res = deleteUser(username);
    if (!res.success) {
      setStatusMessage(`⚠️ ${res.error}`);
      return;
    }
    removeDashboardUser(username);
    setUsers(getUsers());
    addAuditLog({ action: 'DELETE_USER', details: `حذف المستخدم ${username}`, user: 'admin' });
    setStatusMessage(`✓ تم حذف الحساب (${username}) من النظام وقاعدة البيانات المركزية.`);
  };

  const handleRoleChange = async (username: string, role: UserRole) => {
    if (username.toLowerCase() === 'admin' && role !== 'admin') return;
    const updated = users.map((u) => (u.username === username ? { ...u, role } : u));
    saveUsers(updated);
    setUsers(getUsers());
    await pushAdminAccountOverride({
      username,
      role,
      updatedAt: Date.now(),
    });
    addAuditLog({ action: 'ROLE_UPDATE', details: `تغيير دور ${username} إلى ${role}`, user: 'admin' });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);

    const fullName = createForm.fullName.trim();
    const academicId = createForm.academicId.trim();
    const password =
      createForm.password.trim() || `Mirsad#${academicId.slice(-4).padStart(4, '0')}`;

    if (!fullName || !academicId) {
      setCreateError('يرجى إدخال الاسم الكامل والرقم الأكاديمي');
      return;
    }
    if (password.length < 6) {
      setCreateError('كلمة المرور يجب أن تكون 6 خانات على الأقل');
      return;
    }

    const res = await adminCreateUserAccount({
      fullName,
      academicId,
      username: academicId.toLowerCase(),
      password,
      phone: createForm.phone.trim(),
      role: createForm.role,
    });

    if (!res.success) {
      setCreateError(res.error || 'تعذر إنشاء الحساب');
      return;
    }

    setUsers(getUsers());
    addAuditLog({
      action: 'CREATE_USER',
      details: `إنشاء وتفعيل حساب ${fullName} (${academicId}) بكلمة مرور معتمدة`,
      user: 'admin',
    });
    setStatusMessage(
      `✓ تم إنشاء وتفعيل حساب «${fullName}» بنجاح! المعرف للدخول: (${academicId}) — كلمة المرور: (${password}). يمكنه تسجيل الدخول الآن فوراً.`
    );
    setShowCreateModal(false);
    setCreateForm({ fullName: '', academicId: '', password: '', phone: '', role: 'user' });
  };

  const realLoginLogs = getRealLoginLogs();
  const auditLogs = getStoredAuditLogs();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm text-slate-400">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100">
            لوحة تحكم المسؤول والحوكمة المركزية
          </h1>
          <p className="text-sm mt-1 text-slate-400">
            إدارة الحسابات الفعلية والمحتوى الأكاديمي وسجل تسجيل الدخول المباشر
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black tracking-widest uppercase border bg-indigo-500/15 text-indigo-300 border-indigo-500/30">
          ADMIN ACTIVE
        </span>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-200 flex items-center justify-between gap-3">
          <span className="font-bold">{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard label="إجمالي الحسابات الفعلية" value={users.length} icon="👥" tone="text-indigo-400" />
        <KPICard label="المسؤولون (Admin)" value={users.filter((u) => u.role === 'admin').length} icon="🔐" tone="text-emerald-400" />
        <KPICard label="عمليات الدخول الموثقة" value={realLoginLogs.length} icon="⚡" tone="text-amber-400" />
        <KPICard label="سجلات التدقيق المشفرة" value={auditLogs.length} icon="📊" tone="text-purple-400" />
      </div>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-200 mb-4">👤 توزيع الحسابات الفعلية</h3>
          <DonutChart
            segments={[
              { label: 'طلاب', value: users.filter((u) => u.role === 'user').length, color: '#6366f1' },
              { label: 'دكاترة', value: users.filter((u) => u.role === 'doctor').length, color: '#10b981' },
              { label: 'مشرفون', value: users.filter((u) => u.role === 'admin').length, color: '#f59e0b' },
            ]}
            size={130}
          />
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-200 mb-4">📝 أداء الاختبارات</h3>
          <LineChart
            points={[
              { x: 1, y: 78, label: 'F1', value: 78 },
              { x: 2, y: 82, label: 'F2', value: 82 },
              { x: 3, y: 75, label: 'F3', value: 75 },
              { x: 4, y: 88, label: 'F4', value: 88 },
            ]}
            height={160}
          />
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-200 mb-4">⏱ جاهزية المقررات</h3>
          <div className="flex items-center justify-center py-4">
            <CircularProgress
              percentage={completionPercent || 100}
              size={120}
              strokeWidth={10}
              color="#10b981"
              label="جاهزية المنصة"
            />
          </div>
        </div>
      </div>

      {/* User Management — مربوط مباشرة بنظام المصادقة الفعلي auth.ts */}
      <div className="glass-panel p-5 rounded-2xl border border-indigo-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
            <span>👥</span> إدارة المستخدمين الفعليين ({users.length})
          </h3>
          <button
            type="button"
            onClick={() => {
              setCreateError(null);
              setShowCreateModal(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 hover:bg-indigo-500/30"
          >
            <span className="text-base leading-none">+</span>
            <span>إضافة مستخدم جديد وتفعيله</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800">
                <th className="py-2.5 px-3 font-semibold">الاسم والمستخدم</th>
                <th className="py-2.5 px-3 font-semibold">الرقم الأكاديمي / المعرف</th>
                <th className="py-2.5 px-3 font-semibold">كلمة المرور المعتمدة للدخول</th>
                <th className="py-2.5 px-3 font-semibold">الجوال</th>
                <th className="py-2.5 px-3 text-center font-semibold">الدور</th>
                <th className="py-2.5 px-3 text-center font-semibold">الحالة</th>
                <th className="py-2.5 px-3 text-center font-semibold">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const pwInfo = getUserPasswordDetails(u);
                return (
                  <tr key={u.username} className="border-b border-slate-800/40 hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-bold text-white">
                      {u.fullName || u.username}{' '}
                      <span className="text-slate-400 font-mono text-[11px]">(@{u.username})</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-300">{u.academicId || u.username}</td>
                    <td className="py-3 px-3 font-mono text-emerald-300 font-bold select-all">
                      {pwInfo.password}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400">{u.phone || '—'}</td>
                    <td className="py-3 px-3 text-center">
                      <select
                        value={u.role}
                        disabled={u.username.toLowerCase() === 'admin'}
                        onChange={(e) => handleRoleChange(u.username, e.target.value as UserRole)}
                        className="bg-slate-900 text-xs border border-slate-700 rounded-lg px-2 py-1 text-slate-200"
                      >
                        <option value="user">طالب</option>
                        <option value="doctor">دكتور</option>
                        <option value="admin">مسؤول</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-emerald-400 font-bold text-[11px]">✓ نشط ومفعّل للدخول</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => void handleDelete(u.username)}
                        disabled={u.username.toLowerCase() === 'admin'}
                        className="text-rose-400 hover:text-rose-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 cursor-pointer"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* نافذة إضافة مستخدم جديد وتشفير كلمة مروره ليتمكن من الدخول فوراً */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form
            onSubmit={handleCreate}
            className="relative w-full max-w-md glass-panel rounded-3xl p-6 shadow-2xl border border-indigo-500/40 bg-slate-900 space-y-4"
          >
            <h2 className="text-lg font-black text-white">إضافة وتفعيل حساب مستخدم جديد</h2>

            {createError && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-xs text-rose-300">
                {createError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold mb-1 text-slate-300">الاسم الكامل *</label>
              <input
                type="text"
                required
                value={createForm.fullName}
                onChange={(e) => setCreateForm((p) => ({ ...p, fullName: e.target.value }))}
                className="w-full rounded-xl px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 text-white"
                placeholder="أدخل الاسم الثلاثي الكامل"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-slate-300">
                الرقم الأكاديمي / اسم المستخدم للدخول *
              </label>
              <input
                type="text"
                required
                value={createForm.academicId}
                onChange={(e) =>
                  setCreateForm((p) => ({
                    ...p,
                    academicId: e.target.value,
                    password:
                      p.password ||
                      (e.target.value.trim().length >= 4
                        ? `Mirsad#${e.target.value.trim().slice(-4)}`
                        : ''),
                  }))
                }
                className="w-full rounded-xl px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 text-white font-mono"
                placeholder="(الرقم الأكاديمي)"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-emerald-300">
                  كلمة المرور المعتمدة للحساب (6 خانات فأكثر) *
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const suffix =
                      createForm.academicId.trim().slice(-4) ||
                      String(Math.floor(1000 + Math.random() * 9000));
                    setCreateForm((p) => ({ ...p, password: `Mirsad#${suffix}` }));
                  }}
                  className="text-[11px] text-amber-400 hover:underline font-bold"
                >
                  توليد تلقائي
                </button>
              </div>
              <input
                type="text"
                required
                value={createForm.password}
                onChange={(e) => setCreateForm((p) => ({ ...p, password: e.target.value }))}
                className="w-full rounded-xl px-3.5 py-2.5 text-xs bg-slate-950 border border-emerald-500/50 text-emerald-300 font-mono font-bold"
                placeholder="أدخل كلمة المرور التي سيدخل بها المستخدم"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-300">رقم الجوال</label>
                <input
                  type="tel"
                  value={createForm.phone}
                  onChange={(e) => setCreateForm((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full rounded-xl px-3 py-2 text-xs bg-slate-950 border border-slate-700 text-white font-mono"
                  placeholder="05XXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-300">الدور</label>
                <select
                  value={createForm.role}
                  onChange={(e) => setCreateForm((p) => ({ ...p, role: e.target.value as UserRole }))}
                  className="w-full rounded-xl px-3 py-2 text-xs bg-slate-950 border border-slate-700 text-white"
                >
                  <option value="user">طالب</option>
                  <option value="doctor">دكتور</option>
                  <option value="admin">مسؤول</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer"
              >
                إنشاء وتفعيل الحساب الآن
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function KPICard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string | number;
  icon?: string;
  tone: string;
}) {
  return (
    <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
      {icon && <span className="text-xl">{icon}</span>}
      <div>
        <p className={`text-xl md:text-2xl font-black font-mono tabular-nums ${tone}`}>{value}</p>
        <p className="text-[11px] text-slate-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

```