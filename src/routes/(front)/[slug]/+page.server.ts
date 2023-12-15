import { fetchProductsInCategory, fetchProduct } from '$lib/utilities/fetch';

export async function load({ fetch, params: { slug } }) {
	if (isNaN(parseInt(slug))) {
		return {
			products: await fetchProductsInCategory(fetch, slug)
		};
	}

	return {
		product: await fetchProduct(fetch, slug)
	};
}
