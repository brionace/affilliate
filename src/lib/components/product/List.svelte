<script lang="ts">
	import Price from '$lib/components/Price.svelte';
	import Save from '$lib/components/Save.svelte';
	import Share from '$lib/components/Share.svelte';
	import Card from '$lib/components/product/Card.svelte';
	import type { ProductsResponse } from '$lib/utilities/types';
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let products: ProductsResponse[];

	$: list = products;

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

{#if list}
	<div class="flex flex-wrap gap-4 h-full">
		{#each list as product}
			<Card data={product} />
		{/each}
	</div>

	<!-- Sentinel element -->
	<div id="sentinel" />
{/if}
