import { test, expect } from '@playwright/test';

async function loginAndNavigateToJobTitles(page) {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByText('Job').click();
  await page.getByRole('menuitem', { name: 'Job Titles' }).click();
}

test('Add Job Title', async ({ page }) => {
  await loginAndNavigateToJobTitles(page);
  await page.getByRole('button', { name: ' Add' }).click();
  await page.getByRole('textbox').nth(1).fill('QA Engineer stage 2');
  await page.getByRole('textbox', { name: 'Type description here' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
});

test('Edit Job Title', async ({ page }) => {
  await loginAndNavigateToJobTitles(page);
  await page.locator('div:nth-child(20) > .oxd-table-row > div:nth-child(4) > .oxd-table-cell-actions > button:nth-child(2)').click();
  await page.getByRole('textbox').nth(1).fill('QA Engineer stage 22');
  await page.getByRole('textbox', { name: 'Type description here' }).fill('add the new job title');
  await page.getByRole('button', { name: 'Save' }).click();
});

test('Delete Job Title', async ({ page }) => {
  await loginAndNavigateToJobTitles(page);
  await page.getByRole('button').nth(4).click();
  await page.getByRole('button', { name: ' Yes, Delete' }).click();
});

test('Delete Selected Job Title', async ({ page }) => {
  await loginAndNavigateToJobTitles(page);
  await page.getByRole('row', { name: ' Automaton Tester  ' }).locator('label').click();
  await page.getByRole('button', { name: ' Delete Selected' }).click();
  await page.getByRole('button', { name: ' Yes, Delete' }).click();
});
