/**
 * Module / workspace details from shop-management-ui navigation and report centre.
 * Sample figures in previews are illustrative. Live data stays after sign-in.
 */
window.SF_DESKS = {
  modules: [
    {
      id: 'billing',
      ico: 'BL',
      name: 'Billing & POS',
      summary: 'Fast checkout, partial payments, dues, GST on the collected amount, and printable invoices.',
      href: '/modules/billing',
      header: ['Products', 'Orders', 'Stocks', 'Payment'],
      sidebar: [
        { group: 'Overview', items: ['Command center'] },
        { group: 'Orders', items: ['Orders', 'Add order', 'Scan to order'] },
        { group: 'People', items: ['Customers', 'Staff'] },
        { group: 'Reports', items: ['Report centre'] }
      ],
      screen: {
        title: 'Orders',
        subtitle: 'Signed-in sale list — Customer, items, date, payment, total.',
        kpis: [
          { label: 'Today sales', value: '₹48,250' },
          { label: 'Bills', value: '24' },
          { label: 'Due', value: '₹6,400' }
        ],
        rows: [
          ['Counter walk-in', '3 items', 'PAID', '₹1,280'],
          ['Credit sale', '8 items', 'PARTIAL', '₹4,920'],
          ['UPI + cash split', '2 items', 'PAID', '₹640']
        ]
      },
      features: [
        { title: 'Sale / POS form', text: 'Create and edit bills on /orders/add. Barcode lookup and camera scan sit on the same form.' },
        { title: 'GST on the amount collected', text: 'Inclusive or exclusive from the shop GST profile. Line HSN and GST % come from the product. We do not invent IRNs on this page.' },
        { title: 'Split payments and dues', text: 'Cash, UPI, card and other splits. Outstanding filters and the payment workspace collect what is still due.' },
        { title: 'Print', text: 'Invoice print (A4 / thermal / PDF) from the signed-in desk. There is no public bill list on this website.' },
        { title: 'Returns', text: 'Sales returns and credit notes live under finance, not as a second billing engine.' }
      ]
    },
    {
      id: 'inventory',
      ico: 'IN',
      name: 'Inventory & warehouse',
      summary: 'On-hand stock, batches, near-expiry, transfers, rack/bin, barcode labels and stock intelligence.',
      href: '/modules/inventory',
      header: ['Products', 'Orders', 'Stocks'],
      sidebar: [
        { group: 'Daily stock', items: ['Stock on hand', 'Add stock', 'Near-expiry'] },
        { group: 'Inventory operations', items: ['Stock intelligence', 'Rack / bin putaway', 'Warehouse transfers', 'Barcode labels', 'Production / BOM'] }
      ],
      screen: {
        title: 'Stock on hand',
        subtitle: 'Batch and location stay on the signed-in stock list.',
        kpis: [
          { label: 'SKUs', value: '1,842' },
          { label: 'Near expiry', value: '7' },
          { label: 'Low stock', value: '12' }
        ],
        rows: [
          ['Paracetamol 650', 'B12', 'Near expiry', '48'],
          ['ORS sachets', 'A3', 'Low', '9'],
          ['Amox 500', 'C1', 'In stock', '220']
        ]
      },
      features: [
        { title: 'Stock list and add stock', text: '/stocks and /stocks/add. Medicine shops get a daily stock group plus expiry.' },
        { title: 'Batches and FEFO', text: 'Inventory batches carry expiry. Selling can reserve FEFO from stock-service.' },
        { title: 'Warehouse', text: 'Aisle / rack / bin locations and inter-warehouse transfers.' },
        { title: 'Intelligence', text: 'ABC/XYZ/FSN and demand/expiry views on /stocks/intelligence. Production/BOM is a worksheet — stock still posts on add/transfer/count.' },
        { title: 'Alerts', text: 'Business alerts for low stock and expiry when rules are enabled.' }
      ]
    },
    {
      id: 'purchase',
      ico: 'PO',
      name: 'Purchase & procurement',
      summary: 'Purchase orders, GRN, suppliers, auto-PO queue, OCR draft import, inspections and AP invoices.',
      href: '/modules/purchase',
      header: ['Stocks'],
      sidebar: [
        { group: 'Inventory operations', items: ['Purchase bill', 'Purchase orders', 'Procurement (auto PO)', 'Suppliers'] },
        { group: 'Procurement', items: ['Direct GRN', 'Inspections', 'Purchase returns', 'AP invoices', 'Reconciliation'] }
      ],
      screen: {
        title: 'Purchase orders',
        subtitle: 'PO list and status. OCR drafts stay drafts until a person confirms.',
        kpis: [
          { label: 'Open POs', value: '6' },
          { label: 'To receive', value: '2' },
          { label: 'Suppliers', value: '18' }
        ],
        rows: [
          ['PO-1042', 'Draft OCR', 'Pending confirm', '—'],
          ['PO-1041', 'Sent', 'Partial GRN', '₹86,400'],
          ['PO-1038', 'Received', 'Closed', '₹12,200']
        ]
      },
      features: [
        { title: 'PO lifecycle', text: 'Create, confirm, approve, send, receive, cancel on /stocks/purchase-orders.' },
        { title: 'GRN', text: 'Receive against a PO or post a direct GRN. Purchase bill sits next to it.' },
        { title: 'OCR import', text: 'Upload can draft lines. The engine can fall back to a stub parser. Nothing posts until confirm.' },
        { title: 'Suppliers and AP', text: 'Supplier master, claims, purchase returns, 3-way AP invoices, stock reconciliation.' },
        { title: 'Auto PO', text: 'Procurement dashboard compiles shortages into a PO queue.' }
      ]
    },
    {
      id: 'finance',
      ico: 'FN',
      name: 'Finance & credit',
      summary: 'Party ledger, collection desk, credit control, AR/AP ageing, cash book and final accounts — on the finance-lite pack.',
      href: '/modules/finance',
      header: ['Payment'],
      sidebar: [
        { group: 'Finance', items: ['Accounts', 'Final accounts', 'Party ledger', 'Credit control', 'Collection desk', 'AR ageing', 'AP ageing'] },
        { group: 'Cashbook', items: ['Cash book', 'Daily income', 'Daily expenses', 'Payroll'] }
      ],
      screen: {
        title: 'Collection desk',
        subtitle: 'Cheque / UPI / salesman desk. Live ageing stays after sign-in.',
        kpis: [
          { label: 'AR due', value: '₹41,200' },
          { label: 'Cheques', value: '4' },
          { label: 'Overdue parties', value: '9' }
        ],
        rows: [
          ['Buyer A', 'Credit 21d', 'Overdue', '₹18,400'],
          ['Buyer B', 'Credit 14d', 'Due this week', '₹9,200'],
          ['Walk-in dues', 'Counter', 'Partial', '₹1,150']
        ]
      },
      features: [
        { title: 'Who sees this', text: 'Finance-lite and cashbook are capability / module gates. Clinic and path-lab tenants do not get wholesale finance by default.' },
        { title: 'Party money', text: 'Party ledger, collection desk, credit holds and override approvals.' },
        { title: 'Ageing', text: 'AR and AP ageing screens. Sales analysis includes HSN and route rollups.' },
        { title: 'Books', text: 'Cash book, general ledger, final accounts (P&L / balance sheet), daily expenses, payroll memo, other income.' }
      ]
    },
    {
      id: 'gst',
      ico: 'GST',
      name: 'GST & compliance',
      summary: 'GST on everyday bills, GSTR summary, GST recon / ITC. e-Invoice and e-Way only when gst-service is configured.',
      href: '/modules/gst',
      header: ['Orders', 'Stocks'],
      sidebar: [
        { group: 'Inventory operations', items: ['GSTR summary', 'GST recon / ITC'] },
        { group: 'Finance', items: ['E-Invoice / E-Way'] }
      ],
      screen: {
        title: 'GSTR summary',
        subtitle: 'GSTR-1 / 3B style summary from books. Not a government portal.',
        kpis: [
          { label: 'Taxable', value: '₹2.10L' },
          { label: 'GST', value: '₹37,800' },
          { label: 'e-Invoice', value: 'When configured' }
        ],
        rows: [
          ['B2C', 'Books', 'Summary', '₹1.12L'],
          ['B2B', 'Books', 'Summary', '₹98,000'],
          ['Credit notes', 'Returns', 'Linked', '₹6,200']
        ]
      },
      features: [
        { title: 'On the bill', text: 'CGST/SGST or IGST from the shop GSTIN and pricing mode. Amount payable equals the printed total.' },
        { title: 'GSTR summary', text: '/stocks/gstr-summary — a books summary, not a filed return on this website.' },
        { title: 'Recon / ITC / GSTR-2B', text: '/stocks/gst-recon matches books vs imported 2B stubs when used.' },
        { title: 'e-Invoice / e-Way', text: 'Fields and an ack screen exist. Generation calls gst-service only when that integration is on. We do not invent IRN or e-way numbers.' }
      ]
    },
    {
      id: 'clinic',
      ico: 'CL',
      name: 'Clinic workflows',
      summary: 'Reception, doctor queue, e-prescription, visit billing, in-house pharmacy and lab referrals. Nursing/IPD is hospital-only.',
      href: '/modules/clinic',
      header: ['Today', 'Patients', 'Consultations', 'Path Lab referrals', 'Pharmacy referrals', 'Payment'],
      sidebar: [
        { group: 'Overview', items: ['Command center', 'Healthcare overview'] },
        { group: 'Clinic', items: ['Today', 'Patients', 'Reception', 'Queue display (TV)', 'Patient history', 'Prescription templates'] },
        { group: 'Pharmacy', items: ['Queue', 'Walk-in', 'Counter', 'Expiry'] }
      ],
      screen: {
        title: 'Doctor · Today',
        subtitle: 'Consultation board. Patient records are not on this marketing site.',
        kpis: [
          { label: 'In queue', value: '18' },
          { label: 'Seen', value: '11' },
          { label: 'Follow-ups', value: '4' }
        ],
        rows: [
          ['Token 12', 'OPD', 'Waiting', '—'],
          ['Token 11', 'Consult', 'e-Rx drafted', 'Pharmacy'],
          ['Token 09', 'Consult', 'Lab referred', 'Path lab']
        ]
      },
      features: [
        { title: 'Reception', text: 'Appointments, queue and visit billing on /reception/dashboard. Queue TV is a dedicated route.' },
        { title: 'Doctor desk', text: 'Today, patients, consultation pad (diagnosis, exam, history, tests, advice), follow-ups.' },
        { title: 'e-Prescription', text: 'Printable Rx plus shop templates. Referrals go to pharmacy and path lab on the same tenant.' },
        { title: 'Billing', text: 'Encounter bills for OPD, attached pharmacy and lab. Split pay and refunds on healthcare APIs.' },
        { title: 'Hospital IPD', text: 'Wards, nursing, rounds, ER and IPD billing exist only for HOSPITAL tenants. Clinic/polyclinic stay OPD-first.' }
      ]
    },
    {
      id: 'school',
      ico: 'SC',
      name: 'School campus',
      summary: 'School is a platform tenant and website domain — not the shop POS. Fee, attendance and exam screens are not in shop-management-ui.',
      href: '/modules/school',
      header: ['Sign in', 'School workspace'],
      sidebar: [
        { group: 'Platform', items: ['Register school', 'Tenant users', 'Login invite', 'Platform subscription', 'School website domains'] }
      ],
      screen: {
        title: 'School tenant',
        subtitle: 'Super Admin onboards the organisation. Campus desks are a separate school workspace.',
        kpis: [
          { label: 'Shop POS', value: 'Off' },
          { label: 'Same login', value: 'Yes' },
          { label: 'Website CMS', value: 'When assigned' }
        ],
        rows: [
          ['Onboard', 'create-school', 'Shipped', 'Super Admin'],
          ['Staff', 'Invite + roles', 'Shipped', 'auth-service'],
          ['Fees / attendance / exams', 'School UI', 'Not in shop UI', 'Do not claim here']
        ]
      },
      features: [
        { title: 'What exists here', text: 'SCHOOL business type, Super Admin create-school, staff invite, platform subscription, school website domains.' },
        { title: 'What we will not list', text: 'Admission, fee collection, attendance, exams, hostel, transport and parent SMS are not screens in this shop repository.' }
      ]
    },
    {
      id: 'staff',
      ico: 'ST',
      name: 'Staff & roles',
      summary: 'Invite staff. Role templates and permission JSON decide which desk opens — owner, cashier, doctor, accountant.',
      href: '/modules/staff',
      header: ['Staff'],
      sidebar: [
        { group: 'People admin', items: ['Staff', 'Login invite'] },
        { group: 'Settings', items: ['Settings hub'] }
      ],
      screen: {
        title: 'Staff',
        subtitle: 'Invites go through auth-service. No shared counter password.',
        kpis: [
          { label: 'Active staff', value: '7' },
          { label: 'Roles', value: 'Templates' },
          { label: 'Login', value: 'Shop + user' }
        ],
        rows: [
          ['Owner', 'All desks', 'Active', '—'],
          ['Cashier', 'Orders, payments', 'Active', '—'],
          ['Doctor', 'Today, patients, Rx', 'Active', 'Clinic']
        ]
      },
      features: [
        { title: 'Invite, not public register', text: 'Staff accept an invite and set a password. Public auth register is disabled.' },
        { title: 'Permissions', text: 'Routes use PermissionGuard. Templates vary by business type (clinic, path lab, school wording).' },
        { title: 'Optional TOTP', text: 'MFA exists on auth-service. Password reset is on the login host.' }
      ]
    },
    {
      id: 'parties',
      ico: 'PT',
      name: 'Customers & parties',
      summary: 'Party master: customers, patients or buyers — GSTIN and credit fields where the type needs them. Not a CRM pipeline.',
      href: '/modules/parties',
      header: ['Customers'],
      sidebar: [
        { group: 'People', items: ['Customers / Patients / Buyers', 'Add party'] },
        { group: 'Finance', items: ['Party ledger', 'Credit control'] }
      ],
      screen: {
        title: 'Customers',
        subtitle: 'Label changes with business type (Customers, Patients, Buyers, Guests).',
        kpis: [
          { label: 'Parties', value: '312' },
          { label: 'With GSTIN', value: '48' },
          { label: 'Credit accounts', value: '22' }
        ],
        rows: [
          ['Retail customer', 'Due', '₹640', 'UPI'],
          ['Wholesale buyer', 'Credit 21d', '₹18,400', 'Limit set'],
          ['Clinic patient', 'Tenant-wide', '—', 'History']
        ]
      },
      features: [
        { title: 'One party list', text: '/users is the tenant party master. Clinic and lab use tenant-wide patients.' },
        { title: 'Wholesale credit', text: 'Credit limit and days on the buyer. Collection and credit-control use those fields.' },
        { title: 'Not a CRM board', text: 'There is no tenant sales-pipeline CRM in this shop UI. Super Admin may see platform CRM renewals only.' }
      ]
    },
    {
      id: 'wholesale',
      ico: 'WS',
      name: 'Wholesale & distribution',
      summary: 'Dayboard, sale bill, challan, delivery run, beat plan, bill desk and collections — WHOLESALE pack only.',
      href: '/modules/wholesale',
      header: ['Dayboard', 'Sale bill', 'Purchase bill'],
      sidebar: [
        { group: 'Wholesale', items: ['Dayboard', 'Sale bill', 'Purchase bill', 'Bill desk / Estimate', 'Delivery run / POD', 'Beat / day plan', 'Depot salesmen', 'Report centre'] }
      ],
      screen: {
        title: 'Wholesale dayboard',
        subtitle: 'Today sales, purchase, cash, AR/AP. Permission-aware.',
        kpis: [
          { label: 'Sale', value: '₹1.12L' },
          { label: 'Purchase', value: '₹64,000' },
          { label: 'AR', value: '₹41,200' }
        ],
        rows: [
          ['SO-2201', 'Challan', 'Dispatched', '₹22,400'],
          ['SO-2198', 'Invoiced', 'Due 14d', '₹18,000'],
          ['Estimate', 'Bill desk', 'Open', '₹9,500']
        ]
      },
      features: [
        { title: 'SO → challan → invoice', text: 'B2B sales orders, delivery challans, then tax invoice. Estimates on bill desk.' },
        { title: 'Field', text: 'Delivery run / POD, beat plan, depot salesmen, party/stock import, ERP-to-ERP ordering.' },
        { title: 'Credit', text: 'Rate contracts, buyer credit, collection desk, AR ageing.' }
      ]
    },
    {
      id: 'laboratory',
      ico: 'LB',
      name: 'Pathology laboratory',
      summary: 'Booking, accession, worklist, report release, payments. Patient portal is OTP — no public report list.',
      href: '/modules/laboratory',
      header: ['Dashboard', 'Orders', 'Worklist', 'Reports', 'Payments'],
      sidebar: [
        { group: 'Lab ops', items: ['Patient history', 'Patients', 'Sample tracking', 'External lab'] },
        { group: 'Catalog', items: ['Test master'] },
        { group: 'Inventory', items: ['Stock'] }
      ],
      screen: {
        title: 'Worklist',
        subtitle: 'Department boards stay after sign-in. Reports are not listed on sugamflow.com.',
        kpis: [
          { label: 'Booked', value: '42' },
          { label: 'In process', value: '15' },
          { label: 'Ready', value: '9' }
        ],
        rows: [
          ['ACC-902', 'CBC', 'Accessioned', 'Hematology'],
          ['ACC-901', 'LFT', 'In process', 'Biochemistry'],
          ['ACC-888', 'TSH', 'Ready', 'Release']
        ]
      },
      features: [
        { title: 'Daily header', text: 'Dashboard, booking (Orders), worklist, reports, payments — existing path-lab routes.' },
        { title: 'Release', text: 'PDF from the lab desk. Patient OTP portal and doctor portal. /lab-report is noindex.' },
        { title: 'ABHA / FHIR', text: 'Ecosystem screens exist as sandbox-style forms — not a live national claim.' }
      ]
    },
    {
      id: 'reports',
      ico: 'RP',
      name: 'Reports',
      summary: 'Report centre catalogue: sales, purchase, stock, finance, GST and party. Dashboards stay inside the tenant.',
      href: '/modules/reports',
      header: ['Reports'],
      sidebar: [
        { group: 'Reports', items: ['Report centre', 'Business alerts', 'Owner dashboard'] }
      ],
      screen: {
        title: 'Report centre',
        subtitle: 'Catalogue from the signed-in reports screen. Export is not published here.',
        kpis: [
          { label: 'Sales', value: 'Dayboard, SO, analysis' },
          { label: 'Stock', value: 'On-hand, expiry, ABC' },
          { label: 'GST', value: 'Summary, recon' }
        ],
        rows: [
          ['Wholesale Dayboard', 'Sales', '/owner-dashboard', 'MIS'],
          ['Near expiry', 'Stock', '/stocks/near-expiry', 'Batches'],
          ['GSTR summary', 'GST', '/stocks/gstr-summary', 'Books']
        ]
      },
      features: [
        { title: 'Catalogue', text: 'The in-app report centre lists dayboard, sale book, sales analysis, returns, PO, AP, stock, intelligence, ageing, party ledger, collection, credit, AR/AP, cashbook, GL, final accounts, GSTR, recon, e-invoice screen.' },
        { title: 'Channel listings', text: 'Amazon/Flipkart CSV export only — no live marketplace connector.' }
      ]
    }
  ],
  dashboards: [
    {
      id: 'owner',
      name: 'Owner Dashboard',
      metric: '₹48,250',
      metricLabel: 'Today sales (sample)',
      text: 'Retail command center on /owner-dashboard. Live KPIs after sign-in.'
    },
    {
      id: 'wholesale',
      name: 'Wholesale Dayboard',
      metric: '₹1.12L',
      metricLabel: 'Depot sale (sample)',
      text: 'WHOLESALE pack. Today sale, purchase, cash, AR/AP.'
    },
    {
      id: 'clinic',
      name: 'Doctor / Clinic',
      metric: '18',
      metricLabel: 'Patients in queue (sample)',
      text: 'Doctor today board and healthcare overview. No patient names on this site.'
    },
    {
      id: 'inventory',
      name: 'Inventory',
      metric: '7',
      metricLabel: 'Near-expiry batches (sample)',
      text: 'Stock list, intelligence and expiry — tenant data only after login.'
    },
    {
      id: 'reports',
      name: 'Reports',
      metric: '25+',
      metricLabel: 'Catalogue entries',
      text: 'Report centre categories: Sales, Purchase, Stock, Finance, GST, Party.'
    }
  ]
};
