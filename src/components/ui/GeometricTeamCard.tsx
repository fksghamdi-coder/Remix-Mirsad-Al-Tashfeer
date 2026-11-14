// src/components/ui/GeometricTeamCard.tsx
import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Award, RotateCcw, Maximize2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { StudentPersona, STUDENTS } from '@/data/students';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import InteractiveCardStage, { getCardIdentity } from '@/components/ui/InteractiveCardStage';

interface Props {
  student: StudentPersona;
  index: number;
  onSelect?: (student: StudentPersona) => void;
}

export default function GeometricTeamCard({ student, index, onSelect }: Props) {
  const { session } = useAuth();
  const isAdmin = session?.role === 'admin';
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [localStageStudent, setLocalStageStudent] = useState<StudentPersona | null>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 22,
  });

  const IconComp = (Icons as Record<string, any>)[student.theme.icon] || Sparkles;
  const identity = getCardIdentity(student.id);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      x.set(px - 0.5);
      y.set(py - 0.5);
      setSpotlight({ x: px * 100, y: py * 100 });
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(student);
    } else {
      setLocalStageStudent(student);
    }
  };

  const handleInlineFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped((f) => !f);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: index * 0.05,
          duration: 0.55,
          type: 'spring',
          stiffness: 110,
          damping: 16,
        }}
        className="perspective-1000 h-[395px]"
      >
        <motion.div
          ref={ref}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardClick}
          className="relative w-full h-full cursor-pointer select-none group"
        >
          {/* حاوية القلب ثلاثي الأبعاد بارتفاع ثابت 100% دون أي إزاحة لأسفل */}
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.65, type: 'spring', stiffness: 95, damping: 16 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-full h-full"
          >
            {/* ============ الوجه الأمامي ============ */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden neon-border flex flex-col"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                ['--neon-color' as any]: student.theme.accent,
                border: `1px solid ${student.theme.accent}45`,
              }}
            >
              {/* خلفية متدرجة خاصة بهوية البطاقة */}
              <div className={cn('absolute inset-0 bg-gradient-to-br opacity-25', student.theme.color)} />
              <div className="absolute inset-0 bg-slate-900/92" />

              {/* شبكة هندسية */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id={`grid-${student.id}`} width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke={student.theme.accent} strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${student.id})`} />
              </svg>

              {/* spotlight يتبع الماوس */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, ${student.theme.accent}32, transparent 62%)`,
                }}
              />

              {/* محتوى الوجه الأمامي */}
              <div className="relative p-4 flex flex-col items-center text-center h-full">
                {/* رقم + زر قلب سريع + شارة */}
                <div className="w-full flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-md bg-slate-800/70 border border-slate-700/60">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleInlineFlip}
                      title="قلب البطاقة في مكانها"
                      className="p-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" style={{ color: student.theme.accent }} />
                    </button>
                    <span className="text-xl">{student.badge}</span>
                  </div>
                </div>

                {/* الأفاتار الهندسي (سداسي) */}
                <div className="relative my-1.5">
                  <svg width="84" height="84" viewBox="0 0 100 100" className="drop-shadow-lg">
                    <polygon
                      points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
                      fill={`url(#grad-${student.id})`}
                      stroke={student.theme.accent}
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient id={`grad-${student.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={student.theme.accent} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={student.theme.accent} stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-black text-white drop-shadow-lg">
                      {student.initial}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-2 rounded-full border border-dashed pointer-events-none"
                    style={{ borderColor: student.theme.accent, opacity: 0.3 }}
                  />
                </div>

                {/* الاسم */}
                <h3 className="font-bold text-sm mb-0.5 text-slate-100 leading-tight">
                  {student.name}
                </h3>

                {/* الرقم الأكاديمي الكامل */}
                <p className="text-[11px] font-mono text-slate-300 mb-1.5" dir="ltr">
                  {student.academicId}
                </p>

                {/* اللقب */}
                <div
                  className="px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 mb-1.5"
                  style={{
                    backgroundColor: `${student.theme.accent}20`,
                    color: student.theme.accent,
                    border: `1px solid ${student.theme.accent}40`,
                  }}
                >
                  <IconComp className="w-3 h-3 shrink-0" />
                  <span>{student.title}</span>
                </div>

                {/* التخصص */}
                <p className="text-[10px] text-slate-300 font-medium mb-1">
                  {student.theme.specialty}
                </p>

                {/* طابع البطاقة والاقتباس */}
                <p className="text-[10px] italic text-slate-400 leading-relaxed">
                  «{student.theme.quote}»
                </p>

                {/* شريط التفاعل السفلي */}
                <div className="mt-auto pt-2 w-full flex items-center justify-between gap-2 text-[10px] border-t border-slate-800/70">
                  <span className="text-slate-400 text-right">
                    {identity.characterTag.split('·')[0]}
                  </span>
                  <span
                    className="font-bold flex items-center gap-1 shrink-0 group-hover:translate-x-[-2px] transition-transform"
                    style={{ color: student.theme.accent }}
                  >
                    <Maximize2 className="w-3 h-3" /> عرض تفاعلي
                  </span>
                </div>
              </div>
            </div>

            {/* ============ الوجه الخلفي (بإحداثيات مطابقة تماماً دون أي إزاحة لأسفل) ============ */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden p-5 flex flex-col justify-between bg-slate-900/95"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                border: `1px solid ${student.theme.accent}60`,
                background: `linear-gradient(135deg, var(--bg-surface-1) 0%, ${student.theme.accent}22 100%)`,
              }}
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4" style={{ color: student.theme.accent }} />
                  <span className="text-[11px] font-bold" style={{ color: student.theme.accent }}>
                    التوصيف الأكاديمي للدور
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleInlineFlip}
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                  title="العودة للوجه الأمامي"
                >
                  <RotateCcw className="w-3 h-3" style={{ color: student.theme.accent }} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto text-xs leading-relaxed text-slate-200 my-2.5 pr-1 text-right">
                {student.message}
              </div>

              <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-right">
                  <p className="text-[9px] text-slate-400">التخصص:</p>
                  <p className="text-[11px] font-bold" style={{ color: student.theme.accent }}>
                    {student.theme.specialty}
                  </p>
                </div>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1"
                  style={{
                    backgroundColor: `${student.theme.accent}18`,
                    borderColor: `${student.theme.accent}45`,
                    color: student.theme.accent,
                  }}
                >
                  <Maximize2 className="w-3 h-3" /> شاشة كاملة
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* مسرح البطاقة التفاعلي في حال استُخدم المكون منفرداً بدون onSelect خارجي */}
      {!onSelect && (
        <InteractiveCardStage
          open={Boolean(localStageStudent)}
          student={localStageStudent}
          onClose={() => setLocalStageStudent(null)}
          allStudents={STUDENTS}
          onSelectStudent={setLocalStageStudent}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
}
