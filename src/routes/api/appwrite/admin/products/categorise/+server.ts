import { json, error, fail } from '@sveltejs/kit';
import { Query } from 'appwrite';
import { databases, generateCategories } from '$lib/api';
import { clearEmpties } from '$lib/utilities';

const INSPIRATION_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
const PRODUCTS_COLLECTION_ID = '6589ceb0749a435516e8'; // Replace with your collection ID

export const GET = async () => {
	const limit = 25; // Number of documents per page
	let offset = 0; // Start at the first page

	let response = await databases.listDocuments(INSPIRATION_DATABASE_ID, PRODUCTS_COLLECTION_ID, [
		Query.select(['$id', 'title', 'categories']),
		Query.equal('status', 'published')
	]);

	const totalPages = Math.ceil(response.total / limit);

	while (offset < totalPages) {
		// Process the current page of results here
		response.documents.forEach(async (document: any) => {
			const { title, description } = document;
			const generatedCategories = await generateCategories({ title, description });

			const regex = /\[.*?\]/g;
			const match = generatedCategories.match(regex);
			const categoriesArray = match ? match[0].slice(2, -2).split("', '") : [];

			const updatedDocument = await databases.updateDocument(
				INSPIRATION_DATABASE_ID,
				PRODUCTS_COLLECTION_ID,
				document.$id,
				{
					categories: categoriesArray
				}
			);

			console.log(updatedDocument);
		});

		// Move to the next page
		offset++;

		response = await databases.listDocuments(INSPIRATION_DATABASE_ID, PRODUCTS_COLLECTION_ID, [
			Query.limit(limit),
			Query.offset(offset * limit), // Offset is multiplied by limit to get the correct starting point
			Query.equal('status', 'published')
		]);
	}

	return json({
		data: 'success'
	});
};
