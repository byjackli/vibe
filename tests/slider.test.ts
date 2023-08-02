import { test, expect } from '@playwright/test';

test.describe('Filter', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/styleguide');
	});

	test('Slider', async ({ page }) => {
		const minSlider = page.locator('.minSlider');
		const maxSlider = page.locator('.maxSlider');
		expect(await minSlider.isVisible()).toBeTruthy();
		expect(await maxSlider.isVisible()).toBeTruthy();
		const minValueSpan = await page.locator('.rangeValues span:nth-child(1)').innerText();
		expect(minValueSpan).toBe('0');
		const maxValueSpan = await page.locator('.rangeValues span:nth-child(2)').innerText();
		expect(maxValueSpan).toBe('100');
		const checkBox = page.locator('.rangeCheckbox');
		expect(await checkBox.isVisible()).toBeTruthy();
		await checkBox.check();
		expect(await checkBox.isChecked()).toBeTruthy();
		await checkBox.uncheck();
		expect(await checkBox.isChecked()).toBeFalsy();
	});
});
