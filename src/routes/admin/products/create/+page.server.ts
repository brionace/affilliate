import { fetchCategories } from '$lib/utilities/fetch';

export async function load({ fetch }) {
	return {
		categories: await fetchCategories(fetch)
	};
}

export const actions: import('./$types').Actions = {
	create: async ({ fetch, request }) => {
		const data = await request.formData();

		const name = data.get('name') as string;
		const price = data.get('price') as string;
		const url = data.get('url') as string;
		const published = data.get('published') === 'on';
		const images = JSON.stringify(data.getAll('image'));
		const category = JSON.stringify([...data.getAll('category'), ...data.getAll('tags')]);

		const response = await fetch('/api/admin/products/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, images, price, category, url, published })
		});

		if (!response.ok) {
			return { success: false };
			throw new Error(response.statusText);
		}

		return { success: true };
	}
};
