import { fetchCategories, fetchProducts, fetchClassification, fetchInspiration } from '$lib/api';
import { clearEmpties } from '$lib/utilities';

export async function load({ fetch }) {
	const products = await fetchProducts(fetch);
	const { data: categories, age } = await fetchCategories(fetch);

	async function classifiedCategories() {
		const { data } = await fetchClassification(fetch);

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
		products: products.data,
		groupedCategories: await classifiedCategories(),
		categories,
		age,
		inspiration: await fetchInspiration(fetch)
	};
}
