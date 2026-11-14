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
  Settings as SettingsIcon,
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

            <Link
              to={session?.role === 'admin' ? '/admin/settings' : '/settings'}
              title="الإعدادات وإدارة الحساب"
              aria-label="الإعدادات وإدارة الحساب"
              className="w-8 h-8 rounded-lg text-amber-200/80 hover:text-amber-300 btn-3d-neon btn-3d-amber flex items-center justify-center shrink-0"
            >
              <SettingsIcon className="w-4 h-4" />
            </Link>

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
