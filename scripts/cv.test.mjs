import test from 'node:test';
import assert from 'node:assert/strict';
import { blockedIn, loadHashes } from './check-titles.mjs';
import fs from 'node:fs';
import { fill, parse, placeholders, renderCv, resolveVersion, runs, shortStars, stamp, VARIANTS } from './cv.mjs';

const read = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const snapshot = JSON.parse(read('src/data/github-snapshot.json'));
const values = placeholders(snapshot, 'en');
const valuesFor = (lang) => placeholders(snapshot, lang);
const SECTIONS = { en: ['EDUCATION', 'OPEN SOURCE', 'PROJECTS', 'SKILLS', 'OTHER'], es: ['EDUCACIÓN', 'PROYECTOS DE CÓDIGO ABIERTO', 'PROYECTOS', 'HABILIDADES', 'OTROS'] };

async function extract(pdf) {
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const doc = await getDocument({ data: new Uint8Array(pdf), useSystemFonts: false, verbosity: 0 }).promise;
  const page = await doc.getPage(1);
  const text = (await page.getTextContent()).items.map((i) => i.str).join(' ').replace(/\s+/g, ' ');
  const links = (await page.getAnnotations()).filter((a) => a.subtype === 'Link').map((a) => a.url || a.unsafeUrl);
  const meta = (await doc.getMetadata()).info;
  return { pages: doc.numPages, text, links, meta };
}

for (const lang of ['en', 'es']) {
  test(`CV ${lang}: una página, todas las secciones, sin huecos, enlaces válidos y metadatos`, async () => {
    const { pdf, size } = await renderCv(lang, fill(read(VARIANTS[lang].source), valuesFor(lang)));
    const r = await extract(pdf);
    assert.equal(r.pages, 1);
    assert.ok(size >= 10 && size <= 12);
    assert.match(r.text, /Genaro Febbo Yapur/);
    for (const s of SECTIONS[lang]) assert.ok(r.text.includes(s), `falta la sección ${s}`);
    assert.doesNotMatch(r.text, /\{\{|\}\}|\[FALTA|\bFALTA\b/);
    assert.ok(r.text.includes(String(values.xcl_prs_merged)) && r.text.includes(valuesFor(lang).stremio_stars));
    assert.ok(r.text.includes(valuesFor(lang).xcl_stars.replace('\u00a0', ' ')), 'stars redondeadas');
    assert.doesNotMatch(r.text, /pulls\?q=|is%3Apr/, 'la URL de la lista de PRs no se muestra');
    assert.ok(r.text.includes(lang === 'es' ? 'Todos los pull requests mergeados →' : 'All merged pull requests →'));
    assert.ok(r.links.includes('https://github.com/xcl-dev/xcl/pulls?q=is%3Apr+author%3Agefydev+is%3Amerged'));
    assert.ok(r.links.length >= 20, `${r.links.length} enlaces`);
    for (const url of r.links) assert.doesNotThrow(() => new URL(url));
    assert.ok(r.links.every((u) => /^(https:\/\/(github\.com|linkedin\.com|gefy\.dev|spotifust\.gefy\.dev|cenba\.com\.ar|comidolar\.com\.ar)|mailto:hi@gefy\.dev)/.test(u)), r.links.join(' '));
    assert.ok(r.links.includes('https://github.com/xcl-dev/xcl/pull/2074'));
    assert.equal(r.meta.Author, 'Genaro Febbo Yapur');
    assert.match(r.meta.Title, /Genaro Febbo Yapur/);
    // ningún nombre de juego o estudio (la lista se comprueba por hashes, no se escribe acá)
    assert.ok(!blockedIn(r.text, loadHashes({})), 'el CV nombra algo bloqueado');
    assert.doesNotMatch(r.text, /newer retail game/i);
  });
}

test('si queda un {{placeholder}} o [FALTA] el build falla', () => {
  assert.throws(() => fill('x {{no_existe}} y', values), /sin completar/);
  assert.throws(() => fill('x {{xcl_stars}}', {}), /sin completar/);
  assert.throws(() => fill('algo [FALTA: dato]', values), /sin completar/);
});

test('si no entra en una página falla en vez de recortar', async () => {
  const long = `**N**\ncontacto\n### A\n${Array.from({ length: 90 }, (_, i) => `- línea ${i} de contenido`).join('\n')}\n`;
  await assert.rejects(renderCv('en', long), /no entra en una página/);
});

test('enlaces escritos como texto quedan clicables', () => {
  assert.deepEqual(runs('Web: gefy.dev').at(-1), { text: 'gefy.dev', link: 'https://gefy.dev' });
  assert.equal(runs('hi@gefy.dev')[0].link, 'mailto:hi@gefy.dev');
  assert.equal(runs('xcl-dev/xcl')[0].link, 'https://github.com/xcl-dev/xcl');
  assert.equal(parse('### T\n- a\nb').length, 3);
});

test('el mismo contenido y fecha dan exactamente el mismo PDF (para no purgar la caché sin cambios)', async () => {
  const md = fill(read(VARIANTS.en.source), values);
  const date = new Date('2026-01-02T00:00:00Z');
  const a = await renderCv('en', md, date);
  await new Promise((r) => setTimeout(r, 1100));
  const b = await renderCv('en', md, date);
  assert.ok(a.pdf.equals(b.pdf));
});

test('la fecha es la del último cambio de contenido o datos, no la del build', () => {
  const first = resolveVersion('contenido', [], Date.parse('2026-11-26T12:17:45Z'));
  assert.equal(first.updatedAt, '2026-11-26T12:17:00.000Z');
  // mismo contenido, otro build: se conserva (sirve la caché de build o el archivo versionado)
  assert.deepEqual(resolveVersion('contenido', [undefined, first], Date.parse('2026-11-28T00:00:00Z')), first);
  // cambió un número: fecha nueva
  assert.equal(resolveVersion('contenido 36', [first, first], Date.parse('2026-11-28T00:00:00Z')).updatedAt, '2026-11-28T00:00:00.000Z');
});

test('el pie dice la fecha y hora UTC en cada idioma y entra en la página; CreationDate y ModDate salen de ella', async () => {
  const date = new Date('2026-11-26T12:17:00Z');
  assert.equal(stamp('en', date), 'Updated 26 Nov 2026, 12:17 UTC');
  assert.equal(stamp('es', date), 'Actualizado el 26 nov 2026, 12:17 UTC');
  for (const lang of ['en', 'es']) {
    const { pdf } = await renderCv(lang, fill(read(VARIANTS[lang].source), valuesFor(lang)), date);
    const r = await extract(pdf);
    assert.equal(r.pages, 1);
    assert.ok(r.text.includes(stamp(lang, date)), r.text.slice(-120));
    assert.match(r.meta.CreationDate, /^D:20261126121700/);
    assert.match(r.meta.ModDate, /^D:20261126121700/);
  }
});

test('stars redondeadas solo en el CV; una estrella más no cambia el texto ni la fecha, un PR más sí', () => {
  assert.deepEqual([shortStars(999, 'en'), shortStars(1000, 'en'), shortStars(8437, 'en'), shortStars(8437, 'es'), shortStars(917, 'es')], ['999', '1.0k', '8.4k', '8,4\u00a0k', '917']);
  const snap = (stars, merged) => ({ stars: { 'xcl-dev/xcl': { value: stars }, 'REVENGE977/stremio-enhanced': { value: 917 } }, prs: { 'xcl-dev/xcl': { total: 43, merged }, 'REVENGE977/stremio-enhanced': { total: 10, merged: 8 } } });
  for (const lang of ['en', 'es']) {
    const md = (s) => fill(read(VARIANTS[lang].source), placeholders(s, lang));
    const first = resolveVersion(md(snap(8427, 35)), [], Date.parse('2026-01-01T00:00:00Z'));
    assert.equal(resolveVersion(md(snap(8440, 35)), [first], Date.parse('2026-02-01T00:00:00Z')).updatedAt, first.updatedAt);
    assert.notEqual(resolveVersion(md(snap(8440, 36)), [first], Date.parse('2026-02-01T00:00:00Z')).updatedAt, first.updatedAt);
  }
});
