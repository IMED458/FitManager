/**
 * Static pre-render step.
 *
 * `vite build` produces a client bundle with an empty <div id="root">, which is
 * bad for SEO: crawlers that do not execute JS see nothing. Here we build an SSR
 * bundle of the same App, render it to HTML and inject it into dist/index.html,
 * then emit the JSON-LD structured data and sitemap.xml from the real content.
 */
import { build } from 'vite';
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SITE_URL, SITE_NAME, CONTACT_EMAIL, CONTACT_PHONE } from './site.config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrOut = path.join(root, '.ssr-tmp');

const today = new Date().toISOString().slice(0, 10);

async function buildSsrBundle() {
  await rm(ssrOut, { recursive: true, force: true });
  await mkdir(ssrOut, { recursive: true });
  await build({
    root,
    logLevel: 'warn',
    build: {
      ssr: path.join(root, 'src/entry-server.tsx'),
      outDir: ssrOut,
      emptyOutDir: true,
      cssCodeSplit: false,
    },
  });
  return pathToFileURL(path.join(ssrOut, 'entry-server.js')).href;
}

/** Pull the Georgian FAQ straight out of the app translations so schema never drifts. */
async function loadFaq() {
  const src = await readFile(path.join(root, 'src/translations.ts'), 'utf8');
  const start = src.indexOf('faq: {');
  if (start === -1) return [];
  const slice = src.slice(start, src.indexOf('// Demo Form', start));
  const items = [];
  const re = /question:\s*'((?:[^'\\]|\\.)*)',\s*\n\s*answer:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(slice))) {
    items.push({
      question: m[1].replace(/\\'/g, "'"),
      answer: m[2].replace(/\\'/g, "'"),
    });
  }
  return items;
}

function jsonLd(faqItems) {
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ['ფიტ მენეჯერი', 'Fit Manager Georgia'],
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      areaServed: 'GE',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'GE',
        addressLocality: 'Tbilisi',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: CONTACT_PHONE,
          email: CONTACT_EMAIL,
          contactType: 'sales',
          availableLanguage: ['ka', 'en'],
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: 'ka-GE',
      publisher: { '@id': `${SITE_URL}/#organization` },
      description:
        'სპორტდარბაზის პროგრამა და ფიტნეს კლუბის მართვის სისტემა: წევრები, აბონემენტები, QR Check-in, ფინანსები, გაყიდვები და ტრენერები ერთ სივრცეში.',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: 'Fit Manager',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Gym & Fitness Club Management Software',
      operatingSystem: 'Web (Chrome, Safari, Edge, Firefox), Windows, macOS, iOS, Android',
      url: `${SITE_URL}/`,
      inLanguage: ['ka', 'en'],
      image: `${SITE_URL}/og-image.png`,
      publisher: { '@id': `${SITE_URL}/#organization` },
      description:
        'Fit Manager არის სპორტდარბაზის, გიმის, ფიტნეს კლუბისა და საცურაო აუზის მართვის პროგრამა: წევრების ბაზა, აბონემენტების პროგრამა, QR Check-in, სალარო და ფინანსები, პროდუქტების გაყიდვები, ტრენერების კაბინეტი და ავტომატური SMS შეხსენებები.',
      featureList: [
        'წევრების ცენტრალიზებული ბაზა და პროფილები',
        'აბონემენტების მართვა, ვადის კონტროლი და გაყინვა',
        'QR და ID Check-in ვიზიტების აღრიცხვით',
        'სალარო, ფინანსები და დღიური შემოსავლის ანგარიში',
        'პროდუქტების გაყიდვა და მარაგების მართვა',
        'ტრენერების და თანამშრომლების მართვა',
        'ავტომატური SMS შეხსენებები ვადაგასულ წევრებზე',
        'Excel/CSV ექსპორტი და ბიზნეს სტატისტიკა',
        'წევრის და ტრენერის პირადი კაბინეტი',
      ],
      offers: [
        {
          '@type': 'Offer',
          name: 'Basic',
          price: '99',
          priceCurrency: 'GEL',
          category: 'თვიური გამოწერა',
          url: `${SITE_URL}/#pricing`,
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Growth',
          price: '179',
          priceCurrency: 'GEL',
          category: 'თვიური გამოწერა',
          url: `${SITE_URL}/#pricing`,
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Pro',
          price: '299',
          priceCurrency: 'GEL',
          category: 'თვიური გამოწერა',
          url: `${SITE_URL}/#pricing`,
          availability: 'https://schema.org/InStock',
        },
      ],
      softwareHelp: `${SITE_URL}/#faq`,
      isAccessibleForFree: false,
      potentialAction: {
        '@type': 'RegisterAction',
        name: '14 დღე უფასოდ',
        target: `${SITE_URL}/#trial`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'მთავარი', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'ფუნქციები', item: `${SITE_URL}/#features` },
        { '@type': 'ListItem', position: 3, name: 'ფასები', item: `${SITE_URL}/#pricing` },
        { '@type': 'ListItem', position: 4, name: 'კითხვა-პასუხი', item: `${SITE_URL}/#faq` },
        { '@type': 'ListItem', position: 5, name: 'კონტაქტი', item: `${SITE_URL}/#contact` },
      ],
    },
  ];

  if (faqItems.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq-schema`,
      inLanguage: 'ka-GE',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

function sitemap() {
  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${SITE_URL}/#features`, priority: '0.9', changefreq: 'monthly' },
    { loc: `${SITE_URL}/#portals`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE_URL}/#how-it-works`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${SITE_URL}/#pricing`, priority: '0.9', changefreq: 'monthly' },
    { loc: `${SITE_URL}/#faq`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE_URL}/#contact`, priority: '0.7', changefreq: 'monthly' },
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="ka" href="${u.loc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.loc}"/>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
}

const entry = await buildSsrBundle();
const { render } = await import(entry);
const appHtml = render();

const faqItems = await loadFaq();
const indexPath = path.join(dist, 'index.html');
let html = await readFile(indexPath, 'utf8');

html = html.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
);
html = html.replace(
  '<!--seo-jsonld-->',
  `<script type="application/ld+json">${jsonLd(faqItems)}</script>`,
);

await writeFile(indexPath, html, 'utf8');
await writeFile(path.join(dist, 'sitemap.xml'), sitemap(), 'utf8');
// GitHub Pages serves 404.html for unknown paths; keep deep links on the SPA.
await writeFile(path.join(dist, '404.html'), html, 'utf8');
await rm(ssrOut, { recursive: true, force: true });

console.log(
  `prerender: ${(appHtml.length / 1024).toFixed(1)} KB of HTML, ${faqItems.length} FAQ entries in schema, sitemap for ${SITE_URL}`,
);
