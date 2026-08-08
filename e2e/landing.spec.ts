import { expect, test } from "@playwright/test";

test("ships prerendered SEO content and healthy assets", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("GitView — 3-way merge for VS Code");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "See Git clearly",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://gitview.dev/",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://gitview.dev/og.png",
  );

  const primaryDownload = page.getByRole("link", { name: /Download VSIX/ }).first();
  await expect(primaryDownload).toHaveAttribute(
    "href",
    "https://github.com/outof0/gitview/releases/download/v0.1.0/gitview-0.1.0.vsix",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("opacity", "1");

  const brokenImages = await page.locator("img").evaluateAll((elements) =>
    (elements as HTMLImageElement[])
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.getAttribute("src")),
  );
  expect(brokenImages).toEqual([]);

  const missingAnchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links
      .map((link) => link.getAttribute("href"))
      .filter((href): href is string => Boolean(href && href.length > 1))
      .filter((href) => !document.querySelector(href)),
  );
  expect(missingAnchors).toEqual([]);

  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(horizontalOverflow).toBe(false);
  expect(pageErrors).toEqual([]);
});

test("interactive controls are keyboard accessible", async ({ page }) => {
  await page.goto("/");

  const faqButton = page.getByRole("button", {
    name: "How do I install GitView before the Marketplace listing is live?",
  });
  await expect(faqButton).toHaveAttribute("aria-expanded", "false");
  await faqButton.click();
  await expect(faqButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#faq-panel-0")).toHaveAttribute("aria-hidden", "false");

  const conflictTab = page.getByRole("tab", { name: "conflict" });
  await conflictTab.click();
  await conflictTab.press("ArrowRight");
  await expect(page.locator("#hero-demo-tab-magic")).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("mobile menu opens and closes with Escape", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "mobile project only");
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("core marketing content remains in the initial HTML", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "See Git clearly",
    );
    await expect(page.getByRole("link", { name: /Download VSIX/ }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "You asked. We shipped answers." })).toBeVisible();
  });
});
