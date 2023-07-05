type Trait =
	| 'popularity'
	| 'energy'
	| 'liveness'
	| 'loudness'
	| 'valence'
	| 'tempo'
	| 'speechiness'
	| 'acousticness'
	| 'danceability'
	| 'instrumentalness';

export type TraitDetails = {
	trait: Trait;
	values: { min: number; max: number };
	enabled: boolean;
};
