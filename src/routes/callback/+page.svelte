<script lang="ts">
	import { onMount } from 'svelte';
	import { retrieveCode } from './callback';
	import { exchangeToken, url } from '../../api/spotify/auth';

	onMount(async () => {
		const code = retrieveCode() as string;
		await exchangeToken(code);
		window.location.replace(`${url}`);
	});
</script>
