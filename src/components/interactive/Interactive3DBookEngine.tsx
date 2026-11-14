import React, { useState } from 'react';
import { BookOpen, ChevronRight, ChevronLeft, Sparkles, Layers } from 'lucide-react';

export interface Interactive3DBookEngineProps {
  totalPages?: number;
  currentChapterTitle?: string;
  onPageChange?: (page: number) => void;
}

export function Interactive3DBookEngine({
  totalPages = 64,
  currentChapterTitle = 'الفصل التفاعلي المتقدم',
  onPageChange,
}: Interactive3DBookEngineProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleNext = () => {
    if (currentPage < totalPages && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        const nextP = currentPage + 1;
        setCurrentPage(nextP);
        onPageChange?.(nextP);
        setIsFlipping(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        const prevP = currentPage - 1;
        setCurrentPage(prevP);
        onPageChange?.(prevP);
        setIsFlipping(false);
      }, 300);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 dir-rtl" dir="rtl">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              الكتاب التفاعلي ثنائي التناظر (Interactive 3D Book View)
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                Canvas CSS3D
              </span>
            </h3>
            <p className="text-xs text-slate-400">{currentChapterTitle}</p>
          </div>
        </div>

        <div className="text-xs font-mono font-bold text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          صفحة {currentPage} من {totalPages}
        </div>
      </div>

      {/* 3D Book Container */}
      <div className="relative min-h-[320px] bg-slate-950 rounded-2xl border border-slate-800/80 p-8 flex items-center justify-center overflow-hidden">
        {/* Decorative 3D Pages Shadow */}
        <div className="absolute inset-x-12 inset-y-6 bg-emerald-500/5 blur-2xl rounded-full" />

        <div
          className={`w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative transition-transform duration-300 ${
            isFlipping ? 'scale-95 opacity-50 rotate-y-12' : 'scale-100 opacity-100'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <span className="text-xs font-mono text-emerald-400">مرصاد - المرجع التفاعلي</span>
            <span className="text-xs font-bold text-slate-400">صفحة {currentPage}</span>
          </div>

          <div className="space-y-4 text-right">
            <h4 className="font-bold text-base text-slate-100">
              {currentChapterTitle} - القسم {currentPage}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              يتيح محرك الكتاب التفاعلي إمكانية تصفح المفاهيم الأساسية والتطبيقات التشفيرية المتقدمة بسلاسة وبسرعة استجابة عالية بدون أي استهلاك غير مبرر للذاكرة.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
              // Cryptographic Matrix State [Page {currentPage}]
              <br />
              GF(2^8) Poly: x^8 + x^4 + x^3 + x + 1 (0x11B)
            </div>
          </div>
        </div>
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={currentPage <= 1 || isFlipping}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold transition-all"
        >
          <ChevronRight className="w-4 h-4" />
          الصفحة السابقة
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-bold font-mono transition-all ${
                  currentPage === p
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages || isFlipping}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20"
        >
          الصفحة التالية
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
