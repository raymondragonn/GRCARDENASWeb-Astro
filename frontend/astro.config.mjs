import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://grcardenasconstrucciones.com',
  output: 'static',
  integrations: [react(), sitemap()],
  server: {
    port: 5173,
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
  },
});
