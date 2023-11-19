<script>
	import { product } from '$lib/store';
	import { error } from '@sveltejs/kit';

	// @ts-ignore
	async function search(event) {
		const target = event.target.query;
		const query = target.value;

		if (isValidUrl(query)) {
			const response = await fetch('/api/scrape', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ query })
			});

			if (!response.ok) {
				console.error(response);
				throw error(500, 'unsuccesful response');
			}

			const data = await response.json();
			const { name, images, url, price } = data;

			if (!name || !images) {
				throw error(500, 'unsuccesful response');
			}

			product.set(JSON.stringify({ name: name.replace(/['"]+/g, ''), images, url, price }));
			target.value = '';
			window.location.reload();
		}
	}

	// @ts-ignore
	export function isValidUrl(urlString) {
		const urlPattern = new RegExp(
			'^(https?:\\/\\/)?' + // validate protocol
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
				'((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
				'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
				'(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
				'(\\#[-a-z\\d_]*)?$',
			'i'
		); // validate fragment locator
		return !!urlPattern.test(urlString);
	}
</script>

<form on:submit|preventDefault={search} method="POST">
	<div class="flex gap-1">
		<input type="text" name="query" class="input" placeholder="Search a product or Enter a URL" />
		<button type="submit" class="btn">Search</button>
	</div>
</form>
