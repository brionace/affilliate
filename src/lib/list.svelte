<script lang="ts">
	import Price from '$lib/price.svelte';
	import Save from '$lib/save.svelte';
	import Share from '$lib/share.svelte';
	import type { Product } from '$lib/types';

	export let products: Product[] = [];
</script>

{#if products.length}
	<div class="flex flex-wrap gap-4 mb-11">
		{#each products as product}
			<!-- hover:scale-105 hover:shadow-lg -->
			<div class="group mx-auto mt-11 w-80 transform overflow-hidden duration-300">
				<div
					class="snap-x hover:snap-x scroll-px-0 snap-mandatory scroll-smooth flex overflow-x-auto"
				>
					{#each product.images as image, i}
						<div class="h-[320px] w-full flex justify-center snap-center shrink-0">
							<img src={image} alt={i === 0 ? product.name : ''} />
						</div>
					{/each}
				</div>
				<div class="flex flex-col p-4 gap-4">
					<div class="flex gap-4 justify-between items-start">
						<Share url={product.url} />
						<Price url={product.url} price={product.price} />
						<Save id={product.id} />
					</div>
					<!-- <hr class="invisible group-hover:visible border-gray-200" /> -->
					<p class="visible group-hover:visible mb-2 text-gray-900 flex-grow">
						{product.name}
					</p>
				</div>
			</div>
		{/each}
	</div>
{/if}
