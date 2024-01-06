<script lang="ts">
	import Card from '$lib/components/inspiration/Card.svelte';
	import ProductCard from '$lib/components/product/Card.svelte';
	import type { ProductsResponse } from '$lib/utilities/types';
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let data;

	const list = data.data;

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
	<section class="flex flex-col gap-6">
		<!-- <section class="grid grid-cols-2 md:grid-cols-4 gap-2">
			<div class="grid gap-4"> -->
		{#each list as l}
			<div class="flex flex-col gap-3 w-full p-3 rounded-xl">
				<div class="flex gap-3 items-center">
					<div class={`w-10 h-10 rounded-full bg-white ${l.inspiration.categories.join(' ')}`} />
					<Card data={l.inspiration} />
				</div>
				<div class="flex -space-x-4 rtl:space-x-reverse items-center">
					{#each l.products as product}
						<!-- <ProductCard data={product} /> -->
						<a href={product.url} target="_blank" title={product.name}>
							<img
								class="card card-hover rounded-xl w-auto h-[280px] border-2 border-gray-100 dark:border-gray-800"
								src={product.images[0]}
								alt={product.name}
								loading="lazy"
							/>
						</a>
					{/each}
					{#if l.total - l.products.length}
						<a
							class="flex items-center justify-center w-20 h-20 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
							href={`/inspiration/${l.inspiration.$id}`}>+{l.total - l.products.length}</a
						>
					{/if}
				</div>
			</div>
		{/each}
		<!-- </div>
		</section> -->

		<!-- Sentinel element -->
		<div id="sentinel" />
	</section>
{/if}

<style>
    .christmas {
  --s: 15px; /* control the size */
  
  --_c:#0000,#fff 1deg 79deg,#0000 81deg;
  --g0:conic-gradient(from 140deg at 50% 87.5% ,var(--_c));
  --g1:conic-gradient(from 140deg at 50% 81.25%,var(--_c));
  --g2:conic-gradient(from 140deg at 50% 75%   ,var(--_c));
  --g3:conic-gradient(at 10% 20%,#0000 75%,#fff 0);
  background:
    var(--g0) 0 calc(var(--s)/-4),var(--g0) var(--s) calc(3*var(--s)/4),
    var(--g1) ,var(--g1) var(--s) var(--s),
    var(--g2) 0 calc(var(--s)/ 4),var(--g2) var(--s) calc(5*var(--s)/4),
    var(--g3) calc( var(--s)/-10) var(--s),
    var(--g3) calc(9*var(--s)/10) calc(2*var(--s)),
    repeating-conic-gradient(from 45deg,#a31e39 0 25%,#31570e 0 50%);
  background-size: calc(2*var(--s)) calc(2*var(--s));
}

.birthday {
  --s: 20px; /* control the size */
  --c1: #e7525b;
  --c2: #78dbf0;
  
  --_g: 80%,var(--c1) 25.4%,#0000 26%;
  background:
   radial-gradient(at 80% var(--_g)),
   radial-gradient(at 20% var(--_g)),
   conic-gradient(from -45deg at 50% 41%,var(--c1) 90deg,var(--c2) 0) 
      calc(var(--s)/2) 0;
  background-size: var(--s) var(--s);
}


</style>
