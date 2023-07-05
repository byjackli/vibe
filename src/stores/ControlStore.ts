import { writable } from 'svelte/store';
let currentSongId = undefined;

export const ControlStore = writable({ currentSongId });

export function updateCurrentSong(newSongId: string): void {
	currentSongId = newSongId;
}

export default ControlStore;
