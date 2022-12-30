import { expect, test } from '@playwright/test';

test.describe("Styleguide", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/styleguide');
	});

	test(`Page is set up properly`, async ({ page }) => {
		expect(page).toHaveTitle(`Styleguide - ViBE`)
		expect(await page.textContent('h1')).toBe(`Styleguide`)
	})

	test(`Buttons exist`, async ({ page }) => {
		expect(page.locator(`h2:has-text("Buttons")`)).toBeTruthy()
		expect(page.locator(`button:text("main button")`)).toHaveClass(`main`)
		expect(page.locator(`button:text("link button")`)).toHaveClass(`link`)
		expect(page.locator(`button:text("invert main")`)).toHaveClass(`main invert`)
		expect(await page.locator(`button:text("supporting button")`).getAttribute(`class`)).toBeNull()
		expect(await page.locator(`button:text("icon supporting")`).getAttribute(`class`)).toBeNull()
	});


})
