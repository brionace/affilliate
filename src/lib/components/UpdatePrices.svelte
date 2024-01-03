<script lang="ts">
	let countDeleted = 0;
	let countUpdated = 0;
	let countTotal = 0;

	async function handleClick() {
		try {
			const response = await fetch('/api/admin/update-products');
			const data = await response.json();

			const { deleted, updated, total, completed } = data;


			countDeleted = deleted;
			countUpdated = updated;
			countTotal = total;

			// product.set(JSON.stringify({ name, images, url, price }));
			// // target.value = '';
			// window.location.href = '/admin/products/create';
		} catch (error) {
			console.error(error);
			return 'unsuccesful response';
		}
	}
</script>

<div class="flex flex-col gap-1">
	<button class="btn" on:click={handleClick}>Update All products</button>
	{#if countTotal} <p>Completed</p>{/if}
	{#if countDeleted}<p>Deleted: {countDeleted}/{countTotal}</p>{/if}
	{#if countUpdated} <p>Updated: {countUpdated}/{countTotal}</p>{/if}
</div>
