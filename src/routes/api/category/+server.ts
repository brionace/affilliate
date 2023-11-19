import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async ({ request }) => {
	const { slug } = await request.json();
	const categories = await prisma.category.findMany({
		where: {
			published: true,
			AND: {
				slug: slug
			}
		},
		select: { id: true, name: true, description: true, slug: true }
	});

	if (categories) {
		return json(
			categories.map((category) => {
				return {
					id: category.id,
					name: category.name,
					description: category.description,
					slug: category.slug
				};
			})
		);
	}

	throw error(500, 'failed to get categories');
};
