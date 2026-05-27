import { test } from "@playwright/test";
import { dialogOverlayClose } from "../utils/dialog-overlay";
import { LoginPage } from "../pages/Login";
import { RegistrationPage } from "../pages/Registration";

test("Флоу регистрации", async ({ page }) => {
  const lp = new LoginPage(page);
  const rp = new RegistrationPage(page, lp.userData);
  await lp.goToMainPage();
  await dialogOverlayClose(page);

  await test.step("Проверяем наличие и кликаем на линк регистрации/авторизации", async () => {
    await lp.loginLinkVisible();
    await lp.loginLinkClick();
  });
  await test.step("Проверяем наличие форм регистрации/авторизации", async () => {
    await lp.loginFormVisible();
    await lp.signupFormVisible();
  });
  await test.step("Заполняем поля и жмем кнопку зарегистрироваться", async () => {
    await lp.fillNameInput();
    await lp.fillEmailInput();
    await lp.signupButtonPress();
  });
  await test.step("Проверяем отображение важных блоков подробной формы", async () => {
    await rp.headingFirstVisible();
    await rp.headingSecondVisible();
    await rp.createAccountButtonVisible();
  });
  await test.step("Проверка переноса логина и почты на страницу регистрации", async () => {
    await rp.filledAccountNameValue();
    await rp.filledAccountEmailValue();
  });
  await test.step("Проверка работы радио-кнопок выбора пола", async () => {
    await rp.checkedFemaleRadio();
    await rp.checkedMaleRadio();
    await rp.checkFemaleRadio();
    await rp.checkedMaleRadio();
    await rp.checkMaleRadio();
    await rp.checkedFemaleRadio();
  });
  await test.step("Проверка работы радио-кнопок новостей и партнерки", async () => {
    await rp.checkedNews();
    await rp.checkedPartners();
    await rp.checkNews();
    await rp.checkedPartners();
    await rp.checkPartners();
    await rp.uncheckNews();
    await rp.checkedNews();
  });

  await test.step("Заполняем данные для регистрации", async () => {
    await rp.fillAccountPassword();
    await rp.fillDayOfBirth();
    await rp.fillMonthOfBirth();
    await rp.fillYearOfBirth();
    await rp.fillUserFirstName();
    await rp.fillUserLastName();
    await rp.fillUserCompany();
    await rp.fillUserAdress1();
    await rp.fillUserAdress2();
    await rp.fillUserCountry();
    await rp.fillUserState();
    await rp.fillUserCity();
    await rp.fillUserZipcode();
    await rp.fillUserNumber();
  });

  await test.step("Создаем пользователя и проверяем экран об успешной регистрации", async () => {
    await rp.createAccountButtonPress();
    await rp.successCreatedAccount();
    await rp.pressContinue();
    await lp.beLoggedInAs();
  });
});
