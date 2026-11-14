import { test, expect } from '@playwright/test';
import { resetStorage, loginAsAdmin } from './helpers';

test.describe('لوحة الأدمن', () => {
  test.beforeEach(async ({ page }) => {
    await resetStorage(page);
    await loginAsAdmin(page);
    await page.goto('/admin');
  });

  test('3 تبويبات موجودة', async ({ page }) => {
    await expect(page.getByRole('button', { name: /نظرة عامة/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /المستخدمون/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /الفصول/ })).toBeVisible();
  });

  test('إنشاء مستخدم جديد ينجح', async ({ page }) => {
    await page.getByRole('button', { name: /المستخدمون/ }).click();
    await page.getByPlaceholder(/الاسم الكامل/).fill('طالب تجريبي');
    await page.getByPlaceholder(/الرقم الأكاديمي/).fill('99999999');
    await page.getByPlaceholder(/رقم الجوال/).fill('0509999999');
    await page.getByRole('button', { name: /إنشاء الحساب/ }).click();
    await expect(page.getByText(/تم إنشاء الحساب/)).toBeVisible();
    await expect(page.getByText(/بيانات الدخول المولّدة/)).toBeVisible();
  });

  test('رفض بريد/جوال غير صالح', async ({ page }) => {
    await page.getByRole('button', { name: /المستخدمون/ }).click();
    await page.getByPlaceholder(/الاسم الكامل/).fill('اختبار');
    await page.getByPlaceholder(/الرقم الأكاديمي/).fill('111');
    await page.getByPlaceholder(/رقم الجوال/).fill('123');
    await page.getByRole('button', { name: /إنشاء الحساب/ }).click();
    await expect(page.getByText(/الجوال يجب/)).toBeVisible();
  });

  test('حماية admin من الحذف', async ({ page }) => {
    await page.getByRole('button', { name: /المستخدمون/ }).click();
    const adminRow = page.locator('tr').filter({ hasText: /admin/ });
    const delBtn = adminRow.locator('button[disabled]');
    await expect(delBtn).toBeVisible();
  });
});
