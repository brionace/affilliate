import { error, fail } from '@sveltejs/kit';
// import { createEventDispatcher } from 'svelte';

// const dispatch = createEventDispatcher();

export async function fetchProducts(fetch: typeof window.fetch) {
	try {
		const response = await fetch(`/api/products`);
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
	} finally {
		// handle loading state
	}
}

export async function fetchProductsInCategory(fetch: typeof window.fetch, slug: string) {
	try {
		const response = await fetch(`/api/products/incategory/${slug}`);
		const data = await response.json();

		if (!response.ok) {
			return fail(500, { message: response.statusText });
		}

		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}

		throw error(500, 'unknown error');
	} finally {
		// handle loading state
	}
}

export async function fetchCategories(fetch: typeof window.fetch) {
	try {
		const response = await fetch('/api/categories');
		const data = await response.json();

		if (!response.ok) {
			return fail(500, { message: response.statusText });
		}

		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}
	}
}

export async function fetchCategory(fetch: typeof window.fetch, id: string) {
	try {
		const response = await fetch('/api/categories/' + id);
		const data = await response.json();

		if (!response.ok) {
			throw error(500, response.statusText);
		}

		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}
		throw error(500, 'unknown error');
	}
}

export async function fetchProduct(fetch: typeof window.fetch, id: string) {
	try {
		const response = await fetch('/api/products/' + id);
		const data = await response.json();
		if (!response.ok) {
			return fail(500, { message: response.statusText });
		}

		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw error(500, err.message);
		}
	}
}
