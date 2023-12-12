<script>
	import { AppBar } from '@skeletonlabs/skeleton';
	import { icons } from '$lib/utilities/icons';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<a href="/admin">Admin</a>
	</svelte:fragment>
	<a href="/">
		<span class="block w-6">{@html icons({ name: 'logo' })}</span>
	</a>
	<svelte:fragment slot="trail">
		<a href="/admin/products">Products</a>
		<a href="/admin/categories">Categories</a>
	</svelte:fragment>
</AppBar>

<slot />
