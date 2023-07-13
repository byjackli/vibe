export function getUserData() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `https://api.spotify.com/v1/me`, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
	xhr.send(null);
	xhr.onload = () => {
		const responseData = JSON.parse(xhr.responseText);
		const data = JSON.stringify({
			display_name: `${responseData.display_name}`,
			user_id: `${responseData.id}`
		});
		return data;
	};
}
