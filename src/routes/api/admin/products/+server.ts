import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async () => {
	const products = await prisma.product.findMany({
		orderBy: {
			id: 'desc'
		},
		select: {
			id: true,
			name: true,
			images: true
		}
	});

	if (!products) {
		throw error(500, 'failed to get products');
	}

	return json(
		products.map((product) => {
			return {
				id: product.id,
				name: product.name,
				images: JSON.parse(product.images)
			};
		})
	);
};
