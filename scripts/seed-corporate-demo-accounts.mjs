/**
 * Creates two fixed demo corporate leads with portal grants so you can test
 * /portal/corporate magic-link sign-in without manual admin clicks.
 *
 * Usage (from repo root):
 *   npm run seed:corporate-demo
 *
 * Loads `.env.local` then `.env` into process.env when keys are unset.
 * Uses Postgres when DATABASE_URL is set; otherwise merges `data/b2b-leads.json`
 * and `data/corporate-portal.json`.
 */

import { readFileSync, existsSync } from "node:fs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";
import { DEMO_CORPORATE_SEED_ROWS } from "../lib/dev-auth-helper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const DEMO = DEMO_CORPORATE_SEED_ROWS;

function loadDotEnv() {
  for (const name of [".env.local", ".env"]) {
    const p = path.join(ROOT, name);
    if (!existsSync(p)) continue;
    const text = readFileSync(p, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

async function ensureDbSchema(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS corporate_leads (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at timestamptz NOT NULL DEFAULT now(),
      company text NOT NULL,
      contact_name text NOT NULL,
      email text NOT NULL,
      phone text NOT NULL,
      invoicing text NOT NULL,
      profile_notes text
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS event_leads (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at timestamptz NOT NULL DEFAULT now(),
      event_name text NOT NULL,
      event_date date NOT NULL,
      guest_count integer NOT NULL,
      venues text,
      check_in_assistance boolean NOT NULL DEFAULT false,
      logistics_notes text,
      contact_name text NOT NULL,
      email text NOT NULL,
      phone text NOT NULL
    )
  `;
  await sql`
    ALTER TABLE corporate_leads
    ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending'
  `;
  await sql`
    ALTER TABLE corporate_leads
    ADD COLUMN IF NOT EXISTS reviewed_at timestamptz
  `;
  await sql`
    ALTER TABLE event_leads
    ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending'
  `;
  await sql`
    ALTER TABLE event_leads
    ADD COLUMN IF NOT EXISTS reviewed_at timestamptz
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS experience_leads (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at timestamptz NOT NULL DEFAULT now(),
      status text NOT NULL DEFAULT 'pending',
      reviewed_at timestamptz,
      payload jsonb NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS corporate_portal_grants (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      corporate_lead_id uuid NOT NULL REFERENCES corporate_leads (id) ON DELETE CASCADE,
      email text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      revoked_at timestamptz
    )
  `;
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS corporate_portal_grants_one_active_per_lead
    ON corporate_portal_grants (corporate_lead_id)
    WHERE revoked_at IS NULL
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS corporate_portal_magic_tokens (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      grant_id uuid NOT NULL REFERENCES corporate_portal_grants (id) ON DELETE CASCADE,
      token_hash text NOT NULL,
      expires_at timestamptz NOT NULL,
      consumed_at timestamptz
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS corporate_portal_magic_tokens_lookup
    ON corporate_portal_magic_tokens (token_hash)
    WHERE consumed_at IS NULL
  `;
}

async function seedDatabase() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) throw new Error("DATABASE_URL missing for DB seed.");
  const sql = neon(url);
  await ensureDbSchema(sql);

  for (const d of DEMO) {
    await sql`
      DELETE FROM corporate_portal_magic_tokens
      WHERE grant_id = ${d.grantId}::uuid
    `;
    await sql`
      DELETE FROM corporate_portal_grants
      WHERE id = ${d.grantId}::uuid
    `;
    await sql`
      DELETE FROM corporate_leads
      WHERE id = ${d.leadId}::uuid
    `;
  }

  for (const d of DEMO) {
    const emailNorm = d.email.trim().toLowerCase();
    await sql`
      INSERT INTO corporate_leads (
        id,
        company,
        contact_name,
        email,
        phone,
        invoicing,
        profile_notes,
        status
      )
      VALUES (
        ${d.leadId}::uuid,
        ${d.company},
        ${d.contactName},
        ${emailNorm},
        ${d.phone},
        ${d.invoicing},
        ${d.profileNotes},
        'accepted'
      )
    `;
    await sql`
      INSERT INTO corporate_portal_grants (id, corporate_lead_id, email)
      VALUES (${d.grantId}::uuid, ${d.leadId}::uuid, ${emailNorm})
    `;
  }
}

const FILE_LEADS = path.join(ROOT, "data", "b2b-leads.json");
const FILE_PORTAL = path.join(ROOT, "data", "corporate-portal.json");

async function readJsonSafe(file, fallback) {
  try {
    const raw = await readFile(file, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    if (e && typeof e === "object" && "code" in e && e.code === "ENOENT") return structuredClone(fallback);
    throw e;
  }
}

async function seedFiles() {
  const leadIds = new Set(DEMO.map((d) => d.leadId));
  const grantIds = new Set(DEMO.map((d) => d.grantId));

  const leadsStore = await readJsonSafe(FILE_LEADS, { corporate: [], events: [], experience: [] });
  leadsStore.corporate = Array.isArray(leadsStore.corporate) ? leadsStore.corporate : [];
  leadsStore.events = Array.isArray(leadsStore.events) ? leadsStore.events : [];
  leadsStore.experience = Array.isArray(leadsStore.experience) ? leadsStore.experience : [];

  leadsStore.corporate = leadsStore.corporate.filter((r) => !leadIds.has(String(r.id)));

  const now = new Date().toISOString();
  for (const d of DEMO) {
    leadsStore.corporate.unshift({
      id: d.leadId,
      createdAt: now,
      status: "accepted",
      reviewedAt: now,
      company: d.company,
      contactName: d.contactName,
      email: d.email.trim().toLowerCase(),
      phone: d.phone,
      invoicing: d.invoicing,
      profileNotes: d.profileNotes,
    });
  }

  const portalStore = await readJsonSafe(FILE_PORTAL, { grants: [], tokens: [] });
  portalStore.grants = Array.isArray(portalStore.grants) ? portalStore.grants : [];
  portalStore.tokens = Array.isArray(portalStore.tokens) ? portalStore.tokens : [];

  portalStore.tokens = portalStore.tokens.filter((t) => !grantIds.has(String(t.grantId)));
  portalStore.grants = portalStore.grants.filter((g) => !grantIds.has(String(g.id)));

  for (const d of DEMO) {
    const emailNorm = d.email.trim().toLowerCase();
    portalStore.grants.push({
      id: d.grantId,
      corporateLeadId: d.leadId,
      email: emailNorm,
      createdAt: now,
      revokedAt: null,
    });
  }

  await mkdir(path.dirname(FILE_LEADS), { recursive: true });
  await writeFile(FILE_LEADS, JSON.stringify(leadsStore, null, 2), "utf8");
  await writeFile(FILE_PORTAL, JSON.stringify(portalStore, null, 2), "utf8");
}

async function main() {
  loadDotEnv();
  const useDb = Boolean(process.env.DATABASE_URL?.trim());

  if (useDb) {
    await seedDatabase();
    console.log("Seeded demo corporate leads + portal grants in Postgres.");
  } else {
    await seedFiles();
    console.log("Seeded demo corporate leads + portal grants in data/*.json (file mode).");
  }

  console.log("");
  console.log("Demo portal sign-in emails (use on /portal/corporate):");
  for (const d of DEMO) {
    console.log(`  • ${d.email}  (${d.company})`);
  }
  console.log("");
  console.log("Next: npm run dev");
  console.log("  • Corporate portal: /portal/corporate → request magic link (or copy verify URL from server log if Resend unset).");
  console.log("  • Faster: set DEV_AUTH_HELPER=1 in .env, then open /dev/auth-test for one-click portal sign-in.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
