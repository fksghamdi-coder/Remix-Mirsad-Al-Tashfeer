// src/components/ui/InteractiveCardStage.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  Award,
  RotateCcw,
  X,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  GraduationCap,
  Columns2,
  Layers,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { StudentPersona } from '@/data/students';

export interface CardIdentityStyle {
  /** خلفية الشاشة الهادئة الخاصة بهوية البطاقة */
  calmBgGradient: string;
  /** هالة ضوئية أولى */
  auraPrimary: string;
  /** هالة ضوئية ثانية */
  auraSecondary: string;
  /** طابع الهوية الفريد للبطاقة */
  characterTag: string;
  /** وصف الروح البصرية للبطاقة */
  atmosphereLabel: string;
  /** نمط الخلفية الهندسي */
  patternType:
    | 'cipher-grid'
    | 'ledger-waves'
    | 'radar-rings'
    | 'network-nodes'
    | 'quantum-lattice'
    | 'compass-orbit'
    | 'privacy-shield'
    | 'crystal-prism'
    | 'precision-matrix'
    | 'lab-waveform'
    | 'royal-welcome';
}

/**
 * هوية بصرية هادئة ومستقلة لكل بطاقة من البطاقات العشر + بطاقة الترحيب بالحساب الجديد
 */
export const CARD_IDENTITIES: Record<number, CardIdentityStyle> = {
  1: {
    calmBgGradient: 'radial-gradient(ellipse at 25% 20%, rgba(30, 58, 138, 0.55) 0%, rgba(15, 23, 42, 0.94) 55%, rgba(2, 6, 23, 0.98) 100%)',
    auraPrimary: 'rgba(59, 130, 246, 0.22)',
    auraSecondary: 'rgba(99, 102, 241, 0.16)',
    characterTag: 'طابع هندسي معماري · بنية التشفير القياسي',
    atmosphereLabel: 'أفق الياقوت الأزرق ومصفوفات AES',
    patternType: 'cipher-grid',
  },
  2: {
    calmBgGradient: 'radial-gradient(ellipse at 75% 25%, rgba(19, 78, 74, 0.55) 0%, rgba(15, 23, 42, 0.94) 55%, rgba(2, 6, 23, 0.98) 100%)',
    auraPrimary: 'rgba(20, 184, 166, 0.22)',
    auraSecondary: 'rgba(16, 185, 129, 0.16)',
    characterTag: 'طابع توثيقي منهجي · ذاكرة المشروع الموثقة',
    atmosphereLabel: 'سكون الفيروز وسجلات النزاهة',
    patternType: 'ledger-waves',
  },
  3: {
    calmBgGradient: 'radial-gradient(ellipse at 30% 75%, rgba(120, 53, 15, 0.52) 0%, rgba(15, 23, 42, 0.94) 55%, rgba(2, 6, 23, 0.98) 100%)',
    auraPrimary: 'rgba(245, 158, 11, 0.22)',
    auraSecondary: 'rgba(234, 88, 12, 0.15)',
    characterTag: 'طابع رصدي استباقي · يقظة الأمن السيبراني',
    atmosphereLabel: 'شفق العنبر ومدارات الاستشعار المبكر',
    patternType: 'radar-rings',
  },
  4: {
    calmBgGradient: 'radial-gradient(ellipse at 70% 30%, rgba(22, 78, 99, 0.55) 0%, rgba(15, 23, 42, 0.94) 55%, rgba(2, 6, 23, 0.98) 100%)',
    auraPrimary: 'rgba(6, 182, 212, 0.22)',
    auraSecondary: 'rgba(37, 99, 235, 0.16)',
    characterTag: 'طابع شبكي تكاملي · تناغم البروتوكولات',
    atmosphereLabel: 'هدوء المحيط السياني وجسور الترابط',
    patternType: 'network-nodes',
  },
  5: {
    calmBgGradient: 'radial-gradient(ellipse at 25% 70%, rgba(136, 19, 55, 0.50) 0%, rgba(15, 23, 42, 0.94) 55%, rgba(2, 6, 23, 0.98) 100%)',
    auraPrimary: 'rgba(244, 63, 94, 0.20)',
    auraSecondary: 'rgba(236, 72, 153, 0.15)',
    characterTag: 'طابع ابتكاري كمومي · حلول ما بعد الكم',
    atmosphereLabel: 'سديم الياقوت الوردي وشبكات الكم',
    patternType: 'quantum-lattice',
  },
  6: {
    calmBgGradient: 'radial-gradient(ellipse at 65% 20%, rgba(49, 46, 129, 0.58) 0%, rgba(15, 23, 42, 0.94) 55%, rgba(2, 6, 23, 0.98) 100%)',
    auraPrimary: 'rgba(99, 102, 241, 0.22)',
    auraSecondary: 'rgba(59, 130, 246, 0.16)',
    characterTag: 'طابع قيادي استراتيجي · بوصلة الرؤية الشاملة',
    atmosphereLabel: 'سكون النيلة الملكية ومدارات الحوكمة',
    patternType: 'compass-orbit',
  },
  7: {
    calmBgGradient: 'radial-gradient(ellipse at 35% 25%, rgba(6, 78, 59, 0.58) 0%, rgba(15, 23, 42, 0.94) 55%, rgba(2, 6, 23, 0.98) 100%)',
    auraPrimary: 'rgba(16, 185, 129, 0.22)',
    auraSecondary: 'rgba(20, 184, 166, 0.16)',
    characterTag: 'طابع خصوصية وأمان · درع الثقة الرقمية',
    atmosphereLabel: 'واحة الزمرد الهادئة وحجب المعرفة الصفرية',
    patternType: 'privacy-shield',
  },
  8: {
    calmBgGradient: 'radial-gradient(ellipse at 75% 70%, rgba(76, 29, 149, 0.55) 0%, rgba(15, 23, 42, 0.94) 55%, rgba(2, 6, 23, 0.98) 100%)',
    auraPrimary: 'rgba(139, 92, 246, 0.22)',
    auraSecondary: 'rgba(168, 85, 247, 0.16)',
    characterTag: 'طابع إبداعي بصري · جماليات التجربة الأكاديمية',
    atmosphereLabel: 'أطياف الجمشت البنفسجي وتناغم التصميم',
    patternType: 'crystal-prism',
  },
  9: {
    calmBgGradient: 'radial-gradient(ellipse at 30% 30%, rgba(30, 41, 59, 0.72) 0%, rgba(15, 23, 42, 0.95) 55%, rgba(2, 6, 23, 0.98) 100%)',
    auraPrimary: 'rgba(148, 163, 184, 0.22)',
    auraSecondary: 'rgba(56, 189, 248, 0.14)',
    characterTag: 'طابع تدقيقي معياري · إتقان التفاصيل والجودة',
    atmosphereLabel: 'صفاء التيتانيوم الفضي وميزان الدقة',
    patternType: 'precision-matrix',
  },
  10: {
    calmBgGradient: 'radial-gradient(ellipse at 70% 25%, rgba(112, 26, 117, 0.52) 0%, rgba(15, 23, 42, 0.94) 55%, rgba(2, 6, 23, 0.98) 100%)',
    auraPrimary: 'rgba(217, 70, 239, 0.22)',
    auraSecondary: 'rgba(147, 51, 234, 0.16)',
    characterTag: 'طابع مختبري تحليلي · التحقق والاعتمادية',
    atmosphereLabel: 'طيف الأوركيد الهادئ وموجات الاختبار',
    patternType: 'lab-waveform',
  },
};

export const WELCOME_CARD_IDENTITY: CardIdentityStyle = {
  calmBgGradient:
    'radial-gradient(ellipse at 50% 20%, rgba(6, 95, 70, 0.58) 0%, rgba(30, 41, 59, 0.94) 55%, rgba(2, 6, 23, 0.98) 100%)',
  auraPrimary: 'rgba(16, 185, 129, 0.24)',
  auraSecondary: 'rgba(245, 158, 11, 0.18)',
  characterTag: 'بطاقة عضوية ترحيبية · منظومة مِرْصَاد التشفير',
  atmosphereLabel: 'أفق الزمرد والذهب الترحيبي',
  patternType: 'royal-welcome',
};

export function getCardIdentity(studentId?: number): CardIdentityStyle {
  if (studentId && CARD_IDENTITIES[studentId]) {
    return CARD_IDENTITIES[studentId];
  }
  return WELCOME_CARD_IDENTITY;
}

/**
 * تحويل بيانات مستخدم جديد أو بطاقة تهنئة إلى StudentPersona متكاملة للعرض بنفس التأثير التفاعلي
 */
export function buildWelcomePersona(params: {
  fullName: string;
  academicId?: string;
  username?: string;
  title?: string;
  subtitle?: string;
  message?: string;
  teamMember?: StudentPersona;
}): StudentPersona {
  if (params.teamMember) {
    return params.teamMember;
  }
  const cleanName = (params.fullName || 'عضو مِرْصَاد الجديد').trim();
  const initial = cleanName.charAt(0) || 'م';
  return {
    id: 0,
    name: cleanName,
    academicId: params.academicId || 'ISE243-NEW',
    username: params.username || 'member',
    initial,
    title: params.title || 'طالب دبلوم أمن المعلومات — شعبة (002م)',
    message:
      params.message ||
      `بطاقة التعريف الأكاديمي لـ ${cleanName} ضمن مشروع مقرر التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — شعبة (002م) — السنة الأكاديمية (2026-2027) — جامعة الأمير مقرن بن عبدالعزيز.`,
    theme: {
      color: 'from-emerald-500 to-amber-500',
      accent: '#10b981',
      icon: 'ShieldCheck',
      quote: 'تطبيق المعايير الرسمية والأكاديمية الموثقة في الأمن السيبراني والتشفير المتقدم.',
      specialty: params.subtitle || 'الأمن السيبراني والتشفير المتقدم — ISE243',
    },
    badge: '🌟',
    chapterFocus: [1, 2, 11],
  };
}

/**
 * رسم هندسي هادئ في خلفية الشاشة يعكس هوية البطاقة المختارة
 */
function IdentityAmbientArtwork({
  pattern,
  accent,
}: {
  pattern: CardIdentityStyle['patternType'];
  accent: string;
}) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14]"
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="stage-fade" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
          <stop offset="65%" stopColor={accent} stopOpacity="0.12" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <pattern id={`calm-grid-${pattern}`} width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke={accent} strokeWidth="0.6" strokeOpacity="0.35" />
          <circle cx="30" cy="30" r="1.2" fill={accent} fillOpacity="0.35" />
        </pattern>
      </defs>

      <rect width="1200" height="800" fill={`url(#calm-grid-${pattern})`} />
      <circle cx="600" cy="400" r="420" fill="url(#stage-fade)" />

      {pattern === 'cipher-grid' && (
        <g stroke={accent} strokeOpacity="0.45" strokeWidth="1.2">
          <polygon points="600,90 870,245 870,555 600,710 330,555 330,245" />
          <polygon points="600,160 810,280 810,520 600,640 390,520 390,280" strokeDasharray="8 6" />
          <rect x="460" y="260" width="280" height="280" rx="24" strokeOpacity="0.3" />
        </g>
      )}

      {pattern === 'ledger-waves' && (
        <g stroke={accent} strokeOpacity="0.4" strokeWidth="1.5">
          {[180, 260, 340, 420, 500, 580].map((y, idx) => (
            <path
              key={idx}
              d={`M 100 ${y} Q 350 ${y - 45} 600 ${y} T 1100 ${y}`}
              strokeDasharray={idx % 2 === 0 ? undefined : '6 6'}
            />
          ))}
        </g>
      )}

      {pattern === 'radar-rings' && (
        <g stroke={accent} strokeOpacity="0.4" strokeWidth="1.2">
          {[140, 220, 300, 380].map((r) => (
            <circle key={r} cx="600" cy="400" r={r} strokeDasharray={r % 160 === 0 ? '10 8' : undefined} />
          ))}
          <line x1="200" y1="400" x2="1000" y2="400" strokeOpacity="0.25" />
          <line x1="600" y1="40" x2="600" y2="760" strokeOpacity="0.25" />
        </g>
      )}

      {pattern === 'network-nodes' && (
        <g stroke={accent} strokeOpacity="0.4" strokeWidth="1.2">
          <line x1="280" y1="220" x2="600" y2="150" />
          <line x1="600" y1="150" x2="920" y2="220" />
          <line x1="280" y1="220" x2="340" y2="560" />
          <line x1="920" y1="220" x2="860" y2="560" />
          <line x1="340" y1="560" x2="600" y2="660" />
          <line x1="860" y1="560" x2="600" y2="660" />
          {[
            [280, 220],
            [600, 150],
            [920, 220],
            [340, 560],
            [860, 560],
            [600, 660],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="10" fill={accent} fillOpacity="0.25" />
          ))}
        </g>
      )}

      {pattern === 'quantum-lattice' && (
        <g stroke={accent} strokeOpacity="0.4" strokeWidth="1.2">
          <polygon points="600,80 940,400 600,720 260,400" />
          <polygon points="600,150 860,400 600,650 340,400" strokeDasharray="6 6" />
          <circle cx="600" cy="400" r="240" strokeOpacity="0.3" />
        </g>
      )}

      {pattern === 'compass-orbit' && (
        <g stroke={accent} strokeOpacity="0.42" strokeWidth="1.2">
          <circle cx="600" cy="400" r="320" />
          <circle cx="600" cy="400" r="250" strokeDasharray="4 8" />
          <polygon points="600,90 635,365 910,400 635,435 600,710 565,435 290,400 565,365" strokeOpacity="0.3" />
        </g>
      )}

      {pattern === 'privacy-shield' && (
        <g stroke={accent} strokeOpacity="0.42" strokeWidth="1.4">
          <path d="M600 100 L860 210 V410 C860 565 745 675 600 725 C455 675 340 565 340 410 V210 Z" />
          <path
            d="M600 160 L800 245 V405 C800 525 710 615 600 660 C490 615 400 525 400 405 V245 Z"
            strokeDasharray="8 6"
          />
        </g>
      )}

      {pattern === 'crystal-prism' && (
        <g stroke={accent} strokeOpacity="0.42" strokeWidth="1.2">
          <polygon points="600,100 900,580 300,580" />
          <polygon points="600,700 900,220 300,220" strokeDasharray="6 6" />
          <circle cx="600" cy="400" r="280" strokeOpacity="0.25" />
        </g>
      )}

      {pattern === 'precision-matrix' && (
        <g stroke={accent} strokeOpacity="0.42" strokeWidth="1.2">
          <rect x="280" y="140" width="640" height="520" rx="32" />
          <rect x="340" y="200" width="520" height="400" rx="20" strokeDasharray="10 6" />
          <circle cx="600" cy="400" r="180" />
        </g>
      )}

      {pattern === 'lab-waveform' && (
        <g stroke={accent} strokeOpacity="0.42" strokeWidth="1.5">
          <path d="M 120 400 C 260 220, 380 580, 520 400 C 660 220, 780 580, 920 400 C 1000 300, 1060 450, 1120 400" />
          <circle cx="600" cy="400" r="290" strokeDasharray="8 8" />
        </g>
      )}

      {pattern === 'royal-welcome' && (
        <g stroke={accent} strokeOpacity="0.45" strokeWidth="1.3">
          <circle cx="600" cy="400" r="340" />
          <circle cx="600" cy="400" r="270" strokeDasharray="8 6" />
          <polygon points="600,90 870,245 870,555 600,710 330,555 330,245" />
          <polygon points="600,150 820,275 820,525 600,650 380,525 380,275" stroke="#f59e0b" strokeOpacity="0.35" />
        </g>
      )}
    </svg>
  );
}

interface InteractiveCardStageProps {
  open: boolean;
  student: StudentPersona | null;
  onClose: () => void;
  /** قائمة البطاقات للتنقل بينها إن وجدت */
  allStudents?: StudentPersona[];
  onSelectStudent?: (student: StudentPersona) => void;
  /** هل المستخدم أدمن لعرض الرقم الأكاديمي كاملاً */
  isAdmin?: boolean;
  /** وضع الترحيب بحساب جديد */
  isWelcomeMode?: boolean;
  welcomeBannerTitle?: string;
  welcomeBannerSubtitle?: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export default function InteractiveCardStage({
  open,
  student,
  onClose,
  allStudents,
  onSelectStudent,
  isAdmin = false,
  isWelcomeMode = false,
  welcomeBannerTitle,
  welcomeBannerSubtitle,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
}: InteractiveCardStageProps) {
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'3d-flip' | 'side-by-side'>('3d-flip');
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 220,
    damping: 24,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 220,
    damping: 24,
  });

  useEffect(() => {
    setFlipped(false);
  }, [student?.id, student?.name]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && viewMode === '3d-flip') {
        e.preventDefault();
        setFlipped((f) => !f);
      }
      if (allStudents && allStudents.length > 1 && student && onSelectStudent) {
        const idx = allStudents.findIndex((s) => s.id === student.id && s.name === student.name);
        if (e.key === 'ArrowLeft' && idx >= 0) {
          onSelectStudent(allStudents[(idx + 1) % allStudents.length]);
        } else if (e.key === 'ArrowRight' && idx >= 0) {
          onSelectStudent(allStudents[(idx - 1 + allStudents.length) % allStudents.length]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, allStudents, student, onSelectStudent, viewMode]);

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
    setGlare({ x: 50, y: 50 });
  }, [mouseX, mouseY]);

  if (typeof document === 'undefined' || !student) return null;

  const identity = isWelcomeMode && student.id === 0 ? WELCOME_CARD_IDENTITY : getCardIdentity(student.id);
  const IconComp = (Icons as Record<string, any>)[student.theme.icon] || Sparkles;

  const currentIndex =
    allStudents && allStudents.length > 1
      ? allStudents.findIndex((s) => s.id === student.id && s.name === student.name)
      : -1;

  const handlePrev = () => {
    if (!allStudents || !onSelectStudent || currentIndex < 0) return;
    onSelectStudent(allStudents[(currentIndex - 1 + allStudents.length) % allStudents.length]);
  };

  const handleNext = () => {
    if (!allStudents || !onSelectStudent || currentIndex < 0) return;
    onSelectStudent(allStudents[(currentIndex + 1) % allStudents.length]);
  };

  const displayAcademicId =
    !student.academicId || student.academicId === 'ISE243-NEW'
      ? 'عضوية مِرْصَاد المعتمدة — ISE243'
      : student.academicId;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="interactive-card-stage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="card-stage-portal fixed inset-0 z-[120] flex flex-col items-center justify-between p-3 sm:p-5 overflow-y-auto select-none"
          dir="rtl"
          style={{
            background: identity.calmBgGradient,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
          onClick={onClose}
        >
          {/* هالات ضوئية هادئة تمثل هوية البطاقة المختارة */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            <motion.div
              key={`aura-1-${student.id}-${student.name}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.65, 0.9, 0.65] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-24 right-1/4 w-[480px] h-[480px] rounded-full blur-[110px]"
              style={{ background: identity.auraPrimary }}
            />
            <motion.div
              key={`aura-2-${student.id}-${student.name}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.55, 0.85, 0.55] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-24 left-1/4 w-[520px] h-[520px] rounded-full blur-[120px]"
              style={{ background: identity.auraSecondary }}
            />
            <IdentityAmbientArtwork pattern={identity.patternType} accent={student.theme.accent} />
          </div>

          {/* الشريط العلوي للهوية والتحكم */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 z-10 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-lg border"
                style={{
                  backgroundColor: `${student.theme.accent}22`,
                  borderColor: `${student.theme.accent}55`,
                  color: student.theme.accent,
                }}
              >
                {student.badge}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: `${student.theme.accent}18`,
                      borderColor: `${student.theme.accent}45`,
                      color: student.theme.accent,
                    }}
                  >
                    {identity.characterTag}
                  </span>
                  {currentIndex >= 0 && allStudents && (
                    <span className="text-xs font-mono text-slate-400">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(allStudents.length).padStart(2, '0')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300/90 mt-1">{identity.atmosphereLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode((m) => (m === '3d-flip' ? 'side-by-side' : '3d-flip'))}
                className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all bg-slate-900/75 hover:bg-slate-800/90 text-slate-200 border-slate-700/80"
                title="تبديل نمط العرض"
              >
                {viewMode === '3d-flip' ? (
                  <>
                    <Columns2 className="w-3.5 h-3.5" style={{ color: student.theme.accent }} />
                    <span>عرض الوجهين معاً</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-3.5 h-3.5" style={{ color: student.theme.accent }} />
                    <span>البطاقة التفاعلية 3D</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2.5 rounded-xl bg-slate-900/75 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-700/80 hover:border-rose-500/40 transition-all"
                aria-label="إغلاق عرض البطاقة"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* عنوان الترحيب الاختياري عند فتح حساب جديد */}
          {isWelcomeMode && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-center max-w-xl mx-auto my-1.5 z-10 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{welcomeBannerTitle || 'أهلاً بك في مِرْصَاد التشفير'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow">
                بطاقة الترحيب الخاصة بـ <span style={{ color: student.theme.accent }}>{student.name}</span>
              </h2>
              {welcomeBannerSubtitle && (
                <p className="text-xs text-slate-300 mt-0.5">{welcomeBannerSubtitle}</p>
              )}
            </motion.div>
          )}

          {/* مسرح البطاقة التفاعلي في المنتصف — بدون أي إزاحة لأسفل عند القلب */}
          <div
            className="relative flex-1 flex items-center justify-center w-full max-w-5xl my-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* زر السابق */}
            {allStudents && allStudents.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900/75 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all shrink-0 ml-4 shadow-xl"
                aria-label="البطاقة السابقة"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <AnimatePresence mode="wait">
              {viewMode === '3d-flip' ? (
                <motion.div
                  key={`stage-3d-${student.id}-${student.name}`}
                  initial={{ opacity: 0, scale: 0.86, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 16 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 120, damping: 18 }}
                  className="w-full max-w-[450px]"
                  style={{ perspective: '1600px' }}
                >
                  <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setFlipped((f) => !f)}
                    style={{
                      rotateX,
                      rotateY: rotateYSpring,
                      transformStyle: 'preserve-3d',
                    }}
                    className="relative w-full h-[540px] cursor-pointer"
                  >
                    {/* الحاوية الدوارة: الوجهان الأمامي والخلفي متطابقان في نفس الإحداثيات (inset-0) فلا تنزاح البطاقة لأسفل أبداً */}
                    <motion.div
                      animate={{ rotateY: flipped ? 180 : 0 }}
                      transition={{ duration: 0.75, type: 'spring', stiffness: 90, damping: 16 }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="relative w-full h-full"
                    >
                      {/* ============ الوجه الأمامي للبطاقة ============ */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden p-6 flex flex-col items-center justify-between text-center border-2 shadow-2xl"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          borderColor: `${student.theme.accent}66`,
                          background: `linear-gradient(155deg, rgba(15, 23, 42, 0.94) 0%, rgba(2, 6, 23, 0.97) 65%, ${student.theme.accent}28 100%)`,
                          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.75), 0 0 35px ${student.theme.accent}33`,
                        }}
                      >
                        {/* إضاءة تفاعلية تتبع المؤشر */}
                        <div
                          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${student.theme.accent}35, transparent 62%)`,
                          }}
                        />

                        {/* شريط علوي داخل البطاقة */}
                        <div className="relative w-full flex items-center justify-between shrink-0">
                          <span
                            className="text-xs font-mono px-2.5 py-1 rounded-lg border"
                            style={{
                              backgroundColor: `${student.theme.accent}15`,
                              borderColor: `${student.theme.accent}40`,
                              color: student.theme.accent,
                            }}
                          >
                            {student.id > 0 ? `#${String(student.id).padStart(2, '0')}` : 'WELCOME'}
                          </span>
                          <span className="text-xs text-slate-300 flex items-center gap-1 font-medium">
                            <ShieldCheck className="w-3.5 h-3.5" style={{ color: student.theme.accent }} />
                            مِرْصَاد التشفير · ISE243
                          </span>
                          <span className="text-2xl">{student.badge}</span>
                        </div>

                        {/* المحتوى الأوسط الكامل للوجه الأمامي */}
                        <div className="relative flex flex-col items-center justify-center my-auto w-full px-1">
                          {/* الشعار الهندسي السداسي في الوسط */}
                          <div className="relative my-1.5">
                            <svg width="102" height="102" viewBox="0 0 100 100" className="drop-shadow-xl">
                              <defs>
                                <linearGradient id={`stage-hex-${student.id}`} x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor={student.theme.accent} stopOpacity="0.95" />
                                  <stop offset="100%" stopColor={student.theme.accent} stopOpacity="0.45" />
                                </linearGradient>
                              </defs>
                              <polygon
                                points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
                                fill={`url(#stage-hex-${student.id})`}
                                stroke={student.theme.accent}
                                strokeWidth="2.2"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-3xl font-black text-white drop-shadow-md">
                                {student.initial}
                              </span>
                            </div>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                              className="absolute -inset-2 rounded-full border border-dashed pointer-events-none"
                              style={{ borderColor: student.theme.accent, opacity: 0.45 }}
                            />
                          </div>

                          {/* اسم صاحب البطاقة */}
                          <h3 className="relative text-xl font-black text-white mt-2 mb-1 tracking-tight leading-snug">
                            {student.name}
                          </h3>

                          {/* الرقم الأكاديمي الكامل */}
                          <div className="relative inline-flex items-center gap-1.5 px-3 py-0.5 rounded-lg bg-slate-900/80 border border-slate-700/80 mb-2.5">
                            <span className="text-[11px] text-slate-400">الرقم الأكاديمي:</span>
                            <span className="text-xs font-mono font-bold text-slate-200" dir="ltr">
                              {displayAcademicId}
                            </span>
                          </div>

                          {/* اللقب */}
                          <div
                            className="relative px-3.5 py-1.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 mb-2.5 max-w-full"
                            style={{
                              backgroundColor: `${student.theme.accent}22`,
                              color: student.theme.accent,
                              border: `1px solid ${student.theme.accent}50`,
                            }}
                          >
                            <IconComp className="w-3.5 h-3.5 shrink-0" />
                            <span className="leading-relaxed">{student.title}</span>
                          </div>

                          {/* التخصص والاقتباس */}
                          <p className="relative text-xs text-slate-200 font-semibold mb-1.5 leading-relaxed">
                            {student.theme.specialty}
                          </p>
                          <p className="relative text-xs italic text-slate-300/90 leading-relaxed max-w-sm">
                            «{student.theme.quote}»
                          </p>
                        </div>

                        {/* زر التفاعل في أسفل الوجه الأمامي */}
                        <div className="relative pt-2 w-full flex items-center justify-center shrink-0">
                          <span
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all"
                            style={{
                              backgroundColor: `${student.theme.accent}20`,
                              borderColor: `${student.theme.accent}50`,
                              color: '#ffffff',
                            }}
                          >
                            <RotateCcw className="w-3.5 h-3.5" style={{ color: student.theme.accent }} />
                            انقر لقلب البطاقة واستعراض التوصيف الأكاديمي الكامل
                          </span>
                        </div>
                      </div>

                      {/* ============ الوجه الخلفي للبطاقة (بنفس الإحداثيات تماماً دون إزاحة لأسفل) ============ */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden p-6 flex flex-col justify-between border-2 shadow-2xl text-right"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          borderColor: `${student.theme.accent}66`,
                          background: `linear-gradient(155deg, rgba(15, 23, 42, 0.97) 0%, rgba(2, 6, 23, 0.98) 60%, ${student.theme.accent}25 100%)`,
                          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.75), 0 0 35px ${student.theme.accent}33`,
                        }}
                      >
                        {/* رأس الوجه الخلفي */}
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 shrink-0">
                          <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 shrink-0" style={{ color: student.theme.accent }} />
                            <div>
                              <span
                                className="text-xs font-bold block"
                                style={{ color: student.theme.accent }}
                              >
                                التوصيف الأكاديمي للدور في المشروع — شعبة (002م)
                              </span>
                              <span className="text-[11px] text-slate-300">
                                {student.name} · <span className="font-mono" dir="ltr">{displayAcademicId}</span>
                              </span>
                            </div>
                          </div>
                          <span className="text-xl">{student.badge}</span>
                        </div>

                        {/* نص الرسالة الكامل */}
                        <div className="flex-1 my-2 py-2 overflow-y-auto flex items-center">
                          <p className="text-sm text-slate-100 leading-relaxed font-medium">
                            {student.message}
                          </p>
                        </div>

                        {/* تفاصيل الهوية والتخصص في الأسفل */}
                        <div className="space-y-2.5 pt-3 border-t border-slate-800/80 shrink-0">
                          <div className="flex items-center justify-between text-xs gap-2">
                            <span className="text-slate-400 shrink-0">اللقب العلمي:</span>
                            <span className="font-bold text-slate-200 text-left">{student.title}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs gap-2">
                            <span className="text-slate-400 shrink-0">المجال التخصصي:</span>
                            <span className="font-bold text-left" style={{ color: student.theme.accent }}>
                              {student.theme.specialty}
                            </span>
                          </div>

                          {student.chapterFocus && student.chapterFocus.length > 0 && (
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-400 flex items-center gap-1">
                                <BookOpen className="w-3.5 h-3.5" /> فصول التركيز:
                              </span>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {student.chapterFocus.map((ch) => (
                                  <span
                                    key={ch}
                                    className="px-2 py-0.5 rounded-md text-[11px] font-mono border"
                                    style={{
                                      backgroundColor: `${student.theme.accent}18`,
                                      borderColor: `${student.theme.accent}40`,
                                      color: student.theme.accent,
                                    }}
                                  >
                                    فصل {ch}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5" style={{ color: student.theme.accent }} />
                              جامعة الأمير مقرن · دبلوم أمن المعلومات (ISE243)
                            </span>
                            <span
                              className="inline-flex items-center gap-1 text-xs font-bold"
                              style={{ color: student.theme.accent }}
                            >
                              <RotateCcw className="w-3.5 h-3.5" /> العودة للوجه الأمامي
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                /* ============ نمط عرض الوجهين معاً (جنباً إلى جنب) ============ */
                <motion.div
                  key={`stage-side-${student.id}-${student.name}`}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl"
                >
                  {/* بطاقة الهوية */}
                  <div
                    className="rounded-3xl p-6 flex flex-col items-center text-center border-2 shadow-2xl"
                    style={{
                      borderColor: `${student.theme.accent}66`,
                      background: `linear-gradient(155deg, rgba(15, 23, 42, 0.95) 0%, rgba(2, 6, 23, 0.98) 70%, ${student.theme.accent}24 100%)`,
                    }}
                  >
                    <div className="w-full flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-slate-400">
                        {student.id > 0 ? `#${String(student.id).padStart(2, '0')}` : 'WELCOME'}
                      </span>
                      <span className="text-2xl">{student.badge}</span>
                    </div>
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white mb-3 shadow-lg border"
                      style={{
                        backgroundColor: `${student.theme.accent}33`,
                        borderColor: student.theme.accent,
                      }}
                    >
                      {student.initial}
                    </div>
                    <h3 className="text-xl font-black text-white mb-1">{student.name}</h3>
                    <p className="text-xs font-mono text-slate-400 mb-3" dir="ltr">
                      {displayAcademicId}
                    </p>
                    <div
                      className="px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 mb-3"
                      style={{
                        backgroundColor: `${student.theme.accent}22`,
                        color: student.theme.accent,
                        border: `1px solid ${student.theme.accent}50`,
                      }}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{student.title}</span>
                    </div>
                    <p className="text-xs italic text-slate-300 mt-auto">«{student.theme.quote}»</p>
                  </div>

                  {/* بطاقة الرسالة والتفاصيل */}
                  <div
                    className="rounded-3xl p-6 flex flex-col justify-between border-2 shadow-2xl text-right"
                    style={{
                      borderColor: `${student.theme.accent}66`,
                      background: `linear-gradient(155deg, rgba(15, 23, 42, 0.96) 0%, rgba(2, 6, 23, 0.98) 70%, ${student.theme.accent}24 100%)`,
                    }}
                  >
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Award className="w-5 h-5" style={{ color: student.theme.accent }} />
                      <span className="text-sm font-bold" style={{ color: student.theme.accent }}>
                        التوصيف الأكاديمي الموثق للدور في المشروع
                      </span>
                    </div>
                    <p className="text-sm text-slate-100 leading-loose my-4">{student.message}</p>
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">التخصص الدقيق:</span>
                      <span className="font-bold" style={{ color: student.theme.accent }}>
                        {student.theme.specialty}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* زر التالي */}
            {allStudents && allStudents.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900/75 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all shrink-0 mr-4 shadow-xl"
                aria-label="البطاقة التالية"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* الشريط السفلي: أزرار الإجراءات (في حالة الحساب الجديد) أو شريط التنقل السريع بين البطاقات */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-5xl flex flex-col items-center gap-3 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {(onPrimaryAction || onSecondaryAction) && (
              <div className="flex items-center justify-center gap-3 w-full max-w-md flex-nowrap">
                {onPrimaryAction && (
                  <button
                    type="button"
                    onClick={onPrimaryAction}
                    className="flex-1 min-w-[160px] py-3 px-5 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                    style={{
                      backgroundColor: student.theme.accent,
                      boxShadow: `0 8px 24px -6px ${student.theme.accent}80`,
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{primaryActionLabel || 'متابعة'}</span>
                  </button>
                )}
                {onSecondaryAction && (
                  <button
                    type="button"
                    onClick={onSecondaryAction}
                    className="py-3 px-5 rounded-xl font-bold text-sm bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all whitespace-nowrap shrink-0"
                  >
                    {secondaryActionLabel || 'إغلاق'}
                  </button>
                )}
              </div>
            )}

            {allStudents && allStudents.length > 1 && onSelectStudent && (
              <div className="flex items-center justify-center gap-1.5 flex-nowrap overflow-x-auto max-w-full bg-slate-900/75 border border-slate-800/90 px-3 py-1.5 rounded-2xl">
                {allStudents.map((s) => {
                  const active = s.id === student.id && s.name === student.name;
                  return (
                    <button
                      key={`${s.id}-${s.name}`}
                      type="button"
                      onClick={() => onSelectStudent(s)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 whitespace-nowrap ${
                        active ? 'text-white shadow-md scale-105' : 'text-slate-400 hover:text-slate-200'
                      }`}
                      style={
                        active
                          ? {
                              backgroundColor: `${s.theme.accent}35`,
                              border: `1px solid ${s.theme.accent}`,
                            }
                          : undefined
                      }
                      title={s.name}
                    >
                      <span>{s.badge}</span>
                      <span>{s.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
