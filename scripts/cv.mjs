// Genera el CV en PDF antes de compilar: public/cv.pdf (EN, Letter) y public/es/cv.pdf (ES, A4).
// Contenido: src/data/cv/cv.{en,es}.md. Números: src/data/github-snapshot.json (el mismo que usa el sitio).
// Una columna, texto real, Arimo (métrica de Arial) embebida, sin tablas ni encabezado/pie. Falla (y corta el build) si queda un
// {{placeholder}} o [FALTA], o si no entra en una página al tamaño mínimo: nunca recorta contenido.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import PDFDocument from 'pdfkit';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FONTS = {
  regular: require.resolve('@expo-google-fonts/arimo/400Regular/Arimo_400Regular.ttf'),
  bold: require.resolve('@expo-google-fonts/arimo/700Bold/Arimo_700Bold.ttf')
};

export const VARIANTS = {
  en: { source: 'src/data/cv/cv.en.md', out: 'public/cv.pdf', size: 'LETTER', title: 'Genaro Febbo Yapur — Resume' },
  es: { source: 'src/data/cv/cv.es.md', out: 'public/es/cv.pdf', size: 'A4', title: 'Genaro Febbo Yapur — Currículum' }
};
const MARGIN = 36; // 0,5"
const SIZES = [11, 10.75, 10.5, 10.25, 10]; // rango 10–11 pt: se usa el más grande que entra en una página

export function placeholders(snapshot) {
  const xcl = 'xcl-dev/xcl';
  const stremio = 'REVENGE977/stremio-enhanced';
  return {
    xcl_prs_merged: snapshot.prs?.[xcl]?.merged,
    xcl_prs_total: snapshot.prs?.[xcl]?.total,
    xcl_stars: snapshot.stars?.[xcl]?.value,
    stremio_prs_merged: snapshot.prs?.[stremio]?.merged,
    stremio_prs_total: snapshot.prs?.[stremio]?.total,
    stremio_stars: snapshot.stars?.[stremio]?.value
  };
}

export function fill(text, values) {
  const out = text.replace(/\{\{(\w+)\}\}/g, (m, k) => (Number.isInteger(values[k]) ? String(values[k]) : m));
  const left = out.match(/\{\{[^}]*\}\}|\[FALTA[^\]]*\]?/g);
  if (left) throw new Error(`el CV tiene datos sin completar: ${[...new Set(left)].join(', ')}`);
  return out;
}

export function parse(md) {
  const blocks = [];
  for (const line of md.split('\n').map((l) => l.trimEnd())) {
    if (!line.trim()) blocks.push({ type: 'gap' });
    else if (line.startsWith('### ')) blocks.push({ type: 'section', text: line.slice(4) });
    else if (line.startsWith('- ')) blocks.push({ type: 'bullet', text: line.slice(2) });
    else blocks.push({ type: 'line', text: line });
  }
  return blocks;
}

// Trozos con estilo y enlace: **negrita**, [texto](url), y dominios o mails escritos sueltos.
const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^)]+)\)|([\w.+-]+@[\w-]+\.[\w.]+)|((?:github\.com|linkedin\.com|gefy\.dev|spotifust\.gefy\.dev|cenba\.com\.ar|comidolar\.com\.ar)(?:\/[^\s·]*)?|(?:xcl-dev\/xcl|REVENGE977\/stremio-enhanced))/g;
export function runs(text) {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) out.push({ text: text.slice(last, m.index) });
    if (m[1]) out.push({ text: m[1], bold: true });
    else if (m[2]) out.push({ text: m[2], link: m[3] });
    else if (m[4]) out.push({ text: m[4], link: `mailto:${m[4]}` });
    else {
      const repo = /^(xcl-dev|REVENGE977)\//.test(m[5]);
      out.push({ text: m[5], link: repo ? `https://github.com/${m[5]}` : `https://${m[5]}` });
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

// Maquetado propio (palabra por palabra) para medir la altura exacta y poner cada enlace en su lugar.
function layout(doc, blocks, size, draw) {
  const width = doc.page.width - MARGIN * 2;
  const lh = size * 1.22;
  let y = MARGIN;
  let seen = 0;
  const write = (parts, { x = MARGIN, fontSize = size, bold = false, align = 'left' } = {}) => {
    const words = [];
    // un enlace corto ("PR #101") no se parte entre líneas
    for (const r of parts) for (const w of r.link && r.text.length <= 40 ? [r.text] : r.text.split(/(\s+)/)) if (w) words.push({ ...r, text: w, bold: bold || r.bold });
    const max = MARGIN + width - x;
    const measure = (w) => doc.font(w.bold ? 'bold' : 'regular').fontSize(fontSize).widthOfString(w.text);
    const lines = [[]];
    let used = 0;
    // un "trozo" sin espacios (p. ej. una URL larga) más ancho que la línea se parte por caracteres
    const pieces = words.flatMap((w) => {
      if (measure(w) <= max) return [w];
      const out = [];
      let cur = '';
      for (const ch of w.text) {
        if (measure({ ...w, text: cur + ch }) > max) {
          out.push({ ...w, text: cur });
          cur = ch;
        } else cur += ch;
      }
      return [...out, { ...w, text: cur }];
    });
    for (const w of pieces) {
      const wd = measure(w);
      if (used + wd > max && used > 0 && w.text.trim()) {
        lines.push([]);
        used = 0;
      }
      if (used === 0 && !w.text.trim()) continue;
      lines.at(-1).push({ ...w, width: wd });
      used += wd;
    }
    for (const line of lines) {
      if (draw) {
        const total = line.reduce((a, w) => a + w.width, 0);
        let cx = align === 'center' ? MARGIN + (width - total) / 2 : x;
        // se dibuja por tramos del mismo estilo y enlace, así el texto extraído sale en orden y con sus espacios
        const groups = [];
        for (const w of line) {
          const g = groups.at(-1);
          if (g && g.bold === w.bold && g.link === w.link) {
            g.text += w.text;
            g.width += w.width;
          } else groups.push({ ...w });
        }
        for (const g of groups) {
          doc.font(g.bold ? 'bold' : 'regular').fontSize(fontSize).fillColor(g.link ? '#0b3d91' : '#111').text(g.text, cx, y, { lineBreak: false });
          if (g.link) doc.link(cx, y, g.width, fontSize * 1.15, g.link);
          cx += g.width;
        }
      }
      y += fontSize * 1.22;
    }
  };

  for (const b of blocks) {
    if (b.type === 'gap') {
      if (seen > 2) y += size * 0.22;
      continue;
    }
    seen += 1;
    if (seen === 1) write(runs(b.text.replace(/\*\*/g, '')), { fontSize: 19, bold: true, align: 'center' });
    else if (seen === 2) {
      write(runs(b.text), { align: 'center' });
      y += size * 0.3;
    }
    else if (b.type === 'section') {
      y += size * 0.35;
      write([{ text: b.text.toUpperCase() }], { fontSize: size + 0.5, bold: true });
      if (draw) doc.moveTo(MARGIN, y).lineTo(MARGIN + width, y).lineWidth(0.6).strokeColor('#444').stroke();
      y += size * 0.3;
    } else if (b.type === 'bullet') {
      if (draw) doc.font('regular').fontSize(size).fillColor('#111').text('•', MARGIN + 4, y, { lineBreak: false });
      write(runs(b.text), { x: MARGIN + 14 });
    } else write(runs(b.text));
  }
  return { bottom: y, lh };
}

function newDocument(variant, lang) {
  // margen inferior 0 en el motor: el control de "una sola página" lo hace layout(), no el salto automático
  const doc = new PDFDocument({ size: variant.size, margins: { top: MARGIN, left: MARGIN, right: MARGIN, bottom: 0 }, lang, pdfVersion: '1.7', displayTitle: true, info: { Title: variant.title, Author: 'Genaro Febbo Yapur', Subject: 'CV', CreationDate: new Date() } });
  doc.registerFont('regular', FONTS.regular);
  doc.registerFont('bold', FONTS.bold);
  return doc;
}

export async function renderCv(lang, markdown) {
  const variant = VARIANTS[lang];
  const blocks = parse(markdown);
  const probe = newDocument(variant, lang);
  const size = SIZES.find((s) => layout(probe, blocks, s, false).bottom <= probe.page.height - MARGIN);
  if (!size) {
    const over = Math.ceil(layout(probe, blocks, SIZES.at(-1), false).bottom - (probe.page.height - MARGIN));
    throw new Error(`el CV ${lang} no entra en una página ni a ${SIZES.at(-1)} pt (sobran ${over} pt): hay que recortar contenido`);
  }
  const doc = newDocument(variant, lang);
  const chunks = [];
  doc.on('data', (c) => chunks.push(c));
  const done = new Promise((resolve, reject) => {
    doc.on('end', resolve);
    doc.on('error', reject);
  });
  layout(doc, blocks, size, true);
  doc.end();
  await done;
  return { pdf: Buffer.concat(chunks), size };
}

export async function main({ log = console.log } = {}) {
  const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'src/data/github-snapshot.json'), 'utf8'));
  const values = placeholders(snapshot);
  for (const [lang, v] of Object.entries(VARIANTS)) {
    const started = Date.now();
    const { pdf, size } = await renderCv(lang, fill(fs.readFileSync(path.join(root, v.source), 'utf8'), values));
    fs.mkdirSync(path.dirname(path.join(root, v.out)), { recursive: true });
    fs.writeFileSync(path.join(root, v.out), pdf);
    log(`[cv] ${v.out}: ${v.size}, ${size} pt, ${Math.round(pdf.length / 1024)} KB, ${Date.now() - started} ms`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
