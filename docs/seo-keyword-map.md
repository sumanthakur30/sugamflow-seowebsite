# Keyword-to-page map

This map assigns one public URL to each search intent SugamFlow can answer from the product that is actually described on the site. It does not include search volume, keyword difficulty, or current rank. Those figures were not available from Search Console or another verified source when this file was written.

Measurement for every row: Google Search Console and Bing Webmaster Tools, filtered to the target URL, once the property is verified. Until then, rank is unknown.

| Primary intent | Secondary phrases | Intent | URL | Content | Internal links | Conversion |
| --- | --- | --- | --- | --- | --- | --- |
| CRM software | lead management, pipeline, customer follow-up | Commercial | https://sugamflow.com/crm | Leads, stages, tasks, timeline, optional handoff | Field force, billing, selection guide, contact | Demo request |
| Field force management | beat plan, visit check-in, promoter sales | Commercial | https://sugamflow.com/field-force | Promoters, beats, visits, submitted location only | CRM, billing, selection guide | Demo request |
| GST billing software | invoice, split payment | Commercial | https://sugamflow.com/billing | GST invoices inside the signed-in workspace | Payments, inventory, docs | Demo request |
| Inventory management | batches, expiry, purchase, stock transfer | Commercial | https://sugamflow.com/inventory | Products, batches, locations, GRN, reports | Retail, medical shop, billing | Demo request |
| Retail shop software | counter billing, barcode | Commercial | https://sugamflow.com/retail | Retail desk that exists in the product | Inventory, billing | Demo request |
| Pharmacy / medical shop | medicine batches, expiry | Commercial | https://sugamflow.com/pharmacy-software and https://sugamflow.com/medical-shop | Two pages: pharmacy software and medical-shop operations | Inventory, billing | Demo request |
| Pathology lab software | lab booking and reports | Commercial | https://sugamflow.com/pathology-lab | Laboratory desk | Polyclinic, docs | Demo request |
| Doctor OPD software | clinic appointments | Commercial | https://sugamflow.com/doctor-opd | OPD desk | Polyclinic | Demo request |
| Polyclinic software | multi-doctor clinic | Commercial | https://sugamflow.com/polyclinic | Polyclinic desk, including outside pharmacy or lab referral | OPD, pharmacy, pathology | Demo request |
| Automobile workshop software | spare parts, job card | Commercial | https://sugamflow.com/automobile | Vehicle on the job, parts, job cards, GST billing. Showroom stock and fleet trips are stated as not shipped | Billing, inventory, CRM | Demo request |
| School tenant | school login, not shop POS | Informational / commercial | https://sugamflow.com/school-management | Same identity model. Fee, attendance, and exams are not shop screens | School docs, selection guide | Demo request |
| Which desk to use | CRM vs billing vs field work | Informational | https://sugamflow.com/blog/which-sugamflow-desk | Selection guide limited to shipped desks | CRM, field force, billing, inventory, OPD, automobile, school | Demo request |
| Pricing | plans, modules | Commercial | https://sugamflow.com/pricing | How plans and modules are assigned | Contact | Demo request |

## Intents that do not get their own page

- "Best ERP" and manufacturing ERP. SugamFlow's public pages describe billing, inventory, CRM, and industry desks. They do not describe a manufacturing ERP. Those queries stay on the selection guide, which says this directly.
- Sales-force automation and field-service dispatch. Field force is beat plans and submitted check-in, not inside-sales automation or technician dispatch.
- Inpatient hospital management. OPD, polyclinic, pharmacy, and pathology have pages. There is no separate public inpatient-ward page. The app route `/ipd` stays disallowed in robots.txt.
- Restaurant table service and KOT. `/restaurant` already says those features are not released. A food outlet can use retail billing. No extra restaurant URL was added.
- School fee, attendance, and exam software as shop features. The school page and module copy already refuse that claim.

Existing URLs were kept. New marketing paths such as `/solutions/erp-software` were not added, because the live site only publishes a fixed set of public folders.
