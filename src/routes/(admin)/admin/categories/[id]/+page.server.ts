import { error } from '@sveltejs/kit';

async function fetchCategory(fetch: typeof window.fetch, id: string) {
	try {
		const response = await fetch('/api/admin/categories/' + id);
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
		category: await fetchCategory(fetch, id)
	};
}

export const actions: import('./$types').Actions = {
	update: async ({ fetch, request }) => {
		const data = await request.formData();

		const id = data.get('id') as string;
		const name = data.get('name') as string;
		const slug = data.get('slug') as string;
		const description = data.get('description') as string;
		const published = data.get('published') === 'on';
		const inSeason = data.get('inSeason') === 'on';

		console.log(published, inSeason);

		const response = await fetch('/api/admin/categories/' + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, name, description, slug, inSeason, published })
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

		const response = await fetch('/api/admin/categories/' + id, {
			method: 'DELETE'
		});

		if (!response.ok) {
			return { success: false };
			throw new Error(response.statusText);
		}

		return { success: true };
	}
};
