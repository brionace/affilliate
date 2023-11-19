<script>
	// @ts-nocheck
	import CategoryNav from '$lib/category-nav.svelte';
	import Header from '$lib/header.svelte';
	import List from '$lib/list.svelte';
	import { icons } from '$lib/icons';
	import SavedLink from '$lib/saved-link.svelte';

	export let data;
	let lazyLoaded;

	lazyLoaded = lazyloader(data);

	$: data = lazyLoaded;

	$: ({ products, categories, category } = data);

	let showCategories = true;

	function lazyloader(data) {
		return data;
	}

	function handleShare(id) {
		console.log(id);
	}
</script>

<Header>
	<div>
		<a href="/" class="flex items-center gap-3">
			<span class="w-6">{@html icons('logo')}</span>
			<span class="hidden md:inline">Pardycat</span>
		</a>
	</div>
	<div
		class="absolute left-1/2 transform -translate-x-1/2 translate-y-2 bg-[#ef4644] rounded-t-lg px-4 py-2"
	>
		<button on:click={() => (showCategories = !showCategories)} class="text-white">Browse</button>
	</div>
	<div>
		<SavedLink />
	</div>
</Header>
<CategoryNav show={showCategories} {categories} />
<!-- <div class="mx-auto flex min-h-screen max-w-screen-sm items-center justify-center">
	<div
		class="h-36 w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1"
	/>
</div> -->
<nav>
	<ul class="flex gap-4 p-4">
		<li><a href="/">Home</a></li>
		<li><h1>{category[0].name}</h1></li>
	</ul>
</nav>
<main>
	<List {products} />
</main>
