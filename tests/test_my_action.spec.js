//Select Dropdown
//By label
//By Value
//By Index

//Base URL - https://www.dummyticket.com/dummy-ticket-for-visa-application/
import { test, expect } from '@playwright/test';

test('Select Dropdown - Custom Select2', async ({ page }) => {

    await page.goto('https://www.dummyticket.com/dummy-ticket-for-visa-application/');

    // Click on dropdown
    await page.click('#select2-billing_country-container');

    // Type country name
    await page.fill('.select2-search__field', 'Iceland');

    // Select from dropdown list
    await page.click('.select2-results__option >> text=Iceland');


    await page.waitForTimeout(10000);
    // <select>

    // </select>
    }
)
