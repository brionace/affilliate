import { error } from '@sveltejs/kit';
import { fetchCategories } from '$lib/utilities/fetch';

async function fetchProduct(fetch: typeof window.fetch, id: string) {
	try {
		const response = await fetch('/api/admin/products/' + id);
		const data = await response.json();
		
		if (!response.ok) {
			throw error(500, response.statusText);
		}

		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}
	}
}

export async function load({ fetch, params }) {
	const { id } = params;

	return {
		categories: await fetchCategories(fetch),
		product: await fetchProduct(fetch, id)
	};
}

export const actions: import('./$types').Actions = {
	update: async ({ fetch, request }) => {
		const data = await request.formData();

		const id = data.get('id') as string;
		const name = data.get('name') as string;
		const price = data.get('price') as string;
		const url = data.get('url') as string;
		const published = data.get('published') === 'on';
		const images = JSON.stringify(data.getAll('image'));
		const category = JSON.stringify([...data.getAll('category'), ...data.getAll('tags')]);

		const response = await fetch('/api/admin/products/' + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, name, images, price, category, url, published })
		});

		if (!response.ok) {
			return { success: false };
			throw new Error(response.statusText);
		}

		return { success: true };
	},
	delete: async ({ fetch, request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		console.log(id);
		const response = await fetch('/api/admin/products/' + id, {
			method: 'DELETE'
		});

		if (!response.ok) {
			return { success: false };
			throw new Error(response.statusText);
		}

		return { success: true };
	}
};
