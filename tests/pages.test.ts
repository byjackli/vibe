import { test, expect } from '@playwright/test';

test.describe('Styleguide', () => {
    test(`setup`, async ({ page }) => {
        await page.goto('/styleguide');
        await expect(page).toHaveTitle(`Styleguide - ViBE`);
        expect(page.locator(`h1`, { hasText: 'Styleguide' })).toBeTruthy();
    });
});

test.describe('Welcome', () => {
    test(`setup`, async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(`ViBE`);
        expect(page.locator(`h1`, { hasText: 'ViBE' })).toBeTruthy();
        expect(page.locator(`button`, { hasText: 'sign in with spotify' })).toBeTruthy();
    });
});
