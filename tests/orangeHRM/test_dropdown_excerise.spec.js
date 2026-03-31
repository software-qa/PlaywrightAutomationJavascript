import {test,expect} from   '@playwright/test';


test('test case dropdown actions' , async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const countrydropdown = page.locator('#country')

        //validate the dropdown is enabled 
    await expect(countrydropdown).toBeEnabled()

    //validate whether drodpwn is visible
    await expect(countrydropdown).toBeVisible()


    //select by label or name, nothing but name visible on the dropdown options
    await countrydropdown.selectOption({label :'United Kingdom'});
    //assert the value selected in the dropdown by passing the value attribute in the html for the particular country
    await expect(countrydropdown).toHaveValue('uk')


    //select by value , designed by developer like for India, value= is IN etc.
    await countrydropdown.selectOption({value: 'usa'});
    await expect(countrydropdown).toHaveValue('usa')

    // select multiple values from the dropdown
    await countrydropdown.selectOption( ['Iceland', 'Germany', 'Cuba'])




    //select by index 
    await countrydropdown.selectOption({index:3})
    //inputValue method, is used retrieve the value selected from the dropdown list and can be stored in a variable
    const selectedValue =  await countrydropdown.inputValue()  
    console.log(selectedValue+ ' is the value selected in the country dropdown')
    expect(selectedValue).not.toBe('')

    //get attribute value from the html for the country selected
    const countryattribue = await page.locator('#country option:text("Japan")').getAttribute('value')
    console.log(expect(countryattribue).toBe('japan'))


    //to retrive a text  from the webpage
    const selectedText = await countrydropdown.locator('option:checked').textContent()
    console.log("Selected Text:", selectedText)

    //count number of countries in the dropdown list
    const options =  countrydropdown.locator('option')
    const noofcountries = await options.count()
    console.log('Total number of options in the dropdown list is: ' + noofcountries)

    //retrieve all the countries name from the country dropdown
    
    const allcountryname = await options.allTextContents()
    
    console.log(allcountryname)

    //correct validation , checking whether india is present in the countries list
    expect.soft(allcountryname).toContain('India')
    

    //iterate through the array of countries and select only India from the array list
    for (let i = 0; i<noofcountries; i++){
        const countryname = await options.nth(i).textContent()
        if (countryname==="India")
        {
            await countrydropdown.selectOption({index: i})

            break   
        }
    }
}

    )