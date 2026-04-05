
import { test, expect } from '@playwright/test';

test.describe('Mouse Events Test Suite - TutorialsNinja', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://tutorialsninja.com/demo/');
    await page.waitForLoadState('networkidle')
  });

  // ✅ 1. Single Click
  test('Mouse Click - Navigate to Mac', async ({ page }) => {
    await page.getByRole('link', {name: 'Desktops'}).hover()
    const macLink = page.getByRole('link', { name: 'Mac (1)' });

    await macLink.click();
    await expect(page).toHaveURL(/route=product\/category/);
  });

  // ✅ 2. Double Click
  test('Mouse Double Click on iMac', async ({ page }) => {
    await page.getByRole('link', {name: 'Desktops'}).hover()
    await page.getByRole('link', { name: 'Mac (1)' }).click();

    const imac = page.getByRole('link', { name: 'iMac' }).first();
    await imac.dblclick();

    await expect(imac).toBeVisible();
  });

  // ✅ 3. Right Click (Context Click)
  test('Mouse Right Click on iMac', async ({ page }) => {
    await page.getByRole('link', {name: 'Desktops'}).hover()
    await page.getByRole('link', { name: 'Mac (1)' }).click();

    const imac = page.getByRole('link', { name: 'iMac' }).first();

    await imac.click({ button: 'right' });

    await expect(imac).toBeVisible();
  });

  // ✅ 4. Hover Action
  test('Mouse Hover on Desktop Menu', async ({ page }) => {
    const desktopMenu = page.locator('#menu').getByRole('link', { name: 'Desktops', exact: true });

    await desktopMenu.hover();

    const macOption = page.getByRole('link', { name: 'Mac (1)' });
    await expect(macOption).toBeVisible();
  });

  // ✅ 5. Mouse Move
  test('Mouse Move Event', async ({ page }) => {
    await page.mouse.move(100, 200);
    await page.mouse.move(300, 400);

    expect(true).toBeTruthy();
  });

  // ✅ 6. Mouse Click using Coordinates
  test('Mouse Click at Specific Coordinates', async ({ page }) => {
    await page.mouse.click(250, 350);

    expect(true).toBeTruthy();
  });

  // ✅ 7. Drag and Drop
  test('Mouse Drag and Drop', async ({ page }) => {
    await page.getByRole('link', { name: 'Mac (1)' }).click();

    const source = page.getByRole('link', { name: 'iMac' }).first();
    const target = page.getByRole('link', { name: 'iMac' }).nth(1);

    await source.dragTo(target);

    await expect(source).toBeVisible();
  });

  // ✅ 8. Multiple Clicks
  test('Mouse Multiple Clicks on iMac', async ({ page }) => {
    await page.getByRole('link', {name: 'Desktops'}).hover()
    await page.getByRole('link', { name: 'Mac (1)' }).click();

    const imac = page.getByRole('link', { name: 'iMac' }).first();

    await imac.click();
    await imac.click();
    await imac.click();

    await expect(imac).toBeVisible();
  });

  // ✅ 9. Double Click on Text (Heading)
  test('Mouse Double Click on Related Products', async ({ page }) => {
    await page.getByRole('link', {name: 'Desktops'}).hover()
    await page.getByRole('link', { name: 'Mac (1)' }).click();

    const imac = page.getByRole('link', { name: 'iMac' }).first();
    await imac.dblclick();
    
    const related = page.getByRole('link', { name: 'Apple Cinema 30"' }).first();

    await related.dblclick();

    await expect(related).toBeVisible();
  });

  // ✅ 10. Click Search Button
  test('Mouse Click on Search Button', async ({ page }) => {
    const searchBtn = page.locator('#search').getByRole('button');

    await searchBtn.click();

    await expect(searchBtn).toBeVisible();
  });

});
