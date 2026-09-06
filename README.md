# SugamFlow public website

Static public pages for [https://sugamflow.com](https://sugamflow.com).

This repository is **marketing and documentation only**. It does not contain the ERP dashboard, APIs, tokens, or customer data.

Sign-in and shop/clinic screens stay in [shop-management](https://github.com/sumanthakur30/shop-management).

## Local preview

Serve the repo root as a static site (any static server). Example:

```bash
npx --yes serve -l 4173 .
```

## Rebuild pages

Edit `content/public-marketing.json`, then:

```bash
node tools/generate-public-html.mjs
```

That refreshes route folders, `sitemap.xml`, and `llms.txt`. It does not overwrite `index.html`.

## Deploy

Copy this repo root to the public web root (for example `/var/www/sugamflow-www`). Keep the ERP build in a separate folder so an ERP deploy cannot overwrite these files.
