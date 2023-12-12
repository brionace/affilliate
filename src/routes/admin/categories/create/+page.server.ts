export const actions: import('./$types').Actions = {
	create: async ({ fetch, request }) => {
		const data = await request.formData();

		const name = data.get('name') as string;
		const slug = data.get('slug') as string;
		const description = data.get('description') as string;
		const published = data.get('published') === 'on';
		const inSeason = data.get('inSeason') === 'on';

		const response = await fetch('/api/admin/categories/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, description, slug, inSeason, published })
		});

		console.log(response.ok, response.statusText, response.status);

		if (!response.ok) {
			return { success: false };
			throw new Error(response.statusText);
		}

		return { success: true };
	}
};
