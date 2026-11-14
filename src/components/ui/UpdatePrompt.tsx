import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';
import { applyUpdate } from '@/lib/pwa';

export default function UpdatePrompt() {
  const [reg, setReg] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setReg(detail);
    };
    window.addEventListener('sw-update-available', handler);
    return () => window.removeEventListener('sw-update-available', handler);
  }, []);

  if (!reg) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-md"
      >
        <div className="glass-panel rounded-xl p-3 border border-amber-500/40 flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-amber-400 animate-spin-slow shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold">تحديث جديد متاح</p>
            <p className="text-xs text-slate-400">أعد التحميل للحصول على أحدث الميزات</p>
          </div>
          <button
            type="button"
            onClick={() => applyUpdate(reg)}
            className="text-xs bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 rounded-lg shrink-0"
          >
            تحديث
          </button>
          <button
            type="button"
            onClick={() => setReg(null)}
            className="text-slate-500 hover:text-white p-1"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
