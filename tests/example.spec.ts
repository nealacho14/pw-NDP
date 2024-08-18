import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('test MercadoLibre', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.locator("//input[@id='cb1-edit']").fill("Iphone XV")
  await page.keyboard.press('Enter')
  await expect(page.locator("//h2[contains(text(),'Apple iPhone 15 Pro Max (256 GB) - Titanio Azul')]")).toBeVisible()
  const titles = await page.locator("//*[@id='root-app']/div/div[3]/section/ol/li").allInnerTexts()
  for(let title of titles) {
    console.log('Title is ', title)
  }
  await page.pause()
});
