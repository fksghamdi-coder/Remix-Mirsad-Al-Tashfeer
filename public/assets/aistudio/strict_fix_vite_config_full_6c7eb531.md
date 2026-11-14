# الكود الكامل المصحح لملف `vite.config.ts`

**المسار داخل المشروع:** `vite.config.ts` (انسخ الكود التالي بالكامل واستبدل محتوى ملف `vite.config.ts` الحالي به لإصلاح الكتابة فوق `dist/_redirects` أثناء البناء):

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

const PERSISTENT_DB_DIR = path.resolve(__dirname, 'data');
const PERSISTENT_ACCOUNTS_DB_FILE = path.resolve(__dirname, 'data/mirsad_central_server_db_v1.json');
const TMP_ACCOUNTS_DB_FILE = '/tmp/mirsad_central_server_db_v1.json';

interface ServerDBState {
  overrides: Record<string, Record<string, unknown>>;
  deletedUsers: string[];
  loginLogs: Array<Record<string, unknown>>;
  updatedAt: number;
}

function loadServerDB(): ServerDBState {
  const state: ServerDBState = {
    overrides: {},
    deletedUsers: [],
    loginLogs: [],
    updatedAt: Date.now(),
  };
  for (const filePath of [PERSISTENT_ACCOUNTS_DB_FILE, TMP_ACCOUNTS_DB_FILE]) {
    try {
      if (fs.existsSync(filePath)) {
        const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if (parsed && typeof parsed === 'object') {
          state.overrides = { ...state.overrides, ...(parsed.overrides || {}) };
          state.deletedUsers = Array.from(
            new Set([
              ...state.deletedUsers,
              ...(Array.isArray(parsed.deletedUsers) ? parsed.deletedUsers : []),
            ])
          );
          if (Array.isArray(parsed.loginLogs) && parsed.loginLogs.length > 0) {
            state.loginLogs = parsed.loginLogs;
          }
          state.updatedAt = Math.max(state.updatedAt, parsed.updatedAt || Date.now());
        }
      }
    } catch {}
  }
  return state;
}

function saveServerDB(state: ServerDBState): void {
  state.updatedAt = Date.now();
  const raw = JSON.stringify(state, null, 2);
  try {
    if (!fs.existsSync(PERSISTENT_DB_DIR)) {
      fs.mkdirSync(PERSISTENT_DB_DIR, { recursive: true });
    }
    fs.writeFileSync(PERSISTENT_ACCOUNTS_DB_FILE, raw, 'utf-8');
  } catch {}
  try {
    fs.writeFileSync(TMP_ACCOUNTS_DB_FILE, raw, 'utf-8');
  } catch {}
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'mirsad-central-accounts-api-and-multi-cloud-deploy',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || '';
          if (
            !url.startsWith('/api/accounts') &&
            !url.startsWith('/.netlify/functions/accounts')
          ) {
            return next();
          }

          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader(
            'Cache-Control',
            'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
          );

          if (req.method === 'GET') {
            const db = loadServerDB();
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, ...db }));
            return;
          }

          if (req.method === 'POST') {
            let bodyRaw = '';
            req.on('data', (chunk) => {
              bodyRaw += chunk;
            });
            req.on('end', () => {
              try {
                const body = JSON.parse(bodyRaw || '{}');
                const db = loadServerDB();
                const action = body.action;

                if (action === 'UPSERT_USER' && body.account) {
                  const acc = body.account;
                  const cleanU = String(acc.username || '').toLowerCase().trim();
                  const cleanAcad = String(acc.academicId || '').toLowerCase().trim();
                  if (cleanU) {
                    const prev = db.overrides[cleanU] || {};
                    db.overrides[cleanU] = {
                      ...prev,
                      ...acc,
                      username: cleanU,
                      isDeleted: false,
                      deletedAt: 0,
                      updatedAt: Date.now(),
                    };
                    const delSet = new Set(db.deletedUsers || []);
                    delSet.delete(cleanU);
                    if (cleanAcad) delSet.delete(cleanAcad);
                    db.deletedUsers = Array.from(delSet);
                    saveServerDB(db);
                  }
                } else if (action === 'DELETE_USER') {
                  const cleanU = String(body.username || '').toLowerCase().trim();
                  const cleanAcad = String(body.academicId || '').toLowerCase().trim();
                  if (cleanU && cleanU !== 'admin') {
                    const prev = db.overrides[cleanU] || {};
                    const resolvedAcad =
                      cleanAcad || String(prev.academicId || '').toLowerCase().trim();
                    db.overrides[cleanU] = {
                      username: cleanU,
                      academicId: resolvedAcad || cleanU,
                      fullName: prev.fullName || cleanU,
                      isDeleted: true,
                      deletedAt: Date.now(),
                      password: '',
                      passwordHash: '',
                      passwordSalt: '',
                      updatedAt: Date.now(),
                    };
                    const delSet = new Set(db.deletedUsers || []);
                    delSet.add(cleanU);
                    if (resolvedAcad) delSet.add(resolvedAcad);
                    db.deletedUsers = Array.from(delSet);
                    saveServerDB(db);
                  }
                } else if (action === 'ADD_LOGIN_LOG' && body.log) {
                  const log = body.log;
                  if (!db.loginLogs.some((x) => x.id === log.id)) {
                    db.loginLogs = [log, ...db.loginLogs].slice(0, 300);
                  }
                  saveServerDB(db);
                } else if (action === 'SYNC_MERGE' && body.localOverrides) {
                  const delSet = new Set(db.deletedUsers || []);
                  for (const [k, rec] of Object.entries(
                    body.localOverrides as Record<string, Record<string, unknown>>
                  )) {
                    const cleanK = String(rec.username || k).toLowerCase().trim();
                    if (!cleanK) continue;
                    const cleanAcad = String(rec.academicId || '').toLowerCase().trim();
                    if (rec.isDeleted && cleanK !== 'admin') {
                      delSet.add(cleanK);
                      if (cleanAcad) delSet.add(cleanAcad);
                      db.overrides[cleanK] = {
                        ...rec,
                        username: cleanK,
                        isDeleted: true,
                        updatedAt: Number(rec.updatedAt) || Date.now(),
                      };
                    } else if (!delSet.has(cleanK) && (!cleanAcad || !delSet.has(cleanAcad))) {
                      const existing = db.overrides[cleanK];
                      if (
                        !existing ||
                        (Number(rec.updatedAt || 0) >= Number(existing.updatedAt || 0) &&
                          !existing.isDeleted)
                      ) {
                        db.overrides[cleanK] = {
                          ...existing,
                          ...rec,
                          username: cleanU_or_K(cleanK),
                        };
                      }
                    }
                  }
                  db.deletedUsers = Array.from(delSet);
                  saveServerDB(db);
                }

                res.statusCode = 200;
                res.end(JSON.stringify({ ok: true, ...db }));
              } catch (e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ ok: false, error: String(e) }));
              }
            });
            return;
          }
          next();
        });
      },
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

        // 3. تحديث dist/sw.js برقم البناء الجديد واستثناء مسارات /api/ و /.netlify/
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
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/.netlify/')) return;

  event.respondWith(
    fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(event.request))
  );
});
`;
        fs.writeFileSync(path.join(distDir, 'sw.js'), swContent, 'utf-8');

        // 4. كتابة dist/_redirects مع توجيه /api/accounts إلى /.netlify/functions/accounts قبل /* /index.html 200
        const redirectsContent = `/api/accounts  /.netlify/functions/accounts  200
/*             /index.html                   200
`;
        fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent, 'utf-8');

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
}));

function cleanU_or_K(val: string): string {
  return val;
}

```
