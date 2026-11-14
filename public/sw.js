/**
 * Mirsad Al-Tashfeer Service Worker v5.0.0
 * Network-First Strategy with automatic legacy cache cleanup
 */

const CACHE_NAME = 'mirsad-cache-v5';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) return;

  // Network-First: دائماً جلب أحدث نسخة من الخادم لتجنب عرض صفحة قديمة مخزنة
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

