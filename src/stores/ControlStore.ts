import { writable } from 'svelte/store';

type ControlStoreData = {
	currentSongId: string | undefined;
};

const initialData: ControlStoreData = {
	currentSongId: undefined
};

export const ControlStore = writable<ControlStoreData>(initialData);

export default ControlStore;
