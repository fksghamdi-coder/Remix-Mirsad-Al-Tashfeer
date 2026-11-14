import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'academic' | 'subtle';
}

export default function GlassCard({
  children,
  className,
  variant = 'default',
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 glass-panel card-3d-neon transition-all duration-300 active:scale-[0.995]',
        variant === 'default' &&
          'bg-slate-900/85 border border-emerald-500/35 hover:border-emerald-400/70',
        variant === 'academic' &&
          'card-3d-amber bg-slate-900/85 border border-amber-500/40 hover:border-amber-400/75',
        variant === 'subtle' &&
          'bg-slate-900/65 border border-emerald-500/25 hover:border-emerald-400/60',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
