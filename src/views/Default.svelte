<script>
	import Navbar from '../components/Navbar.svelte';
</script>

<div id="pg-layout-default">
	<div class="navbar-container">
		<Navbar />
	</div>
	<main>
		<slot />
	</main>
</div>

<style>
	#pg-layout-default {
		width: clamp(100vw, 100vw, 100vw);
		height: clamp(100vh, 100vh, 100vh);

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: var(--h-navmain) 1fr;

		overflow: hidden;
	}
	.navbar-container {
		position: sticky;
		top: 0;
	}
	main {
		min-width: 100%;
		min-height: 100%;
		gap: var(--gap-xl);
		overflow-y: auto;
	}
</style>
