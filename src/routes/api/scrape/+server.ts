// import { chromium } from '@playwright/test';
// import { chromium, firefox } from 'playwright-extra';
// import stealth from 'puppeteer-extra-plugin-stealth';
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { PlaywrightCrawler, Configuration } from 'crawlee';
import * as cheerio from 'cheerio';

Configuration.set('headless', false);

const { OPENAI_API_KEY } = env;

// Add the plugin to playwright (any number of plugins can be added)
// chromium.use(stealth());

// const userAgentStrings = [
// 	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.2227.0 Safari/537.36',
// 	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
// 	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.3497.92 Safari/537.36',
// 	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
// ];

export const POST = async ({ request }) => {
	const { value } = await request.json();

	// crawleeFunc(url)
	const { name, images, price } = await cheerioFunc(value);

	// Launch Chromium browser instance
	// const browser = await chromium.launch();
	// const browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });

	// // Create a new browser context with a randomly selected user agent string
	// // const context = await browser.newContext({
	// // 	userAgent: userAgentStrings[Math.floor(Math.random() * userAgentStrings.length)]
	// // });
	// // const context = await browser.newContext();
	// const context = await browser.newContext({ viewport: null });

	// // Create a new page in the browser context and navigate to target URL
	// const page = await context.newPage();
	// await page.goto(url);

	// const waitForTitle = await page.waitForSelector('h1#title');

	// const name = await regenerateTitle((await waitForTitle.textContent()) as string);
	// // const description =
	// // 	(await page.$eval('#productDescription', (description) => description.textContent)) ?? null;
	// // const image = await page.$eval('.a-dynamic-image', (image) => image.getAttribute('src'));
	// const ogPrice = await page.$eval('.aok-offscreen', (price) => price.textContent?.trim());
	// const price = ogPrice ? matchPrice(ogPrice) : '';

	// const altImages = await page.$('#altImages');
	// const images = await altImages?.$$eval('.imageThumbnail img', (images) => {
	// 	const imageArray: string[] = [];
	// 	images.map((image) => {
	// 		if (image) {
	// 			// const splitImage = (image.getAttribute('src') as string)?.split(/[.|,]/g);
	// 			// const mainImage = splitImage[0];
	// 			// if (splitImage.length === 2) {
	// 			// 	imageArray.push(mainImage + '.' + splitImage[2]);
	// 			// } else {
	// 			// 	imageArray.push(mainImage + '.' + splitImage[1].split('.')[1]);
	// 			// }
	// 			imageArray.push(image.getAttribute('src') as string);
	// 		}
	// 	});
	// 	return imageArray.map((image) => {
	// 		return image.replace(/._.*_/, '');
	// 	});
	// });

	// await context.close();
	// await page.close();
	// await browser.close();

	if (!name || !images) {
		throw error(400, 'failed to scrape');
	}

	return json({ name, images, url: value, price });
};

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
	const price = $('#apex_desktop [data-a-size="xl"] [aria-hidden="true"]').text().trim();
	const images: string[] = [];
	$('#altImages li').each((_, e) => {
		const imgSrc = $(e)?.find('img')?.attr('src')?.replace(/._.*_/, '');
		if (imgSrc) images.push(imgSrc);
	});

	return { name, price: getFirstPrice(price), images };
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

function getFirstPrice(text) {
	const regex = /£(\d+\.\d{2})/;
	const match = regex.exec(text);
	if (match) {
		return match[1];
	} else {
		return null;
	}
}
