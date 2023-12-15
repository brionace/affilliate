import { fetchCategories, fetchProducts, fetchCategory } from '$lib/utilities/fetch';

export async function load({ fetch, params: { slug }, locals }) {
	return {
		products: await fetchProducts(fetch),
		categories: await fetchCategories(fetch),
		category: slug && isNaN(parseInt(slug)) ? await fetchCategory(fetch, slug) : null,
		user: locals.user
	};
}
