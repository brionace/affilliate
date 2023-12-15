<script>
	import Search from '$lib/search.svelte';

	export let data;
	$: ({ categories } = data);
</script>

<div class="grid gap-8 p-4">
	<div class="flex gap-4">
		<Search
			placeholder="Search products"
			on:search={(e) => {
				product.set({ ...get(product), search: e.detail });
			}}
		/>
		<a href="/admin/categories/create" class="btn variant-filled">New</a>
	</div>

	{#if categories}
		<div class="flex flex-wrap gap-4">
			{#each categories as category}
				<div class="flex gap-4">
					<a href={`/admin/categories/${category.id}`}>{category.name}</a>
				</div>
			{/each}
		</div>
	{/if}
</div>
