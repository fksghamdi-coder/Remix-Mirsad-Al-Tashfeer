// File: src/pages/academic/AcademicCourses.tsx
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  ShieldCheck,
  Shield,
  Network,
  Bug,
  Search,
  Code,
  Clock,
  BookOpen,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Target,
  BarChart3,
  AlertTriangle,
  Info,
  Play,
} from 'lucide-react';
import { COURSES } from '@/data/courses';
import { useAuth } from '@/contexts/AuthContext';
import { getChaptersByCourse } from '@/lib/chapters';
import { getCompletedChapters } from '@/lib/progress';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Shield,
  Network,
  Bug,
  Search,
  Code,
  Target,
  BarChart3,
  AlertTriangle,
  Lock,
  BookOpen,
};

export default function AcademicCourses() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatIdx, setSelectedStatIdx] = useState<number | null>(null);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string | null>(null);
  const [badgeSelected, setBadgeSelected] = useState<boolean>(false);

  const completedIds = useMemo(
    () => getCompletedChapters(session?.username || 'student'),
    [session?.username]
  );

  const coursesWithProgress = useMemo(() => {
    return COURSES.map((course) => {
      const chapters = getChaptersByCourse(course.slug);
      const count = chapters.length || course.chaptersCount || 10;
      const done = chapters.filter((ch) => completedIds.includes(ch.id)).length;
      const percent = Math.min(100, Math.round((done / Math.max(1, count)) * 100));
      const nextChapter = chapters.find((ch) => !completedIds.includes(ch.id)) || chapters[0];
      return {
        course,
        chaptersCount: count,
        doneCount: done,
        percent,
        nextChapter,
      };
    });
  }, [completedIds]);

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return coursesWithProgress;
    const q = searchQuery.toLowerCase();
    return coursesWithProgress.filter(
      ({ course }) =>
        course.title.toLowerCase().includes(q) ||
        course.titleEn.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q)
    );
  }, [coursesWithProgress, searchQuery]);

  const totalChaptersCount = coursesWithProgress.reduce((acc, c) => acc + c.chaptersCount, 0);
  const totalDoneCount = coursesWithProgress.reduce((acc, c) => acc + c.doneCount, 0);
  const totalHoursCount = COURSES.reduce((acc, c) => acc + (c.totalHours || 0), 0);
  const recommended =
    coursesWithProgress.find((c) => c.doneCount < c.chaptersCount) || coursesWithProgress[0];

  return (
    <div className="space-y-10 pb-12" dir="rtl">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative py-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel card-3d-neon bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs md:text-sm font-bold mb-4">
          <GraduationCap className="w-4 h-4" />
          <span>المنصة الأكاديمية المتكاملة · جميع المقررات الستة والفصول الـ {totalChaptersCount} مفعّلة بالكامل</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black gradient-text-academic tracking-tight mb-3">
          معرض المقررات التخصصية المعتمدة
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          جميع المقررات الستة وفصولها الـ {totalChaptersCount} متاحة بالكامل للدراسة المباشرة بنمطي العرض الأكاديمي والكتاب التفاعلي ثلاثي الأبعاد (3D) دون أي قيود تسلسلية.
        </p>

        {/* Quick Statistics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8">
          <div
            onClick={() => setSelectedStatIdx((prev) => (prev === 0 ? null : 0))}
            className={`glass-panel card-3d-neon p-4 rounded-2xl text-center border transition-all duration-300 cursor-pointer active:scale-95 ${
              selectedStatIdx === 0
                ? 'border-amber-400 ring-2 ring-amber-400/80 bg-amber-950/30 shadow-[0_14px_30px_-8px_rgba(2,6,23,0.9),0_0_22px_rgba(245,158,11,0.3)]'
                : 'border-amber-500/35 hover:border-amber-400/75'
            }`}
          >
            <span className="text-2xl font-black text-amber-400 block font-mono tabular-nums">
              {COURSES.length}
            </span>
            <span className="text-xs text-slate-300 font-bold mt-1 block">مقررات معتمدة</span>
          </div>
          <div
            onClick={() => setSelectedStatIdx((prev) => (prev === 1 ? null : 1))}
            className={`glass-panel card-3d-neon p-4 rounded-2xl text-center border transition-all duration-300 cursor-pointer active:scale-95 ${
              selectedStatIdx === 1
                ? 'border-emerald-400 ring-2 ring-emerald-400/80 bg-emerald-950/30 shadow-[0_14px_30px_-8px_rgba(2,6,23,0.9),0_0_22px_rgba(16,185,129,0.3)]'
                : 'border-emerald-500/35 hover:border-emerald-400/75'
            }`}
          >
            <span className="text-2xl font-black text-emerald-400 block font-mono tabular-nums">
              {totalChaptersCount}
            </span>
            <span className="text-xs text-slate-300 font-bold mt-1 block">فصلاً دراسياً مفتوحاً</span>
          </div>
          <div
            onClick={() => setSelectedStatIdx((prev) => (prev === 2 ? null : 2))}
            className={`glass-panel card-3d-neon p-4 rounded-2xl text-center border transition-all duration-300 cursor-pointer active:scale-95 ${
              selectedStatIdx === 2
                ? 'border-blue-400 ring-2 ring-blue-400/80 bg-blue-950/30 shadow-[0_14px_30px_-8px_rgba(2,6,23,0.9),0_0_22px_rgba(59,130,246,0.3)]'
                : 'border-blue-500/35 hover:border-blue-400/75'
            }`}
          >
            <span className="text-2xl font-black text-blue-400 block font-mono tabular-nums">
              {totalDoneCount} / {totalChaptersCount}
            </span>
            <span className="text-xs text-slate-300 font-bold mt-1 block">إنجازك الحالي</span>
          </div>
          <div
            onClick={() => setSelectedStatIdx((prev) => (prev === 3 ? null : 3))}
            className={`glass-panel card-3d-neon p-4 rounded-2xl text-center border transition-all duration-300 cursor-pointer active:scale-95 ${
              selectedStatIdx === 3
                ? 'border-purple-400 ring-2 ring-purple-400/80 bg-purple-950/30 shadow-[0_14px_30px_-8px_rgba(2,6,23,0.9),0_0_22px_rgba(168,85,247,0.3)]'
                : 'border-purple-500/35 hover:border-purple-400/75'
            }`}
          >
            <span className="text-2xl font-black text-purple-400 block font-mono tabular-nums">
              {totalHoursCount}
            </span>
            <span className="text-xs text-slate-300 font-bold mt-1 block">ساعة تدريب وبحث</span>
          </div>
        </div>
      </motion.div>

      {/* Search & Smart Resume Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-5">
        <div className="flex flex-wrap items-center gap-3">
          <span
            onClick={() => setBadgeSelected((prev) => !prev)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold glass-panel card-3d-neon border flex items-center gap-2 transition-all duration-300 cursor-pointer active:scale-95 ${
              badgeSelected
                ? 'border-emerald-400 ring-2 ring-emerald-400/80 bg-emerald-950/40 text-emerald-200'
                : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:border-emerald-400/75'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>جميع المقررات والفصول مفتوحة ({COURSES.length} مقررات)</span>
          </span>

          {recommended?.nextChapter && (
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/academic/${recommended.course.slug}/chapters/${recommended.nextChapter.id}`
                )
              }
              className="px-4 py-2.5 rounded-xl text-xs font-black btn-3d-neon btn-3d-amber btn-3d-amber-active text-amber-200 hover:text-white flex items-center gap-2 transition-all duration-300 cursor-pointer active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>
                استئناف ذكي: {recommended.course.code} · فصل {recommended.nextChapter.chapter_number}
              </span>
            </button>
          )}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-emerald-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن مقرر أو رمز..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl glass-panel card-3d-neon bg-slate-900/90 border border-emerald-500/35 hover:border-emerald-400/75 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40 text-xs text-slate-100 focus:outline-none transition-all duration-300"
          />
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(({ course, chaptersCount, doneCount, percent }, idx) => {
          const Icon = ICONS[course.icon] || Shield;
          const isCardSelected = selectedCourseSlug === course.slug;

          return (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() =>
                setSelectedCourseSlug((prev) => (prev === course.slug ? null : course.slug))
              }
              className={`glass-panel card-3d-neon rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group cursor-pointer active:scale-[0.99] border ${
                isCardSelected
                  ? 'border-emerald-400 ring-2 ring-emerald-400/80 shadow-[0_18px_40px_-10px_rgba(2,6,23,0.95),0_0_28px_rgba(16,185,129,0.3)]'
                  : 'border-amber-500/40 hover:border-emerald-400/75'
              }`}
            >
              <div>
                {/* Header: Code Badge + Active Status */}
                <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-11 h-11 rounded-2xl icon-glass-3d bg-gradient-to-br ${course.color} flex items-center justify-center text-white shadow-md`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-black text-slate-100 font-mono tracking-wider block">
                        {course.code}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>مفعّل بالكامل</span>
                  </span>
                </div>

                {/* Title & English Subtitle */}
                <h3 className="text-xl font-black text-slate-100 group-hover:text-emerald-300 transition-colors mb-1">
                  {course.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-3">{course.titleEn}</p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {course.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-slate-800/80 mb-4 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{chaptersCount} فصلاً مفتوحاً</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="font-mono tabular-nums">{course.totalHours} ساعة تدريبية</span>
                  </div>
                </div>

                {/* Live Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-slate-400">
                      التقدم في الفصول: {doneCount} من {chaptersCount}
                    </span>
                    <span className="font-mono font-bold text-emerald-400 tabular-nums">
                      {percent}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-l from-emerald-400 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, percent)}%` }}
                    />
                  </div>
                </div>

                {/* Feature Topics */}
                {course.topics && (
                  <div className="flex flex-wrap gap-1.5 mb-5 text-[11px] text-slate-400">
                    {course.topics.map((topic, tIdx) => (
                      <span key={tIdx} className="inline-flex items-center gap-1">
                        {tIdx > 0 && <span className="text-slate-600">·</span>}
                        <span>{topic}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions: Direct Entry to the Specific Course's Chapters */}
              <div className="pt-3 relative z-10 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      course.slug === 'english-mastery' ||
                        course.slug === 'eng-academic' ||
                        course.code.startsWith('ENG')
                        ? '/academic/english'
                        : `/academic/${course.slug}/chapters`
                    );
                  }}
                  className="flex-1 px-4 py-3 rounded-xl btn-3d-neon btn-3d-neon-active text-emerald-200 hover:text-white text-xs font-black flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <span>
                    {course.slug === 'english-mastery' ||
                    course.slug === 'eng-academic' ||
                    course.code.startsWith('ENG')
                      ? 'فتح الكتاب التفاعلي 3D للغة الإنجليزية'
                      : 'دخول المقرر واستكشاف الفصول'}
                  </span>
                  <ArrowRight className="w-4 h-4 rotate-180 shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/academic/${course.slug}/details`);
                  }}
                  title="توصيف المقرر والخطة الأسبوعية"
                  className="px-3.5 py-3 rounded-xl btn-3d-neon btn-3d-amber text-amber-300 hover:text-amber-200 transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
