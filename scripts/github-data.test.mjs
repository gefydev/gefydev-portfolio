import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { collect } from './github-data.mjs';

const config = { stars: ['a/one', 'a/two'], prs: ['a/one'], author: 'me' };
const previous = { fetchedAt: '2026-01-01T00:00:00.000Z', stars: { 'a/one': { value: 5, fetchedAt: '2026-01-01T00:00:00.000Z' }, 'a/two': { value: 7, fetchedAt: '2026-01-01T00:00:00.000Z' } }, prs: { 'a/one': { total: 3, merged: 2, fetchedAt: '2026-01-01T00:00:00.000Z' } } };
const now = () => new Date('2026-02-02T00:00:00.000Z');
const quiet = () => {};
const reply = (status, body, headers = {}) => ({ status, ok: status < 400, headers: new Headers(headers), json: async () => body });
const ok = async (url) => (url.includes('/search/') ? reply(200, { total_count: url.includes('merged') ? 8 : 9, incomplete_results: false }) : reply(200, { stargazers_count: url.endsWith('one') ? 100 : 200, private: false }));

test('trae stars y PRs, fecha cada valor y cuenta las llamadas', async () => {
  const r = await collect({ config, previous, fetchImpl: ok, now, log: quiet });
  assert.equal(r.data.stars['a/one'].value, 100);
  assert.deepEqual(r.data.prs['a/one'], { total: 9, merged: 8, fetchedAt: '2026-02-02T00:00:00.000Z' });
  assert.equal(r.data.fetchedAt, '2026-02-02T00:00:00.000Z');
  assert.deepEqual([r.calls, r.failures], [4, 0]);
});

test('sin red no rompe: conserva el snapshot, lo avisa y no adelanta la fecha', async () => {
  const logs = [];
  const r = await collect({ config, previous, fetchImpl: async () => { throw new Error('ENOTFOUND'); }, now, log: (m) => logs.push(m) });
  assert.deepEqual(r.data, previous);
  assert.equal(r.failures, 3);
  assert.match(logs.join('\n'), /se conserva el valor anterior/);
});

test('límite de GitHub o error parcial: actualiza lo que se pudo y mantiene el resto', async () => {
  const r = await collect({ config, previous, now, log: quiet, fetchImpl: async (url) => (url.includes('/search/') ? reply(403, {}, { 'x-ratelimit-remaining': '0' }) : url.endsWith('two') ? reply(500, {}) : ok(url)) });
  assert.equal(r.data.stars['a/one'].value, 100);
  assert.equal(r.data.stars['a/two'].value, 7);
  assert.deepEqual(r.data.prs, previous.prs);
  assert.equal(r.data.fetchedAt, previous.fetchedAt);
});

test('descarta respuestas raras: búsqueda incompleta, repo privado, número inválido, más fusionadas que totales', async () => {
  for (const fetchImpl of [
    async (url) => (url.includes('/search/') ? reply(200, { total_count: 9, incomplete_results: true }) : reply(200, { stargazers_count: 1, private: true })),
    async (url) => (url.includes('/search/') ? reply(200, { total_count: url.includes('merged') ? 10 : 9 }) : reply(200, { stargazers_count: 'x' }))
  ]) {
    const r = await collect({ config, previous, fetchImpl, now, log: quiet });
    assert.deepEqual(r.data, previous);
  }
});

test('token vencido: reintenta sin token y no lo imprime', async () => {
  const logs = [];
  const r = await collect({ config, previous, token: 'tok-secreto', now, log: (m) => logs.push(m), fetchImpl: async (url, o) => (o.headers.authorization ? reply(401, {}) : ok(url)) });
  assert.equal(r.failures, 0);
  assert.doesNotMatch(logs.join('\n'), /tok-secreto/);
});

test('el snapshot versionado cubre todos los repos configurados y todos los que usa el sitio', () => {
  const read = (p) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
  const cfg = JSON.parse(read('../src/data/github-repos.json'));
  const snap = JSON.parse(read('../src/data/github-snapshot.json'));
  for (const repo of cfg.stars) assert.ok(Number.isInteger(snap.stars[repo]?.value), `faltan stars de ${repo}`);
  for (const repo of cfg.prs) assert.ok(Number.isInteger(snap.prs[repo]?.merged), `faltan PRs de ${repo}`);
  const projects = read('../src/data/projects.ts');
  for (const m of projects.matchAll(/starsOf\('([^']+)'\)/g)) assert.ok(cfg.stars.includes(m[1]), `${m[1]} no está en github-repos.json`);
  for (const m of projects.matchAll(/mergedPrsOf\('([^']+)'\)/g)) assert.ok(cfg.prs.includes(m[1]), `${m[1]} no está en github-repos.json`);
  assert.doesNotMatch(projects, /(stars|prsCount):\s*[1-9]/, 'quedó un número de GitHub escrito a mano');
});
