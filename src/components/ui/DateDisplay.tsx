import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface DateDisplayProps {
  compact?: boolean;
  className?: string;
  variant?: 'emerald' | 'amber';
}

export const DateDisplay: React.FC<DateDisplayProps> = ({
  compact = false,
  className = '',
  variant = 'emerald',
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getHijriDate = (date: Date) => {
    try {
      return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch {
      return '١٤٤٧ هـ';
    }
  };

  const getGregorianDate = (date: Date) => {
    try {
      return new Intl.DateTimeFormat('ar-SA', {
        weekday: compact ? undefined : 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch {
      return date.toLocaleDateString('ar-SA');
    }
  };

  if (compact) {
    if (variant === 'amber') {
      return (
        <div
          className={`inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[11px] font-bold text-amber-300 bg-slate-900/90 border border-amber-500/30 shadow-sm whitespace-nowrap shrink-0 ${className}`}
        >
          <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-amber-200 font-bold">{getHijriDate(currentDate)}</span>
          <span className="text-amber-500/40" aria-hidden="true">|</span>
          <span className="text-amber-100/85">{getGregorianDate(currentDate)}</span>
        </div>
      );
    }

    return (
      <div
        className={`inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-slate-900/90 border border-emerald-500/30 text-[11px] font-medium text-emerald-300 shadow-sm whitespace-nowrap shrink-0 ${className}`}
      >
        <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="font-bold text-emerald-200">{getHijriDate(currentDate)}</span>
        <span className="text-slate-600" aria-hidden="true">|</span>
        <span className="text-slate-300">{getGregorianDate(currentDate)}</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/70 dark:bg-slate-900/90 border border-emerald-500/30 text-sm text-slate-200 neon-border ${className}`}>
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="font-semibold text-emerald-300">{getHijriDate(currentDate)}</span>
      </div>
      <span className="hidden sm:inline text-slate-500">•</span>
      <span className="text-xs text-slate-400">{getGregorianDate(currentDate)}</span>
    </div>
  );
};

export default DateDisplay;
