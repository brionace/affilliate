<script lang="ts">
	import ProductsList from '$lib/components/ProductsList.svelte';
	import Price from '$lib/price.svelte';
	import Save from '$lib/components/Save.svelte';
	import Share from '$lib/components/Share.svelte';
	import Head from '$lib/head.svelte';
	import { error, fail } from '@sveltejs/kit';
	import type { ProductsResponse } from '$lib/utilities/types.js';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let data;

	$: data = data;
	$: ({ products, product } = data);
	$: ({ name, description, slug } = data.category ? data.category : {});

	async function fetchProductsInCategory(products: ProductsResponse, url: string) {
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

<Head title={name ?? product.name} {description} />

<main class="my-11">
	{#if products && !product}
		<ProductsList
			{products}
			on:loadMore={(e) =>
				fetchProductsInCategory(
					products,
					`/api/products/incategory?take=${e.detail.take}&cursor=${e.detail.cursor}`
				)}
		/>
	{/if}

	{#if product}
		<div class="group mx-auto w-80 transform overflow-hidden duration-300">
			<div
				class="snap-x hover:snap-x scroll-px-6 snap-mandatory scroll-smooth flex overflow-x-auto bg-white rounded-t-lg"
			>
				{#each product.images as image, i}
					<div class="flex justify-center snap-center shrink-0">
						<img src={image} alt={i === 0 ? product.name : ''} />
					</div>
				{/each}
			</div>
			<div class="flex flex-col px-4 xsm:px-0 py-4 gap-4 max-w-md m-auto">
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
	{/if}
</main>

<Toast />
