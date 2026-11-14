import { test, expect } from '@playwright/test';
import { resetStorage, loginAsAdmin } from './helpers';

test.describe('السيناريو الكامل', () => {
  test('من إنشاء المستخدم إلى التفعيل (E2E)', async ({ page }) => {
    test.setTimeout(60_000);

    // 1. أدمن ينشئ مستخدم
    await resetStorage(page);
    await loginAsAdmin(page);
    await page.goto('/admin');
    await page.getByRole('button', { name: /المستخدمون/ }).click();
    await page.getByPlaceholder(/الاسم الكامل/).fill('طالب اختبار');
    await page.getByPlaceholder(/الرقم الأكاديمي/).fill('25105375'); // فهد
    await page.getByPlaceholder(/رقم الجوال/).fill('0501111111');
    await page.getByRole('button', { name: /إنشاء الحساب/ }).click();

    // 2. استخراج بيانات الدخول
    const userText = await page.locator('.font-mono.text-emerald-400').textContent();
    const passText = await page.locator('.font-mono.text-amber-400').textContent();
    expect(userText).toBeTruthy();
    expect(passText).toBeTruthy();

    // 3. تسجيل الخروج
    await page.locator('button[title*="تسجيل الخروج"]').click();
    await page.waitForURL(/\/login/);

    // 4. الدخول بالمستخدم الجديد
    await page.getByPlaceholder(/الاسم أو الرقم الأكاديمي/).fill(userText!);
    await page.getByPlaceholder(/كلمة المرور/).fill(passText!);
    await page.getByRole('button', { name: /دخول النظام/ }).click();

    // 5. يُجبر على تغيير كلمة المرور
    await page.waitForURL(/\/change-password/);
    await page.getByPlaceholder(/كلمة المرور الحالية/).fill(passText!);
    await page.getByPlaceholder(/كلمة المرور الجديدة/).fill('NewPass@2024');
    await page.getByPlaceholder(/تأكيد/).fill('NewPass@2024');
    await page.getByRole('button', { name: /حفظ/ }).click();

    // 6. بطاقة التهنئة (لأن الرقم = فهد)
    await page.waitForURL(/\/congratulations/);
    await expect(page.getByText(/مهندس البنية التشفيرية/)).toBeVisible();

    // 7. حفظ البطاقة
    await page.getByRole('button', { name: /احفظ البطاقة/ }).click();
    await page.waitForURL(/\/main/);

    // 8. الدخول للمنصة الأكاديمية
    await page.getByRole('link', { name: /المنصة الأكاديمية/ }).click();
    await expect(page.getByText(/ISE243/)).toBeVisible();

    // 9. التحقق من أن شارة الزائر غير موجودة
    await expect(page.getByText('زائر')).not.toBeVisible();
  });
});
