import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, GraduationCap, Star, RotateCcw, Award, Maximize2 } from 'lucide-react';
import { findTeamMember } from '@/data/students';
import InteractiveCardStage, { buildWelcomePersona } from '@/components/ui/InteractiveCardStage';

interface Props {
  title: string;
  subtitle: string;
  message: string;
  recipientName: string;
  isTeamMember: boolean;
  academicId?: string;
}

export default function CongratulationCard({
  title,
  subtitle,
  message,
  recipientName,
  isTeamMember,
  academicId,
}: Props) {
  const [flipped, setFlipped] = useState(false);
  const [stageOpen, setStageOpen] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 22,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      mouseX.set(px - 0.5);
      mouseY.set(py - 0.5);
      setGlare({ x: px * 100, y: py * 100 });
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const matchedMember = findTeamMember(academicId) || findTeamMember(recipientName);
  const welcomePersona = buildWelcomePersona({
    fullName: recipientName,
    academicId,
    title,
    subtitle,
    message,
    teamMember: matchedMember,
  });

  const displayAcademicId =
    matchedMember?.academicId || academicId || 'عضوية مِرْصَاد المعتمدة — ISE243';

  return (
    <>
      <div
        className="card-3d-preserve relative w-full max-w-lg mx-auto select-none"
        style={{ perspective: '1800px' }}
      >
        {/* هالة خلفية */}
        <div className="absolute inset-0 -z-10 flex justify-center items-center pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={`w-80 h-80 rounded-full blur-3xl ${
              isTeamMember ? 'bg-amber-500/30' : 'bg-emerald-500/30'
            }`}
          />
        </div>

        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setStageOpen(true)}
          style={{ rotateX, rotateY: rotateYSpring, transformStyle: 'preserve-3d' }}
          className="relative w-full h-[490px] cursor-pointer"
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.75, type: 'spring', stiffness: 90, damping: 16 }}
            className="relative w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* ============ الوجه الأمامي ============ */}
            <div
              className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 shadow-2xl ${
                isTeamMember
                  ? 'bg-gradient-to-br from-amber-600 via-orange-600 to-rose-700 border-amber-300/50 shadow-amber-500/30'
                  : 'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 border-emerald-300/50 shadow-emerald-500/30'
              }`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* إضاءة تفاعلية تتبع الماوس */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.22), transparent 60%)`,
                }}
              />

              <div className="relative h-full flex flex-col items-center justify-between p-6 text-center text-white">
                {/* شريط علوي */}
                <div className="w-full flex items-center justify-between shrink-0">
                  <span className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 backdrop-blur border border-white/25 font-bold">
                    {isTeamMember ? '✧ عضو فريق مِرْصَاد ✧' : '✧ بطاقة ترحيب مِرْصَاد ✧'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStageOpen(true);
                    }}
                    className="text-xs bg-white/15 hover:bg-white/25 backdrop-blur px-3 py-1.5 rounded-xl border border-white/25 flex items-center gap-1.5 transition-colors font-bold"
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> عرض تفاعلي كامل
                  </button>
                </div>

                {/* أيقونة وهوية المنتصف */}
                <div className="flex flex-col items-center my-auto w-full px-2">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center border-2 border-white/40 mb-3 shadow-lg">
                    {isTeamMember ? (
                      <Award className="w-8 h-8 text-white" />
                    ) : (
                      <GraduationCap className="w-8 h-8 text-white" />
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black mb-1 drop-shadow-lg leading-snug">
                    {title}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium opacity-95 mb-3 leading-relaxed">
                    {subtitle}
                  </p>

                  <div className="h-px w-24 bg-white/50 mb-3" />

                  <p className="text-xl sm:text-2xl font-black mb-1.5">{recipientName}</p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 border border-white/30 text-xs font-mono mb-2">
                    <span>الرقم الأكاديمي:</span>
                    <span className="font-bold" dir="ltr">{displayAcademicId}</span>
                  </div>
                  <p className="text-xs opacity-90 font-medium">
                    جامعة الأمير مقرن بن عبدالعزيز · دبلوم أمن المعلومات — شعبة (002م) · ISE243
                  </p>
                </div>

                {/* أزرار أسفل الوجه الأمامي */}
                <div className="w-full flex items-center justify-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFlipped(true);
                    }}
                    className="text-xs bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 rounded-full border border-white/30 flex items-center gap-1.5 transition-colors font-bold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> اقرأ التوصيف والرسالة الكاملة
                  </button>
                </div>
              </div>
            </div>

            {/* ============ الوجه الخلفي (بنفس الإحداثيات تماماً دون أي إزاحة لأسفل) ============ */}
            <div
              className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 shadow-2xl p-6 flex flex-col justify-between ${
                isTeamMember
                  ? 'bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 border-amber-500/40'
                  : 'bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 border-emerald-500/40'
              }`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles
                    className={`w-5 h-5 shrink-0 ${isTeamMember ? 'text-amber-400' : 'text-emerald-400'}`}
                  />
                  <div className="text-right">
                    <span
                      className={`text-xs block font-bold ${
                        isTeamMember ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      بطاقة ترحيب وتوصيف معتمدة — {recipientName}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono" dir="ltr">
                      {displayAcademicId}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setStageOpen(true);
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 shrink-0"
                >
                  <Maximize2 className="w-3 h-3" /> مسرح البطاقة
                </button>
              </div>

              <div className="flex-1 my-2 py-2 overflow-y-auto flex items-center text-right">
                <p className="text-slate-100 leading-relaxed text-sm md:text-base">{message}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
                <div className="flex items-center gap-1">
                  <Star
                    className={`w-3.5 h-3.5 ${isTeamMember ? 'text-amber-500' : 'text-emerald-500'}`}
                  />
                  <span>{new Date().toLocaleDateString('ar-SA')} · ISE243</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlipped(false);
                  }}
                  className="flex items-center gap-1 text-slate-200 hover:text-white font-bold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> العودة للوجه الأمامي
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <InteractiveCardStage
        open={stageOpen}
        student={welcomePersona}
        onClose={() => setStageOpen(false)}
        isWelcomeMode={!matchedMember}
        welcomeBannerTitle={matchedMember ? 'بطاقة عضو فريق مِرْصَاد' : 'بطاقة الترحيب المعتمدة'}
      />
    </>
  );
}
