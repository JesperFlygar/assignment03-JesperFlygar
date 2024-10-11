import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { CreateClientPage } from './create_client_page';
import { CreateBillPage } from './create_bill_page';
import { ViewClientPage } from './view_client_page';
import { ViewBillPage } from './view_bill_page';


test.describe('Frontend tests', () => {
    test('Create a client', async ({ page }) => {
        await page.goto('http://localhost:3000');
        require('dotenv').config();
        await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
        await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

        const viewPage = new ViewClientPage(page);
        const createPage = new CreateClientPage(page);

        await viewPage.performClickView();
        await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

        const fullName = faker.person.fullName();
        const userEmail = faker.internet.email();
        const userPhoneNo = faker.phone.number();

        const element = await createPage.createClient(fullName, userEmail, userPhoneNo);

        await expect(element).toContainText(fullName);
        await expect(element).toContainText(userEmail);
        await expect(element).toContainText(userPhoneNo);
    });

    test('Create a bill', async ({ page }) => {
        await page.goto('http://localhost:3000');
        require('dotenv').config();
        await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
        await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

        const viewPage = new ViewBillPage(page);
        const createPage = new CreateBillPage(page);

        await viewPage.performClickView();
        await expect(page.getByRole('link', { name: 'Create Bill' })).toBeVisible();

        await createPage.performCreate();
        await expect(page.getByText('New Bill')).toBeVisible();

        const value = faker.helpers.rangeToNumber({ min: 1, max: 999999999 });

        const element = await createPage.createBill(value);

        await expect(element).toContainText(value.toString());
        await expect(element).toContainText('Yes');
    });
});


test.describe('Backend tests', () => {
    test('Create a client', async ({ request }) => {
        require('dotenv').config();
        const response = await request.post('http://localhost:3000/api/login', {
            data: {
                "username": `${process.env.TEST_USERNAME}`,
                "password": `${process.env.TEST_PASSWORD}`
            }
        });
        expect(response.ok()).toBeTruthy();

    });
});