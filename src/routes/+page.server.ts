import { fetchCategories, fetchProducts } from '$lib/fetch';

export async function load({ fetch }) {
	return {
		products: await fetchProducts(fetch),
		categories: await fetchCategories(fetch)
	};
}
