/**
 * Code-backed product inventory for public pages.
 * Sources: shop-management-ui routes/nav, order-service, stock-service,
 * product-service, auth-service, user-service, shop-service effective-config.
 * Do not add features that are not implemented. School academic desks are not
 * in shop-management-ui (SCHOOL tenants; campus ops live on school-ui).
 */
window.SF_PRODUCT = {
  differentiators: [
    {
      label: 'Architecture',
      title: 'One tenant. Isolated records.',
      text: 'Every request carries tenant and shop context. Login is outlet ID, username and password — not a shared counter password.'
    },
    {
      label: 'GST',
      title: 'Tax on the same bill you collect.',
      text: 'CGST, SGST or IGST is calculated from the amount on the invoice. e-Invoice is a GSP job when configured — we do not invent IRNs.'
    },
    {
      label: 'Desks',
      title: 'Industry workflows, not one POS skin.',
      text: 'Retail billing, wholesale challans, clinic OPD, pharmacy dispense and a full pathology worklist are separate desks on the same identity.'
    },
    {
      label: 'Stock',
      title: 'Batches and expiry where medicine moves.',
      text: 'Purchase, GRN and sale update stock. Medical shops get batch, near-expiry and FEFO reserve — not a generic quantity field only.'
    }
  ],
  platform: [
    {
      label: 'Access',
      title: 'Role-based desks',
      text: 'Permission templates decide what a cashier, doctor, receptionist or accountant can open. Routes are guarded, not just hidden.'
    },
    {
      label: 'Identity',
      title: 'Secure sign-in',
      text: 'JWT after shop-scoped login. Password reset and optional TOTP. Public pages never load patient or shop ledgers.'
    },
    {
      label: 'Tenancy',
      title: 'Shop switcher, one organisation',
      text: 'Owners can hold more than one shop under a tenant. MULTI_OUTLET is a plan module; data stays shop-scoped unless a desk is tenant-wide (patients, some clinic records).'
    },
    {
      label: 'Billing',
      title: 'Split payments and dues',
      text: 'Cash, UPI, card and other splits on the same bill. Outstanding filters and a payment workspace collect what is still due.'
    },
    {
      label: 'GST',
      title: 'Shop GST profile + reports',
      text: 'GSTIN and inclusive/exclusive pricing on the shop. GSTR summary and GST recon screens exist. Full e-invoice push only when gst-service is enabled.'
    },
    {
      label: 'Reports',
      title: 'Owner dashboard and report centre',
      text: 'KPI boards for retail, wholesale dayboard, healthcare executive view, and a catalogue of operational reports after sign-in.'
    },
    {
      label: 'People',
      title: 'Staff invite + party master',
      text: 'Staff are invited into auth. Customers, patients or buyers live in the party list — labels change with business type.'
    },
    {
      label: 'Ops',
      title: 'Alerts and offline queue',
      text: 'Business alerts (stock, expiry, overdue credit) and an offline sync queue for orders and inventory when the counter drops the network.'
    }
  ],
  alsoShipped: [
    { name: 'Automobile parts & workshop', href: '/automobile', note: 'Vehicle registration, parts finder, counter, job cards, warranty. Not showroom stock or fleet trips.' },
    { name: 'Grocery & electronics', href: '/retail', note: 'Same retail stack; electronics has extra owner-dashboard insights.' },
    { name: 'Restaurant / F&B', href: '/restaurant', note: 'Retail billing only. Table/KOT is Coming Soon.' }
  ],
  industries: [
    {
      id: 'retail',
      nav: 'Retail',
      name: 'Retail & counter',
      kicker: 'RETAIL',
      headline: 'Sell smarter. Track every item.',
      description: 'General retail, grocery and similar shops use the same counter: catalog, sale, stock and GST on one invoice — not a separate tax tool.',
      ico: 'RT',
      href: '/retail',
      hrefLabel: 'Explore retail →',
      chips: ['POS billing', 'GST on invoice', 'Catalog & HSN', 'Stock & transfers', 'Purchase / GRN', 'Customers', 'Dues & splits', 'Reports'],
      features: [
        { label: 'Billing', title: 'Counter POS', text: 'Create and edit sales from Orders. Barcode lookup and camera scan are available on the same form.' },
        { label: 'GST', title: 'Tax on the collected amount', text: 'Inclusive or exclusive GST from the shop profile. Line HSN and GST % come from the product.' },
        { label: 'Catalog', title: 'Products with HSN', text: 'CRUD, Excel import, barcode field, categories and brands. No live Amazon/Flipkart connector — channel listings export a file.' },
        { label: 'Stock', title: 'On-hand, locations, transfers', text: 'Stock list, warehouse aisle/rack/bin, inter-warehouse transfers, reconciliation and low-stock procurement queue.' },
        { label: 'Purchase', title: 'PO, GRN, suppliers', text: 'Purchase orders through receive, direct GRN, purchase bill, supplier master, returns and AP invoices.' },
        { label: 'Money', title: 'Payments and dues', text: 'Split tenders, outstanding filters, payment workspace. Sales returns and credit notes sit in finance.' }
      ],
      workflow: ['Product', 'Purchase / GRN', 'Inventory', 'Sale', 'GST on invoice', 'Payment', 'Reports']
    },
    {
      id: 'pharmacy',
      nav: 'Pharmacy',
      name: 'Pharmacy / medical store',
      kicker: 'PHARMACY',
      headline: 'From the batch to the bill, keep the counter moving.',
      description: 'Medical and pharmacy shops add medicine master, batches, near-expiry and a dispense queue on top of retail billing. Strip/tablet packaging is first-class on those types.',
      ico: 'PH',
      href: '/pharmacy-software',
      hrefLabel: 'Explore pharmacy →',
      chips: ['Medicine billing', 'Batch & expiry', 'FEFO reserve', 'Dispense queue', 'Walk-in Rx', 'Purchase / GRN', 'Patient records', 'GST'],
      features: [
        { label: 'Catalog', title: 'Medicine master', text: 'Search and import from the platform medicine list, plus shop custom medicines. Composition and schedule fields live on the product.' },
        { label: 'Stock', title: 'Batch, expiry, FEFO', text: 'Batches and expiry dates on inventory. Near-expiry report. FEFO reserve when selling from stock-service.' },
        { label: 'Counter', title: 'Pharmacy POS', text: 'Dedicated pharmacy counter route plus walk-in prescription compose. Multi-unit (strip/tablet) packaging on medical, pharmacy and polyclinic types.' },
        { label: 'Dispense', title: 'Prescription queue', text: 'Clinic-origin prescriptions land on a dispense queue. Standalone shops still bill walk-ins without a doctor desk.' },
        { label: 'Compliance', title: 'Drug licence & mode', text: 'Shop record stores a drug licence number. Pharmacy compliance can be OFF, SOFT or STRICT from effective-config.' },
        { label: 'People', title: 'Patients, not only customers', text: 'Party list uses patient wording. Sales returns and GST stay on the same finance/GST screens as retail.' }
      ],
      workflow: ['Medicine', 'Batch / expiry', 'Purchase / GRN', 'Dispense or walk-in', 'Billing', 'Stock update', 'Near-expiry / reports']
    },
    {
      id: 'wholesale',
      nav: 'Wholesale',
      name: 'Wholesale & distribution',
      kicker: 'WHOLESALE',
      headline: 'Sale, challan, invoice and credit in one depot.',
      description: 'Wholesale is a capability pack: dayboard, B2B sales orders, delivery challans, buyer credit and collections — not a renamed retail bill.',
      ico: 'WS',
      href: '/features',
      hrefLabel: 'Explore platform features →',
      chips: ['Sales orders', 'Delivery challan', 'Rate contracts', 'Buyer credit', 'Collections', 'Beat & delivery', 'AR ageing', 'GST / e-invoice hook'],
      features: [
        { label: 'Sales', title: 'B2B sales orders', text: 'Create, confirm and invoice wholesale SOs. Bill desk holds estimates. Digital entry and partner digital orders exist.' },
        { label: 'Dispatch', title: 'Challan then invoice', text: 'Delivery challans from an SO, then invoice. Delivery-run and proof-of-delivery screens sit next to beat plans.' },
        { label: 'Pricing', title: 'Contracts and credit', text: 'Party rate contracts and buyer credit limits/days on the customer. Credit-control and collection desk watch overdue parties.' },
        { label: 'Field', title: 'Beat, salesmen, ERP order', text: 'Beat/day plan, depot salesman targets, bulk party/stock import, and ERP-to-ERP ordering for linked partners.' },
        { label: 'Finance', title: 'Ledger and ageing', text: 'Party ledger, AR/AP ageing, sales analysis (including HSN). Finance-lite pack adds cash book, GL and final accounts.' },
        { label: 'GST', title: 'Invoice + optional e-invoice', text: 'Tax invoices carry GSTIN and transport fields. e-Invoice generation calls gst-service only when that integration is on.' }
      ],
      workflow: ['Buyer / rate', 'Sales order', 'Challan', 'Dispatch', 'Tax invoice', 'Collection', 'Ageing / reports']
    },
    {
      id: 'clinic',
      nav: 'Clinic',
      name: 'Clinics & polyclinics',
      kicker: 'CLINIC',
      headline: 'Less paperwork. More time for patients.',
      description: 'Polyclinic and clinic types get reception, doctor OPD, e-prescription and visit billing on a shared patient master. In-house pharmacy and lab referrals stay on the same tenant.',
      ico: 'CL',
      href: '/polyclinic',
      hrefLabel: 'Explore clinic →',
      chips: ['Reception & queue', 'Doctor OPD', 'E-prescription', 'Visit billing', 'Patient history', 'Pharmacy dispense', 'Lab referrals', 'Templates'],
      features: [
        { label: 'Front desk', title: 'Reception and queue TV', text: 'Appointments, queue and visit billing on reception. A clinic queue-display route is built for a waiting-room screen.' },
        { label: 'OPD', title: 'Doctor today board', text: 'Consultation pad: diagnosis, examination, history, tests and advice. Follow-ups and referral lists to pharmacy and path lab.' },
        { label: 'Rx', title: 'Printable prescriptions', text: 'Prescription PDFs plus shop-owned print, clinical and advice templates. Not a paper-only note.' },
        { label: 'Billing', title: 'Visit and service bills', text: 'Encounter billing for OPD, attached pharmacy and lab. Split payments and refunds on the healthcare billing APIs.' },
        { label: 'Records', title: 'Patient timeline', text: 'Tenant-wide patient master and an encounter timeline / complete history report. Dashboards stay after sign-in.' },
        { label: 'Hospital', title: 'IPD is hospital-only', text: 'Wards, nursing, rounds, ER and IPD billing exist for HOSPITAL tenants. Clinic and polyclinic stay OPD-first. Hospital is not self-serve registration.' }
      ],
      workflow: ['Patient', 'Appointment / queue', 'Consultation', 'Prescription', 'Pharmacy or lab', 'Visit bill', 'Patient history']
    },
    {
      id: 'automobile',
      nav: 'Automobile',
      name: 'Automobile parts and workshop',
      kicker: 'AUTOMOBILE',
      headline: 'Parts on the shelf. The vehicle on the job card.',
      description: 'Spare-parts shops, workshops, service centres, dealers, tyre shops and multi-brand counters record the vehicle being serviced, sell parts, and run job cards. A showroom stock of vehicles for sale, test drives, trade-ins and fleet trips are not shipped.',
      ico: 'AU',
      href: '/automobile',
      hrefLabel: 'Explore automobile →',
      chips: ['Make, model, variant', 'Registration and VIN', 'Spare parts', 'Parts finder', 'Job cards', 'Warranty claims', 'Core returns', 'GST billing'],
      features: [
        { label: 'Vehicle', title: 'The vehicle being serviced', text: 'Make, model, variant, year, fuel type and engine type, plus registration number and VIN, linked to a customer. This is not a stock list of cars for sale, and it does not store a vehicle photo gallery.' },
        { label: 'Parts', title: 'Spare parts and the counter', text: 'Parts use the product catalog: part number, category and selling price, with a parts finder and counter billing. There is no manufacturer catalog feed.' },
        { label: 'Workshop', title: 'Job cards consume stock', text: 'A job card keeps the registration, make, model, variant and year. Completing it consumes the spare-part lines. Technician assignment and booked service slots are not separate records.' },
        { label: 'Aftersales', title: 'Warranty and core returns', text: 'Warranty claims and core returns live on the automobile desk. There is no OEM warranty connection.' },
        { label: 'CRM', title: 'Follow-up stays on the CRM desk', text: 'Leads, tasks and a timeline are the separate CRM desk. A won lead does not create a GST invoice, a test drive, or a trade-in.' },
        { label: 'Not shipped', title: 'Showroom sales and fleet', text: 'New and used vehicle inventory for sale, test-drive booking, trade-in, driver assignment, trips, mileage and insurance-expiry reminders are not in the product.' }
      ],
      workflow: ['Vehicle registration', 'Spare part', 'Job card', 'Parts consumed', 'GST invoice']
    },
    {
      id: 'laboratory',
      nav: 'Laboratory',
      name: 'Pathology / laboratory',
      kicker: 'LABORATORY',
      headline: 'From booking to report, one connected worklist.',
      description: 'Standalone path-lab types get a LIS-style desk: test master, booking, accession, department boards, release and a private patient portal. There is no public list of reports.',
      ico: 'LB',
      href: '/pathology-lab',
      hrefLabel: 'Explore laboratory →',
      chips: ['Test master', 'Booking', 'Accession', 'Worklist', 'Report PDF', 'Patient portal', 'Payments', 'Referral network'],
      features: [
        { label: 'Orders', title: 'Booking and accession', text: 'Register tests, accession samples and drive a worklist. Camps and barcode settings sit in the same module.' },
        { label: 'Catalog', title: 'Tests, profiles, samples', text: 'Test master with parameters, profiles, sample types and pricing. Rate cards for referrers.' },
        { label: 'Bench', title: 'Department boards', text: 'Hematology, biochemistry, microbiology, histopathology and other department boards plus QC and NABL screens.' },
        { label: 'Release', title: 'Report PDF, not a public dump', text: 'Release from the lab desk. Patients use an OTP portal; doctors have a separate portal; a verify link exists. Marketing pages do not list reports.' },
        { label: 'Money', title: 'Lab payments and settlement', text: 'Path-lab payments hub, referrer commissions and settlement. Same tenant isolation as other shops.' },
        { label: 'Links', title: 'Clinic → lab', text: 'Polyclinic doctors raise path-lab referrals. Instruments and ecosystem (FHIR/ABHA) screens are present; treat ABHA as sandbox-style, not a live national claim.' }
      ],
      workflow: ['Patient', 'Test booking', 'Sample / accession', 'Worklist', 'Report release', 'Portal / PDF', 'Billing']
    },
    {
      id: 'school',
      nav: 'School',
      name: 'Schools',
      kicker: 'SCHOOL',
      headline: 'Same platform identity. Campus desks are not the shop POS.',
      description: 'SCHOOL is a real business type: Super Admin can onboard a school tenant, staff use the same login model, and school website domains are registered here. Fees, attendance and exams are not screens in shop-management-ui — those belong to the school workspace.',
      ico: 'SC',
      href: '/school-management',
      hrefLabel: 'Read the school page →',
      chips: ['School tenant', 'Shared login', 'Staff invite', 'Platform subscription', 'Website domains', 'Not shop billing'],
      features: [
        { label: 'Identity', title: 'Onboard a school tenant', text: 'Super Admin create-school registers the organisation. Owners and staff sign in with outlet/tenant credentials like every other vertical.' },
        { label: 'Access', title: 'Role templates, not a second user product', text: 'School role wording exists on staff templates. We do not run a separate school login product.' },
        { label: 'Plan', title: 'Platform subscription', text: 'Modules and limits come from the assigned plan. Shop POS modules stay off for a pure SCHOOL type.' },
        { label: 'Website', title: 'School site domains', text: 'Super Admin maintains school website domains (website-service). That is CMS hosting — not the fee desk.' },
        { label: 'Honest gap', title: 'Academic ops live elsewhere', text: 'This repository does not contain admission, fee collection, attendance or exam mark-entry screens. We will not list them as shop features.' }
      ],
      workflow: ['School tenant', 'Staff invite', 'Same auth', 'School workspace (separate UI)', 'Optional school website']
    }
  ]
};
