import { json, error } from '@sveltejs/kit';
import { ID } from 'appwrite';
import { databases } from '$lib/api';

const PRODUCTS_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
const PRODUCTS_COLLECTION_ID = '6589ceb0749a435516e8'; // Replace with your collection ID

export const POST = async ({ request }) => {
	const { name, price, url, images, categories, status, rating } = await request.json();

	const data = await databases.createDocument(
		PRODUCTS_DATABASE_ID,
		PRODUCTS_COLLECTION_ID,
		ID.unique(),
		{
			name,
			price,
			url,
			images,
			categories,
			status,
			queriable: categories.toString(),
			rating
		}
	);

	if (!data) {
		throw error(400, 'failed to add to create product');
	}

	return json({ data });
};
