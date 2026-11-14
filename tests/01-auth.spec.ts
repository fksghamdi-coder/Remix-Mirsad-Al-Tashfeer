import { test, expect } from '@playwright/test';
import { resetStorage, loginAsAdmin } from './helpers';

test.describe('نظام المصادقة', () => {
  test.beforeEach(async ({ page }) => {
    await resetStorage(page);
  });

  test('يحمّل صفحة تسجيل الدخول بنجاح', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByText(/مِرْصَاد التشفير/)).toBeVisible();
    await expect(page.getByRole('button', { name: /دخول النظام/ })).toBeVisible();
  });

  test('يرفض بيانات دخول خاطئة', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/الاسم أو الرقم الأكاديمي/).fill('wrong');
    await page.getByPlaceholder(/كلمة المرور/).fill('wrong');
    await page.getByRole('button', { name: /دخول النظام/ }).click();
    await expect(page.getByText(/غير صحيحة|غير صحيح|غير موجود/)).toBeVisible({ timeout: 5000 });
  });

  test('ينشئ حساب المشرف الأول ويسجل الدخول', async ({ page }) => {
    await loginAsAdmin(page);
    await expect(page).toHaveURL(/\/main/);
    await expect(page.getByText(/مِرْصَاد التشفير/)).toBeVisible();
  });

  test('يحظر الحساب بعد 5 محاولات فاشلة', async ({ page }) => {
    await page.goto('/login');
    for (let i = 0; i < 5; i++) {
      await page.getByPlaceholder(/الاسم أو الرقم الأكاديمي/).fill('admin');
      await page.getByPlaceholder(/كلمة المرور/).fill('wrong');
      await page.getByRole('button', { name: /دخول النظام/ }).click();
      await page.waitForTimeout(300);
    }
    await expect(page.getByText(/قفل الحساب|مقفل مؤقتاً/)).toBeVisible();
  });

  test('يحمي المسارات المحمية ويحوّل الزائر إلى شاشة الترحيب', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/welcome/);
  });

  test('يعرض سياسة التشفير الثنائي ويمنع كشف كلمات المرور ويسجل الدخول بحساب طالب', async ({ page }) => {
    await page.goto('/login');
    // التأكد من عدم ظهور زر استيراد كلمات المرور في صفحة الدخول العامة
    await expect(page.getByRole('button', { name: /استيراد كلمات المرور/ })).toHaveCount(0);

    // عرض سياسة التشفير الثنائي والحماية المعززة
    const policyBtn = page.getByRole('button', { name: /سياسة واشتراطات التشفير الثنائي/ });
    await expect(policyBtn).toBeVisible();
    await policyBtn.click();
    await expect(page.getByText(/PBKDF2-HMAC-SHA256/)).toBeVisible();
    await expect(page.getByText(/AES-256-GCM/)).toBeVisible();

    // تسجيل الدخول المباشر بحساب الطالب فهد الغامدي 25105375
    await page.getByPlaceholder(/الاسم أو الرقم الأكاديمي/).fill('25105375');
    await page.getByPlaceholder(/كلمة المرور/).fill('Mirsad#5375');
    await page.getByRole('button', { name: /دخول النظام/ }).click();
    await expect(page).toHaveURL(/\/(main|congratulations)/);
  });
});
