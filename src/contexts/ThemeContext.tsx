// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Theme,
  ThemePreference,
  getStoredPreference,
  resolveTheme,
  applyTheme,
  watchSystemTheme,
} from '@/lib/theme';

interface ThemeCtx {
  theme: Theme;
  preference: ThemePreference;
  toggle: () => void;
  setPreference: (p: ThemePreference) => void;
  setTheme: (t: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: 'dark',
  preference: 'system',
  toggle: () => {},
  setPreference: () => {},
  setTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>('dark');
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // التهيئة الأولى
  useEffect(() => {
    const initialPreference = getStoredPreference() || 'dark';
    const initialTheme = resolveTheme(initialPreference);
    setPreferenceState(initialPreference);
    setThemeState(initialTheme);
    applyTheme(initialTheme, initialPreference);
    setMounted(true);
  }, []);

  // مزامنة عبر التبويبات المتعددة
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'mirsad_theme_preference') {
        const newPref = getStoredPreference() || 'dark';
        const newTheme = resolveTheme(newPref);
        setPreferenceState(newPref);
        setThemeState(newTheme);
        applyTheme(newTheme);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // متابعة تفضيل النظام عندما يكون "system"
  useEffect(() => {
    if (preference !== 'system') return;
    const cleanup = watchSystemTheme((sysTheme) => {
      setThemeState(sysTheme);
      applyTheme(sysTheme);
    });
    return cleanup;
  }, [preference]);

  const setPreference = (p: ThemePreference) => {
    const resolved = resolveTheme(p);
    setPreferenceState(p);
    setThemeState(resolved);
    applyTheme(resolved, p);
  };

  const setTheme = (t: Theme) => {
    setPreference(t);
  };

  const toggle = () => {
    // التبديل بين النور والظلام (يتحول من system إلى صريح)
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setPreference(next);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, preference, toggle, setPreference, setTheme, mounted }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
