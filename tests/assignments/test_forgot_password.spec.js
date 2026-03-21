
import { test, expect } from '@playwright/test';

test('test case for forgot password scenario', async ({ page }) => { 

    await page.goto('https://ecommerce-playground.lambdatest.io/');
    // Login    
    await page.locator('a[href="https://ecommerce-playground.lambdatest.io/index.php?route=account/account"]').nth(1).click();
    await page.locator('.fa-key').click()
    await page.getByPlaceholder("E-Mail Address").fill("tora4@gmail.com");
    await page.getByText('Continue').click()
    //var expected_forgot_password_message = " An email with a confirmation link has been sent your email address."
    await expect(page.getByText(' An email with a confirmation link has been sent your email address.')).toBeVisible()
    
    
});