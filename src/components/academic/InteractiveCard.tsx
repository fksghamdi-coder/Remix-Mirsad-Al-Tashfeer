import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, CheckCircle2, Rotate3d } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FlashcardData } from '@/data/courses/types';

interface Props {
  data: FlashcardData;
  index?: number;
  onLearned?: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  'تشفير': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  'أمن': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'تهديد': 'text-red-400 bg-red-500/10 border-red-500/30',
  'مخاطر': 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  'حوكمة': 'text-purple-400 bg-purple-500/10 border-purple-500/30',
};

export default function InteractiveCard({ data, onLearned }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLearned, setIsLearned] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleLearned = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLearned(!isLearned);
    if (onLearned) onLearned();
  };

  return (
    <div
      className="group perspective-1000 w-full h-64 cursor-pointer"
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full h-full preserve-3d duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div
          className={cn(
            'absolute inset-0 backface-hidden glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center border-2 transition-colors',
            isLearned ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-amber-500/20'
          )}
        >
          <div className="flex items-center justify-between w-full mb-3">
            <div
              className={cn(
                'px-3 py-1 rounded-full text-[10px] font-bold border',
                CATEGORY_COLORS[data.category || ''] || 'text-amber-300 bg-amber-500/10 border-amber-500/30'
              )}
            >
              {data.category || 'مفهوم أكاديمي'}
            </div>
          </div>

          <HelpCircle className="w-8 h-8 text-amber-400/50 mb-2 shrink-0" />
          <h3 className="text-base md:text-lg font-black text-slate-100 leading-snug line-clamp-3">
            {data.front}
          </h3>
          {data.phonetic && (
            <span className="mt-1.5 text-xs font-mono text-emerald-400" dir="ltr">
              {data.phonetic}
            </span>
          )}
          <div className="absolute bottom-3 flex items-center gap-2 text-[10px] text-slate-500 font-bold">
            <Rotate3d className="w-3 h-3" /> انقر لقلب البطاقة والكشف عن الشرح
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center border-2 border-emerald-500/30 bg-slate-900 rotate-y-180">
          <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-1">
            <p className="text-xs md:text-sm text-emerald-200 leading-relaxed font-medium">
              {data.back}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-center w-full pt-3 border-t border-slate-800 shrink-0">
            <button
              type="button"
              onClick={handleLearned}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all',
                isLearned
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-emerald-400'
              )}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isLearned ? 'تم الاستيعاب ✓' : 'تحديد كمكتمل'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export { InteractiveCard };
