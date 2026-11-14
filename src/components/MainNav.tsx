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
              to={session?.role === 'admin' ? '/admin/settings' : '/settings'}
              className={cn(
                'w-8 h-8 rounded-lg btn-3d-neon btn-3d-amber flex items-center justify-center shrink-0',
                location.pathname.startsWith('/admin/settings') || location.pathname === '/settings'
                  ? 'btn-3d-amber-active text-amber-200'
                  : 'text-slate-300 hover:text-amber-300'
              )}
              title="الإعدادات وإدارة الحساب"
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
