import { fetchCategoriesAdmin, fetchClassificationAdmin } from '$lib/api';
import { clearEmpties } from '$lib/utilities';
import { error, redirect } from '@sveltejs/kit';

export async function load({ fetch, parent }) {
	const { account } = await parent();
	if (!account) {
		// throw redirect(303, '/');
	}

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
		groupedCategories: await classifiedCategories()
	};
}

export const actions: import('./$types').Actions = {
	create: async ({ request, fetch }) => {
		const data = await request.formData();

		const name = data.get('name') as string;
		const price = data.get('price') as unknown as string;
		const url = data.get('url') as unknown as URL;
		const status = data.get('status') === 'on' ? 'published' : 'draft';
		const images = data.getAll('image') as string[];
		const categories = data.getAll('category') as string[];

		try {
			const response = await fetch('/api/appwrite/admin/products/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, price, url, images, categories, status })
			});

			if (!response.ok) {
				return { success: false };
			}

			return { success: true };
		} catch (err) {
			if (err instanceof Error) {
				throw error(500, err.message);
			}

			throw error(500, 'unknown error');
		} finally {
			// handle loading state
		}
	}
};
