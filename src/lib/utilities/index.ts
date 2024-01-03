import type { DrawerSettings } from '@skeletonlabs/skeleton/dist/utilities/Drawer/types';

export const drawerSettings: DrawerSettings = {
	id: 'main-drawer',
	// Provide your property overrides:
	bgDrawer: 'bg-white',
	bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
	width: 'w-auto',
	padding: 'p-4',
	rounded: 'rounded-xl',
	position: 'left',
	height: 'h-full'
};

export function isValidUrl(urlString: string) {
	const urlPattern = new RegExp(
		'^(https?:\\/\\/)?' + // validate protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	); // validate fragment locator
	return !!urlPattern.test(urlString);
}

export function clearEmpties(o: { [x: string]: unknown }) {
	for (const k in o) {
		if (!o[k] || typeof o[k] !== 'object') {
			continue; // If null or not an object, skip to the next iteration
		}

		// The property is an object
		clearEmpties(o[k] as { [x: string]: unknown }); // <-- Make a recursive call on the nested object
		if (Object.keys(o[k] as { [x: string]: unknown }).length === 0) {
			delete o[k]; // The object had no properties, so delete that property
		}
	}
	return o;
}
