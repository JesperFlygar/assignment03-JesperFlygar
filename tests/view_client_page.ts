import { expect, type Locator, type Page } from '@playwright/test';

export class ViewClientPage 
{
    readonly page: Page;
    readonly viewButton: Locator;

    constructor(page: Page) 
    {
        this.page = page;
        this.viewButton = page.locator('#app > div > div > div:nth-child(2) > a');
    }

    async performClickView() 
    {
        await this.viewButton.click();
    }
}