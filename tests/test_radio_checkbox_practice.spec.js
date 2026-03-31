import {test,expect} from "@playwright/test"

test('practice on radio button and checkbox action', async  ({page}) =>{

await page.goto("https://testautomationpractice.blogspot.com/")

//select radio option for gender
await page.check('#male')
//assert whether Male is checked
await expect(page.locator('#male')).toBeChecked()

//search for Days list 

const listofvalues =  page.locator('.form-check-input')
console.log(listofvalues.getAttribute("type"))

// for (let list in listofvalues){
//     if(type ==)
//  }


})