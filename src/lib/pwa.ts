// src/lib/pwa.ts
// إدارة تسجيل Service Worker، التثبيت، التحديثات، وحالة الاتصال

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners: Set<(p: BeforeInstallPromptEvent | null) => void> = new Set();

/* ============ تسجيل Service Worker ============ */
export async function registerServiceWorker(
  onUpdateAvailable?: (registration: ServiceWorkerRegistration) => void
): Promise<void> {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) {
    console.warn('[PWA] Service Worker غير مدعوم');
    return;
  }

  // في التطوير: ألغِ أي Service Worker قديم لأن تخزينه المؤقت يعطّل إعادة تشغيل خادم Vite
  if (import.meta.env.DEV) {
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      console.log('[PWA] وضع التطوير — Service Worker معطّل');
    } catch {
      /* تجاهل */
    }
    return;
  }

  try {
    let swUrl = './sw.js';
    let swScope = './';
    if (window.location.hostname.endsWith('github.io')) {
      const firstSeg = window.location.pathname.split('/').filter(Boolean)[0];
      if (firstSeg) {
        swUrl = `/${firstSeg}/sw.js`;
        swScope = `/${firstSeg}/`;
      }
    }
    const registration = await navigator.serviceWorker.register(swUrl, {
      scope: swScope,
    });
    console.log('[PWA] Service Worker مسجل', registration.scope);

    // مراقبة التحديثات
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('[PWA] تحديث جديد متاح');
          onUpdateAvailable?.(registration);
        }
      });
    });

    // تحديث دوري كل ساعة (مع ابتلاع خطأ انقطاع الشبكة)
    setInterval(() => {
      if (navigator.onLine === false) return;
      registration.update().catch(() => {});
    }, 60 * 60 * 1000);
  } catch (err) {
    console.error('[PWA] فشل تسجيل Service Worker', err);
  }
}

/* ============ التثبيت ============ */
export function setupInstallPrompt(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    listeners.forEach((fn) => fn(deferredPrompt));
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    listeners.forEach((fn) => fn(null));
  });
}

export function canInstall(): boolean {
  return !!deferredPrompt;
}

export async function promptInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  if (!deferredPrompt) return 'unavailable';
  await deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  deferredPrompt = null;
  listeners.forEach((fn) => fn(null));
  return result.outcome;
}

export function onInstallAvailable(fn: (p: BeforeInstallPromptEvent | null) => void): () => void {
  listeners.add(fn);
  fn(deferredPrompt);
  return () => listeners.delete(fn);
}

/* ============ تحديث ============ */
export async function applyUpdate(registration: ServiceWorkerRegistration): Promise<void> {
  const waiting = registration.waiting;
  if (!waiting) {
    window.location.reload();
    return;
  }
  waiting.postMessage({ type: 'SKIP_WAITING' });
  navigator.serviceWorker.addEventListener(
    'controllerchange',
    () => {
      window.location.reload();
    },
    { once: true }
  );
}

/* ============ وضع Standalone ============ */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

/* ============ حالة الاتصال ============ */
export function setupOnlineStatus(cb: (online: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => cb(navigator.onLine);
  window.addEventListener('online', handler);
  window.addEventListener('offline', handler);
  cb(navigator.onLine);
  return () => {
    window.removeEventListener('online', handler);
    window.removeEventListener('offline', handler);
  };
}
