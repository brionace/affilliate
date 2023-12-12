import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async ({ params }) => {
	const { id } = params;

	const category = await prisma.category.findUnique({
		where: {
			id: Number(id)
		},
		select: { id: true, name: true, description: true, slug: true, published: true, inSeason: true }
	});

	if (!category) {
		throw error(500, 'failed to get categories');
	}

	return json({
		id: category.id,
		name: category.name,
		description: category.description,
		slug: category.slug,
		published: category.published,
		inSeason: category.inSeason
	});
};

export const PUT = async ({ request }) => {
	const { id, name, description, slug, published, inSeason } = await request.json();

	const updatedCategory = await prisma.category.update({
		where: {
			id: Number(id)
		},
		data: { name, description, slug: slug.replace(' ', '-'), published, inSeason }
	});

	if (!updatedCategory) {
		throw error(500, 'failed to update category' + id);
	}

	return json({ success: updatedCategory.id });
};

export const DELETE = async ({ params }) => {
	const { id } = params;

	const deletedCategory = await prisma.category.delete({
		where: {
			id: Number(id)
		}
	});

	if (!deletedCategory) {
		throw error(400, 'failed to delete category');
	}

	return json({ success: deletedCategory.id });
};
