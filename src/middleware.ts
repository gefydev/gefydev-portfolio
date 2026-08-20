import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

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
  return next();
});
