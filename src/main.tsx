import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { PrayerSettingsProvider } from './contexts/PrayerSettingsContext';
import { DataProvider } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SupportProvider } from './contexts/SupportContext';
import GlobalErrorBoundary from './components/ErrorBoundary/GlobalErrorBoundary';

// تطبيق الثيم قبل الرسم لمنع وميض الشاشة (FOUC)
import { getPreferredTheme, applyTheme } from './lib/theme';
applyTheme(getPreferredTheme());

// PWA
import { registerServiceWorker, setupInstallPrompt } from './lib/pwa';
setupInstallPrompt();
registerServiceWorker((registration) => {
  window.dispatchEvent(new CustomEvent('sw-update-available', { detail: registration }));
});

// طبقة حماية الواجهة الأمامية وإغلاق أدوات المطورين
import { initSecurityHardening } from './lib/securityHardening';
initSecurityHardening({ strictRedirect: false, showVisualBanner: true });

// منع ظهور خطأ Unhandled Rejection الناتج عن إغلاق WebSocket التطويري في البيئات السحابية
window.addEventListener('unhandledrejection', (event) => {
  const reasonMsg =
    event.reason instanceof Error
      ? event.reason.message
      : String(event.reason || '');
  if (
    reasonMsg.includes('WebSocket closed without opened') ||
    reasonMsg.includes('failed to connect to websocket')
  ) {
    event.preventDefault();
  }
});

// بعد نشر نسخة جديدة قد تشير الصفحة القديمة لمقاطع JS لم تعد موجودة: نعيد التحميل مرة واحدة فقط
window.addEventListener('vite:preloadError', (e) => {
  e.preventDefault();
  if (!sessionStorage.getItem('mirsad_chunk_reload')) {
    sessionStorage.setItem('mirsad_chunk_reload', '1');
    window.location.reload();
  }
});

function getRouterBasename(): string {
  if (typeof window === 'undefined') return '/';

  const hostname = window.location.hostname;
  const pathname = window.location.pathname;

  if (hostname.endsWith('github.io')) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      return `/${segments[0]}`;
    }
  }

  return '/';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <ThemeProvider>
        <BrowserRouter basename={getRouterBasename()}>
          <AuthProvider>
            <PrayerSettingsProvider>
              <DataProvider>
                <SupportProvider>
                  <App />
                </SupportProvider>
              </DataProvider>
            </PrayerSettingsProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </GlobalErrorBoundary>
  </StrictMode>
);