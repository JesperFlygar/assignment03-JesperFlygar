import { expect, type Locator, type Page } from '@playwright/test';

export class CreateClientPage 
{
    readonly page: Page;
    readonly createButton: Locator;


    constructor(page: Page) 
    {
        this.page = page;
        this.createButton = page.getByRole('link', { name: 'Create Client' });
    }

    async performCreate() 
    {
        await this.createButton.click();
    }

    async createClient(fullName: string, userEmail: string, userPhoneNo: string) 
    {
        await this.page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(fullName);
        await this.page.locator('input[type="email"]').fill(userEmail);
        await this.page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill(userPhoneNo);
        await this.page.getByText('Save').click();
        return this.page.locator('#app > div > div.clients > div:nth-last-child(1)');
    }
}