import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async ({ params }) => {
	const { id } = params;

	const product = await prisma.product.findFirst({
		where: {
			id: Number(id)
		},
		select: {
			id: true,
			name: true,
			images: true,
			url: true,
			price: true,
			published: true,
		}
	});

	if (!product) {
		throw error(500, 'failed to get product #' + id);
	}
1

	return json({
		id: product.id,
		name: product.name,
		images: JSON.parse(product.images),
		url: product.url,
		price: product.price,
		published: product.published,
	});
};

export const PUT = async ({ request }) => {
	const { id, name, images, url, price, category, published } = await request.json();

	const updatedProduct = await prisma.product.update({
		where: {
			id: Number(id)
		},
		data: {
			name,
			images: typeof images !== 'string' ? JSON.parse(images) : images,
			price,
			url,
			category: typeof category !== 'string' ? JSON.parse(category) : category,
			published
		}
	});

	if (!updatedProduct) {
		throw error(400, 'failed to update product #' + id);
	}

	return json({ success: updatedProduct.id });
};

export const DELETE = async ({ params }) => {
	const { id } = params;

	const deletedProduct = await prisma.product.delete({
		where: {
			id: Number(id)
		}
	});

	if (!deletedProduct) {
		throw error(400, 'failed to delete product #' + id);
	}

	return json({ success: deletedProduct.id });
};
