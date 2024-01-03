<script lang="ts">
	import { onMount } from 'svelte';
	import ProductEditor from '$lib/components/ProductEditor.svelte';

	export let data = {} as import('./$types.js').PageData;

	export let form = {} as import('./$types.js').ActionData;

	onMount(() => {
		if (!data.product) {
			window.location.href = '/doli/products/new';
		}

		if (form) {
			window.location.href = '/doli/products/';
		}
	});
</script>

<ProductEditor {data} />
