import { describe, it, expect } from 'vitest';
import {
	generateRandom,
	STRING_SET,
	CODE_VERIFIER_SET,
	generateChallenge,
	exchangeToken,
	url
} from '../../src/api/spotify/auth';
import { localStorageMock, setItemSpy, getItemSpy } from '../mocks/localStorage';

beforeEach(() => {
	global.localStorage = localStorageMock;
});

describe('Auth', () => {
	it('generateRandom - correct length', () => {
		const randomStrings: string[] = [];
		const length = 16;
		for (let i = 0; i < 50; i++) {
			randomStrings.push(generateRandom(STRING_SET, length));
		}
		for (const randomString of randomStrings) {
			expect(randomString.length).toBe(length);
		}
	});
	it('generateRandom - unique strings', () => {
		const randomStrings: string[] = [];
		const length = 16;
		for (let i = 0; i < 50; i++) {
			randomStrings.push(generateRandom(STRING_SET, length));
		}
		for (let i = 1; i < randomStrings.length; i++) {
			expect(randomStrings[i]).not.toBe(randomStrings[i - 1]);
		}
	});
	it('generateRandom - correct characters', () => {
		const randomStrings: string[] = [];
		const characterSet = STRING_SET;
		const length = 16;
		for (let i = 0; i < 50; i++) {
			randomStrings.push(generateRandom(STRING_SET, length));
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
			randomCodeVerifiers.push(generateRandom(CODE_VERIFIER_SET, length));
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
			const codeVerifier = generateRandom(CODE_VERIFIER_SET, length);
			expect(verifierMap).not.toHaveProperty(codeVerifier);
			verifierMap[codeVerifier] = true;
		}

		expect(Object.keys(verifierMap).length).toBe(50);
	});
	it('generateRandom - correct characters', () => {
		const randomCodeVerifiers: string[] = [];
		const characterSet = CODE_VERIFIER_SET;
		const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
		for (let i = 0; i < 50; i++) {
			randomCodeVerifiers.push(generateRandom(CODE_VERIFIER_SET, length));
		}
		for (let i = 0; i < randomCodeVerifiers.length; i++) {
			for (let j = 0; j < randomCodeVerifiers[i].length; j++) {
				const char = randomCodeVerifiers[i].charAt(j);
				expect(characterSet.indexOf(char)).not.toBe(-1);
			}
		}
	});
	it('generateChallenge - empty verifier', () => {
		const codeVerifier = '';
		const codeChallenge = generateChallenge(codeVerifier);
		const expectedChallange = '47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU';
		expect(codeChallenge).toBe(expectedChallange);
	});
	it('generateChallenge - code verifier', () => {
		const codeVerifier = 'exampleCodeVerifier';
		const codeVerifier2 = 'examplecodeverifier2';
		const codeChallenge = generateChallenge(codeVerifier);
		const codeChallenge2 = generateChallenge(codeVerifier2);
		const expectedChallange = '52piFlBQmkiLElsVXKNYORcxCirSUKHK_EYrI47-pvs';
		const expectedChallange2 = 'rPO26WfDHxfOrMpy60Wh6U6noDNNXqg-Xt0qxOc6a1M';
		expect(codeChallenge).toBe(expectedChallange);
		expect(codeChallenge2).toBe(expectedChallange2);
	});
	it('generateChallenge - special characters', () => {
		const codeVerifier = '!@#$%^&*()_+=-{}[]|\\:";\'<>?,./`~';
		const codeChallenge = generateChallenge(codeVerifier);
		const expectedChallange = 'gfW_xGK4zYme7rNob8NnlKk90HPBXxnilktyr91ei14';
		expect(codeChallenge).toBe(expectedChallange);
	});
	it('Login', () => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `https://accounts.spotify.com/authorize?`, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
		xhr.send(null);
		xhr.onload = () => {
			const responseData = JSON.parse(xhr.responseText);
			expect(responseData.status).toBe(200);
		};
	});
	it('exchangeToken localStorage', () => {
		exchangeToken('mockExchangeToken');
		expect(getItemSpy).toHaveBeenCalledWith('code_verifier');
		expect(setItemSpy).toHaveBeenCalledWith(
			'ViBE',
			JSON.stringify({
				access_token: 'mockAccessToken',
				refresh_token: 'mockRefreshToken',
				display_name: '',
				user_id: ''
			})
		);
	});
	it('exchangeToken redirects on success', () => {
		jest.spyOn(window.location, 'replace');
		exchangeToken('mockExchangeToken');
		expect(window.location.replace).toHaveBeenCalledWith(`${url}`);
	});
});
