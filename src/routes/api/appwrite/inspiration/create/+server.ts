import { json, error } from '@sveltejs/kit';
import { ID } from 'appwrite';
import { databases } from '$lib/api';

const PRODUCTS_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
const PRODUCTS_COLLECTION_ID = '6589fea66c02c2ea13c7'; // Replace with your collection ID

export const POST = async ({ request }) => {
	const { categories, meta } = await request.json();

	const data = await databases.createDocument(
		PRODUCTS_DATABASE_ID,
		PRODUCTS_COLLECTION_ID,
		ID.unique(),
		{
			status: null,
			title: meta.title,
			description: meta.description,
			image: null,
			categories,
			tags: null,
		}
	);

	if (!data) {
		throw error(400, 'failed to add to create inspiration');
	}

	return json({ data });
};
