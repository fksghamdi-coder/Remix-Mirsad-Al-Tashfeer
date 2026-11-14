// src/components/ui/ThemeToggle.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle(_props?: { 'aria-label'?: string }) {
  const { theme, preference, toggle, setPreference, mounted } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-lg bg-slate-800/60 shrink-0" />;
  }

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={toggle}
        onContextMenu={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        className={`relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center btn-3d-neon shrink-0 ${
          theme === 'dark'
            ? 'btn-3d-amber text-amber-400'
            : 'text-emerald-700'
        }`}
        title={
          theme === 'dark'
            ? 'الوضع النهاري (انقر للتبديل، زر يمين للخيارات)'
            : 'الوضع الليلي (انقر للتبديل، زر يمين للخيارات)'
        }
        aria-label="تبديل الوضع"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="icon-glass-badge icon-glass-amber"
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="icon-glass-badge"
            >
              <Moon className="w-3.5 h-3.5 text-emerald-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-44 glass-panel rounded-xl overflow-hidden shadow-2xl z-50 border border-slate-700/60 p-1"
          >
            {[
              { id: 'light' as const, label: 'الوضع النهاري', icon: Sun },
              { id: 'dark' as const, label: 'الوضع الليلي', icon: Moon },
              { id: 'system' as const, label: 'تلقائي (النظام)', icon: Monitor },
            ].map((opt) => {
              const Icon = opt.icon;
              const active = preference === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setPreference(opt.id);
                    setOpen(false);
                  }}
                  className={`w-full text-right px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-colors ${
                    active
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
