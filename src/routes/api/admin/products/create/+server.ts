import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async ({ request }) => {
	const { name, images, url, price, category, published } = await request.json();

	const findProduct = await prisma.product.findFirst({
		where: {
			// images: { contains: images[0] },
			// AND: { name: { contains: name } }
			url: url
		}
	});

	if (findProduct) {
		throw error(400, 'DUPLICATE');
	}

	const createProduct = await prisma.product.create({
		data: {
			name,
			images: typeof images !== 'string' ? JSON.parse(images) : images,
			price,
			url,
			category: typeof category !== 'string' ? JSON.parse(category) : category,
			published
		}
	});

	if (!createProduct) {
		throw error(400, 'failed to add to create product');
	}

	return json({ success: createProduct.id });
};
