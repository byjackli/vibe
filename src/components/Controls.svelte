<script lang="ts">
	import { onDestroy } from 'svelte';
	export let songid: string; // required to make modifications to songid (ie add to playlist and more)
	export let audio: HTMLAudioElement; //is audio track for song, is an HTML Audio Element
	export let added: boolean; //whether or not song is added to playlist
	export let liked: boolean; //whether or not song is favorited
	export let position: number;
	export let savedPosition: number;
	let duration = 30;
	$: progressBarStyle = `width: ${(position / duration) * 100}%;`;
	$: progressThumbStyle = `left: ${(position / duration) * 100}%;`;

	let updatePosition = setInterval(() => {
		position = Math.max(savedPosition, Math.round(audio.currentTime));
		savedPosition = position;
		if (position >= audio.duration) {
			currStatus = status.PAUSE;
			position = 0;
			savedPosition = 0;
		}
	}, 500);

	const status = {
		PLAY: 'play',
		PAUSE: 'pause'
	} as const;
	let currStatus = 'pause';

	function handleAddSong() {
		added = !added;
	}
	function handleLikeSong() {
		liked = !liked;
	}
	function setPause() {
		currStatus = status.PAUSE;
		audio.pause();
		position = Math.round(audio.currentTime);
	}
	function setPlay() {
		currStatus = status.PLAY;
		audio.currentTime = position;
		audio.play();
	}
	function toggleAudio() {
		if (currStatus === status.PLAY) setPause();
		else setPlay();
	}
	function seek(event: MouseEvent | TouchEvent) {
		const progressBarContainer = event.target as HTMLElement;
		let startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
		let startWidth =
			(startX - progressBarContainer.getBoundingClientRect().left) /
				progressBarContainer.offsetWidth || 0;
		let newTime =
			((startX - progressBarContainer.getBoundingClientRect().left) /
				progressBarContainer.offsetWidth) *
			duration;

		if (event instanceof MouseEvent) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		} else if (event instanceof TouchEvent) {
			document.addEventListener('touchmove', handleTouchMove);
			document.addEventListener('touchend', handleTouchEnd);
		}

		function handleMouseMove(event: MouseEvent) {
			const deltaX = event.clientX - startX;
			newTime = Math.round(
				Math.min(1, Math.max(0, startWidth + deltaX / progressBarContainer.offsetWidth)) * 30
			);
			audio.currentTime = newTime;
			position = newTime;
			savedPosition = newTime;
		}

		function handleTouchMove(event: TouchEvent) {
			const touch = event.touches[0];
			const deltaX = touch.clientX - startX;
			newTime = Math.round(
				Math.min(1, Math.max(0, startWidth + deltaX / progressBarContainer.offsetWidth)) * 30
			);
			audio.currentTime = newTime;
			position = newTime;
			savedPosition = newTime;
		}

		function handleMouseUp() {
			audio.currentTime = newTime;
			position = newTime;
			savedPosition = newTime;
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		}

		function handleTouchEnd() {
			audio.currentTime = newTime;
			position = newTime;
			savedPosition = newTime;
			document.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('touchend', handleTouchEnd);
		}
	}

	function doNothing() {
		return;
	}

	onDestroy(() => {
		setPause();
		clearInterval(updatePosition);
	});
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0"
/>

<div class="controls">
	<div class="controlButtons">
		{#if audio.src !== ''}
			<button class="playPause" on:click|stopPropagation={toggleAudio}>
				<span class="material-icons">
					{currStatus === status.PLAY ? 'pause' : 'play_arrow'}
				</span>
			</button>
			<div
				class="trackPlaceholder"
				on:mousedown|stopPropagation|preventDefault={seek}
				on:touchstart|stopPropagation|preventDefault={seek}
				on:click|stopPropagation={doNothing}
				on:keypress|stopPropagation={doNothing}
			>
				<div class="progressBarContainer">
					<div class="progressBar" style={progressBarStyle} />
				</div>
				<div class="progressThumb" style={progressThumbStyle} />
			</div>
		{:else}
			<div class="noAudioText">Preview not available</div>
		{/if}

		<button class="likeButton" on:click|stopPropagation={handleLikeSong}>
			<span class={!liked ? 'material-symbols-outlined' : 'material-icons'}>favorite</span>
		</button>
		<button class="addButton" on:click|stopPropagation={handleAddSong}>
			<span class="material-icons">{added ? 'playlist_remove' : 'playlist_add'}</span>
		</button>
	</div>
</div>
