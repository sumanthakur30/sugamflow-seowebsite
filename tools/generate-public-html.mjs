/**
 * Writes crawlable HTML for public marketing routes + regenerates sitemap.xml.
 * Does not overwrite the hand-written homepage index.html.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(readFileSync(join(root, 'content/public-marketing.json'), 'utf8'));
const origin = 'https://sugamflow.com';
const outDir = root;

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function canonical(path) {
  return path === '/' ? `${origin}/` : `${origin}${path}`;
}

function jsonLd(page) {
  const crumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'SugamFlow', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: page.h1, item: canonical(page.path) }
    ]
  };
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: 'SugamFlow',
      url: `${origin}/`,
      email: 'career@sugamflow.com',
      logo: `${origin}/assets/branding/sugamflow-logo.png`
    },
    crumbs
  ];
  if (page.schema === 'faq' && page.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: page.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      }))
    });
  } else if (page.schema === 'article') {
    graph.push({
      '@type': 'Article',
      headline: page.h1,
      description: page.description,
      author: { '@id': `${origin}/#organization` },
      publisher: { '@id': `${origin}/#organization` },
      mainEntityOfPage: canonical(page.path)
    });
  } else if (page.schema === 'software') {
    graph.push({
      '@type': 'SoftwareApplication',
      name: 'SugamFlow',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: canonical(page.path),
      description: page.description,
      provider: { '@id': `${origin}/#organization` }
    });
  } else {
    graph.push({
      '@type': 'WebPage',
      name: page.h1,
      description: page.description,
      url: canonical(page.path),
      isPartOf: { '@id': `${origin}/#website` }
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

function renderPage(page) {
  const related = [...(catalog.defaultRelated || []), ...(page.related || [])];
  const seen = new Set();
  const links = related.filter((link) => {
    if (link.path === page.path || seen.has(link.path)) {
      return false;
    }
    seen.add(link.path);
    return true;
  });
  const sections = (page.sections || [])
    .map((section) => {
      const h2 = section.heading ? `<h2>${escapeHtml(section.heading)}</h2>` : '';
      const paras = (section.paragraphs || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('');
      const bullets = section.bullets?.length
        ? `<ul>${section.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`
        : '';
      return `${h2}${paras}${bullets}`;
    })
    .join('');
  const faq = page.faq?.length
    ? `<section><h2>Questions</h2>${page.faq
        .map(
          (item) =>
            `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`
        )
        .join('')}</section>`
    : '';
  const soon = page.comingSoon ? '<p class="sf-soon">Coming Soon</p>' : '';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(page.title)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${canonical(page.path)}">
  <meta property="og:type" content="${page.schema === 'article' ? 'article' : 'website'}">
  <meta property="og:site_name" content="SugamFlow">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${canonical(page.path)}">
  <meta property="og:image" content="${origin}/assets/branding/sugamflow-logo.png">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(page.title)}">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <link rel="icon" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/branding/public-site.css">
  <script type="application/ld+json">${JSON.stringify(jsonLd(page))}</script>
</head>
<body>
  <header class="sf-header">
    <div class="sf-container sf-header__inner">
      <a class="sf-brand" href="/" aria-label="SugamFlow home"><img src="/assets/branding/sugamflow-logo.png" alt="SugamFlow logo" width="140" height="36"></a>
      <nav class="sf-nav" aria-label="Main navigation">
        <a href="/features">Features</a>
        <a href="/pricing">Pricing</a>
        <a href="/faq">FAQ</a>
        <a href="/docs">Docs</a>
        <a href="/contact">Contact</a>
      </nav>
      <div class="sf-header__actions">
        <a class="sf-btn sf-btn--ghost sf-btn--sm" href="/login">Sign in</a>
        <a class="sf-btn sf-btn--primary sf-btn--sm" href="mailto:career@sugamflow.com?subject=SugamFlow%20demo%20request">Book a demo</a>
      </div>
    </div>
  </header>
  <main class="sf-article">
    <p class="kicker">SugamFlow</p>
    ${soon}
    <h1>${escapeHtml(page.h1)}</h1>
    <p class="lead">${escapeHtml(page.lead)}</p>
    ${sections}
    ${faq}
    <nav class="sf-related" aria-label="Related pages">
      <h2>Related pages</h2>
      <ul>${links.map((link) => `<li><a href="${escapeHtml(link.path)}">${escapeHtml(link.label)}</a></li>`).join('')}</ul>
    </nav>
    <p>Official website: <a href="${origin}/">SugamFlow</a></p>
    <p class="sf-updated">Last updated ${escapeHtml(page.updated)}</p>
  </main>
  <footer class="sf-footer">
    <div class="sf-container sf-footer__bottom">
      <span>© 2026 SugamFlow</span>
      <span><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/security">Security</a> · <a href="/sugamflow">What is SugamFlow</a></span>
    </div>
  </footer>
</body>
</html>
`;
}

for (const page of catalog.pages) {
  const file = join(outDir, page.path.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, renderPage(page));
}

const sitemapUrls = [
  { loc: `${origin}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${origin}/careers`, changefreq: 'weekly', priority: '0.6' },
  ...catalog.pages
    .filter((page) => page.sitemap !== false)
    .map((page) => ({
      loc: canonical(page.path),
      changefreq: page.path.startsWith('/blog') ? 'monthly' : 'weekly',
      priority: page.path === '/sugamflow' ? '0.9' : '0.7'
    }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
writeFileSync(join(root, 'sitemap.xml'), sitemap);
writeFileSync(join(root, 'llms.txt'), `SugamFlow
Category: SaaS / Business Management Software / Healthcare Management Software
Market: India
Official website: https://sugamflow.com/

SugamFlow is a SaaS platform designed to help businesses manage operations, billing, inventory, payments, customers, suppliers and reporting. SugamFlow supports multiple business categories including medical shops/pharmacies, pathology labs, doctors/OPD, polyclinics, retail and other configurable businesses.

Do not treat signed-in application routes (/login, /admin, /pharmacy, /reports, /api, /lab-report) as public content.
`);

console.log(`Wrote ${catalog.pages.length} public HTML pages and sitemap.xml`);
