# الملف السادس المستقل الكامل: `vite.config.ts`

```typescript
// File: vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'multi-cloud-spa-deploy',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist');
        if (!fs.existsSync(distDir)) return;

        const buildId = String(Date.now());
        const builtAt = new Date().toISOString();

        // 1. إنشاء .nojekyll لمنع Jekyll من حجب الملفات على GitHub Pages
        fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

        // 2. كتابة ملف version.json الفريد لكل عملية بناء على GitHub لإجبار السيرفر والمتصفح على التحديث الفوري
        fs.writeFileSync(
          path.join(distDir, 'version.json'),
          JSON.stringify({ buildId, builtAt }, null, 2),
          'utf-8'
        );

        // 3. تحديث dist/sw.js برقم البناء الجديد واستراتيجية no-store لإلغاء أي كاش قديم فوراً عند تحديث الكود في GitHub
        const swContent = `/**
 * Mirsad Al-Tashfeer Service Worker — Auto-Versioned Build ${buildId}
 */
const CACHE_NAME = 'mirsad-cache-${buildId}';

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

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) return;

  // إجبار جلب أحدث نسخة من السيرفر دائماً دون الاعتماد على الكاش القديم
  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(event.request))
  );
});
`;
        fs.writeFileSync(path.join(distDir, 'sw.js'), swContent, 'utf-8');

        // 4. نسخ _redirects و _headers مع ترويسات منع التخزين المؤقت لـ index.html و version.json و sw.js
        fs.writeFileSync(path.join(distDir, '_redirects'), '/*    /index.html   200\n');
        const antiCacheHeaders = `/index.html
  Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0
/version.json
  Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0
/sw.js
  Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0
`;
        const rootHeaders = path.resolve(__dirname, '_headers');
        const baseHeaders = fs.existsSync(rootHeaders) ? fs.readFileSync(rootHeaders, 'utf-8') : '';
        fs.writeFileSync(path.join(distDir, '_headers'), baseHeaders + '\n' + antiCacheHeaders, 'utf-8');

        // 5. حقن وسم <base> الديناميكي + فاحص تحديثات GitHub التلقائي في dist/index.html
        const distIndexPath = path.join(distDir, 'index.html');
        if (fs.existsSync(distIndexPath)) {
          let html = fs.readFileSync(distIndexPath, 'utf-8');
          const dynamicBootScript = `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <script>(function(){
      var b=document.createElement('base');
      if(location.hostname.endsWith('github.io')){
        var s=location.pathname.split('/').filter(Boolean);
        b.href=s.length>0?'/'+s[0]+'/':'/';
      }else{
        b.href='/';
      }
      document.head.insertBefore(b,document.head.firstChild);
      var currentBuild='${buildId}';
      var prevBuild=localStorage.getItem('mirsad_deployed_build_id');
      if(prevBuild && prevBuild!==currentBuild){
        localStorage.setItem('mirsad_deployed_build_id',currentBuild);
        if('caches' in window){caches.keys().then(function(ks){ks.forEach(function(k){caches.delete(k);});});}
      }else if(!prevBuild){
        localStorage.setItem('mirsad_deployed_build_id',currentBuild);
      }
      fetch(b.href+'version.json?t='+Date.now(),{cache:'no-store'})
        .then(function(r){return r.ok?r.json():null;})
        .then(function(data){
          if(data&&data.buildId&&data.buildId!==localStorage.getItem('mirsad_deployed_build_id')){
            localStorage.setItem('mirsad_deployed_build_id',data.buildId);
            if('caches' in window){
              caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return caches.delete(k);}));})
                .then(function(){location.reload();});
            }else{
              location.reload();
            }
          }
        }).catch(function(){});
    })();</script>`;
          if (!html.includes('mirsad_deployed_build_id')) {
            html = html.replace('<head>', `<head>\n    ${dynamicBootScript}`);
            fs.writeFileSync(distIndexPath, html, 'utf-8');
          }
        }

        // 6. إنشاء 404.html يحفظ المسار الفرعي ويعيد التوجيه لجذر المستودع على GitHub Pages
        const notFoundHtml = `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>مِرْصَاد التشفير | جاري التحويل...</title>
    <script>
      (function () {
        var l = window.location;
        var fullPath = l.pathname + l.search + l.hash;
        try {
          sessionStorage.setItem('mirsad_gh_redirect', fullPath);
        } catch (e) {}
        if (l.hostname.endsWith('github.io')) {
          var segments = l.pathname.split('/').filter(Boolean);
          var repoBase = segments.length > 0 ? '/' + segments[0] + '/' : '/';
          l.replace(repoBase);
        } else {
          l.replace('/');
        }
      })();
    </script>
  </head>
  <body style="background:#020617;color:#f8fafc;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
    جاري فتح منصة مِرْصَاد التشفير...
  </body>
</html>`;
        fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);
      },
    },
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/mirsad-app-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 2500,
  },
  server: { port: 3000, host: '0.0.0.0', hmr: false },
});
```
