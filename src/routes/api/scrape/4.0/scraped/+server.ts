import { chromium } from '@playwright/test';
import { json, error as sveltError } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import * as cheerio from 'cheerio';
// import { Query, type Models } from 'appwrite';
// import { databases, generateCategories } from '$lib/api';
// import { ID } from 'appwrite';
import interest from '$lib/db/interest.json';
import whoFor from '$lib/db/who-for.json';
import occasion from '$lib/db/occasion.json';
import { supabase } from '$lib/supabaseClient';

const { OPENAI_API_KEY } = env;

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

export const POST = async ({ request }) => {
	const { url } = await request.json();
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

	const mainContentHTML = await page.$eval('body', (element) => element.innerHTML);
	const extractedData = await extractData(mainContentHTML);

	const { title, description, price, images, rating } = extractedData;

	const tags = await generateTags(title, description);

	console.log(tags);
	return json({ tags });

	const { error } = await supabase
		.from('products')
		.insert({ title, description, price, images, rating, url: url + '&tag=pardycat06-21', tags });

	if (error) {
		throw sveltError(400, 'failed to add to db');
	}

	await context.close();
	await page.close();
	await browser.close();

	return json({ data: 'success', message: 'product added to db' });
};

async function generateTags(title: string, description: string) {
	const whoForId = whoFor.map((o) => o.category);
	const interestId = interest.map((o) => o.plural);
	const occasionId = occasion.map((o) => o.plural);
	// const categories = [...whoForId, ...interestPlural, ...occasionPlural];

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
					input: `{{#system~}}You are a products classification expert.\n 
					Select the most suitable category or categories from the provided list 
					for the given product title and description:\n

					Categories List: ${[...whoForId, ...interestId, ...occasionId]}\n
					
					In addition:\n
					If the product indicates it's primarily for pets, choose "Pet"\n
					If the product appears suitable for a specific age or ages, choose the most likely age or ages.\n
					Do not include an explanation behind your choices.\n
					Do not include any test before the answer.\n
					Do not make up any categories. You MUST only choose from the given list.\n

					Your answer should be in the following format: ["example1", "example2", "example3"]\n{{~/system}}
					[INST]
					Product Title: ${title}.\n 
					
					Product Description: ${description}.\n\n
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
