import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async () => {
	const categories = await prisma.category.findMany({
		where: {
			published: true
		},
		select: { id: true, name: true, slug: true }
	});

	if (categories) {
		return json(
			categories.map((category) => {
				return {
					id: category.id,
					name: category.name
				};
			})
		);
	}

	throw error(500, 'failed to get categories');
};
