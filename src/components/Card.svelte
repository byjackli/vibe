<script lang="ts">
	import type { SongDetails } from '../types/Details';
	import Controls from './Controls.svelte';
	export let songDetails: SongDetails,
		expand = false;

	function renderArtists(): string {
		const { artists } = songDetails;
		let artistsOneline = '';

		if (artists.length < 2) return artists[0];

		const isLast = (index: number) => index + 1 < artists.length;
		artists.forEach((artist, index) => (artistsOneline += isLast(index) ? artist : `${artist}, `));

		return artistsOneline;
	}
	function toggleExpand():void{
		expand = !expand
	}
</script>

<div class="card" on:keyup={toggleExpand}>
	<div>
		<div class="imageWrapper">
			<img src={songDetails.image} alt={`cover for ${songDetails.title}`} />
		</div>
		<div class="">
			<p>{songDetails.title}</p>
			<p>{renderArtists()}</p>
		</div>
	</div>
	{#if expand}
		<Controls songid={songDetails.songid} expanded={expand}/>
	{/if}
</div>

