<script async script lang="ts">
	import { clearEmpties } from '$lib/utilities';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	// import { createEventDispatcher } from 'svelte';

	export let data;

	const grouped = data.groupedCategories;
	const age = data.age;

	grouped['meta'] = { title: '', description: '' };

	let currentStep = 1;
	let steps = Object.keys(grouped).length;

	let skipped: string[] = [];
	let lockedState = true;
	const optionGroups = ['event', 'gender', 'age'];

	const formData = { ...grouped };

	for (let key in formData) {
		if (key === 'meta') {
			continue;
		}

		if (optionGroups.includes(key)) {
			formData[key] = '';
		} else {
			formData[key] = [];
		}
	}

	async function handleSubmit() {
		const meta = formData.meta;

		if (!meta.title) {
			console.log('title is required');
			return;
		}

		if (!meta.description) {
			console.log('description is required');
			return;
		}

		// Lock the form
		lockedState = true;

		delete formData.meta;

		const categories = flattenFormData(clearEmpties(formData));

		try {
			const response = await fetch('/api/appwrite/inspiration/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ categories, meta })
			});

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	function handleChange(e) {
		const { name } = e.target;
		const skip = document.getElementById('skip');
		if (skip?.checked) {
			skip.checked = false;
		}

		if (skipped.includes(name)) {
			skipped = skipped.filter((cat) => cat !== name);
		}

		handleValidation();
	}

	function handleValidation() {
		// Get the key for the current step
		let key = Object.keys(formData)[currentStep - 1];

		if (key === 'meta') {
			lockedState = false;
		} else if (formData[key] || skipped.includes(key)) {
			lockedState = false;
		} else {
			lockedState = true;
		}
	}

	const handleProgress = async (stepIncrement: number) => {
		if (stepIncrement == 1) {
			if (currentStep === steps) {
				handleSubmit();
				return;
			}
			currentStep++;
		} else {
			if (currentStep === 1) {
				return;
			}
			currentStep--;
		}
	};

	const handleSkip = (e) => {
		const { value } = e.target;

		// Remove the value from the formData
		if (optionGroups.includes(value)) {
			formData[value] = '';
		} else {
			formData[value] = [];
		}

		// Uncheck all the checkboxes
		const checkboxes = document.querySelectorAll(`input[name="${value}"]`);
		checkboxes.forEach((checkbox) => {
			checkbox.checked = false;
		});

		// Remove or Add the value from the skipped array
		// if (skipped.includes(value)) {
		// 	skipped = skipped.filter((cat) => cat !== value);
		// } else {
		// 	skipped = [...skipped, value];
		// }

		handleValidation();
	};

	function handleTitle(title: string) {
		let newTitle = title;

		if (title === 'meta') {
			newTitle = 'Configure';
		}

		return newTitle.toUpperCase();
	}

	function flattenFormData(formData) {
		// Convert all non-array values to arrays
		const values = Object.values(formData).map((value) => (Array.isArray(value) ? value : [value]));

		// Flatten the array of arrays into a single array
		return values.flat();
	}
</script>

<div class="relative w-full max-w-[700px] h-[90vh] bg-white rounded-lg overflow-hidden">
	<ProgressBar label="Progress Bar" value={currentStep} max={steps} />

	<div class="p-6 overflow-auto">
		<form on:submit|preventDefault={handleSubmit}>
			{#each Object.entries(grouped) as cat, i}
				{#if currentStep == i + 1}
					<div class="flex justify-between items-center gap-3 mb-4">
						<h2>{handleTitle(cat[0])}</h2>
						<div class="flex gap-3">
							<div>
								<button class="btn" on:click={() => handleProgress(-1)} disabled={currentStep == 1}
									>Prev</button
								>
								<button class="btn" on:click={() => handleProgress(+1)} disabled={lockedState}
									>Next</button
								>
							</div>
						</div>
					</div>
					{#if optionGroups.includes(cat[0])}
						{#if cat[0] !== 'event'}
							<div class="flex gap-4 sticky top-0 mb-4">
								<div class="flex flex-row-reverse gap-1 items-center justify-end">
									<label for="skip">Skip</label>
									<input
										bind:group={skipped}
										on:change={handleSkip}
										type="checkbox"
										id="skip"
										value={cat[0]}
									/>
								</div>
							</div>
						{/if}
						{#if cat[0] === 'event'}
							{#each cat[1] as category}
								<div class="flex flex-row-reverse gap-1 items-center justify-end">
									<label for={category.slug}>{category.name}</label>
									<input
										type="radio"
										id={category.slug}
										name={cat[0]}
										value={category.slug}
										bind:group={formData.event}
										on:change={(event) => {
											handleChange(event);
										}}
									/>
								</div>
							{/each}
						{/if}
						{#if cat[0] === 'gender'}
							{#each cat[1] as category}
								<div class="flex flex-row-reverse gap-1 items-center justify-end">
									<label for={category.slug}>{category.name}</label>
									<input
										type="radio"
										id={category.slug}
										name={cat[0]}
										value={category.slug}
										bind:group={formData.gender}
										on:change={(event) => {
											handleChange(event);
										}}
									/>
								</div>
							{/each}
						{/if}
						{#if cat[0] === 'age'}
							{#each age as age}
								<div class="flex flex-row-reverse gap-1 items-center justify-end">
									<label for={age.slug}>{age.name.toUpperCase()}</label>
									<input
										type="radio"
										id={age.slug}
										name={cat[0]}
										value={age.slug}
										bind:group={formData.age}
										on:change={(event) => {
											handleChange(event);
										}}
									/>
								</div>
							{/each}
						{/if}
					{:else if cat[0] === 'meta'}
						<div>
							<label for="title">Title</label>
							<div class="flex">
								<input
									id="title"
									placeholder="John's 50th"
									bind:value={formData.meta.title}
									required
								/>
							</div>
						</div>
						<div>
							<label for="description">Description</label>
							<div class="flex">
								<textarea
									id="description"
									placeholder="John's 50th"
									bind:value={formData.meta.description}
									required
								/>
							</div>
						</div>
					{:else}
						<!-- <div class="flex gap-4 sticky top-0 mb-4">
							<div class="flex flex-row-reverse gap-1 items-center justify-end">
								<label for="skip">Skip</label>
								<input
									bind:group={skipped}
									on:change={handleSkip}
									type="checkbox"
									id="skip"
									value={cat[0]}
								/>
							</div>
						</div> -->
						{#each cat[1] as category}
							<div class="flex flex-row-reverse gap-1 items-center justify-end">
								<label for={category.slug}>{category.name}</label>
								<input
									type="checkbox"
									id={category.slug}
									value={category.slug}
									name={cat[0]}
									bind:group={formData[cat[0]]}
									on:change={(event) => {
										handleChange(event);
									}}
								/>
							</div>
						{/each}
					{/if}
					{void handleValidation() ?? ''}
				{/if}
			{/each}
		</form>
	</div>
</div>
