<script lang="ts">
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { saved } from '$lib/store';
	import { get } from 'svelte/store';
	import { fail, error } from '@sveltejs/kit';
	import type { Product } from '$lib/types';
	import List from '$lib/list.svelte';
	import { icons } from '$lib/icons.js';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import Categories from '$lib/categories.svelte';
	import SavedLink from '$lib/saved-link.svelte';
	import { drawerSettings } from '$lib/utils';

	const drawerStore = getDrawerStore();

	export let data;

	$: ({ categories } = data);

	let products: Product[] = [];

	const savedIds = get(saved);

	onMount(async () => {
		if (!savedIds.length) {
			return;
		}

		try {
			const response = await fetch('/api/products/ids', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: savedIds })
			});
			const data = await response.json();

			if (response.ok) {
				products = data;
			} else {
				throw fail(500, { message: response.statusText });
			}
		} catch (err) {
			if (err instanceof Error) {
				throw error(500, err.message);
			}

			throw error(500, 'unknown error');
		}
	});
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
	<button on:click={() => drawerStore.open(drawerSettings)}><h1>My Saved Products</h1></button>
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
