// src/lib/securityHardening.ts
/**
 * طبقة حماية الواجهة الأمامية وإغلاق أدوات المطورين (Front-End Hardening & Anti-Tamper)
 * تمنع النقر بالزر الأيمن، وتعطل اختصارات فحص العناصر، وترصد فتح أدوات المطورين DevTools.
 */

import { logSecurityEvent } from './security';
import { createNotification } from './notifications';

export interface HardeningOptions {
  /** تفعيل الوضع الصارم الذي يعيد توجيه الصفحة عند كشف محاولة الفحص (لبيئات الإنتاج المستقلة) */
  strictRedirect?: boolean;
  /** إظهار تنبيه بصري سيبراني عائم */
  showVisualBanner?: boolean;
}

let isHardeningInitialized = false;

// إظهار تنبيه سيبراني أمني أنيق داخل الصفحة متوافق مع كافة بيئات العرض
function displayCyberSecurityAlert(message: string) {
  // 1. إرسال إشعار للنظام وللأدمن
  createNotification({
    type: 'warning',
    title: '🚨 تنبيه أمني مشدد (Anti-DevTools)',
    message,
    broadcast: true,
    expiresAt: Date.now() + 60 * 1000,
  });

  // 2. عرض شريط تحذيري عائم في أعلى الصفحة
  const existingBanner = document.getElementById('mirsad-security-alert-banner');
  if (existingBanner) return;

  const banner = document.createElement('div');
  banner.id = 'mirsad-security-alert-banner';
  banner.setAttribute('dir', 'rtl');
  banner.className =
    'fixed top-4 left-1/2 -translate-x-1/2 z-[99999] px-6 py-3.5 rounded-2xl bg-red-950/95 text-red-200 border-2 border-red-500/80 shadow-[0_0_30px_rgba(239,68,68,0.5)] backdrop-blur-xl flex items-center gap-3 font-sans transition-all animate-bounce';

  banner.innerHTML = `
    <span class="text-xl">🚨</span>
    <div>
      <div class="text-xs font-black text-red-400">نظام المراقبة السيبرانية (مِرْصَاد)</div>
      <div class="text-xs font-bold text-white">${message}</div>
    </div>
    <button id="close-sec-banner" class="mr-2 px-2.5 py-1 text-[11px] rounded-lg bg-red-800/80 hover:bg-red-700 text-white border border-red-400/50">
      إغلاق
    </button>
  `;

  document.body.appendChild(banner);

  document.getElementById('close-sec-banner')?.addEventListener('click', () => {
    banner.remove();
  });

  setTimeout(() => {
    banner.remove();
  }, 7000);
}

// طبقة حماية الواجهة الأمامية وإغلاق أدوات المطورين
export function initSecurityHardening(options: HardeningOptions = {}) {
  // 1. إغلاق كامل للـ Console في الإنتاج لمنع تسريب أي معلومات عبر المطورين
  const isProd =
    (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') ||
    (typeof import.meta !== 'undefined' && Boolean((import.meta as unknown as { env?: { PROD?: boolean } }).env?.PROD));

  if (isProd) {
    console.log = () => {};
  }

  if (isHardeningInitialized || typeof window === 'undefined' || typeof document === 'undefined') return;
  isHardeningInitialized = true;

  // 2. تفعيل منع التنفيذ المباشر (CSP - Content Security Policy Injection)
  if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content =
      "default-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https: wss:;";
    document.head.appendChild(meta);
  }

  const { strictRedirect = false, showVisualBanner = true } = options;

  // 3. منع النقر بزر الماوس الأيمن
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (showVisualBanner) {
      displayCyberSecurityAlert('النقر بزر الفأرة الأيمن محظور لحماية الملكية الفكرية والأصول البرمجية.');
    }
    logSecurityEvent('unauthorized_inspection', { reason: 'right_click_contextmenu' });
    return false;
  });

  // 2. الكشف عن فتح أدوات المطورين عبر قياس حجم النافذة ومراقبة البريمج
  let devtoolsOpen = false;
  const threshold = 160;

  // فحص ما إذا كانت الصفحة تعمل داخل إطار مستقل أو مدمج
  const isStandalone = window.self === window.top;

  setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        const alertMsg = 'تحذير أمني: تم رصد محاولة استعراض الكود البرمجي!';

        logSecurityEvent('devtools_opened', {
          widthDiff: window.outerWidth - window.innerWidth,
          heightDiff: window.outerHeight - window.innerHeight,
          timestamp: new Date().toISOString()
        });

        if (showVisualBanner) {
          displayCyberSecurityAlert(alertMsg);
        }

        // في بيئة الإنتاج المستقلة فقط، إذا تم تمكين الوضع الصارم يتم إعادة التوجيه
        if (strictRedirect && isStandalone) {
          window.location.href = 'about:blank';
        }
      }
    } else {
      devtoolsOpen = false;
    }
  }, 1000);

  // 3. تعطيل اختصارات لوحة المفاتيح الشائعة لفتح الأدوات
  document.addEventListener('keydown', (e) => {
    const key = e.key ? e.key.toUpperCase() : '';
    const isInspectKey =
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(key)) ||
      (e.ctrlKey && key === 'U') ||
      (e.ctrlKey && key === 'S');

    if (isInspectKey) {
      e.preventDefault();
      logSecurityEvent('unauthorized_inspection', {
        key: e.key,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
      });

      if (showVisualBanner) {
        displayCyberSecurityAlert('تحذير أمني: اختصارات فحص واستعراض الكود البرمجي معطلة!');
      }

      return false;
    }
  });

  console.info('🛡️ [Mirsad Security] Front-End Hardening & Anti-DevTools initialized.');
}

/** الاسم المترادف للدالة لتسهيل الربط في MainLayout والمكونات */
export const securityHardening = initSecurityHardening;
export default initSecurityHardening;
