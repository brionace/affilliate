import { fetchInspiration } from '$lib/api';

export async function load({ fetch, params: { id } }) {
	return {
		inspiration: await fetchInspiration(fetch, id)
	};
}
