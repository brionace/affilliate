<script>
	// @ts-nocheck
	import Search from '$lib/search.svelte';
	import { product } from '$lib/store';
	import { get } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { icons } from '$lib/icons';

	const dispatch = createEventDispatcher();

	/** @type {import('./$types').PageData} */
	export let data;
	const { categories } = data;
	const products = get(product);

	/** @type {import('./$types').ActionData} */
	export let form;

	if (form) {
		product.set(JSON.stringify(form));
	}

	const parsedData = JSON.parse(products);

	const url = parsedData?.url;
	let images = parsedData?.images;
	let name = parsedData?.name;
	let price = parsedData?.price;

	let tags = categories;
	let selectedCategory = '';
	let selectedTags = [];
	let category = null;

	function updateProduct() {
		category = selectedCategory.length
			? JSON.stringify(Array.from(new Set([selectedCategory, ...selectedTags])))
			: null;
		product.update(() =>
			JSON.stringify({
				name,
				images,
				price,
				url,
				category
			})
		);
	}

	async function saveToDB() {
		dispatch('show_loading');

		const jsonProduct = get(product);
		const newProduct = jsonProduct ? JSON.parse(jsonProduct) : null;
		const name = newProduct?.name ?? '';
		const images = newProduct?.images ?? [];
		const price = newProduct?.price ?? '';
		const category = newProduct?.category ?? null;
		const url = newProduct?.url ?? null;

		const response = await fetch('/api/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, images, price, category, url })
		});

		if (!response.ok) {
			console.error(response);
			throw error(500, 'unsuccesful save');
		}

		product.update(() => null);
		dispatch('hide_loading');
		window.location.reload();
	}
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<a href="/">
			<span class="block w-6">{@html icons({ name: 'logo' })}</span>
		</a>
	</svelte:fragment>
	<Search />
	<svelte:fragment slot="trail"
		><button type="button" class="btn btn-sm variant-filled" on:click={() => saveToDB()}
			>SAVE</button
		></svelte:fragment
	>
</AppBar>

<div class="h-screen flex justify-center items-center">
	<form method="POST" action="?/add">
		<div class="flex gap-1">
			<input type="text" name="url" class="input" placeholder="Enter a URL" />
			<button type="submit" class="btn">Search</button>
		</div>
	</form>
</div>

{#if parsedData}
	<div>
		<div class="flex flex-col flex-row-reverse overflow-hidden h-full">
			<section class="mx-auto w-fit p-4">
				<h1
					class="h1"
					contenteditable="true"
					on:input={(event) => {
						name = event.target.innerText.trim();
						updateProduct();
					}}
				>
					{name}
				</h1>
			</section>
			<section>
				<div class="flex flex-wrap gap-3 justify-center">
					<div>
						<label for="category">Category</label>
						<select
							id="category"
							bind:value={selectedCategory}
							on:change={(event) => {
								tags = categories.filter((category) => category.name !== event.target.value);
								selectedCategory = event.target.value;
								updateProduct();
							}}
						>
							{#each categories as category}
								<option value={category.name} selected={selectedCategory === category.name}
									>{category.name}</option
								>
							{/each}
						</select>
					</div>
					<div>
						<label for="price">Price</label>
						<input
							id="price"
							value={price}
							on:change={(event) => {
								price = event.target.value;
								updateProduct();
							}}
						/>
					</div>
					<div>
						<label for="url">URL</label>
						<input id="url" type="text" value={url} disabled />
					</div>
					<div>
						<label for="tags">Tags</label>
						<!-- <input
							id="tags"
							type="text"
							value={tags.map((t) => t.name)}
							disabled={!selectedCategory.length}
						/> -->
						<div class="flex gap-3">
							<select
								id="tags"
								on:change={(event) => {
									selectedTags = Array.from(new Set([...selectedTags, event.target.value]));
									updateProduct();
								}}
								disabled={!selectedCategory.length}
							>
								{#each tags as tag}
									<option value={tag.name} selected={selectedTags === tag.name}>{tag.name}</option>
								{/each}
							</select>
							{#if selectedTags.length}
								<div class="max-w-56 overflow-x-auto">
									<ul class="flex gap-3">
										{#each selectedTags as tag}
											<li>{tag}</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</section>
			<section>
				<div class="grid grid-cols-1 md:grid-cols-3 overflow-y-auto overflow-x-hidden h-full my-8">
					{#each images as image}
						<div class="relative card p-4">
							<button
								type="button"
								class="btn btn-sm variant-filled absolute top-0 right-0 z-10"
								on:click={() => {
									images.splice(images.indexOf(image), 1);
									updateProduct();
									window.location.reload();
								}}>DELETE</button
							><img src={image} alt="" />
						</div>
					{/each}
				</div>
			</section>
		</div>
	</div>
{/if}
