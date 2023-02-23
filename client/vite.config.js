import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'index.html',
      filename: 'index.html',
      title: 'My App'
    },
    shop : {
      entry: 'src/shop.js',
      template: 'index.html',
      filename: 'shop.html',
      title: 'Shop'
    }
  }
});

