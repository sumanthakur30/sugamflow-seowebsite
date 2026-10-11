# Responsive design audit — public site

Checked 11 October 2026 against the local marketing site at `http://127.0.0.1:8768` (Chrome emulation in Cursor). This is not a production deploy. `https://sugamflow.com` still serves the previous stylesheet until this branch is published.

## Root cause

`assets/branding/public-site.css` opened `@media (min-width: 720px)` for the brand name and never closed it. Below 720px the rest of the sheet — hamburger, hero, grids, footer, directory fields, reduced motion — did not apply. The query is closed immediately after `.sf-brand__meta`.

## What changed

- Mobile header keeps Book a Demo visible. Sign in returns at 1080px, so a tablet is not forced into the full desktop bar.
- Menu button stays 44×44. Drawer locks background scroll, scrolls itself, and pads for `safe-area-inset-bottom`.
- Escape closes an open nested section first, then the drawer, and returns focus to Open menu. A link click also closes the drawer.
- Products, Solutions, Industries, and Resources are `<details>` inside the drawer on every public page. Desktop dropdowns stay in the header from 1080px, with `max-width` and `max-height` so they scroll inside the viewport.
- Industry links from `GET /api/v1/public/industries` update both the header menu and the drawer.
- Hero heading uses `clamp(1.85rem, 8vw, 3.55rem)` and a 1.05 line height.
- Directory and enquiry fields use 16px type. The phone field is `type="tel"`.
- `body` uses `overflow-wrap: break-word`. Page-level `overflow-x: hidden` was not added.

## Viewports actually measured

Overflow is `documentElement.scrollWidth - clientWidth`.

| Width | Page | Overflow | Header |
|---|---|---|---|
| 320 | `/` | 0 | hamburger, Book a Demo |
| 320 | `/` with Industries open in the drawer | 0 | drawer scrolls; last link right edge 301px |
| 375 | `/` | 0 | hamburger; hero h1 computed 30px |
| 375 | `/clients-partners/` | 0 | enquiry inputs inside the form |
| 390 | `/` | 0 | hamburger |
| 390 | `/contact/` | 0 | hamburger |
| 430 | `/` | 0 | hamburger |
| 600 | `/` | 0 | hamburger |
| 768 | `/` | 0 | hamburger |
| 1024 | `/` | 0 | hamburger (desktop nav starts at 1080) |
| 1280 | `/` | 0 | desktop nav, Sign in visible |
| 1280×700 | `/` dropdowns open | 0 | Products, Solutions, Industries, Resources menus stay inside the viewport; menus use `overflow: auto` |
| 1440 | `/` | 0 | desktop nav |
| 1920×1080 | `/` | 0 | all four dropdowns inside the viewport |
| 320 | `/field-force/`, `/automobile/`, `/crm/`, `/pricing/` | 0 | hamburger |

Escape on `/` at 320px: first press closed Industries, second press closed the drawer, `aria-expanded` returned to false, and focus returned to Open menu.

## Not measured

These were not opened in this pass, so they are not marked tested:

- Physical iPhone, iPad, or Android. Checks used Chrome device-metrics emulation only.
- Signed-in Angular screens (`/login`, CRM, billing, inventory, school, field-force desks). Those layouts live in `shop-management-ui`, not this stylesheet.
- Every marketing URL at every width. Shared chrome was updated on the public HTML pages; overflow was measured on the routes in the table above.
- Landscape as a separate device orientation beyond the widths listed.
- Live `https://sugamflow.com` after these edits.

## Limits that remain

- Contact is an email and trial page. It does not contain a multi-field form. The enquiry form is on Clients & Partners.
- Dashboard tables, charts, and admin side panels were not restyled.
- The public site has no production build step. `node --check` passed for `assets/branding/public-site.js` and `tools/generate-public-html.mjs`.
