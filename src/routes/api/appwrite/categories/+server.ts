import { json, error } from '@sveltejs/kit';
import { Query } from 'appwrite';
import { databases } from '$lib/api';

const CATEGORIES_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
const CATEGORIES_COLLECTION_ID = '6589d4bd233af9b6def4'; // Replace with your collection ID

export const GET = async () => {
	const response = await databases.listDocuments(CATEGORIES_DATABASE_ID, CATEGORIES_COLLECTION_ID, [
		Query.orderDesc('$updatedAt')
	]);

	if (!response) {
		throw error(500, 'failed to get categories');
	}

	const categories = response.documents;
	const age = categories.filter((category) => category.classification.$id === 'age');

	return json({
		data: categories,
		age
	});
};
