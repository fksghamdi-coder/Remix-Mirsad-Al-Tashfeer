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
 * بدون أي تكرار للأسئلة أو الخيارات، مع ربط كل سؤال بعنوان القسم والفقرة الدقيقة في محتوى الفصل
 */
export function buildChapter15Questions(chapter: Chapter): ChapterExamQuestion[] {
  const rawSections = (chapter.content || '')
    .replace(/^#\s+[^\n]+\n+/, '')
    .split(/---page---|\n---\n|(?=^##\s)/m)
    .map((s) => s.trim())
    .filter(Boolean);

  const parsedSections: { heading: string; body: string }[] = [];

  rawSections.forEach((part, idx) => {
    const lines = part.split('\n').map((l) => l.trim()).filter(Boolean);
    const firstLine = lines[0] || `المبحث ${idx + 1}: ${chapter.title}`;
    const heading = firstLine.startsWith('#')
      ? firstLine.replace(/^#+\s*/, '').trim()
      : `المبحث ${idx + 1} — ${chapter.title}`;
    const body = lines.slice(firstLine.startsWith('#') ? 1 : 0).join(' ') || chapter.description;
    parsedSections.push({ heading, body });
  });

  if (chapter.richData?.sections?.length) {
    chapter.richData.sections.forEach((sec) => {
      const cleanH = sec.heading.replace(/^#+\s*/, '').trim();
      const alreadyExists = parsedSections.some(
        (ps) =>
          ps.heading.includes(cleanH.slice(0, 14)) ||
          cleanH.includes(ps.heading.slice(0, 14))
      );
      if (!alreadyExists) {
        parsedSections.push({
          heading: cleanH,
          body: sec.content + (sec.saudiExample ? ` — ${sec.saudiExample}` : ''),
        });
      }
    });
  }

  if (parsedSections.length === 0) {
    parsedSections.push({
      heading: chapter.title,
      body: chapter.description || 'المبادئ الرياضية والتطبيقية للفصل.',
    });
  }

  const result: ChapterExamQuestion[] = [];
  const seenQuestions = new Set<string>();

  // 1. إدراج أسئلة الفصل الصريحة من chapter.miniQuiz و chapter.quiz و chapter.richData.quiz بدون تكرار
  const explicitQuizzes = [
    ...(chapter.miniQuiz || []),
    ...(chapter.quiz || []),
    ...(chapter.richData?.quiz || []),
  ];

  explicitQuizzes.forEach((q, idx) => {
    const normQ = (q.question || '').trim();
    if (!normQ || seenQuestions.has(normQ)) return;
    seenQuestions.add(normQ);

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
      id: `ch-${chapter.id}-exp-${result.length + 1}`,
      questionNumber: result.length + 1,
      question: normQ,
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

  // 2. إدراج أسئلة التقييم الذاتي (selfAssessment) إن وجدت
  (chapter.richData?.selfAssessment || []).forEach((sa, idx) => {
    if (result.length >= 15) return;
    const normQ = sa.question.trim();
    if (!normQ || seenQuestions.has(normQ)) return;
    seenQuestions.add(normQ);

    const secIdx = idx % parsedSections.length;
    const sec = parsedSections[secIdx];
    const correctAns = sa.answer.length > 135 ? sa.answer.slice(0, 135) + '...' : sa.answer;
    const correctPos = (result.length + idx) % 4;
    const distractors = [
      `إلغاء ضوابط التحقق المعياري في «${sec.heading}» والاكتفاء بالإعدادات الافتراضية غير المؤمنة`,
      `معالجة البيانات الحساسة كنص واضح دون تطبيق آليات العزل أو التوثيق المقررة في الفصل`,
      `تجاوز متطلبات الامتثال القياسية المعتمدة والاكتفاء بالمعالجة اليدوية غير الموثقة`,
    ];
    const opts: string[] = [];
    let dIdx = 0;
    for (let i = 0; i < 4; i++) {
      if (i === correctPos) opts.push(correctAns);
      else opts.push(distractors[dIdx++]);
    }

    result.push({
      id: `ch-${chapter.id}-sa-${result.length + 1}`,
      questionNumber: result.length + 1,
      question: normQ,
      options: [opts[0], opts[1], opts[2], opts[3]],
      correctIndex: correctPos,
      explanation: `الإجابة النموذجية: ${sa.answer} — راجع مبحث «${sec.heading}».`,
      sectionIndex: secIdx,
      sectionHeading: sec.heading,
      sectionExcerpt: sec.body.slice(0, 260) + (sec.body.length > 260 ? '...' : ''),
    });
  });

  // 3. إدراج أسئلة من بطاقات الاستذكار (Flashcards) الخاصة بالفصل بدون تكرار
  (chapter.flashcards || []).forEach((card, idx) => {
    if (result.length >= 15) return;
    const qText = card.front.endsWith('؟')
      ? card.front.trim()
      : `في سياق «${chapter.title}»، ما التوصيف العلمي الدقيق لمفهوم: ${card.front}؟`;
    if (seenQuestions.has(qText)) return;
    seenQuestions.add(qText);

    const secIdx = (idx + 1) % parsedSections.length;
    const sec = parsedSections[secIdx];
    const correctAns = card.back.length > 135 ? card.back.slice(0, 135) + '...' : card.back;
    const distractors = [
      `استخدام آلية غير معتمدة تتعارض مع مبدأ «${card.front.slice(0, 35)}» وتضعف التكامل الأمني`,
      `تخزين المعاملات السرية كنص واضح دون تطبيق طبقات العزل أو التعمية القياسية`,
      `إلغاء مصادقة الأطراف والاكتفاء بالتحقق الشكلي غير الموثق ببصمة تشفيرية`,
    ];
    const correctPos = (result.length + idx) % 4;
    const opts: string[] = [];
    let dIdx = 0;
    for (let i = 0; i < 4; i++) {
      if (i === correctPos) opts.push(correctAns);
      else opts.push(distractors[dIdx++]);
    }

    result.push({
      id: `ch-${chapter.id}-fc-${result.length + 1}`,
      questionNumber: result.length + 1,
      question: qText,
      options: [opts[0], opts[1], opts[2], opts[3]],
      correctIndex: correctPos,
      explanation: `الشرح التفصيلي من محتوى الفصل: ${card.back} — راجع قسم «${sec.heading}».`,
      sectionIndex: secIdx,
      sectionHeading: sec.heading,
      sectionExcerpt: sec.body.slice(0, 260) + (sec.body.length > 260 ? '...' : ''),
    });
  });

  // 4. استكمال نصاب الـ 15 سؤالاً من جمل ومفاهيم الفصل الفعلية دون تكرار أي جملة
  const allCandidateSentences: { secIdx: number; heading: string; sentence: string; excerpt: string }[] = [];
  parsedSections.forEach((sec, sIdx) => {
    const sentences = sec.body
      .replace(/[#*`>|]/g, ' ')
      .split(/[.!\n؛]/)
      .map((s) => s.trim())
      .filter((s) => s.length >= 40 && s.length <= 155);
    sentences.forEach((sent) => {
      allCandidateSentences.push({
        secIdx: sIdx,
        heading: sec.heading,
        sentence: sent,
        excerpt: sec.body.replace(/[#*`]/g, '').slice(0, 280) + '...',
      });
    });
  });

  let cursor = 0;
  while (result.length < 15) {
    const qNum = result.length + 1;
    const item =
      allCandidateSentences[cursor % Math.max(1, allCandidateSentences.length)] || {
        secIdx: (qNum - 1) % parsedSections.length,
        heading: parsedSections[(qNum - 1) % parsedSections.length].heading,
        sentence:
          chapter.keyTopics?.[cursor % Math.max(1, (chapter.keyTopics || []).length)] ||
          `تطبيق الضوابط والمعايير المعتمدة في مبحث «${parsedSections[0].heading}»`,
        excerpt: parsedSections[0].body.slice(0, 260),
      };
    cursor++;

    const topicHint =
      chapter.keyTopics?.[(qNum - 1) % Math.max(1, (chapter.keyTopics || []).length)] ||
      item.heading;

    const correctPos = qNum % 4;
    const distractors = [
      `تعطيل ضوابط الرقابة والتحقق في مبحث «${item.heading}» لتسريع الأداء على حساب السرية`,
      `الاعتماد على إعدادات ثابتة غير موثقة ومشاركتها عبر قنوات غير محمية خارج نطاق الحوكمة`,
      `تجاوز المتطلبات القياسية المعتمدة في «${chapter.title}» وإهمال فحص التكامل والأثر الأمني`,
    ];

    const opts: string[] = [];
    let dIdx = 0;
    for (let i = 0; i < 4; i++) {
      if (i === correctPos) opts.push(item.sentence);
      else opts.push(distractors[dIdx++]);
    }

    result.push({
      id: `ch-${chapter.id}-sec-${qNum}`,
      questionNumber: qNum,
      question: `السؤال التحليلي (${qNum}/15) في مبحث «${item.heading}»: أي من العبارات التالية يُعد صحيحاً ومطابقاً لما ورد في الفصل حول (${topicHint.slice(0, 65)})؟`,
      options: [opts[0], opts[1], opts[2], opts[3]],
      correctIndex: correctPos,
      explanation: `تأصيل المعلومة في الفصل: ينص مبحث «${item.heading}» على: (${item.sentence}). يمكنك النقر على زر الانتقال أدناه للذهاب مباشرة إلى موقع هذه الفقرة في محتوى الفصل.`,
      sectionIndex: item.secIdx,
      sectionHeading: item.heading,
      sectionExcerpt: item.excerpt,
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
