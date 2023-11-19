<script>
	import { icons } from './icons';

	/**
	 * @type {string}
	 */
	export let url;

	function handleShare() {
		console.log(url);
	}
</script>

<button class="w-6 visible group-hover:visible" on:click={() => handleShare()}>
	<span class="w-6">{@html icons('share')}</span>
</button>
