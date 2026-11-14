# الخطوة النهائية (6 من 6) قبل الإطلاق: الكود الكامل لملف إعدادات البناء والنشر السحابي
**المسار في المشروع:** `vite.config.ts`

انسخ الكود التالي بالكامل واستبدل به محتوى ملف `vite.config.ts` (ينسخ تلقائياً ملفَي `_redirects` و`_headers` داخل مجلد `dist/` عند تنفيذ `npm run build`، ويحقن وسم `<base>` ديناميكياً في `dist/index.html` لضمان عمل جميع المسارات العميقة مثل `/academic/ise243/chapters/1` و`/admin/users` عند تحديث الصفحة على Netlify وVercel وGitHub Pages دون أي شاشة بيضاء أو خطأ `404`):

```ts
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

        // 1. إنشاء .nojekyll لمنع Jekyll من حجب الملفات على GitHub Pages
        fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

        // 2. نسخ _redirects و _headers تلقائياً داخل dist/ لضمان عمل التوجيه العميق على Netlify و Cloudflare
        fs.writeFileSync(path.join(distDir, '_redirects'), '/*    /index.html   200\n');
        const rootHeaders = path.resolve(__dirname, '_headers');
        if (fs.existsSync(rootHeaders)) {
          fs.copyFileSync(rootHeaders, path.join(distDir, '_headers'));
        }

        // 3. حقن وسم <base> ديناميكي في dist/index.html لمنع خطأ مسار ./assets/* عند تحديث المسارات الفرعية العميقة
        const distIndexPath = path.join(distDir, 'index.html');
        if (fs.existsSync(distIndexPath)) {
          let html = fs.readFileSync(distIndexPath, 'utf-8');
          const dynamicBaseScript = `<script>(function(){var b=document.createElement('base');if(location.hostname.endsWith('github.io')){var s=location.pathname.split('/').filter(Boolean);b.href=s.length>0?'/'+s[0]+'/':'/';}else{b.href='/';}document.head.insertBefore(b,document.head.firstChild);})();</script>`;
          if (!html.includes('document.createElement(\'base\')')) {
            html = html.replace('<head>', `<head>\n    ${dynamicBaseScript}`);
            fs.writeFileSync(distIndexPath, html, 'utf-8');
          }
        }

        // 4. إنشاء 404.html يحفظ المسار الفرعي ويعيد التوجيه لجذر المستودع على GitHub Pages
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
