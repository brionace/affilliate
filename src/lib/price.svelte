<script>
	import { icons } from '$lib/icons';

	/**
	 * @type {string}
	 */
	export let url;
	/**
	 * @type {string|number}
	 */
	export let price;
</script>

<a href={url} class="flex gap-1" target="_blank">
	<span>{price}</span>
	<span class="w-8">{@html icons({ name: 'amazon' })}</span>
</a>

<style>
	/* .price-tag {
		border-radius: 5px 0 0 5px;
		cursor: pointer;
		display: inline-block;
		font-size: 0.875rem;
		height: 30px;
		line-height: 30px;
		margin-right: 1rem;
		padding: 0 0.666rem;
		position: relative;
		text-align: center;
	}
	.price-tag:after {
		background: inherit;
		border-radius: 5px;
		display: block;
		content: '';
		height: 24px;
		position: absolute;
		right: -23px;
		top: -2px;
		transform-origin: top left;
		transform: rotate(45deg);
		width: 24px;
		z-index: -1;
	} */
</style>
