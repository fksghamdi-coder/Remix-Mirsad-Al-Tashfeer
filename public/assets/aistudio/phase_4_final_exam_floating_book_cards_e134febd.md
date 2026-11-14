# المرحلة التطويرية 4 (منفصلة بالكامل): الاختبار النهائي الشامل (`FinalQuiz.tsx` — 10 أسئلة عشوائية من كل مقرر + خيار اللغة الإنجليزية بـ 10 أسئلة إضافية، بنظام بطاقات الكتاب العائمة)

هذا الملف مخصص حصرياً لتنفيذ **المرحلة التطويرية الرابعة** بكامل ملفاتها دون أي تداخل مع المراحل الأخرى.

---

## أمر النسخ المباشر للمرحلة 4 (انسخه إلى Google AI Studio)
```text
نفّذ المرحلة التطويرية الرابعة فقط عبر تحديث ملف `src/pages/academic/FinalQuiz.tsx` بالكامل:
1. قبل البدء في الاختبار النهائي، اعرض خياراً واضحاً للطالب لاختيار إضافة مقرر اللغة الإنجليزية (ENG 101–301) أم لا.
2. اسحب عشوائياً في كل مرة يُطلب فيها الاختبار 10 أسئلة من كل مقرر من المقررات الـ 5 الأساسية (50 سؤالاً)، وعند اختيار إضافة اللغة الإنجليزية أضف 10 أسئلة عشوائية إضافية للإنجليزية ليصبح المجموع 60 سؤالاً.
3. جميع الأسئلة من 4 خيارات وتظهر بشكل بطاقات عائمة كل سؤال في بطاقة داخل كتاب ثلاثي الأبعاد، وعند الانتهاء من السؤال الحالي تُطوى البطاقة وتُفتح بطاقة السؤال التالي تلقائياً.
```

---

## الكود الكامل لملف `src/pages/academic/FinalQuiz.tsx`
```tsx
// File: src/pages/academic/FinalQuiz.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ChevronLeft,
  BookOpen,
  Award,
  Globe,
  Layers,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COURSES } from '@/data/courses';
import { getChaptersByCourse } from '@/lib/chapters';
import { buildChapter15Questions } from '@/components/academic/ChapterCompletionModal';
import { useAuth } from '@/contexts/AuthContext';
import { saveQuizScore } from '@/lib/progress';
import { cn } from '@/lib/utils';

interface FinalExamCardQuestion {
  id: string;
  courseCode: string;
  courseTitle: string;
  chapterTitle: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * سحب 10 أسئلة عشوائية من كل مقرر في كل مرة يُطلب فيها الاختبار النهائي
 * (50 سؤالاً للمقررات الـ 5 الأساسية + 10 أسئلة إضافية للغة الإنجليزية عند تفعيلها = 60 سؤالاً)
 */
function generateRandomFinalExamQuestions(includeEnglish: boolean): FinalExamCardQuestion[] {
  const targetCourses = COURSES.filter((course) => {
    const isEnglish =
      course.slug.includes('eng') ||
      course.code.toLowerCase().includes('eng') ||
      course.id.includes('eng');
    return includeEnglish ? true : !isEnglish;
  });

  const allSelected: FinalExamCardQuestion[] = [];

  targetCourses.forEach((course) => {
    const chapters = getChaptersByCourse(course.slug);
    const courseQuestionPool: FinalExamCardQuestion[] = [];

    chapters.forEach((ch) => {
      const chQuestions = buildChapter15Questions(ch).slice(0, 5);
      chQuestions.forEach((q) => {
        courseQuestionPool.push({
          id: `${course.slug}-${q.id}-${Math.random().toString(36).slice(2, 6)}`,
          courseCode: course.code,
          courseTitle: course.title,
          chapterTitle: `الفصل ${ch.chapter_number}: ${ch.title}`,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        });
      });
    });

    const random10ForCourse = shuffleArray(courseQuestionPool).slice(0, 10);
    allSelected.push(...random10ForCourse);
  });

  return allSelected;
}

export default function FinalQuiz() {
  const [includeEnglish, setIncludeEnglish] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<FinalExamCardQuestion[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [expandedReviewIdx, setExpandedReviewIdx] = useState<number | null>(0);

  const navigate = useNavigate();
  const { session } = useAuth();

  const startExam = () => {
    const generated = generateRandomFinalExamQuestions(includeEnglish);
    setQuestions(generated);
    setAnswers(Array(generated.length).fill(-1));
    setSelectedOption(null);
    setCurrent(0);
    setShowResult(false);
    setStarted(true);
  };

  const handleConfirmCardAndNext = () => {
    if (selectedOption === null) return;
    const updated = [...answers];
    updated[current] = selectedOption;
    setAnswers(updated);

    if (current < questions.length - 1) {
      setSelectedOption(updated[current + 1] !== -1 ? updated[current + 1] : null);
      setCurrent((c) => c + 1);
    } else {
      const finalScore = updated.reduce(
        (sum, ans, idx) => sum + (ans === questions[idx]?.correctIndex ? 1 : 0),
        0
      );
      if (session && questions.length > 0) {
        saveQuizScore(session.username, 0, Math.round((finalScore / questions.length) * 100));
      }
      setShowResult(true);
    }
  };

  const totalScore = answers.reduce(
    (sum, ans, idx) => sum + (ans === questions[idx]?.correctIndex ? 1 : 0),
    0
  );
  const percent = questions.length > 0 ? Math.round((totalScore / questions.length) * 100) : 0;
  const passed = percent >= 60;

  if (!started) {
    const totalQuestionsCount = includeEnglish ? 60 : 50;
    return (
      <div className="max-w-3xl mx-auto py-10 px-4" dir="rtl">
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-8 md:p-10 rounded-3xl bg-slate-900/90 border-2 border-emerald-500/30 shadow-2xl space-y-6 text-right"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Trophy className="w-9 h-9" />
            </div>
            <div>
              <span className="text-xs font-black text-amber-400">
                مشروع التشفير المتقدم (ISE243) · دبلوم أمن المعلومات · شعبة (002م)
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
                الاختبار النهائي الشامل بنظام بطاقات الكتاب العائمة
              </h1>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            يتم توليد <strong className="text-emerald-400">10 أسئلة عشوائية من كل مقرر</strong> في كل مرة تطلب فيها الاختبار النهائي (من 4 خيارات لكل سؤال)، وتظهر الأسئلة تباعاً داخل <strong className="text-amber-300">بطاقات صفحات كتاب عائمة</strong> بحيث يفتح السؤال التالي فور الانتهاء من السؤال الحالي.
          </p>

          {/* خيار تضمين أو استثناء اللغة الإنجليزية قبل بدء الاختبار */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border-2 border-cyan-500/35 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-cyan-400 shrink-0" />
                <div>
                  <h3 className="text-sm font-black text-white">
                    خيار إضافة مقرر اللغة الإنجليزية (ENG 101–301) للاختبار النهائي
                  </h3>
                  <p className="text-xs text-slate-400">
                    عند التفعيل، يتم إضافة 10 أسئلة عشوائية إضافية لمقرر اللغة الإنجليزية ليصبح الاختبار 60 سؤالاً بدلاً من 50 سؤالاً.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIncludeEnglish(false)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer',
                    !includeEnglish
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  )}
                >
                  بدون الإنجليزية (50 سؤالاً)
                </button>
                <button
                  type="button"
                  onClick={() => setIncludeEnglish(true)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer',
                    includeEnglish
                      ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  )}
                >
                  مع الإنجليزية (+10 أسئلة = 60 سؤالاً)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">إجمالي الأسئلة العشوائية</span>
              <strong className="text-lg font-black text-emerald-400">
                {totalQuestionsCount} سؤالاً
              </strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">عدد الخيارات لكل سؤال</span>
              <strong className="text-lg font-black text-amber-400">4 خيارات</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">نسبة الاجتياز المعتمدة</span>
              <strong className="text-lg font-black text-cyan-400">60% فأعلى</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={startExam}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <BookOpen className="w-5 h-5" />
            <span>
              بدء الاختبار النهائي الآن ({totalQuestionsCount} بطاقة سؤال عائمة في كتاب)
            </span>
          </button>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6" dir="rtl">
        <div
          className={cn(
            'p-8 rounded-3xl border-2 flex flex-col md:flex-row items-center justify-between gap-6',
            passed
              ? 'bg-emerald-950/30 border-emerald-500/45'
              : 'bg-rose-950/30 border-rose-500/45'
          )}
        >
          <div className="space-y-2 text-right">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-black text-amber-400">
              النتيجة النهائية: {percent}% ({totalScore} من {questions.length})
            </span>
            <h2 className="text-2xl font-black text-white">
              {passed
                ? 'تهانينا! اجتزت الاختبار النهائي الشامل بنجاح'
                : 'لم تحقق نسبة 60% — يمكنك إعادة توليد اختبار عشوائي جديد'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={startExam}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>توليد اختبار عشوائي جديد</span>
            </button>
            {passed && (
              <button
                type="button"
                onClick={() => navigate('/academic/certificate')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>إصدار الشهادة الأكاديمية</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {questions.map((q, idx) => {
            const isCorrect = answers[idx] === q.correctIndex;
            const isExpanded = expandedReviewIdx === idx;
            return (
              <div
                key={q.id}
                className={cn(
                  'rounded-2xl border overflow-hidden',
                  isCorrect
                    ? 'bg-emerald-950/15 border-emerald-500/30'
                    : 'bg-rose-950/15 border-rose-500/30'
                )}
              >
                <button
                  type="button"
                  onClick={() => setExpandedReviewIdx(isExpanded ? null : idx)}
                  className="w-full p-4 text-right flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="text-[11px] font-bold text-amber-300 block">
                        بطاقة #{idx + 1} · {q.courseCode} ({q.chapterTitle})
                      </span>
                      <span className="text-xs md:text-sm font-bold text-white">{q.question}</span>
                    </div>
                  </div>
                  <span className="text-xs text-cyan-400 shrink-0">
                    {isExpanded ? 'إخفاء ▲' : 'الشرح ▼'}
                  </span>
                </button>
                {isExpanded && (
                  <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-xs space-y-2">
                    <div className="text-emerald-300 font-bold">
                      الإجابة الصحيحة: {q.options[q.correctIndex]}
                    </div>
                    <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const currentQ = questions[current];
  const arabicLetters = ['أ', 'ب', 'ج', 'د'];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 px-5 py-3.5 rounded-2xl">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-black text-white">
            بطاقة الكتاب العائمة {current + 1} من {questions.length}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[11px] font-black text-amber-300">
            {currentQ.courseCode} · {currentQ.courseTitle}
          </span>
        </div>
        <span className="text-xs text-slate-400">{currentQ.chapterTitle}</span>
      </div>

      <div className="relative" style={{ perspective: '1500px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`final-card-${current}`}
            initial={{ opacity: 0, rotateY: -78, y: 15 }}
            animate={{ opacity: 1, rotateY: 0, y: 0 }}
            exit={{ opacity: 0, rotateY: 78, y: -15 }}
            transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'right center' }}
            className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border-2 border-emerald-500/35 p-6 md:p-9 shadow-[inset_-14px_0_28px_rgba(0,0,0,0.5),0_25px_65px_rgba(0,0,0,0.75)] space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-400">
                <Layers className="w-4 h-4" />
                <span>صفحة السؤال {current + 1} في كتاب الاختبار النهائي</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {Math.round(((current + 1) / questions.length) * 100)}%
              </span>
            </div>

            <h2 className="text-base md:text-xl font-black text-white leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedOption(idx)}
                    className={cn(
                      'w-full text-right p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer',
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : 'bg-slate-950/75 border-slate-800 text-slate-300 hover:border-slate-700'
                    )}
                  >
                    <span
                      className={cn(
                        'w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0',
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      )}
                    >
                      {arabicLetters[idx]}
                    </span>
                    <span className="text-sm font-semibold leading-relaxed flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                عند تأكيد الإجابة تُطوى بطاقة السؤال الحالي وتُفتح بطاقة السؤال التالي تلقائياً
              </span>
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleConfirmCardAndNext}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-black text-xs shadow-lg cursor-pointer transition-all"
              >
                <span>
                  {current === questions.length - 1
                    ? 'إنهاء الكتاب وعرض النتيجة النهائية'
                    : `طي البطاقة وفتح السؤال التالي (${current + 2}/${questions.length})`}
                </span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
```
