<script lang="ts">
	// @ts-nocheck
	import Header from '$lib/header.svelte';
	import { icons } from '$lib/utilities/icons';
	import SavedLink from '$lib/saved-link.svelte';
	import { set } from 'svelte/store';
	import { onMount } from 'svelte';
	import { nav_status } from '$lib/utilities/store';

	const navStatuses = {
		show: show,
		hide: hide
	} as const;

	function handleClick() {
		const navStatus = get(nav_status);
		if (navStatus === navStatuses.hide) {
			nav_status.set(navStatuses.show);
		} else {
			nav_status.set(navStatuses.hide);
		}
	}
</script>

<Header>
	<div class="text-sm">
		<a href="/" class="flex items-center gap-3">
			<span class="w-6">{@html icons({ name: 'logo' })}</span>
			<span class="hidden md:inline">Pardycat</span>
		</a>
	</div>
	<div
		class="absolute left-1/2 transform -translate-x-1/2 translate-y-2 bg-[#ef4644] rounded-t-lg px-4 py-2 text-sm"
	>
		<button on:click={() => handleClick()} class="text-white">Browse</button>
	</div>
	<div>
		<SavedLink />
	</div>
</Header>
