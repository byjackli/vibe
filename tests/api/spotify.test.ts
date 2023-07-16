import { server } from '../mocks/browser';
import { describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest';
import { getUserData, getSongs } from '../../src/api/spotify/service';

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
	it('getSongs', () => {
		const params = new URLSearchParams({
			mock: 'mockParams'
		});
		const result = getSongs(params.toString());
		expect(result).toEqual([
			{
				songid: 'mockId',
				title: 'mockTitle',
				artists: ['mockName'],
				image: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
				previewAudio: 'mockPreviewUrl'
			}
		]);
	});
});
