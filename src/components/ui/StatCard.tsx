import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  tone?: 'emerald' | 'blue' | 'purple' | 'amber';
}

const TONE_MAP = {
  emerald: {
    text: 'text-emerald-400',
    card: 'card-3d-neon',
    iconBg: 'icon-glass-3d text-emerald-400',
  },
  blue: {
    text: 'text-blue-400',
    card: 'card-3d-neon card-3d-cyan',
    iconBg: 'icon-glass-3d icon-glass-3d-cyan text-blue-400',
  },
  purple: {
    text: 'text-purple-400',
    card: 'card-3d-neon card-3d-purple',
    iconBg: 'icon-glass-3d icon-glass-3d-purple text-purple-400',
  },
  amber: {
    text: 'text-amber-400',
    card: 'card-3d-neon card-3d-amber',
    iconBg: 'icon-glass-3d icon-glass-3d-amber text-amber-400',
  },
};

export default function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  tone = 'emerald',
}: StatCardProps) {
  const styles = TONE_MAP[tone];
  return (
    <div className={cn('p-5 rounded-2xl', styles.card)}>
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-slate-400 text-xs font-medium mb-1.5">{label}</p>
          <p className={cn('text-3xl font-black tabular-nums tracking-tight', styles.text)}>
            {value}
          </p>
          <p className="text-slate-500 text-xs mt-1">{unit}</p>
        </div>
        <div className={cn('w-11 h-11 shrink-0', styles.iconBg)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
