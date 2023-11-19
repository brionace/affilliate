<script lang="ts">
	// @ts-nocheck
	import Categories from './categories.svelte';

	export let show;
	export let categories;
</script>

<div
	class="flex justify-center min-h-[3px] w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white overflow-x-auto duration-300"
>
	{#if show}
		<Categories {categories} {show} />
	{/if}
</div>
