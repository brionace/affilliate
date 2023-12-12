<script lang="ts">
	import { icons } from '$lib/utilities/icons';
	import { saved } from '$lib/utilities/store';
	import { onMount } from 'svelte';

	export let id: number;
	let fillSVG: boolean;

	onMount(async () => {
		const { found } = handleGetSavedProuct();
		fillSVG = found;
	});

	function handleGetSavedProuct() {
		const savedProducts = $saved;
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
			const savedProducts = $saved;
			const parsedProducts = JSON.parse(savedProducts);
			const newSavedProducts = [...parsedProducts];
			const index = newSavedProducts.indexOf(id);
			if (index > -1) {
				// only splice array when item is found
				newSavedProducts.splice(index, 1); // 2nd parameter means remove one item only
			}
			saved.set(JSON.stringify(newSavedProducts));

			if (!newSavedProducts.length) {
				localStorage.removeItem('saved');

				fillSVG = false;
				return;
			}

			fillSVG = false;
			return;
		}

		const newParsedProducts = [...parsedProducts];
		newParsedProducts.push(id);
		console.log(newParsedProducts);

		saved.set(JSON.stringify(newParsedProducts));

		fillSVG = true;
	}}
>
	<span class="w-6">{@html icons({ name: 'heart', fill: fillSVG })}</span>
</button>
