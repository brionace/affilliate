<script lang="ts">
	export let category;

	const id = category?.id ? category.id : '';
	let name = category?.name ? category.name : '';
	let slug = category?.slug ? category.slug : '';
	let description = category?.description ? category.description : '';
	let inSeason = category?.inSeason ? category.inSeason : false;
	let published = category?.published ? category.published : false;
</script>

<form
	method="POST"
	action={`?/${id ? 'update' : 'create'}`}
	class="flex flex-col gap-4 items-center p-4"
>
	<div>
		<input type="hidden" name="id" value={id} />
		<label for="name">Name</label>
		<input
			id="name"
			name="name"
			required
			bind:value={name}
			on:change={(event) => (name = event.target.value)}
		/>
	</div>
	<div>
		<label for="slug">Slug</label>
		<input
			id="slug"
			name="slug"
			required
			pattern="[a-z0-9]+(?:-[a-z0-9]+)|[a-z0-9]+"
			bind:value={slug}
			on:change={(event) => (slug = event.target.value)}
		/>
	</div>
	<div>
		<label for="description">Description</label>
		<textarea
			id="description"
			name="description"
			cols="30"
			rows="10"
			bind:value={description}
			on:change={(event) => (description = event.target.value)}
		/>
	</div>
	<div>
		<label for="inSeason">In Season</label>
		<input
			id="inSeason"
			name="inSeason"
			type="checkbox"
			bind:checked={inSeason}
			on:change={(event) => (inSeason = event.target.checked)}
		/>
	</div>
	<div>
		<label for="published">Published</label>
		<input
			id="published"
			type="checkbox"
			name="published"
			bind:checked={published}
			on:change={(event) => (published = event.target.checked)}
		/>
	</div>
	<div class="flex gap-4">
		{#if id}
			<form action="?/delete" method="POST">
				<input type="hidden" name="id" value={id} />
				<button type="submit" class="btn btn-sm variant-filled"> x </button>
			</form>
			<!-- <button
				type="button"
				on:click={() => {
					dispatch('delete', { id });
				}}
			>
				Delete
			</button> -->
		{/if}
		<button type="submit">Save</button>
	</div>
</form>
