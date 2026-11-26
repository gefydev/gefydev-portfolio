import type { APIRoute } from 'astro';

// La redirección según el idioma la hace el middleware (misma lógica que "/"); esto solo declara la ruta.
export const GET: APIRoute = () =>
  new Response(null, { status: 302, headers: { Location: '/es/cv.pdf', 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex' } });
