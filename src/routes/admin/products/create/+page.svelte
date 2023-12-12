<script lang="ts">
	import { onMount } from 'svelte';
	import ProductEditor from '$lib/components/ProductEditor.svelte';

	export let data = {} as import('./$types').PageData;

	export let form = {} as import('./$types').ActionData;

	onMount(() => {
		if (form) {
			window.location.href = '/admin/products/';
		}
	});
</script>

<ProductEditor {data} />
