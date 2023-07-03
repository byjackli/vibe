export function generateRandomString(length: number) {
	let result = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
	for (let i = 0; i < length; i++) {
		result += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return result;
}
