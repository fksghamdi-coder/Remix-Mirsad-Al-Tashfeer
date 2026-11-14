import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TabDef {
  id: string;
  label: string;
  icon?: LucideIcon;
  color?: string;
}

interface TabsProps {
  tabs: TabDef[];
  active: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-xl">
      {tabs.map((tab, idx) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap shrink-0 btn-3d-neon',
              isActive
                ? 'btn-3d-neon-active font-bold text-emerald-200'
                : 'text-slate-300 hover:text-emerald-300'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className={cn(
                  'absolute inset-0 rounded-xl bg-gradient-to-r opacity-30 pointer-events-none',
                  tab.color || 'from-emerald-600 to-emerald-500'
                )}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {Icon && (
                <span
                  className="icon-glass-badge"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-300" />
                </span>
              )}
              <span>{tab.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
