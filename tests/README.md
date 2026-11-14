# 🧪 دليل الاختبارات — مِرْصَاد التشفير

## التثبيت

```bash
npm install
npx playwright install chromium
```

## التشغيل

```bash
# تشغيل كل الاختبارات
npm test

# تشغيل ملف محدد
npx playwright test tests/01-auth.spec.ts

# تشغيل الواجهة المرئية
npm run test:ui

# استعراض التقرير التفاعلي
npm run test:report
```

## هيكل الاختبارات

| الملف | ما يغطيه |
|-------|----------|
| `01-auth.spec.ts` | تسجيل الدخول، وضع الزوار، Rate Limiting، الحماية |
| `02-main-portal.spec.ts` | الداشبورد، المقارنات، السجل التاريخي، التعريفات |
| `03-academic.spec.ts` | الفصول، المخططات الفنية، ZKP، الفريق، الاختبار |
| `04-admin.spec.ts` | إنشاء المستخدمين، الفصول، الحماية السيبرانية |
| `05-features.spec.ts` | الوضع الليلي والنهاري، البحث الشامل، PWA والتجاوب |
| `06-flow.spec.ts` | السيناريو المتكامل E2E من الإنشاء حتى الشهادة |
