import type { APIRoute } from 'astro';

// Fecha de la última modificación del contenido (último commit que toca src/ o public/).
// La calcula astro.config.mjs al construir; no cambia por request.
const lastmod: string = import.meta.env.SITE_LASTMOD;

const siteUrl = 'https://gefy.dev';
const alternates = `
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`;

// Solo las URLs que sirven contenido. "/" redirige a /es o /en, así que no va en el sitemap.
const urls = ['/es', '/en'];

export const GET: APIRoute = async () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (path) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>${alternates}
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
    },
  });
};
