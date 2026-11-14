import { test, expect } from '@playwright/test';
import { resetStorage, loginAsAdmin } from './helpers';

test.describe('ميزات متقدمة', () => {
  test('الوضع الليلي/النهاري يعمل', async ({ page }) => {
    await resetStorage(page);
    await loginAsAdmin(page);

    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');

    const themeBtn = page.locator('button[title*="الوضع"]').first();
    await themeBtn.click();

    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('البحث الشامل يعمل', async ({ page }) => {
    await resetStorage(page);
    await loginAsAdmin(page);

    const searchBtn = page.locator('button[title="بحث شامل"]').first();
    await searchBtn.click();
    await expect(page.getByPlaceholder(/ابحث في الفصول/)).toBeVisible();
  });

  test('PWA manifest موجود', async ({ page, request }) => {
    const res = await request.get('/manifest.json');
    expect(res.status()).toBe(200);
    const manifest = await res.json();
    expect(manifest.name).toContain('مِرْصَاد');
    expect(manifest.start_url).toBe('/');
  });

  test('التصميم متجاوب على الجوال', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/login');
    await expect(page.getByRole('button', { name: /دخول النظام/ })).toBeVisible();
  });
});
