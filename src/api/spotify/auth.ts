import pkg from 'crypto-js';
const { SHA256, enc } = pkg;
import type { LocalStorage } from './types';
import fetch from 'cross-fetch';

export const STRING_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const CODE_VERIFIER_SET =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const scope = `user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private`;
export const url = process.env.URL;

export function generateRandom(set: string, length: number) {
	let random = '';
	if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
		const randomValues = new Uint32Array(length);
		window.crypto.getRandomValues(randomValues);
		for (let i = 0; i < length; i++) {
			const randomIndex = randomValues[i] % set.length;
			random += set[randomIndex];
		}
	} else {
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * set.length);
			random += set[randomIndex];
		}
	}
	return random;
}

export function generateChallenge(codeVerifier: string): string {
	const codeChallenge = SHA256(codeVerifier)
		.toString(enc.Base64)
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
	return codeChallenge;
}

export function login() {
	const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
	const codeVerifier = generateRandom(CODE_VERIFIER_SET, length);
	localStorage.setItem('code_verifier', codeVerifier);
	const state = generateRandom(STRING_SET, 16);
	const challenge = generateChallenge(codeVerifier);
	const oAuthParams = new URLSearchParams({
		client_id: clientId as string,
		response_type: `code`,
		redirect_uri: redirectUri as string,
		scope: scope,
		code_challenge_method: 'S256',
		code_challenge: challenge,
		state: state
	});
	window.location.replace(`https://accounts.spotify.com/authorize?${oAuthParams}`);
}

export function logout() {
	localStorage.removeItem('ViBE');
	window.location.replace(`${url}`);
}

export async function exchangeToken(code: string) {
	const verifier = localStorage.getItem('code_verifier');
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret)
		},
		body: new URLSearchParams({
			code: code,
			redirect_uri: redirectUri as string,
			grant_type: 'authorization_code',
			client_id: clientId as string,
			code_verifier: verifier as string
		})
	});
	const data = await response.json();
	if (response.status == 200) {
		const storedObj = {
			access_token: '',
			refresh_token: '',
			display_name: '',
			user_id: ''
		};
		if (data.refresh_token !== undefined && data.access_token !== undefined) {
			storedObj.refresh_token = data.refresh_token;
			storedObj.access_token = data.access_token;
			localStorage.setItem('ViBE', JSON.stringify(storedObj));
		}
	} else {
		alert(response.statusText);
	}
}

export async function refreshToken() {
	const storedValue: string | null = localStorage.getItem('ViBE');
	if (storedValue !== null) {
		const obj: LocalStorage = JSON.parse(storedValue);
		const refreshToken = obj.refresh_token;
		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret)
			},
			body: JSON.stringify({
				refresh_token: refreshToken,
				client_id: clientId,
				grant_type: 'refresh_token'
			})
		});
		const data = await response.json();
		if (response.ok) {
			if (data.access_token !== undefined) {
				obj.access_token = data.access_token;
				localStorage.setItem('ViBE', JSON.stringify(obj));
			}
		} else {
			alert(response.statusText);
		}
	}
}
