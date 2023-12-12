<script lang="ts">
	import Price from '$lib/price.svelte';
	import Save from '$lib/components/Save.svelte';
	import Share from '$lib/components/Share.svelte';
	import type { ProductsResponse } from '$lib/utilities/types';
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let products: ProductsResponse[];

	let observer: IntersectionObserver;
	const perPage = 10;

	onMount(() => {
		const sentinel = document.querySelector('#sentinel');

		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Load more items when the sentinel comes into view
					dispatch('loadMore', { take: perPage, cursor: products.meta.cursor });
				}
			});
		});

		observer.observe(sentinel as Element);
	});

	// Remember to disconnect the observer when the component is destroyed
	onDestroy(() => {
		observer?.disconnect();
	});
</script>

{#if products?.list}
	<div class="flex flex-wrap gap-4 h-full">
		{#each products?.list as product}
			<div class="group mx-auto w-80 transform overflow-hidden duration-300">
				<div
					class="snap-x hover:snap-x scroll-px-0 snap-mandatory scroll-smooth flex overflow-x-auto bg-white rounded-t-lg"
				>
					{#each product?.images as image, i}
						<div class="h-[320px] w-full flex justify-center snap-center shrink-0">
							<img src={image} alt={i === 0 ? product.name : ''} loading="lazy" />
						</div>
					{/each}
				</div>
				<div class="flex flex-col px-4 xsm:px-0 py-4 gap-2">
					<div class="flex gap-4 justify-between items-start">
						<Price url={product.url} price={product.price} />
						<div class="flex gap-4">
							<Save id={product.id} />
							<Share url={product.url} />
						</div>
					</div>
					<a href={`/${product.id}`} class="lg:invisible group-hover:visible hidden">
						{product.name}
					</a>
				</div>
			</div>
		{/each}
	</div>

	<!-- Sentinel element -->
	<div id="sentinel" />
{/if}
