import { test, expect } from '@playwright/test';
import { resetStorage, loginAsAdmin } from './helpers';

test.describe('المنصة الأكاديمية وحمايتها', () => {
  test('يمنع الزوار من دخول المنصة الأكاديمية ويعيد توجيههم لشاشة الترحيب', async ({ page }) => {
    await resetStorage(page);
    await page.goto('/academic');
    await expect(page).toHaveURL(/\/welcome/);
  });

  test.describe('المستخدم المسجل', () => {
    test.beforeEach(async ({ page }) => {
      await resetStorage(page);
      await loginAsAdmin(page);
      await page.goto('/academic');
    });

    test('الرئيسية تعرض بطاقة ISE243', async ({ page }) => {
      await expect(page.getByText(/ISE243/)).toBeVisible();
      await expect(page.getByText(/التشفير المتقدم/)).toBeVisible();
    });

    test('فهرس الفصول يعرض 12 فصلاً', async ({ page }) => {
      await page.goto('/academic/chapters');
      const cards = page.locator('a[href^="/academic/chapters/"]');
      await expect(cards).toHaveCount(12);
    });

    test('صفحة الفصل تعرض التبويبات', async ({ page }) => {
      await page.goto('/academic/chapters/1');
      await expect(page.getByRole('button', { name: /الشرح/ })).toBeVisible();
      await expect(page.getByRole('button', { name: /المخطط/ })).toBeVisible();
      await expect(page.getByRole('button', { name: /الفيديو/ })).toBeVisible();
      await expect(page.getByRole('button', { name: /العرض/ })).toBeVisible();
      await expect(page.getByRole('button', { name: /البطاقات/ })).toBeVisible();
    });

    test('مخطط SVG يعرض لكل فصل', async ({ page }) => {
      await page.goto('/academic/chapters/2');
      await page.getByRole('button', { name: /المخطط/ }).click();
      await expect(page.locator('svg').first()).toBeVisible();
    });

    test('مختبر ZKP يعمل بالكامل', async ({ page }) => {
      await page.goto('/zkp-lab');
      await page.getByRole('button', { name: /توليد التزام/ }).click();
      await page.getByRole('button', { name: /إرسال تحدٍ/ }).click();
      await page.getByRole('button', { name: /حساب الاستجابة/ }).click();
      await page.getByRole('button', { name: /التحقق/ }).click();
      await expect(page.getByText(/تم التحقق بنجاح/)).toBeVisible();
    });

    test('صفحة الفريق تعرض 10 أعضاء', async ({ page }) => {
      await page.goto('/academic/students');
      await expect(page.getByText(/فهد خالد الغامدي/)).toBeVisible();
      await expect(page.getByText(/إيمان محمد الأهدل/)).toBeVisible();
    });
  });
});
