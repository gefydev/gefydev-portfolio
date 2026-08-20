import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://genadeev.dev';
  const currentDate = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />
  </url>
  <url>
    <loc>${siteUrl}/es</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />
  </url>
  <url>
    <loc>${siteUrl}/en</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />
  </url>
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
