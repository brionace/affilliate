import { error, fail } from '@sveltejs/kit';

export async function fetchProducts(fetch: typeof window.fetch, slug?: string) {
	if (!slug) {
		try {
			const response = await fetch('/api/products');
			const data = await response.json();

			if (response.ok) {
				return data;
			}

			return fail(500, { message: response.statusText });
		} catch (err) {
			if (err instanceof Error) {
				throw error(500, err.message);
			}

			throw error(500, 'unknown error');
		}
	}

	try {
		const response = await fetch('/api/products/categories', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ slug })
		});
		const data = await response.json();

		if (response.ok) {
			return data;
		}

		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}

		throw error(500, 'unknown error');
	}
}

export async function fetchCategories(fetch: typeof window.fetch) {
	try {
		const response = await fetch('/api/categories');
		const data = await response.json();
		if (response.ok) {
			return data;
		}
		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}
		throw error(500, 'unknown error');
	}
}

export async function fetchCategory(fetch: typeof window.fetch, slug: string) {
	try {
		const response = await fetch('/api/category', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ slug })
		});
		const data = await response.json();
		if (response.ok) {
			return data;
		}
		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}
		throw error(500, 'unknown error');
	}
}

export async function fetchProduct(fetch: typeof window.fetch, id: string) {
	try {
		const response = await fetch('/api/product', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});
		const data = await response.json();
		if (response.ok) {
			return data;
		}
		return fail(500, { message: response.statusText });
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}
		throw error(500, 'unknown error');
	}
}
