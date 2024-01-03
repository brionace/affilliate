import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch, parent }) {
	const { account } = await parent();
	if (!account) {
		// throw redirect(303, '/');
	}

	const { data } = await fetchProducts(fetch);

	return {
		products: data
	};
}

async function fetchProducts(fetch: typeof window.fetch) {
	try {
		const response = await fetch('/api/appwrite/admin/products');
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
