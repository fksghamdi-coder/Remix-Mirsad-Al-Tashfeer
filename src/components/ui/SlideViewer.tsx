import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Layers,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Box,
  CheckCircle2,
  Printer,
} from 'lucide-react';
import type { SlideGeneric } from '@/data/courses/types';
import type { Chapter } from '@/lib/chapters';
import { cn } from '@/lib/utils';

interface SlideViewerProps {
  url?: string;
  title: string;
  slides?: SlideGeneric[];
  interactiveBook3D?: unknown;
  chapter?: Chapter;
  courseTitle?: string;
  courseCode?: string;
  courseSlug?: string;
}

export default function SlideViewer({
  title,
  slides: explicitSlides = [],
  interactiveBook3D,
  chapter,
  courseTitle = 'منظومة مِرْصَاد الأكاديمية',
  courseCode = 'ISE 243',
}: SlideViewerProps) {
  // استخراج أو إعداد الشرائح ديناميكياً من محتوى الفصل إن لم تكن ممررة بصراحة
  const extractedSlides: SlideGeneric[] = (explicitSlides.length > 0
    ? explicitSlides
    : (chapter?.slides && chapter.slides.length > 0)
    ? chapter.slides
    : (chapter?.content
        ? chapter.content
            .split(/---page---|\n\n(?=## )/)
            .map((chunk, index) => {
              const lines = chunk.trim().split('\n');
              const headerLine = lines.find((l) => l.startsWith('## ')) || lines[0] || `الشريحة ${index + 1}`;
              const slideTitle = headerLine.replace(/^##\s*/, '').trim();
              const bulletLines = lines
                .filter((l) => l.trim().startsWith('- ') || l.trim().startsWith('* '))
                .map((l) => l.replace(/^[-*]\s*/, '').trim());

              return {
                id: `dyn-slide-${chapter.id || index}-${index}`,
                slideNumber: index + 1,
                title: slideTitle,
                bullets: bulletLines.length > 0 ? bulletLines : [chapter.description || 'محتوى توضيحي للفصل للأغراض الأكاديمية.'],
                keyHighlight: chapter.keyTopics?.[index % (chapter.keyTopics.length || 1)] || '',
              };
            })
        : [
            {
              id: 'fallback-slide-1',
              slideNumber: 1,
              title: title,
              bullets: [chapter?.description || 'عرض الشريحة التفاعلي للفصل الدراسي.'],
              keyHighlight: chapter?.keyTopics?.[0] || '',
            },
          ])
  ) as SlideGeneric[];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [viewTab, setViewTab] = useState<'slides3d' | 'book3d' | 'pdf'>('slides3d');
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  // إعادة ضبط مؤشر الشريحة عند تغير الفصل
  useEffect(() => {
    setCurrentIdx(0);
    setActiveStepIdx(0);
  }, [chapter?.id, chapter?.chapter_number]);

  const book3d = (interactiveBook3D || chapter?.interactiveBook3D) as Record<string, unknown> | undefined;
  const steps = (book3d?.stepByStep as Array<Record<string, unknown>>) || [];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 10,
      rotateY: x * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const currentSlide = extractedSlides[currentIdx] || extractedSlides[0];
  const bullets =
    currentSlide?.bullets ||
    currentSlide?.bulletPoints ||
    [];
  const highlight =
    currentSlide?.keyHighlight ||
    currentSlide?.keyTakeaway ||
    currentSlide?.highlightBox ||
    currentSlide?.englishKeyExcerpt ||
    '';

  return (
    <div className="space-y-6" dir="rtl">
      {/* Mode Switcher Header */}
      <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-100 text-sm md:text-base">
              عرض شرائح الفصل والمحاكي الأكاديمي ({courseCode})
            </h3>
            <p className="text-xs text-slate-400">{title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setViewTab('slides3d')}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
              viewTab === 'slides3d'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>الشرائح التفاعلية ({extractedSlides.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setViewTab('book3d')}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
              viewTab === 'book3d'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Box className="w-3.5 h-3.5" />
            <span>محاكي الكتاب الفيزيائي 3D</span>
          </button>

          <button
            type="button"
            onClick={() => setViewTab('pdf')}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer',
              viewTab === 'pdf'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>مرجع PDF المقرر</span>
          </button>
        </div>
      </div>

      {/* 1. Interactive 3D Physics Slides Deck */}
      {viewTab === 'slides3d' && currentSlide && (
        <div className="space-y-4">
          <div
            className="perspective-1000 w-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${chapter?.id || 'ch'}-${currentIdx}`}
                initial={{ opacity: 0, rotateY: -15, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  rotateX: tilt.rotateX,
                  rotateY: tilt.rotateY,
                  scale: 1,
                }}
                exit={{ opacity: 0, rotateY: 15, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className="glass-panel rounded-3xl p-6 md:p-10 border-2 border-blue-500/30 bg-gradient-to-br from-slate-900/95 via-slate-900 to-slate-950 shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col justify-between"
              >
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  {/* Slide Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1.5 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 font-mono text-xs font-black">
                        شريحة {currentSlide.slideNumber || currentIdx + 1} / {extractedSlides.length}
                      </span>
                      {(currentSlide.subtitle || currentSlide.titleEn) && (
                        <span className="text-xs font-mono text-amber-400">
                          {currentSlide.subtitle || currentSlide.titleEn}
                        </span>
                      )}
                    </div>

                    {currentSlide.phoneticHighlight && (
                      <span
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2"
                        dir="ltr"
                      >
                        <span>{currentSlide.phoneticHighlight}</span>
                      </span>
                    )}
                  </div>

                  {/* Slide Title */}
                  <h2 className="text-xl md:text-2xl font-black text-white mb-6 leading-snug">
                    {currentSlide.title}
                  </h2>

                  {/* Slide Bullets */}
                  <ul className="space-y-3 mb-6">
                    {bullets.map((b, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs md:text-sm text-slate-200 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Highlight / Key Takeaway Footer */}
                <div className="space-y-3 pt-4 border-t border-slate-800/80">
                  {highlight && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-transparent border border-amber-500/30 text-xs md:text-sm text-amber-200 leading-relaxed">
                      <span className="font-black text-amber-400 block mb-1">
                        💡 الخلاصة الهندسية والقاعدة المحورية:
                      </span>
                      {highlight}
                    </div>
                  )}

                  {currentSlide.speakerNotes && (
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                      <span className="font-bold text-slate-300">ملاحظات الشرح التطبيقي: </span>
                      {currentSlide.speakerNotes}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 disabled:opacity-40 flex items-center gap-1.5 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
              <span>الشريحة السابقة</span>
            </button>

            <span className="text-xs font-mono text-slate-400 font-bold">
              {currentIdx + 1} / {extractedSlides.length}
            </span>

            <button
              type="button"
              onClick={() => setCurrentIdx((p) => Math.min(extractedSlides.length - 1, p + 1))}
              disabled={currentIdx >= extractedSlides.length - 1}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold disabled:opacity-40 flex items-center gap-1.5 transition-all cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
            >
              <span>الشريحة التالية</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. 3D Physics Simulator View */}
      {viewTab === 'book3d' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-black text-amber-400 text-sm md:text-base flex items-center gap-2">
              <Box className="w-5 h-5" />
              <span>محاكي المنظور ثلاثي الأبعاد للفصل</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">{courseCode}</span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Box className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-white text-base">{title}</h4>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              {chapter?.description || 'محاكاة المنظور الهيكلي التفاعلي المتقدم لمفاهيم الفصل بشكل ثلاثي الأبعاد.'}
            </p>
          </div>

          {steps.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black text-emerald-400">
                المحاكاة المتسلسلة خطوة بخطوة ({steps.length} خطوات)
              </h4>
              <div className="flex flex-wrap gap-2">
                {steps.map((st, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStepIdx(idx)}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer',
                      activeStepIdx === idx
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                    )}
                  >
                    الخطوة {String(st.step || st.stepNumber || idx + 1)}:{' '}
                    {String(st.title || st.titleAr || '')}
                  </button>
                ))}
              </div>
              {steps[activeStepIdx] && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2">
                  <div className="font-bold text-sm text-emerald-300">
                    {String(steps[activeStepIdx].title || steps[activeStepIdx].titleAr || '')}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {String(
                      steps[activeStepIdx].description ||
                        steps[activeStepIdx].descriptionAr ||
                        steps[activeStepIdx].action ||
                        ''
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. Full Native PDF Document View & Print Reference */}
      {viewTab === 'pdf' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 bg-slate-900/90">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">
                  الوثيقة المرجعية الأكاديمية الكاملة (PDF Document View)
                </h3>
                <p className="text-xs text-slate-400">
                  {courseTitle} · {courseCode} · {title}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ كملف PDF</span>
            </button>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6 text-right">
            <div className="border-b border-slate-800 pb-4 space-y-1">
              <span className="text-xs font-mono text-emerald-400 font-bold">{courseCode}</span>
              <h2 className="text-xl font-black text-white">{title}</h2>
              <p className="text-xs text-slate-400">{chapter?.description || 'المرجع الشامل للفصل.'}</p>
            </div>

            <div className="space-y-6">
              {extractedSlides.map((slide, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                    <span className="font-bold text-sm text-emerald-300">
                      قسم {i + 1}: {slide.title}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      صفحة مرجعية {i + 1}
                    </span>
                  </div>

                  <ul className="space-y-2 pr-4 list-disc text-xs text-slate-300 leading-relaxed">
                    {(slide.bullets || slide.bulletPoints || []).map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>

                  {slide.keyHighlight && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs">
                      <strong>القاعدة المرجعية:</strong> {slide.keyHighlight}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
