// Prueba de humo del sitio YA compilado: levanta `astro preview` y exige 200 y las secciones en /es y /en.
// Uso: node scripts/smoke.mjs (después de bun run build).
import { spawnSync } from 'node:child_process';

const port = process.env.SMOKE_PORT || '4499';
const astro = (...args) => spawnSync('npx', ['astro', 'preview', ...args], { stdio: 'ignore' });
astro('stop');
spawnSync('sh', ['-c', `npx astro preview --host 127.0.0.1 --port ${port} >/dev/null 2>&1 &`]);
let failed = '';
try {
  for (const path of ['/es', '/en']) {
    let res;
    for (let i = 0; i < 40 && !res; i++) res = await fetch(`http://127.0.0.1:${port}${path}`).catch(() => new Promise((r) => setTimeout(r, 250)));
    const html = res ? await res.text() : '';
    for (const id of ['hero', 'activity', 'projects', 'contact']) if (res?.status !== 200 || !html.includes(`id="${id}"`)) failed ||= `${path}: HTTP ${res?.status ?? 'sin respuesta'}, falta ${id}`;
  }
} finally {
  astro('stop');
}
if (failed) {
  console.error(`[smoke] ${failed}`);
  process.exit(1);
}
console.log('[smoke] /es y /en responden 200 con sus secciones');
