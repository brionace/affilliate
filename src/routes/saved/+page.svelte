<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/header.svelte';
	import { icons } from '$lib/icons';
	import { saved } from '$lib/store';
	import { get } from 'svelte/store';
	import { fail, error } from '@sveltejs/kit';
	import type { Product } from '$lib/types';
	import List from '$lib/list.svelte';
	import SavedLink from '$lib/saved-link.svelte';

	let products: Product[] = [];

	const savedIds = get(saved);

	onMount(async () => {
		if (!savedIds.length) {
			return;
		}

		try {
			const response = await fetch('/api/products/ids', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: savedIds })
			});
			const data = await response.json();

			if (response.ok) {
				products = data;
			} else {
				throw fail(500, { message: response.statusText });
			}
		} catch (err) {
			if (err instanceof Error) {
				throw error(500, err.message);
			}

			throw error(500, 'unknown error');
		}
	});
</script>

<Header>
	<div>
		<a href="/" class="flex items-center gap-3">
			<span class="w-6">{@html icons('logo')}</span>
			<span class="hidden md:inline">Pardycat</span>
		</a>
	</div>
	<div class="absolute left-1/2 transform -translate-x-1/2">
		<h1>My saved products</h1>
	</div>
	<div>
		<SavedLink />
	</div>
</Header>

<main>
	<List {products} />
</main>
