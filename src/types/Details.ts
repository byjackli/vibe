export type SongDetails = {
	songid: string;
	title: string;
	artists: string[];
	image: string;
	previewAudio: string;
};

export type CardDetails = {
	songDetails: SongDetails;
	trackPosition: number;
};

export type SearchDetails = {
	type: string;
	data: any;
};
