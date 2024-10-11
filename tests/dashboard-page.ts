import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage 
{
    readonly page: Page;
    readonly logoutButton: Locator;

    constructor(page: Page) 
    {
        this.page = page;
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }

    async performLogout() 
    {
        await this.logoutButton.click();
    }
}