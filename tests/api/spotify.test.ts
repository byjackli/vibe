import { server } from '../mocks/browser';
import { describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest';

import { getUserData } from '../../src/api/spotify';

beforeAll(() => {
	server.listen();
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});

describe('spotify endpoint tests', () => {
	it('getUserData', () => {
		const result = getUserData();
		expect(result).toEqual({
			display_name: 'mockDisplayName',
			user_id: 'mockId'
		});
	});
});
