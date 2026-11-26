// Enlaces al CV en PDF que genera scripts/cv.mjs en cada build.
export const cvLink = (lang: 'es' | 'en') =>
  lang === 'es'
    ? { href: '/es/cv.pdf', file: 'GenaroFebboYapur-CV-ES.pdf', label: 'Descargar CV en PDF' }
    : { href: '/cv.pdf', file: 'GenaroFebboYapur-CV-EN.pdf', label: 'Download CV (PDF resume)' };
