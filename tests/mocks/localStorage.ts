export const localStorageMock: Storage = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	length: 0,
	clear: jest.fn(),
	key: jest.fn(),
	removeItem: jest.fn()
};
export const setItemSpy = jest.spyOn(localStorageMock, 'setItem');
export const getItemSpy = jest.spyOn(localStorageMock, 'getItem');

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
