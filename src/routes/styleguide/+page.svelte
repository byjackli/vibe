<script>
	import Default from '../../views/Default.svelte';
	import SearchButton from '../../components/SearchButton.svelte';
	import Card from '../../components/Card.svelte';
	import Slider from '../../components/utils/Slider/Slider.svelte';
	let x = {
		songid: 'a',
		title: 'Sample Song Title',
		artists: ['Bruno Mars'],
		image: 'https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3',
		previewAudio:
			'https://p.scdn.co/mp3-preview/ce4a01f9dc6091951d0a94b640b625b46e0efbd2?cid=774b29d4f13844c495f206cafdad9c86'
	};
	let filter = 'acousticness';
</script>

<svelte:head>
	<title>Styleguide - ViBE</title>
</svelte:head>

<Default>
	<h1>Styleguide</h1>
	<section id="buttons">
		<h2>Buttons</h2>
		<ul>
			<li><button class="main">main button</button></li>
			<li><button class="main invert">invert main</button></li>
			<li><button>supporting button</button></li>
			<li><button><span class="material-icons">support_agent</span>icon supporting</button></li>
			<li><button class="link underline">link underline button</button></li>
			<li><button class="link">link button</button></li>
		</ul>
	</section>
	<section id="search_button">
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
				<SearchButton
					state="recent"
					type="song"
					content="Mac Miller - The Spins WWWWWWWWWWWWWWWW"
				/>
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
	<section>
		<h2>Cards</h2>
		<ul>
			<Card songDetails={x} />
		</ul>
	</section>
	<section>
		<h2>Filter</h2>
		<Slider {filter} />
	</section>
	<section style="height: 100vh;" />
</Default>
