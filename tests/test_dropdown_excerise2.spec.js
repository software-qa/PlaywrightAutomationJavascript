import {test,expect} from   '@playwright/test';
import * as allure from "allure-js-commons";

test('test case dropdown actions exercise' , async ({page}) => {

    await allure.description("The test checks if an active user with a valid password can sign in to the app.");
            await allure.epic("Signing in");
            await allure.feature("Sign in with a password");
            await allure.story("As an active user, I want to successfully sign in using a valid password");
            await allure.tags("signin", "ui", "positive");
            await allure.issue("https://github.com/allure-framework/allure-js/issues/331", "ISSUE-331");
            await allure.owner("eroshenkoam");
            await allure.parameter("browser", "chrome");
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');


    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByRole('button', {type:"submit"}).click()

    await page.locator('.oxd-main-menu-item--name').filter({hasText: 'Leave'}).click()

    //show leave with status dropdown
    await page.locator('input.oxd-input.oxd-input--active').nth(1).click()
    await page.waitForTimeout(3000)
    // select Today from the date picker
    await page.getByText('Today').click()

    

    //search for the employee name
    await page.getByPlaceholder('Type for hints...').fill('Ranga')
    
    await page.getByRole('option', {name :'Ranga  Akunuri'}).click();
    await page.waitForTimeout(3000)

    //select include past employees toggle 
    await page.locator('span.oxd-switch-input.oxd-switch-input--active.--label-right').click();
    

    await page.getByText(' Search ').click()
   
    await page.waitForTimeout(3000)
    } )