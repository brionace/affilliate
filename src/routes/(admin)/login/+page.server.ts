import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const { account } = await parent();
	if (account) {
		throw redirect(303, '/doli');
	}
}

// export const actions: import('./$types').Actions = {
// 	login: async ({ event, request }) => {
// 		const data = await request.formData();
// 		const email = data.get('email') as string;
// 		const password = data.get('password') as string;

// 		if (!email || !password) {
// 			formError = 'Please fill out all fields';
// 			loading = false;
// 			return;
// 		}

// 		try {
// 			const a = await account.createEmailSession(email, password);
// 			const data = await account.get();

// 			event.locals.user = data.hash;

// 			if (event.locals.user) {
// 				redirect(303, '/admin');
// 				// history.pushState(null, '', '/doli');
// 			}
// 		} catch (error) {
// 			console.error(error);
// 			return 'unsuccesful response';
// 		}
// 	}
// };
