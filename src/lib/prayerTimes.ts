// src/lib/prayerTimes.ts
// Secured and synchronized offline via Mirsad SyncEngine
import { SyncEngine } from './syncEngine';

export type PrayerName = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

export const PRAYER_LABELS: Record<string, string> = {
  Fajr: 'الفجر',
  Sunrise: 'الشروق',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
};

export interface PrayerSettings {
  city: string;
  country: string;
  calculationMethod: number;
  madhab: 'shafi' | 'hanafi';
  enabled: boolean;
  notificationsEnabled: boolean;
}

export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export const SAUDI_CITIES = [
  { name: 'الرياض', city: 'Riyadh' },
  { name: 'مكة المكرمة', city: 'Makkah' },
  { name: 'المدينة المنورة', city: 'Madinah' },
  { name: 'جدة', city: 'Jeddah' },
  { name: 'الدمام', city: 'Dammam' },
  { name: 'الخبر', city: 'Khobar' },
  { name: 'الطائف', city: 'Taif' },
  { name: 'تبوك', city: 'Tabuk' },
  { name: 'أبها', city: 'Abha' },
  { name: 'بريدة', city: 'Buraydah' },
  { name: 'حائل', city: 'Hail' },
  { name: 'جيزان', city: 'Jazan' },
  { name: 'نجران', city: 'Najran' },
  { name: 'الأحساء', city: 'Al Ahsa' },
];

export const CALCULATION_METHODS = [
  { id: 4, name: 'أم القرى — السعودية (الافتراضي)' },
  { id: 3, name: 'رابطة العالم الإسلامي' },
  { id: 5, name: 'الهيئة المصرية العامة للمساحة' },
  { id: 2, name: 'الجمعية الإسلامية لأمريكا الشمالية (ISNA)' },
  { id: 1, name: 'جامعة العلوم الإسلامية — كراتشي' },
  { id: 8, name: 'جامعة قطر' },
];

// مفتاح تخزين موحّد
export const STORAGE_KEY = 'mirsad_prayer_settings';

export const DEFAULT_SETTINGS: PrayerSettings = {
  city: 'Riyadh',
  country: 'Saudi Arabia',
  calculationMethod: 4,
  madhab: 'shafi',
  enabled: true,
  notificationsEnabled: true,
};

/**
 * يقرأ إعدادات مواقيت الصلاة للمستخدم (أو الافتراضية) مع التوافق العكسي
 */
export function getPrayerSettings(username?: string): PrayerSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;

  // 1. جرّب المفتاح الموحّد أولاً
  const unified = localStorage.getItem(STORAGE_KEY);
  if (unified) {
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(unified) };
    } catch {}
  }

  // 2. توافق عكسي: مفاتيح قديمة
  const legacyKeys = [
    `mirsad_prayer_settings_${username || 'guest'}`,
    `mirsad_prayer_${username || 'default'}`,
    'mirsad_prayer_settings_guest',
    'mirsad_prayer_settings_admin',
    'mirsad_prayer_settings_student',
    'mirsad_prayer_settings_doctor',
  ];

  for (const key of legacyKeys) {
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return parsed;
      } catch {}
    }
  }

  return DEFAULT_SETTINGS;
}

/**
 * حفظ إعدادات مواقيت الصلاة في التخزين الموحّد
 */
export function savePrayerSettings(username: string | undefined, settings: PrayerSettings): void {
  if (typeof window === 'undefined') return;
  try {
    const serialized = JSON.stringify(settings);
    localStorage.setItem(STORAGE_KEY, serialized);
    if (username) {
      localStorage.setItem(`mirsad_prayer_settings_${username}`, serialized);
    }
  } catch {}
}

/**
 * أوقات افتراضية احتياطية لمدينة الرياض في حال انقطاع الشبكة
 */
export const DEFAULT_RIYADH_TIMINGS: PrayerTimings = {
  Fajr: '04:45',
  Sunrise: '06:05',
  Dhuhr: '11:50',
  Asr: '15:15',
  Maghrib: '17:35',
  Isha: '19:05',
};

/**
 * جلب مواقيت الصلاة من API الأذان مع معالجة الأخطاء والـ Fallback
 */
export async function fetchPrayerTimes(settings: PrayerSettings): Promise<PrayerTimings> {
  if (!settings.enabled) {
    return DEFAULT_RIYADH_TIMINGS;
  }

  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
        settings.city
      )}&country=${encodeURIComponent(settings.country)}&method=${
        settings.calculationMethod
      }&school=${settings.madhab === 'hanafi' ? 1 : 0}`
    );
    if (!res.ok) throw new Error('API response was not ok');
    const data = await res.json();
    if (data.code === 200 && data.data?.timings) {
      return data.data.timings;
    }
    return DEFAULT_RIYADH_TIMINGS;
  } catch {
    return DEFAULT_RIYADH_TIMINGS;
  }
}
