//https://learn.microsoft.com/en-us/training/modules/build-with-playwright/8-exercise-manually-create-test-specification

import { test, expect } from '@playwright/test';

test.use({ headless: false })

test.beforeEach(async ({ page})=>{
  await page.goto('https://demo.playwright.dev/todomvc/#/');
})

test.describe('New Todo', ()=>{

  test('test', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('water the plants');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByPlaceholder('What needs to be done?').fill('feed the dog');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.locator('li').filter({ hasText: 'water the plants' }).getByLabel('Toggle Todo').check();
    await page.getByRole('link', { name: 'Active' }).click();
    await expect (page.getByTestId('todo-title')).toHaveText('feed the dog');
    await page.getByTestId('todo-title').click();
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect (page.getByTestId('todo-title')).toHaveText('water the plants');
  });
  
  test('text field is cleared when item is added', async ({ page }) =>{
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      await page.locator('.new-todo').fill('water the plants');
      await page.locator('.new-todo').press('Enter');
      expect (page.locator('.new-todo')).toBeEmpty();
  })
})