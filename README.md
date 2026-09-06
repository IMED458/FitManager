# Fit Manager

სპორტდარბაზის, გიმის, ფიტნეს კლუბისა და საცურაო აუზის მართვის პროგრამა —
წევრები, აბონემენტები, QR Check-in, ფინანსები, გაყიდვები და ტრენერები ერთ სისტემაში.

🌐 **https://fitmanager.imed.com.ge**

## ლოკალურად გაშვება

```bash
npm install
npm run dev        # http://localhost:3000
```

## ბილდი

```bash
npm run build      # vite build + სტატიკური pre-render (SEO)
npm run preview    # ბილდის ლოკალური შემოწმება → http://localhost:4173
npm run lint       # TypeScript typecheck
```

`npm run build` ორ ეტაპად მუშაობს:

1. `vite build` — კლიენტის ბანდლი `dist/`-ში;
2. `scripts/prerender.mjs` — იმავე აპლიკაციას რენდერავს სერვერზე (`src/entry-server.tsx`)
   და მზა HTML-ს ჩასვამს `dist/index.html`-ში, რომ საძიებო სისტემებმა JavaScript-ის
   გაშვების გარეშეც დაინახონ სრული კონტენტი. იქვე გენერირდება JSON-LD structured data
   და `sitemap.xml`.

კლიენტზე `src/main.tsx` ამ HTML-ს **ჰიდრატაციას** უკეთებს (`hydrateRoot`), ამიტომ
ინტერაქტიულობა და დიზაინი უცვლელია.

## SEO

| ელემენტი | სად |
|---|---|
| title / description / keywords / canonical / hreflang | `index.html` |
| Open Graph + Twitter Card + `og-image.png` | `index.html`, `public/` |
| JSON-LD: Organization, WebSite, SoftwareApplication (+Offers), BreadcrumbList, FAQPage | `scripts/prerender.mjs` |
| `robots.txt`, `sitemap.xml` | `public/robots.txt`, ბილდისას გენერირებული |
| PWA manifest + favicon/apple-touch icons | `public/site.webmanifest`, `public/*.png`, `public/favicon.svg` |
| სტატიკური pre-render (crawlable HTML) | `scripts/prerender.mjs` |

FAQ structured data ავტომატურად იკითხება `src/translations.ts`-იდან, ამიტომ
კითხვა-პასუხის განახლებისას schema თავისით განახლდება.

დომენი ერთ ადგილას იმართება: `scripts/site.config.mjs` (ან `SITE_URL` env ცვლადი).

## დეპლოი

`main`-ზე push ავტომატურად უშვებს `.github/workflows/deploy.yml`-ს:
typecheck → build → GitHub Pages. custom დომენი `public/CNAME`-შია.
