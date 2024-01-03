// import { fetchCategories, fetchCategory } from '$lib/api';

// export async function load({ fetch, params: { slug } }) {
// 	const categories = await fetchCategories(fetch);
// 	const { data } = await fetchCategory(fetch, slug);

// 	return {
// 		products: categories.data,
// 		category: data[0]
// 	};
// }

import { fetchProducts, fetchCategory } from '$lib/api';

export async function load({ fetch, params: { slug } }) {
	const products = await fetchProducts(fetch, slug);
	const category = await fetchCategory(fetch, slug);

	return {
		products: products.data,
		category: category.data[0]
	};
}
