<script lang="ts">
	// @ts-ignore
	async function handleClick() {
		try {
			const response = await fetch('/api/appwrite/admin/products/remove-duplicates');
			const data = await response.json();

			console.log(data);
		} catch (error) {
			console.error(error);
			return 'unsuccesful response';
		}
	}
</script>

<div class="flex flex-col gap-1">
	<button class="btn" on:click={handleClick}>Remove Duplicates</button>
</div>
