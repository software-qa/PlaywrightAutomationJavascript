import {test,expect} from   '@playwright/test';
import { parseEnv } from 'node:util';


async function gotoAdmin(page) {
    await page.getByRole('link', {name:'Admin'}).click()
    
    await expect(page).toHaveURL(/admin/)
    
}

async function navigatetoJobtitles(page) {
    await gotoAdmin(page)
    await page.getByText('Job ').click()
    await page.locator('ul[class="oxd-dropdown-menu"] li a').first().click()
    const jobtitletable_header =  page.locator('div[row-decorator="oxd-table-decorator-card"]')
    await expect(jobtitletable_header).toBeVisible()
    
}

test.describe('Job Title Module Validation', () =>{

    test.beforeEach('Launch the OrangeHRM and login with admin user' , async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.waitForLoadState('networkidle')
    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByRole('button', {name:"Login"}).click()
    //await page.waitForLoadState('networkidle')
    await page.waitForTimeout(10000)


})
// async function dashboardpage(pag) {
    
//     const dashboard =  page.getByRole('link', {name:'Dashboard'})
    
//     expect(dashboard).toBeVisible()
//     await expect(page).toHaveURL(/dashboard/)
// }




// test('TC1_Navigate to job titles page', async ({page})=>{
    




// })


test('TC1_Adding new job ttitle', async ({page})=>{

    //let jobtitle ='Software QA Engineer'
    await gotoAdmin(page)
    await navigatetoJobtitles(page)
    await page.getByRole('button', {name: 'Add'}).click()
    await expect(page).toHaveURL(/saveJobTitle/)
    const jobtitleinput = page.locator('input.oxd-input.oxd-input--active').last()

    await jobtitleinput.fill('Software test Engineer')
    const jobtitleadded = jobtitleinput.textContent()
    console.log(jobtitleadded)
    const jobdescription = page.getByPlaceholder('Type description here')
    await jobdescription.fill('Software test Engineer with Manual and Automation experience')
    await page.getByPlaceholder('Add note').fill('Minimum 5 yrs of experience required for this role')
    await page.getByRole('button',  {name: 'Save'}).click()
    await page.waitForTimeout(5000)
    const jobrecordslist = await page.locator('div.oxd-table-body div div div[role="cell"]:nth-child(2) div').allTextContents()
    console.log('List all the job titles from the table ', jobrecordslist)
    expect(jobrecordslist).toContain('Software QC Engineer')

})

test('TC2_Validate error message is displayed when adding the existing job ttitle', async ({page})=>{

    //let jobtitle ='Software QA Engineer'
    await gotoAdmin(page)
    await navigatetoJobtitles(page)
    await page.getByRole('button', {name: 'Add'}).click()
    await expect(page).toHaveURL(/saveJobTitle/)
    const jobtitleinput = page.locator('input.oxd-input.oxd-input--active').last()
    await jobtitleinput.fill('Software QC Engineer')
    await page.waitForTimeout(2000)
    await expect(page.getByText('Already exists')).toBeVisible()    


})

test('TC3_Delete the existing job title', async ({page}) =>{

    await gotoAdmin(page)
    await navigatetoJobtitles(page)
    await page.waitForTimeout(5000)
    const noofjobrecords =  page.locator('div.oxd-table-row--with-border')
    

    const jobrecordslist = await page.locator('div.oxd-table-body div div div[role="cell"]:nth-child(2) div').allTextContents()
    
    
    console.log(jobrecordslist)

    for (let i=0; i<jobrecordspresent.length;i++){

        if ((jobrecordslist[i]).includes('Software QC Engineer')){

            await jobrecordspresent.locator('div:nth-child(4) div button:nth-child(1) i').click()
         break;
            
        }

    }
   
        

        
            
        
  
    })
})


// Define a fixture that skips login
const testWithoutLogin = test.extend({
    page: async ({ page }, use) => {
        await use(page); // no login, just use the raw page
    }
});

