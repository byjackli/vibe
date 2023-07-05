import { describe, it, expect } from 'vitest';
import { generateRandomString } from '../../src/api/auth';

describe('Auth', () => {
	it('generateRandomString - correct length', () => {
		const randomStrings: string[] = [];
		const length = 16;
		for (let i = 0; i < 50; i++) {
			randomStrings.push(generateRandomString(length));
		}
		for (const randomString of randomStrings) {
			expect(randomString.length).toBe(length);
		}
	});
	it('generateRandomString - unique strings', () => {
		const randomStrings: string[] = [];
		const length = 16;
		for (let i = 0; i < 50; i++) {
			randomStrings.push(generateRandomString(length));
		}
		for (let i = 1; i < randomStrings.length; i++) {
			expect(randomStrings[i]).not.toBe(randomStrings[i - 1]);
		}
	});
	it('generateRandomString - correct characters', () => {
		const randomStrings: string[] = [];
		const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const length = 16;
		for (let i = 0; i < 50; i++) {
			randomStrings.push(generateRandomString(length));
		}
		for (let i = 0; i < randomStrings.length; i++) {
			for (let j = 0; j < randomStrings[i].length; j++) {
				const char = randomStrings[i].charAt(j);
				expect(characterSet.indexOf(char)).not.toBe(-1);
			}
		}
	});
});
