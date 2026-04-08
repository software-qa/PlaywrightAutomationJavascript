import {test, expect} from '@playwright/test'       
import { description, epic, feature, story, tag, issue, owner, parameter } from 'allure-js-commons'

test.describe('Playwright Keyboard function', () =>{

    test.beforeEach('Launch the application', async ({page}) =>{
        await page.goto('https://tutorialsninja.com/demo/')
        await page.waitForLoadState('networkidle')
    })

    test('TC_01 Navigate to User registration page', async ({page}) =>{
        await description("The test checks if an active user with a valid password can sign in to the app.");
        await epic("Signing in");
        await feature("Sign in with a password");
        await story("As an active user, I want to successfully sign in using a valid password");
        await tag("signin");
        await tag("ui");
        await tag("positive");
        await issue("ISSUE-331", "https://github.com/allure-framework/allure-js/issues/331");
        await owner("eroshenkoam");
        await parameter("browser", "chrome");

        await page.getByText('My Account').first().click()
        await page.getByRole('link',{name: 'Register'}).click()
        const firstname = page.getByPlaceholder('First Name')
        await firstname.focus()
        await page.keyboard.type('Demo')
        await page.keyboard.press('Tab')
        await page.keyboard.type('Demo1')
        await page.keyboard.press('Tab')
        await page.keyboard.type('demo@gmail.com')
        await page.keyboard.press('Tab')
        await page.keyboard.type('09876543213')
        await page.keyboard.press('Tab')
        await page.keyboard.type('Demo@123', {delay: 1000})
        await page.keyboard.press('Tab')
        await page.keyboard.type('Demo@123', {delay: 1000})
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight', {delay: 100})
    })

})