import { sveltekit } from '@sveltejs/kit/vite';
import EnvironmentPlugin from 'vite-plugin-environment';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), EnvironmentPlugin('all')],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
