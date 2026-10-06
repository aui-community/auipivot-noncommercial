import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [react()],
	base: mode === 'production' ? '/demo/auipivot-react-tsx/' : '/',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
}));
