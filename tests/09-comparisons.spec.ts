import { test, expect } from '@playwright/test';
import { resetStorage, loginAsAdmin } from './helpers';

// الأرقام المتوقعة تُحسب من معاملات FIPS 203/204/205 (انظر tests/pqc-sizes.test.mjs)
test.describe('المقارنات التحليلية', () => {
  test.beforeEach(async ({ page }) => {
    await resetStorage(page);
    await loginAsAdmin(page);
    await page.goto('/main/comparisons');
  });

  test('جدول التبادل يعرض أحجام ML-KEM-768 الصحيحة', async ({ page }) => {
    const row = page.getByRole('row', { name: /ML-KEM-768/ }).first();
    await expect(row).toContainText(/1.?184/); // المفتاح العام
    await expect(row).toContainText(/2.?400/); // المفتاح الخاص
    await expect(row).toContainText(/1.?088/); // النص المغلّف
  });

  test('جدول التواقيع يعرض ML-DSA-65 وSLH-DSA-128s', async ({ page }) => {
    await page.getByRole('tab', { name: /التواقيع الرقمية/ }).click();
    await expect(page.getByRole('row', { name: /ML-DSA-65/ })).toContainText(/3.?309/);
    await expect(page.getByRole('row', { name: /SLH-DSA-128s/ })).toContainText(/7.?856/);
  });

  test('المحاكي: الكلاسيكي يتسع في النافذة الأولى', async ({ page }) => {
    await page.getByRole('button', { name: 'كلاسيكي اليوم' }).click();
    await expect(page.getByText(/386 B/)).toBeVisible(); // 32 + (32 + 3×64 + 2×65)
    await expect(page.getByText('تتسع في النافذة الأولى')).toBeVisible();
  });

  test('المحاكي: ML-KEM-768 + ML-DSA-65 تتجاوز النافذة الأولى بجولة إضافية', async ({ page }) => {
    await page.getByRole('button', { name: 'ما بعد الكم كاملاً' }).click();
    await expect(page.getByText(/14.?919 B/)).toBeVisible(); // 1088 + 3×3309 + 2×1952
    await expect(page.getByText('تتجاوز النافذة الأولى: تأخير إضافي')).toBeVisible();
  });
});
