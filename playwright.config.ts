import type { PlaywrightTestConfig } from '@playwright/test';

const { VITE_IPROYAL_SERVER, VITE_IPROYAL_USERNAME, VITE_IPROYAL_PASSWORD } = process.env;

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	use: {
		proxy: {
			server: VITE_IPROYAL_SERVER,
			username: VITE_IPROYAL_USERNAME,
			password: VITE_IPROYAL_PASSWORD
		}
	}
};

export default config;
