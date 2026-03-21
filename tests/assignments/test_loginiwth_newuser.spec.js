
import { test, expect } from '@playwright/test';

test('test case to login with newly registered user', async ({ page }) => { 

    await page.goto('https://ecommerce-playground.lambdatest.io/');
    // Login    
    await page.locator('a[href="https://ecommerce-playground.lambdatest.io/index.php?route=account/account"]').nth(1).click();
    
    await page.getByLabel("E-Mail Address").fill("tora7@gmail.com");
    await page.getByLabel("Password").fill("Tora7@")
    await page.locator('input[value="Login"]').click()
    console.log("user has been logged in successfully")
    await page.waitForTimeout(20)
    
});