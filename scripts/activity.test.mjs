import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { areaOf, buildActivity } from '../src/data/activity.mjs';
import { blockedIn, findBlocked, hashTerm, loadHashes } from './check-titles.mjs';
import { collect } from './github-data.mjs';

const pr = (repo, number, mergedAt, title = 'x: y') => ({ repo, number, mergedAt, title });
const sample = {
  total: 6,
  fetchedAt: '2026-01-10T00:00:00Z',
  items: [
    pr('a/big', 5, '2026-01-05T00:00:00Z', 'Recompiler: five'),
    pr('a/big', 1, '2026-01-01T00:00:00Z', 'recomp: one'),
    pr('b/mid', 2, '2026-01-02T00:00:00Z', 'feat: two'),
    pr('a/big', 3, '2026-01-03T00:00:00Z', 'Config: three'),
    pr('b/mid', 4, '2026-01-04T00:00:00Z', 'sin prefijo'),
    pr('c/one', 6, '2026-01-06T00:00:00Z', 'README: six')
  ]
};

test('orden del más viejo al más nuevo, color por repo (dos principales y "otros") y conteo', () => {
  const a = buildActivity(sample);
  assert.deepEqual(a.cells.map((c) => c.number), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(a.cells.map((c) => c.color), [1, 2, 1, 2, 1, 3]);
  assert.deepEqual(a.legend, [{ repo: 'a/big', n: 3, color: 1 }, { repo: 'b/mid', n: 2, color: 2 }, { repo: null, n: 1, color: 3 }]);
  assert.equal(a.total, 6);
  assert.equal(a.legend.reduce((s, l) => s + l.n, 0), a.cells.length);
});

test('"ahora": último PR y foco sin los de README; abreviaturas de un área cuentan juntas', () => {
  const a = buildActivity(sample);
  assert.equal(a.last.number, 5);
  assert.equal(a.focus.repo, 'a/big');
  assert.deepEqual(a.focus.areas, ['Recompiler', 'Config']);
  assert.equal(areaOf('chore(deps): bump'), 'chore(deps)');
  assert.equal(areaOf('XCL_NETWORK=0: algo'), null);
  assert.equal(areaOf('una frase larga sin prefijo'), null);
});

test('sin datos de actividad la sección no se muestra', () => {
  assert.equal(buildActivity(undefined), null);
  assert.equal(buildActivity({ items: [] }), null);
});

test('respaldo: si la búsqueda falla o viene incompleta se conserva la actividad anterior entera', async () => {
  const config = { stars: [], prs: [], author: 'me', activity: true };
  const previous = { fetchedAt: 'x', stars: {}, prs: {}, activity: sample };
  const reply = (body, status = 200) => ({ status, ok: status < 400, headers: new Headers(), json: async () => body });
  for (const fetchImpl of [async () => { throw new Error('sin red'); }, async () => reply({ total_count: 1, incomplete_results: true, items: [] }), async () => reply({ total_count: 1, items: [{ number: 1 }] }), async () => reply({}, 503)]) {
    const r = await collect({ config, previous, fetchImpl, log: () => {} });
    assert.deepEqual(r.data.activity, sample);
    assert.equal(r.failures, 1);
  }
  const ok = await collect({ config, previous, log: () => {}, fetchImpl: async (url) => {
    assert.match(decodeURIComponent(url), /is:pr is:merged is:public author:me -user:me/);
    return reply({ total_count: 2, incomplete_results: false, items: [9, 8].map((n) => ({ number: n, title: 't', repository_url: 'https://api.github.com/repos/a/b', pull_request: { merged_at: `2026-01-0${n}T00:00:00Z` } })) });
  } });
  assert.deepEqual(ok.data.activity.items.map((i) => i.number), [8, 9]);
});

// términos inventados: los reales no se versionan en texto
test('el build falla con un título que nombra algo bloqueado, también pegado, en camelCase o con signos; y no repite el término', () => {
  const hashes = new Set(['Acme Wonder World', 'AWW 9', 'Zorbo'].map(hashTerm));
  for (const text of ['Fix crash in Acme Wonder World', 'AcmeWonderWorld: boot', 'acme-wonder-world: x', 'tune for AWW9', 'Zorbo\'s launcher', 'ZorboClient: y', 'A.c.m.e wonder world'.replace('A.c.m.e', 'Acme')]) assert.ok(blockedIn(text, hashes), text);
  for (const text of ['Zorbos everywhere', 'zorbo64 build', 'superzorbo', 'AcmeWonderWorlds']) assert.ok(blockedIn(text, loadHashes({ BLOCKED_TERMS: 'Acme Wonder World; AWW 9; Zorbo' })), text);
  for (const text of ['Recompiler: keep lanes', 'zorb', 'the game logs']) assert.ok(!blockedIn(text, hashes), text);
  const refs = findBlocked({ items: [pr('a/b', 7, 'x', 'Zorbo support'), pr('a/b', 8, 'x', 'ok')] }, hashes);
  assert.deepEqual(refs, ['a/b#7']);
  assert.ok(loadHashes({ BLOCKED_TERMS: 'Extra Name; Otro' }).has(hashTerm('extraname')));
});

test('los títulos versionados pasan la lista, y la lista no está en texto', () => {
  const read = (p) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
  const snapshot = JSON.parse(read('../src/data/github-snapshot.json'));
  assert.ok(snapshot.activity.items.length >= 1);
  assert.deepEqual(findBlocked(snapshot.activity, loadHashes({})), []);
  const stored = JSON.parse(read('./blocked-hashes.json')).hashes;
  assert.ok(stored.length >= 10 && stored.every((h) => /^[0-9a-f]{64}$/.test(h)));
});

test('un PR bloqueado se puede excluir sin frenar el build ni mostrarlo', () => {
  const hashes = new Set(['Zorbo'].map(hashTerm));
  const activity = { total: 6, items: [pr('a/b', 7, '2026-01-01', 'Zorbo support'), pr('a/b', 8, '2026-01-02', 'ok: x')], fetchedAt: 'x' };
  assert.deepEqual(findBlocked(activity, hashes, ['a/b#7']), []);
  const a = buildActivity(activity, { exclude: ['a/b#7'] });
  assert.deepEqual([a.cells.map((c) => c.number), a.total], [[8], 5]);
});
