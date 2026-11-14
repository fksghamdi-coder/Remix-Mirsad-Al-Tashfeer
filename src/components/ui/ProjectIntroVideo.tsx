import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Maximize2,
  Minimize2,
  Shield,
  History,
  Sparkles,
  GraduationCap,
  Lock,
  CheckCircle2,
  Subtitles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { INTRO_SLIDES, IntroSlide } from '@/data/introVideo';
import { SceneSvg } from '@/components/diagrams/Diagrams';
import { buildIntroArt } from '@/components/diagrams/introScenes';
import { cn } from '@/lib/utils';

interface ProjectIntroVideoProps {
  onComplete?: () => void;
  className?: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  History,
  Sparkles,
  GraduationCap,
  Lock
};

export default function ProjectIntroVideo({ onComplete, className }: ProjectIntroVideoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);
  const currentSlide: IntroSlide = INTRO_SLIDES[currentIndex] || INTRO_SLIDES[0];
  const CurrentIcon = ICON_MAP[currentSlide.icon] || Shield;

  const goToSlide = (nextIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(INTRO_SLIDES.length - 1, nextIndex));
    progressRef.current = 0;
    setProgress(0);
    setCurrentIndex(clampedIndex);
  };

  // Sequential playback timer (1 -> 2 -> 3 -> 4 -> 5) safe under React 19 StrictMode
  useEffect(() => {
    if (!isPlaying) return;

    const slideDurationMs = Math.max(1000, currentSlide.duration * 1000);
    const stepTimeMs = 50;
    let localProgress = progressRef.current;
    let advanced = false;

    const interval = window.setInterval(() => {
      if (advanced) return;
      localProgress += (stepTimeMs / slideDurationMs) * 100;

      if (localProgress >= 100) {
        advanced = true;
        window.clearInterval(interval);

        if (currentIndex < INTRO_SLIDES.length - 1) {
          progressRef.current = 0;
          setProgress(0);
          setCurrentIndex(currentIndex + 1);
        } else {
          progressRef.current = 100;
          setProgress(100);
          setIsPlaying(false);
          if (onComplete) onComplete();
        }
      } else {
        progressRef.current = localProgress;
        setProgress(localProgress);
      }
    }, stepTimeMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPlaying, currentIndex, currentSlide.duration, onComplete]);

  const handleTogglePlay = () => {
    if (!isPlaying && currentIndex >= INTRO_SLIDES.length - 1 && progressRef.current >= 100) {
      progressRef.current = 0;
      setProgress(0);
      setCurrentIndex(0);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    if (currentIndex < INTRO_SLIDES.length - 1) {
      goToSlide(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    progressRef.current = 0;
    setProgress(0);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={cn(
        'relative rounded-3xl overflow-hidden glass-panel card-3d-neon border border-emerald-500/35 bg-slate-950 flex flex-col justify-between select-none transition-all duration-300 active:scale-[0.995] active:ring-2 active:ring-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/60',
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'min-h-[480px] md:min-h-[540px]',
        className
      )}
    >
      {/* Animated Glowing Dynamic Background */}
      <div className={cn('absolute inset-0 bg-gradient-to-br transition-all duration-1000', currentSlide.bgGradient)} />
      
      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />

      {/* Floating Particles / Ambient Glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: currentSlide.accentColor + '30' }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: currentSlide.accentColor + '20' }}
      />

      {/* Top Bar / Slide Header */}
      <div className="relative z-10 p-4 md:p-6 flex items-center justify-between border-b border-emerald-500/25 bg-slate-950/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 icon-glass-3d transition-colors"
            style={{
              backgroundColor: currentSlide.accentColor + '18',
              borderColor: currentSlide.accentColor + '55',
              color: currentSlide.accentColor
            }}
          >
            <CurrentIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">
              عرض تقديمي تفاعلي • الشريحة {currentIndex + 1} من {INTRO_SLIDES.length}
            </span>
            <span className="text-xs md:text-sm font-bold text-slate-200">
              {currentSlide.badge}
            </span>
          </div>
        </div>

        {/* Quick Slide Selectors (1 -> 5) */}
        <div className="flex items-center gap-1.5">
          {INTRO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              className={cn(
                'no-3d h-2 rounded-full transition-all duration-300',
                idx === currentIndex
                  ? 'w-8 bg-emerald-400 shadow-[0_0_10px_#10b981]'
                  : idx < currentIndex
                  ? 'w-2 bg-emerald-600/70'
                  : 'w-2 bg-slate-700/80 hover:bg-slate-500'
              )}
              title={`${idx + 1}. ${slide.title}`}
            />
          ))}
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="relative z-10 flex-1 p-6 md:p-10 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Left Content (Text & Key Points) */}
            <div className="lg:col-span-7 space-y-4">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-block px-3 py-1 rounded-full text-xs font-bold border neon-border"
                style={{
                  color: currentSlide.accentColor,
                  backgroundColor: currentSlide.accentColor + '15',
                  borderColor: currentSlide.accentColor + '40'
                }}
              >
                {currentSlide.badge}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
              >
                {currentSlide.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base text-emerald-300 font-medium"
              >
                {currentSlide.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl"
              >
                {currentSlide.description}
              </motion.p>

              {/* Key points list */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-2 pt-2"
              >
                {currentSlide.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-200">
                    <span className="icon-glass-badge w-5 h-5 shrink-0 mt-0.5">
                      <CheckCircle2
                        className="w-3.5 h-3.5"
                        style={{ color: currentSlide.accentColor }}
                      />
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </motion.div>

              {/* Optional Quick Stats */}
              {currentSlide.stats && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800/80"
                >
                  {currentSlide.stats.map((st, i) => (
                    <div key={i} className="p-2.5 rounded-xl card-3d-neon text-center">
                      <div className="text-base md:text-lg font-black text-white">{st.value}</div>
                      <div className="text-[10px] md:text-xs text-slate-400">{st.label}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

                {/* Right Media / Abstract SVG Scene Frame with Glowing Effects */}
                <div className="lg:col-span-5 flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden card-3d-neon p-1 bg-slate-900/80 backdrop-blur-sm group"
                    style={{
                      borderColor: currentSlide.accentColor + '65',
                    }}
                  >
                    <SceneSvg scene={buildIntroArt(currentSlide.artId, currentSlide.accentColor)} />

                    {/* Subtitle overlay if enabled */}
                    {showSubtitles && (
                      <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg card-3d-neon text-[11px] text-emerald-300 text-center font-medium leading-relaxed">
                        {currentSlide.subtitle}
                      </div>
                    )}
                  </motion.div>
                </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Control Bar (Selector 9) */}
      <div className="relative z-10 m-3 mt-0 rounded-2xl card-3d-neon bg-slate-950/90 backdrop-blur-md p-3 md:p-4 space-y-2.5">
        {/* Progress Bar */}
        <div
          className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden cursor-pointer relative border border-emerald-500/30 shadow-inner"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const isRtl = window.getComputedStyle(e.currentTarget).direction === 'rtl';
            const rawPct = isRtl
              ? ((rect.right - e.clientX) / rect.width) * 100
              : ((e.clientX - rect.left) / rect.width) * 100;
            const newPct = Math.max(0, Math.min(99, rawPct));
            progressRef.current = newPct;
            setProgress(newPct);
          }}
        >
          <motion.div
            className="h-full rounded-full transition-all duration-75"
            style={{
              width: `${progress}%`,
              backgroundColor: currentSlide.accentColor,
              boxShadow: `0 0 12px ${currentSlide.accentColor}`
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Left Controls: Play, Prev, Next, Restart, Sequential 1..5 steps */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="p-2 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold shadow-[0_0_15px_#10b981] transition-all"
              title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل متسلسل'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all"
              title="إعادة التشغيل المتسلسل من المقطع 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-slate-800 mx-1" />

            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 disabled:opacity-40 transition-all"
              title="المقطع السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Sequential Step Indicators 1 -> 5 */}
            <div className="hidden sm:flex items-center gap-1 px-1.5 py-1 rounded-xl bg-slate-900/90 border border-slate-800/80" dir="ltr">
              {INTRO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentIndex;
                const isCompleted = idx < currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={cn(
                      'w-6 h-6 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center justify-center',
                      isActive
                        ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_#10b981]'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    )}
                    title={`المقطع ${idx + 1}: ${slide.title}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === INTRO_SLIDES.length - 1}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 disabled:opacity-40 transition-all"
              title="المقطع التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-emerald-400/90 font-bold sm:hidden mr-1" dir="ltr">
              {currentIndex + 1} / {INTRO_SLIDES.length}
            </span>
          </div>

          {/* Right Controls: Subtitles, Mute, Fullscreen */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={cn(
                'p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all',
                showSubtitles
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              )}
              title="ترجمة الشريحة"
            >
              <Subtitles className="w-4 h-4" />
              <span className="hidden md:inline">التسميات التوضيحية</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all"
              title="ملء الشاشة"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
