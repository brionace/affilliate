<script lang="ts">
	import Head from '$lib/head.svelte';
	import ProductList from '$lib/components/product/List.svelte';
	import InspirationList from '$lib/components/inspiration/List.svelte';
	import { error } from '@sveltejs/kit';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import type { ProductsResponse } from '$lib/utilities/types.js';

	const toastStore = getToastStore();

	export let data;

	$: ({ products, inspiration } = data);

	async function fetchMoreProducts(products: ProductsResponse, url: string) {
		const { list, meta } = products;
		let toastId: string | null = null;

		if (list.length === meta?.count) {
			// const t: ToastSettings = {
			// 	message: `Completed loading ${meta?.count} products`,
			// };

			// toastId = toastStore.trigger(t);

			return;
		}

		const t: ToastSettings = {
			message: `Loading ${list.length}/${meta?.count}`,
			autohide: false
		};

		toastId = toastStore.trigger(t);

		// /api/products/incategory/${slug}?take=${take}&cursor=${cursor}
		try {
			const response = await fetch(url);
			const returnedData = await response.json();

			if (!response.ok) {
				throw error(500, response.statusText);
			}

			data.products = {
				list: list.concat(returnedData.list),
				meta: { ...returnedData.meta }
			};

			return;
		} catch (err) {
			if (err instanceof Error) {
				throw error(500, err.message);
			}
		} finally {
			toastStore.close(toastId);
		}
	}
</script>

<Head title="Pardycat" description="Find your next party outfit or fancy dress like a boss" />

<main class="my-11">
	<InspirationList data={inspiration} />
	<!-- <ProductList
		{products}
		on:loadMore={(e) =>
			fetchMoreProducts(products, `/api/products?take=${e.detail.take}&cursor=${e.detail.cursor}`)}
	/> -->
</main>

<Toast />
