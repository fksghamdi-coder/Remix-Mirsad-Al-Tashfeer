# المرحلة التطويرية 1 (منفصلة بالكامل): تنسيق البار العلوي (رموز فقط)، والبار السفلي الموحد، والخطوط والتباعد، وإيقاف الصوت

هذا الملف مخصص حصرياً لتنفيذ **المرحلة التطويرية الأولى** بكامل ملفاتها دون أي تداخل مع المراحل الأخرى.

---

## أمر النسخ المباشر للمرحلة 1 (انسخه إلى Google AI Studio)
```text
نفّذ المرحلة التطويرية الأولى فقط عبر إنشاء وتحديث الملفات التالية بالكامل:
1. أنشئ ملف `src/components/layout/UnifiedProjectFooter.tsx` لتوحيد البار السفلي في المنصة بالكامل بالصيغة المعتمدة:
   - الجهة اليمنى: `مشروع التشفير المتقدم (ISE243) · شعبة (002م) جامعة الأمير مقرن بن عبدالعزيز · مشروع أكاديمي تعليمي موثق بالمصادر - عبدالعزيز · مشروع أكاديمي تدريبي موثق بالمصادر (وليس منصة رسمية)`
   - الجهة اليسرى: `الحساب: (اسم الحساب المتصل) · بيان المشروع والمصادر · بيانات موثقة بالمصادر`
   - مع التأكد من عدم ذكر تاريخ (10-10-2026) نهائياً في أي مكان بالمنصة.
2. حدّث `src/components/MainNav.tsx` و`src/components/AcademicNav.tsx` و`src/pages/UnifiedDashboard.tsx` لجعل أزرار التنقل في البار العلوي (بوابة المشروع، المنصة الأكاديمية، المنصة الأساسية، الإدارة، خروج) رموزاً فقط (Icon-Only) مع الإبقاء على التاريخ ومواقيت الصلاة.
3. حدّث `src/components/MainLayout.tsx` و`src/components/AcademicLayout.tsx` و`src/components/AdminLayout.tsx` لاستخدام `<UnifiedProjectFooter />`.
4. أفرغ `src/lib/soundEngine.ts` لإيقاف النظام الصوتي بالكامل، وأضف قواعد تحسين الخط العربي والتباعد في نهاية `src/index.css`.
```

---

## 1. الكود الكامل لملف `src/components/layout/UnifiedProjectFooter.tsx`
```tsx
// File: src/components/layout/UnifiedProjectFooter.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileCheck2, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function UnifiedProjectFooter() {
  const { session } = useAuth();
  const connectedAccountName =
    session?.fullName || session?.displayName || session?.username || 'زائر أكاديمي';

  return (
    <footer
      dir="rtl"
      role="contentinfo"
      className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-emerald-500/20 px-3 sm:px-6 py-1.5 text-[11px] leading-tight text-slate-300 shadow-[0_-4px_20px_rgba(0,0,0,0.6)]"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-1.5">
        {/* الجهة اليمنى: هوية المشروع الموحدة للمنصة بالكامل */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-1.5 gap-y-0.5 text-right">
          <span className="font-black text-emerald-400 inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>مشروع التشفير المتقدم (ISE243) · شعبة (002م)</span>
          </span>
          <span className="font-bold text-slate-200">جامعة الأمير مقرن بن عبدالعزيز</span>
          <span className="text-slate-600 font-bold">·</span>
          <span className="text-amber-300/95 font-semibold">
            مشروع أكاديمي تعليمي موثق بالمصادر - عبدالعزيز · مشروع أكاديمي تدريبي موثق بالمصادر (وليس منصة رسمية)
          </span>
        </div>

        {/* الجهة اليسرى: الحساب المتصل وبيان المشروع والمصادر */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-2 gap-y-0.5 shrink-0">
          <span className="inline-flex items-center gap-1 font-bold text-emerald-300">
            <UserCheck className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>الحساب: ({connectedAccountName})</span>
          </span>
          <span className="text-slate-600 font-bold">·</span>
          <Link
            to="/sources"
            className="inline-flex items-center gap-1 font-bold text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
          >
            <FileCheck2 className="w-3 h-3 shrink-0" />
            <span>بيان المشروع والمصادر</span>
          </Link>
          <span className="text-slate-600 font-bold">·</span>
          <span className="text-slate-400 font-semibold">بيانات موثقة بالمصادر</span>
        </div>
      </div>
    </footer>
  );
}
```

---

## 2. الكود الكامل لملف `src/components/MainNav.tsx` (الأيقونات في البار العلوي رموز فقط + الإبقاء على التاريخ ومواقيت الصلاة)
```tsx
// File: src/components/MainNav.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  GitCompare,
  History,
  BookMarked,
  Settings as SettingsIcon,
  LogOut,
  LogIn,
  GraduationCap,
  Search,
  Bell,
  Sparkles,
  MailCheck,
  Network,
  Landmark,
  FlaskConical,
  Terminal,
  Home,
  Headphones,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSupport } from '@/contexts/SupportContext';
import { cn } from '@/lib/utils';
import ThemeToggle from './ui/ThemeToggle';
import GlobalSearch from './ui/GlobalSearch';
import PrayerTimesWidget from './ui/PrayerTimesWidget';
import DateDisplay from './ui/DateDisplay';
import FloatingPanel from './ui/FloatingPanel';

const NAV = [
  { to: '/main', matchPaths: ['/main', '/observatory'], label: 'المرصد التحليلي', icon: LayoutDashboard },
  { to: '/aes-lab', matchPaths: ['/aes-lab'], label: 'مختبر AES & GF(2^8)', icon: Terminal },
  { to: '/zkp-lab', matchPaths: ['/zkp-lab'], label: 'مختبر المعرفة الصفرية ZKP', icon: FlaskConical },
  { to: '/saudi', matchPaths: ['/saudi'], label: 'الريادة السعودية', icon: Landmark },
  { to: '/main/comparisons', matchPaths: ['/main/comparisons'], label: 'المقارنات التحليلية', icon: GitCompare },
  { to: '/timeline', matchPaths: ['/timeline', '/main/timeline'], label: 'التحليل الزمني', icon: History },
  { to: '/main/definitions', matchPaths: ['/main/definitions'], label: 'المعجم الاصطلاحي', icon: BookMarked },
  { to: '/contact', matchPaths: ['/contact'], label: 'التواصل والدعم', icon: MailCheck },
  { to: '/architecture', matchPaths: ['/architecture'], label: 'المنهجية والبنية', icon: Network, developerOnly: true },
];

export default function MainNav() {
  const { session, isGuest, logout } = useAuth();
  const { tickets, isAdmin } = useSupport();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);

  const pendingComplaintsCount = isAdmin ? tickets.filter((t) => t.status === 'pending').length : 0;

  const isDeveloperAccount = Boolean(
    !isGuest &&
      session &&
      (session.role === 'admin' ||
        session.username === 'admin' ||
        session.username === 'fk.sghamdi' ||
        session.username === 'fk_sghamdi')
  );

  const visibleNav = NAV.filter((item) => !item.developerOnly || isDeveloperAccount);

  return (
    <>
      <header className="sticky top-0 z-40 w-full max-w-full overflow-hidden bg-slate-950/90 backdrop-blur-xl border-b border-emerald-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-5 py-2 flex flex-nowrap items-center justify-between gap-2 overflow-hidden">
          {/* الهوية */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/"
              title="العودة لبوابة المشروع الرئيسية"
              className="text-sm sm:text-base font-black tracking-tight text-emerald-400 flex items-center gap-2 group shrink-0 whitespace-nowrap"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-emerald-500/40 p-1 flex items-center justify-center group-hover:shadow-[0_0_15px_#10b981] transition-all duration-300 shrink-0">
                <img
                  src={`${import.meta.env.BASE_URL}assets/mirsad-emblem-logo.png`}
                  alt="شعار مرصاد التشفير"
                  className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(6,182,212,0.8)]"
                />
              </div>
              <span className="font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                مِرْصَاد · المنصة الأساسية
              </span>
            </Link>
          </div>

          {/* التاريخ ومواقيت الصلاة */}
          <div className="flex flex-nowrap items-center justify-center gap-1.5 shrink-0">
            <DateDisplay compact />
            <PrayerTimesWidget compact />
          </div>

          {/* الأيقونات في البار العلوي (رموز فقط لبوابة المشروع والمنصة الأكاديمية والإدارة والأدوات) */}
          <div className="flex flex-nowrap items-center justify-end gap-1.5 shrink-0">
            {/* رمز بوابة المشروع */}
            <Link
              to="/"
              title="بوابة المشروع"
              aria-label="بوابة المشروع"
              className="w-8 h-8 rounded-lg text-emerald-400 hover:text-emerald-300 btn-3d-neon flex items-center justify-center shrink-0"
            >
              <Home className="w-4 h-4 shrink-0" />
            </Link>

            {/* رمز المنصة الأكاديمية */}
            {!isGuest && session && (
              <Link
                to="/academic"
                title="المنصة الأكاديمية"
                aria-label="المنصة الأكاديمية"
                className="w-8 h-8 rounded-lg text-amber-300 hover:text-amber-200 btn-3d-neon btn-3d-amber flex items-center justify-center shrink-0"
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
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

            {/* الشكاوى والدعم */}
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
                title="صندوق الشكاوى والدعم الفني"
              >
                <Headphones className="w-4 h-4" />
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

            {/* رمز الإدارة */}
            {session?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-blue-300 hover:text-blue-200 w-8 h-8 rounded-lg btn-3d-neon flex items-center justify-center shrink-0"
                title="لوحة الإدارة"
                aria-label="لوحة الإدارة"
              >
                <Shield className="w-4 h-4 shrink-0" />
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
                className="text-slate-200 hover:text-emerald-300 w-8 h-8 rounded-lg flex items-center justify-center btn-3d-neon shrink-0"
              >
                <LogIn className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* شريط تبويبات المنصة الأساسية */}
        <nav className="max-w-7xl mx-auto w-full px-3 sm:px-5 py-1.5 border-t border-emerald-500/20 bg-slate-950/90 backdrop-blur-xl flex flex-nowrap items-center justify-between gap-1.5 overflow-hidden">
          {visibleNav.map((item) => {
            const Icon = item.icon;
            const active = item.matchPaths.includes(location.pathname);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex-1 min-w-0 h-8 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 btn-3d-neon transition-all whitespace-nowrap',
                  active
                    ? 'btn-3d-neon-active text-emerald-200'
                    : 'text-slate-300 hover:text-emerald-300'
                )}
              >
                <Icon className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <FloatingPanel
        isOpen={notificationsPanelOpen}
        onClose={() => setNotificationsPanelOpen(false)}
        title="تنبيهات المرصد الوطني والتحديثات"
      >
        <div className="space-y-3 py-2">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-100">تحديث المعايير الوطنية الموثقة</h4>
              <p className="text-xs text-slate-400 mt-1">
                تم توثيق وربط جميع البيانات بضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC-2:2024 / NCS-1:2020) ومعايير NIST FIPS 203/204/205.
              </p>
            </div>
          </div>
        </div>
      </FloatingPanel>

      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </>
  );
}
```

---

## 3. الكود الكامل لملف `src/components/AcademicNav.tsx` (الأيقونات في البار العلوي رموز فقط + الإبقاء على التاريخ ومواقيت الصلاة)
```tsx
// File: src/components/AcademicNav.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRightLeft,
  Trophy,
  Award,
  Search,
  User,
  Network,
  Layers,
  MonitorPlay,
  Cpu,
  Home,
  Headphones,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useSupport } from '@/contexts/SupportContext';
import GlobalSearch from './ui/GlobalSearch';
import ThemeToggle from './ui/ThemeToggle';
import DateDisplay from './ui/DateDisplay';
import PrayerTimesWidget from './ui/PrayerTimesWidget';

const NAV = [
  { to: '/academic', label: 'المقررات الدراسية (6 مقررات)', icon: Layers },
  { to: '/academic/interactive-lesson', label: 'الشرح التفاعلي والكتاب 3D', icon: MonitorPlay },
  { to: '/academic/crypto-3d', label: 'المجسم التشفيري 3D', icon: Cpu },
  { to: '/academic/knowledge-graph', label: 'الخريطة المعرفية', icon: Network },
  { to: '/academic/final-quiz', label: 'الاختبار النهائي', icon: Trophy },
  { to: '/academic/certificate', label: 'الشهادة الرقمية', icon: Award },
];

export default function AcademicNav() {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const { isGuest, session } = useAuth();
  const { tickets } = useSupport();

  const pendingComplaintsCount = session?.role === 'admin' ? tickets.filter((t) => t.status === 'pending').length : 0;

  return (
    <>
      <header className="sticky top-0 z-50 w-full max-w-full overflow-hidden bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/30 neon-border neon-amber shadow-lg">
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-5 py-2 flex flex-nowrap items-center justify-between gap-2 overflow-hidden">
          {/* الهوية */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/"
              title="العودة لبوابة المشروع"
              className="text-sm sm:text-base font-black tracking-tight text-amber-300 flex items-center gap-2 group shrink-0 whitespace-nowrap cursor-pointer hover:text-amber-200 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:shadow-[0_0_12px_#f59e0b] transition-all duration-300 shrink-0">
                <GraduationCap className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-bold">مِرْصَاد · المنصة الأكاديمية</span>
            </Link>
          </div>

          {/* التاريخ ومواقيت الصلاة */}
          <div className="flex flex-nowrap items-center justify-center gap-1.5 shrink-0">
            <DateDisplay compact variant="amber" />
            <PrayerTimesWidget compact variant="amber" />
          </div>

          {/* الأيقونات في البار العلوي (رموز فقط لبوابة المشروع والمنصة الأساسية والأدوات) */}
          <div className="flex flex-nowrap items-center justify-end gap-1.5 shrink-0">
            {isGuest && (
              <span className="w-8 h-8 rounded-lg text-amber-300 flex items-center justify-center btn-3d-neon btn-3d-amber shrink-0" title="زائر">
                <User className="w-4 h-4" />
              </span>
            )}

            {/* رمز بوابة المشروع */}
            <Link
              to="/"
              title="بوابة المشروع"
              aria-label="بوابة المشروع"
              className="w-8 h-8 rounded-lg text-amber-400 hover:text-amber-300 btn-3d-neon btn-3d-amber flex items-center justify-center shrink-0"
            >
              <Home className="w-4 h-4 shrink-0" />
            </Link>

            {/* رمز المنصة الأساسية */}
            <Link
              to="/main"
              title="المنصة الأساسية"
              aria-label="المنصة الأساسية"
              className="w-8 h-8 rounded-lg text-emerald-300 hover:text-emerald-200 shrink-0 btn-3d-neon btn-3d-neon-active flex items-center justify-center"
            >
              <ArrowRightLeft className="w-4 h-4 shrink-0" />
            </Link>

            <div className="flex items-center h-8 shrink-0">
              <ThemeToggle />
            </div>

            {session?.role === 'admin' && (
              <Link
                to="/contact"
                className={cn(
                  'relative w-8 h-8 rounded-lg flex items-center justify-center shrink-0 btn-3d-neon btn-3d-amber transition-all',
                  location.pathname === '/contact'
                    ? 'btn-3d-amber-active text-amber-200'
                    : pendingComplaintsCount > 0
                    ? 'text-rose-300 border-rose-500/60 bg-rose-500/15'
                    : 'text-amber-200/80 hover:text-amber-300'
                )}
                title="صندوق الشكاوى والدعم الفني"
              >
                <Headphones className="w-4 h-4" />
              </Link>
            )}

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-8 h-8 rounded-lg text-amber-200/80 hover:text-amber-300 btn-3d-neon btn-3d-amber flex items-center justify-center shrink-0"
              title="بحث شامل"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* الصف الثاني: شريط التبويبات الأكاديمية الـ 6 */}
        <nav className="max-w-7xl mx-auto w-full px-3 sm:px-5 py-1.5 border-t border-amber-500/20 flex flex-nowrap items-center justify-between gap-2 overflow-hidden">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active =
              item.to === '/academic'
                ? location.pathname === '/academic' ||
                  location.pathname === '/academic/courses' ||
                  location.pathname.includes('/chapters') ||
                  location.pathname.includes('/details')
                : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex-1 min-w-0 h-8 px-2.5 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold btn-3d-neon btn-3d-amber transition-all whitespace-nowrap',
                  active
                    ? 'btn-3d-amber-active text-amber-200'
                    : 'text-amber-100/80 hover:text-amber-200'
                )}
              >
                <Icon className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>
      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </>
  );
}
```

---

## 4. الكود الكامل لملف `src/components/MainLayout.tsx`
```tsx
// File: src/components/MainLayout.tsx
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MainNav from './MainNav';
import UnifiedProjectFooter from './layout/UnifiedProjectFooter';
import { securityHardening } from '@/lib/securityHardening';

export default function MainLayout() {
  useEffect(() => {
    securityHardening();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <MainNav />
      <main className="py-8 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1" role="main">
        <Outlet />
      </main>
      <UnifiedProjectFooter />
    </div>
  );
}
```

---

## 5. الكود الكامل لملف `src/components/AcademicLayout.tsx`
```tsx
// File: src/components/AcademicLayout.tsx
import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { securityHardening } from '../lib/securityHardening';
import '../styles/PlatformLayout.css';
import AcademicNav from './AcademicNav';
import UnifiedProjectFooter from './layout/UnifiedProjectFooter';

export default function AcademicLayout() {
  const { isGuest, session, isLoading } = useAuth();

  useEffect(() => {
    securityHardening({ strictRedirect: false, showVisualBanner: true });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-400 font-bold">
        جارٍ التحميل...
      </div>
    );
  }

  if (isGuest || !session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950">
      <AcademicNav />
      <main className="py-8 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">
        <Outlet />
      </main>
      <UnifiedProjectFooter />
    </div>
  );
}
```

---

## 6. الكود الكامل لملف `src/components/AdminLayout.tsx`
```tsx
// File: src/components/AdminLayout.tsx
import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Shield, UserCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { securityHardening } from '@/lib/securityHardening';
import AdminNav from './AdminNav';
import UnifiedProjectFooter from './layout/UnifiedProjectFooter';

export default function AdminLayout() {
  const { isGuest, session, isLoading } = useAuth();

  useEffect(() => {
    securityHardening();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-blue-300 font-bold text-sm">جارٍ تحميل لوحة الإدارة...</p>
        </div>
      </div>
    );
  }

  if (isGuest || !session) {
    return <Navigate to="/welcome" replace />;
  }

  if (session.role !== 'admin') {
    return <Navigate to="/main" replace />;
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(to bottom, #020617 0%, rgba(23,37,84,0.25) 50%, #020617 100%)',
      }}
    >
      <AdminNav />
      <main className="flex-1 py-8 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full" role="main">
        <div className="mb-6 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-black text-blue-200">لوحة إدارة مِرْصَاد</h1>
            <p className="text-xs text-slate-500">الإدارة المركزية للمنصة الأكاديمية</p>
          </div>
          <div className="mr-auto flex items-center gap-2 text-xs text-slate-400">
            <UserCircle className="w-4 h-4 text-blue-400" />
            <span>{session.displayName || session.username}</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold text-[10px]">
              مشرف
            </span>
          </div>
        </div>
        <Outlet />
      </main>
      <UnifiedProjectFooter />
    </div>
  );
}
```

---

## 7. الكود الكامل لملف `src/lib/soundEngine.ts` (إيقاف النظام الصوتي بالكامل)
```ts
// File: src/lib/soundEngine.ts
class SilentSoundEngine {
  private muted: boolean = true;
  public playClick(): void {}
  public playHover(): void {}
  public playPageFlip(): void {}
  public playSuccess(): void {}
  public playError(): void {}
  public playUnlock(): void {}
  public playPulse(): void {}
  public playTransition(): void {}
  public toggleMute(): boolean {
    this.muted = true;
    return true;
  }
  public isMuted(): boolean {
    return true;
  }
}
export const sound = new SilentSoundEngine();
export default sound;
```

---

## 8. قواعد تحسين الخطوط العربية والتباعد وتظليل الفقرات (تضاف في نهاية `src/index.css`)
```css
/* ═══════════════════════════════════════════════════════════════════
   TYPOGRAPHY & RTL SPACING REFINEMENT FOR ACADEMIC CLARITY
   ═══════════════════════════════════════════════════════════════════ */
[dir="rtl"] {
  font-family: 'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif;
  letter-spacing: 0 !important;
  line-height: 1.8;
}

[dir="rtl"] h1,
[dir="rtl"] h2,
[dir="rtl"] h3,
[dir="rtl"] h4 {
  letter-spacing: 0 !important;
  line-height: 1.45;
}

[dir="rtl"] p,
[dir="rtl"] li {
  line-height: 1.85;
  word-spacing: 0.5px;
}

@keyframes sectionPulseHighlight {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    background-color: rgba(16, 185, 129, 0.22);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(16, 185, 129, 0);
    background-color: rgba(245, 158, 11, 0.18);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
    background-color: transparent;
  }
}

.chapter-section-highlight {
  animation: sectionPulseHighlight 3.2s ease-in-out 2;
  border-radius: 1rem;
  padding: 0.5rem 0.75rem;
  border-right: 4px solid #10b981 !important;
}
```
