import { json, error } from '@sveltejs/kit';
import { Query } from 'appwrite';
import { databases } from '$lib/api';

const PRODUCTS_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
const PRODUCTS_COLLECTION_ID = '6589ceb0749a435516e8'; // Replace with your collection ID

export const GET = async ({ params: { id } }) => {
	const data = await databases.getDocument(PRODUCTS_DATABASE_ID, PRODUCTS_COLLECTION_ID, id, [
		Query.select(['$id', 'name', 'price', 'url', 'images', 'categories'])
	]);

	if (!data) {
		throw error(500, 'failed to get product: ' + id);
	}

	return json({
		data
	});
};

export const PUT = async ({ request }) => {
	const { id, name, price, url, images, categories, status } = await request.json();

	const data = await databases.updateDocument(PRODUCTS_DATABASE_ID, PRODUCTS_COLLECTION_ID, id, {
		name,
		price,
		url,
		images,
		categories,
		status,
		queriable: categories.toString()
	});

	if (!data) {
		throw error(400, 'failed to update to create product: ' + id);
	}

	return json({ data });
};
