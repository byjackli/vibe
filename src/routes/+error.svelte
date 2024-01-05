<script lang="ts">
	import { page } from '$app/stores';
	import Default from '../views/Default.svelte';
</script>

<svelte:head>
	<title>Error {$page.status} - ViBE</title>
</svelte:head>

<Default>
	<h1>{$page.status} {$page.error?.message}</h1>
</Default>
