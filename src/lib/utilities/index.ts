import type { DrawerSettings } from '@skeletonlabs/skeleton/dist/utilities/Drawer/types';

export const drawerSettings: DrawerSettings = {
	id: 'main-drawer',
	// Provide your property overrides:
	bgDrawer: 'bg-white',
	bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
	width: 'w-[280px] md:w-[480px]',
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
