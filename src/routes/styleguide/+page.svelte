<script>
	import SearchButton from '../../components/SearchButton.svelte';
</script>

<svelte:head>
	<title>Styleguide - ViBE</title>
</svelte:head>

<h1>Styleguide</h1>

<section>
	<h2>Buttons</h2>
	<ul>
		<li><button class="main">main button</button></li>
		<li><button class="main invert">invert main</button></li>
		<li><button>supporting button</button></li>
		<li><button><span class="material-icons">support_agent</span>icon supporting</button></li>
		<li><button class="link">link button</button></li>
	</ul>
</section>
<section>
	<h2>Search Buttons</h2>
	<ul>
		<li>
			<SearchButton state="recent" type="artist" content="Mac Miller" />
		</li>
		<li>
			<SearchButton state="recent" type="song" content="Mac Miller - The Spins" />
		</li>
		<li style="width: 250px">
			<SearchButton state="recent" type="song" content="Mac Miller - The Spins" />
		</li>
		<li style="width: 250px">
			<SearchButton state="recent" type="song" content="Mac Miller - The Spins WWWWWWWW" />
		</li>
		<li style="width: 250px">
			<SearchButton state="recent" type="song" content="Mac Miller - The Spins WWWWWWWWWWWWWWWW" />
		</li>
		<li style="width: 250px">
			<SearchButton
				state="recent"
				type="song"
				content="Mac Miller - The Spins WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
			/>
		</li>
		<li>
			<SearchButton state="result" type="artist" content="Mac Miller" />
		</li>
		<li>
			<SearchButton state="result" type="song" content="Mac Miller - The Spins" />
		</li>
		<li style="width: 250px">
			<SearchButton state="result" type="song" content="Mac Miller - The Spins" />
		</li>
	</ul>
</section>
