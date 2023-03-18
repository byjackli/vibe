<script lang="ts">
	// context vs store;
	// can only play one song at a time; player controls was extracted

	export let songid: string; // required to make modifications to songid (ie add to playlist and more)
</script>

<div class="controls">
	<div>
		<button>play</button>
	</div>
	<div>
		<button>like</button>
		<button>add to playlist</button>
	</div>
</div>
