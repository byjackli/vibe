<script lang="ts">
	import { onMount } from 'svelte';
	import { getSongs } from '../../api/spotify/service';
	import Card from '../../components/Card.svelte';
	import Default from '../../views/Default.svelte';
	import type { SongDetails } from '../../types/Details';

	let cards: SongDetails[] = [];
	onMount(async () => {
		const defaultParams = new URLSearchParams({
			seed_artists: '',
			seed_tracks: '',
			seed_genres: 'hip-hop',
			limit: '100',
			market: 'US'
		});
		const response = await getSongs(defaultParams);
		cards = response;
	});
</script>

<Default>
	<div class="home-container">
		<div class="card-grid">
			{#each cards as card}
				<Card songDetails={card} />
			{/each}
		</div>
		<div class="filter-container" />
	</div>
</Default>

<style>
	.home-container {
		margin: 0 8rem;
		display: grid;
		grid-template-columns: 70% 30%;
	}
	.card-grid {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		max-height: 35rem;
		overflow-y: scroll;
	}
	.card-grid::-webkit-scrollbar {
		width: 0;
		display: none;
	}
</style>
