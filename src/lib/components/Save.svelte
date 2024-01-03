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
		const found = savedProducts.includes(id);

		return {
			found,
			savedProducts: $saved
		};
	}
</script>

<button
	class="w-6 visible group-hover:visible"
	on:click={() => {
		const { found, savedProducts } = handleGetSavedProuct();

		if (found) {
			const index = savedProducts.indexOf(id);
			if (index > -1) {
				// only splice array when item is found
				savedProducts.splice(index, 1); // 2nd parameter means remove one item only
			}
			saved.set(savedProducts);

			if (!savedProducts.length) {
				localStorage.removeItem('saved');

				fillSVG = false;
				return;
			}

			fillSVG = false;
			return;
		}

		const newSavedProducts = savedProducts;

		newSavedProducts.push(id);

		saved.set(newSavedProducts);

		fillSVG = true;
	}}
>
	<span class="w-6">{@html icons({ name: 'heart', fill: fillSVG })}</span>
</button>
