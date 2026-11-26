import test from 'node:test';
import assert from 'node:assert/strict';
import { changed, normalize, PATHS, run } from './cloudflare-purge.mjs';

const env = { CLOUDFLARE_API_TOKEN: 'cf-secreto', CLOUDFLARE_ZONE_ID: 'zona', GITHUB_SHA: 'abc', SITE_URL: 'https://example.test' };
const res = (status, body = '', headers = {}) => ({ status, ok: status < 400, headers: new Headers(headers), arrayBuffer: async () => Buffer.from(body), json: async () => JSON.parse(body) });
function world({ pages = {}, ray = () => Math.random(), commit = 'abc' } = {}) {
  const purges = [];
  const fetchImpl = async (url, o = {}) => {
    if (url.includes('api.cloudflare.com')) {
      purges.push(JSON.parse(o.body).files);
      return res(200, '{"success":true}');
    }
    const p = new URL(url).pathname;
    if (p === '/deploy.json') return res(200, JSON.stringify({ commit, builtAt: 'x' }));
    if (p === '/') return res(302, '', { location: '/es' });
    if (p.endsWith('cv.pdf') && !pages[p]) return res(404);
    return res(200, `<html>${pages[p] ?? p}<script>window.__CF$cv$params={r:'${ray()}'}</script></html>`);
  };
  return { fetchImpl, purges };
}
const opts = (w, extra = {}) => ({ env, event: 'push', fetchImpl: w.fetchImpl, log: () => {}, sleep: async () => {}, tries: 3, ...extra });

test('sin manifiesto anterior purga todo lo publicado (y no lo que da 404)', async () => {
  const w = world();
  const r = await run(opts(w));
  assert.deepEqual(r.purged, ['/', '/en', '/es', '/llms.txt', '/sitemap.xml']);
  assert.deepEqual(w.purges[0][0], 'https://example.test/');
  assert.ok(PATHS.includes('/cv.pdf'));
});

test('sin cambios no purga, aunque Cloudflare inyecte un script distinto en cada pedido', async () => {
  const first = await run(opts(world()));
  const w = world();
  const r = await run(opts(w, { previous: first.manifest }));
  assert.deepEqual(r.purged, []);
  assert.equal(w.purges.length, 0);
  assert.deepEqual(r.manifest, first.manifest);
});

test('una página cambiada: purga solo esa; una que desaparece también', async () => {
  const first = await run(opts(world({ pages: { '/cv.pdf': 'pdf' } })));
  const w = world({ pages: { '/es': 'texto nuevo' } });
  const r = await run(opts(w, { previous: first.manifest }));
  assert.deepEqual(r.purged, ['/cv.pdf', '/es']);
});

test('sin token: no purga, avisa, no falla y no da por purgado el manifiesto', async () => {
  const logs = [];
  const w = world();
  const r = await run(opts(w, { env: { ...env, CLOUDFLARE_API_TOKEN: '' }, log: (m) => logs.push(m) }));
  assert.deepEqual([r.purged, r.manifest, w.purges.length], [[], null, 0]);
  assert.match(logs.join('\n'), /no se purga/);
});

test('si producción nunca sirve el build nuevo corta tras N intentos sin purgar', async () => {
  const w = world({ commit: 'viejo' });
  await assert.rejects(run(opts(w)), /3 intentos/);
  assert.equal(w.purges.length, 0);
});

test('cron con Deploy Hook: dispara, espera un builtAt distinto y no imprime secretos', async () => {
  let posted = 0;
  let builtAt = 'a';
  const w = world();
  const logs = [];
  const fetchImpl = async (url, o = {}) => {
    if (url === 'https://hook.test/secreto') {
      posted += 1;
      builtAt = 'b';
      return res(201, '{}');
    }
    if (url.includes('/deploy.json')) return res(200, JSON.stringify({ builtAt }));
    return w.fetchImpl(url, o);
  };
  await run(opts(w, { event: 'schedule', fetchImpl, env: { ...env, VERCEL_DEPLOY_HOOK_URL: 'https://hook.test/secreto' }, log: (m) => logs.push(m) }));
  assert.equal(posted, 1);
  assert.doesNotMatch(logs.join('\n'), /secreto/);
});

test('error de la API de Cloudflare: falla con motivo, reintenta solo errores transitorios', async () => {
  for (const [status, expected] of [[403, 1], [503, 3]]) {
    let calls = 0;
    const w = world();
    const fetchImpl = async (url, o) => (url.includes('api.cloudflare.com') ? ((calls += 1), res(status, '{"success":false}')) : w.fetchImpl(url, o));
    await assert.rejects(run(opts(w, { fetchImpl })), /purga de Cloudflare falló/);
    assert.equal(calls, expected);
  }
});

test('changed y normalize', () => {
  assert.deepEqual(changed(null, { a: '1' }), ['a']);
  assert.deepEqual(changed({ a: '1', b: '2' }, { a: '1', b: '3' }), ['b']);
  assert.equal(normalize('<p>x</p><script defer src="https://static.cloudflareinsights.com/beacon.min.js"></script>'), '<p>x</p>');
  assert.equal(normalize('<script>miCodigo()</script>'), '<script>miCodigo()</script>');
});
