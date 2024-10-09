import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Frontend tests', () => {
    test('Create a client', async ({ page }) => {
        await page.goto('http://localhost:3000');
        require('dotenv').config();
        await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
        await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
        await page.getByRole('button', { name: 'Login' }).click(); 
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible(); 
        
        /*const viewButton = page.locator('#app > div > div > div:nth-child(2) > a');
        await viewButton.click(); 
        await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();

        const createButton = page.getByRole('link', { name: 'Create Client' });
        await createButton.click();
        
        const fullName = faker.person.fullName();
        const userEmail = faker.internet.email();
        const userPhoneNo = faker.phone.number();
        
        await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(fullName);
        await page.locator('input[type="email"]').fill(userEmail);
        await page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill(userPhoneNo);
        await page.getByText('Save').click();
        return page.locator('#app > div > div.clients > div:nth-last-child(1)');*/
        
        /*await expect(element).toContainText(fullName);
        await expect(element).toContainText(userEmail);
        await expect(element).toContainText(userPhoneNo);*/
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
        /*async createPost(request: APIRequestContext, target: string, payload: object) {
        const response = await request.post(`${this.baseURL}/api/${target}/new`, {
            data: JSON.stringify(payload),
            headers: this.getHeader()
        })
        return response;
        }
        name: faker.person.fullName(),
        email: faker.internet.email(),
        telephone: faker.phone.number()
        
        
        expect....*/
    });
});