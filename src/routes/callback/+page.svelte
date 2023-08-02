<script lang="ts">
	import { onMount } from 'svelte';
	import { retrieveCode } from './callbackCode';
	import { exchangeToken } from '../../api/spotify/auth';

	onMount(async () => {
		const code = retrieveCode() as string;
		await exchangeToken(code);
		window.location.replace('http://127.0.0.1:5173/');
	});
</script>
