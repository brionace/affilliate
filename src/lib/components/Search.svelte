<script lang="ts">
	import { products } from '$lib/utilities/store';
	import { error } from '@sveltejs/kit';
	import * as cheerio from 'cheerio';
	import { writable } from 'svelte/store';

	const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY;

	// const products = writable(JSON.parse(localStorage.getItem('products')));
	// products.subscribe((value) => (localStorage.products = JSON.stringify(value)));

	// @ts-ignore
	async function handleSearch(event) {
		const target = event.target.query;
		const parsedProducts: string[] = JSON.parse(localStorage.getItem('products') as any);

		if (parsedProducts.length > 0) {
			target.value = '';
			await parseAndSave(parsedProducts);
			return;
		}

		const value = target.value;

		// if (isValidUrl(value)) {
		try {
			// Remove value from input
			target.value = '';

			const response = await fetch('/api/scrape/4.0', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ value })
			});

			const data = await response.json();

			// Save to local storage
			products.set(data.searchLinks);

			const parsedProducts: string[] = JSON.parse(localStorage.getItem('products') as any);
			await parseAndSave(parsedProducts);

			// product.set(JSON.stringify({ name, images, url, price }));
			// target.value = '';
			// window.location.href = '/doli/products/new';
		} catch (error) {
			console.error(error);
			return 'unsuccesful response';
		}

		// try {
		// 	const result = await cheerioFunc(value);

		// 	if (!result?.name || !result?.images) {
		// 		throw error(400, 'failed to scrape');
		// 	}

		// 	product.set(
		// 		JSON.stringify({
		// 			name: result.name,
		// 			images: result.images,
		// 			url: value,
		// 			price: result.price
		// 		})
		// 	);

		// 	target.value = '';
		// 	window.location.reload();
		// } catch (error) {
		// 	console.error(error);
		// 	return 'unsuccesful response';
		// }
		// }
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

	async function regenerateTitle(title: string) {
		try {
			const request = await fetch(
				'https://api.deepinfra.com/v1/inference/codellama/CodeLlama-34b-Instruct-hf',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${OPENAI_API_KEY}`
					},
					body: JSON.stringify({
						input: `{{#system~}}Acting as a product expert, Rewrite the following title to be more friendly and helpful. You must only return the rewritten title. You must return the text without any quotes.\n\n{{~/system}}
					[INST]${title.trim()}[/INST]`,
						max_new_tokens: 128,
						temperature: 0
					})
				}
			);
			const requestJSON = await request.json();
			return await requestJSON.results[0].generated_text.trim();
		} catch (error) {
			console.error(error);
			return 'Failed to generate title';
		}
	}

	function matchPrice(text: string) {
		// TODO add dynamic currency
		return text.match('/£d+(?:.d+)?/');
	}

	async function fetchHTML(url: string) {
		const response = await fetch(url);
		return await response.text();
	}

	async function extractData(html: string) {
		const $ = cheerio.load(html);

		const title = await regenerateTitle($('h1').text());
		const name: string = title.replace(/["]+/g, '').trim();
		// const price: string = `${$('.a-price-symbol').text()}  ${$('.a-price-whole').text()}  ${$(
		// 	'.a-price-fraction'
		// ).text()}`;
		const price: string = $('#apex_desktop [class$="-offscreen"]').text().trim();
		const images: string[] = [];
		$('#altImages li').each((_, e) => {
			const imgSrc = $(e)?.find('img')?.attr('src')?.replace(/._.*_/, '');
			if (imgSrc) images.push(imgSrc);
		});

		return { name, price, images };
	}

	async function cheerioFunc(url: string) {
		try {
			const html = await fetchHTML(url);
			const data = await extractData(html);

			return data;
		} catch (error: unknown) {
			if (error instanceof Error) console.error(`Failed to crawl "${url}": ${error?.message}`);
		}
	}

	async function saveToDB(url: string) {
		try {
			const response = await fetch('/api/scrape/4.0/scraped', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ url })
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.error(error);
			return 'unsuccesful response';
		}
	}

	async function parseAndSave(parsedProducts: string[]) {
		const saved = await saveToDB(parsedProducts[0]);
		const saved1 = await saveToDB(parsedProducts[1]);
		const saved2 = await saveToDB(parsedProducts[2]);
		console.log({ saved, saved1, saved2 });
		// parsedProducts.forEach(async (product) => {
		// 	const saved = await saveToDB(product);
		// 	console.log({ saved });
		// });
	}
</script>

<form on:submit|preventDefault={handleSearch} method="POST">
	<div class="flex gap-1">
		<input type="text" name="query" class="input" placeholder="Enter search or url" />
		<button type="submit" class="btn">+</button>
	</div>
</form>
