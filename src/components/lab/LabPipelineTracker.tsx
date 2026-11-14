// File: src/components/lab/LabPipelineTracker.tsx
import React from 'react';
import { KeyRound, Cpu, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PipelineStageInfo {
  stageNumber: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  formulaOrValue: string;
}

interface LabPipelineTrackerProps {
  activeStage: 0 | 1 | 2 | 3 | 4;
  modeLabel?: string;
  stages: [PipelineStageInfo, PipelineStageInfo, PipelineStageInfo, PipelineStageInfo];
}

const STAGE_ICONS = [KeyRound, Cpu, ShieldCheck, CheckCircle2];

export default function LabPipelineTracker({
  activeStage,
  modeLabel = 'تسلسل التشغيل والفحص الرياضي',
  stages,
}: LabPipelineTrackerProps) {
  const [selectedStage, setSelectedStage] = React.useState<number | null>(null);

  return (
    <div
      dir="rtl"
      className="p-5 sm:p-6 rounded-3xl glass-panel card-3d-neon border border-emerald-500/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_14px_32px_-8px_rgba(0,0,0,0.65),0_0_18px_rgba(16,185,129,0.12)] space-y-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-slate-800/70">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <h3 className="text-xs md:text-sm font-black text-white">{modeLabel}</h3>
        </div>
        <span className="text-[11px] font-bold text-amber-300 bg-amber-500/12 border border-amber-500/35 px-3.5 py-1 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
          {activeStage === 0
            ? 'جاهز للتشغيل المتسلسل'
            : activeStage < 4
            ? `جارٍ تنفيذ المرحلة ${activeStage} من 4...`
            : 'اكتملت المراحل الأربع وتم التحقق الرياضي بنجاح ✓'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
        {stages.map((st, idx) => {
          const Icon = STAGE_ICONS[idx];
          const isCurrent = activeStage === st.stageNumber;
          const isDone = activeStage > st.stageNumber || activeStage === 4;
          const isClicked = selectedStage === st.stageNumber;

          return (
            <div
              key={st.stageNumber}
              role="button"
              tabIndex={0}
              onClick={() =>
                setSelectedStage((prev) => (prev === st.stageNumber ? null : st.stageNumber))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedStage((prev) => (prev === st.stageNumber ? null : st.stageNumber));
                }
              }}
              className={cn(
                'group relative p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-2.5 cursor-pointer select-none card-3d-neon active:scale-[0.98]',
                isCurrent
                  ? 'bg-gradient-to-b from-amber-500/20 via-slate-900/90 to-slate-950/95 border-amber-400/75 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_12px_26px_-6px_rgba(0,0,0,0.65),0_0_24px_rgba(245,158,11,0.3)] scale-[1.01]'
                  : isDone
                  ? 'bg-gradient-to-b from-emerald-500/12 via-slate-900/90 to-slate-950/95 border-emerald-500/45 hover:border-emerald-400/75 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.22),0_10px_24px_-6px_rgba(0,0,0,0.6),0_0_16px_rgba(16,185,129,0.14)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.32),0_14px_30px_-6px_rgba(0,0,0,0.7),0_0_22px_rgba(16,185,129,0.26)]'
                  : 'bg-gradient-to-b from-white/[0.05] via-slate-900/85 to-slate-950/95 border-slate-700/70 hover:border-emerald-400/55 opacity-85 hover:opacity-100',
                isClicked &&
                  'ring-2 ring-emerald-400/80 border-emerald-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.38),0_0_26px_rgba(16,185,129,0.35)]'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={cn(
                      'w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs transition-all shrink-0 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.35),0_4px_10px_rgba(0,0,0,0.45)]',
                      isCurrent
                        ? 'bg-amber-400 text-slate-950 animate-pulse'
                        : isDone
                        ? 'bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-slate-950'
                        : 'bg-slate-800/90 border border-slate-700 text-slate-300 group-hover:border-emerald-500/40 group-hover:text-emerald-300'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-slate-400 block">
                      المرحلة {st.stageNumber}
                    </span>
                    <span className="text-xs font-black text-white leading-snug block">
                      {st.title}
                    </span>
                  </div>
                </div>

                {idx < 3 && (
                  <ArrowLeft
                    className={cn(
                      'w-4 h-4 hidden md:block shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5',
                      isDone ? 'text-emerald-400' : 'text-slate-600 group-hover:text-emerald-400/70'
                    )}
                  />
                )}
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">{st.subtitle}</p>

              <div
                dir="ltr"
                className={cn(
                  'px-3 py-2 rounded-xl font-mono text-[11px] truncate border transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),0_4px_10px_rgba(0,0,0,0.4)]',
                  isCurrent
                    ? 'bg-amber-950/70 border-amber-400/60 text-amber-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_0_14px_rgba(245,158,11,0.22)]'
                    : isDone
                    ? 'bg-emerald-950/60 border-emerald-500/40 group-hover:border-emerald-400/70 text-emerald-300 group-hover:shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.22),0_0_14px_rgba(16,185,129,0.2)]'
                    : 'bg-slate-950/85 border-slate-800 group-hover:border-emerald-500/35 text-slate-300'
                )}
              >
                {st.formulaOrValue}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
