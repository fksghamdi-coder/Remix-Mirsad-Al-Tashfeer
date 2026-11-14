// src/contexts/PrayerSettingsContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  PrayerSettings,
  DEFAULT_SETTINGS,
  getPrayerSettings,
  savePrayerSettings,
  STORAGE_KEY,
} from '@/lib/prayerTimes';
import { SyncEngine } from '@/lib/syncEngine';

export type { PrayerSettings };

interface PrayerCtx {
  settings: PrayerSettings;
  updateSettings: (updates: Partial<PrayerSettings>) => void;
  resetSettings: () => void;
  isReady: boolean;
}

const PrayerContext = createContext<PrayerCtx>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => {},
  resetSettings: () => {},
  isReady: false,
});

export function PrayerSettingsProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const [settings, setSettings] = useState<PrayerSettings>(() => getPrayerSettings(session?.username));
  const [isReady, setIsReady] = useState(false);

  // تحميل الإعدادات عند تغير المستخدم أو عند بدء التشغيل
  useEffect(() => {
    const loaded = getPrayerSettings(session?.username);
    setSettings(loaded);
    setIsReady(true);
  }, [session?.username]);

  // حفظ الإعدادات
  const updateSettings = useCallback(
    (updates: Partial<PrayerSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...updates };
        savePrayerSettings(session?.username, next);
        return next;
      });
    },
    [session?.username]
  );

  const resetSettings = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      if (session?.username) {
        localStorage.removeItem(`mirsad_prayer_settings_${session.username}`);
      }
    } catch {}
    setSettings(DEFAULT_SETTINGS);
  }, [session?.username]);

  return (
    <PrayerContext.Provider
      value={{ settings, updateSettings, resetSettings, isReady }}
    >
      {children}
    </PrayerContext.Provider>
  );
}

export const usePrayerSettings = () => useContext(PrayerContext);
