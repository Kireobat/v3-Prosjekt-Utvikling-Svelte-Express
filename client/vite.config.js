import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        shop: 'shop.html',
        chatrooms: 'chatrooms.html'
      }
    }
  },
  server: {
    port: 5173 // set the dev server port to 5173
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'index.html',
      filename: 'index.html',
      title: 'My App'
    },
    shop : {
      entry: 'src/shop.js',
      template: 'shop.html',
      filename: 'shop.html',
      title: 'Shop'
    },
    chatrooms : {
      entry: 'src/chatrooms.js',
      template: 'chatrooms.html',
      filename: 'chatrooms.html',
      title: 'Chatrooms'
    }
  }
});

