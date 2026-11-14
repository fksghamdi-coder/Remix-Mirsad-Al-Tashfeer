# تنسيق الشريط السفلي الموحد وتحويل أزرار الشريط العلوي إلى أيقونات فقط
**مشروع التشفير المتقدم (`ISE243`) · شعبة (`002م`) · جامعة الأمير مقرن بن عبدالعزيز**

---

## أولاً: الأمر التنفيذي المباشر للنسخ واللصق في مساعد Google AI Studio

انسخ النص التالي بالكامل والصقه مباشرة في نافذة المساعد داخل **Google AI Studio** لتطبيق تنسيق الأيقونات العلوية والشريط السفلي الموحد في جميع صفحات المنصة:

```text
قم بتنفيذ التعديلين التاليين في الشريط العلوي والشريط السفلي لجميع صفحات المنصة بدقة تامة:

أولاً — تحويل أزرار التنقل في الشريط العلوي إلى أيقونات فقط (رموز بدون نص) لمنع الازدحام:
1. في ملف `src/components/MainNav.tsx`:
- حوّل زر «بوابة المشروع» (`to="/"`) إلى زر أيقونة مربع فقط (`w-8 h-8 rounded-lg flex items-center justify-center btn-3d-neon shrink-0`) يعرض أيقونة `<Home className="w-4 h-4 text-emerald-400" />` فقط مع `title="بوابة المشروع"` (بدون `<span>بوابة المشروع</span>`).
- حوّل زر «المنصة الأكاديمية» (`to="/academic"`) إلى زر أيقونة مربع فقط (`w-8 h-8 rounded-lg flex items-center justify-center btn-3d-neon btn-3d-amber shrink-0`) يعرض أيقونة `<GraduationCap className="w-4 h-4 text-amber-300" />` فقط مع `title="المنصة الأكاديمية"` (بدون `<span>المنصة الأكاديمية</span>`).
- حوّل زر «الإدارة» (`to="/admin"`) لحساب الأدمن إلى زر أيقونة مربع فقط (`w-8 h-8 rounded-lg flex items-center justify-center btn-3d-neon text-blue-300 shrink-0`) يعرض أيقونة `<Shield className="w-4 h-4 text-blue-400" />` مع `title="لوحة الإدارة"`.

2. في ملف `src/components/AcademicNav.tsx`:
- حوّل زر «بوابة المشروع» (`to="/"`) إلى زر أيقونة مربع فقط (`w-8 h-8 rounded-lg flex items-center justify-center btn-3d-neon btn-3d-amber shrink-0`) يعرض أيقونة `<Home className="w-4 h-4 text-amber-400" />` فقط مع `title="بوابة المشروع"` (بدون نص).
- حوّل زر «المنصة الأساسية» (`to="/main"`) إلى زر أيقونة مربع فقط (`w-8 h-8 rounded-lg flex items-center justify-center btn-3d-neon btn-3d-neon-active shrink-0`) يعرض أيقونة `<ArrowRightLeft className="w-4 h-4 text-emerald-300" />` فقط مع `title="المنصة الأساسية"` (بدون نص).

3. في ملف `src/pages/UnifiedDashboard.tsx` (الهيدر العلوي):
- أضف زري أيقونة مربعين (`w-8 h-8`) للانتقال السريع إلى «المنصة الأساسية» (`to="/main"` بأيقونة `<LayoutDashboard className="w-4 h-4 text-emerald-400" />`) و«المنصة الأكاديمية» (`to="/academic"` بأيقونة `<GraduationCap className="w-4 h-4 text-amber-300" />`)، وحوّل زري «الإدارة» و«خروج» إلى أيقونات مربعة (`w-8 h-8`) فقط بدون نص.

ثانياً — توحيد وتنسيق البار السفلي (`footer`) في سطر واحد متناسق لكامل المنصة (`MainLayout.tsx`، و`AcademicLayout.tsx`، و`UnifiedDashboard.tsx`، و`AdminLayout.tsx`):
- اجعل البار السفلي في جميع هذه الملفات الأربعة في سطر واحد أنيق (`whitespace-nowrap overflow-x-auto no-scrollbar`) ويعرض النص الموحد التالي حرفياً:
  * الجانب الأيمن:
    `مشروع التشفير المتقدم (ISE243) · شعبة (002م) · جامعة الأمير مقرن بن عبدالعزيز · مشروع أكاديمي تدريبي موثق بالمصادر (وليس منصة رسمية)`
  * الجانب الأيسر:
    `الحساب: {session?.fullName || session?.displayName || session?.username || 'زائر'} · بيان المشروع والمصادر · بيانات موثقة بالمصادر`
    (مع جعل `بيان المشروع والمصادر` رابطاً ينقل إلى `/legal`).
```

---

## ثانياً: الأكواد البرمجية الكاملة للملفات بعد التعديل

### 1. ملف `src/components/MainLayout.tsx` (البار السفلي الموحد في سطر واحد)

```tsx
// File: src/components/MainLayout.tsx
import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import MainNav from './MainNav';
import { useAuth } from '@/contexts/AuthContext';
import { securityHardening } from '@/lib/securityHardening';

export default function MainLayout() {
  const { session } = useAuth();

  useEffect(() => {
    securityHardening();
  }, []);

  const connectedAccountName =
    session?.fullName || session?.displayName || session?.username || 'زائر';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950" dir="rtl">
      <MainNav />
      <main className="py-8 pb-14 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1" role="main">
        <Outlet />
      </main>
      <footer
        className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 py-2 px-4 md:px-6 text-[11px] leading-none text-slate-300"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto flex flex-nowrap items-center justify-between gap-4 whitespace-nowrap overflow-x-auto no-scrollbar">
          {/* الجانب الأيمن */}
          <div className="flex flex-nowrap items-center gap-1.5 shrink-0">
            <span className="font-bold text-emerald-300">مشروع التشفير المتقدم (ISE243)</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="font-semibold text-amber-300">شعبة (002م)</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-200">جامعة الأمير مقرن بن عبدالعزيز</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-400">
              مشروع أكاديمي تدريبي موثق بالمصادر (وليس منصة رسمية)
            </span>
          </div>

          {/* الجانب الأيسر */}
          <div className="flex flex-nowrap items-center gap-1.5 shrink-0">
            <span className="text-emerald-300 font-semibold">
              الحساب: {connectedAccountName}
            </span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <Link
              to="/legal"
              className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors"
            >
              بيان المشروع والمصادر
            </Link>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-300 font-medium">بيانات موثقة بالمصادر</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

---

### 2. ملف `src/components/AcademicLayout.tsx` (البار السفلي الموحد في سطر واحد)

```tsx
// File: src/components/AcademicLayout.tsx
import { useEffect } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { securityHardening } from '../lib/securityHardening';
import '../styles/PlatformLayout.css';
import AcademicNav from './AcademicNav';

export default function AcademicLayout() {
  const { isGuest, session, isLoading } = useAuth();

  useEffect(() => {
    securityHardening({ strictRedirect: false, showVisualBanner: true });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-400 font-bold">
        جاري التحميل...
      </div>
    );
  }

  if (isGuest) {
    return <Navigate to="/login" replace />;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  const connectedAccountName =
    session?.fullName || session?.displayName || session?.username || 'زائر';

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950"
      dir="rtl"
    >
      <AcademicNav />
      <main className="py-8 pb-14 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">
        <Outlet />
      </main>
      <footer
        className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-amber-500/20 py-2 px-4 md:px-6 text-[11px] leading-none text-slate-300"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto flex flex-nowrap items-center justify-between gap-4 whitespace-nowrap overflow-x-auto no-scrollbar">
          {/* الجانب الأيمن */}
          <div className="flex flex-nowrap items-center gap-1.5 shrink-0">
            <span className="font-bold text-amber-300">مشروع التشفير المتقدم (ISE243)</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="font-semibold text-emerald-300">شعبة (002م)</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-200">جامعة الأمير مقرن بن عبدالعزيز</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-400">
              مشروع أكاديمي تدريبي موثق بالمصادر (وليس منصة رسمية)
            </span>
          </div>

          {/* الجانب الأيسر */}
          <div className="flex flex-nowrap items-center gap-1.5 shrink-0">
            <span className="text-emerald-300 font-semibold">
              الحساب: {connectedAccountName}
            </span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <Link
              to="/legal"
              className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors"
            >
              بيان المشروع والمصادر
            </Link>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-300 font-medium">بيانات موثقة بالمصادر</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

---

### 3. الجزء العلوي (`MainNav.tsx` و`AcademicNav.tsx`) بعد تحويل أزرار التنقل إلى أيقونات فقط

#### في `src/components/MainNav.tsx` (الأسطر `98–215`):
```tsx
          {/* التنقل بين البوابات والأيقونات كرموز فقط في الصف العلوي */}
          <div className="flex flex-nowrap items-center justify-end gap-1.5 shrink-0">
            {/* رمز بوابة المشروع */}
            <Link
              to="/"
              title="بوابة المشروع"
              aria-label="بوابة المشروع"
              className="w-8 h-8 rounded-lg text-slate-200 hover:text-emerald-300 btn-3d-neon flex items-center justify-center shrink-0"
            >
              <Home className="w-4 h-4 text-emerald-400 shrink-0" />
            </Link>

            {/* رمز المنصة الأكاديمية */}
            {!isGuest && session && (
              <Link
                to="/academic"
                title="المنصة الأكاديمية"
                aria-label="المنصة الأكاديمية"
                className="w-8 h-8 rounded-lg text-amber-300 hover:text-amber-200 btn-3d-neon btn-3d-amber flex items-center justify-center shrink-0"
              >
                <GraduationCap className="w-4 h-4 text-amber-300 shrink-0" />
              </Link>
            )}

            <div className="w-px h-5 bg-slate-800/80 shrink-0" />

            <div className="flex items-center h-8 shrink-0">
              <ThemeToggle />
            </div>

            {/* الإشعارات */}
            <button
              type="button"
              onClick={() => setNotificationsPanelOpen(true)}
              className="relative w-8 h-8 rounded-lg text-slate-300 hover:text-emerald-300 btn-3d-neon flex items-center justify-center shrink-0"
              title="الإشعارات والتحديثات"
            >
              <Bell className="w-4 h-4" />
              {isAdmin && pendingComplaintsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </button>

            {/* الشكاوى والدعم لحساب الأدمن */}
            {session?.role === 'admin' && (
              <Link
                to="/contact"
                className={cn(
                  'relative w-8 h-8 rounded-lg flex items-center justify-center shrink-0 btn-3d-neon transition-all',
                  location.pathname === '/contact'
                    ? 'btn-3d-neon-active text-emerald-300'
                    : pendingComplaintsCount > 0
                    ? 'text-rose-300 border-rose-500/60 bg-rose-500/15 shadow-[0_0_12px_rgba(244,63,94,0.35)]'
                    : 'text-slate-300 hover:text-emerald-300'
                )}
                title={
                  pendingComplaintsCount > 0
                    ? `صندوق الشكاوى والدعم: ${pendingComplaintsCount} رسالة بانتظار الرد`
                    : 'صندوق الشكاوى والدعم الفني'
                }
                aria-label="الشكاوى والدعم الفني"
              >
                <Headphones className="w-4 h-4" />
                {pendingComplaintsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 text-[9px] font-black leading-none bg-rose-500 text-white rounded-full flex items-center justify-center border border-slate-950 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse">
                    {pendingComplaintsCount > 99 ? '99+' : pendingComplaintsCount}
                  </span>
                )}
              </Link>
            )}

            {/* البحث الشامل */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-8 h-8 rounded-lg text-slate-300 hover:text-emerald-300 btn-3d-neon flex items-center justify-center shrink-0"
              title="بحث شامل"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* الإعدادات */}
            <Link
              to="/settings"
              className={cn(
                'w-8 h-8 rounded-lg btn-3d-neon btn-3d-amber flex items-center justify-center shrink-0',
                location.pathname === '/settings'
                  ? 'btn-3d-amber-active text-amber-200'
                  : 'text-slate-300 hover:text-amber-300'
              )}
              title="الإعدادات والنسخ الاحتياطي"
            >
              <SettingsIcon className="w-4 h-4" />
            </Link>

            {/* رمز لوحة الإدارة */}
            {session?.role === 'admin' && (
              <Link
                to="/admin"
                className="w-8 h-8 rounded-lg text-blue-300 hover:text-blue-200 btn-3d-neon flex items-center justify-center shrink-0"
                title="لوحة الإدارة"
                aria-label="لوحة الإدارة"
              >
                <Shield className="w-4 h-4 text-blue-400" />
              </Link>
            )}

            {/* تسجيل الخروج */}
            {session ? (
              <button
                type="button"
                onClick={logout}
                title={`خروج (${session.fullName || session.username})`}
                className="text-slate-300 hover:text-red-300 w-8 h-8 rounded-lg btn-3d-neon flex items-center justify-center shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to="/login"
                title="تسجيل الدخول"
                className="text-emerald-300 w-8 h-8 rounded-lg btn-3d-neon flex items-center justify-center shrink-0"
              >
                <LogIn className="w-4 h-4" />
              </Link>
            )}
          </div>
```

#### في `src/components/AcademicNav.tsx` (الأسطر `76–144`):
```tsx
          {/* أدوات التحكم والتبديل كرموز فقط في الصف العلوي */}
          <div className="flex flex-nowrap items-center justify-end gap-1.5 shrink-0">
            {isGuest && (
              <span
                title="زائر"
                className="w-8 h-8 rounded-lg text-amber-300 flex items-center justify-center btn-3d-neon btn-3d-amber shrink-0"
              >
                <User className="w-4 h-4" />
              </span>
            )}

            {/* رمز بوابة المشروع */}
            <Link
              to="/"
              title="بوابة المشروع"
              aria-label="بوابة المشروع"
              className="w-8 h-8 rounded-lg text-slate-200 hover:text-amber-300 btn-3d-neon btn-3d-amber flex items-center justify-center shrink-0"
            >
              <Home className="w-4 h-4 text-amber-400 shrink-0" />
            </Link>

            {/* رمز المنصة الأساسية */}
            <Link
              to="/main"
              title="المنصة الأساسية"
              aria-label="المنصة الأساسية"
              className="w-8 h-8 rounded-lg text-emerald-300 btn-3d-neon btn-3d-neon-active flex items-center justify-center shrink-0"
            >
              <ArrowRightLeft className="w-4 h-4 shrink-0" />
            </Link>

            <div className="flex items-center h-8 shrink-0">
              <ThemeToggle />
            </div>
```