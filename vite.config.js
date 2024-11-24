import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    eslintPlugin({
      include: ['src/**/*.{js}', 'src/js/**/*.{js}'],
    }),
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
