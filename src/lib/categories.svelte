<script>
	import { error, fail } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	/**
	 * @type {{id: number, name: string}[]}
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

<ul class="flex gap-4">
	{#each categories as category}
		<li class="p-4">
			<a href={category.name.toLowerCase().replace(' ', '-')}>{category.name}</a>
		</li>
	{:else}
		<p>loading...</p>
	{/each}
</ul>
