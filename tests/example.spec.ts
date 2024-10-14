import { test, expect } from '@playwright/test';

test.use({ headless: false });

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // const getStartedLink = page.getByRole('link', { name: 'Get started' });
  // await getStartedLink.waitFor({ state: 'visible' });
  // console.log(await getStartedLink.isVisible()); // Log visibility status
  // await getStartedLink.click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
