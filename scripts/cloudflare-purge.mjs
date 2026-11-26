// Dispara el rebuild (si hay Deploy Hook), espera a que producción sirva el build nuevo y purga en Cloudflare
// SOLO las URLs públicas cuyo contenido cambió respecto del manifiesto anterior.
// - El origen se lee a través de gefy.dev con un parámetro único (sale MISS), sin tokens de Vercel.
// - Se quita lo que Cloudflare inyecta en el HTML (cambia en cada pedido) antes de calcular el hash.
// - Sin CLOUDFLARE_API_TOKEN / CLOUDFLARE_ZONE_ID no purga, avisa y termina bien.
// - Reintentos acotados. El manifiesto solo se actualiza si no había nada que purgar o la purga salió bien.
import crypto from 'node:crypto';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

export const PATHS = ['/', '/es', '/en', '/llms.txt', '/sitemap.xml', '/cv.pdf', '/es/cv.pdf'];

export function normalize(body) {
  return Buffer.from(body)
    .toString('latin1')
    .replace(/<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?(?:__CF\$cv\$params|cdn-cgi\/)(?:(?!<\/script>)[\s\S])*?<\/script>/g, '')
    .replace(/<script\b[^>]*(?:cdn-cgi\/|static\.cloudflareinsights\.com)[^>]*>\s*<\/script>/g, '');
}

/** URLs a purgar: las nuevas, las que cambiaron y las que desaparecieron. Sin manifiesto anterior, todas. */
export function changed(previous, current) {
  const keys = new Set([...Object.keys(current), ...Object.keys(previous || {})]);
  return [...keys].filter((k) => !previous || previous[k] !== current[k]).sort();
}

export async function buildManifest({ site, fetchImpl, nonce }) {
  const manifest = {};
  for (const [i, p] of PATHS.entries()) {
    const res = await fetchImpl(`${site}${p}?__origin=${nonce}-${i}`, { redirect: 'manual', headers: { 'accept-language': 'es', 'user-agent': 'portfolio-purge' }, signal: AbortSignal.timeout(20000) });
    if (res.status === 404) continue;
    if (res.status >= 400) throw new Error(`${p} respondió ${res.status}`);
    const body = res.status >= 300 ? Buffer.from(res.headers.get('location') || '') : Buffer.from(await res.arrayBuffer());
    manifest[p] = crypto.createHash('sha256').update(`${res.status}\n`).update(normalize(body), 'latin1').digest('hex');
  }
  return manifest;
}

export async function run({ env, event, fetchImpl = fetch, previous = null, log = console.log, sleep = (ms) => new Promise((r) => setTimeout(r, ms)), tries = 40, waitMs = 15000 }) {
  const site = env.SITE_URL || 'https://gefy.dev';
  let n = 0;
  const nonce = () => `${Date.now()}-${(n += 1)}`;
  const deployInfo = async () => {
    try {
      const res = await fetchImpl(`${site}/deploy.json?__origin=${nonce()}`, { signal: AbortSignal.timeout(15000) });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  };

  let isNew = null;
  if (event === 'push') {
    isNew = (info) => info?.commit === env.GITHUB_SHA;
  } else if (env.VERCEL_DEPLOY_HOOK_URL) {
    const before = await deployInfo();
    const res = await fetchImpl(env.VERCEL_DEPLOY_HOOK_URL, { method: 'POST', signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`el Deploy Hook respondió ${res.status}`);
    log('Deploy pedido a Vercel.');
    isNew = (info) => Boolean(info?.builtAt) && info.builtAt !== before?.builtAt;
  } else {
    log('::notice::Sin VERCEL_DEPLOY_HOOK_URL: no se pide un deploy; se compara lo que hay publicado.');
  }

  if (isNew) {
    let live = false;
    for (let i = 0; i < tries && !live; i++) {
      live = isNew(await deployInfo());
      if (!live) await sleep(waitMs);
    }
    if (!live) throw new Error(`producción no sirvió el build nuevo tras ${tries} intentos; no se purga nada`);
  }

  const current = await buildManifest({ site, fetchImpl, nonce: nonce() });
  const urls = changed(previous, current);
  if (!urls.length) {
    log('Sin cambios en las páginas públicas: no se purga.');
    return { purged: [], manifest: current };
  }
  log(`Cambiaron: ${urls.join(', ')}`);
  if (!env.CLOUDFLARE_API_TOKEN || !env.CLOUDFLARE_ZONE_ID) {
    log('::notice::Faltan CLOUDFLARE_API_TOKEN o CLOUDFLARE_ZONE_ID: no se purga la caché.');
    return { purged: [], manifest: null };
  }
  let lastError = '';
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetchImpl(`https://api.cloudflare.com/client/v4/zones/${env.CLOUDFLARE_ZONE_ID}/purge_cache`, {
        method: 'POST',
        headers: { authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`, 'content-type': 'application/json' },
        body: JSON.stringify({ files: urls.map((p) => `${site}${p}`) }),
        signal: AbortSignal.timeout(20000)
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        log(`Purgadas ${urls.length} URL.`);
        return { purged: urls, manifest: current };
      }
      lastError = `HTTP ${res.status} ${(data.errors || []).map((e) => e.message).join('; ')}`;
      if (res.status < 500 && res.status !== 429) break;
    } catch (error) {
      lastError = error.message;
    }
    if (attempt < 3) await sleep(5000 * attempt);
  }
  throw new Error(`la purga de Cloudflare falló: ${lastError}`);
}

export async function main({ env = process.env, argv = process.argv.slice(2) } = {}) {
  const file = argv[0] || '.purge/manifest.json';
  let previous = null;
  try {
    previous = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    console.log('Sin manifiesto anterior: se purgará todo lo publicado.');
  }
  const { manifest } = await run({ env, event: env.GITHUB_EVENT_NAME, previous });
  if (manifest) {
    fs.mkdirSync(file.replace(/[^/]*$/, '') || '.', { recursive: true });
    fs.writeFileSync(file, `${JSON.stringify(manifest, null, 2)}\n`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.log(`::error::${error.message}`);
    process.exit(1);
  });
}
