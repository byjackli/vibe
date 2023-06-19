import { sha256 } from 'js-sha256';
import { Buffer } from 'buffer';

interface MyResponseType {
	status: number;
	responseText: string;
}

let userExist = false;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

const scope = `user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private`;

function generateRandomString(length: number) {
	let result = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
	for (let i = 0; i < length; i++) {
		result += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return result;
}

function generateCodeVerifier(length: number): string {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
	let codeVerifier = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		codeVerifier += characters.charAt(randomIndex);
	}

	return codeVerifier;
}

function generateCodeChallenge(codeVerifier: string): string {
	const encoder = new TextEncoder();
	const data = encoder.encode(codeVerifier);
	const codeChallenge = base64URL(sha256.arrayBuffer(data));
	return codeChallenge;
}

function base64URL(buffer: ArrayBuffer): string {
	const uint8Array = new Uint8Array(buffer);
	const nodeBuffer = Buffer.from(uint8Array);
	const base64 = nodeBuffer.toString('base64');
	return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export function login() {
	const length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
	const codeVerifier = generateCodeVerifier(length);
	localStorage.setItem('code_verifier', codeVerifier);
	const state = generateRandomString(16);
	const challenge = generateCodeChallenge(codeVerifier);
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

export function isLoggedIn(): boolean {
	return userExist;
}

export function logout(): void {
	userExist = false;
	localStorage.clear();
	window.location.href = `http://127.0.0.1:5173/`;
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
	console.log(body);
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://accounts.spotify.com/api/token', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('Authorization', 'Basic ' + btoa(clientId + ':' + clientSecret));
	xhr.send(body);
	xhr.onload = handleExchangeTokenResponse;
}

export function handleExchangeTokenResponse(this: XMLHttpRequest & MyResponseType): void {
	userExist = true;
	if (this.status === 200) {
		const data = JSON.parse(this.responseText);
		console.log(data);
		if (data.refresh_token !== undefined) {
			const refreshToken: string = data.refresh_token;
			localStorage.setItem('refresh_token', refreshToken);
		}
		if (data.access_token !== undefined) {
			const accessToken: string = data.access_token;
			localStorage.setItem('access_token', accessToken);
			window.location.href = `http://127.0.0.1:5173/`;
		}
	} else {
		alert(this.responseText);
	}
}

export function requestRefreshToken(): void {
	const refreshToken = localStorage.getItem('refresh_token');
	const body = JSON.stringify({
		refresh_token: refreshToken,
		client_id: clientId,
		grant_type: 'refresh_token'
	});
	const credentials = btoa(`${clientId}:${clientSecret}`);
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://accounts.spotify.com/api/token', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('Authorization', 'Basic ' + credentials);
	xhr.send(body);
	xhr.onload = handleRefreshTokenResponse;
}

export function handleRefreshTokenResponse(this: XMLHttpRequest & MyResponseType): void {
	userExist = true;
	if (this.status === 200) {
		const data = JSON.parse(this.responseText);
		if (data.access_token !== undefined) {
			const accessToken: string = data.access_token;
			localStorage.setItem('access_token', accessToken);
		}
	} else {
		alert(this.responseText);
	}
}
