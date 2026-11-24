# Fit Manager — საიტი

🌐 **https://fitmanager.imed.com.ge**

სტატიკური საიტი: build პროცესი და npm პაკეტები არ სჭირდება.

| ფაილი | დანიშნულება |
| --- | --- |
| `dist/index.html` | საწყისი ფაილი |
| `dist/site-v3.js` | გვერდები, ტექსტები, მენიუ, დემოს ფორმა |
| `dist/site-i18n.js` | ინგლისური ვერსია |
| `dist/site-v3.css`, `site-v5.css`, `site-v6.css` | დიზაინი |
| `dist/site-v5.js` | 3D ეფექტები და ანიმაციები |
| `dist/assets/`, `dist/vendor/` | სურათები; GSAP, ScrollTrigger, Lenis |
| `dist/CNAME`, `robots.txt`, `sitemap.xml`, `site.webmanifest` | დომენი, SEO, PWA |

## ლოკალურად

```bash
python3 -m http.server 8080 -d dist
```

## დეპლოი

`main`-ზე push ავტომატურად აქვეყნებს `dist/`-ს GitHub Pages-ზე.
