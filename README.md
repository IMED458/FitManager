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

## ფორმები → ელ-ფოსტა

საიტის სამივე ფორმა (Trial, დემო ლინკის მოთხოვნა, საკონტაქტო ფორმა) იგზავნება
`src/lib/sendLead.ts`-ის გავლით. რადგან ბილდი სტატიკურია, წერილს გადასცემს
form-to-email სერვისი (default: [Web3Forms](https://web3forms.com)).

გასაღების აღება: web3forms.com-ზე შეიყვანე ინბოქსის მისამართი
(`gimedashvili7@gmail.com`) → access key მოვა იმავე მეილზე. შემდეგ:

- **GitHub**: Settings → Secrets and variables → Actions → New repository secret,
  სახელი `LEAD_ACCESS_KEY`, მნიშვნელობა — გასაღები.
- **ლოკალურად**: `cp .env.example .env.local` და ჩასვი იქ.

გასაღების გარეშე ფორმა არ ამბობს ტყუილს „გაიგზავნა" — აჩვენებს შეცდომას და
პირდაპირ ელ-ფოსტის მისამართს.

## დეპლოი

`main`-ზე push ავტომატურად უშვებს `.github/workflows/deploy.yml`-ს:
typecheck → build → GitHub Pages. custom დომენი `public/CNAME`-შია.
