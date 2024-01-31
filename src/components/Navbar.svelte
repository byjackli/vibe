<script lang="ts">
	import { page } from '$app/stores';

	const denylist: string[] = [];
	const pages: string[] = ['account', 'messages', 'settings', 'styleguide', 'home'];

	$: navbarVisibility = !denylist.includes($page.url.pathname);
	$: currentPage = $page.url.pathname.slice(1);
</script>

{#if navbarVisibility}
	<nav aria-label="Vibe">
		<a href="/"><span class="logo">ViBE</span></a>

		<ul role="menubar" aria-label="Vibe">
			{#each pages as page}
				<li class={page === currentPage ? 'active' : ''}>
					<a href="/{page}">{page}</a>
					<span aria-hidden class="format-only">{page}</span>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	nav,
	ul {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	nav {
		width: 100%;
		height: var(--h-navmain);
		padding: var(--gap-m);
		justify-content: flex-start;
	}

	ul {
		gap: var(--gap-m);
		list-style-type: none;
	}

	ul .active a {
		font-weight: bold;
		text-align: center;
	}
	ul a:first-of-type {
		position: absolute;
		top: 0;
		left: 0;
	}
	.format-only {
		font-weight: bold;
		text-align: center;

		opacity: 0;
		z-index: -1;
	}

	nav .logo {
		font-size: 1.5rem;
	}
</style>
