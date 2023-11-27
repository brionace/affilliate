import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async ({ request }) => {
	const { id } = await request.json();
	const parsedId = JSON.parse(id);

	const products = await prisma.product.findMany({
		where: {
			published: true,
			AND: {
				id: { in: parsedId }
			}
		},
		take: 100,
		select: {
			id: true,
			url: true,
			name: true,
			images: true,
			price: true
		}
	});

	if (products) {
		return json(
			products.map((product) => {
				return {
					id: product.id,
					name: product.name,
					images: JSON.parse(product.images),
					url: product.url,
					price: product.price
				};
			})
		);
	}

	throw error(500, 'failed to get products');
};
