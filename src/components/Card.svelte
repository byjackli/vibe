<script lang="ts">
	import { onMount } from 'svelte';
	import type { SongDetails } from '../types/Details';
	import Controls from './Controls.svelte';
	export let songDetails: SongDetails,
	expand = false;
	let trackPosition = 0;
	let liked = false;
	let added = false;
	let audio: HTMLAudioElement;

	//temp audio for testing
	onMount(() => {
		audio = new Audio("https://p.scdn.co/mp3-preview/ce4a01f9dc6091951d0a94b640b625b46e0efbd2?cid=774b29d4f13844c495f206cafdad9c86");
  	});
	function renderArtists(): string {
		const { artists } = songDetails;
		let artistsOneline = '';

		if (artists.length < 2) return artists[0];

		const isLast = (index: number) => index + 1 < artists.length;
		artists.forEach((artist, index) => (artistsOneline += isLast(index) ? artist : `${artist}, `));

		return artistsOneline;
	}
	//when collapsed, pause audio and set expand indicator to false
	function toggleExpand():void{
		if(expand){
			audio.pause();
		}
		expand = !expand
	}
</script>

<div class="card" on:click={toggleExpand} on:keyup={toggleExpand} aria-expanded={expand}>
	<div class="songDetails">
		<div class="imageWrapper">
			<img src={songDetails.image} alt={`cover for ${songDetails.title}`} />
		</div>
		<div>
			<p class="title">{songDetails.title}</p>
			<p class="artists">{renderArtists()}</p>
		</div>
		<!-- <div style="color: red">{trackPosition}</div> -->
	</div>
	{#if expand}
		<Controls songid={songDetails.songid} audio={audio} bind:liked={liked} bind:added={added} bind:position={trackPosition}/>
	{/if}
</div>

