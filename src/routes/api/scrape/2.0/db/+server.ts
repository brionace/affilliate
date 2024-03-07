import { chromium, type Page } from '@playwright/test';
// import { chromium, firefox } from 'playwright-extra';
// import stealth from 'puppeteer-extra-plugin-stealth';
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { PlaywrightCrawler, Configuration, LoggerText } from 'crawlee';
import * as cheerio from 'cheerio';
import { Query, type Models } from 'appwrite';
import { databases, generateCategories } from '$lib/api';
import { ID } from 'appwrite';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PRODUCTS_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
const PRODUCTS_COLLECTION_ID = '6589ceb0749a435516e8'; // Replace with your collection ID

Configuration.set('headless', false);

const { OPENAI_API_KEY, AMAZON_EMAIL, AMAZON_PASSWORD, AMAZON_ASSOCIATE_ID } = env;

// Add the plugin to playwright (any number of plugins can be added)
// chromium.use(stealth());

const userAgentStrings = [
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.2227.0 Safari/537.36',
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.3497.92 Safari/537.36',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
	'Mozilla/5.0 (compatible; U; ABrowse 0.6; Syllable) AppleWebKit/420+ (KHTML, like Gecko)',
	'Mozilla/5.0 (compatible; U; ABrowse 0.6; Syllable) AppleWebKit/420+ (KHTML, like Gecko)',
	'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; Acoo Browser 1.98.744; .NET CLR 3.5.30729)',
	'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; Acoo Browser 1.98.744; .NET CLR 3.5.30729)',
	'Mozilla/5.0 (X11; U; Linux; sk-SK) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2 (Change: 0 )',
	'Mozilla/5.0 (X11; U; Linux; nb-NO) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2 (Change: 0 )',
	'Mozilla/5.0 (X11; U; Linux; es-CR) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2 (Change: 0 )',
	'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2 (Change: 189 35c14e0)',
	'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2 (Change: 0 )',
	'Mozilla/5.0 (X11; U; Linux; de-DE) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2 (Change: 0 )',
	'Mozilla/5.0 (Windows; U; Windows NT 6.0; de-DE) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2',
	'Mozilla/5.0 (Windows; U; Windows NT 5.1; nl-NL) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2',
	'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2',
	'Mozilla/5.0 (Windows; U; Windows NT 5.1; de-CH) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2'
];

export const GET = async () => {
	const jsonFile = path.join(__dirname, 'data.json');

	if (!fs.existsSync(jsonFile)) {
		throw error(404, 'no file or data in json file');
	}

	const fileContents = fs.readFileSync(jsonFile, 'utf8');
	const urls = JSON.parse(fileContents);

	if (!Array.isArray(urls)) {
		throw new Error('File does not contain a list of URLs');
	}

	// Loop through the related links save them to db
	for (const url of urls) {
		const newUrl = url + '&tag=pardycat06-21';

		// Launch Chromium browser instance
		const browser = await chromium.launch();
		// const browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });

		// Create a new browser context with a randomly selected user agent string
		const context = await browser.newContext({
			userAgent: userAgentStrings[Math.floor(Math.random() * userAgentStrings.length)]
		});

		// Create a new page in the browser context and navigate to target URL
		const page = await context.newPage();

		await page.goto(url);
		// await page.waitForLoadState(); // wait for the page to load

		// If the product is already in the db, skip adding it
		// const inDb = await databases.listDocuments(PRODUCTS_DATABASE_ID, PRODUCTS_COLLECTION_ID, [
		// 	Query.equal('url', newUrl)
		// ]);

		// if (inDb.total > 0) {
		// 	console.log('Already in db, skipping.');
		// 	continue;
		// }

		const mainContentHTML = await page.$eval('body', (element) => element.innerHTML);
		const extractedData = await extractData(mainContentHTML);

		const { title, description, price, images, rating } = extractedData;

		const data = await databases.createDocument(
			PRODUCTS_DATABASE_ID,
			PRODUCTS_COLLECTION_ID,
			ID.unique(),
			{
				title,
				description,
				price,
				url: newUrl,
				images,
				status: 'published',
				rating
			}
		);

		if (!data) {
			throw error(400, 'failed to add to create product');
		}

		console.log('Added to db.');

		await context.close();
		await page.close();
		await browser.close();
	}

	fs.unlinkSync(jsonFile);

	return json({ data: 'success', message: 'URLs processed and JSON file deleted' });
};

// async function generateCategories(product: {title: string, description: string}) {
// 	const CATEGORIES_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
// 	const CATEGORIES_COLLECTION_ID = '6589d4bd233af9b6def4'; // Replace with your collection ID
// 	const response = await databases.listDocuments(CATEGORIES_DATABASE_ID, CATEGORIES_COLLECTION_ID, [
// 		Query.limit(1000)
// 	]);

// 	const categories = response.documents.map((document: Models.Document) => document.name);

// 	try {
// 		const request = await fetch(
// 			'https://api.deepinfra.com/v1/inference/meta-llama/Llama-2-7b-chat-hf',
// 			{
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Authorization: `Bearer ${OPENAI_API_KEY}`
// 				},
// 				body: JSON.stringify({
// 					input: `{{#system~}}You are a product a product expert{{~/system}}
// 					[INST]Analyse the given Product Title and Product Description and return the most appropriate categories that match it best from the given Category List. Respond in the format provided.

// 					Product Title:\n
// 					${product.title}\n\n

// 					Product Description:\n
// 					${product.description}.\n\n

// 					Category List:\n
// 					${categories.join(', ')}\n\n

// 					Response Format:\n
// 					['Cosplay', 'Clothing', 'Summer', 'Comic Con']\n\n
// 					[/INST]
// 					`,
// 					max_new_tokens: 128,
// 					temperature: 0
// 				})
// 			}
// 		);
// 		const requestJSON = await request.json();
// 		return requestJSON.results[0].generated_text.trim();
// 	} catch (error) {
// 		console.error(error);
// 		return 'Failed to generate categories';
// 	}
// }

async function generateTags(product: any) {
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
					input: `{{#system~}}You are a product a product expert{{~/system}}
					[INST]
					Analyse the given Product Data then;\n
					
					1. Generate the most appropriate tags\n 
					3. Use the Example Output as the output format.\n\n

					Product Data:\n
					${product.title}, ${product.description}.\n\n

					Category List:\n
					${categories.join(', ')}\n\n

					Example Output:\n
					['Accessories', 'Summer Clothing', 'Beachwear', 'Swimwear', 'Swimsuit']
					[/INST]`,
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

async function extractData(html: string) {
	const $ = cheerio.load(html);

	const title = $('#productTitle').text().trim();
	const price = $('#apex_desktop [data-a-size="xl"] [aria-hidden="true"]').text().trim();
	const rating = $('#acrPopover').attr('title')?.replace('out of 5 stars', '');
	const images = [$('#landingImage').attr('src')];
	const description = $('#productDescription').text().trim();

	// const generatedCategories = await generateCategories({ title, description });

	// // Categories and Tags look like this:
	// // CATEGORIES: ['Cosplay', 'Clothing', 'Summer']\n\n
	// // TAGS: ['Accessories', 'Summer Clothing', 'Beachwear', 'Swimwear', 'Swimsuit']
	// // Write a function to extract categories and tags from the extractedCategories string
	// // const categories = generatedCategories.match(/CATEGORIES: \[.*?\]/g);
	// // const tags = generatedCategories.match(/TAGS: \[.*?\]/g);

	// const regex = /\[.*?\]/g;
	// const match = generatedCategories.match(regex);
	// const categoriesArray = match ? match[0].slice(2, -2).split("', '") : [];

	// return { title, description, price, images, rating: Number(rating), categories: categoriesArray };
	return { title, description, price, images, rating: Number(rating) };
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
