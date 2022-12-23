<script lang="ts">
	// context vs store;
	// can only play one song at a time; player controls was extracted
	import type { TraitDetails } from '../types/TraitDetails';

	export let traitDetails: TraitDetails;
</script>

<div class={`trait ${traitDetails.enabled}`}>
	<div>
		<div>checkbox</div>
		<div>{traitDetails.trait}</div>
	</div>
	<div class="slider" aria-hidden={!traitDetails.enabled}>
		<div>left handle</div>
		<div>right handle</div>
		<div aria-hidden="true">line</div>
		<div class="for-aria" aria-atomic="true" aria-live="assertive">
			{traitDetails.trait}. min: {traitDetails.values.min}, max: {traitDetails.values.max}
		</div>
	</div>
</div>
