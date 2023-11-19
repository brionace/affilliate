import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async ({ request }) => {
	const { name, images, url, price, category } = await request.json();

	const findProduct = await prisma.product.findFirst({
		where: {
			// images: { contains: images[0] },
			// AND: { name: { contains: name } }
			url: url
		}
	});

	if (findProduct) {
		throw error(400, 'duplicate product');
	}

	const savedProduct = await prisma.product.create({
		data: {
			name,
			images: JSON.stringify(images),
			price,
			url,
			category,
			updatedAt: new Date(),
			published: false
		}
	});

	if (!savedProduct) {
		throw error(400, 'failed to add to database');
	}

	return json({ success: savedProduct.id });
};
