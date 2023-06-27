import { expect, test } from '@playwright/test';
import '@testing-library/jest-dom/extend-expect';

import { getUserData, getSongs, search } from '../src/api/spotify.ts';

test.describe('SpotifyFn', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});
	test('getUserData', () => {
		jest.spyOn(XMLHttpRequest.prototype, 'open').mockImplementation();
		jest.spyOn(XMLHttpRequest.prototype, 'setRequestHeader').mockImplementation();
		jest.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation();
		jest
			.spyOn(JSON, 'parse')
			.mockReturnValueOnce({ display_name: 'mockDisplayName', id: 'mockUserId' });
		const setItemMock = jest.spyOn(localStorage, 'setItem').mockImplementation();

		jest.spyOn(localStorage, 'getItem').mockReturnValueOnce('mockAccessToken');

		getUserData();

		expect(setItemMock).toHaveBeenCalledTimes(2);
		expect(setItemMock).toHaveBeenCalledWith('display_name', 'mockDisplayName');
		expect(setItemMock).toHaveBeenCalledWith('user_id', 'mockUserId');

		setItemMock.mockRestore();
	});
	test('getSongs', () => {});

	test('should return an array of SongDetails with the expected structure', () => {
		// Mock the necessary functions and objects
		jest.spyOn(XMLHttpRequest.prototype, 'open').mockImplementation();
		jest.spyOn(XMLHttpRequest.prototype, 'setRequestHeader').mockImplementation();
		jest.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation();
		jest.spyOn(JSON, 'parse').mockReturnValueOnce({
			items: [
				{
					id: 'mockSongId',
					name: 'mockSongName',
					album: { images: [{ url: 'mockImageUrl' }] },
					preview_url: 'mockPreviewUrl'
				}
			],
			artists: [{ name: 'mockArtistName' }]
		});

		jest.spyOn(localStorage, 'getItem').mockReturnValueOnce('mockAccessToken');

		const result = getSongs('mockParams');

		expect(Array.isArray(result)).toBe(true);
		expect(result.length).toBe(1);
		expect(result[0]).toEqual({
			songid: 'mockSongId',
			title: 'mockSongName',
			artists: ['mockArtistName'],
			image: 'mockImageUrl',
			previewAudio: 'mockPreviewUrl'
		});

		XMLHttpRequest.prototype.open.mockRestore();
		XMLHttpRequest.prototype.setRequestHeader.mockRestore();
		XMLHttpRequest.prototype.send.mockRestore();
		JSON.parse.mockRestore();
		localStorage.getItem.mockRestore();
	});

	test('should return an array of SearchDetails with the expected structure', () => {
		jest.spyOn(XMLHttpRequest.prototype, 'open').mockImplementation();
		jest.spyOn(XMLHttpRequest.prototype, 'setRequestHeader').mockImplementation();
		jest.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation();
		jest.spyOn(JSON, 'parse').mockReturnValueOnce({
			tracks: {
				items: [
					{ type: 'track', name: 'Track 1' },
					{ type: 'track', name: 'Track 2' }
				]
			},
			artists: {
				items: [
					{ type: 'artist', name: 'Artist 1' },
					{ type: 'artist', name: 'Artist 2' }
				]
			}
		});
		jest.spyOn(localStorage, 'getItem').mockReturnValueOnce('mockAccessToken');

		const result = search('mockInput', 4);

		expect(Array.isArray(result)).toBe(true);
		expect(result.length).toBe(4);
		expect(result[0]).toEqual({ type: 'track', data: { type: 'track', name: 'Track 1' } });
		expect(result[1]).toEqual({ type: 'track', data: { type: 'track', name: 'Track 2' } });
		expect(result[2]).toEqual({ type: 'artist', data: { type: 'artist', name: 'Artist 1' } });
		expect(result[3]).toEqual({ type: 'artist', data: { type: 'artist', name: 'Artist 2' } });

		XMLHttpRequest.prototype.open.mockRestore();
		XMLHttpRequest.prototype.setRequestHeader.mockRestore();
		XMLHttpRequest.prototype.send.mockRestore();
		JSON.parse.mockRestore();
		localStorage.getItem.mockRestore();
	});
});
