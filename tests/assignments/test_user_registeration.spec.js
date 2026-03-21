
import { test, expect } from '@playwright/test';

test('test case for user registration', async ({ page }) => { 

    await page.goto('https://ecommerce-playground.lambdatest.io/');
    // Login    
    await page.locator('a[href="https://ecommerce-playground.lambdatest.io/index.php?route=account/account"]').nth(1).click();
    await page.locator('a[href="https://ecommerce-playground.lambdatest.io/index.php?route=account/register"]').nth(2).click();
    await page.getByPlaceholder("First Name").fill("tora7");
    await page.getByPlaceholder("Last Name").fill("tora7");
    await page.getByPlaceholder("E-Mail").fill("tora7@gmail.com")
    await page.getByPlaceholder("Telephone").fill("09876543212")
    await page.locator('#input-password').fill("Tora7@")
    await page.getByPlaceholder("Password Confirm").fill("Tora7@") 
    await page.locator('.custom-control-label').nth(2).click()
    
    await page.locator('input[value="Continue"]').click()
    var user_registration_message = await page.locator('h1.page-title').textContent()

    await expect(page.locator('h1.page-title')).toBeVisible()
    console.log(user_registration_message)
    await page.getByText('Continue').click()
    await page.locator('.fa-sign-out-alt').click()
    console.log("User is successfully logged in upon registration")
    await page.waitForTimeout(20)
    
});