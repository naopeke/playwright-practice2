//https://learn.microsoft.com/en-us/training/modules/build-with-playwright/8-exercise-manually-create-test-specification

import { test, expect } from '@playwright/test';

test.use({ headless: false })

test.beforeEach(async ({ page})=>{
  await page.goto('');
})

test.describe('New Todo', ()=>{

  test('active and completed filters', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?')
    await todoInput.click();
    await todoInput.fill('water the plants');
    await todoInput.press('Enter');
    await todoInput.fill('feed the dog');
    await todoInput.press('Enter');
    await page.locator('li').filter({ hasText: 'water the plants' }).getByLabel('Toggle Todo').check();
    await page.getByRole('link', { name: 'Active' }).click();
    await expect (page.getByTestId('todo-title')).toHaveText('feed the dog');
    await page.getByTestId('todo-title').click();
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect (page.getByTestId('todo-title')).toHaveText('water the plants');
  });
  
  test('text field is cleared when item is added', async ({ page }) =>{
    const todoInput = page.getByPlaceholder('What needs to be done?')
    await todoInput.fill('water the plants');
    await todoInput.press('Enter');
    expect (todoInput).toBeEmpty();
  })
})