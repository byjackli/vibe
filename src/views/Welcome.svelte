<script>
	import { login, exchangeToken } from '../api/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		if (window.location.search.length > 0) {
			const url = new URL(window.location.href);
			const params = new URLSearchParams(url.search);
			const code = params.get('code');
			if (code) {
				localStorage.setItem('code', code)
				exchangeToken(code);
			}
			window.history.replaceState({}, document.title, '/');
		}
	});
</script>

<main>
	<div class="content">
		<h1 class="logo">ViBE</h1>
		<p>advanced version of discover weekly</p>
	</div>
	<button class="main" on:click={login}>sign in with spotify</button>
</main>

<style>
	main,
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	main {
		min-width: 100vw;
		min-height: 100vh;
		gap: var(--gap-xl);
	}

	.content {
		gap: var(--gap);
	}
	.content .logo {
		font-size: 5rem;
	}
	.content p {
		width: 75%;
		font-size: 1.5rem;
		font-weight: 200;
		text-align: center;
	}
</style>
