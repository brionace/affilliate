<script lang="ts">
	import ProductsList from '$lib/components/ProductsList.svelte';
	import Price from '$lib/Price.svelte';
	import Save from '$lib/components/Save.svelte';
	import Share from '$lib/components/Share.svelte';
	import Head from '$lib/head.svelte';
	import { error, fail } from '@sveltejs/kit';
	import type { ProductsResponse } from '$lib/utilities/types.js';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { icons } from '$lib/utilities/icons';

	const toastStore = getToastStore();

	export let data;

	const { product } = data;
</script>

<Head title={product.name} />

<main>
	{#if product}
		<div class="group mx-auto w-80 transform overflow-hidden duration-300 my-11">
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
