import { type Locator, type Page } from "@playwright/test";
import { generateSignupData, type SignupData } from "../utils/data-generator";

export class LoginPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly signupForm: Locator;
  readonly loginForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupButton: Locator;
  readonly userData: SignupData;
  readonly loggedInAs: (username: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole("link", { name: " Signup / Login" });
    this.loginForm = page.locator(".login-form");
    this.signupForm = page.locator(".signup-form");
    this.nameInput = page.locator('[data-qa="signup-name"]');
    this.emailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.userData = generateSignupData();
    this.loggedInAs = (username: string) =>
      this.page.getByText(`Logged in as ${username}`);
  }

  async goToMainPage() {
    await this.page.goto("/");
  }

  async loginLinkVisible() {
    await this.loginLink.waitFor({ state: "visible" });
  }

  async loginLinkClick() {
    await this.loginLink.click();
  }

  async loginFormVisible() {
    await this.loginForm.waitFor({ state: "visible" });
  }
  async signupFormVisible() {
    await this.signupForm.waitFor({ state: "visible" });
  }

  async fillNameInput() {
    await this.nameInput.fill(this.userData.username);
  }

  async fillEmailInput() {
    await this.emailInput.fill(this.userData.email);
  }

  async signupButtonPress() {
    await this.signupButton.click();
  }

  // проверка в самом конце когда пользователь уже авторизован на сайте после регистрации
  async beLoggedInAs() {
    await this.loggedInAs(this.userData.username).waitFor({ state: "visible" });
  }
}
