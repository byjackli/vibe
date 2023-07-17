import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
	rest.get('https://accounts.spotify.com/authorize', (req, res, ctx) => {
		const requiredParams = [
			'client_id',
			'response_type',
			'redirect_uri',
			'scope',
			'code_challenge_method',
			'code_challenge',
			'state'
		];
		const missingParams = requiredParams.filter((param) => !req.url.searchParams.get(param));
		if (missingParams.length > 0) {
			return res(ctx.json({ status: 400 }));
		}
		return res(ctx.json({ status: 200 }));
	}),
	rest.post('https://accounts.spotify.com/api/token', async (req, res, ctx) => {
		const body = await req.json();
		const params = new URLSearchParams(body);
		const requiredParams = ['grant_type', 'code', 'redirect_uri', 'client_id', 'code_verifier'];
		const missingParams = requiredParams.filter((param) => !params.has(param));
		if (missingParams.length > 0) {
			return res(ctx.status(400));
		}
		return res(
			ctx.status(200),
			ctx.json({
				access_token: 'mockAccessToken',
				refresh_token: 'mockRefreshToken'
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
	})
);

export { server };