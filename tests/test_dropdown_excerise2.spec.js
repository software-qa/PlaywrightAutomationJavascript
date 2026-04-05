import {test,expect} from   '@playwright/test';

test('test case dropdown actions exercise' , async ({page}) => {
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