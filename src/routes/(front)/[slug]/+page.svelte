<script lang="ts">
	import ProductList from '$lib/components/product/List.svelte';
	import Head from '$lib/head.svelte';
	import { error, fail } from '@sveltejs/kit';
	import type { ProductsResponse } from '$lib/utilities/types.js';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { icons } from '$lib/utilities/icons';

	const toastStore = getToastStore();

	export let data;

	$: ({
		products,
		category: { name, description, slug }
	} = data);

	let showDescription = false;

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

<Head title={name} {description} />

<main>
	{#if name}
		<div class="flex justify-between p-4 mx-auto sticky top-0 z-10">
			<!-- <div>
				<ol class="breadcrumb">
					<li class="crumb"><a class="anchor" href="/">Home</a></li>
					<li class="crumb-separator" aria-hidden>/</li>
					<li class="crumb">
						<Accordion>
							<AccordionItem>
								<svelte:fragment slot="lead"
									><span class="block w-6">{@html icons({ name: slug })}</span></svelte:fragment
								>
								<svelte:fragment slot="summary">{name}</svelte:fragment>
								<svelte:fragment slot="content">{description}</svelte:fragment>
							</AccordionItem>
						</Accordion>
					</li>
				</ol>
				<p class={!showDescription ? 'hidden' : ''}>{description}</p>
			</div> -->
			<Accordion width="300px">
				<AccordionItem>
					<svelte:fragment slot="lead"
						><span class="block w-6">{@html icons({ name: slug })}</span></svelte:fragment
					>
					<svelte:fragment slot="summary">{name}</svelte:fragment>
					<svelte:fragment slot="content">{description}</svelte:fragment>
				</AccordionItem>
			</Accordion>
			<div class="flex gap-2 items-start">
				<button
					class="btn btn-sm variant-filled"
					on:click={() => {
						const t = {
							message: 'Coming soon'
							// autohide: false
						};

						toastStore.trigger(t);
					}}
				>
					Filter
				</button>
			</div>
		</div>
	{/if}
	{#if products}
		<ProductList
			{products}
			on:loadMore={(e) =>
				fetchProductsInCategory(
					products,
					`/api/products/incategory?take=${e.detail.take}&cursor=${e.detail.cursor}`
				)}
		/>
	{/if}
</main>

<Toast />
