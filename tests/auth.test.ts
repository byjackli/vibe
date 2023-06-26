import { expect, test } from '@playwright/test';
import '@testing-library/jest-dom/extend-expect'

import {
	generateRandomString,
	generateCodeVerifier,
	generateCodeChallenge,
	base64URL,
	isLoggedIn,
	logout,
	login
} from '../src/api/auth.ts';

test.describe('Auth', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('Random String', () => {
		const length = 16;
		const randomString1 = generateRandomString(length);
		const randomString2 = generateRandomString(length);
		expect(randomString1).not.toBe(randomString2);
	});

	test('Code Verifiers', () => {
		const length = 64;
		const codeVerifier1 = generateCodeVerifier(length);
		const codeVerifier2 = generateCodeVerifier(length);
		expect(codeVerifier1.length).toBe(length);
		expect(codeVerifier2.length).toBe(length);
		expect(codeVerifier1).not.toBe(codeVerifier2);
	});

	test('Code Challenge', () => {
		const codeVerifier = 'TEST6xJ3xDciuouV9QpE1k6YM1QjdxyfBZQnNKXV708';
		const codeChallenge = generateCodeChallenge(codeVerifier);
		expect(codeChallenge).toEqual('bisRHzD-CisfaIkCHqvswYnKmzxbHwMVAu_z0KPhAgk');
	});

	test('Base64URL', () => {
		const buffer = new ArrayBuffer(8);
		const uint8Array = new Uint8Array(buffer);
		uint8Array.set([72, 101, 108, 108, 111, 33, 64, 126]);
		const result = base64URL(buffer);
		expect(result).toEqual('SGVsbG8hQH4~');
	});

	test('User Logged In', () => {
		let userExist = true;
		let result = isLoggedIn();
		expect(result).toBe(true);
		userExist = false;
		result = isLoggedIn();
		expect(result).toBe(false);
	});

	test('logs out the user', () => {
		let userExist = true;
		generateCodeVerifier(64);
		logout();
		expect(userExist).toBe(false);
		expect(localStorage.length).toBe(0);
	});

	test('Login Parameters', () => {
		const replaceMock = jest.spyOn(window.location, 'replace').mockImplementation();
		jest.mock('./your-utils', () => ({
		  generateCodeVerifier: jest.fn(() => 'mockCodeVerifier'),
		  generateRandomString: jest.fn(() => 'mockRandomString'),
		  generateCodeChallenge: jest.fn(() => 'mockCodeChallenge')
		}));
	
		login();

		const expectedParams = new URLSearchParams({
		  client_id: `${process.env.CLIENT_ID}`,
		  response_type: 'code',
		  redirect_uri: `${process.env.REDIRECT_URI}`,
		  scope: 'yourScope',
		  code_challenge_method: 'S256',
		  code_challenge: 'mockCodeChallenge',
		  state: 'mockRandomString'
		});
		const expectedURL = `https://accounts.spotify.com/authorize?${expectedParams}`;
	
		expect(replaceMock.mock.calls[0][0]).toBe(expectedURL);
		replaceMock.mockRestore();
	  });
});
