<script lang="ts">
	// @ts-nocheck
	import Head from '$lib/head.svelte';
	import List from '$lib/list.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import Categories from '$lib/categories.svelte';
	import SavedLink from '$lib/saved-link.svelte';
	import { icons } from '$lib/icons';
	import { drawerSettings } from '$lib/utils';

	const drawerStore = getDrawerStore();

	export let data;
	let lazyLoaded;

	lazyLoaded = lazyloader(data);

	$: data = lazyLoaded;

	$: ({ products, categories } = data);

	function lazyloader(data) {
		return data;
	}
</script>

<Head title="Pardycat" description="Find your next party outfit or fancy dress like a boss" />

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<div class="flex gap-2">
			<a href="/">
				<span class="block w-6">{@html icons({ name: 'logo' })}</span>
			</a>
			<span class="hidden md:inline">Pardycat</span>
		</div>
	</svelte:fragment>
	<button on:click={() => drawerStore.open(drawerSettings)}>Browse</button>
	<svelte:fragment slot="trail"><SavedLink /></svelte:fragment>
</AppBar>

<Drawer>
	<div class="p-4">
		<Categories {categories} />
	</div>
</Drawer>

<main>
	<List {products} />
</main>
