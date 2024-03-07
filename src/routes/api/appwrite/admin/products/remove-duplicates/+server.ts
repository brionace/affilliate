import { json, error, fail } from '@sveltejs/kit';
import { Query } from 'appwrite';
import { databases } from '$lib/api';

const INSPIRATION_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
const PRODUCTS_COLLECTION_ID = '6589ceb0749a435516e8'; // Replace with your collection ID

export const GET = async () => {
	// Fetch all products
	let products = [];
	let offset = 0;
	let result;

	do {
		result = await databases.listDocuments(INSPIRATION_DATABASE_ID, PRODUCTS_COLLECTION_ID, [
			Query.offset(offset)
		]);
		products = [...products, ...result.documents];
		offset += result.documents.length;
	} while (result.documents.length > offset);

	// Identify duplicates
	let seen = new Set();
	let duplicates = new Set();

	products.forEach((product) => {
		const identifier = product.url; // Replace 'name' with the property you want to check for duplicates
		if (seen.has(identifier)) {
			duplicates.add(product.$id);
		} else {
			seen.add(identifier);
		}
	});

	// Delete duplicates
	for (let id of duplicates) {
		await databases.deleteDocument(INSPIRATION_DATABASE_ID, PRODUCTS_COLLECTION_ID, id);
	}

	console.log(products.length, duplicates.size);

	return json({
		data: 'success'
	});
};
