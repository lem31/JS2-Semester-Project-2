import { resolve } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
const __dirname = dirname(fileURLToPath(import.meta.url));

import eslintPlugin from 'vite-plugin-eslint';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  resolve: {
    alias: {},
  },
  optimizeDeps: {
    exclude: ['source-map-js'],
  },
  plugins: [
    eslintPlugin({
      include: ['src/**/*.{js}', 'src/js/**/*.{js}'],
    }),
    nodePolyfills(),
  ],
  appType: 'mpa',
  base: '',
  build: {
    target: 'esnext',

    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
        auth: resolve(__dirname, './auth/index.html'),
        profile: resolve(__dirname, './profile/index.html'),
        listing: resolve(__dirname, './listing/index.html'),
        myListings: resolve(__dirname, './my_listings/index.html'),
        editListing: resolve(__dirname, './listing/edit/index.html'),
        createListing: resolve(__dirname, './listing/create/index.html'),
        myBids: resolve(__dirname, './my_bids/index.html'),
      },
    },
  },
});
