import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';
import { canInstall, promptInstall, onInstallAvailable, isStandalone } from '@/lib/pwa';
import { SyncEngine } from '@/lib/syncEngine';

const DISMISS_KEY = 'mirsad_install_dismissed';
const DISMISS_TTL = 7 * 24 * 60 * 60 * 1000; // 7 أيام

export default function InstallBanner() {
  const [show, setShow] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;

    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed && Date.now() - Number(dismissed) < DISMISS_TTL) return;

    // انتظر ثانيتين ثم اعرض
    const t = setTimeout(() => {
      if (canInstall()) setShow(true);
    }, 2000);

    const off = onInstallAvailable(() => {
      if (canInstall()) setShow(true);
    });

    return () => {
      clearTimeout(t);
      off();
    };
  }, []);

  const handleInstall = async () => {
    setInstalling(true);
    const result = await promptInstall();
    setInstalling(false);
    if (result !== 'unavailable') setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md"
        >
          <div className="glass-panel rounded-2xl p-4 border border-emerald-500/30 shadow-2xl shadow-emerald-500/10">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  ثبّت مِرْصَاد على جهازك
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  تجربة أسرع، وصول من الشاشة الرئيسية، عمل بدون إنترنت
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={handleInstall}
                    disabled={installing}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {installing ? 'جاري التثبيت...' : 'تثبيت الآن'}
                  </button>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs rounded-lg transition-colors"
                  >
                    لاحقاً
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="text-slate-500 hover:text-white p-1 -mt-1 -mr-1"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
