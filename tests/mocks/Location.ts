interface LocationMock {
	href: string;
	assign: jest.Mock;
	replace: jest.Mock;
	reload: jest.Mock;
}

export const locationMock: LocationMock = {
	href: '',
	assign: jest.fn(),
	replace: jest.fn(),
	reload: jest.fn()
};

export const replaceSpy = jest.spyOn(locationMock, 'replace');
