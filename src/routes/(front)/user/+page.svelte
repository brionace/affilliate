<script lang="ts">
	import { onMount } from 'svelte';
	import { saved } from '$lib/utilities/store';
	import { get } from 'svelte/store';
	import { fail, error } from '@sveltejs/kit';
	import type { ProductsResponse } from '$lib/utilities/types';
	import ProductsList from '$lib/components/ProductsList.svelte';
	// import { icons } from '$lib/utilities/icons';
	// import { AppBar } from '@skeletonlabs/skeleton';
	// import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	// import Categories from '$lib/categories.svelte';
	// import SavedLink from '$lib/saved-link.svelte';
	// import { drawerSettings } from '$lib/utilities';

	// const drawerStore = getDrawerStore();

	// export let data;

	// $: ({ categories } = data);

	let products: ProductsResponse[];

	onMount(async () => {
		if (!get(saved).length) {
			return;
		}

		try {
			const response = await fetch('/api/products/saved', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: get(saved) })
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

<main class="my-11">
	<ProductsList {products} />
</main>
