// src/lib/theme.ts
import { SyncEngine } from './syncEngine';

export type Theme = 'dark' | 'light';
export type ThemePreference = 'dark' | 'light' | 'system';

const STORAGE_KEY = 'mirsad_theme_preference';

export function getStoredPreference(): ThemePreference | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light' || stored === 'system') {
    return stored;
  }
  return null;
}

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

export function resolveTheme(preference: ThemePreference): Theme {
  return preference === 'system' ? getSystemTheme() : preference;
}

export function getPreferredTheme(): Theme {
  const preference = getStoredPreference();
  if (!preference) return 'dark'; // الافتراضي
  return resolveTheme(preference);
}

/**
 * تطبيق الثيم على الصفحة
 * - يضبط data-theme على <html>
 * - يضبط dark class (لتوافق Tailwind)
 * - يضبط meta theme-color
 * - يضيف انتقال سلس
 */
export function applyTheme(theme: Theme, preference?: ThemePreference) {
  if (typeof document === 'undefined') return;

  const html = document.documentElement;
  const body = document.body;

  // 1. إضافة كلاس الانتقال السلس
  body.classList.add('theme-transitioning');

  // 2. تطبيق الثيم وخصائص الألوان القياسية
  html.setAttribute('data-theme', theme);
  html.classList.toggle('dark', theme === 'dark');
  html.classList.toggle('light', theme === 'light');
  html.style.colorScheme = theme;

  // 3. تحديث meta theme-color
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'light' ? '#f1f6f4' : '#020617');
  }

  // 4. حفظ التفضيل (إن وُجد)
  if (preference) {
    localStorage.setItem(STORAGE_KEY, preference);
  }

  // 5. إزالة كلاس الانتقال بعد الانتهاء
  setTimeout(() => {
    body.classList.remove('theme-transitioning');
  }, 250);
}

/**
 * الاستماع لتغييرات تفضيل النظام
 */
export function watchSystemTheme(callback: (theme: Theme) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'light' : 'dark');
  };

  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
}
