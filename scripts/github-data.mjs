// Datos de GitHub del portfolio (stars y PRs), calculados antes de compilar.
// Fuente única: src/data/github-repos.json (qué pedir) y src/data/github-snapshot.json (último valor bueno, versionado).
// Nunca rompe el build: lo que no se puede traer (sin red, límite, error) conserva el valor del snapshot y queda en el log.
//   node scripts/github-data.mjs           en Vercel o CI reescribe el snapshot del workspace (no se commitea)
//   node scripts/github-data.mjs --write   lo reescribe también en local
// GITHUB_TOKEN es opcional (solo lectura de repos públicos); sin token alcanzan 7 llamadas REST y 4 de búsqueda.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const API = 'https://api.github.com';
const isCount = (n) => Number.isInteger(n) && n >= 0;

export async function collect({ config, previous, token, fetchImpl = fetch, now = () => new Date(), log = console.log, timeoutMs = 8000 }) {
  const out = { fetchedAt: previous?.fetchedAt ?? null, stars: { ...previous?.stars }, prs: { ...previous?.prs } };
  const at = now().toISOString();
  let calls = 0;
  let failures = 0;
  let auth = token || null;

  async function get(path) {
    calls += 1;
    const headers = { accept: 'application/vnd.github+json', 'user-agent': 'portfolio-build', 'x-github-api-version': '2022-11-28' };
    if (auth) headers.authorization = `Bearer ${auth}`;
    const res = await fetchImpl(`${API}${path}`, { headers, signal: AbortSignal.timeout(timeoutMs) });
    if (res.status === 401 && auth) {
      log('[github-data] GITHUB_TOKEN rechazado (401): se sigue sin token');
      auth = null;
      return get(path);
    }
    if (res.status === 429 || (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0')) {
      throw new Error(`límite de GitHub (HTTP ${res.status})`);
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  async function attempt(label, fn) {
    try {
      await fn();
    } catch (error) {
      failures += 1;
      log(`[github-data] ${label}: ${error.message}; se conserva el valor anterior`);
    }
  }

  for (const repo of config.stars) {
    await attempt(`stars de ${repo}`, async () => {
      const data = await get(`/repos/${repo}`);
      if (data.private || !isCount(data.stargazers_count)) throw new Error('respuesta inesperada o repo privado');
      out.stars[repo] = { value: data.stargazers_count, fetchedAt: at };
    });
  }

  for (const repo of config.prs) {
    await attempt(`PRs en ${repo}`, async () => {
      const count = async (extra) => {
        const q = encodeURIComponent(`is:pr is:public author:${config.author} repo:${repo}${extra}`);
        const data = await get(`/search/issues?per_page=1&q=${q}`);
        if (data.incomplete_results || !isCount(data.total_count)) throw new Error('búsqueda incompleta');
        return data.total_count;
      };
      const total = await count('');
      const merged = await count(' is:merged');
      if (merged > total) throw new Error('conteos incoherentes');
      out.prs[repo] = { total, merged, fetchedAt: at };
    });
  }

  // la fecha general solo avanza si todo se trajo en esta corrida: así nunca promete datos más nuevos que los que hay
  if (failures === 0) out.fetchedAt = at;
  return { data: out, calls, failures };
}

export async function main({ argv = process.argv.slice(2), env = process.env, log = console.log, fetchImpl = fetch } = {}) {
  const configUrl = new URL('../src/data/github-repos.json', import.meta.url);
  const snapshotUrl = new URL('../src/data/github-snapshot.json', import.meta.url);
  try {
    const config = JSON.parse(fs.readFileSync(configUrl, 'utf8'));
    let previous = null;
    try {
      previous = JSON.parse(fs.readFileSync(snapshotUrl, 'utf8'));
    } catch {
      log('[github-data] sin snapshot previo');
    }
    const { data, calls, failures } = await collect({ config, previous, token: env.GITHUB_TOKEN, log, fetchImpl });
    log(`[github-data] ${calls} llamadas, ${failures} fallos, token: ${env.GITHUB_TOKEN ? 'sí' : 'no'}, datos completos al ${data.fetchedAt ?? 'nunca'}`);
    if (argv.includes('--write') || env.VERCEL || env.CI) fs.writeFileSync(snapshotUrl, `${JSON.stringify(data, null, 2)}\n`);
    else log('[github-data] local sin --write: no se modifica el snapshot versionado');
  } catch (error) {
    log(`[github-data] no se pudieron actualizar los datos (${error.message}); el build sigue con el snapshot`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
