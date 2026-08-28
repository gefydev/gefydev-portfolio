import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

const isVercel = Boolean(process.env.VERCEL);

export default defineConfig({
  site: 'https://gefy.dev',
  output: 'server',
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  adapter: isVercel
    ? vercel()
    : node({
        mode: 'standalone',
      }),
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
    },
  },
});
