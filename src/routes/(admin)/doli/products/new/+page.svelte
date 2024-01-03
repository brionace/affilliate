<script lang="ts">
	import { onMount } from 'svelte';
	import ProductEditor from '$lib/components/ProductEditor.svelte';
	import { product } from '$lib/utilities/store';

	export let data = {} as import('./$types.js').PageData;

	export let form = {} as import('./$types.js').ActionData;

	product.subscribe((value) => {
		try {
			data.product = JSON.parse(value);
		} catch (error) {
			console.error('Error parsing product:', error);
		}
	});

	onMount(() => {
		if (form) {
			window.location.href = '/doli/products/';
		}
	});
</script>

<ProductEditor {data} />
