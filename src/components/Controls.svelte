<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0" />

<script lang="ts">
	import ControlStore from '../stores/ControlStore';
	import { onDestroy } from 'svelte';

	// context vs store;
	// can only play one song at a time; player controls was extracted
	export let songid: string; // required to make modifications to songid (ie add to playlist and more)
	export let audio: HTMLAudioElement; //is audio track for song, is an HTML Audio Element
	export let added: boolean; //whether or not song is added to playlist
	export let liked: boolean; //whether or not song is favorited
	export let position: number;
	export let savedPosition : number;

	let updatePosition = setInterval(() => {
		position = Math.max(savedPosition, Math.round(audio.currentTime));
		console.log(position)
		if(position >= audio.duration){
			currStatus = status.PAUSE;
			position = 0;
		}
	}, 500);

	const status = {
		PLAY: 'play',
		PAUSE: 'pause'
	} as const;
	let currStatus = 'pause';

	if ($ControlStore.currentSongId !== songid) {
		setPause()
	} else {
		//audio.load()
		if (currStatus === status.PLAY) currStatus = status.PAUSE;
		else currStatus = status.PLAY;
	}
	
	function handleAddSong() {
		added = !added;
	}
	function handleLikeSong() {
		liked = !liked;
	}
	function setPause(){
		currStatus = status.PAUSE;
		audio.pause();
		position = Math.round(audio.currentTime);
	}
	function setPlay(){
		currStatus = status.PLAY;
		audio.currentTime = position;
		audio.play();
	}
	function toggleAudio(){
		if(currStatus === status.PLAY)
			setPause()
		else
			setPlay()
	}
	function seek(event:any){
		position = event.target.value;
		audio.currentTime = position;
	}
	onDestroy(() => clearInterval(updatePosition))
</script>

<div class= "controls">
	<div class="controlButtons">
		<button class="playPause" on:click|stopPropagation={toggleAudio}>
			<span class="material-icons">
				{currStatus === status.PLAY ? 'pause' : 'play_arrow'}
			</span>
		</button>
		<input type="range" max=30 value={position} class="trackPlaceholder" on:click|stopPropagation|self={seek}/>
		<button on:click|stopPropagation={handleLikeSong}>
			<span class={!liked ? "material-symbols-outlined" : "material-icons"}>favorite</span>
		</button>
		<button on:click|stopPropagation={handleAddSong}>
			<span class="material-icons">{added ? 'playlist_remove' : 'playlist_add'}</span>
		</button>
	</div>
</div>
