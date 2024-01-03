import { getProduct } from '$lib/db/products';

export async function load({ params: { id } }) {
	return {
		product: await getProduct(id)
	};
}
