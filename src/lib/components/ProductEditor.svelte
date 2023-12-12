<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher();

	export let data;

	const { categories, product } = data;

	const id = product?.id ? product.id : '';
	const url = product?.url ? product.url : '';
	let images = product?.images ? product.images : [];
	let name = product?.name ? product.name : '';
	let price = product?.price ? product.price : '';
	let published = product?.published ? product.published : false;
	let tags = categories;
	let selectedCategory = '';
	let selectedTags = [];

	const newImage = writable('');
</script>

<!-- <form
	on:submit|preventDefault={saveToDB}
	on:change={updateProduct}
> -->
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
			<!-- <h2
			class="h1 w-full h-full"
			contenteditable="true"
			on:input={(event) => {
				name = event.target.innerText.trim();
				updateProduct();
			}}
		>
			{name}
		</h2> -->
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
			<div>
				<label for="category">Category</label>
				<select
					id="category"
					name="category"
					required
					bind:value={selectedCategory}
					on:change={(event) => {
						tags = categories.filter((category) => category.name !== event.target.value);
						selectedCategory = event.target.value;
					}}
				>
					{#if categories}
						{#each categories as category}
							<option value={category?.name}>{category.name} </option>
						{/each}
					{/if}
				</select>
			</div>
			<div>
				<label for="tags">Tags</label>
				<div class="flex gap-3">
					<select
						id="tags"
						multiple
						on:change={(event) => {
							selectedTags = Array.from(new Set([...selectedTags, event.target.value]));
						}}
						disabled={!selectedCategory.length}
					>
						{#if tags}
							{#each tags as tag}
								<option value={tag.name} selected={selectedTags.includes(tag.name)}
									>{tag.name}</option
								>
							{/each}
						{/if}
					</select>
					{#if selectedTags?.length}
						<div class="max-w-56 overflow-x-auto">
							Selected tags:
							<ul>
								{#each selectedTags as tag}
									<li>
										<button on:click={() => (selectedTags = selectedTags.filter((e) => e !== tag))}
											>{tag}</button
										>
										<input type="hidden" name="tags" bind:value={tag} />
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			</div>
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
						id="published"
						type="checkbox"
						name="published"
						bind:checked={published}
						on:change={(event) => (published = event.target.checked)}
					/>
					<label for="published">Published</label>
				</div>
			</div>
		</aside>
	</div>
</form>
