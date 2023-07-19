import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
	rest.get('https://accounts.spotify.com/authorize', (req, res, ctx) => {
		return res(ctx.status(200));
	}),
	rest.post('https://accounts.spotify.com/api/token', async (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				access_token: 'mockAccessToken',
				refresh_token: 'mockRefreshTokenNew'
			})
		);
	}),
	rest.get('https://api.spotify.com/v1/me', (req, res, ctx) => {
		return res(
			ctx.json({
				country: 'string',
				display_name: 'mockDisplayName',
				email: 'string',
				explicit_content: {
					filter_enabled: false,
					filter_locked: false
				},
				external_urls: {
					spotify: 'string'
				},
				followers: {
					href: 'string',
					total: 0
				},
				href: 'string',
				id: 'mockId',
				images: [
					{
						url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
						height: 300,
						width: 300
					}
				],
				product: 'string',
				type: 'string',
				uri: 'string'
			})
		);
	}),
	rest.get('https://api.spotify.com/v1/recommendations', (req, res, ctx) => {
		return res(
			ctx.json({
				seeds: [
					{
						afterFilteringSize: 0,
						afterRelinkingSize: 0,
						href: 'string',
						id: 'string',
						initialPoolSize: 0,
						type: 'string'
					}
				],
				tracks: [
					{
						album: {
							album_type: 'compilation',
							total_tracks: 9,
							available_markets: ['CA', 'BR', 'IT'],
							external_urls: {
								spotify: 'string'
							},
							href: 'string',
							id: '2up3OPMp9Tb4dAKM2erWXQ',
							images: [
								{
									url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
									height: 300,
									width: 300
								}
							],
							name: 'string',
							release_date: '1981-12',
							release_date_precision: 'year',
							restrictions: {
								reason: 'market'
							},
							type: 'album',
							uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
							copyrights: [
								{
									text: 'string',
									type: 'string'
								}
							],
							external_ids: {
								isrc: 'string',
								ean: 'string',
								upc: 'string'
							},
							genres: ['Egg punk', 'Noise rock'],
							label: 'string',
							popularity: 0,
							album_group: 'compilation',
							artists: [
								{
									external_urls: {
										spotify: 'string'
									},
									href: 'string',
									id: 'string',
									name: 'string',
									type: 'artist',
									uri: 'string'
								}
							]
						},
						artists: [
							{
								external_urls: {
									spotify: 'string'
								},
								followers: {
									href: 'string',
									total: 0
								},
								genres: ['Prog rock', 'Grunge'],
								href: 'string',
								id: 'string',
								images: [
									{
										url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
										height: 300,
										width: 300
									}
								],
								name: 'mockName',
								popularity: 0,
								type: 'artist',
								uri: 'string'
							}
						],
						available_markets: ['string'],
						disc_number: 0,
						duration_ms: 0,
						explicit: false,
						external_ids: {
							isrc: 'string',
							ean: 'string',
							upc: 'string'
						},
						external_urls: {
							spotify: 'string'
						},
						href: 'string',
						id: 'mockId',
						is_playable: false,
						linked_from: {},
						restrictions: {
							reason: 'string'
						},
						name: 'mockTitle',
						popularity: 0,
						preview_url: 'mockPreviewUrl',
						track_number: 0,
						type: 'track',
						uri: 'string',
						is_local: false
					}
				]
			})
		);
	}),
	rest.get('https://api.spotify.com/v1/search', (req, res, ctx) => {
		return res(
			ctx.json({
				tracks: {
					href: 'https://api.spotify.com/v1/search?query=joji&type=track&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=1',
					limit: 1,
					next: 'https://api.spotify.com/v1/search?query=joji&type=track&locale=en-US%2Cen%3Bq%3D0.9&offset=1&limit=1',
					offset: 0,
					previous: null,
					total: 32,
					items: [
						{
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
					]
				},
				artists: {
					href: 'https://api.spotify.com/v1/search?query=joji&type=artist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=1',
					limit: 1,
					next: null,
					offset: 0,
					previous: null,
					total: 1,
					items: [
						{
							external_urls: {
								spotify: 'https://open.spotify.com/artist/3MZsBdqDrRTJihTHQrO6Dq'
							},
							followers: {
								href: null,
								total: 8710706
							},
							genres: ['viral pop'],
							href: 'https://api.spotify.com/v1/artists/3MZsBdqDrRTJihTHQrO6Dq',
							id: '3MZsBdqDrRTJihTHQrO6Dq',
							images: [
								{
									url: 'https://i.scdn.co/image/ab6761610000e5eb4111c95b5f430c3265c7304b',
									height: 640,
									width: 640
								},
								{
									url: 'https://i.scdn.co/image/ab676161000051744111c95b5f430c3265c7304b',
									height: 320,
									width: 320
								},
								{
									url: 'https://i.scdn.co/image/ab6761610000f1784111c95b5f430c3265c7304b',
									height: 160,
									width: 160
								}
							],
							name: 'Joji',
							popularity: 79,
							type: 'artist',
							uri: 'spotify:artist:3MZsBdqDrRTJihTHQrO6Dq'
						}
					]
				}
			})
		);
	}),
	rest.post('*', (req, res, ctx) => {
		console.error(`Please add request handler for ${req.url.toString()}`);
		return res(ctx.status(500), ctx.json({ error: 'Please add request handler' }));
	})
);

export { server };
