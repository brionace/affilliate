<script lang="ts">
	import Price from '$lib/Price.svelte';
	import Save from '$lib/components/Save.svelte';
	import Share from '$lib/components/Share.svelte';

	export let data;
	const { id, name, url, images, price } = data;
</script>

<div class="group mx-auto w-80 transform overflow-hidden duration-300">
	<div
		class="snap-x hover:snap-x scroll-px-0 snap-mandatory scroll-smooth flex overflow-x-auto bg-white rounded-t-lg"
	>
		{#each images as image, i}
			<div class="h-[320px] w-full flex justify-center snap-center shrink-0">
				<img src={image} alt={i === 0 ? name : ''} loading="lazy" class="mix-blend-multiply" />
			</div>
		{/each}
	</div>
	<div class="flex flex-col px-4 xsm:px-0 py-4 gap-2">
		<a href={`/${id}`} class="lg:invisible group-hover:visible hidden">
			{name}
		</a>
		<div class="flex gap-4 justify-between items-start">
			<Price {url} {price} />
			<div class="flex gap-4">
				<Save {id} />
				<Share />
			</div>
		</div>
	</div>
</div>
