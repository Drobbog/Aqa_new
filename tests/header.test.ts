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

test('Проверка Logo в хэдере', async ({ page }) => {
  await test.step('Проверка Logo и его размера', async () => {
    await page.goto('/');
    const logo = page.getByAltText('Website for automation practice');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveJSProperty('height', 92);
    await expect(logo).toHaveJSProperty('width', 263);
  });

  await test.step('Проверка наличия ссылки Logo', async () => {
    const logoLink = page.locator('a:has(img[alt="Website for automation practice"])');
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveAttribute('href', '/');
  });

  await test.step('Проверка перехода по ссылке Logo и статус 200', async () => {
    const logoLink = page.locator('a:has(img[alt="Website for automation practice"])');
    const href = await logoLink.getAttribute('href');
    const logoResponse = await page.request.get(href as string);
    expect(logoResponse.ok()).toBeTruthy();
    expect(logoResponse.status()).toBe(200);
  });
});

test('Проверка Home в хэдере', async ({ page }) => {
  await test.step('Проверка иконки и цвета Home', async () => {
    await page.goto('/');
    const home = page.locator('a:has(i.fa-home)').filter({ hasText: 'Home' });
    await expect(home).toHaveCSS('color', 'rgb(255, 165, 0)');
  });

  await test.step('Проверка наличия ссылки Home', async () => {
    await page.goto('/');
    const home = page.locator('a:has(i.fa-home)').filter({ hasText: 'Home' });
    await expect(home).toHaveAttribute('href', '/');
  });

  await test.step('Проверка перехода по ссылке Home и статус 200', async () => {
    const homeLink = page.locator('a:has(i.fa-home)').filter({ hasText: 'Home' });
    const href = await homeLink.getAttribute('href');
    const homeResponse = await page.request.get(href as string);
    expect(homeResponse.ok()).toBeTruthy();
    expect(homeResponse.status()).toBe(200);
  });
});

test('Проверка Products в хэдере', async ({ page }) => {
  await test.step('Проверка иконки Products', async () => {
    await page.goto('/');
    const products = page.locator('a:has(i.card_travel)').filter({ hasText: 'Products' });
    await expect(products).toHaveCSS('font-size', '14px');
  });

  await test.step('Проверка наличия ссылки Home', async () => {
    await page.goto('/');
    const products = page.locator('a:has(i.card_travel)').filter({ hasText: 'Products' });
    await expect(products).toHaveAttribute('href', '/products');
  });

  await test.step('Проверка перехода по ссылке Home и статус 200', async () => {
    const productsLink = page.locator('a:has(i.card_travel)').filter({ hasText: 'Products' });
    const href = await productsLink.getAttribute('href');
    const homeResponse = await page.request.get(href as string);
    expect(homeResponse.ok()).toBeTruthy();
    expect(homeResponse.status()).toBe(200);
  });
});

test('Проверка Cart в хэдере', async ({ page }) => {
  await test.step('Проверка иконки Cart', async () => {
    await page.goto('/');
    const cart = page.locator('a:has(i.fa-shopping-cart)').filter({ hasText: /^ Cart$/ });
    await expect(cart).toHaveCSS('font-size', '14px');
  });

  await test.step('Проверка наличия ссылки Cart', async () => {
    await page.goto('/');
    const cart = page.locator('a:has(i.fa-shopping-cart)').filter({ hasText: /^ Cart$/ });
    await expect(cart).toHaveAttribute('href', '/view_cart');
  });

  await test.step('Проверка перехода по ссылке Cart и статус 200', async () => {
    const cartLink = page.locator('a:has(i.fa-shopping-cart)').filter({ hasText: /^ Cart$/ });
    const href = await cartLink.getAttribute('href');
    const cartResponse = await page.request.get(href as string);
    expect(cartResponse.ok()).toBeTruthy();
    expect(cartResponse.status()).toBe(200);
  });
});

test('Проверка Signup / Login в хэдере', async ({ page }) => {
  await test.step('Проверка иконки Signup / Login', async () => {
    await page.goto('/');
    const login = page.locator('a:has(i.fa-lock)').filter({ hasText: 'Signup / Login' });
    await expect(login).toHaveCSS('font-size', '14px');
  });

  await test.step('Проверка наличия ссылки Signup / Login', async () => {
    await page.goto('/');
    const login = page.locator('a:has(i.fa-lock)').filter({ hasText: 'Signup / Login' });
    await expect(login).toHaveAttribute('href', '/login');
  });

  await test.step('Проверка перехода по ссылке Signup / Login и статус 200', async () => {
    const loginLink = page.locator('a:has(i.fa-lock)').filter({ hasText: 'Signup / Login' });
    const href = await loginLink.getAttribute('href');
    const loginResponse = await page.request.get(href as string);
    expect(loginResponse.ok()).toBeTruthy();
    expect(loginResponse.status()).toBe(200);
  });
});

test('Проверка Test Cases в хэдере', async ({ page }) => {
  await test.step('Проверка иконки Test Cases', async () => {
    await page.goto('/');
    const cases = page.locator('a:has(i.fa-list)').filter({ hasText: 'Test Cases' });
    await expect(cases).toHaveCSS('font-size', '14px');
  });

  await test.step('Проверка наличия ссылки Test Cases', async () => {
    await page.goto('/');
    const cases = page.locator('a:has(i.fa-list)').filter({ hasText: 'Test Cases' });
    await expect(cases).toHaveAttribute('href', '/test_cases');
  });

  await test.step('Проверка перехода по ссылке Test Cases и статус 200', async () => {
    const casesLink = page.locator('a:has(i.fa-list)').filter({ hasText: 'Test Cases' });
    const href = await casesLink.getAttribute('href');
    const casesResponse = await page.request.get(href as string);
    expect(casesResponse.ok()).toBeTruthy();
    expect(casesResponse.status()).toBe(200);
  });
});

test('Проверка API Testing в хэдере', async ({ page }) => {
  await test.step('Проверка иконки API Testing', async () => {
    await page.goto('/');
    const apiList = page.locator('a:has(i.fa-list)').filter({ hasText: ' API Testing' });
    await expect(apiList).toHaveCSS('font-size', '14px');
  });

  await test.step('Проверка наличия ссылки API Testing', async () => {
    await page.goto('/');
    const apiList = page.locator('a:has(i.fa-list)').filter({ hasText: ' API Testing' });
    await expect(apiList).toHaveAttribute('href', '/api_list');
  });

  await test.step('Проверка перехода по ссылке API Testing и статус 200', async () => {
    const apiListLink = page.locator('a:has(i.fa-list)').filter({ hasText: ' API Testing' });
    const href = await apiListLink.getAttribute('href');
    const apiListResponse = await page.request.get(href as string);
    expect(apiListResponse.ok()).toBeTruthy();
    expect(apiListResponse.status()).toBe(200);
  });
});

test('Проверка Video Tutorials в хэдере', async ({ page }) => {
  await test.step('Проверка иконки Video Tutorials', async () => {
    await page.goto('/');
    const videoTutors = page
      .locator('a:has(i.fa-youtube-play)')
      .filter({ hasText: ' Video Tutorials' });
    await expect(videoTutors).toHaveCSS('font-size', '14px');
  });

  await test.step('Проверка наличия ссылки Video Tutorials', async () => {
    await page.goto('/');
    const videoTutors = page
      .locator('a:has(i.fa-youtube-play)')
      .filter({ hasText: ' Video Tutorials' });
    await expect(videoTutors).toHaveAttribute(
      'href',
      'https://www.youtube.com/c/AutomationExercise',
    );
  });

  await test.step('Проверка перехода по ссылке Video Tutorials и статус 200', async () => {
    const videoTutorsLink = page
      .locator('a:has(i.fa-youtube-play)')
      .filter({ hasText: ' Video Tutorials' });
    const href = await videoTutorsLink.getAttribute('href');
    const videoTutorsResponse = await page.request.get(href as string);
    expect(videoTutorsResponse.ok()).toBeTruthy();
    expect(videoTutorsResponse.status()).toBe(200);
  });
});

test('Проверка Contact us в хэдере', async ({ page }) => {
  await test.step('Проверка иконки Contact us', async () => {
    await page.goto('/');
    const contact = page.locator('a:has(i.fa-envelope)').filter({ hasText: ' Contact us' });
    await expect(contact).toHaveCSS('font-size', '14px');
  });

  await test.step('Проверка наличия ссылки Contact us', async () => {
    await page.goto('/');
    const contact = page.locator('a:has(i.fa-envelope)').filter({ hasText: ' Contact us' });
    await expect(contact).toHaveAttribute('href', '/contact_us');
  });

  await test.step('Проверка перехода по ссылке Contact us и статус 200', async () => {
    const contactLink = page.locator('a:has(i.fa-envelope)').filter({ hasText: ' Contact us' });
    const href = await contactLink.getAttribute('href');
    const contactResponse = await page.request.get(href as string);
    expect(contactResponse.ok()).toBeTruthy();
    expect(contactResponse.status()).toBe(200);
  });
});
