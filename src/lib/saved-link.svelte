<script lang="ts">
	import { icons } from './icons';
	import { saved } from '$lib/store';
	import { onMount } from 'svelte';

	let hasSavedProducts: boolean;

	onMount(async () => {
		const parsedProducts = JSON.parse($saved);
		hasSavedProducts = parsedProducts.length ? true : false;
	});
</script>

<a href="/saved" class="block w-6">
	{@html icons({ name: 'heart', fill: hasSavedProducts })}
</a>
