import { describe, it, expect } from 'vitest';
import * as auth from '../../src/api/auth';

describe('Auth', () => {
	it('generateRandom - correct length', () => {
		const randomStrings: string[] = [];
		const length = 16;
		for (let i = 0; i < 50; i++) {
			randomStrings.push(auth.generateRandom(auth.STRING_SET, length));
		}
		for (const randomString of randomStrings) {
			expect(randomString.length).toBe(length);
		}
	});
	it('generateRandom - unique strings', () => {
		const randomStrings: string[] = [];
		const length = 16;
		for (let i = 0; i < 50; i++) {
			randomStrings.push(auth.generateRandom(auth.STRING_SET, length));
		}
		for (let i = 1; i < randomStrings.length; i++) {
			expect(randomStrings[i]).not.toBe(randomStrings[i - 1]);
		}
	});
	it('generateRandom - correct characters', () => {
		const randomStrings: string[] = [];
		const characterSet = auth.STRING_SET;
		const length = 16;
		for (let i = 0; i < 50; i++) {
			randomStrings.push(auth.generateRandom(auth.STRING_SET, length));
		}
		for (let i = 0; i < randomStrings.length; i++) {
			for (let j = 0; j < randomStrings[i].length; j++) {
				const char = randomStrings[i].charAt(j);
				expect(characterSet.indexOf(char)).not.toBe(-1);
			}
		}
	});

	it('generateRandom - correct length', () => {
		const randomCodeVerifiers: string[] = [];
		const lengths: number[] = [];
		for (let i = 0; i < 50; i++) {
			const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
			randomCodeVerifiers.push(auth.generateRandom(auth.CODE_VERIFIER_SET, length));
			lengths.push(length);
		}
		for (let i = 0; i < randomCodeVerifiers.length; i++) {
			expect(randomCodeVerifiers[i].length).toBe(lengths[i]);
			expect(randomCodeVerifiers[i].length).toBeGreaterThanOrEqual(43);
			expect(randomCodeVerifiers[i].length).toBeLessThanOrEqual(128);
		}
	});
	it('generateRandom - unique strings', () => {
		const verifierMap: { [key: string]: boolean } = {};
		const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
		for (let i = 0; i < 50; i++) {
			const codeVerifier = auth.generateRandom(auth.CODE_VERIFIER_SET, length);
			expect(verifierMap).not.toHaveProperty(codeVerifier);
			verifierMap[codeVerifier] = true;
		}

		expect(Object.keys(verifierMap).length).toBe(50);
	});
	it('generateRandom - correct characters', () => {
		const randomCodeVerifiers: string[] = [];
		const characterSet = auth.CODE_VERIFIER_SET;
		const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
		for (let i = 0; i < 50; i++) {
			randomCodeVerifiers.push(auth.generateRandom(auth.CODE_VERIFIER_SET, length));
		}
		for (let i = 0; i < randomCodeVerifiers.length; i++) {
			for (let j = 0; j < randomCodeVerifiers[i].length; j++) {
				const char = randomCodeVerifiers[i].charAt(j);
				expect(characterSet.indexOf(char)).not.toBe(-1);
			}
		}
	});
});
