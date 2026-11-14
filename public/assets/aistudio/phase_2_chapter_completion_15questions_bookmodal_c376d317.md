# المرحلة التطويرية 2 (منفصلة بالكامل): تبويب إتمام الفصل العائم (15 سؤالاً بنظام بطاقات صفحات الكتاب 3D، شرط 60%، وشرح كل سؤال مع القفز المباشر لموقع المعلومة في محتوى الفصل)

هذا الملف مخصص حصرياً لتنفيذ **المرحلة التطويرية الثانية** بكامل ملفاتها دون أي تداخل مع المراحل الأخرى.

---

## أمر النسخ المباشر للمرحلة 2 (انسخه إلى Google AI Studio)
```text
نفّذ المرحلة التطويرية الثانية فقط عبر إنشاء وتحديث الملفات التالية بالكامل:
1. أنشئ ملف `src/components/academic/ChapterCompletionModal.tsx` الذي يفتح عند النقر على تبويب/زر «إتمام الفصل» نافذة عائمة تحتوي على 15 سؤالاً متوسط الصعوبة لمحتوى الفصل مع 4 خيارات لكل سؤال، وتظهر الأسئلة تباعاً بعد الإجابة على السؤال الحالي محاكيةً بطاقات صفحات الكتاب ثلاثي الأبعاد (كل صفحة سؤال واحد فقط).
2. اجعل نسبة إتمام الفصل 60% (9 إجابات صحيحة من 15 على الأقل)، وعند الانتهاء اعرض جميع الأسئلة الـ 15 مع إظهار شرح كل سؤال عند النقر عليه وزر «الانتقال إلى موقع المعلومة في محتوى الفصل» الذي يذهب مباشرة إلى الفقرة الخاصة بالسؤال في محتوى الفصل ويظللها لتثبيت المعلومات.
3. إذا كانت النتيجة 60% فأكثر يظهر للطالب خياران (إعادة الاختبار أو اعتماد وإتمام الفصل)، وإذا كانت أقل من 60% يجب إعادة الأسئلة وإظهار النتيجة الجديدة ويتم الحكم عليها بهذه الطريقة.
4. حدّث ملف `src/pages/academic/ChapterDetail.tsx` لربط زر «إتمام الفصل» بفتح النافذة العائمة وتنفيذ الانتقال المباشر وتظليل الفقرة في الفصل.
```

---

## 1. الكود الكامل لملف `src/components/academic/ChapterCompletionModal.tsx`
```tsx
// File: src/components/academic/ChapterCompletionModal.tsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronLeft,
  Sparkles,
  HelpCircle,
  MapPin,
  X,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import type { Chapter } from '@/lib/chapters';
import { cn } from '@/lib/utils';

export interface ChapterExamQuestion {
  id: string;
  questionNumber: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  sectionIndex: number;
  sectionHeading: string;
  sectionExcerpt: string;
}

interface ChapterCompletionModalProps {
  isOpen: boolean;
  chapter: Chapter;
  courseTitle: string;
  isAlreadyCompleted: boolean;
  onClose: () => void;
  onConfirmComplete: (scorePercent: number) => void;
  onJumpToSection: (sectionIndex: number, sectionHeading: string) => void;
}

/**
 * محرك توليد 15 سؤالاً متوسط الصعوبة (4 خيارات لكل سؤال) من محتوى الفصل الفعلي
 * مع ربط كل سؤال بعنوان القسم والفقرة الدقيقة في محتوى الفصل لتثبيت المعلومات
 */
export function buildChapter15Questions(chapter: Chapter): ChapterExamQuestion[] {
  const rawSections = (chapter.content || '')
    .split(/---page---|(?=^##\s)/m)
    .map((s) => s.trim())
    .filter(Boolean);

  const parsedSections: { heading: string; body: string }[] = [];

  if (chapter.richData?.sections?.length) {
    chapter.richData.sections.forEach((sec) => {
      parsedSections.push({
        heading: sec.heading.replace(/^#+\s*/, '').trim(),
        body: sec.content + (sec.saudiExample ? ` — ${sec.saudiExample}` : ''),
      });
    });
  }

  rawSections.forEach((part, idx) => {
    const lines = part.split('\n').map((l) => l.trim()).filter(Boolean);
    const firstLine = lines[0] || `المبحث ${idx + 1}: ${chapter.title}`;
    const heading = firstLine.startsWith('#')
      ? firstLine.replace(/^#+\s*/, '').trim()
      : idx === 0
      ? `المفاهيم الأساسية — ${chapter.title}`
      : `المحور العلمي ${idx + 1} — ${chapter.title}`;
    const body = lines.slice(firstLine.startsWith('#') ? 1 : 0).join(' ') || chapter.description;
    if (!parsedSections.some((ps) => ps.heading === heading)) {
      parsedSections.push({ heading, body });
    }
  });

  if (parsedSections.length === 0) {
    parsedSections.push({
      heading: chapter.title,
      body: chapter.description || 'المبادئ الرياضية والتطبيقية للفصل.',
    });
  }

  const result: ChapterExamQuestion[] = [];

  // 1. إدراج أسئلة الفصل الصريحة من chapter.quiz و chapter.richData.quiz
  const explicitQuizzes = [
    ...(chapter.quiz || []),
    ...(chapter.richData?.quiz || []),
  ];

  explicitQuizzes.forEach((q, idx) => {
    const secIdx = idx % parsedSections.length;
    const sec = parsedSections[secIdx];
    const opts = [...(q.options || [])];
    while (opts.length < 4) {
      opts.push(`خيار تحليلي بديل رقم ${opts.length + 1} غير مطابق للمعيار`);
    }
    const fourOptions: [string, string, string, string] = [
      opts[0],
      opts[1],
      opts[2],
      opts[3],
    ];
    const validCorrect =
      typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < 4
        ? q.correctIndex
        : 0;

    result.push({
      id: `ch-${chapter.id}-exp-${idx + 1}`,
      questionNumber: result.length + 1,
      question: q.question,
      options: fourOptions,
      correctIndex: validCorrect,
      explanation:
        q.explanation ||
        `الإجابة الصحيحة هي «${fourOptions[validCorrect]}» وفق التأصيل العلمي الوارد في مبحث «${sec.heading}».`,
      sectionIndex: secIdx,
      sectionHeading: sec.heading,
      sectionExcerpt: sec.body.slice(0, 260) + (sec.body.length > 260 ? '...' : ''),
    });
  });

  // 2. إدراج أسئلة من بطاقات الاستذكار (Flashcards) الخاصة بالفصل
  (chapter.flashcards || []).forEach((card, idx) => {
    if (result.length >= 15) return;
    const secIdx = (idx + 1) % parsedSections.length;
    const sec = parsedSections[secIdx];
    const correctAns = card.back.length > 130 ? card.back.slice(0, 130) + '...' : card.back;
    const distractors = [
      'استخدام خوارزمية تقليدية غير معتمدة وتجاهل التحقق من التكامل الرياضي للبيانات',
      'تخزين المعاملات السرية كنص واضح دون تطبيق طبقات العزل أو التعمية القياسية',
      'إلغاء مصادقة الأطراف والاكتفاء بالتحقق الشكلي غير الموثق ببصمة تشفيرية',
    ];
    const correctPos = (result.length + idx) % 4;
    const opts: string[] = [];
    let dIdx = 0;
    for (let i = 0; i < 4; i++) {
      if (i === correctPos) opts.push(correctAns);
      else opts.push(distractors[dIdx++]);
    }

    result.push({
      id: `ch-${chapter.id}-fc-${idx + 1}`,
      questionNumber: result.length + 1,
      question: card.front.endsWith('؟')
        ? card.front
        : `في سياق «${chapter.title}»، ما التوصيف العلمي الدقيق لمفهوم: ${card.front}؟`,
      options: [opts[0], opts[1], opts[2], opts[3]],
      correctIndex: correctPos,
      explanation: `الشرح التفصيلي من محتوى الفصل: ${card.back} — راجع قسم «${sec.heading}».`,
      sectionIndex: secIdx,
      sectionHeading: sec.heading,
      sectionExcerpt: sec.body.slice(0, 260) + (sec.body.length > 260 ? '...' : ''),
    });
  });

  // 3. استكمال نصاب الـ 15 سؤالاً من المفاهيم الأساسية (keyTopics) وأقسام الفصل (parsedSections)
  const topicsPool = [
    ...(chapter.keyTopics || []),
    ...parsedSections.map((s) => `${s.heading}: ${s.body.split('.')[0] || s.body.slice(0, 110)}`),
  ];

  let poolCursor = 0;
  while (result.length < 15) {
    const qNum = result.length + 1;
    const secIdx = (qNum - 1) % parsedSections.length;
    const sec = parsedSections[secIdx];
    const topicText =
      topicsPool[poolCursor % Math.max(1, topicsPool.length)] ||
      `${sec.heading} في ${chapter.title}`;
    poolCursor++;

    const cleanSentence =
      sec.body
        .replace(/[#*`>-]/g, '')
        .split(/[.،\n]/)
        .map((s) => s.trim())
        .find((s) => s.length >= 35 && s.length <= 145) ||
      `تطبيق الضوابط والمعادلات المعتمدة في مبحث «${sec.heading}» لضمان السرية والتكامل`;

    const correctPos = qNum % 4;
    const distractors = [
      'تقليص طول المفتاح أو تعطيل جولات التحقق الرياضي لتسريع المعالجة على حساب الأمان',
      'الاعتماد على قيم ثابتة غير عشوائية ومشاركتها عبر قنوات غير محمية دون توثيق',
      'تجاوز ضوابط الهيئة الوطنية للأمن السيبراني (NCA) والمعايير القياسية المعتمدة في هذا المبحث',
    ];

    const opts: string[] = [];
    let dIdx = 0;
    for (let i = 0; i < 4; i++) {
      if (i === correctPos) {
        opts.push(cleanSentence);
      } else {
        opts.push(distractors[dIdx++]);
      }
    }

    result.push({
      id: `ch-${chapter.id}-sec-${qNum}`,
      questionNumber: qNum,
      question: `السؤال التحليلي (${qNum}/15) حول محور «${sec.heading}»: أي من العبارات التالية يمثل المبدأ الصحيح المقرر في هذا المبحث حول (${topicText.slice(0, 75)})؟`,
      options: [opts[0], opts[1], opts[2], opts[3]],
      correctIndex: correctPos,
      explanation: `تأصيل المعلومة في الفصل: ينص مبحث «${sec.heading}» على أنه يجب: (${cleanSentence}). النقر على زر الانتقال أدناه يأخذك مباشرة إلى موقع هذه الفقرة في محتوى الفصل.`,
      sectionIndex: secIdx,
      sectionHeading: sec.heading,
      sectionExcerpt: sec.body.replace(/[#*`]/g, '').slice(0, 280) + '...',
    });
  }

  return result.slice(0, 15).map((q, idx) => ({
    ...q,
    questionNumber: idx + 1,
  }));
}

export default function ChapterCompletionModal({
  isOpen,
  chapter,
  courseTitle,
  isAlreadyCompleted,
  onClose,
  onConfirmComplete,
  onJumpToSection,
}: ChapterCompletionModalProps) {
  const questions = useMemo(() => buildChapter15Questions(chapter), [chapter]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>(Array(15).fill(-1));
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState<number | null>(0);
  const [pageTurnDirection, setPageTurnDirection] = useState<'next' | 'prev'>('next');

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optIdx: number) => {
    setSelectedOption(optIdx);
  };

  const handleConfirmAndTurnPage = () => {
    if (selectedOption === null) return;
    const updated = [...answers];
    updated[currentIndex] = selectedOption;
    setAnswers(updated);

    if (currentIndex < questions.length - 1) {
      setPageTurnDirection('next');
      setSelectedOption(updated[currentIndex + 1] !== -1 ? updated[currentIndex + 1] : null);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      setExpandedQuestionIdx(0);
    }
  };

  const handleRetakeExam = () => {
    setAnswers(Array(15).fill(-1));
    setSelectedOption(null);
    setCurrentIndex(0);
    setIsFinished(false);
    setExpandedQuestionIdx(0);
  };

  const correctCount = answers.reduce(
    (acc, ans, idx) => acc + (ans === questions[idx]?.correctIndex ? 1 : 0),
    0
  );
  const scorePercent = Math.round((correctCount / 15) * 100);
  const passed = scorePercent >= 60;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-xl overflow-y-auto"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border-2 border-emerald-500/35 shadow-[0_25px_90px_rgba(0,0,0,0.85)] overflow-hidden my-auto"
        >
          {/* الشريط العلوي للنافذة العائمة */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950/90 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-amber-400">{courseTitle}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[11px] font-bold text-emerald-400">
                    اختبار إتمام الفصل {chapter.chapter_number} (15 سؤالاً · شرط الإتمام 60%)
                  </span>
                </div>
                <h2 className="text-base md:text-lg font-black text-white">{chapter.title}</h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              title="إغلاق النافذة العائمة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isFinished ? (
            /* مرحلة عرض الأسئلة الـ 15 تباعاً كصفحات كتاب ثلاثي الأبعاد */
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>
                      صفحة السؤال {currentIndex + 1} من 15 (تظهر الأسئلة تباعاً بعد الإجابة)
                    </span>
                  </span>
                  <span className="font-mono text-slate-400">
                    نسبة الإتمام المطلوبة: <strong className="text-amber-400">60% (9/15)</strong>
                  </span>
                </div>

                <div className="grid grid-cols-15 gap-1">
                  {questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className={cn(
                        'h-2 rounded-full transition-all duration-300',
                        idx < currentIndex
                          ? 'bg-emerald-500'
                          : idx === currentIndex
                          ? 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.7)]'
                          : 'bg-slate-800'
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* بطاقة صفحة الكتاب ثلاثية الأبعاد للسؤال الحالي */}
              <div className="relative" style={{ perspective: '1400px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`book-q-page-${currentIndex}`}
                    initial={{
                      opacity: 0,
                      rotateY: pageTurnDirection === 'next' ? -75 : 75,
                      x: pageTurnDirection === 'next' ? -40 : 40,
                    }}
                    animate={{ opacity: 1, rotateY: 0, x: 0 }}
                    exit={{
                      opacity: 0,
                      rotateY: pageTurnDirection === 'next' ? 75 : -75,
                      x: pageTurnDirection === 'next' ? 40 : -40,
                    }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'right center' }}
                    className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border-2 border-amber-500/30 p-6 md:p-8 shadow-[inset_-12px_0_25px_rgba(0,0,0,0.45),0_18px_45px_rgba(0,0,0,0.65)]"
                  >
                    <div className="absolute top-3 bottom-3 right-2 w-1.5 rounded-full bg-gradient-to-b from-amber-500/40 via-emerald-500/30 to-amber-500/40" />

                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-800/90">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black">
                        <Layers className="w-3.5 h-3.5" />
                        <span>صفحة الكتاب {currentIndex + 1} / 15</span>
                      </span>
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>المبحث المرتبط: {currentQ.sectionHeading}</span>
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-black text-white leading-relaxed mb-6">
                      {currentQ.question}
                    </h3>

                    <div className="space-y-3">
                      {currentQ.options.map((optionText, optIdx) => {
                        const isSelected = selectedOption === optIdx;
                        const arabicLetters = ['أ', 'ب', 'ج', 'د'];
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectOption(optIdx)}
                            className={cn(
                              'w-full text-right p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 group',
                              isSelected
                                ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                                : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                            )}
                          >
                            <span
                              className={cn(
                                'w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 mt-0.5 transition-colors',
                                isSelected
                                  ? 'bg-emerald-500 text-slate-950'
                                  : 'bg-slate-800 text-slate-400 group-hover:text-white'
                              )}
                            >
                              {arabicLetters[optIdx]}
                            </span>
                            <span className="text-sm font-semibold leading-relaxed flex-1">
                              {optionText}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-7 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        اختر إجابتك ثم انقر لطي الصفحة والانتقال للسؤال التالي
                      </span>

                      <button
                        type="button"
                        disabled={selectedOption === null}
                        onClick={handleConfirmAndTurnPage}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                      >
                        <span>
                          {currentIndex === questions.length - 1
                            ? 'إنهاء الأسئلة وعرض النتيجة والشرح'
                            : `تأكيد الإجابة وفتح صفحة السؤال (${currentIndex + 2})`}
                        </span>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* مرحلة النتيجة النهائية (شرط 60%) وعرض جميع الأسئلة الـ 15 مع الشرح والقفز لموقع المعلومة */
            <div className="p-6 md:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
              <div
                className={cn(
                  'p-6 rounded-3xl border-2 flex flex-col md:flex-row items-center justify-between gap-6',
                  passed
                    ? 'bg-emerald-950/30 border-emerald-500/45'
                    : 'bg-rose-950/30 border-rose-500/45'
                )}
              >
                <div className="flex items-center gap-4 text-right">
                  <div
                    className={cn(
                      'w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-2',
                      passed
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-rose-500/20 border-rose-400 text-rose-300'
                    )}
                  >
                    {passed ? (
                      <Award className="w-9 h-9" />
                    ) : (
                      <AlertTriangle className="w-9 h-9" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'px-3 py-0.5 rounded-full text-xs font-black',
                          passed
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        )}
                      >
                        النتيجة: {scorePercent}% ({correctCount} من 15 إجابة صحيحة)
                      </span>
                      <span className="text-xs text-slate-400">
                        (الحد الأدنى لإتمام الفصل: 60%)
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white mt-1.5">
                      {passed
                        ? 'أحسنت! حققت نسبة 60% فأكثر — لديك الخيار بين إعادة الاختبار أو اعتماد إتمام الفصل الآن'
                        : 'النتيجة أقل من 60% — يجب إعادة الأسئلة وتحقيق 60% على الأقل لاعتماد إتمام الفصل'}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      انقر على أي سؤال من الأسئلة الـ 15 أدناه لعرض شرحه التفصيلي أو الانتقال الفوري إلى موقع المعلومة في محتوى الفصل لتثبيت المعلومات.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleRetakeExam}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-black text-xs transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                    <span>{passed ? 'إعادة الاختبار' : 'إعادة الأسئلة وإظهار النتيجة الجديدة'}</span>
                  </button>

                  {passed && (
                    <button
                      type="button"
                      onClick={() => onConfirmComplete(scorePercent)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isAlreadyCompleted ? 'تحديث الإتمام' : 'اعتماد وإتمام الفصل'}</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-amber-400 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>مراجعة جميع أسئلة الفصل الـ 15 (انقر على أي سؤال لإظهار الشرح وموقع المعلومة):</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    انقر على السؤال لفتح بطاقة الشرح والتوجيه الموضعي
                  </span>
                </div>

                {questions.map((q, idx) => {
                  const studentAns = answers[idx];
                  const isCorrect = studentAns === q.correctIndex;
                  const isExpanded = expandedQuestionIdx === idx;

                  return (
                    <div
                      key={q.id}
                      className={cn(
                        'rounded-2xl border transition-all overflow-hidden',
                        isCorrect
                          ? 'bg-emerald-950/15 border-emerald-500/30'
                          : 'bg-rose-950/15 border-rose-500/30'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedQuestionIdx(isExpanded ? null : idx)}
                        className="w-full p-4 text-right flex items-start justify-between gap-3 hover:bg-slate-900/60 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-xs font-black text-white">
                                السؤال {q.questionNumber} من 15
                              </span>
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-bold">
                                القسم: {q.sectionHeading}
                              </span>
                            </div>
                            <p className="text-xs md:text-sm font-bold text-slate-200 leading-relaxed">
                              {q.question}
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold text-cyan-400 shrink-0">
                          {isExpanded ? 'إخفاء الشرح ▲' : 'عرض الشرح والموقع ▼'}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/70 space-y-3 text-xs"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                <span className="text-[11px] text-slate-400 block mb-1">
                                  إجابتك المختارة:
                                </span>
                                <span
                                  className={cn(
                                    'font-bold',
                                    isCorrect ? 'text-emerald-400' : 'text-rose-400'
                                  )}
                                >
                                  {studentAns >= 0 ? q.options[studentAns] : 'لم يتم الاختيار'}
                                </span>
                              </div>
                              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                                <span className="text-[11px] text-emerald-300 block mb-1">
                                  الإجابة الصحيحة المعتمدة:
                                </span>
                                <span className="font-bold text-emerald-200">
                                  {q.options[q.correctIndex]}
                                </span>
                              </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/25 space-y-1.5">
                              <div className="font-black text-amber-400 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>الشرح العلمي التفصيلي للسؤال:</span>
                              </div>
                              <p className="text-slate-200 leading-relaxed">{q.explanation}</p>
                            </div>

                            <div className="p-3.5 rounded-xl bg-cyan-950/25 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                              <div className="space-y-1">
                                <div className="font-black text-cyan-300 flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5" />
                                  <span>موقع المعلومة في الفصل: «{q.sectionHeading}»</span>
                                </div>
                                <p className="text-slate-300 text-[11px] leading-relaxed">
                                  {q.sectionExcerpt}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => onJumpToSection(q.sectionIndex, q.sectionHeading)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shrink-0 shadow-md transition-all cursor-pointer"
                              >
                                <MapPin className="w-4 h-4" />
                                <span>الانتقال إلى موقع المعلومة في محتوى الفصل</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
```

---

## 2. الكود الكامل لملف `src/pages/academic/ChapterDetail.tsx`
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
                  <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 p-8 rounded-3xl">
                    <RichContent
                      content={chapter.content.replace(/---page---/g, '\n\n')}
                      images={chapter.images}
                      courseSlug={effectiveCourseSlug}
                      chapterNumber={chapter.chapter_number}
                    />
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
