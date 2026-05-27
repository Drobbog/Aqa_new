import type { Page } from "@playwright/test";

export async function dialogOverlayClose(page: Page) {
  const dialogOverlay = page.locator(".fc-dialog-overlay");
  const dialogOverlayButton = page.getByRole("button", { name: "Consent" });
  const isVisible = await dialogOverlay
    .isVisible({ timeout: 3000 })
    .catch(() => false);

  if (isVisible) {
    await dialogOverlayButton.click();
    console.log("Overlay banner zakrilsya=)");
  } else {
    console.log("Overlay banner google ne poyavilsya=)");
  }
}
