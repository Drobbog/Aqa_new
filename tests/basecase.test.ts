import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   await page.addLocatorHandler(
//     page.locator('iframe[name^="aswift_"]').first(),
//     async () => {
//       await page.locator('iframe[name^="aswift_"]').evaluateAll((elements) => {
//         elements.forEach((el) => el.remove());
//       });
//     },
//     { noWaitAfter: true },
//   );
// });

test('Флоу регистрации', async ({ page }) => {
  await page.goto('/');

  const dialogOverlayButton = page.getByRole('button', { name: 'Consent' });
  await expect(page.locator('.fc-dialog-overlay')).toBeVisible();
  await expect(dialogOverlayButton).toBeVisible();
  await dialogOverlayButton.click();

  const login = page.getByRole('link', { name: ' Signup / Login' });
  await expect(login).toBeVisible();
  await login.click();

  await expect(page.getByText('Login to your account Login')).toBeVisible();
  await expect(page.getByText('New User Signup! Signup')).toBeVisible();

  const nameForm = page.getByRole('textbox', { name: 'Name' });
  const emailForm = page
    .locator('form')
    .filter({ hasText: 'Signup' })
    .getByPlaceholder('Email Address');
  await nameForm.fill('Test1337test778');
  await emailForm.fill('test1@testo1337778.com');

  const signupButton = page.getByRole('button', { name: 'Signup' });
  await signupButton.click();

  await expect(page.getByText('Enter Account Information')).toBeVisible();
  const accountMaleTitle = page.getByRole('radio', { name: 'Mr.' });
  const accountFemaleTitle = page.getByRole('radio', { name: 'Mrs.' });
  const accountName = page.getByRole('textbox', { name: 'Name *', exact: true });
  const accountEmail = page.getByRole('textbox', { name: 'Email *' });
  const accountPassword = page.getByRole('textbox', { name: 'Password *' });
  const accountDayOfBirth = page.locator('#days');
  const accountMonthOfBirth = page.locator('#months');
  const accountYearOfBirth = page.locator('#years');
  const checkboxNewsletters = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
  const checkboxPartners = page.getByRole('checkbox', { name: 'Receive special offers from' });

  await expect(page.getByRole('heading', { name: 'Address Information' })).toBeVisible();
  const userFirstName = page.getByRole('textbox', { name: 'First name *' });
  const userLastName = page.getByRole('textbox', { name: 'Last name *' });
  const userCompany = page.getByRole('textbox', { name: 'Company', exact: true });
  const userAdress = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
  const userAdress2 = page.getByRole('textbox', { name: 'Address 2' });
  const userCountry = page.getByLabel('Country *');
  const userState = page.getByRole('textbox', { name: 'State *' });
  const userCity = page.getByRole('textbox', { name: 'City * Zipcode *' });
  const userZipcode = page.locator('#zipcode');
  const userNumber = page.getByRole('textbox', { name: 'Mobile Number *' });

  const createButton = page.getByRole('button', { name: 'Create Account' });
  await expect(createButton).toBeVisible();

  // await expect(page.locator('.grippy-host')).toBeVisible();
  // await page.locator('.grippy-host').click();

  await accountMaleTitle.check();
  await expect(accountName).toHaveValue('Test1337test778');
  await expect(accountEmail).toHaveValue('test1@testo1337778.com');
  await accountPassword.fill('Q1w2e3r4t5y6');

  await accountDayOfBirth.selectOption('1');
  await accountMonthOfBirth.selectOption('2');
  await accountYearOfBirth.selectOption('2000');

  await checkboxNewsletters.check();
  await checkboxPartners.check();
  await expect(checkboxNewsletters).toBeChecked();
  await expect(checkboxPartners).toBeChecked();

  await userFirstName.fill('Sam');
  await userLastName.fill('Samogon');
  await userCompany.fill('Rome777');
  await userAdress.fill('Dom 333');
  await userAdress2.fill('Example');
  await userCountry.selectOption('Israel');
  await userState.fill('Pumpum');
  await userCity.fill('Rome');
  await userZipcode.fill('1234567');
  await userNumber.fill('88005553535');

  await createButton.click();

  await expect(
    page.getByText('Account Created! Congratulations! Your new account has been successfully'),
  ).toBeVisible();

  const continueButton = page.getByRole('link', { name: 'Continue' });
  await continueButton.click();

  await expect(page.getByText('Logged in as Test1337test778')).toBeVisible();
});
