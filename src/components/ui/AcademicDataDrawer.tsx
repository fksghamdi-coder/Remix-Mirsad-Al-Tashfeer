import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Shield, ExternalLink, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { ChartDataPoint } from './Glass3DChart';

interface AcademicDataDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dataPoint: ChartDataPoint | null;
}

export const AcademicDataDrawer: React.FC<AcademicDataDrawerProps> = ({
  isOpen,
  onClose,
  dataPoint,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!dataPoint) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-lg h-full bg-slate-900 border-r sm:border-r-0 sm:border-l border-emerald-500/30 glass-panel-floating shadow-2xl z-10 flex flex-col p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">{dataPoint.category}</h3>
                  <span className="text-xs text-emerald-400 font-medium">المرجع الأكاديمي والتحليل المؤسسي</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="py-6 space-y-6 flex-1">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                  <span className="block text-[11px] text-slate-400 mb-1">نسبة الجاهزية</span>
                  <span className="text-xl font-bold text-emerald-400">{dataPoint.value}%</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                  <span className="block text-[11px] text-slate-400 mb-1">النمو السنوي</span>
                  <span className="text-xl font-bold text-cyan-400">{dataPoint.growth}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                  <span className="block text-[11px] text-slate-400 mb-1">مستوى الثقة</span>
                  <span className="text-xl font-bold text-amber-400">{dataPoint.confidence}</span>
                </div>
              </div>

              {/* Comprehensive Description */}
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  ملخص التحليل التنفيذي
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">{dataPoint.details}</p>
              </div>

              {/* Regulatory Compliance Standards */}
              <div>
                <h4 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  الضوابط والتشريعات المطبقة
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-200 block">ضوابط NCA ECC-1:2018</span>
                      <span className="text-[11px] text-slate-400">الضوابط الأساسية للأمن السيبراني الصادرة عن الهيئة الوطنية للأمن السيبراني.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-200 block">إطار السحابة الوطنية SAMA CSF</span>
                      <span className="text-[11px] text-slate-400">إطار عمل الأمن السيبراني للبنك المركزي السعودي للقطاع المالي.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Academic Chapters */}
              <div>
                <h4 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  الفصول الأكاديمية ذات الصلة
                </h4>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300">الفصل الرابع: حماية البنى التحتية الحساسة</span>
                  <a href="/course" className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium">
                    استعراض الفصل
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer / Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">مصدر البيانات: منصة مرصاد الأكاديمية</span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <span>إغلاق النافذة</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AcademicDataDrawer;
