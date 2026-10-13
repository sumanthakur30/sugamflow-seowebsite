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
  const crumbs = [
    { '@type': 'ListItem', position: 1, name: 'SugamFlow', item: `${origin}/` }
  ];
  if (page.path.startsWith('/blog/')) {
    crumbs.push({ '@type': 'ListItem', position: 2, name: 'Knowledge centre', item: `${origin}/blog` });
    crumbs.push({ '@type': 'ListItem', position: 3, name: page.h1, item: canonical(page.path) });
  } else if (page.path.startsWith('/docs/')) {
    crumbs.push({ '@type': 'ListItem', position: 2, name: 'Documentation', item: `${origin}/docs` });
    crumbs.push({ '@type': 'ListItem', position: 3, name: page.h1, item: canonical(page.path) });
  } else {
    crumbs.push({ '@type': 'ListItem', position: 2, name: page.h1, item: canonical(page.path) });
  }
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: 'SugamFlow',
      legalName: 'SugamFlow ERP Solutions Pvt. Ltd.',
      url: `${origin}/`,
      email: 'career@sugamflow.com',
      logo: `${origin}/assets/branding/sugamflow-logo.png`
    },
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      name: 'SugamFlow',
      url: `${origin}/`
    },
    { '@type': 'BreadcrumbList', itemListElement: crumbs }
  ];
  if (page.schema === 'article') {
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
      name: page.title,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: canonical(page.path),
      description: page.description,
      provider: { '@id': `${origin}/#organization` }
    });
  } else if (page.schema !== 'faq') {
    graph.push({
      '@type': 'WebPage',
      name: page.h1,
      description: page.description,
      url: canonical(page.path),
      isPartOf: { '@id': `${origin}/#website` }
    });
  }
  if (page.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: page.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      }))
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

function chromeHead(extraTitle) {
  return `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/branding/public-site.css">
  <link rel="icon" href="/favicon.ico">`;
}

function chromeNav(active) {
  const on = (path) => (active === path ? ' class="is-active"' : '');
  return `<header class="sf-header" data-sf-header>
    <div class="sf-header__bar">
      <a class="sf-brand" href="/" aria-label="SugamFlow home">
        <img src="/assets/branding/sugamflow-logo.png" alt="" width="34" height="34">
        <span class="sf-brand__meta"><span class="sf-brand__name">SugamFlow</span><span class="sf-brand__tag">One Flow. Every Business.</span></span>
      </a>
      <nav class="sf-nav" aria-label="Primary">
        <details class="sf-drop"><summary>Products</summary>
          <div class="sf-drop__menu">
            <a href="/features">Features<small>What the platform does</small></a>
            <a href="/crm">CRM<small>Leads, pipeline, and follow-up</small></a>
            <a href="/billing">GST billing</a>
            <a href="/inventory">Inventory</a>
            <a href="/wholesale-erp">Wholesale ERP<small>Orders, challans, and credit</small></a>
            <a href="/payments-software">Payments</a>
            <a href="/ai">Assistive AI</a>
          </div>
        </details>
        <details class="sf-drop"><summary>Solutions</summary>
          <div class="sf-drop__menu">
            <a href="/medical-shop">Medical shop</a>
            <a href="/pathology-lab">Pathology lab</a>
            <a href="/doctor-opd">Doctor OPD</a>
            <a href="/polyclinic">Polyclinic</a>
            <a href="/school-management">School ERP</a>
          </div>
        </details>
        <details class="sf-drop"><summary>Industries</summary>
          <div class="sf-drop__menu" data-sf-industry-menu>
            <a href="/retail">Retail</a>
            <a href="/wholesale-erp">Wholesale</a>
            <a href="/pharmacy-software">Pharmacy</a>
            <a href="/grocery">Grocery</a>
            <a href="/electronics">Electronics</a>
            <a href="/restaurant">Restaurant</a>
            <a href="/automobile">Automobile</a>
            <a href="/field-force">Field force</a>
            <a href="/polyclinic">Clinics</a>
            <a href="/pathology-lab">Laboratory</a>
            <a href="/school-management">Schools</a>
          </div>
        </details>
        <details class="sf-drop"><summary>Resources</summary>
          <div class="sf-drop__menu">
            <a href="/docs">Documentation</a>
            <a href="/faq">FAQ</a>
            <a href="/blog">Knowledge centre</a>
            <a href="/security">Security</a>
          </div>
        </details>
        <a href="/modules"${on('/modules')}>Modules</a>
        <a href="/pricing"${on('/pricing')}>Pricing</a>
        <a href="/clients-partners"${on('/clients-partners')}>Clients</a>
        <a href="/about"${on('/about')}>About</a>
      </nav>
      <button class="sf-menu-btn" type="button" data-sf-menu aria-expanded="false" aria-label="Open menu"><span></span><span></span><span></span></button>
      <div class="sf-header__cta">
        <a class="sf-btn sf-btn--ghost" href="/login">Sign in</a>
        <a class="sf-btn sf-btn--primary" href="/contact">Book a Demo</a>
      </div>
    </div>
  </header>
    <div class="sf-drawer" data-sf-drawer>
    <details class="sf-drop">
      <summary>Products</summary>
      <div class="sf-drop__menu">
        <a href="/features">Features</a>
        <a href="/crm">CRM</a>
        <a href="/billing">GST billing</a>
        <a href="/inventory">Inventory</a>
        <a href="/wholesale-erp">Wholesale ERP</a>
        <a href="/payments-software">Payments</a>
        <a href="/ai">Assistive AI</a>
      </div>
    </details>
    <details class="sf-drop">
      <summary>Solutions</summary>
      <div class="sf-drop__menu">
        <a href="/medical-shop">Medical shop</a>
        <a href="/pathology-lab">Pathology lab</a>
        <a href="/doctor-opd">Doctor OPD</a>
        <a href="/polyclinic">Polyclinic</a>
        <a href="/school-management">School ERP</a>
      </div>
    </details>
    <details class="sf-drop">
      <summary>Industries</summary>
      <div class="sf-drop__menu" data-sf-industry-menu>
        <a href="/retail">Retail</a>
        <a href="/wholesale-erp">Wholesale</a>
        <a href="/pharmacy-software">Pharmacy</a>
        <a href="/grocery">Grocery</a>
        <a href="/electronics">Electronics</a>
        <a href="/restaurant">Restaurant</a>
        <a href="/automobile">Automobile</a>
        <a href="/field-force">Field force</a>
        <a href="/polyclinic">Clinics</a>
        <a href="/pathology-lab">Laboratory</a>
        <a href="/school-management">Schools</a>
      </div>
    </details>
    <details class="sf-drop">
      <summary>Resources</summary>
      <div class="sf-drop__menu">
        <a href="/docs">Documentation</a>
        <a href="/faq">FAQ</a>
        <a href="/blog">Knowledge centre</a>
        <a href="/security">Security</a>
      </div>
    </details>
    <a href="/modules">Modules</a>
    <a href="/pricing">Pricing</a>
    <a href="/clients-partners">Clients &amp; Partners</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <a class="sf-btn sf-btn--primary" href="/contact">Book a Demo</a>
  </div>`;
}

function loadInventory() {
  const src = readFileSync(join(root, 'assets/branding/product-inventory.js'), 'utf8');
  const fn = new Function('window', `${src}\nreturn window.SF_PRODUCT;`);
  return fn({});
}

const inventory = loadInventory();

function loadDesks() {
  const src = readFileSync(join(root, 'assets/branding/product-desks.js'), 'utf8');
  const fn = new Function('window', `${src}\nreturn window.SF_DESKS;`);
  return fn({});
}

const desks = loadDesks();

const INDUSTRY_DESK = {
  retail: 'billing',
  pharmacy: 'billing',
  wholesale: 'wholesale',
  clinic: 'clinic',
  laboratory: 'laboratory',
  school: 'school'
};

function workspaceHtml(desk) {
  if (!desk) {
    return '';
  }
  const side = (desk.sidebar || [])
    .map((group) => {
      const items = (group.items || [])
        .map((item, index) => `<span class="sf-desk__item${index === 0 ? ' is-on' : ''}">${escapeHtml(item)}</span>`)
        .join('');
      return `<div class="sf-desk__group">${escapeHtml(group.group)}</div>${items}`;
    })
    .join('');
  const tabs = (desk.header || []).map((tab) => `<span>${escapeHtml(tab)}</span>`).join('');
  const kpis = (desk.screen.kpis || [])
    .map((kpi) => `<div class="sf-desk__kpi"><small>${escapeHtml(kpi.label)}</small><strong>${escapeHtml(kpi.value)}</strong></div>`)
    .join('');
  const rows = (desk.screen.rows || [])
    .map((row) => `<div>${row.map((cell) => `<span>${escapeHtml(cell)}</span>`).join('')}</div>`)
    .join('');
  return `<div class="sf-desk" aria-hidden="true">
    <aside class="sf-desk__side"><div class="sf-desk__brand">SugamFlow</div>${side}</aside>
    <div class="sf-desk__main">
      <div class="sf-desk__top">${tabs}</div>
      <div class="sf-desk__screen">
        <h3>${escapeHtml(desk.screen.title)}</h3>
        <p>${escapeHtml(desk.screen.subtitle)}</p>
        <div class="sf-desk__kpis">${kpis}</div>
        <div class="sf-desk__table"><div><span>Row</span><span>Status</span><span>Note</span><span>Value</span></div>${rows}</div>
      </div>
    </div>
  </div>
  <p class="sf-desk-note">Workspace preview uses the real sidebar labels. Sample figures only.</p>`;
}

const INDUSTRY_PAGES = {
  '/retail': { id: 'retail' },
  '/grocery': {
    id: 'retail',
    note: 'Grocery uses the same retail catalog, billing and stock desks — not a separate supermarket engine.'
  },
  '/electronics': {
    id: 'retail',
    note: 'Electronics uses the retail stack. The owner dashboard can load electronics AI insights where enabled — assistive summaries, not a sales forecast.'
  },
  '/pharmacy-software': { id: 'pharmacy' },
  '/medical-shop': {
    id: 'pharmacy',
    note: 'Medical shop is the MEDICAL type: same pharmacy desks with medical-shop catalog wording.'
  },
  '/polyclinic': { id: 'clinic' },
  '/doctor-opd': {
    id: 'clinic',
    note: 'Doctor OPD is the consultation desk (today board, Rx, referrals). Reception and visit billing sit on the same clinic tenant.'
  },
  '/pathology-lab': { id: 'laboratory' },
  '/school-management': { id: 'school' },
  '/automobile': { id: 'automobile' },
  '/field-force': { id: 'field-force' },
  '/features': { id: 'platform' }
};

function renderIndustryMain(industry, note) {
  const chips = (industry.chips || [])
    .map((chip) => `<span class="sf-chip">${escapeHtml(chip)}</span>`)
    .join('');
  const feats = (industry.features || [])
    .map(
      (feat) => `<article class="sf-feat"><span class="sf-feat__label">${escapeHtml(feat.label)}</span><h4>${escapeHtml(feat.title)}</h4><p>${escapeHtml(feat.text)}</p></article>`
    )
    .join('');
  const steps = (industry.workflow || [])
    .map((step) => `<li>${escapeHtml(step)}</li>`)
    .join('');
  const noteHtml = note ? `<p class="sf-explorer__lede">${escapeHtml(note)}</p>` : '';
  const desk = desks.modules.find((row) => row.id === INDUSTRY_DESK[industry.id]);
  return `<div class="sf-wrap" style="padding-bottom:3rem">
    ${noteHtml}
    ${workspaceHtml(desk)}
    <div class="sf-chips" style="justify-content:flex-start;margin:0 0 1.2rem">${chips}</div>
    <div class="sf-feat-grid">${feats}</div>
    <div class="sf-flow"><p class="sf-flow__label">How it flows</p><ol class="sf-flow__list">${steps}</ol></div>
    <p><a class="sf-more" href="/about#industry-${escapeHtml(industry.id)}">See this vertical on About →</a></p>
  </div>`;
}

function renderPlatformMain() {
  const feats = (inventory.platform || [])
    .map(
      (feat) => `<article class="sf-feat"><span class="sf-feat__label">${escapeHtml(feat.label)}</span><h4>${escapeHtml(feat.title)}</h4><p>${escapeHtml(feat.text)}</p></article>`
    )
    .join('');
  const verticals = (inventory.industries || [])
    .map(
      (row) => `<a class="sf-card" href="${escapeHtml(row.href)}"><span class="sf-ico">${escapeHtml(row.ico || '')}</span><h3>${escapeHtml(row.name)}</h3><p>${escapeHtml(row.headline)}</p></a>`
    )
    .join('');
  const wholesale = inventory.industries.find((row) => row.id === 'wholesale');
  const wholesaleBlock = wholesale ? renderIndustryMain(wholesale, 'Wholesale is a capability pack on the same workspace — there is no separate public /wholesale URL.') : '';
  return `<div class="sf-wrap" style="padding-bottom:2rem">
    <h2>Platform capabilities</h2>
    <div class="sf-feat-grid sf-feat-grid--4" style="margin-top:1rem">${feats}</div>
    <h2>Vertical desks</h2>
    <div class="sf-grid sf-grid-3" style="margin:1rem 0 2rem">${verticals}</div>
  </div>${wholesaleBlock}`;
}

function invoicePreview() {
  return `<div class="sf-wrap" style="padding-bottom:1.5rem">
    <div class="sf-invoice" aria-hidden="true">
      <header><strong>Tax invoice</strong><span>INV-1842 · Demo</span></header>
      <table>
        <thead><tr><th>Item</th><th>GST</th><th>Amount</th></tr></thead>
        <tbody>
          <tr><td>Counter sale</td><td>18%</td><td>₹1,180</td></tr>
          <tr><td>Collected</td><td>Cash + UPI</td><td>₹1,180</td></tr>
        </tbody>
      </table>
    </div>
    <p class="sf-note">Illustrative invoice. Live bills, PDFs, and dues stay inside the signed-in workspace. e-Invoice and e-way bill run only when a GSP is configured.</p>
  </div>`;
}

function renderCrmMain(faqHtml, relatedHtml) {
  return `<div class="sf-wrap" style="padding-bottom:2.5rem">
    <div class="sf-pipe">
      <div class="sf-board" aria-hidden="true">
        <section><h3>New</h3><p>City pharmacy<small>Source · Walk-in · ₹48,000</small></p><p>Clinic enquiry<small>Source · Website</small></p></section>
        <section><h3>Qualified</h3><p>Wholesale buyer<small>Follow-up · Tomorrow</small></p></section>
        <section><h3>Won</h3><p>Converted lead<small>Target · Shop customer</small></p></section>
      </div>
      <aside class="sf-profile">
        <h3>Meera Sharma</h3>
        <p>Demo contact · not a real customer</p>
        <ul>
          <li>Owner assigned</li>
          <li>Open task: call back</li>
          <li>Timeline note from yesterday</li>
        </ul>
      </aside>
    </div>
    <p class="sf-note">Sample pipeline. SugamFlow CRM is a separate signed-in desk. Figures are not live tenant data.</p>
    <div class="sf-journey" style="margin-top:1.4rem">
      <article><strong>01</strong><h3>Capture</h3><p>Leads store a name, company, phone, source, and amount.</p></article>
      <article><strong>02</strong><h3>Work the stage</h3><p>Each lead sits on a pipeline stage with an owner, priority, and tasks.</p></article>
      <article><strong>03</strong><h3>Remember the thread</h3><p>A timeline keeps interaction history on the lead.</p></article>
      <article><strong>04</strong><h3>Hand off</h3><p>When conversion is enabled, a lead can become a shop customer, a school inquiry, or a field-force record. Billing still happens in the operations workspace.</p></article>
    </div>
    <main class="sf-article">${faqHtml}${relatedHtml}</main>
  </div>`;
}

function chromeFooter() {
  return `<footer class="sf-footer">
    <div class="sf-wrap sf-footer__grid">
      <div>
        <img src="/assets/branding/sugamflow-logo.png" alt="SugamFlow" width="120" height="32">
        <p>One Flow. Every Business. Cloud software for Indian retail, healthcare and schools.</p>
      </div>
      <div><h3>Product</h3><a href="/features">Features</a><a href="/crm">CRM</a><a href="/billing">Billing</a><a href="/inventory">Inventory</a><a href="/pricing">Pricing</a></div>
      <div><h3>Solutions</h3><a href="/medical-shop">Medical shop</a><a href="/pharmacy-software">Pharmacy</a><a href="/doctor-opd">Doctor OPD</a><a href="/pathology-lab">Pathology</a><a href="/polyclinic">Polyclinic</a><a href="/school-management">School</a></div>
      <div><h3>Industries</h3><a href="/retail">Retail</a><a href="/wholesale-erp">Wholesale</a><a href="/automobile">Automobile</a><a href="/field-force">Field force</a><a href="/blog/which-sugamflow-desk">Which desk to use</a></div>
      <div><h3>Company</h3><a href="/about">About</a><a href="/clients-partners">Clients &amp; Partners</a><a href="/blog">Knowledge centre</a><a href="/contact">Contact</a><a href="/careers">Careers</a><a href="/login">Sign in</a></div>
    </div>
    <div class="sf-wrap sf-copy"><span>© 2026 SugamFlow</span><nav class="sf-legal" aria-label="Legal"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/security">Security</a></nav></div>
  </footer>
  <script src="/assets/branding/public-site.js" defer></script>`;
}

function renderDirectoryMain(faqHtml) {
  return `<div class="sf-wrap sf-dir">
    <div class="sf-dir__tools">
      <label>Search <input id="sf-dir-q" type="search" placeholder="Organization name"></label>
      <label>Type <select id="sf-dir-type"><option value="">All</option><option value="CLIENT">Clients</option><option value="TECHNOLOGY_PARTNER">Technology partners</option><option value="BUSINESS_PARTNER">Business partners</option><option value="OTHER">Other</option></select></label>
      <label>Industry <select id="sf-dir-industry"><option value="">All</option></select></label>
    </div>
    <p id="sf-dir-status" class="sf-note">Loading published organizations…</p>
    <div id="sf-dir-list" class="sf-dir__grid"></div>
    <article id="sf-dir-detail" class="sf-card sf-dir__detail" hidden></article>
    ${faqHtml}
    <form id="sf-dir-form" class="sf-card sf-dir__form">
      <h2>Partnership or client enquiry</h2>
      <p>This saves an enquiry for the SugamFlow team. It does not open an account or publish your organization.</p>
      <label>I am enquiring as <select name="kind" required><option value="CLIENT">A prospective client</option><option value="PARTNER">A prospective partner</option></select></label>
      <label>Organization <input name="organizationName" required maxlength="160"></label>
      <label>Your name <input name="contactName" required maxlength="120"></label>
      <label>Email <input name="email" type="email" required maxlength="160"></label>
      <label>Phone <input name="phone" type="tel" maxlength="40" inputmode="tel"></label>
      <label>Message <textarea name="message" required maxlength="1000" rows="4"></textarea></label>
      <button class="sf-btn sf-btn--primary" type="submit">Send enquiry</button>
    </form>
    <p id="sf-dir-form-status" role="status"></p>
  </div>
  <script src="/assets/branding/directory.js" defer></script>`;
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
  let sections = (page.sections || [])
    .map((section) => {
      const h2 = section.heading ? `<h2>${escapeHtml(section.heading)}</h2>` : '';
      const paras = (section.paragraphs || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('');
      const bullets = section.bullets?.length
        ? `<ul>${section.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`
        : '';
      return `<article class="sf-card sf-card--plain">${h2}${paras}${bullets}</article>`;
    })
    .join('');
  if (page.path === '/blog') {
    const posts = catalog.pages.filter((item) => item.schema === 'article');
    sections += `<article class="sf-card sf-card--plain"><h2>All articles</h2><ul>${posts
      .map((item) => `<li><a href="${escapeHtml(item.path)}">${escapeHtml(item.title)}</a></li>`)
      .join('')}</ul></article>`;
  }
  const faq = page.faq?.length
    ? `<section class="sf-faq"><h2>Questions</h2>${page.faq
        .map(
          (item) =>
            `<details><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`
        )
        .join('')}</section>`
    : '';
  const soon = page.comingSoon ? '<p class="sf-soon">Coming Soon</p>' : '';
  const mapped = INDUSTRY_PAGES[page.path];
  let mainInner = `<main class="sf-article">
    ${sections}
    ${faq}
    <nav class="sf-related" aria-label="Related pages">
      <h2>Related pages</h2>
      <ul>${links.map((link) => `<li><a href="${escapeHtml(link.path)}">${escapeHtml(link.label)}</a></li>`).join('')}</ul>
    </nav>
    <p>Official website: <a href="${origin}/">SugamFlow</a></p>
    <p class="sf-updated">Last updated ${escapeHtml(page.updated)}</p>
  </main>`;
  let heroLead = page.lead;
  let heroKicker = 'SUGAMFLOW';
  if (page.path === '/crm') {
    heroKicker = 'CRM';
    const relatedHtml = `<nav class="sf-related" aria-label="Related pages"><h2>Related pages</h2><ul>${links.map((link) => `<li><a href="${escapeHtml(link.path)}">${escapeHtml(link.label)}</a></li>`).join('')}</ul></nav>`;
    mainInner = renderCrmMain(faq, relatedHtml);
  } else if (page.path === '/clients-partners') {
    heroKicker = 'DIRECTORY';
    mainInner = renderDirectoryMain(faq);
  } else if (page.path === '/billing') {
    mainInner = `${invoicePreview()}${mainInner}`;
  } else if (mapped?.id === 'platform') {
    heroKicker = 'PRODUCT';
    heroLead = 'Capabilities confirmed in the signed-in workspace — not a generic SaaS checklist.';
    mainInner = `${renderPlatformMain()}
    <main class="sf-article">${faq}
    <nav class="sf-related" aria-label="Related pages"><h2>Related pages</h2><ul>${links.map((link) => `<li><a href="${escapeHtml(link.path)}">${escapeHtml(link.label)}</a></li>`).join('')}</ul></nav></main>`;
  } else if (mapped?.id) {
    const industry = inventory.industries.find((row) => row.id === mapped.id);
    if (industry) {
      heroKicker = industry.kicker;
      heroLead = industry.description;
      mainInner = `${renderIndustryMain(industry, mapped.note)}
      <main class="sf-article">
        ${faq}
        <nav class="sf-related" aria-label="Related pages"><h2>Related pages</h2><ul>${links.map((link) => `<li><a href="${escapeHtml(link.path)}">${escapeHtml(link.label)}</a></li>`).join('')}</ul></nav>
        <p class="sf-updated">Last updated ${escapeHtml(page.updated)}</p>
      </main>`;
    }
  }
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
  ${chromeHead()}
  <script type="application/ld+json">${JSON.stringify(jsonLd(page))}</script>
</head>
<body>
  ${chromeNav(page.path)}
  <section class="sf-page-hero sf-page-hero--wide">
    <div class="sf-wrap">
      ${soon}
      <p class="sf-kicker">${escapeHtml(heroKicker)}</p>
      <h1>${escapeHtml(mapped?.id && inventory.industries.find((row) => row.id === mapped.id) ? inventory.industries.find((row) => row.id === mapped.id).headline : page.h1)}</h1>
      <p>${escapeHtml(heroLead)}</p>
    </div>
  </section>
  ${mainInner}
  ${chromeFooter()}
</body>
</html>
`;
}

const skipCustom = new Set(['/about', '/contact', '/pricing', '/careers', '/modules']);
for (const page of catalog.pages) {
  if (skipCustom.has(page.path)) {
    continue;
  }
  const file = join(outDir, page.path.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, renderPage(page));
}

for (const mod of desks.modules) {
  const feats = (mod.features || [])
    .map(
      (feat) => `<article class="sf-feat"><span class="sf-feat__label">${escapeHtml(mod.name)}</span><h4>${escapeHtml(feat.title)}</h4><p>${escapeHtml(feat.text)}</p></article>`
    )
    .join('');
  const moduleLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: mod.name,
        description: mod.summary,
        url: `${origin}/modules/${mod.id}`,
        isPartOf: { '@id': `${origin}/#website` }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SugamFlow', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Modules', item: `${origin}/modules` },
          { '@type': 'ListItem', position: 3, name: mod.name, item: `${origin}/modules/${mod.id}` }
        ]
      }
    ]
  });
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(mod.name)} | SugamFlow module</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(mod.summary)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${origin}/modules/${mod.id}">
  ${chromeHead()}
  <script type="application/ld+json">${moduleLd}</script>
</head>
<body>
  ${chromeNav('/modules')}
  <section class="sf-page-hero sf-page-hero--wide">
    <div class="sf-wrap">
      <p class="sf-kicker">MODULE</p>
      <h1>${escapeHtml(mod.name)}</h1>
      <p>${escapeHtml(mod.summary)}</p>
    </div>
  </section>
  <div class="sf-wrap" style="padding-bottom:3rem">
    <div data-sf-desk data-desk-id="${escapeHtml(mod.id)}"></div>
    <div class="sf-feat-grid" style="margin-top:1.4rem">${feats}</div>
    <p><a class="sf-more" href="/modules">All modules →</a></p>
  </div>
  ${chromeFooter()}
  <script src="/assets/branding/product-desks.js" defer></script>
  <script src="/assets/branding/desk-page.js" defer></script>
</body>
</html>`;
  const file = join(outDir, 'modules', mod.id, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function llmsTxt() {
  const lines = [
    '# SugamFlow',
    '',
    '> Cloud software for Indian retail, pharmacy, clinic, laboratory, automobile workshop, and field-force teams, plus a separate school tenant on the same login. This file lists public pages only.',
    '',
    `- Official website: ${origin}/`,
    `- Contact: ${origin}/contact`,
    '',
    '## Public pages'
  ];
  for (const page of catalog.pages.filter((item) => item.sitemap !== false)) {
    const description = String(page.description || '').replace(/\s+/g, ' ').trim();
    lines.push(`- [${page.title}](${origin}${page.path}): ${description}`);
  }
  lines.push('', '## Modules');
  for (const mod of desks.modules) {
    lines.push(`- [${mod.name}](${origin}/modules/${mod.id}): ${String(mod.summary || '').replace(/\s+/g, ' ').trim()}`);
  }
  lines.push(
    '',
    'Signed-in application routes such as /login, /admin, /api, /ipd, and /lab-report are not public documentation.',
    'SugamFlow does not publish aggregate ratings or customer counts on this site.',
    ''
  );
  return `${lines.join('\n')}\n`;
}

const sitemapUrls = [
  { loc: `${origin}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${origin}/careers`, changefreq: 'weekly', priority: '0.6' },
  { loc: `${origin}/modules`, changefreq: 'weekly', priority: '0.8' },
  ...desks.modules.map((mod) => ({
    loc: `${origin}/modules/${mod.id}`,
    changefreq: 'weekly',
    priority: '0.7'
  })),
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
writeFileSync(join(root, 'llms.txt'), llmsTxt());

console.log(`Wrote ${catalog.pages.length} public HTML pages and sitemap.xml`);
