<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0" />

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { construct_svelte_component } from 'svelte/internal';
	import ControlStore from '../stores/ControlStore';
	
	// context vs store;
	// can only play one song at a time; player controls was extracted
	const dispatch = createEventDispatcher();	
	export let songid: string; // required to make modifications to songid (ie add to playlist and more)
	export let audio: HTMLAudioElement;       //is audio track for song, is an HTML Audio Element
	export let added: boolean; //whether or not song is added to playlist
	export let liked: boolean; //whether or not song is favorited
	export let position: number;
	let status = {
		PLAY: 'PLAY',
		PAUSE: 'PAUSE'
	};
	let currStatus = status.PAUSE;

	//on currentSongId value change
	if ($ControlStore.currentSongId != songid) {
		//trackPosition = audio.currentTime //in seconds
		currStatus = status.PAUSE;
	} else {
		//audio.load()
		if (currStatus == status.PLAY) currStatus = status.PAUSE;
		else currStatus = status.PLAY;
	}
	
	function handleAddSong() {
		added = !added;
	}
	function handleLikeSong() {
		liked = !liked;
	}
	function togglePlay(){
		if(currStatus === status.PLAY){
			currStatus = status.PAUSE;
			audio.pause();
			position = Math.round(audio.currentTime);
		}
		else{
			currStatus = status.PLAY;
			audio.currentTime = position;
			audio.play();
			setInterval(() => {
				position = Math.round(audio.currentTime);
				if(position >= audio.duration){
					currStatus = status.PAUSE;
					position = 0;
				}
			}, 500);
		}
	}
	function seek(event:any){
		audio.currentTime = event.target.value;
	}
</script>

<div class= "controls">
	<div class="controlButtons">
		<button class="playPause" on:click|stopPropagation={togglePlay}>
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
