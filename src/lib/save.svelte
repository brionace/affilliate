<script lang="ts">
	import { icons } from './icons';
	import { saved } from '$lib/store';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	export let id: number;
	let fillSVG: boolean;

	onMount(async () => {
		const { found } = handleGetSavedProuct();
		fillSVG = found;
	});

	function handleGetSavedProuct() {
		const savedProducts = get(saved);
		const parsedProducts = savedProducts.length ? JSON.parse(savedProducts) : [];
		const found = parsedProducts.includes(id);

		return {
			found,
			parsedProducts
		};
	}
</script>

<button
	class="w-6 visible group-hover:visible"
	on:click={() => {
		const { found, parsedProducts } = handleGetSavedProuct();

		if (found) {
			const savedProducts = get(saved);
			const parsedProducts = JSON.parse(savedProducts);
			const newSavedProducts = [...parsedProducts];
			const index = newSavedProducts.indexOf(id);
			if (index > -1) {
				// only splice array when item is found
				newSavedProducts.splice(index, 1); // 2nd parameter means remove one item only
			}
			saved.set(JSON.stringify(newSavedProducts));

			fillSVG = false;
			return;
		}

		const newParsedProducts = [...parsedProducts];
		newParsedProducts.push(id);
		saved.set(JSON.stringify(newParsedProducts));

		fillSVG = true;
	}}
>
	<span class="w-6">{@html icons({ name: 'heart', fill: fillSVG })}</span>
</button>
