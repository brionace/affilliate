import { fetchCategories } from '$lib/utilities/fetch';
import { isValidUrl } from '$lib/utilities';

export async function load({ fetch }) {
	return {
		categories: await fetchCategories(fetch)
	};
}

export const actions: import('./$types').Actions = {
	add: async ({ fetch, request }) => {
		const data = await request.formData();
		const url = isValidUrl(data.get('url') as string) ? data.get('url') : null;

		try {
			const response: Response = await fetch('/api/scrape', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ url })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			return data;
		} catch (error) {
			console.error(error);
			return 'unsuccesful response';
		}
	}
};
