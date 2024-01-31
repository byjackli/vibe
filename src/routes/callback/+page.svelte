<script lang="ts">
	import { onMount } from 'svelte';
	import { retrieveCode, setUserData, type UserData } from './callback';
	import { exchangeToken, url } from '../../api/spotify/auth';
	import { getUserData } from '../../api/spotify/service';

	onMount(async () => {
		const code = retrieveCode() as string;
		await exchangeToken(code);
		const userData: UserData = await getUserData();
		await setUserData(userData);
		window.location.replace(`${url}/home`);
	});
</script>
