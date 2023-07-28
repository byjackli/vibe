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
