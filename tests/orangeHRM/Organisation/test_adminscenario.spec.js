import {test, expect} from '@playwright/test'



async function loginPage(page) {
    
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');


    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByRole('button', {type:"submit"}).click()
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')

    /*waitforloadstate with networkidl wait type is used , 
     netwrokidel means it will wait for all the elements or the entire page to load succsessfully
     */
    await page.waitForLoadState('networkidle');

}
    
async function gotoAdmin(page) {
    await page.getByRole('link', {name:'Admin'}).click()
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers')
    
}


test('TC01 verify search by user name', async({page}) => {
        await loginPage(page)
        await gotoAdmin(page)
        await page.locator('div[class="oxd-input-group oxd-input-field-bottom-space"] div input').first().fill('Admin')
        await page.getByRole('button', {name:'Search'}).click()
        await page.waitForLoadState('networkidle');
        await expect(page.locator('.oxd-table')).toBeVisible()

        const noofrecords = await page.locator('div[class="orangehrm-horizontal-padding orangehrm-vertical-padding"] span').textContent()
        console.log('Number of records displayed for searched user are : ', noofrecords)

    })


