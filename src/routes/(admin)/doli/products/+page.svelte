<script>
	import Search from '$lib/components/Search.svelte';
	import ReCategorise from '$lib/components/ReCategorise.svelte';
	import { product } from '$lib/utilities/store';
	import { get } from 'svelte/store';
	import RemoveDuplicates from '$lib/components/RemoveDuplicates.svelte';

	export let data;
	// const { products } = data;
	$: ({ products } = data);
</script>

<div class="grid gap-8 p-4">
	<div class="flex gap-4 justify-between">
		<Search
			placeholder="Search products"
			on:search={(e) => {
				product.set({ ...get(product), search: e.detail });
			}}
		/>
		<ReCategorise />
		<RemoveDuplicates />
	</div>

	{#if products}
		<div class="flex flex-wrap gap-4">
			{#each products as product}
				<div class="group mx-auto w-80 transform overflow-hidden duration-300">
					<div
						class="snap-x hover:snap-x scroll-px-0 snap-mandatory scroll-smooth flex overflow-x-auto bg-white rounded-t-lg"
					>
						{#each product.images as image, i}
							<div class="h-[320px] w-full flex justify-center snap-center shrink-0">
								<img src={image} alt={i === 0 ? product.title : ''} />
							</div>
						{/each}
					</div>
					<div class="flex flex-col px-4 xsm:px-0 py-4 gap-2">
						<div class="flex gap-4 justify-between items-start">
							<a href={`/doli/products/${product.$id}`}>Edit</a>
							<p>
								{product.title}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
