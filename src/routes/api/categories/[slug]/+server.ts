import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async ({ params }) => {
	const { slug } = params;

	const category = await prisma.category.findUnique({
		where: {
			slug: slug,
			AND: {
				published: true
			}
		},
		select: { id: true, name: true, description: true, slug: true }
	});

	if (!category) {
		throw error(500, 'failed to get category with slug: ' + slug);
	}

	return json({
		id: category.id,
		name: category.name,
		description: category.description,
		slug: category.slug
	});
};
