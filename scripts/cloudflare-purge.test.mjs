import test from 'node:test';
import assert from 'node:assert/strict';
import { changed, normalize, PATHS, run } from './cloudflare-purge.mjs';

const env = { CLOUDFLARE_API_TOKEN: 'cf-secreto', CLOUDFLARE_ZONE_ID: 'zona', GITHUB_SHA: 'abc', SITE_URL: 'https://example.test', VERCEL_ORIGIN_URL: 'https://origen.test', VERCEL_AUTOMATION_BYPASS_SECRET: 'bypass-secreto' };
const NOW = Date.parse('2026-01-01T00:00:00Z');
const res = (status, body = '', headers = {}) => ({ status, ok: status < 400, headers: new Headers(headers), arrayBuffer: async () => Buffer.from(body), json: async () => JSON.parse(body) });
function world({ pages = {}, ray = () => Math.random(), commit = 'abc', vercelEnv = 'production', builtAt = () => new Date(NOW + 60000).toISOString() } = {}) {
  const purges = [];
  const requests = [];
  const fetchImpl = async (url, o = {}) => {
    requests.push({ url, headers: o.headers || {} });
    if (url.includes('api.cloudflare.com')) {
      purges.push(JSON.parse(o.body).files);
      return res(200, '{"success":true}');
    }
    const p = new URL(url).pathname;
    if (p === '/deploy.json') return res(200, JSON.stringify({ commit, env: vercelEnv, builtAt: builtAt() }));
    if (p === '/') return res(302, '', { location: '/es' });
    if (p.endsWith('cv.pdf') && !pages[p]) return res(404);
    return res(200, `<html>${pages[p] ?? p}<script>window.__CF$cv$params={r:'${ray()}'}</script></html>`);
  };
  return { fetchImpl, purges, requests };
}
const opts = (w, extra = {}) => ({ env, event: 'push', fetchImpl: w.fetchImpl, log: () => {}, sleep: async () => {}, tries: 3, now: () => NOW, ...extra });

test('sin manifiesto anterior purga todo lo publicado (y no lo que da 404)', async () => {
  const w = world();
  const r = await run(opts(w));
  assert.deepEqual(r.purged, ['/', '/en', '/es', '/llms.txt', '/sitemap.xml']);
  assert.deepEqual(w.purges[0][0], 'https://example.test/');
  assert.ok(PATHS.includes('/en/cv.pdf') && PATHS.includes('/es/cv.pdf'));
  assert.ok(!PATHS.includes('/cv.pdf'), '/cv.pdf es una redirección no-store: no hace falta purgarla');
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
  const first = await run(opts(world({ pages: { '/en/cv.pdf': 'pdf' } })));
  const w = world({ pages: { '/es': 'texto nuevo' } });
  const r = await run(opts(w, { previous: first.manifest }));
  assert.deepEqual(r.purged, ['/en/cv.pdf', '/es']);
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

test('cron con Deploy Hook: dispara, espera un build posterior de producción y no imprime secretos', async () => {
  let posted = 0;
  const w = world({ builtAt: () => new Date(posted ? NOW + 90000 : NOW - 3600000).toISOString() });
  const logs = [];
  const fetchImpl = async (url, o = {}) => {
    if (url === 'https://hook.test/secreto') {
      posted += 1;
      return res(201, '{}');
    }
    return w.fetchImpl(url, o);
  };
  const r = await run(opts(w, { event: 'schedule', fetchImpl, env: { ...env, VERCEL_DEPLOY_HOOK_URL: 'https://hook.test/secreto' }, log: (m) => logs.push(m) }));
  assert.equal(posted, 1);
  assert.ok(r.purged.length > 0);
  assert.doesNotMatch(logs.join('\n'), /secreto/);
});

test('lee el origen de Vercel con el header de bypass, que no sale hacia ningún otro lado; purga las URL de gefy.dev', async () => {
  const w = world();
  const logs = [];
  await run(opts(w, { log: (m) => logs.push(m) }));
  const origin = w.requests.filter((q) => q.url.startsWith('https://origen.test/'));
  assert.ok(origin.length >= 6);
  assert.ok(origin.every((q) => q.headers['x-vercel-protection-bypass'] === 'bypass-secreto'));
  assert.ok(w.requests.filter((q) => !q.url.startsWith('https://origen.test/')).every((q) => !q.headers['x-vercel-protection-bypass']));
  assert.ok(w.requests.every((q) => !q.url.startsWith('https://example.test')), 'no se lee a través de Cloudflare');
  assert.ok(w.purges[0].every((u) => u.startsWith('https://example.test/')));
  assert.doesNotMatch(logs.join('\n'), /bypass-secreto|cf-secreto/);
});

test('sin el secreto de bypass: pide el deploy si es cron, no espera ni lee ni purga, avisa y termina bien', async () => {
  for (const event of ['push', 'schedule']) {
    const w = world();
    const logs = [];
    let slept = 0;
    const hooked = [];
    const fetchImpl = async (url, o) => (url === 'https://hook.test/x' ? (hooked.push(url), res(201, '{}')) : w.fetchImpl(url, o));
    const r = await run(opts(w, { event, fetchImpl, env: { ...env, VERCEL_AUTOMATION_BYPASS_SECRET: '', VERCEL_DEPLOY_HOOK_URL: 'https://hook.test/x' }, log: (m) => logs.push(m), sleep: async () => (slept += 1) }));
    assert.deepEqual([r.purged, r.manifest, w.requests.length, w.purges.length, slept], [[], null, 0, 0, 0]);
    assert.equal(hooked.length, event === 'schedule' ? 1 : 0);
    assert.match(logs.join('\n'), /::warning::Falta VERCEL_AUTOMATION_BYPASS_SECRET/);
  }
});

test('un preview, u otro commit, nunca se toma como producción', async () => {
  for (const w of [world({ vercelEnv: 'preview' }), world({ commit: 'otro' })]) {
    await assert.rejects(run(opts(w)), /3 intentos/);
    assert.equal(w.purges.length, 0);
  }
});

test('secreto rechazado por Vercel: corta en el primer intento con un mensaje claro', async () => {
  for (const reply of [res(401), res(302, '', { location: 'https://vercel.com/sso-api?url=x' })]) {
    const w = world();
    let calls = 0;
    await assert.rejects(run(opts(w, { fetchImpl: async () => ((calls += 1), reply) })), /revisar VERCEL_AUTOMATION_BYPASS_SECRET/);
    assert.equal(calls, 1);
  }
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
