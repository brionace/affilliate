import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async ({ request }) => {
	const { id } = await request.json();

	const product = await prisma.product.findFirst({
		where: {
			published: true,
			AND: {
				id: Number(id)
			}
			// AND: {
			// 	id: { in: idArray }
			// }
		},
		// take: 20,
		select: {
			id: true,
			url: true,
			name: true,
			images: true,
			price: true
		}
	});

	if (product) {
		return json({
			id: product.id,
			name: product.name,
			images: JSON.parse(product.images),
			url: product.url,
			price: product.price
		});
	}

	throw error(500, 'failed to get product');
};
