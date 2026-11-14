import { Page } from '@playwright/test';

// لا توجد كلمة مرور افتراضية: أول اختبار ينشئ الأدمن عبر /setup
export const ADMIN = { fullName: 'مدير الاختبار', username: 'testadmin', password: 'T3st!Admin2026' };

/** ينظف localStorage قبل كل اختبار */
export async function resetStorage(page: Page) {
  await page.goto('/welcome');
  await page.evaluate(() => localStorage.clear());
}

/** ينشئ الأدمن الأول إن لم يوجد، ثم يدخل */
export async function loginAsAdmin(page: Page) {
  await page.goto('/setup');
  await page.waitForLoadState('networkidle');
  if (page.url().includes('/setup')) {
    await page.getByPlaceholder('الاسم الكامل').fill(ADMIN.fullName);
    await page.getByPlaceholder(/اسم المستخدم/).fill(ADMIN.username);
    await page.getByPlaceholder('كلمة المرور الجديدة').fill(ADMIN.password);
    await page.getByPlaceholder('تأكيد كلمة المرور').fill(ADMIN.password);
    await page.getByRole('button', { name: /إنشاء حساب المشرف/ }).click();
    await page.waitForURL(/\/main/);
    return;
  }
  await page.goto('/login');
  await page.getByPlaceholder(/الاسم أو الرقم الأكاديمي/).fill(ADMIN.username);
  await page.getByPlaceholder(/كلمة المرور/).fill(ADMIN.password);
  await page.getByRole('button', { name: /دخول النظام/ }).click();
  await page.waitForURL(/\/main/);
}

/** ينتظر استقرار الصفحة */
export async function waitForApp(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
}
