<script>
	import { error, fail } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { icons } from '$lib/utilities/icons';

	const drawerStore = getDrawerStore();

	const dispatch = createEventDispatcher();

	export let grouped;

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

<!-- for (const classification in grouped) {
  console.log(`\n**${classification.toUpperCase()}**:`);
  groupedCategories[classification].forEach(category => {
    console.log(`- ${category.name}`);
  });
} -->

{#each Object.entries(grouped) as cat}
	{#if cat[1].length}
		<div class="mb-8">
			<h2 class="mb-4">{cat[0].toUpperCase()}</h2>
			<ul class="flex flex-col flex-wrap gap-4">
				{#each cat[1] as category}
					<li>
						<a
							href={`/${category.slug}`}
							on:click={() => drawerStore.close()}
							class="flex items-center gap-2"
						>
							{#if icons({ name: category.slug })}
								<span class="flex items-center justify-center block rounded-full bg-gray-300 p-1"
									>{@html icons({ name: category.slug })}</span
								>
							{/if}
							<span>{category.name}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
{/each}
