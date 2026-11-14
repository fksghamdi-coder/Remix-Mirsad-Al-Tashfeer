import { test, expect } from '@playwright/test';
import { resetStorage, loginAsAdmin } from './helpers';

test.describe('المنصة الأساسية', () => {
  test.beforeEach(async ({ page }) => {
    await resetStorage(page);
    await loginAsAdmin(page);
  });

  test('الداشبورد يعرض KPIs والرسوم', async ({ page }) => {
    await expect(page.getByText(/15\.2/)).toBeVisible();
    await expect(page.getByText(/21\.3/)).toBeVisible();
    await expect(page.locator('.recharts-wrapper').first()).toBeVisible();
  });

  test('صفحة المقارنات تعرض جدولاً', async ({ page }) => {
    await page.getByRole('link', { name: /المقارنات/ }).click();
    await expect(page.getByText(/ML-KEM-768/)).toBeVisible();
    await expect(page.getByText(/RSA-2048/)).toBeVisible();
  });

  test('البحث في المقارنات يعمل', async ({ page }) => {
    await page.goto('/main/comparisons');
    await page.getByPlaceholder(/ابحث/).fill('ML-KEM');
    await expect(page.getByText(/ML-KEM-768/)).toBeVisible();
  });

  test('السجل التاريخي يعرض أحداثاً', async ({ page }) => {
    await page.goto('/main/timeline');
    await expect(page.getByText(/شيفرة قيصر/)).toBeVisible();
    await expect(page.getByText(/FIPS 203/)).toBeVisible();
  });

  test('فلتر السجل يعمل', async ({ page }) => {
    await page.goto('/main/timeline');
    await page.getByRole('button', { name: /السعودية/ }).click();
    await expect(page.getByText(/إنشاء الهيئة الوطنية/)).toBeVisible();
  });

  test('التعريفات تعرض المصطلحات', async ({ page }) => {
    await page.goto('/main/definitions');
    await expect(page.getByText(/الضرب القياسي/)).toBeVisible();
    await expect(page.getByText(/ECDH/)).toBeVisible();
  });

  test('البحث في التعريفات فوري', async ({ page }) => {
    await page.goto('/main/definitions');
    await page.getByPlaceholder(/ابحث/).fill('متجانس');
    await expect(page.getByText(/التشفير المتجانس/)).toBeVisible();
  });
});
