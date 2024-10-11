import { expect, type Locator, type Page } from '@playwright/test';

export class CreateBillPage 
{
    readonly page: Page;
    readonly createButton: Locator;


    constructor(page: Page) 
    {
        this.page = page;
        this.createButton = page.getByRole('link', { name: 'Create Bill' });
    }

    async performCreate() 
    {
        await this.createButton.click();
    }

    async createBill(value: Number) 
    {
        await this.page.getByRole('spinbutton').fill(value.toString());
        await this.page.locator('.checkbox').click();
        await this.page.getByText('Save').click();
        return this.page.locator('#app > div > div.bills > div:nth-last-child(1)');
    }
}