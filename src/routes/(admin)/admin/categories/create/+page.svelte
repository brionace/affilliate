<script lang="ts">
	import { onMount } from 'svelte';
	import CategoryEditor from '$lib/components/CategoryEditor.svelte';

	export let form = {} as import('./$types').ActionData;

	onMount(() => {
		if (form) {
			window.location.href = '/admin/categories/';
		}
	});
</script>

<CategoryEditor category={{}} />
