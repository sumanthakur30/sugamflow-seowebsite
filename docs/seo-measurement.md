# SEO measurement

No Search Console property, Bing Webmaster Tools property, or analytics tag was present in this repository when this plan was written. Do not treat any rank, click, or impression number as known until those tools show it.

## Baseline to record after verification

Record these before setting a target:

- Count of sitemap URLs (`sitemap.xml`).
- Count of indexed pages in Search Console and Bing, once the property is verified.
- Impressions, clicks, and average position for each URL in `docs/seo-keyword-map.md`.
- Queries that already show the site, branded and non-branded, with no invented volumes.
- Demo and contact submissions that arrived from an organic landing page.
- Crawl errors for public URLs, and any accidental index of `/login`, `/admin`, or `/api`.

## What to watch

- Indexable pages: homepage, catalog pages with `sitemap: true`, `/modules`, module pages, `/careers`.
- Excluded: login, register, admin, API, inpatient app route, lab-report lookup, and other signed-in screens listed in `robots.txt`. robots.txt is not access control.
- Organic landing page, query, clicks, impressions, and click-through rate from Search Console.
- The same URL set in Bing Webmaster Tools.
- Contact and demo form completions. Do not send field values to analytics.
- This repository has no analytics snippet. Add one only after a real measurement ID exists, and add it once.

## Local check

```bash
node tools/generate-public-html.mjs
node tools/check-public-seo.mjs
```

The check confirms unique titles and descriptions, absolute canonical URLs, sitemap coverage, robots.txt, and JSON-LD. It does not measure Core Web Vitals. A Lighthouse or PageSpeed Insights run is still required before anyone says those metrics pass.

## Not claimed

No ranking position, traffic increase, or rich-result guarantee follows from this work. `llms.txt` is a list of public pages for people and tools that fetch it. It is not a ranking system.
