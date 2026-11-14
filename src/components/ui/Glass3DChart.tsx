// File: src/components/ui/Glass3DChart.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Database, Award } from 'lucide-react';

export interface ChartDataPoint {
  id: string;
  category: string;
  value: number;
  growth: string;
  confidence: string;
  details: string;
  color: string;
}

interface Glass3DChartProps {
  data?: ChartDataPoint[];
  onSelectPoint?: (point: ChartDataPoint) => void;
  className?: string;
}

const defaultChartData: ChartDataPoint[] = [
  {
    id: 'legal',
    category: 'التدابير القانونية (ITU GCI)',
    value: 100,
    growth: '20 / 20 نقطة',
    confidence: '100% (ITU GCI 2024)',
    details: 'تحقيق العلامة الكاملة (20/20) في ركيزة التشريعات والأنظمة السيبرانية وفق تقرير الاتحاد الدولي للاتصالات ITU GCI 2024.',
    color: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'technical',
    category: 'التدابير التقنية (NCA ECC / NCS)',
    value: 100,
    growth: '20 / 20 نقطة',
    confidence: '100% (ITU GCI 2024)',
    details: 'تحقيق العلامة الكاملة (20/20) في الركيزة التقنية وتطبيق ضوابط التشفير الوطنية (NCA ECC-2:2024 وNCS-1:2020).',
    color: 'from-cyan-500 to-blue-400',
  },
  {
    id: 'organizational',
    category: 'التدابير التنظيمية والحوكمة',
    value: 100,
    growth: '20 / 20 نقطة',
    confidence: '100% (ITU GCI 2024)',
    details: 'تحقيق العلامة الكاملة (20/20) في الاستراتيجيات الوطنية والحوكمة السيبرانية (5 مكونات رئيسية و108 ضوابط في ECC-2:2024).',
    color: 'from-blue-500 to-indigo-400',
  },
  {
    id: 'capacity',
    category: 'بناء القدرات الأكاديمية والتدريب',
    value: 100,
    growth: '20 / 20 نقطة',
    confidence: '100% (ITU GCI 2024)',
    details: 'تحقيق العلامة الكاملة (20/20) في تنمية الكفاءات الوطنية وبرامج التعليم الأكاديمي والتدريبي في الأمن السيبراني.',
    color: 'from-purple-500 to-pink-400',
  },
  {
    id: 'cooperation',
    category: 'التعاون الوطني والدولي',
    value: 100,
    growth: '20 / 20 نقطة',
    confidence: '100% (ITU GCI 2024)',
    details: 'تحقيق العلامة الكاملة (20/20) في الشراكات الدولية وتبادل المؤشرات المعيارية وتصنيف الفئة الأولى (Tier-1 Role-Modelling).',
    color: 'from-amber-500 to-orange-400',
  },
];

export const Glass3DChart: React.FC<Glass3DChartProps> = ({
  data = defaultChartData,
  onSelectPoint,
  className = '',
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleBarClick = (point: ChartDataPoint) => {
    setSelectedId(point.id);
    if (onSelectPoint) {
      onSelectPoint(point);
    }
  };

  return (
    <div className={`relative p-6 sm:p-7 rounded-3xl card-3d-neon bg-slate-900/85 backdrop-blur-xl border border-emerald-500/35 neon-border neon-emerald ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="icon-glass-3d w-9 h-9">
              <Database className="w-4 h-4 text-emerald-400" />
            </span>
            <h3 className="text-lg font-bold text-slate-100">
              الركائز الخمس لمؤشر الأمن السيبراني العالمي (ITU GCI 2024: 100/100)
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            انقر على أي عمود ثلاثي الأبعاد لعرض البيانات الرسمية الموثقة بالمصادر (ITU GCI 2024 &amp; NCA ECC-2:2024)
          </p>
        </div>
        <div className="btn-3d-neon flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/35 text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>موثق رسمياً: ITU GCI 2024 (Tier-1)</span>
        </div>
      </div>

      <div className="chart-3d-stage relative h-72 sm:h-80 w-full pt-10 pb-6 px-4 sm:px-6 flex items-end justify-between gap-3 sm:gap-6 perspective-1000">
        <div className="absolute inset-x-4 top-8 bottom-12 flex flex-col justify-between pointer-events-none opacity-25">
          <div className="border-b border-dashed border-emerald-500/40 w-full" />
          <div className="border-b border-dashed border-emerald-500/30 w-full" />
          <div className="border-b border-dashed border-emerald-500/30 w-full" />
          <div className="border-b border-emerald-500/45 w-full" />
        </div>

        {data.map((point, idx) => {
          const isSelected = selectedId === point.id;
          const isHovered = hoveredPoint?.id === point.id;

          return (
            <div
              key={point.id}
              onClick={() => handleBarClick(point)}
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
              className="relative z-10 flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`mb-2.5 px-3 py-1 rounded-xl text-[10px] sm:text-xs font-mono font-black transition-all duration-300 border shadow-md ${
                  isSelected
                    ? 'bg-emerald-400 text-slate-950 border-white ring-2 ring-emerald-300/80 shadow-[0_0_20px_rgba(52,211,153,0.65)] scale-110 -translate-y-1'
                    : isHovered
                    ? 'bg-emerald-500/25 text-emerald-200 border-emerald-300/80 shadow-[0_0_16px_rgba(16,185,129,0.35)] scale-105 -translate-y-0.5'
                    : 'bg-slate-900/90 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {point.value}%
              </motion.div>

              <div className="relative w-full max-w-[58px] h-full flex items-end justify-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${point.value}%` }}
                  transition={{ duration: 0.85, ease: 'easeOut', delay: idx * 0.06 }}
                  className={`w-full rounded-t-2xl bg-gradient-to-t ${point.color} transition-all duration-300 relative border border-white/40 shadow-[inset_0_2px_3px_rgba(255,255,255,0.55),inset_-2px_-4px_8px_rgba(0,0,0,0.45),0_10px_24px_-4px_rgba(0,0,0,0.65)] group-hover:-translate-y-1.5 group-hover:border-white/75 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),0_14px_28px_-4px_rgba(0,0,0,0.75),0_0_22px_rgba(16,185,129,0.38)] active:scale-[0.97] ${
                    isSelected
                      ? 'ring-2 ring-white border-white shadow-[inset_0_2px_5px_rgba(255,255,255,0.8),0_0_28px_rgba(52,211,153,0.65)] -translate-y-2 scale-x-105'
                      : ''
                  }`}
                />
              </div>

              <span className="mt-3 text-[11px] sm:text-xs text-center font-bold text-slate-300 group-hover:text-emerald-300 transition-colors leading-snug w-full">
                {point.category}
              </span>
            </div>
          );
        })}
      </div>

      {(hoveredPoint || selectedId) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-2xl bg-slate-950/85 border border-emerald-500/35 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">
                {(hoveredPoint || data.find((d) => d.id === selectedId))?.category}
              </h4>
              <p className="text-xs text-slate-400">
                {(hoveredPoint || data.find((d) => d.id === selectedId))?.details}
              </p>
            </div>
          </div>
          <div className="text-left shrink-0">
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{(hoveredPoint || data.find((d) => d.id === selectedId))?.growth}</span>
            </div>
            <span className="text-[10px] text-slate-500">الدرجة الرسمية الموثقة</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Glass3DChart;
