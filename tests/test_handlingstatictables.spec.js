
import {test, expect} from "@playwright/test"
test.describe('Static Web Table Validation', ()=>{

    test.beforeEach(async({page})=>{

        const baseURL = "https://testautomationpractice.blogspot.com/";
        await page.goto(baseURL)
        
    })

    test('Validate the row and column for the web table - Count', async({page})=>{

        const rowCount = await page.locator('[name="BookTable"] tbody tr').count();

        const colCount = await page.locator('[name="BookTable"] tbody tr th').count();

        console.log('Row Count = ', rowCount)
        
        console.log('Column Count = ', colCount)

        expect(rowCount).toBeGreaterThan(1);

        expect(colCount).toBeGreaterThan(1);

    })

    test('Assert the value of BookName', async({page})=>{
    const bookName = "Learn JS";

    const rowCount = await page.locator('[name="BookTable"] tbody tr').count();
    
    const row = page.locator('[name="BookTable"] tbody tr');
    let authorName;
    let authorName2    
        //for(let i = 0; i< rowCount; i++)
        //{
           const actualBookName = await row.locator("td:nth-child(1)",{hasText:bookName}).textContent();
           //const actualBookIndex = row.locator("td:nth-child(1)",{hasText:bookName})
           // authorName2 = await row.locator("td:nth-child(2)").textContent();
           
           if(actualBookName === bookName)
           {
                authorName = await row.locator("td").nth(2).textContent();
                
           }

        //}
        console.log("Author Name is - ", authorName)
        // console.log("Author2:", authorName2)

    })



})
