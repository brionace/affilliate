import { error, fail } from '@sveltejs/kit';
import { Client as C, Account, Query, type Models } from 'appwrite';
import { Client, Databases } from 'node-appwrite';
import {
	APPWRITE_ENDPOINT,
	APPWRITE_PROJECT_ID,
	APPWRITE_API_KEY,
	OPENAI_API_KEY
} from '$env/static/private';
import type { StringDecoder } from 'string_decoder';

const client = new Client();

const c = new C();
c.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

if (import.meta.env.DEV) {
	client
		.setEndpoint(APPWRITE_ENDPOINT)
		.setProject(APPWRITE_PROJECT_ID)
		.setKey(APPWRITE_API_KEY)
		.setSelfSigned();
} else {
	client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID).setKey(APPWRITE_API_KEY);
}

export const account = new Account(c);

export const databases = new Databases(client);

export async function fetchProducts(fetch: typeof window.fetch, category?: string) {
	try {
		const response = await fetch(`/api/appwrite/products?category=${category}`);
		const data = await response.json();

		if (response.ok) {
			return data;
		}

		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}

		throw error(500, 'unknown error');
	} finally {
		// handle loading state
	}
}

export async function fetchProductsInCategory(fetch: typeof window.fetch, slug: string) {
	try {
		const response = await fetch(`/api/appwrite/products/category/${slug}`);
		const data = await response.json();

		if (response.ok) {
			return data;
		}

		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}

		throw error(500, 'unknown error');
	} finally {
		// handle loading state
	}
}

export async function fetchCategories(fetch: typeof window.fetch) {
	try {
		const response = await fetch(`/api/appwrite/categories`);
		const data = await response.json();

		if (response.ok) {
			return data;
		}

		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}

		throw error(500, 'unknown error');
	} finally {
		// handle loading state
	}
}

export async function fetchCategoriesAdmin(fetch: typeof window.fetch) {
	try {
		const response = await fetch(`/api/appwrite/admin/categories`);
		const data = await response.json();

		if (response.ok) {
			return data;
		}

		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}

		throw error(500, 'unknown error');
	} finally {
		// handle loading state
	}
}

export async function fetchCategory(fetch: typeof window.fetch, slug: string) {
	try {
		const response = await fetch(`/api/appwrite/categories/${slug}`);
		const data = await response.json();

		if (response.ok) {
			return data;
		}

		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}

		throw error(500, 'unknown error');
	} finally {
		// handle loading state
	}
}

export async function fetchClassification(fetch: typeof window.fetch) {
	try {
		const response = await fetch(`/api/appwrite/classification`);
		const data = await response.json();

		if (response.ok) {
			return data;
		}

		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}

		throw error(500, 'unknown error');
	} finally {
		// handle loading state
	}
}

export async function fetchClassificationAdmin(fetch: typeof window.fetch) {
	try {
		const response = await fetch(`/api/appwrite/admin/classification`);
		const data = await response.json();

		if (response.ok) {
			return data;
		}

		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}

		throw error(500, 'unknown error');
	} finally {
		// handle loading state
	}
}

export async function fetchInspirations(fetch: typeof window.fetch, deviceType?: string) {
	try {
		const response = await fetch(`/api/appwrite/inspiration`, {
			headers: {
				'User-Agent': deviceType ?? ''
			}
		});
		const data = await response.json();

		if (response.ok) {
			return data;
		}

		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}

		throw error(500, 'unknown error');
	} finally {
		// handle loading state
	}
}

export async function fetchInspiration(fetch: typeof window.fetch, id: string) {
	try {
		const response = await fetch(`/api/appwrite/inspiration/${id}`);
		const data = await response.json();

		if (response.ok) {
			return data;
		}

		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}

		throw error(500, 'unknown error');
	} finally {
		// handle loading state
	}
}

export async function generateCategories(product: { title: string; description: string }) {
	const CATEGORIES_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
	const CATEGORIES_COLLECTION_ID = '6589d4bd233af9b6def4'; // Replace with your collection ID
	const response = await databases.listDocuments(CATEGORIES_DATABASE_ID, CATEGORIES_COLLECTION_ID, [
		Query.limit(1000)
	]);

	const categories = response.documents.map((document: Models.Document) => document.name);

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
					[INST]Analyse the given Product Title and Product Description and return the most appropriate categories that match it best from the given Category List. Respond in the format provided.

					Product Title:\n
					${product.title}\n\n

					Product Description:\n
					${product.description}.\n\n

					Category List:\n
					${categories.join(', ')}\n\n

					Response Format:\n
					['Cosplay', 'Clothing', 'Summer', 'Comic Con']\n\n
					[/INST]
					`,
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
