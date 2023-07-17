import { server } from '../mocks/browser';
import { describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest';
import { getUserData, getSongs, search } from '../../src/api/spotify/service';

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
	it('search', () => {
		const params = new URLSearchParams({
			mock: 'mockParams'
		});
		const result = search(params.toString(), 1);
		expect(result).toEqual([
			{
				type: 'track',
				data: {
					songid: '7eJMfftS33KTjuF7lTsMCx',
					title: 'Ew',
					artists: ['Joji'],
					image: 'https://i.scdn.co/image/ab67616d0000b273bcfc1c7e89de8f43788c8235',
					previewAudio: null
				}
			},
			{
				type: 'artist',
				data: {
					artistid: '3MZsBdqDrRTJihTHQrO6Dq',
					name: 'Joji',
					image: 'https://i.scdn.co/image/ab6761610000e5eb4111c95b5f430c3265c7304b'
				}
			}
		]);
	});
});
