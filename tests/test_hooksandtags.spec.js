import {test, expect} from '@playwright/test'



//beforeEach , before, beforeall, after, afterEach, afterAll
test.beforeEach('run before for all test cases', async ({page}) =>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');


    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByRole('button', {type:"submit"}).click()

    /*waitforloadstate with networkidl wait type is used , 
     netwrokidel means it will wait for all the elements or the entire page to load succsessfully
     */
    await page.waitForLoadState('networkidle');
} )

test('Validate Admin tab in the left menu @smoke ', async ({page}) => {

    await expect(page.locator('ul[class="oxd-main-menu"] a[href="/web/index.php/admin/viewAdminModule"]')).toBeVisible()

    
})

//we can tag the test cases as smoke or regression in the test case title as @smoke @regression

//add a entry in package.json file under script  section with the command to run test cases are marked as tag

test('Validate PIM tab in the left menu @regression @smoke ', async ({page}) => {

    await expect(page.locator('ul[class="oxd-main-menu"] a[href="/web/index.php/pim/viewPimModule"]')).toBeVisible()

    
})

test.afterEach('Close the browser window' , async ({page})=>{

    await page.close()
})