// Red de seguridad: ningún título que se muestre puede nombrar un juego o estudio de la lista.
// Un título que coincide NO frena el deploy: se reemplaza por el área (si es segura) o se deja sin título, con un aviso.
// Se aplica al traer los datos (así el nombre tampoco queda en el snapshot versionado) y de nuevo al armar la página.
// La lista no se versiona en texto (el repo es público): scripts/blocked-hashes.json guarda hashes y largos. Se puede
// ampliar con BLOCKED_TERMS (separados por coma o punto y coma).
import crypto from 'node:crypto';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { areaOf } from '../src/data/activity.mjs';

const SALT = 'portfolio-titulos-v1:';
const LIST = JSON.parse(fs.readFileSync(new URL('./blocked-hashes.json', import.meta.url), 'utf8'));
const hash = (s) => crypto.createHash('sha256').update(SALT + s).digest('hex');

// sin mayúsculas, acentos, caracteres invisibles ni separadores
export const normalize = (t) => String(t).normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g, '');
export const hashTerm = (t) => hash(normalize(t));

export function loadList(env = process.env) {
  const extra = String(env.BLOCKED_TERMS || '').split(/[,;\n]/).map(normalize).filter(Boolean);
  return { hashes: new Set([...LIST.hashes, ...extra.map(hash)]), lengths: new Set([...(LIST.lengths || []), ...extra.map((t) => t.length)]) };
}

/** ¿El texto contiene algún nombre? Se busca en el texto entero sin separadores (abarca plurales, pegados y "G T A"). */
export function blockedIn(text, list) {
  const words = String(text).normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  // segunda pasada sin la "s" final de cada palabra: plural en medio de un nombre de varias palabras
  for (const joined of [words.join(''), words.map((w) => w.replace(/(?<=..)s$/, '')).join('')]) {
    for (const len of list.lengths) for (let i = 0; i + len <= joined.length; i++) if (list.hashes.has(hash(joined.slice(i, i + len)))) return true;
  }
  return false;
}

/** Devuelve el PR listo para mostrar: sin el título si nombra algo, o null si lo que nombra es el repo. */
export function safeItem(item, list) {
  if (blockedIn(item.repo, list)) return null;
  if (!blockedIn(item.title, list)) return item;
  const area = areaOf(item.title);
  return { ...item, title: area && !blockedIn(area, list) ? area : '', hidden: true };
}

export function sanitize(activity, { list = loadList(), exclude = [], warn = console.warn } = {}) {
  if (!activity) return activity;
  const items = [];
  let dropped = 0;
  for (const item of activity.items || []) {
    if (exclude.includes(`${item.repo}#${item.number}`)) { dropped++; continue; }
    const safe = safeItem(item, list);
    // el aviso nunca incluye el nombre
    if (!safe) { warn(`::warning::[check-titles] se omite un PR (el nombre del repo está bloqueado), número ${item.number}`); dropped++; continue; }
    if (safe !== item) warn(`::warning::[check-titles] ${item.repo}#${item.number}: título bloqueado, se muestra solo el área`);
    items.push(safe);
  }
  return { ...activity, total: Math.max((activity.total || 0) - dropped, items.length), items };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const url = new URL('../src/data/github-snapshot.json', import.meta.url);
  const snapshot = JSON.parse(fs.readFileSync(url, 'utf8'));
  const config = JSON.parse(fs.readFileSync(new URL('../src/data/github-repos.json', import.meta.url), 'utf8'));
  const clean = sanitize(snapshot.activity, { exclude: config.exclude || [] });
  if (JSON.stringify(clean) !== JSON.stringify(snapshot.activity)) fs.writeFileSync(url, `${JSON.stringify({ ...snapshot, activity: clean }, null, 2)}\n`);
  console.log(`[check-titles] ${clean?.items.length ?? 0} títulos listos`);
}
