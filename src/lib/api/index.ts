import { error, fail } from '@sveltejs/kit';
import { Client as C, Account } from 'appwrite';
import { Client, Databases } from 'node-appwrite';
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY } from '$env/static/private';
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

export async function fetchInspirations(fetch: typeof window.fetch) {
	try {
		const response = await fetch(`/api/appwrite/inspiration`);
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
