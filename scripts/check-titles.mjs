// Red de seguridad: el build FALLA si un título o repo que se muestra contiene el nombre de un juego o estudio de la lista.
// La lista no se versiona en texto (el repo es público): scripts/blocked-hashes.json guarda hashes. Se puede ampliar con la
// variable BLOCKED_TERMS (separados por coma o punto y coma).
import crypto from 'node:crypto';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const SALT = 'portfolio-titulos-v1:';
export const normalize = (t) => t.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g, '');
export const hashTerm = (t) => crypto.createHash('sha256').update(SALT + normalize(t)).digest('hex');

// Palabras del texto (separando también camelCase) y sus combinaciones consecutivas, sin separadores.
function candidates(text) {
  const out = new Set();
  const plain = text.normalize('NFKD').replace(/[\u0300-\u036f\u200b-\u200f\u2060\ufeff]/g, '');
  for (const variant of [plain, plain.replace(/([a-z0-9])([A-Z])/g, '$1 $2')]) {
    const words = variant.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    for (let i = 0; i < words.length; i++) for (let n = 1, acc = ''; n <= 6 && i + n <= words.length; n++) out.add((acc += words[i + n - 1]));
  }
  return out;
}

export function blockedIn(text, hashes) {
  for (const c of candidates(String(text))) if (hashes.has(crypto.createHash('sha256').update(SALT + c).digest('hex'))) return true;
  return false;
}

/** Devuelve las referencias (repo#número) cuyo texto visible está bloqueado. Nunca devuelve el término. */
export function findBlocked(activity, hashes) {
  return (activity?.items || []).filter((p) => blockedIn(`${p.title} ${p.repo}`, hashes)).map((p) => `${p.repo}#${p.number}`);
}

export function loadHashes(env = process.env) {
  const stored = JSON.parse(fs.readFileSync(new URL('./blocked-hashes.json', import.meta.url), 'utf8')).hashes;
  return new Set([...stored, ...String(env.BLOCKED_TERMS || '').split(/[,;\n]/).filter((t) => normalize(t)).map(hashTerm)]);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const snapshot = JSON.parse(fs.readFileSync(new URL('../src/data/github-snapshot.json', import.meta.url), 'utf8'));
  const bad = findBlocked(snapshot.activity, loadHashes());
  if (bad.length) {
    console.error(`[check-titles] título con un nombre bloqueado en: ${bad.join(', ')}. El build se detiene.`);
    process.exit(1);
  }
  console.log(`[check-titles] ${snapshot.activity?.items.length ?? 0} títulos revisados`);
}
