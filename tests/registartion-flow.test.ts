import { test, expect } from '@playwright/test';
import { generateSignupData } from '../utils/data-generator';
import type { SignupData } from '../utils/data-generator';

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

  // const dialogOverlayButton = page.getByRole('button', { name: 'Consent' });
  // await expect(page.locator('.fc-dialog-overlay')).toBeVisible();
  // await expect(dialogOverlayButton).toBeVisible();
  // await dialogOverlayButton.click();

  try {
    const dialogOverlay = page.locator('.fc-dialog-overlay');
    const dialogOverlayButton = page.getByRole('button', { name: 'Consent' });
    await expect(dialogOverlay).toBeVisible();
    await dialogOverlayButton.click({ timeout: 3000 });
  } catch (error) {
    console.log('Overlay banner googla ne poyavilsya =)');
  }

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

  const name = generateSignupData().username;
  await nameForm.fill(name);
  const email = generateSignupData().email;
  await emailForm.fill(email);

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
  await expect(accountName).toHaveValue(name);
  await expect(accountEmail).toHaveValue(email);

  const password = generateSignupData().password;
  await accountPassword.fill(password);

  await accountDayOfBirth.selectOption(generateSignupData().day);
  await accountMonthOfBirth.selectOption(generateSignupData().month);
  await accountYearOfBirth.selectOption(generateSignupData().year);

  await checkboxNewsletters.check();
  await checkboxPartners.check();
  await expect(checkboxNewsletters).toBeChecked();
  await expect(checkboxPartners).toBeChecked();
  await checkboxPartners.uncheck();
  await expect(checkboxPartners).not.toBeChecked();

  await userFirstName.fill(generateSignupData().firstName);
  await userLastName.fill(generateSignupData().lastName);
  await userCompany.fill(generateSignupData().company);
  await userAdress.fill(generateSignupData().address1);
  await userAdress2.fill(generateSignupData().address2);
  await userCountry.selectOption(generateSignupData().country);
  await userState.fill(generateSignupData().state);
  await userCity.fill(generateSignupData().city);
  await userZipcode.fill(generateSignupData().zipcode);
  await userNumber.fill(generateSignupData().mobile);

  await createButton.click();

  await expect(
    page.getByText('Account Created! Congratulations! Your new account has been successfully'),
  ).toBeVisible();

  const continueButton = page.getByRole('link', { name: 'Continue' });
  await continueButton.click();

  await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();
});
