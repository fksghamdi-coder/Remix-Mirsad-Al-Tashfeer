// src/hooks/useThemeColors.ts
import { useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Hook يُرجع ألوان الرسوم البيانية حسب الوضع الحالي
 * استخدمه في كل مكون Recharts
 */
export function useThemeColors() {
  const { theme } = useTheme();

  return useMemo(() => {
    const isDark = theme === 'dark';
    return {
      // Chart الأساسية
      text: isDark ? '#94a3b8' : '#1e293b',
      grid: isDark ? '#1e293b' : '#cbd5e1',
      axis: isDark ? '#64748b' : '#475569',

      // Tooltip
      tooltipBg: isDark ? '#0f172a' : '#ffffff',
      tooltipBorder: isDark ? '#1e293b' : '#94a3b8',
      tooltipText: isDark ? '#f8fafc' : '#06131f',

      // Accent palette (للمخططات)
      emerald: isDark ? '#10b981' : '#047857',
      blue: isDark ? '#3b82f6' : '#1d4ed8',
      purple: isDark ? '#8b5cf6' : '#6d28d9',
      amber: isDark ? '#f59e0b' : '#b45309',
      rose: isDark ? '#ef4444' : '#be123c',
      cyan: isDark ? '#06b6d4' : '#0e7490',

      // لأشرطة التقدم
      trackBg: isDark ? '#1e293b' : '#cbd5e1',

      // شفافيات
      emeraldSoft: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(4, 120, 87, 0.16)',
      blueSoft: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(29, 78, 216, 0.16)',
      purpleSoft: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(109, 40, 217, 0.16)',
    };
  }, [theme]);
}
