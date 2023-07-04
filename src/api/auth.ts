import * as crypto from 'crypto';

export function generateRandomString(length: number) {
	const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomString = '';
	const randomValues = new Uint32Array(length);
	crypto.getRandomValues(randomValues);
	for (let i = 0; i < length; i++) {
		const randomIndex = randomValues[i] % characterSet.length;
		randomString += characterSet[randomIndex];
	}
	return randomString;
}
