<script lang="ts">
	import '../../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { icons } from '$lib/utilities/icons';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import Footer from '$lib/footer.svelte';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import CategoryList from '$lib/components/CategoryList.svelte';
	import { drawerSettings } from '$lib/utilities';
	import { saved } from '$lib/utilities/store';
	// import { Body, classList, style } from 'svelte-body@latest';

	initializeStores();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const drawerStore = getDrawerStore();

	export let data;

	$: ({ categories, category } = data);
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<div class="flex gap-1">
			<button on:click={() => drawerStore.open(drawerSettings)}>
				<span class="block w-6">{@html icons({ name: 'menu' })}</span>
			</button>
			<a href="/" title="Pardycat" class="!font-normal"
				>Pardycat<sup class="text-[8px]">BETA</sup></a
			>
		</div>
	</svelte:fragment>
	<div class="flex gap-2 items-center">
		{#if category}
			<span class="block w-6">{@html icons({ name: category.slug })}</span>
		{/if}
		<span>{category ? category.name : 'All products'}</span>
	</div>
	<svelte:fragment slot="trail">
		<a href="/user" class="block w-6">
			{@html icons({ name: 'heart', fill: !!saved })}
		</a>
	</svelte:fragment>
</AppBar>

<slot />

<!-- <svelte:body use:style={{ overflow: 'hidden' }} /> -->

<Drawer>
	<!-- <div class="p-4">
		<form>
			<input
				type="text"
				placeholder="Search"
				class="w-full border border-gray-300 rounded-lg p-2"
			/>
		</form>
	</div> -->
	<!-- {#if category}
		<div class="p-4">
			<h1>{category.name}</h1>
			<p>
				{category.description}
			</p>
		</div>
		<hr />
	{/if} -->
	<div class="p-4">
		<h2 class="mb-4">Categories</h2>
		<CategoryList {categories} />
	</div>
</Drawer>

<Footer>
	<div class="flex justify-center p-4">
		<span class="block w-6">{@html icons({ name: 'logo' })}</span>
	</div>
</Footer>
