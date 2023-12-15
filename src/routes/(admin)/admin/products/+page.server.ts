import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	return {
		products: await fetchProducts(fetch)
	};
}

async function fetchProducts(fetch: typeof window.fetch) {
	try {
		const response = await fetch('/api/admin/products');
		const data = await response.json();

		if (!response.ok) {
			throw error(500, response.statusText);
		}

		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}
	}
}
