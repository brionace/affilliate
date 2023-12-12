<script lang="ts">
	import '../app.postcss';
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
		<a href="/" title="Pardycat" class="!font-normal">Pardycat<sup class="text-[8px]">BETA</sup></a>
	</svelte:fragment>
	<button on:click={() => drawerStore.open(drawerSettings)} class="flex gap-2 items-center">
		{#if category}
			<span class="block w-6">{@html icons({ name: category.slug })}</span>
		{/if}
		<span>{category ? category.name : 'Browse'}</span>
	</button>
	<svelte:fragment slot="trail">
		<a href="/user" class="block w-6">
			{@html icons({ name: 'heart', fill: !!saved })}
		</a>
	</svelte:fragment>
</AppBar>

<slot />

<!-- <svelte:body use:style={{ overflow: 'hidden' }} /> -->

<Drawer>
	<div class="p-4">
		<form>
			<input
				type="text"
				placeholder="Search"
				class="w-full border border-gray-300 rounded-lg p-2"
			/>
		</form>
	</div>
	<div class="flex gap-4 p-4 items-center justify-center h-full">
		<CategoryList {categories} />
	</div>
</Drawer>

<Footer>
	<div class="flex justify-center p-4">
		<span class="block w-6">{@html icons({ name: 'logo' })}</span>
	</div>
</Footer>
