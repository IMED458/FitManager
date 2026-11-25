# Fit Manager — საიტი

🌐 **https://fitmanager.ge**

სტატიკური საიტი: npm პაკეტები არ სჭირდება. `scripts/build.mjs` ქმნის `_site/`-ს (SEO-სთვის მზა HTML).

| ფაილი | დანიშნულება |
| --- | --- |
| `dist/index.html` | საწყისი ფაილი |
| `dist/site-v3.js` | გვერდები, ტექსტები, მენიუ, დემოს ფორმა |
| `dist/site-i18n.js` | ინგლისური ვერსია |
| `dist/site-v3.css`, `site-v5.css`, `site-v6.css`, `site-v7.css` (მობილური) | დიზაინი |
| `dist/site-v5.js` | 3D ეფექტები და ანიმაციები |
| `dist/site-seo.js` | სათაურები, აღწერები და საკვანძო სიტყვების გვერდები |
| `dist/assets/`, `dist/vendor/` | სურათები; GSAP, ScrollTrigger, Lenis |
| `dist/CNAME`, `robots.txt`, `site.webmanifest` | დომენი, SEO, PWA |

## ლოკალურად

```bash
node scripts/build.mjs
python3 -m http.server 8080 -d _site
```

## დეპლოი

`main`-ზე push ავტომატურად აგებს და აქვეყნებს `_site/`-ს GitHub Pages-ზე.

## დემოს ფორმა → ელფოსტა

ფორმა [Web3Forms](https://web3forms.com)-ით იგზავნება `info@fitmanager.ge`-ზე. გასაღები იწერება
`dist/site-v3.js`-ში, ცვლადში `LEAD_ACCESS_KEY`. თუ ცარიელია, იხსნება მომხმარებლის ელფოსტის აპი.
