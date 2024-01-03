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
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import CreateInspiration from '$lib/components/CreateInspiration.svelte';

	initializeStores();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const drawerStore = getDrawerStore();

	export let data;

	$: ({ categories, groupedCategories } = data);


	const modalStore = getModalStore();

	function handleCreateInspiration() {
		const ModalComponent: ModalComponent = {
			ref: CreateInspiration,
			props: { data }
		};
		const modal: ModalSettings = {
			type: 'component',
			component: ModalComponent
		};
		modalStore.trigger(modal);
	}
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<div class="flex gap-1">
			<button on:click={() => drawerStore.open(drawerSettings)}>
				<span class="block w-6">{@html icons({ name: 'menu' })}</span>
			</button>
		</div>
	</svelte:fragment>
	<a href="/" title="Pardycat" class="!font-normal">Pardycat</a>
	<svelte:fragment slot="trail">
		<button on:click={() => handleCreateInspiration()} class="btn flex gap-1">
			<!-- <span>{@html icons({ name: 'create', fill: !!saved })}</span> -->
			<span>Create</span></button
		>
	</svelte:fragment>
</AppBar>

<Modal />

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
		<CategoryList {categories} grouped={groupedCategories} />
	</div>
</Drawer>

<Footer>
	<div class="flex justify-center p-4">
		<span class="block w-6">{@html icons({ name: 'logo' })}</span>
	</div>
</Footer>
