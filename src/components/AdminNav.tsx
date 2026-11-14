import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Shield,
  Award,
  ArrowLeft,
  Search,
  Headphones,
  Settings,
  Home,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useSupport } from '@/contexts/SupportContext';
import GlobalSearch from './ui/GlobalSearch';
import ThemeToggle from './ui/ThemeToggle';

const ADMIN_NAV = [
  { to: '/admin', label: 'نظرة عامة', icon: LayoutDashboard, exact: true },
  { to: '/admin/users', label: 'المستخدمون', icon: Users, exact: false },
  { to: '/admin/chapters', label: 'الفصول', icon: BookOpen, exact: false },
  { to: '/admin/certificates', label: 'الشهادات', icon: Award, exact: false },
  { to: '/admin/audit', label: 'سجل التدقيق', icon: Shield, exact: false },
  { to: '/admin/security', label: 'التدقيق الأمني', icon: Shield, exact: false },
  { to: '/admin/settings', label: 'الإعدادات', icon: Settings, exact: false },
];

const USER_NAV = [
  { to: '/', label: 'بوابة المشروع', icon: Home, exact: true },
  { to: '/main', label: 'المنصة الأساسية', icon: LayoutDashboard, exact: false },
  { to: '/academic', label: 'المنصة الأكاديمية', icon: GraduationCap, exact: false },
  { to: '/settings', label: 'الإعدادات وإدارة الحساب', icon: Settings, exact: false },
];

export default function AdminNav() {
  const location = useLocation();
  const { session, isGuest } = useAuth();
  const { tickets } = useSupport();
  const [searchOpen, setSearchOpen] = useState(false);

  const isAdmin = session?.role === 'admin';
  const navItems = isAdmin ? ADMIN_NAV : USER_NAV;
  const pendingComplaintsCount = isAdmin ? tickets.filter((t) => t.status === 'pending').length : 0;

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-blue-500/30 shadow-lg" role="banner">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 md:gap-3 flex-nowrap w-full overflow-hidden">
          {/* Zone 1: Brand + Back */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/"
              className="text-xs sm:text-sm text-blue-300/80 hover:text-blue-200 transition-colors flex items-center gap-1 font-medium p-1 sm:p-1.5 rounded-lg hover:bg-slate-900"
              title="العودة لبوابة المشروع"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden md:inline">بوابة المشروع</span>
            </Link>
            <div className="w-px h-5 bg-slate-800 shrink-0" />
            <Link
              to={isAdmin ? '/admin' : '/settings'}
              className="text-sm sm:text-base font-black tracking-tight whitespace-nowrap flex items-center gap-1.5 group shrink-0"
              aria-label={isAdmin ? 'لوحة تحكم المسؤول' : 'إعدادات الحساب'}
            >
              <div className="p-1 sm:p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 group-hover:shadow-[0_0_12px_#3b82f6] transition-all duration-300">
                {isAdmin ? (
                  <Shield className="w-4 h-4 text-blue-400" />
                ) : (
                  <Settings className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <span className="font-bold text-blue-200">
                {isAdmin ? 'إدارة مِرْصَاد' : 'حسابي وإعداداتي'}
              </span>
            </Link>
            {session && (
              <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider uppercase border bg-blue-500/15 text-blue-300 border-blue-500/40 shrink-0">
                {isAdmin ? 'ADMIN' : 'USER'}
              </span>
            )}
          </div>

          {/* Zone 2: All Tabs in Single Row */}
          <nav
            className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 px-1 flex-nowrap shrink"
            aria-label="القوائم الفرعية"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                item.to === '/settings' || item.to === '/admin/settings'
                  ? location.pathname === '/settings' || location.pathname.startsWith('/admin/settings')
                  : item.exact
                  ? location.pathname === item.to
                  : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'py-1 px-2 sm:px-2.5 rounded-lg whitespace-nowrap shrink-0 flex items-center gap-1 text-[11px] sm:text-xs font-bold transition-all duration-200 border',
                    active
                      ? 'bg-blue-500/20 text-blue-200 border-blue-400/60 shadow-[0_0_10px_rgba(59,130,246,0.3)] font-black'
                      : 'bg-slate-900/60 text-slate-300 hover:text-white border-blue-500/15 hover:border-blue-500/40'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className={cn('w-3.5 h-3.5 shrink-0', active ? 'text-blue-300' : 'text-blue-400/70')} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Action Buttons in Single Row */}
          <div className="flex items-center gap-1.5 shrink-0">
            {isGuest && (
              <span className="text-[10px] px-2 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/30 flex items-center gap-1 font-bold shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>زائر</span>
              </span>
            )}

            <Link
              to="/contact"
              className={cn(
                'relative p-1.5 rounded-lg border transition-all duration-200 flex items-center justify-center shrink-0',
                location.pathname === '/contact'
                  ? 'bg-rose-500/20 text-rose-200 border-rose-500/60'
                  : pendingComplaintsCount > 0
                  ? 'bg-rose-500/15 text-rose-300 border-rose-500/50'
                  : 'bg-slate-900/80 text-blue-300 hover:text-white border-blue-500/25 hover:border-blue-500/50'
              )}
              title={
                pendingComplaintsCount > 0
                  ? `صندوق الشكاوى والدعم: ${pendingComplaintsCount} رسالة بانتظار الرد`
                  : 'صندوق الشكاوى والدعم الفني'
              }
              aria-label="الشكاوى والدعم الفني"
            >
              <Headphones className="w-3.5 h-3.5" />
              {pendingComplaintsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-0.5 text-[8px] font-black leading-none bg-rose-500 text-white rounded-full flex items-center justify-center border border-slate-950 animate-pulse">
                  {pendingComplaintsCount > 99 ? '99+' : pendingComplaintsCount}
                </span>
              )}
            </Link>

            <ThemeToggle aria-label="تبديل السمة البصرية" />

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-1.5 rounded-lg bg-slate-900/80 border border-blue-500/25 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
              title="بحث شامل"
              aria-label="فتح البحث الشامل"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>
      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </>
  );
}
