import { json, error } from '@sveltejs/kit';
import { Query } from 'appwrite';
import { databases } from '$lib/api';

const CLASSIFICATION_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
const CLASSIFICATION_COLLECTION_ID = '6589f8f659fe6e8b23c7'; // Replace with your collection ID

export const GET = async () => {
	const response = await databases.listDocuments(
		CLASSIFICATION_DATABASE_ID,
		CLASSIFICATION_COLLECTION_ID,
		[Query.limit(1000)]
	);

	if (!response) {
		throw error(500, 'failed to get classification');
	}

	const data = response.documents;

	return json({
		data
	});
};
