import {
	generateRandom,
	STRING_SET,
	CODE_VERIFIER_SET,
	generateChallenge,
	exchangeToken,
	refreshToken
} from '../../src/api/spotify/auth';
import { localStorageMock, setItemSpy, getItemSpy } from '../mocks/localStorage';

beforeEach(() => {
	Object.defineProperty(window, 'localStorage', {
		value: localStorageMock,
		configurable: true
	});
});
const originalLocation = window;
afterEach(() => {
	Object.defineProperty(globalThis, 'window', {
		value: originalLocation
	});
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
		const expectedChallange = 'xiQjA2FoFix2DkD-V-DdxzwKwWJxzB8k5vqForKtCOc';
		expect(codeChallenge).toBe(expectedChallange);
	});
	it('Login', () => {
		const oAuthParams = new URLSearchParams({
			client_id: 'mockClientId',
			response_type: `code`,
			redirect_uri: 'mockRedirectUri',
			scope: 'mockScope',
			code_challenge_method: 'S256',
			code_challenge: 'mockChallenge',
			state: 'mackState'
		});
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `https://accounts.spotify.com/authorize?${oAuthParams}`, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
		xhr.send(null);
		xhr.onload = () => {
			expect(xhr.status).toBe(200);
		};
	});
	it('Login missing params', () => {
		const oAuthParams = new URLSearchParams({
			redirect_uri: 'mockRedirectUri',
			scope: 'mockScope',
			code_challenge_method: 'S256',
			code_challenge: 'mockChallenge',
			state: 'mockState'
		});
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `https://accounts.spotify.com/authorize?${oAuthParams}`, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
		xhr.send(null);
		xhr.onload = () => {
			expect(xhr.status).toBe(400);
		};
	});
	it('exchangeToken localStorage', () => {
		exchangeToken('mockExchangeToken');
		expect(getItemSpy).toHaveBeenCalledWith('code_verifier');
		setItemSpy.mockImplementation((key, value) => {
			expect(key).toBe('ViBE');
			expect(value).toMatchObject({
				access_token: 'mockAccessToken',
				refresh_token: 'mockRefreshTokenNew',
				display_name: '',
				user_id: ''
			});
		});
		getItemSpy.mockRestore();
		setItemSpy.mockRestore();
	});
	it('exchangeToken missing param', () => {
		const body = JSON.stringify({
			code: null,
			redirect_uri: null,
			grant_type: 'authorization_code',
			client_id: null,
			code_verifier: null
		});
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://accounts.spotify.com/api/token', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Authorization', 'Basic ' + btoa('mockClientId:mockClientSecret'));
		xhr.send(body);
		xhr.onload = () => {
			expect(xhr.status).toBe(400);
		};
	});
	it('refreshToken localStorage', () => {
		refreshToken();
		expect(getItemSpy).toHaveBeenCalledWith('ViBE');
		getItemSpy.mockRestore();
	});
	it('refreshToken missing param', () => {
		const body = JSON.stringify({
			refresh_token: null,
			client_id: null,
			grant_type: 'refresh_token'
		});
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://accounts.spotify.com/api/token', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Authorization', 'Basic ' + btoa('mockClientId:mockClientSecret'));
		xhr.send(body);
		xhr.onload = () => {
			expect(xhr.status).toBe(400);
		};
	});
});
