import type { SongDetails, SearchDetails } from 'src/types/Details';

export function getUserData() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `https://api.spotify.com/v1/me`, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
	xhr.send(null);
	xhr.onload = () => {
		const responseData = JSON.parse(xhr.responseText);
		localStorage.setItem('display_name', responseData.display_name);
		localStorage.setItem('user_id', responseData.id);
	};
}

export function getSongs(params: string) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `https://api.spotify.com/v1/recommendations?${params}`, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
	xhr.send(null);
	xhr.onload = () => {
		const responseData = JSON.parse(xhr.responseText);
		const songArray = responseData.items;
		const songList: SongDetails[] = [];
		const artists: string[] = responseData.artists.map((artist: any) => artist.name);
		songArray.array.forEach((song: any) => {
			const newSong: SongDetails = {
				songid: `${song.id}`,
				title: `${song.name}`,
				artists: artists,
				image: song.album.images[0],
				previewAudio: `${song.preview_url ? song.preview_url : null}`
			};
			songList.push(newSong);
		});
		return songList;
	};
}

export function search(input: string, limit: number) {
	let typeList: string[] = ['artist', 'track'];
	const params = new URLSearchParams({
		q: `${input}`,
		type: `${typeList}`,
		limit: `${limit}`
	});
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://api.spotify.com/v1/search?' + params, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
	xhr.send(null);
	xhr.onload = () => {
		const responseData = JSON.parse(xhr.responseText);
		const songArray = responseData.tracks;
		const artistArray = responseData.artists;
		const searchList: SearchDetails[] = [];
		songArray.array.forEach((song: any) => {
			const newSearch: SearchDetails = {
				type: `${song.type}`,
				data: song
			};
			searchList.push(newSearch);
		});
		artistArray.array.forEach((artist: any) => {
			const newSearch: SearchDetails = {
				type: `${artist.type}`,
				data: artist
			};
			searchList.push(newSearch);
		});
        return searchList;
	};
}
