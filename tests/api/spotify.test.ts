import { server } from '../mocks/browser';
import { describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest';

import { getUserData, getSongs, search } from '../../src/api/spotify.ts';

beforeAll(() => {
	server.listen();
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});

describe('spotify api tests', () => {
	it('getUserData', () => {
		const result = getUserData();
		expect(result).toEqual({
			display_name: 'mockDisplayName',
			id: 'mockId'
		});
	});

	it('getSongs', () => {
		const params = new URLSearchParams({
			mock: 'mockParams'
		});
		const result = getSongs(params);
        expect(result).toEqual([
            {
				songid: 'mockId',
				title: 'mockTitle',
				artists: ["mockName"],
				image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
				previewAudio: "mockPreviewUrl"
			}
        ])
	});

	it('search', () => {
		const params = new URLSearchParams({
			mock: 'mockParams'
		});
		const result = search(params);
		expect(result).toEqual([
			{
				type: 'track',
				data: {
					album: {
						album_type: 'album',
						total_tracks: 12,
						available_markets: ['US'],
						external_urls: {
							spotify: 'https://open.spotify.com/album/34GQP3dILpyCN018y2k61L'
						},
						href: 'https://api.spotify.com/v1/albums/34GQP3dILpyCN018y2k61L',
						id: '34GQP3dILpyCN018y2k61L',
						images: [
							{
								height: 640,
								url: 'https://i.scdn.co/image/ab67616d0000b273bcfc1c7e89de8f43788c8235',
								width: 640
							},
							{
								height: 300,
								url: 'https://i.scdn.co/image/ab67616d00001e02bcfc1c7e89de8f43788c8235',
								width: 300
							},
							{
								height: 64,
								url: 'https://i.scdn.co/image/ab67616d00004851bcfc1c7e89de8f43788c8235',
								width: 64
							}
						],
						name: 'Nectar',
						release_date: '2020-09-25',
						release_date_precision: 'day',
						type: 'album',
						uri: 'spotify:album:34GQP3dILpyCN018y2k61L'
					},
					artists: [
						{
							external_urls: {
								spotify: 'https://open.spotify.com/artist/3MZsBdqDrRTJihTHQrO6Dq'
							},
							href: 'https://api.spotify.com/v1/artists/3MZsBdqDrRTJihTHQrO6Dq',
							id: '3MZsBdqDrRTJihTHQrO6Dq',
							name: 'Joji',
							type: 'artist',
							uri: 'spotify:artist:3MZsBdqDrRTJihTHQrO6Dq'
						}
					],
					available_markets: ['US'],
					disc_number: 1,
					duration_ms: 209754,
					explicit: true,
					external_ids: {
						isrc: 'USUG12001913'
					},
					external_urls: {
						spotify: 'https://open.spotify.com/track/7eJMfftS33KTjuF7lTsMCx'
					},
					href: 'https://api.spotify.com/v1/tracks/7eJMfftS33KTjuF7lTsMCx',
					id: '7eJMfftS33KTjuF7lTsMCx',
					is_local: false,
					name: 'Ew',
					popularity: 71,
					preview_url: null,
					track_number: 7,
					type: 'track',
					uri: 'spotify:track:7eJMfftS33KTjuF7lTsMCx'
				}
			},
			{
				type: 'artist',
				data: {
					album_type: 'album',
					artists: [
						{
							external_urls: {
								spotify: 'https://open.spotify.com/artist/3MZsBdqDrRTJihTHQrO6Dq'
							},
							href: 'https://api.spotify.com/v1/artists/3MZsBdqDrRTJihTHQrO6Dq',
							id: '3MZsBdqDrRTJihTHQrO6Dq',
							name: 'Joji',
							type: 'artist',
							uri: 'spotify:artist:3MZsBdqDrRTJihTHQrO6Dq'
						}
					],
					available_markets: ['US'],
					external_urls: {
						spotify: 'https://open.spotify.com/album/34GQP3dILpyCN018y2k61L'
					},
					href: 'https://api.spotify.com/v1/albums/34GQP3dILpyCN018y2k61L',
					id: '34GQP3dILpyCN018y2k61L',
					images: [
						{
							height: 640,
							url: 'https://i.scdn.co/image/ab67616d0000b273bcfc1c7e89de8f43788c8235',
							width: 640
						},
						{
							height: 300,
							url: 'https://i.scdn.co/image/ab67616d00001e02bcfc1c7e89de8f43788c8235',
							width: 300
						},
						{
							height: 64,
							url: 'https://i.scdn.co/image/ab67616d00004851bcfc1c7e89de8f43788c8235',
							width: 64
						}
					],
					name: 'Nectar',
					release_date: '2020-09-25',
					release_date_precision: 'day',
					total_tracks: 18,
					type: 'album',
					uri: 'spotify:album:34GQP3dILpyCN018y2k61L'
				}
			}
		]);
	});
});
