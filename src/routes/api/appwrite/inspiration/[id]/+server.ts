import { json, error } from '@sveltejs/kit';
import { Query } from 'appwrite';
import { databases } from '$lib/api';

const INSPIRATION_DATABASE_ID = '6589ce12827946d1cad7';
const INSPIRATION_COLLECTION_ID = '6589fea66c02c2ea13c7';
const PRODUCTS_COLLECTION_ID = '6589ceb0749a435516e8';

export const GET = async ({ params: { id } }) => {
	const response = await databases.getDocument(
		INSPIRATION_DATABASE_ID,
		INSPIRATION_COLLECTION_ID,
		id,
		[
			Query.equal('status', 'published'),
			Query.select(['$id', 'title', 'description', 'categories'])
		]
	);

	if (!response) {
		throw error(500, 'failed to get inspiration: ' + id);
	}

	async function getProducts() {
		const categoryQueries = [
			Query.orderDesc('$updatedAt'),
			Query.limit(10),
			Query.equal('status', 'published'),
			// Query.offset(0),
			Query.select(['images', 'title', 'price', 'url'])
		];

		response.categories.forEach((category: string) => {
			categoryQueries.push(Query.search('categories', category.toString()));
		});

		const res = await databases.listDocuments(
			INSPIRATION_DATABASE_ID,
			PRODUCTS_COLLECTION_ID,
			categoryQueries
		);

		if (!res) {
			throw error(500, 'failed to get categories in inspiration');
		}

		return { inspiration: response, products: res.documents, total: res.total };
	}

	// data.filter((item: any) => item.products.length > 0)

	return json({
		data: await getProducts()
	});
};
