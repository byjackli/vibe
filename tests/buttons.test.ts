import { expect, test } from '@playwright/test';

test.describe("Buttons", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/styleguide');
	});

	test(`Buttons exist`, async ({ page }) => {
		expect(page.locator(`h2`, { hasText: "Buttons" })).toBeTruthy()
		expect(page.locator(`button`, { hasText: "main button" })).toHaveClass(`main`)
		expect(page.locator(`button`, { hasText: "link button" })).toHaveClass(`link`)
		expect(page.locator(`button`, { hasText: "invert main" })).toHaveClass(`main invert`)
		expect(await page.locator(`button`, { hasText: "supporting button" }).getAttribute(`class`)).toBeNull()
		expect(await page.locator(`button`, { hasText: "icon supporting" }).getAttribute(`class`)).toBeNull()
	});

	test(`SearchButtons exist`, async ({ page }) => {
		expect(page.locator(`h2`, { hasText: "Search Buttons" })).toBeTruthy()
		await expect(page.locator(`button.recent`)).toHaveCount(6)
		await expect(page.locator(`button.result`)).toHaveCount(3)
		await expect(page.locator(`button.too-long`)).toHaveCount(5);
	});
})
