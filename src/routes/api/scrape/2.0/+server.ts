import { chromium, type Page } from '@playwright/test';
// import { chromium, firefox } from 'playwright-extra';
// import stealth from 'puppeteer-extra-plugin-stealth';
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { PlaywrightCrawler, Configuration, LoggerText } from 'crawlee';
import * as cheerio from 'cheerio';
import { Query } from 'appwrite';
import { databases } from '$lib/api';
import { ID } from 'appwrite';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

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

export const POST = async ({ request, fetch }) => {
	const req = await request.json();
	const startUrl = req.value;

	// Launch Chromium browser instance
	const browser = await chromium.launch();
	// const browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });

	// Create a new browser context with a randomly selected user agent string
	const context = await browser.newContext({
		userAgent: userAgentStrings[Math.floor(Math.random() * userAgentStrings.length)]
	});

	// Create a new page in the browser context and navigate to target URL
	const page = await context.newPage();

	await page.goto('https://www.amazon.co.uk/');

	await page.getByLabel('Search Amazon').fill(startUrl);
	const submitBtn = await page.$('#nav-search-submit-button');
	await submitBtn?.click();

	await page.waitForLoadState(); // wait for the page to load

	const searchLinks = await getSearchResultLinks();

	async function getSearchResultLinks() {
		const links = await page.$$eval('.a-section h2 a.a-link-normal', (links) =>
			links.map((link) => (link as HTMLAnchorElement).href)
		);

		// Check if there is a "next" button
		const nextButton = await page.$('a.s-pagination-next'); // replace '.next-button-selector' with the actual selector of the "next" button

		// If there is a "next" button, click it and call this function again
		if (nextButton) {
			await nextButton?.click();

			await page.waitForTimeout(1000);

			// Call this function again and add the new links to the existing links
			links.push(...(await getSearchResultLinks()));
		}

		// Finish
		return links;
	}

	await context.close();
	await page.close();
	await browser.close();

	if (!searchLinks) {
		throw error(400, 'failed to scrape, no search links found');
	}

	console.log(searchLinks);

	// Create an array of booleans indicating whether each link is in the database
	const isInDbArray = await Promise.all(
		searchLinks.map(async (link) => {
			const inDb = await databases.listDocuments(PRODUCTS_DATABASE_ID, PRODUCTS_COLLECTION_ID, [
				Query.equal('url', link)
			]);
			return inDb.total > 0; // return true if the link is in the database, false otherwise
		})
	);

	// Filter searchLinks using isInDbArray
	const linksNotInDb = searchLinks.filter((_, index) => !isInDbArray[index]);

	await saveToFile(linksNotInDb);

	const response = await fetch('/api/scrape/2.0/db');
	const data = await response.json(); // if the response is JSON

	return json({ data });
};

async function saveToFile(newLinks: string[]) {
	const jsonFile = path.join(__dirname, 'db', 'data.json');

	// Check if the db directory exists
	if (!fs.existsSync(path.dirname(jsonFile))) {
		// If it doesn't exist, create it
		fs.mkdirSync(path.dirname(jsonFile), { recursive: true });
	}

	// If links aready exist, just return////////////////////////////////
	const fileContents = fs.readFileSync(jsonFile, 'utf8');
	if (fileContents) {
		return;
	}

	const json = JSON.stringify(newLinks, null, 2);
	////////////////////////////////////////////////////////////////////

	// Write the JSON back to the file
	try {
		fs.writeFileSync(jsonFile, json, 'utf8');
		console.log('JSON file has been updated.');
	} catch (err) {
		console.error('An error occurred while writing the JSON file:', err);
		throw error(400, 'failed to save to file');
	}
}
