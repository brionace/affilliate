import { fetchCategoriesAdmin, fetchClassificationAdmin } from '$lib/api';
import { clearEmpties } from '$lib/utilities';
import { error, redirect } from '@sveltejs/kit';

async function fetchProduct(fetch: typeof window.fetch, id: string) {
	try {
		const response = await fetch('/api/appwrite/admin/products/' + id);
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

export async function load({ fetch, params: { id }, parent }) {
	const { account } = await parent();
	if (!account) {
		// throw redirect(303, '/');
	}

	const product = await fetchProduct(fetch, id);
	const { data: categories, age } = await fetchCategoriesAdmin(fetch);

	async function classifiedCategories() {
		const { data } = await fetchClassificationAdmin(fetch);

		const groupedCategories: { [key: string]: any[] } = {};
		data.forEach((classification: { $id: any }) => {
			const { $id } = classification;
			groupedCategories[$id] = groupedCategories[$id] || [];
			groupedCategories[$id].push(
				...categories.filter(
					(category: { classification: { $id: any } }) => category.classification.$id === $id
				)
			);
		});

		return clearEmpties(groupedCategories);
	}

	return {
		product: product.data,
		groupedCategories: await classifiedCategories(),
		age
	};
}

export const actions: import('./$types').Actions = {
	update: async ({ fetch, request }) => {
		const data = await request.formData();

		const id = data.get('id') as string;
		const name = data.get('name') as string;
		const price = data.get('price') as unknown as string;
		const url = data.get('url') as unknown as URL;
		const status = data.get('status') === 'on' ? 'published' : 'draft';
		const images = data.getAll('image') as string[];
		const categories = data.getAll('category') as string[];

		const response = await fetch('/api/appwrite/admin/products/' + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, name, price, url, images, categories, status })
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

		const response = await fetch('/api/appwrite/admin/products/' + id, {
			method: 'DELETE'
		});

		if (!response.ok) {
			return { success: false };
			throw new Error(response.statusText);
		}

		return { success: true };
	}
};
