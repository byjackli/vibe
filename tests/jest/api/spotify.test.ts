import { server } from '../../mocks/browser';
import { getUserData, getSongs, search } from '../../../src/api/spotify/service';
import { localStorageMock, setItemSpy, getItemSpy } from '../../mocks/localStorage';

const originalLocation = window;

beforeAll(() => {
	server.listen();
	Object.defineProperty(window, 'localStorage', {
		value: localStorageMock,
		configurable: true
	});
});

beforeEach(() => {
	getItemSpy.mockImplementation((key) => {
		if (key === 'code_verifier') {
			return 'mockVerifier';
		}
		if (key === 'ViBE') {
			return JSON.stringify({
				access_token: 'mockAccessToken',
				refresh_token: 'mockRefreshToken',
				display_name: 'mockDisplayName',
				user_id: 'mockUserId'
			});
		}
		return null;
	});
	setItemSpy.mockImplementation();
});

afterAll(() => {
	server.close();
	Object.defineProperty(globalThis, 'window', {
		value: originalLocation
	});
});

afterEach(() => {
	server.resetHandlers();
	jest.restoreAllMocks();
});

describe('spotify endpoint tests', () => {
	it('getUserData', async () => {
		const result = await getUserData();
		expect(result).toEqual({
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
		});
	});
	it('getSongs', async () => {
		const params = new URLSearchParams({
			mock: 'mockParams'
		});
		const result = await getSongs(params);
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
	it('search', async () => {
		const params = new URLSearchParams({
			mock: 'mockParams'
		});
		const result = await search(params.toString(), 1);
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
