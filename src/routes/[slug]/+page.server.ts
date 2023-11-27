import { fetchCategories, fetchCategory, fetchProducts, fetchProduct } from '$lib/fetch';

export async function load({ fetch, params }) {
	const { slug } = params;

	if (!isNaN(parseInt(slug))) {
		const id = slug;
		return {
			product: await fetchProduct(fetch, id),
			categories: await fetchCategories(fetch)
		};
	}

	return {
		products: await fetchProducts(fetch, slug),
		categories: await fetchCategories(fetch),
		category: await fetchCategory(fetch, slug)
	};
}
