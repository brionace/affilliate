import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async ({ request }) => {
	const { id } = await request.json();

	console.log(id);

	const products = await prisma.product.findMany({
		where: {
			published: true,
			AND: {
				id: { in: JSON.parse(id) }
			}
		},
		take: 20,
		select: {
			id: true,
			url: true,
			name: true,
			images: true,
			price: true
		}
	});

	if (!products) {
		throw error(500, 'failed to get saved products');
	}

	// return json(
	// 	products.map((product) => {
	// 		return {
	// 			id: product.id,
	// 			name: product.name,
	// 			images: JSON.parse(product.images),
	// 			url: product.url,
	// 			price: product.price
	// 		};
	// 	})
	// );

	return json({
		list: products.map((product) => {
			return {
				id: product.id,
				name: product.name,
				images: JSON.parse(product.images),
				url: product.url,
				price: product.price,
				meta: {
					total: products.length,
					cursor: null
				}
			};
		}),
		meta: {
			count: null,
			cursor: null
		}
	});
};

/*
const take = url.searchParams.get('take');
	const lastCursor = url.searchParams.get('cursor');

	const count = await prisma.product.count({
		where: {
			published: true
		}
	});
	const products = await prisma.product.findMany({
		take: take ? parseInt(take as string) : 10,
		...(lastCursor && {
			skip: 1,
			cursor: {
				id: Number(lastCursor)
			}
		}),
		orderBy: { updatedAt: 'desc' },
		where: {
			published: true
		},
		select: {
			id: true,
			url: true,
			name: true,
			images: true,
			price: true
		}
	});


	if (!products) {
		throw error(500, 'failed to get products');
	}

	const lastProductInResults = products[products.length - 1];
	const cursor = lastProductInResults.id;

	return json({
		list: products.map((product) => {
			return {
				id: product.id,
				name: product.name,
				images: JSON.parse(product.images),
				url: product.url,
				price: product.price,
				meta: {
					total: products.length,
					cursor: cursor
				}
			};
		}),
		meta: {
			count,
			cursor
		}
	});
*/
