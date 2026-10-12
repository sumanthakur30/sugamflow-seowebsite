/**
 * Smoke-checks committed public HTML, sitemap.xml, robots.txt, and llms.txt.
 * Does not call Google, Bing, or a performance lab.
 */
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = (message) => errors.push(message);

const catalog = JSON.parse(readFileSync(join(root, 'content/public-marketing.json'), 'utf8'));
const robots = readFileSync(join(root, 'robots.txt'), 'utf8');
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const llms = readFileSync(join(root, 'llms.txt'), 'utf8');
const home = readFileSync(join(root, 'index.html'), 'utf8');

if (!robots.includes('Sitemap: https://sugamflow.com/sitemap.xml')) {
  fail('robots.txt is missing the sitemap URL');
}
if (!/Allow:\s*\/field-force\$/.test(robots)) {
  fail('robots.txt does not explicitly allow the public /field-force page');
}
for (const rule of ['Disallow: /login', 'Disallow: /admin/', 'Disallow: /api/', 'Disallow: /ipd']) {
  if (!robots.includes(rule)) fail(`robots.txt is missing ${rule}`);
}

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const privatePath = /\/(login|register|admin|api|ipd|lab-report)(\/|$)/;
const locSet = new Set(locs);
if (locSet.size !== locs.length) fail('sitemap.xml contains duplicate URLs');
for (const loc of locs) {
  if (!loc.startsWith('https://sugamflow.com/')) fail(`sitemap URL is not absolute: ${loc}`);
  if (loc !== 'https://sugamflow.com/' && loc.endsWith('/')) fail(`sitemap URL has a trailing slash: ${loc}`);
  if (privatePath.test(new URL(loc).pathname)) fail(`sitemap includes a non-public path: ${loc}`);
}

for (const page of catalog.pages.filter((item) => item.sitemap !== false)) {
  const url = `https://sugamflow.com${page.path}`;
  if (!locSet.has(url)) fail(`sitemap is missing ${page.path}`);
}

const titles = new Map();
const descriptions = new Map();
function record(file, title, description) {
  if (!title) fail(`missing title in ${file}`);
  if (!description || description.length < 40) fail(`missing or short meta description in ${file}`);
  if (title && titles.has(title)) fail(`duplicate title "${title}" in ${file} and ${titles.get(title)}`);
  else if (title) titles.set(title, file);
  if (description && descriptions.has(description)) {
    fail(`duplicate meta description in ${file} and ${descriptions.get(description)}`);
  } else if (description) descriptions.set(description, file);
}

function meta(html, name) {
  const match = html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`));
  return match ? match[1] : '';
}

record('index.html', home.match(/<title>([^<]*)<\/title>/)?.[1], meta(home, 'description'));
if (!home.includes('rel="canonical" href="https://sugamflow.com/"')) fail('homepage canonical is missing');
if (!home.includes('<h1')) fail('homepage is missing an h1');

const pages = catalog.pages.filter((item) => item.sitemap !== false);
for (const page of pages) {
  const file = join(root, page.path.replace(/^\//, ''), 'index.html');
  if (!existsSync(file)) {
    fail(`missing HTML for ${page.path}`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  record(page.path, html.match(/<title>([^<]*)<\/title>/)?.[1], meta(html, 'description'));
  if (!html.includes(`rel="canonical" href="https://sugamflow.com${page.path}"`)) {
    fail(`canonical mismatch for ${page.path}`);
  }
  if (!/<h1[\s>]/.test(html)) fail(`missing h1 on ${page.path}`);
  if (/name="robots" content="[^"]*noindex/.test(html)) fail(`noindex on public page ${page.path}`);
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!ld) {
    fail(`missing JSON-LD on ${page.path}`);
  } else {
    let data;
    try {
      data = JSON.parse(ld[1]);
    } catch (error) {
      fail(`invalid JSON-LD on ${page.path}: ${error.message}`);
    }
    if (data && page.faq?.length && !data['@graph']?.some((node) => node['@type'] === 'FAQPage')) {
      fail(`visible FAQ has no FAQPage schema on ${page.path}`);
    }
    if (data && JSON.stringify(data).includes('aggregateRating')) {
      fail(`invented aggregateRating on ${page.path}`);
    }
  }
}

const guide = pages.find((item) => item.path === '/blog/which-sugamflow-desk');
if (!guide) fail('selection guide page is missing from the catalog');
if (!llms.includes('https://sugamflow.com/crm')) fail('llms.txt does not point at the CRM page');
if (!llms.includes('/blog/which-sugamflow-desk')) fail('llms.txt does not point at the selection guide');
if (!locSet.has('https://sugamflow.com/blog/which-sugamflow-desk')) fail('sitemap is missing the selection guide');

for (const id of ['billing', 'inventory', 'school', 'clinic']) {
  const file = join(root, 'modules', id, 'index.html');
  if (!existsSync(file)) {
    fail(`missing module page /modules/${id}`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  if (!html.includes(`rel="canonical" href="https://sugamflow.com/modules/${id}"`)) {
    fail(`module canonical missing for /modules/${id}`);
  }
  if (!html.includes('application/ld+json')) fail(`module JSON-LD missing for /modules/${id}`);
  if (!meta(html, 'description')) fail(`module description missing for /modules/${id}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`SEO checks passed: ${titles.size} unique titles, ${locs.length} sitemap URLs.`);
