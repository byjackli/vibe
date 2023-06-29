import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
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
	rest.get('https://api.spotify.com/v1/recommendations?', (req, res, ctx) => {
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
	rest.get('https://api.spotify.com/v1/search?', (req, res, ctx) => {
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
				albums: {
					href: 'https://api.spotify.com/v1/search?query=joji&type=album&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=1',
					limit: 1,
					next: 'https://api.spotify.com/v1/search?query=joji&type=album&locale=en-US%2Cen%3Bq%3D0.9&offset=1&limit=1',
					offset: 0,
					previous: null,
					total: 19,
					items: [
						{
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
					]
				}
			})
		);
	})
);

export { server };
