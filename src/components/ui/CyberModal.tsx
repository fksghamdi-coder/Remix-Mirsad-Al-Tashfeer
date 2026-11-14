import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Sparkles, Activity } from 'lucide-react';
import { cn, getAssetUrl } from '@/lib/utils';

export interface BreakdownItem {
  name: string;
  value: string;
  percentage: number;
  color?: string;
}

export interface CyberModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  code?: string;
  badge?: string;
  icon?: React.ElementType;
  iconTone?: string;
  highlights?: string;
  entities?: string;
  breakdown: BreakdownItem[];
  summary?: string;
}

export default function CyberModal({
  isOpen,
  onClose,
  title,
  subtitle,
  code,
  badge,
  icon: _Icon = Activity,
  iconTone = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  highlights,
  entities,
  breakdown,
  summary,
}: CyberModalProps) {
  void _Icon;
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 dir-rtl select-none">
          {/* Dark Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Floating Cyber Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[101] w-full max-w-lg bg-slate-900/95 border border-emerald-500/30 rounded-3xl p-6 shadow-[0_0_50px_rgba(16,185,129,0.12)] text-right dir-rtl max-h-[88vh] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden group"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Inner Cyber Glow */}
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Status Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-3 mb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold tracking-wider">مرصد التشفير المتقدم</span>
                {code && (
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-bold border border-slate-700">
                    {code}
                  </span>
                )}
              </div>
              <span className="text-slate-500">بيانات موثوقة live</span>
            </div>

            {/* Main Header */}
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'w-12 h-12 p-1.5 rounded-2xl border shrink-0 flex items-center justify-center bg-slate-900/90 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)] icon-glass-3d',
                    iconTone
                  )}
                >
                  <img
                    src={getAssetUrl('assets/mirsad-emblem-logo.png')}
                    alt="شعار مرصاد التشفير"
                    className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(6,182,212,0.85)]"
                  />
                </div>
                <div>
                  <h3 className="font-black text-base md:text-lg text-slate-100 leading-tight">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors border border-slate-700/80 shrink-0 cursor-pointer"
                title="إغلاق (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Highlights Box */}
            {highlights && (
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-emerald-500/20 mb-4 text-xs text-slate-300 leading-relaxed shadow-inner">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>الرؤية التحليلية:</span>
                </div>
                <p className="text-slate-300">{highlights}</p>
              </div>
            )}

            {/* Entities / Scope Box */}
            {entities && (
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 mb-4 text-xs text-slate-300 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>نطاق التطبيق والجهات المستهدفة:</span>
                </div>
                <p className="text-slate-300">{entities}</p>
              </div>
            )}

            {/* Detailed Data List */}
            <div className="space-y-3.5 my-5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
                <span>القائمة التفصيلية للبيانات</span>
                <span className="text-[10px] text-slate-500 font-mono">توزيع التشفير %</span>
              </div>

              {breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="card-3d-neon bg-slate-950/80 p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all duration-200"
                >
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-mono font-bold border border-emerald-500/30">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-200 text-xs md:text-sm">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30 text-xs shadow-sm">
                      {item.value}
                    </span>
                  </div>

                  <div className="w-full rounded-full h-3.5 p-0.5 bar-3d-track">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.05 }}
                      className={cn(
                        'h-full rounded-full transition-all duration-500 bar-3d-fill',
                        item.color || 'bg-emerald-500'
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer / Summary */}
            {summary && (
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs gap-3">
                <p className="text-slate-400 leading-relaxed text-xs flex-1">{summary}</p>
                {badge && (
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 whitespace-nowrap shrink-0 shadow-sm">
                    {badge}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
