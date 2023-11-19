import { fetchCategories, fetchCategory, fetchProducts } from '$lib/fetch';

export async function load({ fetch, params }) {
	const { slug } = params;
	return {
		products: await fetchProducts(fetch, slug),
		categories: await fetchCategories(fetch),
		category: await fetchCategory(fetch, slug)
	};
}
