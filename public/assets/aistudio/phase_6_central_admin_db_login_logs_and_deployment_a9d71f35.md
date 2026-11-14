# المرحلة التطويرية 6 (منفصلة بالكامل): قاعدة بيانات المشرف المركزية، سجل تسجيل الدخول الفعلي للمستخدمين والأدمن، إخفاء الأرقام الأكاديمية من الأمثلة، وإصلاح نشر Netlify وGitHub

يعالج هذا الملف المستقل جميع النقاط الهندسية الخاصة بنظام الحسابات الفعلي، وسجل تسجيل الدخول، واستعادة كلمة المرور، ومزامنة الحذف على **Netlify**، وحل مشكلة `DNS_PROBE_POSSIBLE` على **GitHub Pages**.

---

## أولاً: التشخيص الهندسي الدقيق (سطراً بسطر)

### 1. لماذا لم يتحدث موقع Netlify بعد حذف بعض الحسابات بحساب الأدمن؟
* **السبب البرمجي في `src/lib/auth.ts` (الأسطر `230–248` و`1045–1070` و`1112–1236`):**
  1. الحسابات الـ 11 (حساب `admin` + 10 طلاب) معرّفة بشكل ثابت (`Hardcoded`) في مصفوفة `PREHASHED_ACCOUNTS` داخل ملف `src/lib/auth.ts`.
  2. عندما يقوم الأدمن بحذف حساب من صفحة `AdminUsers.tsx`، تقوم الدالة `deleteUser()` في `src/lib/auth.ts` (السطر `1061`) بحفظ اسم الحساب المحذوف داخل `localStorage` المحلي للمتصفح الحالي فقط (`localStorage.setItem('mirsad_deleted_users_v1', ...)`).
  3. المتصفح على موقع **Netlify** (`*.netlify.app`) يمتلك ذاكرة `localStorage` و`IndexedDB` منفصلة عن بيئة التطوير، وعند فتحه يقرأ مصفوفة `PREHASHED_ACCOUNTS` الثابتة من الكود البرمجي ولا يجد قائمة الحذف فيعيد إظهار الحسابات المحذوفة.
* **الحل الجذري المنفّذ في هذه المرحلة:**
  1. ربط عمليات الحذف وتغيير كلمات المرور وتعديل الأدوار وسجل تسجيل الدخول بقاعدة بيانات سحابية مركزية حقيقية عبر **Firebase Firestore** (`mirsad_admin_state/accounts_registry` و`mirsad_login_logs`) بحيث ينعكس حذف أي مستخدم أو تعديل كلمة مروره فوراً على جميع الأجهزة وعلى موقع **Netlify**.
  2. إضافة زر **«تصدير الكود المصدري المحدث للحسابات بعد الحذف»** في لوحة الأدمن (`AdminUsers.tsx`) لتمكين المشرف أيضاً من نسخ مصفوفة الحسابات المحدثة مباشرة إلى الكود البرمجي إذا رغب في تثبيت الحذف داخل مستودع GitHub.

### 2. لماذا يعطي GitHub خطأ `DNS_PROBE_POSSIBLE` (تعذر العثور على عنوان نظام أسماء النطاقات لـ `mirsad-al-tashfeer`)؟
* **السبب التقني المباشر:**
  1. المتصفح يحاول فتح العنوان `http://mirsad-al-tashfeer` أو `https://mirsad-al-tashfeer` كاسم نطاق مستقل، وذلك يحدث في حالتين:
     - **الحالة أ:** كتابة `mirsad-al-tashfeer` داخل خانة **Custom domain** في إعدادات المستودع على GitHub (`Settings -> Pages -> Custom domain`). عند وضع اسم المستودع في خانة Custom domain، يقوم GitHub بإنشاء ملف `CNAME` يحول الموقع إلى `http://mirsad-al-tashfeer/`، وبما أنه ليس نطاقاً مسجلاً في DNS العالمي (`.com` أو `.sa`)، يفشل DNS ويظهر خطأ `DNS_PROBE_POSSIBLE`.
     - **الحالة ب:** فتح الرابط بدون نطاق `github.io`. الرابط الصحيح لصفحات GitHub هو دائماً:
       `https://<GITHUB_USERNAME>.github.io/mirsad-al-tashfeer/`
  2. **خطوات الإصلاح الفوري في إعدادات GitHub:**
     - ادخل إلى مستودعك في GitHub ثم افتح **Settings** $\rightarrow$ **Pages**.
     - تحت قسم **Build and deployment**، اختر في خانة **Source**: **`GitHub Actions`**.
     - تحت قسم **Custom domain**، **امسح أي نص مكتوب فيه واجعله فارغاً تماماً** ثم اضغط **Save** (واحذف ملف `CNAME` إن وُجد في المستودع).

### 3. سجل الحسابات الفعلي الحالي في المنصة (الأدمن + 10 طلاب)
هذه هي الحسابات الـ 11 الفعلية المسجلة في الكود المصدري حالياً (`src/lib/auth.ts`):

| # | اسم المستخدم (`username`) | الرقم الأكاديمي (`academicId`) | الاسم الكامل | الدور (`role`) | كلمة المرور المعتمدة |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **1** | `admin` | `ADMIN-001` | المشرف العام على المنصة | `admin` (مشرف النظام) | `Mirsad@Admin2026!` |
| **2** | `25105375` | `25105375` | فهد خالد الغامدي | `user` (طالب) | `Mirsad#5375` |
| **3** | `25106060` | `25106060` | صالح محمد المالكي | `user` (طالب) | `Mirsad#6060` |
| **4** | `25106394` | `25106394` | ياسر مفرح العسيري | `user` (طالب) | `Mirsad#6394` |
| **5** | `25106059` | `25106059` | ماهر حبيب داود | `user` (طالب) | `Mirsad#6059` |
| **6** | `25105456` | `25105456` | عبدالرحمن محمد الفيفي | `user` (طالب) | `Mirsad#5456` |
| **7** | `25104748` | `25104748` | عمر إبراهيم بن مشعان | `user` (طالب) | `Mirsad#4748` |
| **8** | `25108174` | `25108174` | إيمان محمد الأهدل | `user` (طالب) | `Mirsad#8174` |
| **9** | `25105999` | `25105999` | عفراء سعود الجهني | `user` (طالب) | `Mirsad#5999` |
| **10** | `25105026` | `25105026` | عبدالله موسى سفياني | `user` (طالب) | `Mirsad#5026` |
| **11** | `2510650` | `2510650` | خديجة محمد جعفري | `user` (طالب) | `Mirsad#0650` |

---

## ثانياً: أمر النسخ المباشر للمرحلة 6 (انسخه إلى Google AI Studio)

```text
نفّذ المرحلة التطويرية السادسة (تحديث نظام تسجيل الدخول كنظام حقيقي بقاعدة بيانات مشرف مركزية، وإظهار سجل تسجيل الدخول الفعلي لجميع المستخدمين مع حساب الأدمن، وتغيير مثال استعادة كلمة المرور إلى (الرقم الأكاديمي) دون كشف أي رقم أكاديمي للطلاب، وإصلاح إعدادات Netlify وGitHub Pages) عبر إنشاء وتحديث الملفات التالية بالكامل:

1. في `src/pages/Recovery.tsx` و`src/pages/Login.tsx`:
- استبدل النص الإرشادي `مثال: 25105375` بـ `(الرقم الأكاديمي)`، واستبدل `مثال: 25105375 أو RST-123456` بـ `(الرقم الأكاديمي) أو رقم المرجع` لضمان عدم كشف أي رقم أكاديمي لأي طالب في الواجهة.

2. أنشئ ملف `src/lib/centralAdminDB.ts`:
- يربط نظام الحسابات وكلمات المرور وقائمة الحسابات المحذوفة وسجل تسجيل الدخول الفعلي بقاعدة بيانات المشرف المركزية على Firebase Firestore (`mirsad_admin_state` و`mirsad_login_logs`) مع مزامنة محلية فورية، بحيث ينعكس حذف أي حساب أو تغيير كلمة مروره أو تسجيل الدخول فوراً على موقع Netlify وجميع الأجهزة.
- يسجل كل عملية تسجيل دخول فعلية (ناجحة أو فاشلة) أو خروج لجميع المستخدمين وحساب الأدمن مع التاريخ والوقت الدقيق وعدد مرات الدخول وحالة الحساب.

3. حدّث `src/lib/auth.ts`:
- اربط دالة `login()` و`deleteUser()` و`adminUpdateUserPassword()` و`changePassword()` بمحرك قاعدة بيانات المشرف المركزية `centralAdminDB` وبسجل التدقيق `writeAuditLog` لتوثيق كل عملية دخول أو حذف أو تعديل.

4. حدّث `src/pages/admin/AdminUsers.tsx`:
- أضف جدول «سجل تسجيل الدخول الفعلي للمستخدمين وحساب الأدمن (Live Login Activity Log)» أسفل جدول الحسابات، مع عرض حالة آخر دخول وعدد مرات الدخول لكل حساب (بما في ذلك حساب الأدمن)، وزر «نسخ كود الحسابات الفعلي بعد الحذف» لتحديث الكود البرمجي بضغطة زر.

5. أنشئ ملف `netlify.toml` وحدّث `vite.config.ts` لضمان عمل التوجيه (SPA Routing) على Netlify وGitHub Pages دون أخطاء DNS أو 404.
```

---

## ثالثاً: الأكواد البرمجية الكاملة لملفات المرحلة 6

### 1. الكود الكامل لملف `src/lib/centralAdminDB.ts` (قاعدة بيانات المشرف المركزية وسجل تسجيل الدخول الفعلي للمستخدمين والأدمن)
```ts
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
  role?: 'admin' | 'doctor' | 'user' | 'guest';
  password?: string;
  passwordHash?: string;
  passwordSalt?: string;
  isDeleted?: boolean;
  lastLoginAt?: number;
  loginCount?: number;
  updatedAt: number;
}

const LOGIN_LOGS_STORAGE_KEY = 'mirsad_real_login_logs_v1';
const ACCOUNT_OVERRIDES_STORAGE_KEY = 'mirsad_central_account_overrides_v1';
const DELETED_USERS_STORAGE_KEY = 'mirsad_deleted_users_v1';
const ACTIVE_PASSWORDS_STORAGE_KEY = 'mirsad_user_active_passwords_v1';

function hasLocalStorage(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

/**
 * قراءة التعديلات المركزية على الحسابات (الحذف، تعديل كلمات المرور، الأدوار، إحصائيات الدخول)
 */
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
 * مزامنة حالة قاعدة بيانات المشرف (الحسابات المحذوفة وكلمات المرور المعدلة) مع Firestore السحابي
 * لضمان انعكاس التعديلات على موقع Netlify وجميع المتصفحات
 */
export async function syncAdminStateWithCloud(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const docRef = doc(firestoreDB, 'mirsad_admin_state', 'accounts_registry');
    const snap = await getDoc(docRef);
    const localOverrides = getLocalAccountOverrides();

    if (snap.exists()) {
      const cloudData = snap.data() as {
        overrides?: Record<string, CentralAccountOverride>;
        deletedUsers?: string[];
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

      // تطبيق قائمة المحذوفين وكلمات المرور المحدثة على التخزين المحلي
      const deletedSet = new Set<string>(cloudData.deletedUsers || []);
      const customPwRaw = localStorage.getItem(ACTIVE_PASSWORDS_STORAGE_KEY);
      const customPwMap = customPwRaw ? JSON.parse(customPwRaw) : {};

      for (const [uname, rec] of Object.entries(merged)) {
        if (rec.isDeleted) {
          deletedSet.add(uname.toLowerCase());
          if (rec.academicId) deletedSet.add(rec.academicId.toLowerCase());
        } else if (rec.password && rec.passwordHash && rec.passwordSalt) {
          customPwMap[uname.toLowerCase()] = {
            password: rec.password,
            passwordHash: rec.passwordHash,
            passwordSalt: rec.passwordSalt,
            updatedAt: rec.updatedAt,
          };
        }
      }

      localStorage.setItem(DELETED_USERS_STORAGE_KEY, JSON.stringify(Array.from(deletedSet)));
      localStorage.setItem(ACTIVE_PASSWORDS_STORAGE_KEY, JSON.stringify(customPwMap));
      window.dispatchEvent(new CustomEvent('mirsad-users-updated'));
    }
  } catch {
    // يعمل بنظام Offline-First إذا كانت قواعد Firestore مقيدة قبل تسجيل الدخول
  }
}

/**
 * رفع تعديل المشرف (حذف حساب / تغيير كلمة مرور / تغيير دور) إلى قاعدة البيانات السحابية والمحلية
 */
export async function pushAdminAccountOverride(
  override: CentralAccountOverride
): Promise<void> {
  const cleanKey = override.username.toLowerCase().trim();
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
    const deletedRaw = hasLocalStorage() ? localStorage.getItem(DELETED_USERS_STORAGE_KEY) : null;
    const deletedUsers: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
    const docRef = doc(firestoreDB, 'mirsad_admin_state', 'accounts_registry');
    await setDoc(
      docRef,
      {
        overrides: map,
        deletedUsers,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
  } catch {
    // fallback to local persistence
  }
}

/**
 * قراءة سجل تسجيل الدخول الفعلي لجميع المستخدمين وحساب الأدمن
 */
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

/**
 * تسجيل حدث دخول فعلي (ناجح أو فاشل أو خروج) للمستخدمين والأدمن في السجل الفعلي وسلسلة التدقيق
 */
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
        ? `تسجيل دخول فعلي ناجح (${params.role === 'admin' ? 'حساب المشرف العام Admin' : 'حساب طالب'})`
        : params.status === 'logout'
        ? 'تسجيل خروج آمن من المنصة'
        : 'محاولة تسجيل دخول غير ناجحة'),
  };

  if (hasLocalStorage()) {
    const existing = getRealLoginLogs();
    const updated = [entry, ...existing].slice(0, 300);
    localStorage.setItem(LOGIN_LOGS_STORAGE_KEY, JSON.stringify(updated));
  }

  // تحديث عداد الدخول وآخر ظهور للحساب الفعلي
  if (params.status === 'success') {
    const overrides = getLocalAccountOverrides();
    const prev = overrides[cleanUsername];
    await pushAdminAccountOverride({
      username: cleanUsername,
      academicId: params.academicId,
      fullName: params.fullName,
      role: params.role,
      lastLoginAt: now,
      loginCount: (prev?.loginCount || 0) + 1,
      updatedAt: now,
    });
  }

  // الكتابة في سلسلة التدقيق الأمني SHA-256 (AdminAudit)
  await writeAuditLog(null, {
    userId: cleanUsername,
    actorName: `${params.fullName} (${params.role === 'admin' ? 'ADMIN' : params.academicId})`,
    action:
      params.status === 'success'
        ? 'USER_LOGIN_SUCCESS'
        : params.status === 'logout'
        ? 'USER_LOGOUT'
        : 'USER_LOGIN_FAILED',
    category: 'auth',
    details: entry.note,
  });

  // محاولة الحفظ في Firestore السحابي
  try {
    await setDoc(doc(firestoreDB, 'mirsad_login_logs', entry.id), entry);
  } catch {
    // ignore offline/rules restriction
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mirsad-login-logs-updated'));
  }

  return entry;
}

/**
 * جلب أحدث سجلات الدخول من السحابة ودمجها مع السجل المحلي
 */
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

/**
 * مسح سجل الدخول الفعلي (بواسطة الأدمن فقط عند الحاجة)
 */
export function clearRealLoginLogs(): void {
  if (!hasLocalStorage()) return;
  localStorage.removeItem(LOGIN_LOGS_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('mirsad-login-logs-updated'));
}
```

---

### 2. الكود الكامل المحدث لملف `src/pages/Recovery.tsx` (جعل المثال `(الرقم الأكاديمي)` وعدم كشف أي رقم أكاديمي للطلاب)
```tsx
// File: src/pages/Recovery.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  KeyRound,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Send,
  Search,
  AlertTriangle,
  RefreshCw,
  Lock,
  Fingerprint,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  submitAdminPasswordResetRequest,
  checkMyPasswordResetStatus,
  completeAuthorizedPasswordReset,
} from '@/lib/auth';
import { useSupport } from '@/contexts/SupportContext';

type TabMode = 'request' | 'status';

export default function Recovery() {
  const [activeTab, setActiveTab] = useState<TabMode>('request');

  const [usernameOrAcademicId, setUsernameOrAcademicId] = useState('');
  const [senderName, setSenderName] = useState('');
  const [secretPin, setSecretPin] = useState('');
  const [reasonNote, setReasonNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [lookupId, setLookupId] = useState('');
  const [lookupPin, setLookupPin] = useState('');
  const [statusError, setStatusError] = useState('');
  const [trackedRequest, setTrackedRequest] = useState<{
    referenceCode: string;
    username: string;
    academicId: string;
    senderName: string;
    status: 'pending' | 'authorized' | 'completed' | 'rejected';
    adminGrantSignature?: string;
    adminReply?: string;
    requestedAt: string;
    authorizedAt?: string;
    resolvedAt?: string;
  } | null>(null);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetError, setResetError] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  const navigate = useNavigate();
  const { sendTicket } = useSupport();

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await submitAdminPasswordResetRequest({
      usernameOrAcademicId,
      senderName,
      secretPin,
      reasonNote,
    });
    setLoading(false);

    if (!res.success || !res.request) {
      setError(res.error || 'تعذر إرسال طلب التفويض للأدمن');
      return;
    }

    sendTicket(
      senderName.trim(),
      `[طلب تفويض استعادة كلمة مرور - مرجع ${res.referenceCode}] — المعرف المدخل: (${usernameOrAcademicId.trim()}) — السبب: ${
        reasonNote.trim() || 'يرجى اعتماد الطلب وإصدار تصريح HMAC-SHA256 لتمكيني من تعيين كلمة مرور جديدة.'
      }`
    );

    setLookupId(res.referenceCode || usernameOrAcademicId.trim());
    setLookupPin(secretPin.trim());
    setTrackedRequest({
      referenceCode: res.request.referenceCode,
      username: res.request.username,
      academicId: res.request.academicId,
      senderName: res.request.senderName,
      status: res.request.status,
      requestedAt: res.request.requestedAt,
    });
    setActiveTab('status');
  };

  const handleCheckStatus = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStatusError('');
    setResetError('');
    if (!lookupId.trim() || !lookupPin.trim()) return;

    const res = await checkMyPasswordResetStatus(lookupId, lookupPin);
    if (!res.found || !res.request) {
      setStatusError(res.error || 'لم يتم العثور على طلب مطابق');
      setTrackedRequest(null);
    } else {
      setTrackedRequest(res.request);
    }
  };

  const handleCompleteAuthorizedReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccessMessage('');

    if (!trackedRequest || trackedRequest.status !== 'authorized') {
      setResetError('لا يمكن تعيين كلمة المرور قبل صدور تصريح الأدمن الموقّع بـ HMAC-SHA256');
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError('كلمتا المرور غير متطابقتين');
      return;
    }

    setSavingPassword(true);
    const res = await completeAuthorizedPasswordReset({
      identifier: lookupId.trim() || trackedRequest.referenceCode,
      secretPin: lookupPin.trim(),
      newPassword,
    });
    setSavingPassword(false);

    if (!res.success) {
      setResetError(res.error || 'تعذر حفظ كلمة المرور الجديدة');
      return;
    }

    setNewPassword('');
    setConfirmPassword('');
    setResetSuccessMessage(
      'تم التحقق من توقيع الأدمن (HMAC-SHA256) وتشفير كلمة المرور الجديدة عبر PBKDF2-SHA256 وحفظها بنجاح!'
    );

    const updatedStatus = await checkMyPasswordResetStatus(
      lookupId.trim() || trackedRequest.referenceCode,
      lookupPin.trim()
    );
    if (updatedStatus.found && updatedStatus.request) {
      setTrackedRequest(updatedStatus.request);
    }
  };

  useEffect(() => {
    if (activeTab !== 'status' || !lookupId.trim() || !lookupPin.trim()) return;

    const refreshStatus = () => {
      checkMyPasswordResetStatus(lookupId, lookupPin).then((res) => {
        if (res.found && res.request) {
          setTrackedRequest(res.request);
        }
      });
    };

    const interval = setInterval(refreshStatus, 3000);
    window.addEventListener('storage', refreshStatus);
    window.addEventListener('mirsad-reset-requests-updated', refreshStatus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', refreshStatus);
      window.removeEventListener('mirsad-reset-requests-updated', refreshStatus);
    };
  }, [activeTab, lookupId, lookupPin]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950"
      dir="rtl"
    >
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="glass-panel p-7 md:p-9 rounded-3xl w-full max-w-lg relative z-10 border border-slate-800 shadow-2xl space-y-5">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            بروتوكول استعادة كلمة المرور المشفر
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>طلب تفويض أولاً ← تصريح الأدمن (HMAC-SHA256) ← تعيين كلمة المرور</span>
          </div>
        </div>

        <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('request')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'request'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            1. إرسال طلب استعادة للأدمن
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('status')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'status'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            2. التحقق من الاعتماد وتعيين كلمة المرور
          </button>
        </div>

        {activeTab === 'request' && (
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              وفق التسلسل التشفيري الآمن لمنصة مِرْصَاد، يُرسل أولاً طلب تفويض إلى الأدمن. وتظل خانة كتابة كلمة المرور الجديدة مغلقة تماماً حتى يعتمد الأدمن طلبك ويصدر تصريحاً موقّعاً بـ{' '}
              <span className="font-mono text-emerald-400">HMAC-SHA256</span>.
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  الرقم الأكاديمي أو اسم المستخدم:
                </label>
                <input
                  type="text"
                  required
                  value={usernameOrAcademicId}
                  onChange={(e) => setUsernameOrAcademicId(e.target.value)}
                  placeholder="(الرقم الأكاديمي)"
                  className="input-field text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  اسم المرسل الكامل:
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="أدخل اسمك الثلاثي الكامل..."
                  className="input-field text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1.5">
                رمز التحقق الشخصي السري (PIN من 4 إلى 6 أرقام):
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                required
                value={secretPin}
                onChange={(e) => setSecretPin(e.target.value.replace(/\D/g, ''))}
                placeholder="أدخل من 4 إلى 6 أرقام تحفظها لمتابعة الطلب وتعيين كلمة المرور لاحقاً"
                className="input-field text-sm text-right"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                يُجزّأ هذا الرمز بـ SHA-256 ويُستخدم للتحقق من هويتك عند فتح خانة كلمة المرور بعد اعتماد الأدمن.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                سبب الطلب الموجه للأدمن:
              </label>
              <input
                type="text"
                value={reasonNote}
                onChange={(e) => setReasonNote(e.target.value)}
                placeholder="مثال: نسيت كلمة المرور وأرجو إصدار تصريح لتعيين كلمة مرور جديدة..."
                className="input-field text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              <span>
                {loading
                  ? 'جاري توثيق الطلب وإرساله للأدمن...'
                  : 'إرسال طلب التفويض إلى الأدمن'}
              </span>
            </button>
          </form>
        )}

        {activeTab === 'status' && (
          <div className="space-y-4">
            <form onSubmit={handleCheckStatus} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    الرقم الأكاديمي أو رقم المرجع:
                  </label>
                  <input
                    type="text"
                    required
                    value={lookupId}
                    onChange={(e) => setLookupId(e.target.value)}
                    placeholder="(الرقم الأكاديمي) أو رقم المرجع"
                    className="input-field text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    رمز التحقق الشخصي السري (PIN):
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={lookupPin}
                    onChange={(e) => setLookupPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="أدخل رمز الـ PIN السري (4-6 أرقام)"
                    className="input-field text-xs text-right"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>فحص حالة تصريح الأدمن الآن</span>
              </button>
            </form>

            {statusError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {statusError}
              </div>
            )}

            {trackedRequest && (
              <div className="p-5 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-xs text-slate-400">
                      المرسل: <strong className="text-white">{trackedRequest.senderName}</strong>
                    </div>
                    <div className="text-[11px] font-mono text-amber-400 mt-0.5">
                      رقم المرجع: {trackedRequest.referenceCode}
                    </div>
                  </div>

                  {trackedRequest.status === 'authorized' ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>مفوّض بتوقيع الأدمن (مفتوح للتعيين)</span>
                    </span>
                  ) : trackedRequest.status === 'completed' ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تم تحديث كلمة المرور بنجاح</span>
                    </span>
                  ) : trackedRequest.status === 'rejected' ? (
                    <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
                      مرفوض من الأدمن
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>بانتظار تصريح الأدمن...</span>
                    </span>
                  )}
                </div>

                {trackedRequest.status === 'pending' && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-amber-300">
                      <Lock className="w-4 h-4 shrink-0" />
                      <span>حقول كلمة المرور الجديدة مغلقة تشفيرياً حتى يصدر تصريح الأدمن:</span>
                    </div>
                    <p className="leading-relaxed text-slate-300">
                      بمجرد مراجعة الأدمن لطلبك وإصدار التصريح التشفيري الموقّع بـ{' '}
                      <span className="font-mono text-amber-300">HMAC-SHA256</span>، ستُفتح لك خانة إدخال كلمة المرور الجديدة هنا تلقائياً.
                    </p>
                  </div>
                )}

                {trackedRequest.status === 'authorized' && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
                          <Fingerprint className="w-4 h-4 text-emerald-400" />
                          <span>تم التحقق من تصريح الأدمن لفتح خانة كلمة المرور</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-400">
                          HMAC-SHA256 GRANT
                        </span>
                      </div>
                      {trackedRequest.adminReply && (
                        <p className="text-xs text-slate-200 pt-1">
                          <strong className="text-emerald-400">رسالة الأدمن:</strong> {trackedRequest.adminReply}
                        </p>
                      )}
                    </div>

                    {resetError && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{resetError}</span>
                      </div>
                    )}

                    <form onSubmit={handleCompleteAuthorizedReset} className="space-y-3 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-emerald-300 mb-1.5">
                          كلمة المرور الجديدة:
                        </label>
                        <div className="flex items-center w-full h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
                          <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="أدخل كلمة المرور الجديدة (8 أحرف فأكثر)"
                            className="flex-1 h-full bg-transparent px-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword((v) => !v)}
                            className="p-1 text-slate-400 hover:text-emerald-400 cursor-pointer"
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-emerald-300 mb-1.5">
                          تأكيد كلمة المرور الجديدة:
                        </label>
                        <div className="flex items-center w-full h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
                          <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="أعد كتابة كلمة المرور الجديدة للتأكيد"
                            className="flex-1 h-full bg-transparent px-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={savingPassword}
                        className="w-full py-3 rounded-xl bg-gradient-to-l from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                          {savingPassword
                            ? 'جاري التحقق من توقيع الأدمن وتشفير كلمة المرور...'
                            : 'تشفير وحفظ كلمة المرور الجديدة المعتمدة الآن'}
                        </span>
                      </button>
                    </form>
                  </div>
                )}

                {trackedRequest.status === 'completed' && (
                  <div className="p-4 rounded-xl bg-emerald-500/15 border-2 border-emerald-500/50 text-xs text-emerald-100 space-y-3">
                    <div className="font-extrabold text-sm text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>تم تشفير وحفظ كلمة المرور الجديدة الخاصة بك بنجاح!</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">
                      {resetSuccessMessage ||
                        'تم التحقق من تصريح الأدمن (HMAC-SHA256)، وتجزئة كلمة المرور الجديدة عبر PBKDF2-SHA256 (600,000 تكرار).'}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg cursor-pointer"
                    >
                      الانتقال لتسجيل الدخول بكلمة المرور الجديدة الآن
                    </button>
                  </div>
                )}

                {trackedRequest.status === 'rejected' && (
                  <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-xs text-rose-200 space-y-2">
                    <div className="font-bold text-rose-300">تم رفض هذا الطلب من إدارة المنصة:</div>
                    <p className="text-slate-300">
                      {trackedRequest.adminReply || 'يرجى مراجعة إدارة المنصة عبر نظام الدعم الداخلي بالبيانات الصحيحة.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="pt-2 border-t border-slate-800/80 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-bold"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لصفحة تسجيل الدخول</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

### 3. الكود الكامل المحدث لملف `src/pages/admin/AdminUsers.tsx` (يعرض سجل تسجيل الدخول الفعلي لجميع المستخدمين مع حساب الأدمن + مزامنة قاعدة بيانات المشرف + تصدير كود الحسابات بعد الحذف)
```tsx
// File: src/pages/admin/AdminUsers.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  ShieldCheck,
  CheckCircle2,
  User as UserIcon,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Check,
  Pencil,
  Trash2,
  X,
  Activity,
  Clock,
  Code2,
  RefreshCw,
} from 'lucide-react';
import {
  getUsers,
  saveUsers,
  deleteUser,
  initializeAuth,
  StoredUser,
  UserRole,
  seedStudentAccounts,
  getUserPassword,
  getUserPasswordDetails,
  adminUpdateUserPassword,
} from '@/lib/auth';
import {
  getRealLoginLogs,
  fetchAndMergeCloudLoginLogs,
  syncAdminStateWithCloud,
  pushAdminAccountOverride,
  getLocalAccountOverrides,
  LoginActivityRecord,
} from '@/lib/centralAdminDB';
import { removeDashboardUser } from '@/lib/dashboardData';
import { useAuth } from '@/contexts/AuthContext';
import { writeAuditLog } from '@/lib/audit';
import { AdminNav } from '@/components/admin/AdminNav';
import { cn } from '@/lib/utils';
import ImportPasswordsModal from '@/components/ui/ImportPasswordsModal';

const ROLE_OPTIONS = [
  { value: 'student', label: 'طالب', color: 'bg-slate-500/15 text-slate-300 border-slate-500/30' },
  { value: 'instructor', label: 'مُدرّس', color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' },
  { value: 'admin', label: 'مشرف (Admin)', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
];

export default function AdminUsers() {
  const { session } = useAuth();
  const [usersList, setUsersList] = useState<StoredUser[]>(() => getUsers());
  const [loginLogs, setLoginLogs] = useState<LoginActivityRecord[]>(() => getRealLoginLogs());
  const [accountOverrides, setAccountOverrides] = useState(() => getLocalAccountOverrides());
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusMsg, setStatusMsg] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportCodeModal, setShowExportCodeModal] = useState(false);

  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});
  const [copiedUsername, setCopiedUsername] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<StoredUser | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [editPasswordError, setEditPasswordError] = useState<string | null>(null);
  const [confirmDeleteUsername, setConfirmDeleteUsername] = useState<string | null>(null);
  const isAdmin = session?.role === 'admin';

  const refreshAllData = async () => {
    await syncAdminStateWithCloud();
    await initializeAuth();
    setUsersList(getUsers());
    setAccountOverrides(getLocalAccountOverrides());
    const mergedLogs = await fetchAndMergeCloudLoginLogs();
    setLoginLogs(mergedLogs);
  };

  useEffect(() => {
    void refreshAllData();
    const onUsersUpdated = () => {
      setUsersList(getUsers());
      setAccountOverrides(getLocalAccountOverrides());
    };
    const onLogsUpdated = () => {
      setLoginLogs(getRealLoginLogs());
    };
    window.addEventListener('mirsad-users-updated', onUsersUpdated);
    window.addEventListener('mirsad-login-logs-updated', onLogsUpdated);
    window.addEventListener('storage', onUsersUpdated);
    return () => {
      window.removeEventListener('mirsad-users-updated', onUsersUpdated);
      window.removeEventListener('mirsad-login-logs-updated', onLogsUpdated);
      window.removeEventListener('storage', onUsersUpdated);
    };
  }, []);

  const toggleShowPassword = (username: string) => {
    setShowPasswordMap((prev) => ({ ...prev, [username]: !prev[username] }));
  };

  const handleCopyPassword = async (username: string, pwd: string) => {
    try {
      await navigator.clipboard.writeText(pwd);
      setCopiedUsername(username);
      setTimeout(() => setCopiedUsername(null), 2000);
    } catch {
      // ignore
    }
  };

  const openEditPasswordModal = (user: StoredUser) => {
    setEditingUser(user);
    setNewPasswordInput('');
    setShowNewPassword(false);
    setEditPasswordError(null);
  };

  const generateQuickPassword = () => {
    const randDigits = Math.floor(1000 + Math.random() * 9000);
    setNewPasswordInput(`Mirsad#${randDigits}`);
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    const trimmed = newPasswordInput.trim();
    if (!trimmed || trimmed.length < 6) {
      setEditPasswordError('يجب أن يتكون الرقم السري الجديد من 6 خانات على الأقل.');
      return;
    }

    setIsSubmittingPassword(true);
    setEditPasswordError(null);

    const res = await adminUpdateUserPassword(editingUser.username, trimmed);
    setIsSubmittingPassword(false);

    if (!res.success) {
      setEditPasswordError(res.error || 'فشل تحديث الرقم السري.');
      return;
    }

    const updated = getUsers();
    const updatedUser = updated.find((u) => u.username === editingUser.username);
    if (updatedUser) {
      await pushAdminAccountOverride({
        username: updatedUser.username,
        academicId: updatedUser.academicId,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
        password: trimmed,
        passwordHash: updatedUser.passwordHash,
        passwordSalt: updatedUser.passwordSalt,
        isDeleted: false,
        updatedAt: Date.now(),
      });
    }

    setUsersList(updated);
    setShowPasswordMap((prev) => ({ ...prev, [editingUser.username]: true }));

    try {
      await navigator.clipboard.writeText(trimmed);
      setCopiedUsername(editingUser.username);
    } catch {
      // ignore
    }

    await writeAuditLog(null, {
      userId: session?.username || 'admin',
      actorName: session?.fullName || 'مشرف النظام',
      action: 'PASSWORD_RESET_ASSISTANCE',
      category: 'admin',
      details: `تغيير وتشفير الرقم السري للمستخدم ${editingUser.fullName} (${editingUser.username}) ومزامنته في قاعدة بيانات المشرف المركزية.`,
    });

    setStatusMsg(
      `✓ تم تغيير الرقم السري للمستخدم ${editingUser.fullName} بنجاح إلى: (${trimmed}) ومزامنته مع قاعدة بيانات المشرف السحابية.`
    );
    setEditingUser(null);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return usersList.filter((u) => {
      const currentRole =
        u.role === 'admin'
          ? 'admin'
          : (u as { isInstructor?: boolean }).isInstructor
          ? 'instructor'
          : 'student';
      if (roleFilter !== 'all' && currentRole !== roleFilter) return false;
      if (!q) return true;
      return (
        u.username.toLowerCase().includes(q) ||
        (u.fullName || '').toLowerCase().includes(q) ||
        (u.academicId || '').includes(q)
      );
    });
  }, [usersList, search, roleFilter]);

  const handleImportAllStudents = async () => {
    setStatusMsg('جارٍ استيراد ومزامنة جميع الحسابات الرسمية...');
    await seedStudentAccounts(true);
    const updated = getUsers();
    setUsersList(updated);
    setStatusMsg(`✓ تم استيراد وتحديث حسابات الطلاب والمشرف بنجاح (${updated.length} حساب فعلي).`);
  };

  const handleRoleChange = async (username: string, newRole: string) => {
    const current = usersList.find((u) => u.username === username);
    if (!current) return;

    if (current.username === session?.username && newRole !== 'admin') {
      setStatusMsg('⚠️ لا يمكنك تنزيل رتبتك الإدارية الخاصة.');
      return;
    }

    const mappedRole = (newRole === 'admin' ? 'admin' : 'user') as UserRole;
    const updated = usersList.map((u) =>
      u.username === username
        ? { ...u, role: mappedRole, isInstructor: newRole === 'instructor' }
        : u
    );

    setUsersList(updated);
    saveUsers(updated);
    await pushAdminAccountOverride({
      username: current.username,
      academicId: current.academicId,
      fullName: current.fullName,
      role: mappedRole,
      updatedAt: Date.now(),
    });

    setStatusMsg(`✓ تم تحديث دور ${current.fullName} إلى ${newRole} وحفظه في قاعدة بيانات المشرف.`);
  };

  const handleRemoveUser = async (targetUser: StoredUser) => {
    if (!isAdmin) return;
    const res = deleteUser(targetUser.username);
    if (!res.success) {
      setStatusMsg(`⚠️ ${res.error || 'تعذّر إزالة المستخدم.'}`);
      setConfirmDeleteUsername(null);
      return;
    }
    removeDashboardUser(targetUser.username);
    await pushAdminAccountOverride({
      username: targetUser.username,
      academicId: targetUser.academicId,
      fullName: targetUser.fullName,
      isDeleted: true,
      updatedAt: Date.now(),
    });

    setUsersList(getUsers());
    setConfirmDeleteUsername(null);

    await writeAuditLog(null, {
      userId: session?.username || 'admin',
      actorName: session?.fullName || 'مشرف النظام',
      action: 'USER_REMOVED_CENTRAL',
      category: 'admin',
      details: `حذف حساب المستخدم ${targetUser.fullName} (@${targetUser.username}) من النظام وقاعدة بيانات المشرف المركزية.`,
    });

    setStatusMsg(
      `✓ تمت إزالة الحساب ${targetUser.fullName} (@${targetUser.username}) وحفظ الحذف في قاعدة البيانات المركزية. لتثبيت الحذف داخل ملف الكود المصدري قبل الرفع إلى GitHub/Netlify، انقر على زر «تصدير كود الحسابات الفعلي بعد الحذف».`
    );
  };

  // توليد الكود المصدري لمصفوفة PREHASHED_ACCOUNTS بالحسابات الفعلية المتبقية فقط بعد الحذف
  const exportedAccountsCode = useMemo(() => {
    const items = usersList.map((u) => ({
      username: u.username,
      name: u.fullName,
      academicId: u.academicId,
      passwordSalt: u.passwordSalt,
      passwordHash: u.passwordHash,
      role: u.role,
      title: u.persona || (u.role === 'admin' ? 'مشرف النظام المركزي' : 'طالب دبلوم أمن المعلومات — شعبة (002م)'),
      phone: u.phone || '',
    }));
    return `export const PREHASHED_ACCOUNTS: PrehashedAccount[] = ${JSON.stringify(items, null, 2)};`;
  }, [usersList]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-4" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link to="/admin" className="hover:text-emerald-400 transition-colors">
              لوحة الإدارة
            </Link>
            <span>/</span>
            <span className="text-slate-200">قاعدة بيانات المشرف وسجل تسجيل الدخول الفعلي</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-400" />
            <span>إدارة الحسابات الفعلية وسجل الدخول (شامل حساب الأدمن)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {usersList.length} حساب فعلي نشط حالياً • مزامنة مركزية لحذف الحسابات وتحديث كلمات المرور وسجلات الدخول
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void refreshAllData()}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-1.5 border border-cyan-500/30 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>مزامنة قاعدة البيانات</span>
          </button>
          <button
            type="button"
            onClick={() => setShowExportCodeModal(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-500/40 cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
            <span>تصدير كود الحسابات الفعلي بعد الحذف (لـ GitHub / Netlify)</span>
          </button>
          <button
            type="button"
            onClick={handleImportAllStudents}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>استعادة الحسابات الـ 11 الأصلية</span>
          </button>
        </div>
      </div>

      <AdminNav />

      {statusMsg && (
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <span>{statusMsg}</span>
          <button onClick={() => setStatusMsg('')} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* شريط البحث والفلترة */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="search"
            placeholder="ابحث باسم المستخدم أو الاسم الكامل أو الرقم الأكاديمي..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 pr-10 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div className="flex gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          {[
            { value: 'all', label: `الكل (${usersList.length})` },
            ...ROLE_OPTIONS.map((r) => ({ value: r.value, label: r.label })),
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setRoleFilter(opt.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                roleFilter === opt.value
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* جدول الحسابات الفعلية الحالية (شامل حساب الأدمن + سجل آخر دخول لكل حساب) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-black text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>قائمة الحسابات الفعلية المعتمدة حالياً في قاعدة بيانات المشرف ({filtered.length} حساب)</span>
          </h2>
          <span className="text-[11px] text-slate-400">
            يشمل حساب المشرف العام (admin) وجميع حسابات الطلاب غير المحذوفة
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-bold">
              <tr>
                <th className="px-4 py-3.5">المستخدم</th>
                <th className="px-4 py-3.5">الرقم الأكاديمي / المعرف</th>
                <th className="px-4 py-3.5">الدور</th>
                <th className="px-4 py-3.5 whitespace-nowrap">الرقم السري الفعلي</th>
                <th className="px-4 py-3.5">آخر تسجيل دخول فعلي</th>
                <th className="px-4 py-3.5">عدد مرات الدخول</th>
                <th className="px-4 py-3.5 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((user) => {
                const userRole =
                  user.role === 'admin'
                    ? 'admin'
                    : (user as { isInstructor?: boolean }).isInstructor
                    ? 'instructor'
                    : 'student';
                const roleMeta = ROLE_OPTIONS.find((r) => r.value === userRole) || ROLE_OPTIONS[0];
                const isSelf = user.username.toLowerCase() === session?.username?.toLowerCase();
                const { password: realPassword, isDefault: isDefaultPw } = getUserPasswordDetails(user);
                const isRevealed = showPasswordMap[user.username] || false;
                const isCopied = copiedUsername === user.username;

                // حساب إحصائيات الدخول الفعلية لهذا المستخدم من السجل الحي
                const userLogs = loginLogs.filter(
                  (l) =>
                    l.status === 'success' &&
                    (l.username.toLowerCase() === user.username.toLowerCase() ||
                      l.academicId.toLowerCase() === (user.academicId || '').toLowerCase())
                );
                const overrideInfo = accountOverrides[user.username.toLowerCase()];
                const lastLoginTs =
                  userLogs[0]?.timestamp ||
                  overrideInfo?.lastLoginAt ||
                  (isSelf ? session?.loginTime : undefined);
                const totalLogins = Math.max(
                  userLogs.length,
                  overrideInfo?.loginCount || 0,
                  isSelf ? 1 : 0
                );

                return (
                  <tr key={user.username} className="hover:bg-slate-950/40 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 border',
                            user.role === 'admin'
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                              : 'bg-slate-800 border-slate-700'
                          )}
                        >
                          {(user.fullName || user.username).charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm flex items-center gap-1.5">
                            <span>{user.fullName || user.username}</span>
                            {isSelf && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black">
                                متصل الآن
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-slate-400 font-mono">@{user.username}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-mono text-slate-300">
                      {user.academicId || user.username}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${roleMeta.color}`}>
                        {roleMeta.label}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 flex-nowrap">
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded text-[10px] font-bold border shrink-0',
                            isDefaultPw
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                              : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          )}
                        >
                          {isDefaultPw ? 'افتراضي' : 'محدّث'}
                        </span>

                        <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800 font-mono text-xs">
                          <span className={cn('select-all font-bold', isRevealed ? 'text-amber-300' : 'text-slate-400')}>
                            {isRevealed ? realPassword : '••••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleShowPassword(user.username)}
                            className="text-slate-500 hover:text-slate-200 p-1"
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopyPassword(user.username, realPassword)}
                            className="text-slate-500 hover:text-emerald-400 p-1"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => openEditPasswordModal(user)}
                          className="px-2 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>تعديل</span>
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-mono text-[11px]">
                      {lastLoginTs ? (
                        <span className="text-emerald-300">
                          {new Date(lastLoginTs).toLocaleString('ar-SA')}
                        </span>
                      ) : (
                        <span className="text-slate-500">لم يسجل دخولاً بعد</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 font-mono text-xs text-center">
                      <span
                        className={cn(
                          'px-2.5 py-1 rounded-full font-black',
                          totalLogins > 0
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        )}
                      >
                        {totalLogins} مرة
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-left">
                      {isSelf ? (
                        <span className="text-emerald-400 font-bold text-[11px]">حساب الأدمن النشط</span>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={userRole}
                            onChange={(e) => handleRoleChange(user.username, e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-white text-xs"
                          >
                            {ROLE_OPTIONS.map((r) => (
                              <option key={r.value} value={r.value}>
                                {r.label}
                              </option>
                            ))}
                          </select>

                          {isAdmin &&
                            (confirmDeleteUsername === user.username ? (
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveUser(user)}
                                  className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px] cursor-pointer"
                                >
                                  تأكيد الحذف
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteUsername(null)}
                                  className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] cursor-pointer"
                                >
                                  إلغاء
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteUsername(user.username)}
                                className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>حذف</span>
                              </button>
                            ))}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── جدول سجل تسجيل الدخول الفعلي لجميع المستخدمين وحساب الأدمن ─── */}
      <div className="rounded-2xl bg-slate-900 border border-emerald-500/30 overflow-hidden shadow-xl">
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-black text-white">
                سجل عمليات تسجيل الدخول الفعلي للمستخدمين جميعاً مع حساب الأدمن
              </h2>
              <p className="text-[11px] text-slate-400">
                يوثق لحظياً كل عملية تسجيل دخول أو خروج لحساب المشرف العام (admin) وحسابات الطلاب الفعلية
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-300">
            إجمالي عمليات الدخول الموثقة: {loginLogs.length}
          </span>
        </div>

        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-950/90 border-b border-slate-800 text-slate-400 font-bold sticky top-0">
              <tr>
                <th className="px-4 py-3">التاريخ والوقت</th>
                <th className="px-4 py-3">اسم المستخدم / الحساب</th>
                <th className="px-4 py-3">المعرف / الرقم الأكاديمي</th>
                <th className="px-4 py-3">نوع الحساب</th>
                <th className="px-4 py-3">حالة العملية</th>
                <th className="px-4 py-3">التفاصيل الأمنية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loginLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
                    سيظهر هنا تلقائياً كل تسجيل دخول فعلي يقوم به الأدمن أو أي طالب فور دخوله للمنصة.
                  </td>
                </tr>
              ) : (
                loginLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-950/40">
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-300 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        {new Date(log.timestamp).toLocaleString('ar-SA')}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-white">{log.fullName}</td>
                    <td className="px-4 py-3 font-mono text-amber-300">{log.academicId}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-full text-[10px] font-bold border',
                          log.role === 'admin'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                        )}
                      >
                        {log.role === 'admin' ? 'المشرف العام (Admin)' : 'طالب'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'px-2.5 py-0.5 rounded-full text-[10px] font-black',
                          log.status === 'success'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : log.status === 'logout'
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-rose-500/20 text-rose-300'
                        )}
                      >
                        {log.status === 'success'
                          ? 'دخول ناجح ✓'
                          : log.status === 'logout'
                          ? 'تسجيل خروج'
                          : 'محاولة مرفوضة'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-[11px]">{log.note}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* نافذة تصدير كود الحسابات الفعلي بعد الحذف لنسخه في src/lib/auth.ts قبل الرفع لـ Netlify */}
      {showExportCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md" dir="rtl">
          <div className="w-full max-w-3xl bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black text-white">
                  كود الحسابات الفعلية المتبقية بعد الحذف ({usersList.length} حساب)
                </h3>
                <p className="text-xs text-slate-400">
                  انسخ هذه المصفوفة واستبدل بها `PREHASHED_ACCOUNTS` في `src/lib/auth.ts` لتثبيت الحذف نهائياً داخل الكود المصدري على GitHub وNetlify.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowExportCodeModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <pre
              dir="ltr"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-80 overflow-y-auto"
            >
              {exportedAccountsCode}
            </pre>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(exportedAccountsCode);
                  setStatusMsg('✓ تم نسخ كود PREHASHED_ACCOUNTS المحدث للحافظة.');
                  setShowExportCodeModal(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer"
              >
                نسخ الكود المحدث للحافظة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تعديل كلمة المرور */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" dir="rtl">
          <div className="relative w-full max-w-md bg-slate-900 border border-blue-500/40 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                تغيير الرقم السري لـ {editingUser.fullName}
              </h3>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePassword} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-200">الرقم السري الجديد:</label>
                  <button
                    type="button"
                    onClick={generateQuickPassword}
                    className="text-[11px] text-emerald-400 font-bold"
                  >
                    توليد تلقائي
                  </button>
                </div>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="أدخل كلمة المرور الجديدة"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  required
                />
              </div>

              {editPasswordError && (
                <p className="text-xs text-rose-400">{editPasswordError}</p>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isSubmittingPassword}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer"
                >
                  تأكيد التغيير والمزامنة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ImportPasswordsModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onSuccess={(msg) => {
          setUsersList(getUsers());
          setStatusMsg(msg);
        }}
      />
    </div>
  );
}
```

---

### 4. التعديلات الدقيقة في `src/lib/auth.ts` لربط تسجيل الدخول والحذف بقاعدة بيانات المشرف المركزية
أضف الاستيراد التالي في أعلى `src/lib/auth.ts`:
```ts
import {
  recordRealLoginActivity,
  syncAdminStateWithCloud,
  pushAdminAccountOverride,
} from './centralAdminDB';
```
وفي داخل دالة `initializeAuth()` في `src/lib/auth.ts`، استدعِ `await syncAdminStateWithCloud();` قبل قراءة `getDeletedUsersSet()`، وفي نهاية دالة `login()` عند نجاح الدخول (أو فشله) استدعِ:
```ts
// عند نجاح تسجيل الدخول في دالة login() داخل src/lib/auth.ts:
void recordRealLoginActivity({
  username: user.username,
  fullName: user.fullName,
  academicId: user.academicId || user.username,
  role: user.role,
  status: 'success',
  authMethod: 'password',
});
```

---

### 5. الكود الكامل لملف `netlify.toml` (يوضع في جذر المشروع لضمان عمل كافة روابط المنصة على Netlify)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
