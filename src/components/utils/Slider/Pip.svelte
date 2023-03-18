<script lang="ts">
    import type { PipOptions } from './Slider';
    export let options: PipOptions;
</script>

<div
    id="{options.id}"
    role="slider"
    aria-valuemin="{options.values.min}"
    aria-valuemax="{options.values.max}"
    aria-valuenow="{options.values.now}"
    aria-label="{options.label}"
    tabIndex="0"
    on:keydown="{undefined}"
    on:focus="{undefined}"
    on:blur="{undefined}"
>
    {#if options.labelState === undefined || options.labelState}
        <span class="pip-label">{options.label}</span>
    {/if}
    <slot name="background">
        <div></div>
    </slot>
</div>
