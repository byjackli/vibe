<script lang="ts">
    import { onMount } from 'svelte';
    import type { PipOptions, SliderOptions } from './Slider';
    import Pip from './Pip.svelte';
    import { sliderAdd } from './SliderStore';

    export let pips: PipOptions[], options: SliderOptions;

    function isHidden(): boolean {
        return true;
    }

    onMount(() => {
        sliderAdd(options, pips);
    });
</script>

<div
    class="slider-container"
    on:touchstart="{undefined}"
    on:touchend="{undefined}"
    on:mouseup="{undefined}"
    on:mousedown="{undefined}"
>
    {#if pips.length === 1}
        <Pip options="{pips[0]}" />
    {:else}
        {#each pips as pip}
            <Pip options="{pip}" />
        {/each}
    {/if}
    <slot name="background">
        <div></div>
    </slot>
</div>
