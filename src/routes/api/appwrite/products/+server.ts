import { json, error } from '@sveltejs/kit';
import { Query } from 'appwrite';
import { databases } from '$lib/api';

const PRODUCTS_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
const PRODUCTS_COLLECTION_ID = '6589ceb0749a435516e8'; // Replace with your collection ID

export const GET = async ({ url }) => {
	const category = url.searchParams.get('category');
	let queryArray = [
		Query.orderDesc('$updatedAt'),
		// Query.limit(10),
		// Query.offset(0),
		// Query.select(['$id', 'title', 'price', 'url', 'images', 'categories']),
		Query.equal('status', 'published')
	];

	if (category !== 'undefined') {
		queryArray.push(Query.search('categories', category as string));
	}

	const response = await databases.listDocuments(
		PRODUCTS_DATABASE_ID,
		PRODUCTS_COLLECTION_ID,
		queryArray
	);

	if (!response) {
		throw error(500, 'failed to get products');
	}

	const data = response.documents;

	return json({
		data
	});
};

// export const POST = async ({request}) => {
// 	const { categories } = await request.json();

// 	const response = await databases.listDocuments(PRODUCTS_DATABASE_ID, PRODUCTS_COLLECTION_ID, [
// 		Query.orderDesc('$updatedAt'),
// 		// Query.limit(10),
// 		// Query.offset(0),
// 		// Query.select(['$id', 'title', 'price', 'url', 'images', 'categories']),
// 		Query.equal('status', 'published'),
// 		Query.equal('categories', categories)
// 	]);

// 	if (!response) {
// 		throw error(500, 'failed to get products');
// 	}

// 	const data = response.documents;

// 	return json({
// 		data
// 	});
// };

// export const GET = async ({ url }) => {
// 	const take = url.searchParams.get('take');
// 	const lastCursor = url.searchParams.get('cursor');

// 	const count = await prisma.product.count({
// 		where: {
// 			published: true
// 		}
// 	});
// 	const products = await prisma.product.findMany({
// 		take: take ? parseInt(take as string) : 10,
// 		...(lastCursor && {
// 			skip: 1,
// 			cursor: {
// 				id: Number(lastCursor)
// 			}
// 		}),
// 		orderBy: { updatedAt: 'desc' },
// 		where: {
// 			published: true
// 		},
// 		select: {
// 			id: true,
// 			url: true,
// 			title: true,
// 			images: true,
// 			price: true
// 		}
// 	});

// 	if (!products) {
// 		throw error(500, 'failed to get products');
// 	}

// 	const lastProductInResults = products[products.length - 1];
// 	const cursor = lastProductInResults.id;

// 	return json({
// 		list: products.map((product) => {
// 			return {
// 				id: product.id,
// 				title: product.title,
// 				images: JSON.parse(product.images),
// 				url: product.url,
// 				price: product.price,
// 				meta: {
// 					total: products.length,
// 					cursor: cursor
// 				}
// 			};
// 		}),
// 		meta: {
// 			count,
// 			cursor
// 		}
// 	});
// };
