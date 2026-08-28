import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  if (
    pathname.startsWith('/_astro') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/favicon') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.woff2')
  ) {
    const response = await next();
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('CDN-Cache-Control', 'max-age=31536000, immutable');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=31536000, immutable');
    return response;
  }

  if (
    pathname.endsWith('.xml') ||
    pathname.endsWith('.txt')
  ) {
    const response = await next();
    response.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');
    response.headers.set('CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400');
    return response;
  }

  let lang: 'es' | 'en' = 'es';

  if (pathname.startsWith('/en')) {
    lang = 'en';
  } else if (pathname.startsWith('/es')) {
    lang = 'es';
  } else {
    const cookieLang = context.cookies.get('user_lang')?.value;
    const queryLang = url.searchParams.get('lang');

    if (queryLang === 'en' || queryLang === 'es') {
      lang = queryLang;
      context.cookies.set('user_lang', queryLang, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
    } else if (cookieLang === 'en' || cookieLang === 'es') {
      lang = cookieLang;
    } else {
      const acceptLanguage = context.request.headers.get('accept-language') || '';
      if (acceptLanguage.toLowerCase().startsWith('en')) {
        lang = 'en';
      } else {
        const enIndex = acceptLanguage.indexOf('en');
        const esIndex = acceptLanguage.indexOf('es');
        if (enIndex !== -1 && (esIndex === -1 || enIndex < esIndex)) {
          lang = 'en';
        } else {
          lang = 'es';
        }
      }
    }
  }

  context.locals.lang = lang;

  const response = await next();
  response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800');
  response.headers.set('CDN-Cache-Control', 'max-age=86400, stale-while-revalidate=604800');
  response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=86400, stale-while-revalidate=604800');
  response.headers.set('Vary', 'Accept-Language, Cookie');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Link', '</images/logo-white-bg.webp>; rel=preload; as=image');

  return response;
});
