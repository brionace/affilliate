import { json, error, fail } from '@sveltejs/kit';
import { Query } from 'appwrite';
import { databases } from '$lib/api';
import { clearEmpties } from '$lib/utilities';

const INSPIRATION_DATABASE_ID = '6589ce12827946d1cad7'; // Replace with your database ID
const INSPIRATION_COLLECTION_ID = '6589fea66c02c2ea13c7'; // Replace with your collection ID
const PRODUCTS_COLLECTION_ID = '6589ceb0749a435516e8'; // Replace with your collection ID

export const GET = async () => {
	const response = await databases.listDocuments(
		INSPIRATION_DATABASE_ID,
		INSPIRATION_COLLECTION_ID,
		[
			Query.orderDesc('$updatedAt'),
			// Query.limit(10),
			// Query.offset(0),
			Query.select(['$id', 'title', 'categories']),
			Query.equal('status', 'public')
		]
	);

	if (!response) {
		throw error(500, 'failed to get products');
	}

	const data = await Promise.all(
		response.documents.map(async (inspiration: any) => {
			const categoriesQueries = [
				Query.orderDesc('$updatedAt'),
				Query.limit(5),
				// Query.offset(0),
				Query.select(['images', 'name', 'price', 'url']),
				Query.equal('status', 'published')
			];

			inspiration.categories.forEach((category: string) => {
				categoriesQueries.push(Query.search('categories', category.toString()));
			});

			const res = await databases.listDocuments(
				INSPIRATION_DATABASE_ID,
				PRODUCTS_COLLECTION_ID,
				categoriesQueries
			);

			if (!res) {
				throw error(500, 'failed to get categories in inspirations');
			}

			return { inspiration, products: res.documents, total: res.total };
		})
	);

	return json({
		data: data.filter((item: any) => item.products.length > 0)
	});
};

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
// 			name: true,
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
// 				name: product.name,
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
