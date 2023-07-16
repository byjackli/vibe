import type { SongDetails } from 'src/types/Details';
import type { Song, Artist } from 'src/api/spotify/types';

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
		const songArray = responseData.items;
		const songList: SongDetails[] = [];
		const artists: string[] = responseData.artists.map((artist: Artist) => artist.name);
		songArray.array.forEach((song: Song) => {
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
