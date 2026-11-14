import { test, expect } from '@playwright/test';
import { resetStorage } from './helpers';

// الزائر (بلا جلسة) لا يرى إلا شاشة الترحيب
const PROTECTED = [
  '/', '/main', '/observatory', '/saudi', '/zkp-lab', '/sources',
  '/about', '/team', '/contact', '/timeline', '/architecture',
  '/main/comparisons', '/main/definitions', '/legal', '/settings',
  '/academic', '/admin', '/admin/test', '/test', '/certificate',
];

test.describe('الزائر: شاشة واحدة فقط', () => {
  test.beforeEach(async ({ page }) => {
    await resetStorage(page);
  });

  for (const path of PROTECTED) {
    test(`يحوَّل ${path} إلى /welcome`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/welcome/);
    });
  }

  test('شاشة الترحيب لا تعرض بيانات ولا قائمة تنقل ولا فريقاً', async ({ page }) => {
    await page.goto('/welcome');
    await expect(page.getByRole('heading', { name: /أهلاً بك/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /تسجيل الدخول/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /إنشاء حساب/ })).toBeVisible();
    await expect(page.locator('header nav')).toHaveCount(0);
    await expect(page.locator('.recharts-wrapper')).toHaveCount(0);
    const text = (await page.locator('main').textContent()) || '';
    expect(text).not.toMatch(/\d{4,}/); // لا أرقام أكاديمية ولا إحصاءات
    expect(text).not.toMatch(/فهد|صالح|ياسر|ماهر|عبدالرحمن/); // لا أسماء طلاب
  });

  test('لا يوجد زر «الدخول كزائر» في أي صفحة دخول', async ({ page }) => {
    for (const p of ['/welcome', '/login', '/register']) {
      await page.goto(p);
      await expect(page.getByText(/الدخول كزائر/)).toHaveCount(0);
    }
  });
});
