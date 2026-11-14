import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'node:child_process';

// Fecha real de la última modificación del contenido, para el <lastmod> del sitemap.
// Si no hay historial git (build sin .git), se usa la fecha del build.
function lastModified() {
  try {
    const d = execSync('git log -1 --format=%cs -- src public', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  } catch {}
  return new Date().toISOString().split('T')[0];
}

const isVercel = Boolean(process.env.VERCEL);

export default defineConfig({
  site: 'https://gefy.dev',
  output: 'server',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  adapter: isVercel
    ? vercel()
    : node({
        mode: 'standalone',
      }),
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.SITE_LASTMOD': JSON.stringify(lastModified()),
    },
    build: {
      target: 'es2022',
      cssCodeSplit: false,
    },
  },
});
