<script>
	export let title = '';
	export let description = '';
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={`${description}`} />
	{/if}
</svelte:head>
