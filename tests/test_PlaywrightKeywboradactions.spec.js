import {test, expect} from '@playwright/test'

test.describe('Playwright Keyboard function', () =>{

    test.beforeEach('Launch the application', async ({page}) =>{

        await page.goto('https://tutorialsninja.com/demo/')
        //wait for all the elements to load 
        await page.waitForLoadState('networkidle')
    })

    test('TC_01 Navigate to User registration page', async ({page}) =>{
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