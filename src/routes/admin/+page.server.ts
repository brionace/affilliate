import { fetchCategories } from '$lib/fetch';

export async function load({ fetch }) {
	return {
		categories: await fetchCategories(fetch)
	};
}
