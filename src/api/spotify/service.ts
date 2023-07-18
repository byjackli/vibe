import type { SongDetails, SearchDetails, ArtistDetails } from 'src/types/Details';
import type { Song, Artist, LocalStorage } from 'src/api/spotify/types';

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

export function getSongs(params: string) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `https://api.spotify.com/v1/recommendations?${params}`, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
	xhr.send(null);
	xhr.onload = () => {
		const responseData = JSON.parse(xhr.responseText);
		const songArray = responseData.tracks;
		const songList: SongDetails[] = [];
		songArray.forEach((song: Song) => {
			const artists: string[] = song.artists.map((artist: Artist) => artist.name);
			const newSong: SongDetails = {
				songid: `${song.id}`,
				title: `${song.name}`,
				artists: artists,
				image: song.album.images[0].url,
				previewAudio: `${song.preview_url ? song.preview_url : null}`
			};
			songList.push(newSong);
		});
		return songList;
	};
}

export function search(input: string, limit: number) {
	const storedObj = localStorage.getItem('ViBE');
	if (storedObj) {
		const obj: LocalStorage = JSON.parse(storedObj);
		const accessToken = obj.access_token;
		const typeList: string[] = ['artist', 'track'];
		const params = new URLSearchParams({
			q: `${input}`,
			type: `${typeList}`,
			limit: `${limit}`
		});
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.spotify.com/v1/search?' + params, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
		xhr.send(null);
		xhr.onload = () => {
			const responseData = JSON.parse(xhr.responseText);
			const songArray = responseData.tracks.items;
			const artistArray = responseData.artists.items;
			const searchList: SearchDetails[] = [];
			songArray.array.forEach((song: Song) => {
				const artists: string[] = song.artists.map((artist: Artist) => artist.name);
				const newSong: SongDetails = {
					songid: `${song.id}`,
					title: `${song.name}`,
					artists: artists,
					image: song.album.images[0].url,
					previewAudio: `${song.preview_url ? song.preview_url : null}`
				};
				const newSearch: SearchDetails = {
					type: `${song.type}`,
					data: newSong
				};
				searchList.push(newSearch);
			});
			artistArray.array.forEach((artist: Artist) => {
				const newArtist: ArtistDetails = {
					artistid: `${artist.id}`,
					name: `${artist.name}`,
					image: `${artist.images[0].url}`
				};
				const newSearch: SearchDetails = {
					type: `${artist.type}`,
					data: newArtist
				};
				searchList.push(newSearch);
			});
			return searchList;
		};
	}
}
