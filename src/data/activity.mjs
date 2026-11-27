// Cálculos de la sección "cada cuadro es un PR" (sin dependencias: los usan el sitio y los tests).
const AREA = /^[A-Za-z][\w ().\/&-]{0,23}$/;

/** Prefijo del título antes de ":" ("Recompiler: …" -> "Recompiler"); null si no parece un área. */
export const areaOf = (title) => {
  const m = /^([^:]{1,24}):\s/.exec(title || '');
  return m && AREA.test(m[1]) ? m[1] : null;
};

export function buildActivity(activity, { recent = 20, exclude = [] } = {}) {
  const items = (activity?.items || []).filter((p) => !exclude.includes(`${p.repo}#${p.number}`)).sort((a, b) => a.mergedAt.localeCompare(b.mergedAt) || a.number - b.number);
  if (!items.length) return null;
  const count = new Map();
  for (const p of items) count.set(p.repo, (count.get(p.repo) || 0) + 1);
  const ranked = [...count].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  // color propio para los dos repos con más PRs; el resto, "otros"
  const colorOf = new Map(ranked.slice(0, 2).map(([repo], i) => [repo, i + 1]));
  const cells = items.map((p) => ({ ...p, area: areaOf(p.title), color: colorOf.get(p.repo) ?? 3, url: `https://github.com/${p.repo}/pull/${p.number}` }));
  const legend = ranked.slice(0, 2).map(([repo, n], i) => ({ repo, n, color: i + 1 }));
  const rest = items.length - legend.reduce((a, l) => a + l.n, 0);
  if (rest) legend.push({ repo: null, n: rest, color: 3 });
  // "ahora": sin los PRs de README (ruido para este resumen)
  const code = cells.filter((p) => p.area?.toLowerCase() !== 'readme');
  const pool = code.length ? code : cells;
  const last = pool.at(-1);
  const window = pool.slice(-recent);
  const byRepo = new Map();
  for (const p of window) byRepo.set(p.repo, (byRepo.get(p.repo) || 0) + 1);
  const focusRepo = [...byRepo].sort((a, b) => b[1] - a[1])[0][0];
  const areas = new Map();
  for (const p of window) if (p.repo === focusRepo && p.area) areas.set(p.area, (areas.get(p.area) || 0) + 1);
  // abreviaturas de la misma área ("recomp" y "Recompiler") cuentan juntas, con el nombre largo
  for (const short of [...areas.keys()]) {
    const long = [...areas.keys()].find((k) => k !== short && short.length >= 5 && k.toLowerCase().startsWith(short.toLowerCase()));
    if (long) {
      areas.set(long, areas.get(long) + areas.get(short));
      areas.delete(short);
    }
  }
  const total = Math.max((activity.total || 0) - ((activity.items?.length || 0) - items.length), items.length);
  return { cells, legend, total, last, focus: { repo: focusRepo, areas: [...areas].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([a]) => a) }, fetchedAt: activity.fetchedAt };
}
