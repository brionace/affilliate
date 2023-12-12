import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async () => {
	const categories = await prisma.category.findMany({
		orderBy: {
			id: 'desc'
		},
		select: { id: true, name: true, slug: true }
	});

	if (!categories) {
		throw error(500, 'failed to get categories');
	}

	return json(
		categories.map((category) => {
			return {
				id: category.id,
				name: category.name,
				slug: category.slug
			};
		})
	);
};
