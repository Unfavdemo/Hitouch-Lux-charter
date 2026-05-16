/**
 * Opt-in local testing helpers (see `.env.example` → DEV_AUTH_HELPER).
 * Never set DEV_AUTH_HELPER in production.
 */
export function isDevAuthHelperEnabled() {
  return process.env.NODE_ENV === "development" && process.env.DEV_AUTH_HELPER === "1";
}

/**
 * Fixed UUIDs + copy for `npm run seed:corporate-demo` (file or Postgres).
 * Keep in sync with `scripts/seed-corporate-demo-accounts.mjs` consumers only here.
 */
export const DEMO_CORPORATE_SEED_ROWS = [
  {
    leadId: "a1000000-0000-4000-8000-000000000001",
    grantId: "b2000000-0000-4000-8000-000000000001",
    company: "Demo Alpha Logistics",
    contactName: "Alex Demo",
    email: "demo-alpha@hitouch-portal.test",
    phone: "+12155550101",
    invoicing: "Net 30 · consolidated monthly",
    profileNotes: "Seed account for portal QA (alpha).",
  },
  {
    leadId: "a1000000-0000-4000-8000-000000000002",
    grantId: "b2000000-0000-4000-8000-000000000002",
    company: "Demo Beta Capital",
    contactName: "Blair Demo",
    email: "demo-beta@hitouch-portal.test",
    phone: "+12155550102",
    invoicing: "PO required · weekly digest",
    profileNotes: "Seed account for portal QA (beta).",
  },
];

export const DEMO_PORTAL_TEST_EMAILS = DEMO_CORPORATE_SEED_ROWS.map((d) => d.email.trim().toLowerCase());
