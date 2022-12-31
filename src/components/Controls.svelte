<script lang="ts">
	import ControlStore from '../stores/ControlStore';
	// context vs store;
	// can only play one song at a time; player controls was extracted

	export let songid: string; // required to make modifications to songid (ie add to playlist and more)
	export let expanded: boolean; // true: card is expanded false: card is collapsed
	//export let audio: Audio       is audio track for song, is an HTML Audio Element
	let status = {
		PLAY: 'PLAY',
		PAUSE: 'PAUSE'
	};
	let currStatus = status.PAUSE;
	let trackPosition = 0;
	//on expanded value change
	if (expanded == false) {
		trackPosition = 0;
		currStatus = status.PAUSE;
	}

	//on currentSongId value change
	if ($ControlStore.currentSongId != songid) {
		//trackPosition = audio.currentTime //in seconds
		currStatus = status.PAUSE;
	} else {
		//audio.load()
		if (currStatus == status.PLAY) currStatus = status.PAUSE;
		else currStatus = status.PLAY;
	}

	//on currStatus value change
	// if(currStatus == status.PLAY){
	// 	audio.load()  might not need
	//  audio.currentTime = trackPosition
	// 	audio.play()
	// }
	// else{
	// 	audio.pause()
	//  trackPosition = audio.currentTime
	// }

	function handleAddSong() {
		console.log('added');
	}
	function handleLikeSong() {
		console.log('liked');
	}
</script>

<div class="controls">
	<div>
		<button
			><span class="material-icons"
				>{currStatus === status.PLAY ? 'play_arrow' : 'pause'}</span
			></button
		>
	</div>
	<div>
		<button on:keyup={handleLikeSong}
			><span class="material-icons">thumb_up</span></button
		>
		<button on:keyup={handleAddSong}>add to playlist</button>
	</div>
</div>
