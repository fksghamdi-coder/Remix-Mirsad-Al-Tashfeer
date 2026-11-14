import { useState } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { FlashcardData } from '@/lib/chapters';

export default function Flashcard({ data, index }: { data: FlashcardData; index?: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 w-full h-56 cursor-pointer group"
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-slate-800/60 border border-slate-700 rounded-2xl flex flex-col items-center justify-center p-6 text-center group-hover:border-emerald-500/50 transition-colors">
          {index !== undefined && (
            <span className="absolute top-3 right-3 text-xs font-mono tabular-nums text-slate-500">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          <Sparkles className="w-6 h-6 text-emerald-400 mb-3" />
          <p className="text-base font-bold text-slate-100 leading-relaxed">{data.front}</p>
          <span className="absolute bottom-3 text-xs text-slate-500 flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> انقر للكشف
          </span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl flex items-center justify-center p-6 text-center shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <p className="text-sm text-emerald-100 leading-relaxed">{data.back}</p>
        </div>
      </div>
    </div>
  );
}
