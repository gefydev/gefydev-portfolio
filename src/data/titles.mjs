// Filtro de nombres en los títulos que se muestran. Lo usan el paso del build (scripts/check-titles.mjs), la recolección
// de datos y la página. La lista se importa (no se lee con fs): así viaja dentro del build empaquetado.
import crypto from 'node:crypto';
import LIST from './blocked-hashes.json' with { type: 'json' };
import { areaOf } from './activity.mjs';

const SALT = 'portfolio-titulos-v1:';
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

