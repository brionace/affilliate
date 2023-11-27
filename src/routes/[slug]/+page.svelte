<script lang="ts">
	// @ts-nocheck
	import List from '$lib/list.svelte';
	import { icons } from '$lib/icons';
	import Price from '$lib/price.svelte';
	import Save from '$lib/save.svelte';
	import Share from '$lib/share.svelte';
	import Head from '$lib/head.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import Categories from '$lib/categories.svelte';
	import SavedLink from '$lib/saved-link.svelte';
	import { drawerSettings } from '$lib/utils';

	const drawerStore = getDrawerStore();

	export let data;
	let lazyLoaded;

	lazyLoaded = lazyloader(data);

	$: data = lazyLoaded;

	$: ({ products, categories, category, product } = data);

	function lazyloader(data) {
		return data;
	}

	function handleShare(id) {
		console.log(id);
	}
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<div class="flex gap-2">
			<a href="/">
				<span class="block w-6">{@html icons({ name: 'logo' })}</span>
			</a>
			<span class="hidden md:inline">Pardycat</span>
		</div>
	</svelte:fragment>
	<button on:click={() => drawerStore.open(drawerSettings)}>
		{#if category}
			<span class="flex justify-center gap-3">
				<span class="block w-6">{@html icons({ name: category[0].slug })}</span>
				<span class="hidden md:inline-block">{category[0].name}</span>
			</span>
		{:else}
			Browse
		{/if}
	</button>
	<svelte:fragment slot="trail"><SavedLink /></svelte:fragment>
</AppBar>

<Drawer>
	<div class="p-4">
		<Categories {categories} />
	</div>
</Drawer>

{#if products}
	<Head title={category[0].name} description={category[0].description} />
	<main>
		<List {products} />
	</main>
{/if}

{#if product}
	<Head title={product.name} />
	<main>
		<div class="group mx-auto mt-11 w-80 transform overflow-hidden duration-300">
			<div
				class="snap-x hover:snap-x scroll-px-6 snap-mandatory scroll-smooth flex overflow-x-auto bg-white rounded-t-lg"
			>
				{#each product.images as image, i}
					<div class="flex justify-center snap-center shrink-0">
						<img src={image} alt={i === 0 ? product.name : ''} />
					</div>
				{/each}
			</div>
			<div class="flex flex-col py-4 gap-4 max-w-md m-auto">
				<div class="flex gap-4 justify-between items-start">
					<Price url={product.url} price={product.price} />
					<div class="flex gap-3">
						<Save id={product.id} />
						<Share url={product.url} />
					</div>
				</div>
				<p>
					{product.name}
				</p>
			</div>
		</div>
	</main>
{/if}
