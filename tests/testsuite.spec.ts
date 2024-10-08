import { test, expect } from '@playwright/test';

test.describe('Frontend tests', () => {
    test('Create a client', async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.locator('input[type="text"]').fill(`${process.env.TEST_USERNAME}`);
        await page.locator('input[type="password"]').fill(`${process.env.TEST_PASSWORD}`);
        await page.getByRole('button', { name: 'Login' }).click(); 
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible(); 
        // rest of code
    });
});


test.describe('Backend tests', () => {
    test('Create a client', async ({ request }) => {
        const response = await request.post('http://localhost:3000/api/login', {
            data: {
                "username": `${process.env.TEST_USERNAME}`,
                "password": `${process.env.TEST_PASSWORD}`
            }
        });
        expect(response.ok()).toBeTruthy(); 
        // rest of code
    });
});