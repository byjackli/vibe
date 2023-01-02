<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let state: 'recent' | 'result', type: 'artist' | 'song', content: string;

	let button: HTMLElement | undefined = undefined,
		text: HTMLElement | undefined = undefined,
		textContainer: HTMLElement | undefined = undefined;
	const icon = type === 'artist' ? 'mic_external_on' : 'music_note';
	$: tooLong = false;

	type ButtonDetails = {
		textContainerWidth: number;
		textWidth: number;
		gapWidth: number;
		tooLong: boolean;
	};

	// case where focus-within is true and mouseenter happens
	// then mouseleave is triggered, scroll class will be removed
	let isActive = 0;
	function ignoreMouseClicks(event?: FocusEvent): boolean {
		return event?.relatedTarget === null;
	}

	function addScroll(event?: FocusEvent): void {
		if (!text || ignoreMouseClicks(event)) return;
		isActive++;
		text.classList.add('scroll');
	}
	function removeScroll(): void {
		if (!text || !isActive) return;
		isActive--;
		if (isActive) return;
		text.classList.remove('scroll');
	}

	function calcWidth(): ButtonDetails | undefined {
		if (!text || !textContainer) return;
		const textWidth = text.getBoundingClientRect().width,
			textContainerWidth = textContainer.getBoundingClientRect().width,
			gapWidth = Number.parseFloat(getComputedStyle(text).gap);

		return {
			textContainerWidth,
			textWidth,
			gapWidth,
			tooLong: textContainerWidth < textWidth
		};
	}
	function calcDuration(textWidth: number, gapWidth: number): string {
		const track = textWidth * 2 + gapWidth;
		return `${track / 100}s`;
	}
	function setupScroll(buttonDetails: ButtonDetails): void {
		if (!button || !text) return;
		const { textWidth, gapWidth } = buttonDetails,
			duration = calcDuration(textWidth, gapWidth);

		button.addEventListener('mouseenter', addScroll);
		button.addEventListener('mouseleave', removeScroll);
		button.addEventListener('focus', (event) => addScroll(event));
		button.addEventListener('blur', removeScroll);
		button.classList.add('too-long');
		text.style.animationDuration = duration;
	}
	function cleanupScroll(): void {
		if (!button) return;
		button.removeEventListener('mouseenter', addScroll);
		button.removeEventListener('mouseleave', removeScroll);
		button.removeEventListener('focus', addScroll);
		button.removeEventListener('blur', removeScroll);
	}
	onMount(() => {
		const buttonDetails = calcWidth();
		if (buttonDetails) {
			tooLong = buttonDetails.tooLong;
			if (tooLong) setupScroll(buttonDetails);
		}
	});
	onDestroy(cleanupScroll);
</script>

<button bind:this={button} class={state} aria-label={content}>
	<span class="material-icons" aria-hidden="true">{icon}</span>
	<div class="textContainer" bind:this={textContainer}>
		<span class="text" bind:this={text} title={content}
			>{content}{#if tooLong}<span aria-hidden="true">{`${content}`}</span>{/if}</span
		>
	</div>
</button>
