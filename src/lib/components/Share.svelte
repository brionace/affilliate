<script>
	import { icons } from '$lib/utilities/icons';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	function handleShare() {
		const t = {
			message: 'Coming soon'
			// autohide: false
		};

		toastStore.trigger(t);
	}
</script>

<button class="w-6 visible group-hover:visible" on:click={() => handleShare()}>
	<span class="w-6">{@html icons({ name: 'share' })}</span>
</button>
