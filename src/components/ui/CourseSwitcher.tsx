// src/components/ui/CourseSwitcher.tsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Check, Lock } from 'lucide-react';
import * as Icons from 'lucide-react';
import { COURSES } from '@/data/courses';
import { cn } from '@/lib/utils';

export default function CourseSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // استخراج slug الحالي من المسار
  const match = location.pathname.match(/\/academic\/([^/]+)/);
  const currentSlug = match?.[1] === 'chapters' ? 'ise243' : match?.[1] || 'ise243';

  const currentCourse =
    COURSES.find((c) => c.slug === currentSlug && c.status === 'available') || COURSES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const go = (slug: string, status: string) => {
    if (status !== 'available') return;
    setOpen(false);
    navigate(`/academic/${slug}/details`);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-amber-300 text-xs md:text-sm font-bold btn-3d-neon btn-3d-amber"
        title="تبديل المقرر"
      >
        <span className="icon-glass-badge icon-glass-amber">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
        </span>
        <span className="hidden sm:inline">{currentCourse.code}</span>
        <ChevronDown
          className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-72 glass-panel rounded-xl overflow-hidden shadow-2xl z-50 border border-amber-700/30"
          >
            <div className="p-2 border-b border-slate-800/60 bg-amber-950/30">
              <p className="text-xs text-amber-400 font-bold">اختر المقرر</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {COURSES.map((course) => {
                const IconComp = (Icons as any)[course.icon] || BookOpen;
                const isActive = course.slug === currentSlug;
                const isAvailable = course.status === 'available';
                return (
                  <button
                    key={course.slug}
                    onClick={() => go(course.slug, course.status)}
                    disabled={!isAvailable}
                    className={cn(
                      'w-full text-right p-3 flex items-start gap-3 transition-all',
                      isActive && 'bg-amber-500/10',
                      isAvailable
                        ? 'hover:bg-amber-500/5 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center shrink-0`}
                    >
                      <IconComp className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-mono text-slate-500">
                          {course.code}
                        </p>
                        {isActive && (
                          <Check className="w-3 h-3 text-amber-400" />
                        )}
                        {!isAvailable && (
                          <Lock className="w-3 h-3 text-slate-500" />
                        )}
                      </div>
                      <p className="text-sm font-bold text-slate-200 truncate">
                        {course.title}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {course.chaptersCount} فصلاً · {course.level}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
