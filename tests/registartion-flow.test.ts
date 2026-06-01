import { test } from "@playwright/test";
import { DialogOverlay } from "../utils/dialog-overlay";
import { LoginPage } from "../pages/Login";
import { RegistrationPage } from "../pages/Registration";

test("Флоу регистрации", async ({ page }) => {
  const lp = new LoginPage(page);
  const rp = new RegistrationPage(page, lp.userData);
  const doc = new DialogOverlay(page);
  await lp.goToMainPage();
  await doc.dialogOverlayClose();

  await test.step("Кликаем на линк регистрации/авторизации проверяем переход к формам", async () => {
    await lp.loginLink.click();
    await lp.loginFormsVisible();
  });
  await test.step("Заполняем поля, жмем кнопку зарегистрироваться и проверяем переход", async () => {
    await lp.fillUserCreds(lp.userData.username, lp.userData.email);
    await lp.signupButton.click();
    await rp.checkNecessaryBlocks();
  });
  await test.step("Заполняем данные для регистрации и проверяем все радио-кнопки", async () => {
    await rp.fillAccountData();
    await rp.checkRadioButtons();
  });

  await test.step("Создаем пользователя и проверяем экран об успешной регистрации", async () => {
    await rp.createButton.click();
    await rp.accountCreatedHeader.waitFor({ state: "visible" });
    await rp.continueButton.click();
    await lp.beLoggedInAs();
  });
});
