// Builds /public from index.template.html + band.config.mjs.
// Run by Vercel on every deploy (see vercel.json) and by `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = process.env.OUT_DIR ? path.resolve(process.env.OUT_DIR) : path.join(root, 'public');
const cfg = structuredClone((await import(pathToFileURL(path.resolve(process.env.BAND_CONFIG || path.join(root, 'band.config.mjs'))).href)).default);

// ── validation ──────────────────────────────────────────────────────────────
const fail = (m) => { console.error('\n✖ band.config.mjs: ' + m + '\n'); process.exit(1); };
if (!/^[a-z0-9-]+$/.test(cfg.site?.slug || '')) fail('site.slug must be lowercase letters, numbers and dashes only.');
if (!/^https?:\/\/[^/]+/.test(cfg.site?.url || '')) fail('site.url must look like https://www.yourband.com');
for (const k of ['name', 'firstName', 'shortName', 'initials']) if (!cfg.artist?.[k]) fail(`artist.${k} is required.`);
for (const k of ['bg', 'bg2', 'bg3', 'gold', 'goldLt', 'amber', 'cream', 'text', 'dim'])
  if (!/^#[0-9a-fA-F]{6}$/.test(cfg.theme?.[k] || '')) fail(`theme.${k} must be a 6-digit hex color like #c9943a.`);

// ── derived values ──────────────────────────────────────────────────────────
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).join(',');
cfg.theme.goldRgb = rgb(cfg.theme.gold);
cfg.theme.bgRgb = rgb(cfg.theme.bg);
cfg.theme.creamRgb = rgb(cfg.theme.cream);
cfg.site.url = cfg.site.url.replace(/\/+$/, '');
cfg.site.ogImageUrl = cfg.site.ogImage ? `${cfg.site.url}/${cfg.site.ogImage.replace(/^\/+/, '')}` : '';
cfg.year = new Date().getFullYear();

// ── tiny template engine: {{path}} {{{raw}}} {{#if path}}…{{/if}} ───────────
const get = (p) => p.split('.').reduce((o, k) => (o == null ? undefined : o[k]), cfg);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const warned = new Set();

let html = fs.readFileSync(path.join(root, 'index.template.html'), 'utf8');

const ifRe = /\{\{#if ([\w.]+)\}\}((?:(?!\{\{#if )[\s\S])*?)\{\{\/if\}\}/g;
for (let prev; prev !== html; ) { prev = html; html = html.replace(ifRe, (_, p, body) => (get(p) ? body : '')); }

html = html.replace(/\{\{\{__json\}\}\}/g, () => JSON.stringify(cfg).replace(/</g, '\\u003c'));
html = html.replace(/\{\{([\w.]+)\}\}/g, (_, p) => {
  const v = get(p);
  if (v === undefined && !warned.has(p)) { warned.add(p); console.warn(`⚠ no value for {{${p}}} — check band.config.mjs`); }
  return esc(v ?? '');
});

// ── write /public ───────────────────────────────────────────────────────────
try { fs.rmSync(out, { recursive: true, force: true }); } catch { /* locked folder: files are overwritten below */ }
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'index.html'), html);
for (const f of ['images', 'favicon.svg', 'robots.txt']) {
  const src = path.join(root, f);
  if (fs.existsSync(src)) fs.cpSync(src, path.join(out, f), { recursive: true });
}
// ── bundle the browser upload helper for the admin's video upload ─────────
try {
  const { build } = await import('esbuild');
  await build({
    entryPoints: [path.join(root, 'scripts', 'blob-client-entry.js')],
    outfile: path.join(out, 'blob-client.js'),
    bundle: true, format: 'esm', platform: 'browser', minify: true, logLevel: 'error',
  });
} catch (e) { console.warn('⚠ could not bundle blob-client.js — video upload disabled:', e.message); }
console.log(`✔ Built ${cfg.artist.name} → public/index.html`);
