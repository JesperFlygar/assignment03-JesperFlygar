import { expect, type Locator, type Page } from '@playwright/test';

export class ViewBillPage 
{
    readonly page: Page;
    readonly viewButton: Locator;

    constructor(page: Page) 
    {
        this.page = page;
        this.viewButton = page.locator('#app > div > div > div:nth-child(3) > a');
    }

    async performClickView() 
    {
        await this.viewButton.click();
    }
}