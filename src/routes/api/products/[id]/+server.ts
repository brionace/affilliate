import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async ({ params }) => {
	const { id } = params;

	const product = await prisma.product.findFirst({
		where: {
			published: true,
			id: Number(id)
		},
		select: {
			id: true,
			name: true,
			images: true,
			url: true,
			price: true
		}
	});

	if (!product) {
		throw error(500, 'failed to get product');
	}

	return json({
		id: product.id,
		name: product.name,
		images: JSON.parse(product.images),
		url: product.url,
		price: product.price
	});
};