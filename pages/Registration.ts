import { type Locator, type Page, expect } from "@playwright/test";
import { generateSignupData, type SignupData } from "../utils/data-generator";

export class RegistrationPage {
  readonly page: Page;
  readonly maleRadio: Locator;
  readonly femaleRadio: Locator;
  readonly accountName: Locator;
  readonly accountEmail: Locator;
  readonly accountPassword: Locator;
  readonly accountDayOfBirth: Locator;
  readonly accountMonthOfBirth: Locator;
  readonly accountYearOfBirth: Locator;
  readonly checkboxNews: Locator;
  readonly checkboxPartners: Locator;
  readonly headingFirst: Locator;
  readonly headingSecond: Locator;
  readonly userFirstName: Locator;
  readonly userLastName: Locator;
  readonly userCompany: Locator;
  readonly userAdress1: Locator;
  readonly userAdress2: Locator;
  readonly userCountry: Locator;
  readonly userState: Locator;
  readonly userCity: Locator;
  readonly userZipcode: Locator;
  readonly userNumber: Locator;
  readonly createButton: Locator;
  readonly continueButton: Locator;
  readonly accountCreatedHeader: Locator;
  readonly userData: SignupData;
  readonly NewUserData: SignupData;

  constructor(page: Page, userData: SignupData) {
    this.page = page;
    this.userData = userData;
    this.NewUserData = generateSignupData();
    //
    this.headingFirst = page.getByRole("heading", {
      name: "Enter Account Information",
    });
    this.headingSecond = page.getByRole("heading", {
      name: "Address Information",
    });
    //
    this.maleRadio = page.getByRole("radio", { name: "Mr." });
    this.femaleRadio = page.getByRole("radio", { name: "Mrs." });
    this.accountName = page.getByRole("textbox", {
      name: "Name *",
      exact: true,
    });
    this.accountEmail = page.getByRole("textbox", { name: "Email *" });
    this.accountPassword = page.getByRole("textbox", { name: "Password *" });
    this.accountDayOfBirth = page.locator("#days");
    this.accountMonthOfBirth = page.locator("#months");
    this.accountYearOfBirth = page.locator("#years");
    this.checkboxNews = page.getByRole("checkbox", {
      name: "Sign up for our newsletter!",
    });
    this.checkboxPartners = page.getByRole("checkbox", {
      name: "Receive special offers from",
    });
    this.userFirstName = page.getByRole("textbox", { name: "First name *" });
    this.userLastName = page.getByRole("textbox", { name: "Last name *" });
    this.userCompany = page.getByRole("textbox", {
      name: "Company",
      exact: true,
    });
    this.userAdress1 = page.getByRole("textbox", {
      name: "Address * (Street address, P.",
    });
    this.userAdress2 = page.getByRole("textbox", { name: "Address 2" });
    this.userCountry = page.getByLabel("Country *");
    this.userState = page.getByRole("textbox", { name: "State *" });
    this.userCity = page.getByRole("textbox", { name: "City * Zipcode *" });
    this.userZipcode = page.locator("#zipcode");
    this.userNumber = page.getByRole("textbox", { name: "Mobile Number *" });
    //
    this.createButton = page.locator('[data-qa="create-account"]');
    //
    this.accountCreatedHeader = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
    //
  }

  // проверки радио-кнопок
  async checkRadioButtons() {
    await this.checkboxNews.check();
    await this.checkboxPartners.check();
    await expect(this.checkboxNews).toBeChecked();
    await expect(this.checkboxPartners).toBeChecked();
    await this.checkboxNews.uncheck();
    await this.checkboxPartners.uncheck();
    await expect(this.checkboxNews).not.toBeChecked();
    await expect(this.checkboxPartners).not.toBeChecked();
    await this.femaleRadio.check();
    await expect(this.maleRadio).not.toBeChecked();
    await this.maleRadio.check();
    await expect(this.femaleRadio).not.toBeChecked();
  }
  // основная инфа юзера
  async fillAccountData() {
    await this.accountPassword.fill(this.NewUserData.password);
    await this.accountDayOfBirth.selectOption(this.NewUserData.day);
    await this.accountMonthOfBirth.selectOption(this.NewUserData.month);
    await this.accountYearOfBirth.selectOption(this.NewUserData.year);
    await this.userFirstName.fill(this.NewUserData.firstName);
    await this.userLastName.fill(this.NewUserData.lastName);
    await this.userCompany.fill(this.NewUserData.company);
    await this.userAdress1.fill(this.NewUserData.address1);
    await this.userAdress2.fill(this.NewUserData.address2);
    await this.userCountry.selectOption(this.NewUserData.country);
    await this.userState.fill(this.NewUserData.state);
    await this.userCity.fill(this.NewUserData.city);
    await this.userZipcode.fill(this.NewUserData.zipcode);
    await this.userNumber.fill(this.NewUserData.username);
  }
  // проверка важных блоков формы
  async checkNecessaryBlocks() {
    await this.createButton.waitFor({ state: "visible" });
    await this.headingFirst.waitFor({ state: "visible" });
    await this.headingSecond.waitFor({ state: "visible" });
    await expect(this.accountName).toHaveValue(this.userData.username);
    await expect(this.accountEmail).toHaveValue(this.userData.email);
  }
}
