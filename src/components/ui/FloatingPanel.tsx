import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2 } from 'lucide-react';

interface FloatingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  allowMaximize?: boolean;
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  maxWidth = 'max-w-2xl',
  allowMaximize = true,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  // Reset maximize state when closed
  useEffect(() => {
    if (!isOpen) {
      setIsMaximized(false);
    }
  }, [isOpen]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Floating Panel Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className={`relative w-full transition-all duration-300 ${
              isMaximized
                ? 'max-w-[96vw] h-[92vh] max-h-[92vh] flex flex-col'
                : `${maxWidth} max-h-[85vh] flex flex-col`
            } glass-panel-floating neon-border neon-emerald rounded-2xl p-5 sm:p-6 shadow-2xl z-10 overflow-hidden ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-emerald-500/20 shrink-0">
              {title ? (
                <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                  <span>{title}</span>
                </h3>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-1.5">
                {allowMaximize && (
                  <button
                    type="button"
                    onClick={() => setIsMaximized((m) => !m)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition-colors cursor-pointer"
                    title={isMaximized ? 'استعادة الحجم الأصلي' : 'تكبير القائمة العائمة'}
                    aria-label={isMaximized ? 'تصغير' : 'تكبير'}
                  >
                    {isMaximized ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-colors cursor-pointer"
                  aria-label="إغلاق"
                  title="إغلاق"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className={`overflow-y-auto pr-1 custom-scrollbar ${isMaximized ? 'flex-1 h-full' : 'max-h-[72vh]'}`}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FloatingPanel;
