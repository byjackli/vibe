<script lang="ts">
	import { onMount } from 'svelte';
	import type { SongDetails } from '../types/Details';
	import Controls from './Controls.svelte';
	import ControlStore from '../stores/ControlStore';
	export let songDetails: SongDetails;
	$: expand = $ControlStore.currentSongId === songDetails.songid;
	let trackPosition = 0;
	let savedPosition = 0;
	let liked = false;
	let added = false;
	let audio: HTMLAudioElement;

	onMount(() => {
		if (songDetails.previewAudio) {
			audio = new Audio(songDetails.previewAudio);
		} else {
			audio = new Audio();
		}
	});
	function renderArtists(): string {
		const { artists } = songDetails;
		let artistsOneline = '';

		if (artists.length < 2) return artists[0];

		const isLast = (index: number) => index + 1 < artists.length;
		artists.forEach((artist, index) => (artistsOneline += isLast(index) ? `${artist}, ` : artist));

		return artistsOneline;
	}
	function toggleExpand(): void {
		if ($ControlStore.currentSongId === songDetails.songid) {
			$ControlStore.currentSongId = undefined;
		} else {
			$ControlStore.currentSongId = songDetails.songid;
		}
		savedPosition = trackPosition;
		expand = !expand;
	}
</script>

<!-- todo: test below with tapping on touchscreen -->
<div class="card" on:click={toggleExpand} on:keydown={toggleExpand} aria-expanded={expand}>
	<div class="songDetails">
		<div class="imageWrapper">
			<img src={songDetails.image} alt={`cover for ${songDetails.title}`} />
		</div>
		<div>
			<p class="title">{songDetails.title}</p>
			<p class="artists">{renderArtists()}</p>
		</div>
	</div>
	{#if expand}
		<Controls
			songid={songDetails.songid}
			{audio}
			{savedPosition}
			bind:liked
			bind:added
			bind:position={trackPosition}
		/>
	{/if}
</div>
