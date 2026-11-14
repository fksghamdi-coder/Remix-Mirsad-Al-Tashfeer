// File: src/pages/academic/ChapterList.tsx
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  BookOpen,
  ArrowRight,
  Clock,
  Target,
  Sparkles,
  Info,
  PlayCircle,
  Layers,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { getChaptersByCourse } from '@/lib/chapters';
import { getCourseBySlug } from '@/data/courses';
import { cn } from '@/lib/utils';
import { EnglishCourseInteractive } from '@/pages/academic/EnglishCourseInteractive';

const DIFFICULTY_LABELS: Record<string, { text: string; color: string }> = {
  beginner: { text: 'مبتدئ', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
  intermediate: { text: 'متوسط', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
  advanced: { text: 'متقدم', color: 'bg-rose-500/20 text-rose-400 border-rose-500/40' },
};

export default function ChapterList() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const effectiveSlug = courseSlug || 'ise243';
  const course = getCourseBySlug(effectiveSlug);
  const chapters = getChaptersByCourse(effectiveSlug);
  const [engViewMode, setEngViewMode] = useState<'chapters' | 'interactive_cefr'>('chapters');

  if (!course) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">المقرر غير موجود</p>
        <Link
          to="/academic"
          className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-sm font-bold transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للمنصة الأكاديمية</span>
        </Link>
      </div>
    );
  }

  const IconComp =
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[course.icon] ||
    BookOpen;
  const totalFlashcards = chapters.reduce((s, c) => s + (c.flashcards ? c.flashcards.length : 0), 0);
  const totalTopics = chapters.reduce((s, c) => s + (c.keyTopics ? c.keyTopics.length : 0), 0);
  const isEnglishCourse =
    effectiveSlug === 'eng-cyber' ||
    effectiveSlug === 'english-mastery' ||
    effectiveSlug === 'eng-academic';

  return (
    <div className="space-y-6" dir="rtl">
      {isEnglishCourse && (
        <div className="glass-panel card-3d-neon p-4 rounded-2xl border border-emerald-500/35 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>اختر نمط استعراض مقرر اللغة الإنجليزية التخصصية والتدريبية:</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/90 p-1.5 rounded-xl border border-emerald-500/30">
            <button
              type="button"
              onClick={() => setEngViewMode('chapters')}
              className={cn(
                'px-3.5 py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer btn-3d-neon btn-3d-amber active:scale-95',
                engViewMode === 'chapters'
                  ? 'btn-3d-amber-active ring-2 ring-amber-400/75 text-amber-200'
                  : 'text-slate-300 hover:text-amber-200'
              )}
            >
              فهرس الفصول الأكاديمية ({chapters.length} فصول)
            </button>
            <button
              type="button"
              onClick={() => setEngViewMode('interactive_cefr')}
              className={cn(
                'px-3.5 py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer btn-3d-neon active:scale-95',
                engViewMode === 'interactive_cefr'
                  ? 'btn-3d-neon-active ring-2 ring-emerald-400/75 text-emerald-200'
                  : 'text-slate-300 hover:text-emerald-200'
              )}
            >
              الكتاب التدريبي الشامل (CEFR A1–C2)
            </button>
          </div>
        </div>
      )}

      {isEnglishCourse && engViewMode === 'interactive_cefr' ? (
        <EnglishCourseInteractive />
      ) : (
        <>
          {/* ============ Course Header Card ============ */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel card-3d-neon rounded-3xl overflow-hidden relative border border-amber-500/35"
          >
            <div className={cn('absolute inset-0 bg-gradient-to-br opacity-10', course.color)} />

            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <Link to="/academic" className="hover:text-amber-400 transition-colors">
                  المقررات
                </Link>
                <ArrowRight className="w-3 h-3 rotate-180" />
                <span className="text-slate-300">{course.title}</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div
                  className={cn(
                    'w-16 h-16 rounded-2xl icon-glass-3d bg-gradient-to-br flex items-center justify-center shadow-lg shrink-0',
                    course.color
                  )}
                >
                  <IconComp className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-mono text-amber-400 font-bold mb-1">{course.code}</p>
                  <h1 className="text-2xl md:text-3xl font-black gradient-text-academic mb-1">
                    {course.title}
                  </h1>
                  <p className="text-sm text-slate-400">{course.description}</p>
                </div>

                <Link
                  to={`/academic/${effectiveSlug}/details`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-3d-neon btn-3d-amber text-sm font-bold text-amber-200 hover:text-white transition-all duration-300 active:scale-95 shrink-0"
                >
                  <Info className="w-4 h-4 text-amber-400" /> تفاصيل المقرر
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-2xl glass-panel card-3d-neon bg-slate-900/80 border border-amber-500/35 text-center">
                  <BookOpen className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                  <p className="text-xl font-black text-amber-400">{chapters.length}</p>
                  <p className="text-[11px] text-slate-300 font-bold">فصلاً</p>
                </div>
                <div className="p-3.5 rounded-2xl glass-panel card-3d-neon bg-slate-900/80 border border-blue-500/35 text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                  <p className="text-xl font-black text-blue-400">{course.totalHours}</p>
                  <p className="text-[11px] text-slate-300 font-bold">ساعة</p>
                </div>
                <div className="p-3.5 rounded-2xl glass-panel card-3d-neon bg-slate-900/80 border border-purple-500/35 text-center">
                  <Layers className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                  <p className="text-xl font-black text-purple-400">{totalFlashcards}</p>
                  <p className="text-[11px] text-slate-300 font-bold">بطاقة تفاعلية</p>
                </div>
                <div className="p-3.5 rounded-2xl glass-panel card-3d-neon bg-slate-900/80 border border-emerald-500/35 text-center">
                  <Target className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                  <p className="text-xl font-black text-emerald-400">{totalTopics}</p>
                  <p className="text-[11px] text-slate-300 font-bold">موضوعاً</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ============ Chapters Grid ============ */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-100">
                <Sparkles className="w-5 h-5 text-amber-400" />
                فهرس الفصول
              </h2>
              <span className="text-sm text-slate-400 font-bold">{chapters.length} فصلاً</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapters.map((ch, i) => {
                const diff =
                  (ch.difficulty && DIFFICULTY_LABELS[ch.difficulty]) || DIFFICULTY_LABELS.beginner;
                return (
                  <motion.div
                    key={ch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      to={`/academic/${effectiveSlug}/chapters/${ch.id}`}
                      className="glass-panel card-3d-neon block p-5 rounded-2xl border border-amber-500/35 hover:border-emerald-400/75 transition-all duration-300 group h-full relative overflow-hidden active:scale-[0.98]"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl icon-glass-3d bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                            <span className="text-white font-black text-sm">
                              {ch.chapter_number}
                            </span>
                          </div>
                          <div>
                            <span
                              className={cn(
                                'text-[10px] px-2.5 py-0.5 rounded-full border font-bold',
                                diff.color
                              )}
                            >
                              {diff.text}
                            </span>
                          </div>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 group-hover:-translate-x-1 transition-all" />
                      </div>

                      <h3 className="font-bold text-sm mb-2 text-slate-100 group-hover:text-emerald-300 transition-colors leading-relaxed">
                        {ch.title}
                      </h3>

                      <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                        {ch.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 pt-3 border-t border-slate-800/80">
                        {ch.videoUrl && (
                          <span className="flex items-center gap-1 text-red-400">
                            <PlayCircle className="w-3.5 h-3.5" /> فيديو
                          </span>
                        )}
                        {ch.flashcards && ch.flashcards.length > 0 && (
                          <span className="flex items-center gap-1 text-purple-400">
                            <Layers className="w-3.5 h-3.5" /> {ch.flashcards.length} بطاقة
                          </span>
                        )}
                        {ch.keyTopics && ch.keyTopics.length > 0 && (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <Target className="w-3.5 h-3.5" /> {ch.keyTopics.length} موضوع
                          </span>
                        )}
                        {ch.category && (
                          <span
                            className={cn(
                              'ml-auto px-2 py-0.5 rounded text-[10px] font-medium',
                              diff.color
                            )}
                          >
                            {ch.category}
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 py-4">
            📚 {course.code} — {course.reference}
          </div>
        </>
      )}
    </div>
  );
}
