import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async ({ request }) => {
	const { name, description, slug, published, inSeason } = await request.json();

	const findCategory = await prisma.category.findFirst({
		where: {
			slug
		}
	});

	if (findCategory) {
		throw error(400, 'DUPLICATE');
	}

	const newCategory = await prisma.category.create({
		data: {
			name,
			description,
			slug: slug.replace(' ', '-'),
			published,
			inSeason
		}
	});

	console.log(newCategory);

	if (!newCategory) {
		throw error(500, 'failed to create category');
	}

	return json({ success: newCategory.id });
};
