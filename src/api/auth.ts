import * as crypto from 'crypto';
import { SHA256, enc } from 'crypto-js';

export const STRING_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const CODE_VERIFIER_SET =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

const clientId = process.env.CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;
const scope = `user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private`;

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
