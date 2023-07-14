import * as crypto from 'crypto';
import { SHA256, enc } from 'crypto-js';

export const STRING_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const CODE_VERIFIER_SET =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

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
