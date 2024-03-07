import { chromium } from '@playwright/test';
import { json, error } from '@sveltejs/kit';
import { Configuration } from 'crawlee';

Configuration.set('headless', false);

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
	const req = await request.json();

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

	await page.getByLabel('Search Amazon').fill(req.value);
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

	return json({ searchLinks });
};
