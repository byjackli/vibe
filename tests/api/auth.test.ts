import { describe, it, expect } from 'vitest';
import { generateRandomString } from '../../src/api/auth';

describe('Auth', () => {
	it('generateRandom String', () => {
		const length = 16;
		const randomString1 = generateRandomString(length);
		const randomString2 = generateRandomString(length);
		expect(randomString1).not.toBe(randomString2);
		expect(randomString1.length).toBe(randomString2.length);
	});
});
