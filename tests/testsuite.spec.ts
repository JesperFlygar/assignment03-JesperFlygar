import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { CreateClientPage } from './create_client_page';
import { CreateBillPage } from './create_bill_page';
import { ViewClientPage } from './view_client_page';
import { ViewBillPage } from './view_bill_page';

import { APIHelper } from './apiHelpers';
import { createRandomClient, createRandomBill, loginInformation } from './testData';

import { LoginPage } from './login-page';
import { LogoutPage } from './logout-page';
import { BASE_URL } from './testTarget';

// push request main test


test.describe('Frontend tests', () => {
    test.beforeEach(async ({ page }) => {
        require('dotenv').config();
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.preformLogin(`${process.env.TEST_USERNAME}`, (`${process.env.TEST_PASSWORD}`)); 
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        const logoutPage = new LogoutPage(page);
        logoutPage.performLogout();
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });

    test('Create a client', async ({ page }) => {
        const viewPage = new ViewClientPage(page);
        const createPage = new CreateClientPage(page);

        await viewPage.performClickView();
        await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

        await createPage.performCreate();
        await expect(page.getByText('New Client')).toBeVisible();

        const fullName = faker.person.fullName();
        const userEmail = faker.internet.email();
        const userPhoneNo = faker.phone.number();

        const element = await createPage.createClient(fullName, userEmail, userPhoneNo);

        await expect(element).toContainText(fullName);
        await expect(element).toContainText(userEmail);
        await expect(element).toContainText(userPhoneNo);
    });

    test('Create a bill', async ({ page }) => {
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
    let apiHelper: APIHelper;

    test.beforeAll(() => {
        apiHelper = new APIHelper(BASE_URL);
    });

    test.beforeEach(async ({ request }) => {
        const preformLogin = loginInformation();
        const loginResponse = await apiHelper.login(request, preformLogin);
        expect(loginResponse.ok()).toBeTruthy();
    });

    test.afterEach(async ({ request }) => {
        const logoutResponse = await apiHelper.logout(request);
        expect(logoutResponse.ok()).toBeTruthy();
    });

    test('Create a client', async ({ request }) => {
        const createClient = createRandomClient();
        const createPostResponse = await apiHelper.createPost(request, 'client', createClient);
        expect(createPostResponse.ok()).toBeTruthy();

        expect(await createPostResponse.json()).toMatchObject(createClient);
        const getPosts = await apiHelper.getAllPosts(request, 'clients');
        expect(getPosts.ok()).toBeTruthy();
        expect(await getPosts.json()).toEqual(
            expect.arrayContaining([
                expect.objectContaining(createClient)
            ])
        );
    });

    test('Create a bill', async ({ request }) => {
        const createBill = createRandomBill();
        const createPostResponse = await apiHelper.createPost(request, 'bill', createBill);
        expect(createPostResponse.ok()).toBeTruthy();

        expect(await createPostResponse.json()).toMatchObject(createBill);
        const getPosts = await apiHelper.getAllPosts(request, 'bills');
        expect(getPosts.ok()).toBeTruthy();
        expect(await getPosts.json()).toEqual(
            expect.arrayContaining([
                expect.objectContaining(createBill)
            ])
        );
    });
});