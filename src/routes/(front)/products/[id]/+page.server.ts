// import { getProduct } from '$lib/api';

export async function load({ params: { id } }) {
	return {
		product: 'await getProduct(id)'
	};
}
