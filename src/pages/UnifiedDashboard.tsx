// File: src/pages/UnifiedDashboard.tsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  GraduationCap,
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Award,
  Users,
  Terminal,
  Cpu,
  Lock,
  ArrowLeft,
  FileCheck,
  Settings as SettingsIcon,
  LogOut,
  Landmark,
  FlaskConical,
  Globe,
  CheckCircle2,
  Layers,
  Scale,
  X,
  BookMarked,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { COURSES } from '@/data/courses';
import { getCompletedChapters } from '@/lib/progress';
import { securityHardening } from '@/lib/securityHardening';
import ProjectIntroVideo from '@/components/ui/ProjectIntroVideo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import DateDisplay from '@/components/ui/DateDisplay';
import PrayerTimesWidget from '@/components/ui/PrayerTimesWidget';
import Sources from '@/pages/main/Sources';
import Team from '@/pages/main/Team';
import Legal from '@/pages/main/Legal';
import UnifiedProjectFooter from '@/components/layout/UnifiedProjectFooter';

type FloatingReferenceTab = 'sources' | 'team' | 'legal';

export const PROJECT_ACADEMIC_METADATA = {
  projectName: 'مشروع مِرْصَاد التشفير الأكاديمي التدريبي للعلوم التشفيرية والأمن السيبراني',
  courseName: 'التشفير المتقدم (ISE243)',
  major: 'دبلوم أمن المعلومات',
  section: 'طلاب شعبة (002م)',
  academicYear: '(2026-2027)',
  university: 'جامعة الأمير مقرن بن عبدالعزيز',
  nature: 'مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة (وليس منصة حكومية أو تجارية رسمية)',
};

export default function UnifiedDashboard() {
  const navigate = useNavigate();
  const { session, logout } = useAuth();
  const [floatingTab, setFloatingTab] = useState<FloatingReferenceTab | null>(null);

  useEffect(() => {
    securityHardening();
  }, []);

  const totalChaptersCount = COURSES.reduce((acc, c) => acc + (c.chaptersCount || 0), 0);
  const completedCount = getCompletedChapters(session?.username || 'student').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans" dir="rtl">
      {/* الشريط العلوي المستقل لبوابة المشروع التدريبي الأكاديمي */}
      <header className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-xl border-b border-emerald-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 py-2 flex flex-wrap md:flex-nowrap items-center justify-between gap-2">
          {/* الهوية البصرية للمشروع التدريبي */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 border border-emerald-500/40 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.25)] shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}assets/mirsad-emblem-logo.png`}
                alt="شعار مرصاد التشفير"
                className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(6,182,212,0.8)]"
              />
            </div>
            <div className="flex items-center whitespace-nowrap">
              <span className="text-xs sm:text-sm md:text-base font-black tracking-tight text-white">
                مِرْصَاد التشفير
              </span>
            </div>
          </div>

          {/* التاريخ ومواقيت الصلاة */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-1.5 shrink-0">
            <DateDisplay compact />
            <PrayerTimesWidget compact />
          </div>

          {/* بيانات الجلسة وأدوات الحساب */}
          <div className="flex items-center justify-end gap-1.5 shrink-0">
            {session && (
              <div className="hidden lg:flex items-center gap-1.5 h-8 px-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-sans shrink-0 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-bold text-slate-100 max-w-[120px] truncate">
                  {session.fullName || session.displayName || session.username}
                </span>
                <span className="text-slate-600 shrink-0" aria-hidden="true">·</span>
                <span className="text-[10px] text-emerald-400 font-bold shrink-0">
                  {session.role === 'admin' ? 'مشرف' : 'طالب'}
                </span>
              </div>
            )}

            {/* روابط الانتقال السريع للمنصة الأساسية والأكاديمية كأيقونات مربعة */}
            <Link
              to="/main"
              title="المنصة الأساسية"
              aria-label="المنصة الأساسية"
              className="w-8 h-8 rounded-lg text-emerald-300 hover:text-emerald-200 btn-3d-neon flex items-center justify-center shrink-0"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            </Link>

            <Link
              to="/academic"
              title="المنصة الأكاديمية"
              aria-label="المنصة الأكاديمية"
              className="w-8 h-8 rounded-lg text-amber-300 hover:text-amber-200 btn-3d-neon btn-3d-amber flex items-center justify-center shrink-0"
            >
              <GraduationCap className="w-4 h-4 text-amber-300" />
            </Link>

            <div className="flex items-center h-8 shrink-0">
              <ThemeToggle />
            </div>

            <Link
              to={session?.role === 'admin' ? '/admin/settings' : '/settings'}
              title="الإعدادات وإدارة الحساب"
              aria-label="إعدادات الحساب"
              className="w-8 h-8 rounded-lg text-slate-300 hover:text-amber-300 btn-3d-neon btn-3d-amber flex items-center justify-center shrink-0"
            >
              <SettingsIcon className="w-4 h-4" />
            </Link>

            {session?.role === 'admin' && (
              <Link
                to="/admin"
                title="لوحة إدارة المشروع"
                aria-label="لوحة إدارة المشروع"
                className="w-8 h-8 rounded-lg text-blue-300 hover:text-blue-200 btn-3d-neon flex items-center justify-center shrink-0"
              >
                <Layers className="w-4 h-4 text-blue-400" />
              </Link>
            )}

            {session && (
              <button
                type="button"
                onClick={logout}
                title="تسجيل الخروج الآمن"
                aria-label="تسجيل الخروج الآمن"
                className="w-8 h-8 rounded-lg text-slate-300 hover:text-rose-300 btn-3d-neon flex items-center justify-center cursor-pointer shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي لبوابة المشروع الأكاديمي التدريبي */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-24 md:pb-28 space-y-10 md:space-y-12">
        {/* القسم الأول: البطاقة التعريفية الرسمية للمشروع الأكاديمي التدريبي */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative glass-panel card-3d-neon rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-slate-900/95 via-slate-950 to-emerald-950/35 border border-emerald-500/35 shadow-2xl overflow-hidden"
        >
          <div className="max-w-full mx-auto text-center space-y-5 relative z-10">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/35 text-emerald-300 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر · مادة التشفير المتقدم (ISE243) · دبلوم أمن المعلومات · طلاب شعبة (002م) · (2026-2027)
              </span>
            </div>

            <h1 className="text-[13px] sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-black tracking-tight text-white leading-tight whitespace-nowrap">
              مشروع مِرْصَاد التشفير الأكاديمي التدريبي للعلوم التشفيرية والأمن السيبراني
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
              بيئة أكاديمية وتدريبية تطبيقية <strong className="text-amber-300 font-bold">(وليست منصة حكومية أو رسمية)</strong>، أعدّها
              <strong className="text-emerald-300 font-bold"> طلاب شعبة (002م) بدبلوم أمن المعلومات </strong>
              لمقرر <strong className="text-cyan-300 font-bold">التشفير المتقدم (ISE243)</strong> للعام الأكاديمي
              <strong className="text-white font-bold"> (2026–2027) </strong>
              بجامعة الأمير مقرن بن عبدالعزيز؛ تتكامل فيها
              <strong className="text-emerald-300 font-bold"> المختبرات التشفيرية والمرصد التحليلي </strong>
              مع <strong className="text-amber-300 font-bold">المقررات الأكاديمية الـ {COURSES.length}</strong>، وفق بيانات ومعايير علمية وتنظيمية
              <strong className="text-emerald-300 font-bold"> حقيقية وموثقة بالمصادر المعتمدة </strong>
              <span className="font-mono text-xs text-slate-400" dir="ltr">(NCA · NIST FIPS · ITU)</span>.
            </p>

            {/* بطاقة الهوية الأكاديمية للمشروع التدريبي (تنسيق متناسق ومستقر بدون سحب جانبي) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 pt-2 max-w-5xl mx-auto text-right w-full">
              <div
                tabIndex={0}
                className="card-3d-neon rounded-2xl bg-slate-900/90 border border-emerald-500/35 p-3 sm:p-3.5 flex flex-col justify-between gap-1 overflow-hidden cursor-pointer transition-all duration-300 hover:border-emerald-400/75 active:scale-[0.97] active:ring-2 active:ring-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
              >
                <span className="text-[10px] text-slate-400 block whitespace-nowrap truncate">المادة المقدمة لها</span>
                <span className="text-xs font-extrabold text-emerald-300 block whitespace-nowrap truncate">التشفير المتقدم (ISE243)</span>
              </div>
              <div
                tabIndex={0}
                className="card-3d-neon card-3d-cyan rounded-2xl bg-slate-900/90 border border-cyan-500/35 p-3 sm:p-3.5 flex flex-col justify-between gap-1 overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/75 active:scale-[0.97] active:ring-2 active:ring-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
              >
                <span className="text-[10px] text-slate-400 block whitespace-nowrap truncate">التخصص الأكاديمي</span>
                <span className="text-xs font-extrabold text-cyan-300 block whitespace-nowrap truncate">دبلوم أمن المعلومات</span>
              </div>
              <div
                tabIndex={0}
                className="card-3d-neon rounded-2xl bg-slate-900/90 border border-amber-500/35 p-3 sm:p-3.5 flex flex-col justify-between gap-1 overflow-hidden cursor-pointer transition-all duration-300 hover:border-amber-400/75 active:scale-[0.97] active:ring-2 active:ring-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
              >
                <span className="text-[10px] text-slate-400 block whitespace-nowrap truncate">الشعبة الطلابية</span>
                <span className="text-xs font-extrabold text-amber-300 block whitespace-nowrap truncate">طلاب شعبة (002م)</span>
              </div>
              <div
                tabIndex={0}
                className="card-3d-neon card-3d-purple rounded-2xl bg-slate-900/90 border border-purple-500/35 p-3 sm:p-3.5 flex flex-col justify-between gap-1 overflow-hidden cursor-pointer transition-all duration-300 hover:border-purple-400/75 active:scale-[0.97] active:ring-2 active:ring-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
              >
                <span className="text-[10px] text-slate-400 block whitespace-nowrap truncate">السنة الأكاديمية</span>
                <span className="text-xs font-extrabold text-purple-300 font-mono block whitespace-nowrap truncate">2026-2027</span>
              </div>
              <div
                tabIndex={0}
                className="card-3d-neon rounded-2xl bg-slate-900/90 border border-blue-500/35 p-3 sm:p-3.5 flex flex-col justify-between gap-1 overflow-hidden cursor-pointer transition-all duration-300 hover:border-blue-400/75 active:scale-[0.97] active:ring-2 active:ring-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
              >
                <span className="text-[10px] text-slate-400 block whitespace-nowrap truncate">الجهة الجامعية</span>
                <span className="text-xs font-extrabold text-blue-300 block whitespace-nowrap truncate">جامعة الأمير مقرن</span>
              </div>
              <div
                tabIndex={0}
                className="card-3d-neon rounded-2xl bg-slate-900/90 border border-emerald-500/35 p-3 sm:p-3.5 flex flex-col justify-between gap-1 overflow-hidden cursor-pointer transition-all duration-300 hover:border-emerald-400/75 active:scale-[0.97] active:ring-2 active:ring-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
              >
                <span className="text-[10px] text-slate-400 block whitespace-nowrap truncate">طبيعة المشروع</span>
                <span className="text-xs font-extrabold text-emerald-300 block whitespace-nowrap truncate">مشروع تدريبي موثق</span>
              </div>
            </div>
          </div>

          {/* المؤشرات الرقمية الأساسية لنبذة المشروع (تنسيق متناسق ومستقر بدون سحب جانبي) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4 mt-6 md:mt-8 relative z-10 font-sans w-full">
            <div
              tabIndex={0}
              onClick={() => navigate('/academic')}
              className="card-3d-neon p-4 sm:p-5 rounded-2xl bg-slate-900/85 border border-emerald-500/30 text-center space-y-2 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:border-emerald-400/75 active:scale-[0.98] active:ring-2 active:ring-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
            >
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold whitespace-nowrap truncate">
                <BookOpen className="w-4 h-4 shrink-0" />
                <span className="truncate">المحتوى الأكاديمي والتدريبي</span>
              </div>
              <div className="text-base sm:text-lg md:text-xl font-black text-white leading-snug whitespace-nowrap truncate">
                {COURSES.length} مقررات · {totalChaptersCount} فصلاً
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed whitespace-nowrap truncate">
                مفعّلة بالكامل مع كتاب تفاعلي ثلاثي الأبعاد
              </p>
            </div>

            <div
              tabIndex={0}
              onClick={() => navigate('/aes-lab')}
              className="card-3d-neon card-3d-cyan p-4 sm:p-5 rounded-2xl bg-slate-900/85 border border-cyan-500/30 text-center space-y-2 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/75 active:scale-[0.98] active:ring-2 active:ring-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            >
              <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-bold whitespace-nowrap truncate">
                <Cpu className="w-4 h-4 shrink-0" />
                <span className="truncate">المختبرات والمحاكاة العملية</span>
              </div>
              <div className="text-base sm:text-lg md:text-xl font-black text-white leading-snug whitespace-nowrap truncate">
                +35 أداة محاكاة تشفيرية
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed whitespace-nowrap truncate">
                حقول غالوا · AES-256 · ECC · ZKP · PQC
              </p>
            </div>

            <div
              tabIndex={0}
              onClick={() => setFloatingTab('sources')}
              className="card-3d-neon p-4 sm:p-5 rounded-2xl bg-slate-900/85 border border-amber-500/30 text-center space-y-2 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:border-amber-400/75 active:scale-[0.98] active:ring-2 active:ring-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
            >
              <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-bold whitespace-nowrap truncate">
                <FileCheck className="w-4 h-4 shrink-0" />
                <span className="truncate">بيانات حقيقية موثقة بالمصادر</span>
              </div>
              <div className="text-base sm:text-lg md:text-xl font-black text-white leading-snug whitespace-nowrap truncate">
                100% مراجع علمية ورسمية
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed whitespace-nowrap truncate">
                NCA ECC-2 · NCS-1:2020 · NIST FIPS · ITU
              </p>
            </div>

            <div
              tabIndex={0}
              onClick={() => navigate('/academic/certificate')}
              className="card-3d-neon card-3d-purple p-4 sm:p-5 rounded-2xl bg-slate-900/85 border border-purple-500/30 text-center space-y-2 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:border-purple-400/75 active:scale-[0.98] active:ring-2 active:ring-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
            >
              <div className="flex items-center justify-center gap-1.5 text-purple-400 text-xs font-bold whitespace-nowrap truncate">
                <Award className="w-4 h-4 shrink-0" />
                <span className="truncate">إنجازك التدريبي الحالي</span>
              </div>
              <div className="text-base sm:text-lg md:text-xl font-black text-white leading-snug whitespace-nowrap truncate">
                {completedCount} من {totalChaptersCount} فصلاً منجزاً
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed whitespace-nowrap truncate">
                شهادة إتمام تدريبية أكاديمية ببصمة SHA-256
              </p>
            </div>
          </div>
        </motion.section>

        {/* القسم الثاني: بوابات الدخول الرئيسية للمشروع التدريبي */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white">
                أقسام وبوابات المشروع التدريبي الأكاديمي
              </h2>
              <p className="text-xs md:text-sm text-slate-400">
                اختر القسم المطلوب للانتقال المباشر إلى بيئة المرصد التحليلي والمختبرات التشفيرية أو بيئة المقررات الأكاديمية التفاعلية
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* القسم الأول: المرصد والمختبرات التشفيرية التدريبية */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="glass-panel card-3d-neon rounded-3xl p-6 md:p-8 bg-gradient-to-br from-slate-900/95 via-slate-950 to-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400/75 transition-all shadow-xl flex flex-col justify-between gap-6 group"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="icon-glass-3d w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shrink-0">
                      <LayoutDashboard className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-emerald-400 block">
                        القسم التطبيقي الأول · ISE243 · شعبة (002م)
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
                        بوابة المرصد التحليلي والمختبرات التشفيرية التدريبية
                      </h3>
                    </div>
                  </div>
                  <Globe className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  بيئة تدريبية تحليلية تستعرض البيانات الحقيقية الموثقة بالمصادر لضوابط الهيئة الوطنية للأمن السيبراني
                  (NCA ECC-2:2024 / NCS-1:2020)، ومؤشر الاتحاد الدولي للاتصالات (ITU GCI 2024)، ومحاكي الجاهزية لما بعد الكم (NIST FIPS 203/204/205)، والمختبرات الرياضية الحية.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { label: 'المرصد التحليلي الموثق بالمصادر', icon: LayoutDashboard, to: '/main' },
                    { label: 'مختبر التشفير المتقدم AES & GF(2^8)', icon: Terminal, to: '/aes-lab' },
                    { label: 'مختبر المعرفة الصفرية ZKP & ECC', icon: FlaskConical, to: '/zkp-lab' },
                    { label: 'الريادة السعودية والمصادر الموثقة', icon: Landmark, to: '/saudi' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.to}
                        type="button"
                        onClick={() => navigate(item.to)}
                        className="btn-3d-neon p-3.5 rounded-2xl bg-slate-900/90 hover:bg-emerald-950/50 border border-emerald-500/30 hover:border-emerald-400/75 text-right flex items-center gap-2.5 transition-all duration-300 cursor-pointer active:scale-[0.97] active:ring-2 active:ring-emerald-400/60"
                      >
                        <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs font-semibold text-slate-200 truncate">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  بيانات حقيقية موثقة بالمصادر · مشروع تدريبي
                </span>
                <button
                  type="button"
                  onClick={() => navigate('/main')}
                  className="btn-3d-neon px-6 py-3 rounded-2xl !bg-gradient-to-b !from-emerald-400 !to-emerald-600 hover:!from-emerald-300 hover:!to-emerald-500 !border-emerald-300/80 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_8px_20px_-4px_rgba(16,185,129,0.45)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.75),0_12px_26px_-4px_rgba(16,185,129,0.6)] active:scale-95 active:ring-2 active:ring-white/80 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>دخول المرصد والمختبرات التدريبية</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* القسم الثاني: المنصة الأكاديمية والمقررات */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.14 }}
              className="glass-panel card-3d-neon rounded-3xl p-6 md:p-8 bg-gradient-to-br from-slate-900/95 via-slate-950 to-amber-950/35 border border-amber-500/40 hover:border-amber-400/75 transition-all shadow-xl flex flex-col justify-between gap-6 group"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="icon-glass-3d w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shrink-0">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-amber-400 block">
                        القسم الأكاديمي الثاني · دبلوم أمن المعلومات · 2026-2027
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                        بوابة البيئة الأكاديمية التفاعلية والمقررات
                      </h3>
                    </div>
                  </div>
                  <BookOpen className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  البيئة التعليمية والتدريبية التفاعلية لـ {COURSES.length} مقررات أكاديمية ({totalChaptersCount} فصلاً مفتوحاً بالكامل)،
                  مزودة بالكتب التفاعلية ثلاثية الأبعاد (3D Open Textbooks)، المختبر البرمجي العائم، ومقرر اللغة الإنجليزية التفاعلي المستقل.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { label: `المقررات الدراسية الـ ${COURSES.length} (${totalChaptersCount} فصلاً)`, icon: BookOpen, to: '/academic' },
                    { label: 'الشرح التفاعلي والكتاب 3D', icon: Sparkles, to: '/academic/interactive-lesson' },
                    { label: 'كتاب اللغة الإنجليزية 3D المستقل', icon: BookMarked, to: '/academic/english' },
                    { label: 'الاختبار النهائي والشهادة التدريبية', icon: Award, to: '/academic/certificate' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.to}
                        type="button"
                        onClick={() => navigate(item.to)}
                        className="btn-3d-neon btn-3d-amber p-3.5 rounded-2xl bg-slate-900/90 hover:bg-amber-950/40 border border-amber-500/30 hover:border-amber-400/75 text-right flex items-center gap-2.5 transition-all duration-300 cursor-pointer active:scale-[0.97] active:ring-2 active:ring-amber-400/60"
                      >
                        <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-xs font-semibold text-slate-200 truncate">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  جميع الفصول الـ {totalChaptersCount} مفتوحة للتدريب الأكاديمي المباشر
                </span>
                <button
                  type="button"
                  onClick={() => navigate('/academic')}
                  className="btn-3d-neon px-6 py-3 rounded-2xl !bg-gradient-to-b !from-amber-400 !to-amber-600 hover:!from-amber-300 hover:!to-amber-500 !border-amber-300/80 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_8px_20px_-4px_rgba(245,158,11,0.45)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.75),0_12px_26px_-4px_rgba(245,158,11,0.6)] active:scale-95 active:ring-2 active:ring-white/80 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>دخول البيئة الأكاديمية للمقررات</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* القسم الثالث: العرض التقديمي التفاعلي الشامل لنبذة المشروع */}
        <section className="space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl md:text-2xl font-black text-white">
              العرض التقديمي التفاعلي للمشروع الأكاديمي (شعبة 002م · 2026-2027)
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              جولة بصرية تفاعلية تشرح منهجية المشروع التدريبي المقدم لمادة التشفير المتقدم (ISE243) في تخصص دبلوم أمن المعلومات — طلاب شعبة (002م) للسنة الأكاديمية (2026-2027)
            </p>
          </div>
          <ProjectIntroVideo />
        </section>

        {/* القسم الرابع: المرتكزات العلمية والأهداف التدريبية للمشروع */}
        <section className="space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xl md:text-2xl font-black text-white">
              المرتكزات العلمية وتوثيق المصادر الحقيقية في المشروع
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              الركائز الأكاديمية التي بُني عليها مشروع طلاب شعبة (002م) لربط النظرية الرياضية بالمعايير المعتمدة بمصادرها الحقيقية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              tabIndex={0}
              className="glass-panel card-3d-neon p-6 sm:p-7 rounded-3xl bg-slate-900/85 border border-emerald-500/35 space-y-3.5 cursor-pointer transition-all duration-300 hover:border-emerald-400/75 active:scale-[0.98] active:ring-2 active:ring-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
            >
              <div className="icon-glass-3d w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                01. مشروع أكاديمي تدريبي حقيقي
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                أُنجز هذا النظام كمشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — طلاب شعبة (002م) للسنة الأكاديمية (2026-2027) في جامعة الأمير مقرن بن عبدالعزيز (وليس منصة حكومية أو تجارية رسمية).
              </p>
            </div>

            <div
              tabIndex={0}
              className="glass-panel card-3d-neon p-6 sm:p-7 rounded-3xl bg-slate-900/85 border border-amber-500/35 space-y-3.5 cursor-pointer transition-all duration-300 hover:border-amber-400/75 active:scale-[0.98] active:ring-2 active:ring-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
            >
              <div className="icon-glass-3d w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                02. بيانات ومعايير حقيقية موثقة بالمصادر
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                جميع البيانات والمعادلات والضوابط في المشروع حقيقية وموثقة من مصادرها الرسمية والأكاديمية: الهيئة الوطنية للأمن السيبراني (NCA ECC-2:2024 وNCS-1:2020)، الاتحاد الدولي للاتصالات (ITU GCI 2024)، ومعايير (NIST FIPS 203/204/205).
              </p>
            </div>

            <div
              tabIndex={0}
              className="glass-panel card-3d-neon card-3d-cyan p-6 sm:p-7 rounded-3xl bg-slate-900/85 border border-cyan-500/35 space-y-3.5 cursor-pointer transition-all duration-300 hover:border-cyan-400/75 active:scale-[0.98] active:ring-2 active:ring-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            >
              <div className="icon-glass-3d icon-glass-3d-cyan w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                03. محاكاة خوارزمية وتطبيقات عملية
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                تنفيذ برمجي فعلي لحقول غالوا GF(2^8)، وخوارزمية AES-256-GCM، والمنحنيات الإهليلجية ECC، وبراهين المعرفة الصفرية ZKP، والتشفير المتجانس Paillier، والشبيكات الكمومية ML-KEM.
              </p>
            </div>
          </div>
        </section>

        {/* القسم الخامس: الإشراف الأكاديمي والروابط المرجعية للمشروع */}
        <section className="glass-panel card-3d-neon p-6 sm:p-7 lg:px-8 lg:py-7 mb-4 rounded-3xl bg-slate-900/90 border border-emerald-500/35 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          <div className="space-y-2.5 text-center lg:text-right flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              توثيق المصادر الحقيقية وفريق طلاب شعبة (002م) والبيان الأكاديمي
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-300/90 leading-relaxed max-w-3xl mx-auto lg:mx-0">
              مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة (وليس منصة حكومية أو تجارية رسمية) مقدم لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — طلاب شعبة (002م) — السنة الأكاديمية (2026-2027) — جامعة الأمير مقرن بن عبدالعزيز.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-3.5 shrink-0 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800/70">
            <button
              type="button"
              onClick={() => setFloatingTab('sources')}
              className={`btn-3d-neon btn-3d-amber px-4.5 py-2.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/45 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap cursor-pointer active:scale-95 ${
                floatingTab === 'sources' ? 'btn-3d-amber-active ring-2 ring-amber-400/75' : ''
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <span>المراجع والمصادر الموثقة</span>
            </button>
            <button
              type="button"
              onClick={() => setFloatingTab('team')}
              className={`btn-3d-neon px-4.5 py-2.5 rounded-2xl bg-slate-800/90 hover:bg-emerald-950/50 text-slate-100 border border-emerald-500/35 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap cursor-pointer active:scale-95 ${
                floatingTab === 'team' ? 'btn-3d-neon-active ring-2 ring-emerald-400/75' : ''
              }`}
            >
              <Users className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>فريق طلاب شعبة (002م)</span>
            </button>
            <button
              type="button"
              onClick={() => setFloatingTab('legal')}
              className={`btn-3d-neon px-4.5 py-2.5 rounded-2xl bg-slate-800/90 hover:bg-cyan-950/50 text-slate-100 border border-cyan-500/35 hover:border-cyan-400/75 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap cursor-pointer active:scale-95 ${
                floatingTab === 'legal' ? 'ring-2 ring-cyan-400/75 border-cyan-400 bg-cyan-500/25 text-cyan-200' : ''
              }`}
            >
              <Scale className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>بيان المشروع الأكاديمي</span>
            </button>
          </div>
        </section>
      </main>

      {/* التبويب العائم لعرض المصادر وفريق شعبة 002م والبيان الأكاديمي */}
      <AnimatePresence>
        {floatingTab && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" dir="rtl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFloatingTab(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative z-[101] w-full max-w-5xl max-h-[88vh] flex flex-col rounded-3xl bg-slate-950 border border-amber-500/35 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-900/95 border-b border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFloatingTab('sources')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      floatingTab === 'sources'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>المراجع والمصادر الموثقة</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFloatingTab('team')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      floatingTab === 'team'
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>فريق طلاب شعبة (002م)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFloatingTab('legal')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      floatingTab === 'legal'
                        ? 'bg-cyan-500 text-slate-950 shadow'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>بيان المشروع الأكاديمي</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setFloatingTab(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>إغلاق النافذة</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {floatingTab === 'sources' && <Sources />}
                {floatingTab === 'team' && <Team />}
                {floatingTab === 'legal' && <Legal />}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* تذييل البوابة الرئيسية للمشروع الأكاديمي التدريبي (موحد) */}
      <UnifiedProjectFooter />
    </div>
  );
}

export { UnifiedDashboard };
