<script lang="ts">
	import Price from '$lib/price.svelte';
	import Save from '$lib/save.svelte';
	import Share from '$lib/share.svelte';
	import type { Product } from '$lib/types';

	export let products: Product[];

</script>

{#if products}
	<div class="flex flex-wrap gap-4 mb-11">
		{#each products as product}
			<div class="group mx-auto mt-11 w-80 transform overflow-hidden duration-300">
				<div
					class="snap-x hover:snap-x scroll-px-0 snap-mandatory scroll-smooth flex overflow-x-auto bg-white rounded-t-lg"
				>
					{#each product.images as image, i}
						<div class="h-[320px] w-full flex justify-center snap-center shrink-0">
							<img src={image} alt={i === 0 ? product.name : ''} />
						</div>
					{/each}
				</div>
				<div class="flex flex-col py-4 gap-2">
					<div class="flex gap-4 justify-between items-start">
						<Price url={product.url} price={product.price} />
						<div class="flex gap-3">
							<Save id={product.id} />
							<Share url={product.url} />
						</div>
					</div>
					<a href={`/${product.id}`} class="lg:invisible group-hover:visible">
						{product.name}
					</a>
				</div>
			</div>
		{/each}
	</div>
{/if}
