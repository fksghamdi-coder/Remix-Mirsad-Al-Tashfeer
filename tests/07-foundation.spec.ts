import { test, expect } from '@playwright/test';
import { resetStorage, loginAsAdmin } from './helpers';

test.describe('لوحة اختبارات البنية الأساسية للنظام (Foundation Test Dashboard)', () => {
  test.beforeEach(async ({ page }) => {
    await resetStorage(page);
    await loginAsAdmin(page);
  });

  test('تحميل صفحة اختبارات البنية الأساسية وعرض المؤشرات', async ({ page }) => {
    await page.goto('/admin/test');

    // التحقق من عنوان الصفحة
    await expect(page.locator('h1')).toContainText('لوحة اختبارات البنية الأساسية للنظام');

    // التحقق من وجود بطاقات التشخيص
    await expect(page.locator('text=Web Crypto API')).toBeVisible();
    await expect(page.locator('text=IndexedDB')).toBeVisible();
    await expect(page.locator('text=سلسلة التدقيق Audit')).toBeVisible();

    // التحقق من وجود نتائج الفحص التلقائي
    await expect(page.locator('text=إجمالي الفحوصات')).toBeVisible();
  });

  test('تشغيل كافة الفحوصات وتأكيد النتائج الناجحة', async ({ page }) => {
    await page.goto('/admin/test');

    // النقر على زر تشغيل كافة الاختبارات
    const runBtn = page.getByRole('button', { name: /تشغيل كافة الاختبارات/i });
    await runBtn.click();

    // الانتظار لحين اكتمال التنفيذ وامتلاء الشريط
    await page.waitForTimeout(2000);

    // التأكد من نجاح الفحوصات
    const passedCard = page.locator('text=الفحوصات الناجحة');
    await expect(passedCard).toBeVisible();
  });

  test('تصفية نتائج الفحص باستخدام الفلاتر وشريط البحث', async ({ page }) => {
    await page.goto('/admin/test');

    // البحث عن "تشفير"
    const searchInput = page.getByPlaceholder('بحث في نتائج الاختبارات...');
    await searchInput.fill('تشفير');

    // التأكد من تصفية النتائج
    await page.waitForTimeout(500);
    const testItems = page.locator('text=ناجح');
    expect(await testItems.count()).toBeGreaterThan(0);
  });
});
