<script lang="ts">
	import { onMount } from 'svelte';
	import CategoryEditor from '$lib/components/CategoryEditor.svelte';

	export let data = {} as import('./$types.js').PageData;

	export let form = {} as import('./$types.js').ActionData;

	$: ({ category } = data);

	onMount(() => {
		if (!category) {
			window.location.href = '/admin/categories/new';
		}

		if (form) {
			window.location.href = '/admin/categories/';
		}
	});
</script>

<CategoryEditor {category} />
