import { test, expect } from "@playwright/test"

test.describe("Pages", () => {
    test(`Styleguide`, async ({ page }) => {
        await page.goto('/styleguide');
        expect(page).toHaveTitle(`Styleguide - ViBE`)
        expect(await page.textContent('h1')).toBe(`Styleguide`)
    })
})