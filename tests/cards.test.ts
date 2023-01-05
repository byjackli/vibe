import { test, expect } from "@playwright/test"
// to test spcific .test.ts file enter "npm run test example-name-here"
// to specify line, after name enter ":line-number-here"
test.describe("Pages", () => {
    test.beforeEach(async ({ page }) => {
		await page.goto('/styleguide');
	});
    /*
    --TODO--
        Set up backend to test:
            - like song
            - add song
    */

    test('Card', async({page}) => {
        const card = page.locator('div.card')
        expect(await card.getAttribute(`aria-expanded`)).toBe('false')
        await card.click()
        expect(await card.getAttribute(`aria-expanded`)).toBe('true')
    })

    test('Controls', async({page}) => {
        const card = page.locator('div.card')
        await card.click()

        const playPause = page.locator('button.playPause')
        expect(await playPause.textContent()).toBe('play_arrow')

        await playPause.click()
        expect(await playPause.textContent()).toBe('pause')
        expect(await card.getAttribute(`aria-expanded`)).toBe('true')

    })

})