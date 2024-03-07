<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher();

	export let data;

	const { product, groupedCategories } = data;

	const id = product?.$id ? product.$id : '';
	const url = product?.url ? product.url : '';
	let images = product?.images ? product.images : [];
	let name = product?.name ? product.title : '';
	let price = product?.price ? product.price : '';
	let status = product?.status === 'published' ? 'on' : 'off';
	let categories: number[] = product?.categories ? product.categories : [];

	const newImage = writable('');
</script>

<form method="POST" action={`?/${id ? 'update' : 'create'}`}>
	<div class="grid grid-cols-1 grid-rows-[auto,1fr] min-h-screen overflow-y-auto items-start">
		<div class="md:col-span-2 p-4 bg-gray-50">
			<input type="hidden" name="id" value={id} />
			<input
				name="name"
				class="w-full"
				required
				bind:value={name}
				on:change={(event) => {
					name = event.target.value.trim();
				}}
			/>
		</div>
		<div class="flex flex-col gap-4 px-4">
			<div class="flex flex-wrap gap-3 items-start">
				{#each images as image}
					<div class="relative">
						<button
							type="button"
							class="btn btn-sm variant-filled absolute top-0 right-0 z-10"
							on:click={() => {
								images = images.filter((img) => img !== image);
							}}>DELETE</button
						><img src={image} alt="" />
						<div>
							<input type="hidden" name="image" bind:value={image} />
						</div>
					</div>
				{/each}
			</div>
			<div>
				<input id="newImage" name="newImage" bind:value={$newImage} />
				<button
					on:click={(e) => {
						e.preventDefault();
						images = [...images, $newImage];
						$newImage = '';
					}}>Add</button
				>
			</div>
		</div>
		<aside class="flex flex-col flex-wrap gap-3 p-4 bg-gray-50 h-full">
			<div>
				<label for="price">Price</label>
				<input
					id="price"
					name="price"
					required
					bind:value={price}
					on:change={(event) => {
						price = event.target.value;
					}}
				/>
			</div>
			<div>
				<label for="url">URL</label>
				<input id="url" name="url" value={url} required />
			</div>
			{#each Object.entries(groupedCategories) as cat}
				<div>
					<h2>{cat[0].toUpperCase()}</h2>
					{#each cat[1] as category}
						<!-- {#if cat[0] === 'event'}
							<div class="flex gap-3">
								<label for={category.slug}>{category.name}</label>
								<input
									id={category.slug}
									type="radio"
									name={cat[0]}
									value={category.id}
									bind:group={categories}
									on:change={() => {
										console.log(categories);
									}}
								/>
							</div>
						{:else}
							<div class="flex gap-3">
								<label for={category.slug}>{category.name}</label>
								<input
									id={category.slug}
									type="checkbox"
									name={category.slug}
									value={category.id}
									bind:group={categories}
									on:change={() => {
										console.log(categories);
									}}
								/>
							</div>
						{/if} -->
						<div class="flex gap-3 flex-row-reverse items-center justify-end">
							<label for={category.slug}>{category.name}</label>
							<input
								id={category.slug}
								type="checkbox"
								name="category"
								value={category.slug}
								bind:group={categories}
							/>
						</div>
					{/each}
				</div>
			{/each}
			<div class="flex gap-4 items-center">
				{#if id}
					<form action="?/delete" method="POST">
						<input type="hidden" name="id" value={id} />
						<button type="submit" class="btn btn-sm variant-filled"> x </button>
					</form>
				{/if}
				<button type="submit" class="btn btn-sm variant-filled">
					{`${id ? 'Update' : 'Save'}`}
				</button>
				<div class="flex gap-3 justify-center items-center">
					<input
						id="status"
						type="checkbox"
						name="status"
						bind:checked={status}
						on:change={(event) => (status = event.target.checked)}
					/>
					<label for="published">Published</label>
				</div>
			</div>
		</aside>
	</div>
</form>
