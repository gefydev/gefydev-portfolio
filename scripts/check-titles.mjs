// Paso del build: deja el snapshot sin nombres bloqueados. Un título que coincide NO frena el deploy: se reemplaza por el
// área (o se deja vacío) con un aviso. La lista (hashes, no texto) está en src/data/blocked-hashes.json y se amplía con
// BLOCKED_TERMS. Un PR puntual se saca con "exclude": ["dueño/repo#número"] en src/data/github-repos.json.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { sanitize } from '../src/data/titles.mjs';

export * from '../src/data/titles.mjs';

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const url = new URL('../src/data/github-snapshot.json', import.meta.url);
  const snapshot = JSON.parse(fs.readFileSync(url, 'utf8'));
  const config = JSON.parse(fs.readFileSync(new URL('../src/data/github-repos.json', import.meta.url), 'utf8'));
  const clean = sanitize(snapshot.activity, { exclude: config.exclude || [] });
  if (JSON.stringify(clean) !== JSON.stringify(snapshot.activity)) fs.writeFileSync(url, `${JSON.stringify({ ...snapshot, activity: clean }, null, 2)}\n`);
  console.log(`[check-titles] ${clean?.items.length ?? 0} títulos listos`);
}
