<script lang="ts">
	export let filter: string;
	let minValue = 0;
	let maxValue = 100;
	let selected = false;

	function updateMinValue(event: Event): void {
		const target = event.target as HTMLInputElement;
		let newValue = Number(target.value);
		if (newValue <= maxValue - 5) {
			minValue = newValue;
		} else {
			minValue = maxValue - 5;
		}
	}
	function updateMaxValue(event: Event): void {
		const target = event.target as HTMLInputElement;
		let newValue = Number(target.value);
		if (newValue >= minValue + 5) {
			maxValue = newValue;
		} else {
			maxValue = minValue + 5;
		}
	}
	function toggleSelected() {
		selected = !selected;
	}
</script>

<div class="range">
	<div class="rangeName">
		<input
			type="checkbox"
			id={filter}
			class="rangeCheckbox material-icons"
			on:change={toggleSelected}
			checked={selected}
		/>
		<label for={filter}>{filter}</label>
	</div>
	<div class="rangeControls">
		<div class="range-slider" />
		<div class="range-input">
			<input
				type="range"
				class="minSlider"
				min="0"
				max="100"
				bind:value={minValue}
				on:input|stopPropagation|self={updateMinValue}
				step="5"
			/>
			<input
				type="range"
				class="maxSlider"
				min="0"
				max="100"
				bind:value={maxValue}
				on:input|stopPropagation|self={updateMaxValue}
				step="5"
			/>
		</div>
		<div class="rangeValues">
			<span>{minValue}</span><span>{maxValue}</span>
		</div>
	</div>
</div>
