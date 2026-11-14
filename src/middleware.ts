import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Los archivos estáticos y de descubrimiento son cacheados directamente en el Edge por Cloudflare
  if (
    pathname.includes('.') ||
    pathname.startsWith('/_astro/')
  ) {
    return next();
  }

  // --- Lógica de Aplicación (i18n & Detección de Idioma) ---
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
      const enIndex = acceptLanguage.indexOf('en');
      const esIndex = acceptLanguage.indexOf('es');
      lang = enIndex !== -1 && (esIndex === -1 || enIndex < esIndex) ? 'en' : 'es';
    }
  }

  context.locals.lang = lang;

  // "/" no tiene contenido propio: redirige (302, depende del visitante) a /es o /en.
  // private/no-store para que ni la CDN ni el navegador la cacheen y la raíz no duplique /en.
  if (pathname === '/') {
    const redirect = context.redirect(`/${lang}`, 302);
    redirect.headers.set('Cache-Control', 'private, no-store');
    redirect.headers.set('CDN-Cache-Control', 'no-store');
    redirect.headers.set('Cloudflare-CDN-Cache-Control', 'no-store');
    redirect.headers.set('Vary', 'Accept-Language, Cookie');
    return redirect;
  }

  // --- Headers de Respuesta para HTML dinámico ---
  const response = await next();
  response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  response.headers.set('Vary', 'Accept-Language, Cookie');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
});
