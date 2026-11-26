// Sirve el PDF que genera scripts/cv.mjs antes de compilar. noindex: para el nombre de Gena tiene que salir gefy.dev, no un PDF.
import generated from '../data/cv/generated.json';

export function cvResponse(lang: 'es' | 'en'): Response {
  return new Response(new Uint8Array(Buffer.from(generated[lang], 'base64')), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="GenaroFebboYapur-CV-${lang.toUpperCase()}.pdf"`,
      'Cache-Control': 'public, max-age=3600',
      'CDN-Cache-Control': 'max-age=3600',
      'Cloudflare-CDN-Cache-Control': 'max-age=3600',
      'X-Robots-Tag': 'noindex',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
