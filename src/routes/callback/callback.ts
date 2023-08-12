export function retrieveCode() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const code = urlParams.get('code');
	return code;
}

export async function setUserData(userData: UserData) {
	try {
		const storedValueString: string | null = localStorage.getItem('ViBE');
		if (storedValueString) {
			const storedValue = JSON.parse(storedValueString);
			storedValue.display_name = userData.display_name;
			storedValue.user_id = userData.id;
			localStorage.setItem('ViBE', JSON.stringify(storedValue));
		}
	} catch (error) {
		console.error('error: ', error);
	}
}

export interface UserData {
	country: string;
	display_name: string;
	email: string;
	explicit_content: {
		filter_enabled: boolean;
		filter_locked: boolean;
	};
	external_urls: {
		spotify: string;
	};
	followers: {
		href: string;
		total: number;
	};
	href: string;
	id: string;
	images: {
		url: string;
		height: number;
		width: number;
	}[];
	product: string;
	type: string;
	uri: string;
}
