# المرحلة الثامنة (الجزء 3 المستقل): الكود الكامل لصفحة تفاصيل الفصل والكتاب الأكاديمي
**المسار في المشروع:** `src/pages/academic/ChapterDetail.tsx`

انسخ الكود التالي بالكامل واستبدل به محتوى ملف `src/pages/academic/ChapterDetail.tsx`:

```tsx
// File: src/pages/academic/ChapterDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Video,
  Presentation,
  Layers,
  CheckCircle2,
  Circle,
  Sparkles,
  GraduationCap,
  ChevronLeft,
  MapPin,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { getChapterById, getChaptersByCourse, type Chapter } from '@/lib/chapters';
import { getCourseBySlug } from '@/data/courses';
import type { CourseInfo } from '@/data/courses/types';
import Tabs from '@/components/ui/Tabs';
import VideoPlayer from '@/components/ui/VideoPlayer';
import SlideViewer from '@/components/ui/SlideViewer';
import InteractiveCard from '@/components/academic/InteractiveCard';
import InteractiveTextbook from '@/components/academic/InteractiveTextbook';
import ChapterCompletionModal from '@/components/academic/ChapterCompletionModal';
import ChapterDiagram from '@/components/ui/ChapterDiagram';
import RichContent from '@/components/ui/RichContent';
import { useAuth } from '@/contexts/AuthContext';
import { markChapterComplete, isChapterComplete, saveQuizScore } from '@/lib/progress';
import { cn } from '@/lib/utils';

type LearningMode = 'interactive' | 'academic';

const ACADEMIC_TABS = [
  { id: 'content', label: 'النص الكامل', icon: BookOpen, color: 'from-emerald-600 to-emerald-500' },
  { id: 'diagram', label: 'المخطط المفاهيمي', icon: Layers, color: 'from-cyan-600 to-cyan-500' },
  { id: 'video', label: 'فيديو توضيحي وشرح تطبيقي', icon: Video, color: 'from-red-600 to-red-500' },
  { id: 'slides', label: 'شرائح العرض', icon: Presentation, color: 'from-blue-600 to-blue-500' },
  { id: 'cards', label: 'بطاقات الاستذكار', icon: Layers, color: 'from-amber-600 to-amber-500' },
];

export default function ChapterDetail() {
  const { courseSlug, id } = useParams<{ courseSlug?: string; id: string }>();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [course, setCourse] = useState<CourseInfo | null>(null);
  const [mode, setMode] = useState<LearningMode>('interactive');
  const [activeTab, setActiveTab] = useState('content');
  const [allChapters, setAllChapters] = useState<Chapter[]>([]);
  const { session } = useAuth();
  const [completed, setCompleted] = useState(false);

  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<{
    index: number;
    heading: string;
  } | null>(null);

  const effectiveCourseSlug = courseSlug || 'ise243';

  useEffect(() => {
    if (!id) return;
    const c = getCourseBySlug(effectiveCourseSlug) || null;
    setCourse(c);
    const chapters = getChaptersByCourse(effectiveCourseSlug);
    setAllChapters(chapters);

    const numericId = Number(id);
    const ch =
      getChapterById(effectiveCourseSlug, numericId) ||
      chapters.find((item) => item.id === numericId || item.chapter_number === numericId) ||
      chapters[0] ||
      null;

    setChapter(ch);
    setHighlightedSection(null);
    if (session && ch) {
      setCompleted(isChapterComplete(session.username, ch.id));
    } else {
      setCompleted(false);
    }
  }, [effectiveCourseSlug, id, session]);

  const handleOpenCompletionExam = () => {
    setIsCompletionModalOpen(true);
  };

  const handleConfirmComplete = (scorePercent: number) => {
    if (!session || !chapter) return;
    markChapterComplete(session.username, chapter.id);
    saveQuizScore(session.username, chapter.id, scorePercent);
    setCompleted(true);
    setIsCompletionModalOpen(false);
  };

  const handleJumpToSection = (sectionIndex: number, sectionHeading: string) => {
    setIsCompletionModalOpen(false);
    setMode('academic');
    setActiveTab('content');
    setHighlightedSection({ index: sectionIndex, heading: sectionHeading });

    setTimeout(() => {
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      const matchedEl =
        headings.find((el) =>
          (el.textContent || '').trim().includes(sectionHeading.slice(0, 22).trim())
        ) || headings[sectionIndex];

      if (matchedEl) {
        matchedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        matchedEl.classList.add('chapter-section-highlight');
        setTimeout(() => {
          matchedEl.classList.remove('chapter-section-highlight');
        }, 6500);
      }
    }, 280);
  };

  if (!chapter || !course) {
    return (
      <div className="text-center py-20 px-6 space-y-4" dir="rtl">
        <p className="text-slate-300 font-bold">جارٍ تحميل محتوى الفصل الدراسي...</p>
        <Link
          to={`/academic/${effectiveCourseSlug}/chapters`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-amber-400 text-xs font-bold"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى قائمة الفصول</span>
        </Link>
      </div>
    );
  }

  const idx = allChapters.findIndex(
    (c) => c.id === chapter.id || c.chapter_number === chapter.chapter_number
  );
  const prev = idx > 0 ? allChapters[idx - 1] : null;
  const next = idx >= 0 && idx < allChapters.length - 1 ? allChapters[idx + 1] : null;

  return (
    <div className="min-h-screen pb-20 space-y-6" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/academic/${effectiveCourseSlug}/chapters`)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all"
            title="العودة لفهرس الفصول"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400">{course.code}</span>
              <span className="text-slate-700">•</span>
              <span className="text-xs text-slate-400">الفصل {chapter.chapter_number}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                متاح بالكامل
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-0.5">{chapter.title}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setMode('interactive')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all',
                mode === 'interactive'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>الكتاب التفاعلي (3D)</span>
            </button>
            <button
              onClick={() => setMode('academic')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all',
                mode === 'academic'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>التنسيق الأكاديمي</span>
            </button>
          </div>

          {session && (
            <button
              onClick={handleOpenCompletionExam}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black border transition-all cursor-pointer shadow-md',
                completed
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
                  : 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/50 text-emerald-300 hover:border-emerald-400'
              )}
            >
              {completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Circle className="w-4 h-4 text-amber-400" />
              )}
              <span>{completed ? 'مكتمل (إعادة اختبار الـ 15 سؤالاً)' : 'إتمام الفصل (15 سؤالاً)'}</span>
            </button>
          )}
        </div>
      </motion.div>

      {highlightedSection && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-200">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              تم توجيهك مباشرة إلى موقع المعلومة في محتوى الفصل: «{highlightedSection.heading}» لتثبيت المعلومات.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompletionModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs cursor-pointer"
            >
              العودة لشرح الأسئلة الـ 15
            </button>
            <button
              onClick={() => setHighlightedSection(null)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs"
            >
              إخفاء
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {mode === 'interactive' ? (
          <motion.div
            key="interactive-mode"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <InteractiveTextbook
              key={`book-${effectiveCourseSlug}-${chapter.id}-${chapter.chapter_number}`}
              chapter={chapter}
              courseTitle={course.title}
              courseSlug={effectiveCourseSlug}
              onClose={() => navigate(`/academic/${effectiveCourseSlug}/chapters`)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="academic-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <Tabs tabs={ACADEMIC_TABS} active={activeTab} onChange={setActiveTab} />

            <div className="w-full">
              {activeTab === 'content' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl">
                      <RichContent
                        content={chapter.content.replace(/---page---/g, '\n\n')}
                        images={chapter.images}
                        courseSlug={effectiveCourseSlug}
                        chapterNumber={chapter.chapter_number}
                      />
                    </div>

                    {/* المثال الهندسي المحلول من richData إن وجد */}
                    {chapter.richData?.solvedExample && (
                      <div className="bg-slate-900/70 border border-emerald-500/35 p-6 rounded-3xl space-y-4">
                        <div className="flex items-center gap-2 text-emerald-400 font-black text-base">
                          <Sparkles className="w-5 h-5" />
                          <span>مثال هندسي وتطبيقي محلول: {chapter.richData.solvedExample.title}</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                          <strong className="text-amber-300">المعطيات: </strong>
                          {chapter.richData.solvedExample.given}
                        </div>
                        <ul className="space-y-2 text-xs text-slate-200 pr-2">
                          {chapter.richData.solvedExample.steps.map((st, si) => (
                            <li key={si} className="flex items-start gap-2 leading-relaxed">
                              <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {si + 1}
                              </span>
                              <span>{st}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
                          <strong className="text-emerald-400">النتيجة الهندسية: </strong>
                          {chapter.richData.solvedExample.result}
                          {chapter.richData.solvedExample.whyItMatters && (
                            <p className="text-slate-300 mt-1">
                              <strong className="text-cyan-300">الأهمية التطبيقية: </strong>
                              {chapter.richData.solvedExample.whyItMatters}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* الأخطاء الهندسية الشائعة وطريقة تصحيحها */}
                    {chapter.richData?.commonMistake && (
                      <div className="bg-slate-900/70 border border-rose-500/35 p-6 rounded-3xl space-y-3">
                        <div className="flex items-center gap-2 text-rose-400 font-black text-base">
                          <AlertTriangle className="w-5 h-5" />
                          <span>تنبيه هندسي: خطأ شائع وكيفية معالجته</span>
                        </div>
                        <p className="text-xs text-rose-200 bg-rose-950/30 border border-rose-500/30 p-3.5 rounded-2xl leading-relaxed">
                          <strong>الخطأ الشائع: </strong>
                          {chapter.richData.commonMistake.mistake}
                        </p>
                        <p className="text-xs text-emerald-200 bg-emerald-950/30 border border-emerald-500/30 p-3.5 rounded-2xl leading-relaxed">
                          <strong>الممارسة القياسية الصحيحة: </strong>
                          {chapter.richData.commonMistake.fix}
                        </p>
                      </div>
                    )}
                  </div>

                  <aside className="space-y-4">
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl">
                      <h3 className="font-black text-amber-400 text-sm mb-4">
                        المفاهيم الأساسية للفصل
                      </h3>
                      <ul className="space-y-2.5">
                        {chapter.keyTopics?.map((topic: string, i: number) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {chapter.richData?.selfAssessment && chapter.richData.selfAssessment.length > 0 && (
                      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-3">
                        <h3 className="font-black text-cyan-400 text-sm flex items-center gap-2">
                          <HelpCircle className="w-4 h-4" />
                          <span>أسئلة المراجعة والتقييم الذاتي</span>
                        </h3>
                        <div className="space-y-3">
                          {chapter.richData.selfAssessment.map((qa, qi) => (
                            <div
                              key={qi}
                              className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs"
                            >
                              <p className="font-bold text-amber-300">{qa.question}</p>
                              <p className="text-slate-300 leading-relaxed">{qa.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </aside>
                </div>
              )}

              {activeTab === 'diagram' && (
                <ChapterDiagram
                  chapterNumber={chapter.chapter_number}
                  courseSlug={effectiveCourseSlug}
                />
              )}
              {activeTab === 'video' && (
                <VideoPlayer
                  url={chapter.videoUrl || ''}
                  title={chapter.videoTitle || chapter.title}
                />
              )}
              {activeTab === 'slides' && (
                <SlideViewer
                  key={`slides-${effectiveCourseSlug}-${chapter.id}-${chapter.chapter_number}`}
                  chapter={chapter}
                  courseTitle={course.title}
                  courseCode={course.code}
                  courseSlug={effectiveCourseSlug}
                  url={chapter.presentationUrl || ''}
                  title={chapter.title}
                  slides={chapter.slides}
                  interactiveBook3D={chapter.interactiveBook3D}
                />
              )}
              {activeTab === 'cards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {chapter.flashcards?.length > 0 ? (
                    chapter.flashcards.map((card, i: number) => (
                      <InteractiveCard key={i} data={card} index={i} />
                    ))
                  ) : (
                    <p className="col-span-full text-center text-slate-500 py-12">
                      لا توجد بطاقات مراجعة مضافة لهذا الفصل حالياً.
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChapterCompletionModal
        isOpen={isCompletionModalOpen}
        chapter={chapter}
        courseTitle={course.title}
        isAlreadyCompleted={completed}
        onClose={() => setIsCompletionModalOpen(false)}
        onConfirmComplete={handleConfirmComplete}
        onJumpToSection={handleJumpToSection}
      />

      <div className="pt-8 border-t border-slate-800/60 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            to={`/academic/${effectiveCourseSlug}/chapters/${prev.id}`}
            className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group"
          >
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors" />
            <div>
              <span className="text-[10px] text-slate-500 block">الفصل السابق</span>
              <span className="text-xs font-bold text-slate-300 group-hover:text-white">
                {prev.title}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            to={`/academic/${effectiveCourseSlug}/chapters/${next.id}`}
            className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/40 transition-all group text-left"
          >
            <div>
              <span className="text-[10px] text-slate-500 block">الفصل التالي</span>
              <span className="text-xs font-bold text-slate-300 group-hover:text-amber-400">
                {next.title}
              </span>
            </div>
            <ChevronLeft className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
```
