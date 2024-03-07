import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { PlaywrightCrawler, Configuration } from 'crawlee';
import * as cheerio from 'cheerio';
import { Query } from 'appwrite';
import { databases } from '$lib/api';

Configuration.set('headless', false);

const { OPENAI_API_KEY } = env;

// Add the plugin to playwright (any number of plugins can be added)
// chromium.use(stealth());

export const POST = async ({ request }) => {
	const { value } = await request.json();

	// crawleeFunc(url)
	const data = await cheerioFunc(value);

	console.log(data);

	if (!data) {
		throw error(400, 'failed to scrape');
	}

	// return json({ name, images, url: value, price });
};

async function extractProductDetails(product: any) {
	const CATEGORIES_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
	const CATEGORIES_COLLECTION_ID = '6589d4bd233af9b6def4'; // Replace with your collection ID
	const response = await databases.listDocuments(CATEGORIES_DATABASE_ID, CATEGORIES_COLLECTION_ID, [
		Query.limit(1000)
	]);

	const categories = response.documents.map((document) => document.name);

	try {
		const request = await fetch(
			'https://api.deepinfra.com/v1/inference/meta-llama/Llama-2-7b-chat-hf',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${OPENAI_API_KEY}`
				},
				body: JSON.stringify({
					input: {
						system_prompt: 'You are a product a product expert',
						prompt: `Analyse the given product data and select and return the most appropriate categories that match from the given category list. Your output should only be the categories that match and no other text.\n\n
						
						Category list: 
						${categories.join(', ')}\n\n

						Example output:
						['Cosplay', 'Clothing', 'Summer']
						
						Product data:
						Title: ${product.title}, Description: ${product.description}, Price: ${product.price}`
					},
					max_new_tokens: 128,
					temperature: 0
				})
			}
		);
		const requestJSON = await request.json();
		return requestJSON.results[0].generated_text.trim();
	} catch (error) {
		console.error(error);
		return 'Failed to generate categories';
	}
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

async function craweeFunc(url: string) {
	let name = '';
	let images: string[] | undefined = [];
	let price: RegExpMatchArray | string | null = '';
	// PlaywrightCrawler manages browsers and browser tabs.
	// You don't have to manually open and close them.
	// It also handles navigation (goto), errors and retries.
	const crawler = new PlaywrightCrawler({
		// Request handler gives you access to the currently
		// open page. Similar to the pure Playwright examples
		// above, we can use it to control the browser's page.
		requestHandler: async ({ page }) => {
			const waitForTitle = await page.waitForSelector('h1');

			name = await regenerateTitle((await waitForTitle.textContent()) as string);
			// const description =
			// 	(await page.$eval('#productDescription', (description) => description.textContent)) ?? null;
			// const image = await page.$eval('.a-dynamic-image', (image) => image.getAttribute('src'));
			const ogPrice = await page.$eval('.aok-offscreen', (price) => price.textContent?.trim());
			price = ogPrice ? matchPrice(ogPrice) : '';

			const altImages = await page.$('#altImages');
			images = await altImages?.$$eval('.imageThumbnail img', (images) => {
				const imageArray: string[] = [];
				images.map((image) => {
					if (image) {
						// const splitImage = (image.getAttribute('src') as string)?.split(/[.|,]/g);
						// const mainImage = splitImage[0];
						// if (splitImage.length === 2) {
						// 	imageArray.push(mainImage + '.' + splitImage[2]);
						// } else {
						// 	imageArray.push(mainImage + '.' + splitImage[1].split('.')[1]);
						// }
						imageArray.push(image.getAttribute('src') as string);
					}
				});
				return imageArray.map((image) => {
					return image.replace(/._.*_/, '');
				});
			});
		}
	});

	await crawler.run([query]);

	if (!name || !images) {
		throw error(400, 'failed to scrape');
	}

	return json({ name, images, url: query, price });
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
	// const price: string = $('#apex_desktop [class$="-offscreen"]').text().trim();
	const description = $('#productDescription').tcext().trim();
	const price = $('#apex_desktop [data-a-size="xl"] [aria-hidden="true"]').text().trim();
	const images: string[] = [];
	$('#altImages li').each((_, e) => {
		const imgSrc = $(e)?.find('img')?.attr('src')?.replace(/._.*_/, '');
		if (imgSrc) images.push(imgSrc);
	});

	return { name, description, price: getFirstPrice(price), images, categories };
}

async function cheerioFunc(url: string) {
	try {
		const html = await fetchHTML(url);
		const data = await extractData(html);
		const categories = await extractProductDetails(data);

		return { ...data, categories };
	} catch (error: unknown) {
		if (error instanceof Error) console.error(`Failed to crawl "${url}": ${error?.message}`);
	}
}

function getFirstPrice(text) {
	const regex = /£(\d+\.\d{2})/;
	const match = regex.exec(text);
	if (match) {
		return match[1];
	} else {
		return null;
	}
}
