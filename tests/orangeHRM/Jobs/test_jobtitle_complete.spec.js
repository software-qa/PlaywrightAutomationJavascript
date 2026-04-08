import { test, expect } from '@playwright/test';

const BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php';
const LOGIN_URL = `${BASE_URL}/auth/login`;
const JOB_TITLES_URL = `${BASE_URL}/admin/viewJobTitleList`;
const SAVE_JOB_TITLE_URL = `${BASE_URL}/admin/saveJobTitle`;

const CREDENTIALS = { username: 'Admin', password: 'admin123' };
const TEST_JOB_TITLE = `Test Engineer ${Date.now()}`;
const DUPLICATE_JOB_TITLE = 'Software Engineer'; // assumed to exist in demo data

// ─── Helpers ────────────────────────────────────────────────────────────────

async function login(page) {
    await page.goto(LOGIN_URL);
    await page.getByPlaceholder('Username').fill(CREDENTIALS.username);
    await page.getByPlaceholder('Password').fill(CREDENTIALS.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL(`${BASE_URL}/dashboard/index`);
}

async function navigateToJobTitles(page) {
    await page.goto(JOB_TITLES_URL);
    await page.waitForLoadState('networkidle');
}

async function addJobTitle(page, title, description = '', note = '') {
    await page.getByRole('button', { name: 'Add' }).click();
    await page.waitForURL(`${SAVE_JOB_TITLE_URL}`);
    await page.locator('input.oxd-input').nth(1).fill(title);
    if (description) await page.getByPlaceholder('Type description here').fill(description);
    if (note) await page.getByPlaceholder('Add note').fill(note);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForURL(JOB_TITLES_URL);
    await page.waitForLoadState('networkidle');
}

async function getJobTitlesList(page) {
    return page.locator('div.oxd-table-body div[role="row"] div[role="cell"]:nth-child(2) div').allTextContents();
    
}
//force serial execution for tests that share app state
test.describe.configure({ mode: 'serial' });

// ─── Tests ───────────────────────────────────────────────────────────────────

test.describe('OrangeHRM - Job Title List Module', () => {

    test.beforeEach(async ({ page }) => {
        //if (skipBeforeEach) return;
        await login(page);
        await navigateToJobTitles(page);
    });

    // ── Page Load & UI Validation ──────────────────────────────────────────

    test('TC01 - Job Titles page loads successfully', async ({ page }) => {
        await expect(page).toHaveURL(JOB_TITLES_URL);
        await expect(page.getByRole('heading', { name: 'Job Titles' })).toBeVisible();
    });

    test('TC02 - Page title is correct', async ({ page }) => {
        await expect(page).toHaveTitle(/OrangeHRM/);
    });

    test('TC03 - Add button is visible and enabled', async ({ page }) => {
        const addBtn = page.getByRole('button', { name: 'Add' });
        await expect(addBtn).toBeVisible();
        await expect(addBtn).toBeEnabled();
    });

    //failed at first run, Modified by Rekha
    test('TC04 - Delete Selected button is visible', async ({ page }) => {
        await page.locator('i.oxd-icon.bi-check.oxd-checkbox-input-icon').nth(1).check()
        await expect(page.getByRole('button', { name: 'Delete Selected' })).toBeVisible();
    });

    test('TC05 - Job titles table is displayed with records', async ({ page }) => {
        const rows = page.locator('div.oxd-table-body div[role="row"]');
        await expect(rows.first()).toBeVisible();
        expect(await rows.count()).toBeGreaterThan(0);
    });

    test('TC06 - Table has correct column headers: Job Title, Job Description, Actions', async ({ page }) => {
        const headers = page.locator('div.oxd-table-header div[role="columnheader"]');
        const headerTexts = await headers.allTextContents();
        expect(headerTexts.join(' ')).toContain('Job Title');
        expect(headerTexts.join(' ')).toContain('Job Description');
        expect(headerTexts.join(' ')).toContain('Actions');
    });

    test('TC07 - Each row has Edit and Delete action buttons', async ({ page }) => {
        const firstRowActions = page.locator('div.oxd-table-body div[role="row"]').first()
            .locator('div[role="cell"]:last-child button');
        await expect(firstRowActions.nth(0)).toBeVisible(); // Delete
        await expect(firstRowActions.nth(1)).toBeVisible(); // Edit
    });

    test('TC08 - Each row has a checkbox for selection', async ({ page }) => {
        const firstCheckbox = page.locator('div.oxd-table-body div[role="row"]').first().locator('input[type="checkbox"]');
        await expect(firstCheckbox).toBeVisible();
    });

    test('TC09 - Records count label is displayed', async ({ page }) => {
        await expect(page.locator('span.oxd-text--span').filter({ hasText: /Record/ })).toBeVisible();
    });

    // ── Add Job Title - Positive ───────────────────────────────────────────

    test('TC10 - Add button navigates to Save Job Title page', async ({ page }) => {
        await page.getByRole('button', { name: 'Add' }).click();
        await expect(page).toHaveURL(SAVE_JOB_TITLE_URL);
        await expect(page.getByRole('heading', { name: 'Add Job Title' })).toBeVisible();
    });

    test('TC11 - Add Job Title form has all required fields', async ({ page }) => {
        await page.getByRole('button', { name: 'Add' }).click();
        await expect(page.locator('input.oxd-input').nth(1)).toBeVisible();
        await expect(page.getByPlaceholder('Type description here')).toBeVisible();
        await expect(page.getByPlaceholder('Add note')).toBeVisible();
    });

    test('TC12 - Add a new job title with only title (mandatory field)', async ({ page }) => {
        await addJobTitle(page, TEST_JOB_TITLE);
        const list = await getJobTitlesList(page);
        expect(list).toContain(TEST_JOB_TITLE);
    });

    test('TC13 - Add a new job title with title, description and note', async ({ page }) => {
        const title = `Full Stack Dev ${Date.now()}`;
        await addJobTitle(page, title, 'Full stack developer role', 'Requires 3+ years experience');
        const list = await getJobTitlesList(page);
        expect(list).toContain(title);
    });

    test('TC14 - Job title with maximum allowed characters (120 chars)', async ({ page }) => {
        const longTitle = 'A'.repeat(120);
        await page.getByRole('button', { name: 'Add' }).click();
        await page.locator('input.oxd-input').nth(1).fill(longTitle);
        await expect(page.locator('.oxd-input-field-error-message')).not.toBeVisible();
    });

    test('TC15 - Cancel button on Add form navigates back to Job Titles list', async ({ page }) => {
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await expect(page).toHaveURL(JOB_TITLES_URL);
    });

    test('TC16 - Save button is visible and enabled on Add form', async ({ page }) => {
        await page.getByRole('button', { name: 'Add' }).click();
        const saveBtn = page.getByRole('button', { name: 'Save' });
        await expect(saveBtn).toBeVisible();
        await expect(saveBtn).toBeEnabled();
    });

    // ── Add Job Title - Negative ───────────────────────────────────────────

    test('TC17 - Save without entering job title shows required validation error', async ({ page }) => {
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.locator('.oxd-input-field-error-message', { hasText: 'Required' })).toBeVisible();
    });

    test('TC18 - Job title with only spaces shows validation error', async ({ page }) => {
        await page.getByRole('button', { name: 'Add' }).click();
        await page.locator('input.oxd-input').nth(1).fill('     ');
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    });

    test('TC19 - Job title exceeding 120 characters shows validation error', async ({ page }) => {
        await page.getByRole('button', { name: 'Add' }).click();
        await page.locator('input.oxd-input').nth(1).fill('A'.repeat(121));
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    });

    test('TC20 - Job description exceeding 400 characters shows validation error', async ({ page }) => {
        await page.getByRole('button', { name: 'Add' }).click();
        await page.locator('input.oxd-input').nth(1).fill('Valid Title');
        await page.getByPlaceholder('Type description here').fill('D'.repeat(401));
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    });


    //failed at first run, Modified by Rekha
    test('TC21 - Note exceeding 400 characters shows validation error', async ({ page }) => {
        await page.getByRole('button', { name: 'Add' }).click();
        await page.locator('input.oxd-input').nth(1).fill('Valid Title');
        await page.getByPlaceholder('Add note').fill('N'.repeat(401)); // Note textbox can accept maximum  400 character
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    });

    // ── Edit Job Title - Positive ──────────────────────────────────────────

    test('TC22 - Edit button opens Edit Job Title form', async ({ page }) => {
        await page.locator('div.oxd-table-body div[role="row"]').first()
            .locator('button').nth(1).click();
        await expect(page).toHaveURL(/saveJobTitle/);
        await expect(page.getByRole('heading', { name: 'Edit Job Title' })).toBeVisible();
    });
    
    //Modified by Rekha
  
    test('TC23 - Edit form is pre-populated with existing job title data', async ({ page }) => {
       await  test.step('Click edit button and verify pre-populated data', async ()=>{
        await page.locator('div.oxd-table-body div[role="row"]').first()
            .locator('button').nth(1).click();
        })

        await test.step('Verify the job title input field is pre-populated', async ()=>{
            const titleInput = page.locator('input[class="oxd-input oxd-input--active"]').last(); //the existing locator is pointing to 'Search' inputfield in the left menu panel, updated locator
            //adding assertion the job title input field is visible before retrieving the value
            await expect(titleInput).not.toBeEmpty();
            let value = await titleInput.inputValue()
            console.log(value)
            expect(value.length).toBeGreaterThan(0);

            
        })
       
        
    });
  
    //Modified by Rekha
    test('TC24 - Edit and save a job title successfully', async ({ page }) => {
        const updatedTitle = `Updated Title ${Date.now()}`;
        await page.locator('div.oxd-table-body div[role="row"]').first()
            .locator('button').nth(1).click();
        let titleInput = page.locator('input.oxd-input').nth(1);
         //adding assertion for the job title input field not empty before clearing and add then make sue the field is empty before eupdating new jobtitle  and then click on save 
        await expect(titleInput).not.toBeEmpty();
        await titleInput.clear();
        await expect(titleInput).toBeEmpty();
        await titleInput.fill(updatedTitle);
        await expect(titleInput).not.toBeEmpty();
        await page.getByRole('button', { name: 'Save' }).click();
        await page.waitForURL(JOB_TITLES_URL);
        // Wait for the table rows to be visible and stable before reading
        await page.locator('div.oxd-table-body div[role="row"]').first().waitFor({ state: 'visible' });
        //await expect(page.locator('div.oxd-table-body div[role="row"] div[role="cell"]:nth-child(2) div', { hasText: updatedTitle })).toBeVisible();
        const list = await getJobTitlesList(page);
        expect(list).toContain(updatedTitle);
    });

    //Modified by Rekha

    test('TC25 - Cancel on Edit form navigates back without saving', async ({ page }) => {
        await page.locator('div.oxd-table-body div[role="row"]').first()
            .locator('button').nth(1).click();
        const titleInput = page.locator('input.oxd-input').nth(1);
        //adding assertion for the job title input field not empty before clearing and add then make sue the field is empty before updating new jobtitle and then cancel
        await expect(titleInput).not.toBeEmpty();
        let originalTitle = await titleInput.inputValue();
        await expect(titleInput).not.toBeEmpty();
        await titleInput.clear();
        await expect(titleInput).toBeEmpty();
        await titleInput.fill('Should Not Be Saved');
        await expect(titleInput).not.toBeEmpty();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await expect(page).toHaveURL(JOB_TITLES_URL);
        // Wait for the table rows to be visible and stable before reading
        await page.locator('div.oxd-table-body div[role="row"]').first().waitFor({ state: 'visible' });
       await page.locator('div.oxd-table-body div[role="row"] div[role="cell"]:nth-child(2) div', {hasText:originalTitle}).waitFor({ state: 'visible' });
        const list = await getJobTitlesList(page);
        expect(list).toContain(originalTitle);
    });

    // ── Edit Job Title - Negative ──────────────────────────────────────────

    test('TC26 - Clear job title on Edit form and save shows required error', async ({ page }) => {
        await page.locator('div.oxd-table-body div[role="row"]').first()
            .locator('button').nth(1).click();
        const titleInput = page.locator('input.oxd-input').nth(1);
        //adding assertion for the job title input field not empty before clearing and check for field to be empty before clicking on save 
        await expect(titleInput).not.toBeEmpty()
        await titleInput.clear();
        await expect(titleInput).toBeEmpty()
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.locator('.oxd-input-field-error-message', { hasText: 'Required' })).toBeVisible();
    });

    // ── Delete Job Title - Positive ────────────────────────────────────────

    test('TC27 - Delete button shows confirmation dialog', async ({ page }) => {
        await page.locator('div.oxd-table-body div[role="row"]').first()
            .locator('button').nth(0).click();
        
        //locating the dialog popup is visible on the DOM
        await expect(page.locator('.orangehrm-dialog-popup')).toBeVisible()
    
        await expect(page.locator('.oxd-text--card-title')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Yes, Delete' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'No, Cancel' })).toBeVisible();
    });

    test('TC28 - Confirm delete removes the job title from the list', async ({ page }) => {
        const titleToDelete = `Delete Me ${Date.now()}`;
        await addJobTitle(page, titleToDelete);
        await navigateToJobTitles(page);

        const rows = page.locator('div.oxd-table-body div[role="row"]');
        const count = await rows.count();
        for (let i = 0; i < count; i++) {
            const cellText = await rows.nth(i).locator('div[role="cell"]:nth-child(2) div').textContent();
            if (cellText?.trim() === titleToDelete) {
                await rows.nth(i).locator('button').nth(0).click();
                break;
            }
        }
        await page.getByRole('button', { name: 'Yes, Delete' }).click();
        await page.waitForLoadState('networkidle');
        const list = await getJobTitlesList(page);
        expect(list).not.toContain(titleToDelete);
    });

    test('TC29 - Cancel delete keeps the job title in the list', async ({ page }) => {
        const rows = page.locator('div.oxd-table-body div[role="row"]');
        const titleBeforeCancel = await rows.first().locator('div[role="cell"]:nth-child(2) div').textContent();
        await rows.first().locator('button').nth(0).click();
        await page.getByRole('button', { name: 'No, Cancel' }).click();
        const list = await getJobTitlesList(page);
        expect(list).toContain(titleBeforeCancel?.trim());
    });

    // ── Bulk Delete - Positive ─────────────────────────────────────────────

    test('TC30 - Select a single checkbox enables Delete Selected', async ({ page }) => {
        let jobelement =  page.locator('div.oxd-checkbox-wrapper label input[type="checkbox"]').nth(2)
       //force check is added on the webpage, while trying to check the checkbox the webpage was scrolling up and down
        await jobelement.check({ force: true })
        
        const deleteSelectedBtn = page.getByRole('button', { name: 'Delete Selected' });
        await expect(deleteSelectedBtn).toBeEnabled();
    });

    test('TC31 - Select all checkbox selects all rows', async ({ page }) => {
        const headerCheckbox = page.locator('div.oxd-table-header input[type="checkbox"]');
        await headerCheckbox.check({force:true});
        const rowCheckboxes = page.locator('div.oxd-table-body input[type="checkbox"]');
        const total = await rowCheckboxes.count();
        for (let i = 0; i < total; i++) {
            await expect(rowCheckboxes.nth(i)).toBeChecked();
        }
    });

    test('TC32 - Delete Selected shows confirmation dialog', async ({ page }) => {
        await page.locator('div.oxd-table-body div[role="row"]').first()
            .locator('input[type="checkbox"]').check({force:true});
        await page.getByRole('button', { name: 'Delete Selected' }).click();
        //locating the dialog popup is visible on the DOM
        await expect(page.locator('.orangehrm-dialog-popup')).toBeVisible()
    
        await expect(page.locator('.oxd-text--card-title',{hasText:'Are you Sure?'})).toBeVisible();
        
    });

    test('TC33 - Cancel bulk delete keeps records intact', async ({ page }) => {
        const listBefore = await getJobTitlesList(page);
        const headerCheckbox = page.locator('div.oxd-table-header input[type="checkbox"]');
        await headerCheckbox.check({force:true});
        await page.getByRole('button', { name: 'Delete Selected' }).click();
            //locating the dialog popup is visible on the DOM
        await expect(page.locator('.orangehrm-dialog-popup')).toBeVisible()
        await page.getByRole('button', { name: 'No, Cancel' }).click();
        const listAfter = await getJobTitlesList(page);
        expect(listAfter).toEqual(listBefore);
    });

    // ── Navigation & Access Control ────────────────────────────────────────

    test('TC34 - Direct URL access to Job Titles page without login redirects to login', async ({ browser }) => {
         // Create a  new browser context — no cookies, no session
            const freshContext = await browser.newContext();
            const freshPage = await freshContext.newPage();

            await freshPage.goto(JOB_TITLES_URL);
            await expect(freshPage).toHaveURL(LOGIN_URL);

            await freshContext.close(); // clean up after test
    });

    test('TC35 - Breadcrumb or page header shows correct module path', async ({ page }) => {
        await expect(page.locator('.oxd-topbar-header-breadcrumb')).toContainText('Admin');
    });

    test('TC36 - Admin menu Job > Job Titles navigation works', async ({ page }) => {
        await page.getByRole('link', { name: 'Admin' }).click();
        await page.getByText('Job').click();
        await page.getByRole('menuitem', { name: 'Job Titles' }).click();
        await expect(page).toHaveURL(JOB_TITLES_URL);
    });

    // ── Search / Filter ────────────────────────────────────────────────────

    test('TC37 - Search input field is present on the page', async ({ page }) => {
        const searchInput = page.locator('input.oxd-input').first();
        await expect(searchInput).toBeVisible();
    });

    // test('TC38 - Search with a valid job title returns matching results', async ({ page }) => {
    //     const rows = page.locator('div.oxd-table-body div[role="row"]');
    //     const firstTitle = await rows.first().locator('div[role="cell"]:nth-child(2) div').textContent();
    //     const searchInput = page.locator('input.oxd-input').first();
    //     await searchInput.fill(firstTitle?.trim() ?? '');
    //     await page.getByRole('button', { name: 'Search' }).click();
    //     await page.waitForLoadState('networkidle');
    //     const results = await getJobTitlesList(page);
    //     expect(results.length).toBeGreaterThan(0);
    //     results.forEach(r => expect(r.toLowerCase()).toContain(firstTitle?.trim().toLowerCase() ?? ''));
    // });



    // test('TC40 - Reset button clears search and shows all records', async ({ page }) => {
    //     const searchInput = page.locator('input.oxd-input').first();
    //     await searchInput.fill('XYZNONEXISTENTJOBTITLE12345');
    //     await page.getByRole('button', { name: 'Search' }).click();
    //     await page.waitForLoadState('networkidle');
    //     await page.getByRole('button', { name: 'Reset' }).click();
    //     await page.waitForLoadState('networkidle');
    //     const rows = page.locator('div.oxd-table-body div[role="row"]');
    //     expect(await rows.count()).toBeGreaterThan(0);
    // });

    // ── UI / Accessibility ─────────────────────────────────────────────────

    test('TC41 - Page is responsive at 1280x720 viewport', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 720 });
        await navigateToJobTitles(page);
        await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
    });

    test('TC42 - Job title link/text in table is not empty for any row', async ({ page }) => {
        const titles = await getJobTitlesList(page);
        titles.forEach(title => expect(title.trim().length).toBeGreaterThan(0));
    });

  

});
  