import * as crypto from 'crypto';
import { SHA256, enc } from 'crypto-js';
import type { MyResponseType, LocalStorage } from './types';

export const STRING_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const CODE_VERIFIER_SET =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const scope = `user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private`;
export const url = 'temp';

export function generateRandom(set: string, length: number) {
	let random = '';
	const randomValues = new Uint32Array(length);
	crypto.getRandomValues(randomValues);
	for (let i = 0; i < length; i++) {
		const randomIndex = randomValues[i] % set.length;
		random += set[randomIndex];
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

export function exchangeToken(code: string): void {
	const verifier = localStorage.getItem('code_verifier');
	const body = new URLSearchParams({
		code: code,
		redirect_uri: redirectUri as string,
		grant_type: 'authorization_code',
		client_id: clientId as string,
		code_verifier: verifier as string
	});
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://accounts.spotify.com/api/token', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('Authorization', 'Basic ' + btoa(clientId + ':' + clientSecret));
	xhr.send(body);
	xhr.onload = handleExchangeTokenResponse;
}

export function handleExchangeTokenResponse(this: XMLHttpRequest & MyResponseType): void {
	if (this.status === 200) {
		const data = JSON.parse(this.responseText);
		const storedObj: LocalStorage = {
			access_token: '',
			refresh_token: '',
			display_name: '',
			user_id: ''
		};
		if (data.refresh_token !== undefined && data.access_token !== undefined) {
			storedObj.refresh_token = data.refresh_token;
			storedObj.access_token = data.access_token;
			window.location.replace(`${url}`);
		}
		localStorage.setItem('ViBE', JSON.stringify(storedObj));
	} else {
		alert(this.responseText);
	}
}
