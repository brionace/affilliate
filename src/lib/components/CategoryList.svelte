<script>
	import { error, fail } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { icons } from '$lib/utilities/icons';

	const drawerStore = getDrawerStore();

	const dispatch = createEventDispatcher();

	/**
	 * @type {{id: number, name: string, slug: string}[]}
	 */
	export let categories;

	/**
	 * @param {string} name
	 */
	// async function handleClick(name) {
	// 	// const res = await fetch('/', {
	// 	// 	method: 'POST',
	// 	// 	headers: {
	// 	// 		'Content-Type': 'application/x-www-form-urlencoded'
	// 	// 	},
	// 	// 	body: JSON.stringify({ name })
	// 	// });
	// 	// const x = await res.json();
	// 	// console.log(x);
	// 	dispatch('filterproducts');

	// 	try {
	// 		const response = await fetch('/api/products', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({ name })
	// 		});
	// 		const products = await response.json();

	// 		if (response.ok) {
	// 			return (data.products = products);
	// 		}

	// 		return fail(500, { message: response.statusText });
	// 	} catch (err) {
	// 		if (err instanceof Error) {
	// 			throw error(500, err.message);
	// 		}

	// 		throw error(500, 'unknown error');
	// 	}
	// }
</script>

<ul class="flex flex-wrap gap-4 h-full w-full">
	{#each categories as category}
		<li class="">
			<a
				href={`/${category.slug}`}
				on:click={() => drawerStore.close()}
				class="btn variant-filled-primary"
			>
				{#if icons({ name: category.slug })}
					<span class="block w-6">{@html icons({ name: category.slug })}</span>
				{/if}
				<span>{category.name}</span>
			</a>
		</li>
	{:else}
		<p>loading...</p>
	{/each}
</ul>
