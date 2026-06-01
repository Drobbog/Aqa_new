import type { Locator, Page } from "@playwright/test";

export class DialogOverlay {
  readonly page: Page;
  readonly dialogOverlay: Locator;
  readonly dialogOverlayButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialogOverlay = page.locator(".fc-dialog-overlay");
    this.dialogOverlayButton = page.getByRole("button", { name: "Consent" });
  }

  async dialogOverlayClose() {
    const isVisible = await this.dialogOverlay.isVisible({ timeout: 3000 });

    if (isVisible) {
      await this.dialogOverlayButton.click();
      console.log("Overlay banner zakrilsya=)");
    } else {
      console.log("Overlay banner google ne poyavilsya=)");
    }
  }
}
