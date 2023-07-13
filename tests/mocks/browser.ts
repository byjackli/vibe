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
	})
);

export { server };
