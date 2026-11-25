// Builds _site/: crawlable HTML for every address from the same templates the browser uses.
// No dependencies. Usage: node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import path from 'node:path';

const src = new URL('../dist/', import.meta.url).pathname;
const out = new URL('../_site/', import.meta.url).pathname;
const read = f => readFileSync(path.join(src, decodeURIComponent(f)), 'utf8');
const hash = s => createHash('sha256').update(s).digest('hex').slice(0, 10);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// ---- load the site's own scripts against a minimal DOM stub
const el = () => ({ dataset: {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], setAttribute() {}, append() {}, innerHTML: '' });
const root = Object.assign(el(), { dataset: { ssr: 'home:ka' } });
const document = { getElementById: () => root, documentElement: el(), head: el(), querySelector: () => null, querySelectorAll: () => [], addEventListener() {}, createElement: el };
const window = { matchMedia: () => ({ matches: false }), addEventListener() {}, document };
const ctx = vm.createContext({ window, document, location: { search: '', pathname: '/', hash: '' }, history: {}, requestAnimationFrame() {}, URLSearchParams, setTimeout, console });
for (const f of ['site-i18n.js', 'site-seo.js', 'site-v3.js']) vm.runInContext(read(f), ctx, { filename: f });
const seo = window.FitManagerSeo, { markup, faqs, plans } = window.FitManagerRender, dict = window.FitManagerI18n.en;

const missing = new Set();
const tr = s => { const k = s.trim(); if (!/[Ⴀ-ჿ]/.test(k)) return s; if (Object.hasOwn(dict, k)) return s.replace(k, () => dict[k]); missing.add(k); return s; };
const translate = html => html.replace(/>([^<]+)</g, (_, t) => `>${tr(t)}<`)
  .replace(/ (aria-label|placeholder|title)="([^"]*)"/g, (_, a, v) => ` ${a}="${esc(Object.hasOwn(dict, v) ? dict[v] : v)}"`);

// ---- structured data
const org = { '@type': 'Organization', '@id': `${seo.origin}/#organization`, name: 'Fit Manager', alternateName: 'ფიტ მენეჯერი', url: `${seo.origin}/`, logo: `${seo.origin}/icon-512.png`, email: 'info@fitmanager.ge', areaServed: { '@type': 'Country', name: 'Georgia' }, contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: 'info@fitmanager.ge', availableLanguage: ['ka', 'en'] } };
const site = { '@type': 'WebSite', '@id': `${seo.origin}/#website`, name: 'Fit Manager', alternateName: ['ფიტ მენეჯერი', 'fitmanager.ge'], url: `${seo.origin}/`, inLanguage: ['ka', 'en'], publisher: { '@id': org['@id'] } };
const app = lang => ({ '@type': 'SoftwareApplication', '@id': `${seo.origin}/#software`, name: 'Fit Manager', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: `${seo.origin}/`, image: `${seo.origin}/og-image.png`, inLanguage: ['ka', 'en'], publisher: { '@id': org['@id'] }, description: seo.head('home', lang).description,
  offers: plans.map(p => ({ '@type': 'Offer', name: p.n, price: p.p, priceCurrency: 'GEL', url: seo.origin + seo.pathFor('pricing', lang), priceSpecification: { '@type': 'UnitPriceSpecification', ...(p.n === 'Enterprise' ? { minPrice: p.p } : { price: p.p }), priceCurrency: 'GEL', unitText: 'MONTH' } })) });
const names = { ka: { home: 'მთავარი', features: 'ფუნქციები', how: 'როგორ მუშაობს', portals: 'კაბინეტები', pricing: 'ფასები', faq: 'კითხვები', contact: 'მოითხოვე დემო' } };
function jsonld(page, lang) {
  const info = seo.head(page, lang), graph = [org, site];
  graph.push({ '@type': 'WebPage', '@id': `${info.canonical}#webpage`, url: info.canonical, name: info.title, description: info.description, inLanguage: lang, isPartOf: { '@id': site['@id'] }, about: { '@id': `${seo.origin}/#software` } });
  graph.push(app(lang));
  if (page !== 'home') { const label = seo.landings[page]?.nav || names.ka[page]; const crumb = s => lang === 'en' ? dict[s] || s : s;
    graph.push({ '@type': 'BreadcrumbList', itemListElement: [['home', names.ka.home], [page, label]].map(([p, n], i) => ({ '@type': 'ListItem', position: i + 1, name: crumb(n), item: seo.origin + seo.pathFor(p, lang) })) }); }
  const qa = seo.landings[page]?.faq || (page === 'faq' ? faqs : null);
  if (qa) graph.push({ '@type': 'FAQPage', inLanguage: lang, mainEntity: qa.map(([q, a]) => { const t = s => lang === 'en' ? tr(s) : s; return { '@type': 'Question', name: t(q), acceptedAnswer: { '@type': 'Answer', text: t(a) } }; }) });
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

// ---- assets: one stylesheet, content-hashed URLs
rmSync(out, { recursive: true, force: true }); cpSync(src, out, { recursive: true });
const cssFiles = ['vendor/lenis.css', 'site-v3.css', 'site-v5.css', 'site-v6.css', 'site-v7.css'];
const css = cssFiles.map(read).join('\n').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n\s*/g, '\n');
writeFileSync(path.join(out, 'site.css'), css);
let shell = read('index.html');
shell = shell.replace(/ *<link rel="stylesheet" href="\/(?:vendor\/lenis|site-v\d)\.css" \/>\n/g, '').replace('</head>', `  <link rel="stylesheet" href="/site.css?v=${hash(css)}" />\n</head>`);
shell = shell.replace(/src="(\/[^"]+\.js)"/g, (_, f) => `src="${f}?v=${hash(read(f.slice(1)))}"`);

function pageHtml(page, lang) {
  const info = seo.head(page, lang), body = lang === 'en' ? translate(markup(page, lang)) : markup(page, lang);
  const ka = seo.origin + seo.pathFor(page, 'ka'), en = seo.origin + seo.pathFor(page, 'en');
  const extra = page === 'notfound' ? ['<meta name="robots" content="noindex" />'] : [
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />', `<link rel="canonical" href="${info.canonical}" />`,
    ...(info.alternates ? [`<link rel="alternate" hreflang="ka" href="${ka}" />`, `<link rel="alternate" hreflang="en" href="${en}" />`, `<link rel="alternate" hreflang="x-default" href="${ka}" />`] : []),
    `<script type="application/ld+json">${jsonld(page, lang)}</script>`];
  let h = shell.replace('<html lang="ka">', `<html lang="${lang}">`).replace(/<title>.*?<\/title>/, () => `<title>${esc(info.title)}</title>`);
  const put = (attr, v) => { h = h.replace(new RegExp(`(<meta ${attr} content=")[^"]*`), (_, a) => a + esc(v)); };
  put('name="description"', info.description); put('property="og:title"', info.title); put('property="og:description"', info.description); put('property="og:url"', info.canonical || seo.origin + '/'); put('property="og:locale"', lang === 'en' ? 'en_US' : 'ka_GE');
  return h.replace('</head>', () => `  ${extra.join('\n  ')}\n</head>`).replace('<div id="app"></div>', () => `<div id="app" data-ssr="${page}:${lang}">${body}</div>`);
}
const list = [];
const emit = (page, lang) => { const p = seo.pathFor(page, lang); mkdirSync(path.join(out, p), { recursive: true }); writeFileSync(path.join(out, p, 'index.html'), pageHtml(page, lang)); list.push([page, lang]); };
seo.core.forEach(p => emit(p, 'ka')); Object.keys(seo.landings).forEach(p => emit(p, 'ka')); seo.core.forEach(p => emit(p, 'en'));
writeFileSync(path.join(out, '404.html'), pageHtml('notfound', 'ka'));
const url = ([p, l]) => { const alt = seo.core.includes(p) ? [['ka', 'ka'], ['en', 'en'], ['x-default', 'ka']].map(([h, x]) => `<xhtml:link rel="alternate" hreflang="${h}" href="${seo.origin + seo.pathFor(p, x)}"/>`).join('') : ''; return `<url><loc>${seo.origin + seo.pathFor(p, l)}</loc>${alt}</url>`; };
writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${list.map(url).join('\n')}\n</urlset>\n`);
// IndexNow (Bing, Yandex): key file is published, payload is sent by the workflow after deploy.
const key = readdirSync(src).find(f => /^[0-9a-f]{32}\.txt$/.test(f)).slice(0, 32);
writeFileSync(path.join(new URL('..', import.meta.url).pathname, 'indexnow.json'), JSON.stringify({ host: 'fitmanager.ge', key, keyLocation: `${seo.origin}/${key}.txt`, urlList: list.map(([p, l]) => seo.origin + seo.pathFor(p, l)) }));
console.log(`built ${list.length} pages`); if (missing.size) console.warn('untranslated:', [...missing]);
