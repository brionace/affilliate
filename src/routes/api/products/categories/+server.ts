import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async ({ request }) => {
	const { slug } = await request.json();

	// ?       equals?: String | StringFieldRefInput,
	// ?       in?: String[],
	// ?       notIn?: String[],
	// ?       lt?: String | StringFieldRefInput,
	// ?       lte?: String | StringFieldRefInput,
	// ?       gt?: String | StringFieldRefInput,
	// ?       gte?: String | StringFieldRefInput,
	// ?       contains?: String | StringFieldRefInput,
	// ?       startsWith?: String | StringFieldRefInput,
	// ?       endsWith?: String | StringFieldRefInput,
	// ?       not?: String | NestedStringFilter

	const products = await prisma.product.findMany({
		where: {
			published: false,
			AND: {
				category: { contains: `"${slug}"` }
			}
		},
		take: 20,
		select: {
			id: true,
			url: true,
			name: true,
			images: true,
			price: true,
			category: true
		}
	});

	if (products) {
		return json(
			products.map((product) => {
				return {
					id: product.id,
					name: product.name,
					images: JSON.parse(product.images),
					url: product.url,
					price: product.price
				};
			})
		);
	}

	throw error(500, 'failed to get products');
};
