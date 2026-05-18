import { test, expect } from '@playwright/test';

test('Видимость элементов на хэдере страницы', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByAltText('Website for automation practice')).toBeVisible();
  await expect(page.getByRole('link', { name: ' Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: ' Products' })).toBeVisible();
  await expect(page.getByRole('link', { name: ' Cart' })).toBeVisible();
  await expect(page.getByRole('link', { name: ' Signup / Login' })).toBeVisible();
  await expect(page.getByRole('link', { name: ' Test Cases', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: ' API Testing' })).toBeVisible();
  await expect(page.getByRole('link', { name: ' Video Tutorials' })).toBeVisible();
  await expect(page.getByRole('link', { name: ' Contact us' })).toBeVisible();
});

test('Проверка лого в хэдере', async ({ page }) => {
  await test.step('Проверка лого и его размера', async () => {
    await page.goto('/');
    const logo = page.getByAltText('Website for automation practice');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveJSProperty('height', 92);
    await expect(logo).toHaveJSProperty('width', 263);
  });

  await test.step('Проверка наличия ссылки', async () => {
    const link = page.locator('a:has(img[alt="Website for automation practice"])');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/');
  });

  await test.step('Проверка перехода по ссылке и статус 200', async () => {
    const link = page.locator('a:has(img[alt="Website for automation practice"])');
    const href = await link.getAttribute('href');
    const response = await page.request.get(href as string);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });
});
