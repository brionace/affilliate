<script lang="ts">
	// @ts-ignore
	async function handleClick() {
		try {
			const response = await fetch('/api/appwrite/admin/products/categorise');
			const data = await response.json();

			console.log(data);
		} catch (error) {
			console.error(error);
			return 'unsuccesful response';
		}
	}
</script>

<div class="flex flex-col gap-1">
	<button class="btn" on:click={handleClick}>Categorise</button>
</div>
