import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { isLeadStatus, normalizeLeadStatus } from "@/lib/lead-status";

const FILE_STORE = path.join(process.cwd(), "data", "b2b-leads.json");

function isDatabaseStorage() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

let dbSchemaEnsured = false;

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set.");
  return neon(url);
}

async function ensureDbSchema(sql) {
  if (dbSchemaEnsured) return;
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
  dbSchemaEnsured = true;
}

async function readFileStore() {
  try {
    const raw = await readFile(FILE_STORE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      corporate: Array.isArray(parsed.corporate) ? parsed.corporate : [],
      events: Array.isArray(parsed.events) ? parsed.events : [],
      experience: Array.isArray(parsed.experience) ? parsed.experience : [],
    };
  } catch (e) {
    if (e && typeof e === "object" && "code" in e && e.code === "ENOENT") {
      return { corporate: [], events: [], experience: [] };
    }
    throw e;
  }
}

async function writeFileStore(data) {
  await mkdir(path.dirname(FILE_STORE), { recursive: true });
  await writeFile(FILE_STORE, JSON.stringify(data, null, 2), "utf8");
}

/**
 * @param {{
 *   company: string;
 *   contactName: string;
 *   email: string;
 *   phone: string;
 *   invoicing: string;
 *   profileNotes: string;
 * }} row
 */
export async function insertCorporateLead(row) {
  if (isDatabaseStorage()) {
    const sql = getSql();
    await ensureDbSchema(sql);
    await sql`
      INSERT INTO corporate_leads (company, contact_name, email, phone, invoicing, profile_notes, status)
      VALUES (
        ${row.company},
        ${row.contactName},
        ${row.email},
        ${row.phone},
        ${row.invoicing},
        ${row.profileNotes || null},
        'pending'
      )
    `;
    return;
  }
  const store = await readFileStore();
  store.corporate.unshift({
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
    reviewedAt: null,
    company: row.company,
    contactName: row.contactName,
    email: row.email,
    phone: row.phone,
    invoicing: row.invoicing,
    profileNotes: row.profileNotes ?? "",
  });
  await writeFileStore(store);
}

/**
 * @param {{
 *   eventName: string;
 *   eventDate: string;
 *   guestCount: number;
 *   venues: string;
 *   checkInAssistance: boolean;
 *   logisticsNotes: string;
 *   contactName: string;
 *   email: string;
 *   phone: string;
 * }} row
 */
export async function insertEventLead(row) {
  if (isDatabaseStorage()) {
    const sql = getSql();
    await ensureDbSchema(sql);
    await sql`
      INSERT INTO event_leads (
        event_name,
        event_date,
        guest_count,
        venues,
        check_in_assistance,
        logistics_notes,
        contact_name,
        email,
        phone,
        status
      )
      VALUES (
        ${row.eventName},
        ${row.eventDate},
        ${row.guestCount},
        ${row.venues || null},
        ${row.checkInAssistance},
        ${row.logisticsNotes || null},
        ${row.contactName},
        ${row.email},
        ${row.phone},
        'pending'
      )
    `;
    return;
  }
  const store = await readFileStore();
  store.events.unshift({
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
    reviewedAt: null,
    eventName: row.eventName,
    eventDate: row.eventDate,
    guestCount: row.guestCount,
    venues: row.venues ?? "",
    checkInAssistance: row.checkInAssistance,
    logisticsNotes: row.logisticsNotes ?? "",
    contactName: row.contactName,
    email: row.email,
    phone: row.phone,
  });
  await writeFileStore(store);
}

/**
 * Full validated body from `POST /api/experience-request` (stored as JSON).
 * @param {Record<string, unknown>} payload
 */
export async function insertExperienceLead(payload) {
  if (isDatabaseStorage()) {
    const sql = getSql();
    await ensureDbSchema(sql);
    await sql`
      INSERT INTO experience_leads (payload, status)
      VALUES (${payload}, 'pending')
    `;
    return;
  }
  const store = await readFileStore();
  store.experience.unshift({
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
    reviewedAt: null,
    payload: JSON.parse(JSON.stringify(payload)),
  });
  await writeFileStore(store);
}

/** @param {string} id */
export async function getCorporateLeadById(id) {
  if (!id || typeof id !== "string") return null;
  if (isDatabaseStorage()) {
    const sql = getSql();
    await ensureDbSchema(sql);
    const rows = await sql`
      SELECT id, created_at, company, contact_name, email, phone, invoicing, profile_notes, status
      FROM corporate_leads
      WHERE id = ${id}::uuid
      LIMIT 1
    `;
    const r = rows[0];
    if (!r) return null;
    return {
      id: r.id,
      createdAt: r.created_at,
      company: r.company,
      contactName: r.contact_name,
      email: r.email,
      phone: r.phone,
      invoicing: r.invoicing,
      profileNotes: r.profile_notes ?? "",
      status: normalizeLeadStatus(r.status),
    };
  }
  const store = await readFileStore();
  const found = store.corporate.find((c) => String(c.id) === id);
  if (!found) return null;
  return {
    id: found.id,
    createdAt: found.createdAt,
    company: found.company,
    contactName: found.contactName,
    email: found.email,
    phone: found.phone,
    invoicing: found.invoicing,
    profileNotes: found.profileNotes ?? "",
    status: normalizeLeadStatus(found.status),
  };
}

/** @returns {Promise<Array<Record<string, unknown>>>} */
export async function listCorporateLeads() {
  if (isDatabaseStorage()) {
    const sql = getSql();
    await ensureDbSchema(sql);
    const rows = await sql`
      SELECT id, created_at, company, contact_name, email, phone, invoicing, profile_notes, status, reviewed_at
      FROM corporate_leads
      ORDER BY created_at DESC
    `;
    return rows.map((r) => ({
      id: r.id,
      createdAt: r.created_at,
      company: r.company,
      contactName: r.contact_name,
      email: r.email,
      phone: r.phone,
      invoicing: r.invoicing,
      profileNotes: r.profile_notes ?? "",
      status: normalizeLeadStatus(r.status),
      reviewedAt: r.reviewed_at ?? null,
    }));
  }
  const store = await readFileStore();
  return store.corporate.map((r) => ({
    ...r,
    status: normalizeLeadStatus(r.status),
    reviewedAt: r.reviewedAt ?? null,
  }));
}

/** @returns {Promise<Array<Record<string, unknown>>>} */
export async function listEventLeads() {
  if (isDatabaseStorage()) {
    const sql = getSql();
    await ensureDbSchema(sql);
    const rows = await sql`
      SELECT
        id,
        created_at,
        event_name,
        event_date,
        guest_count,
        venues,
        check_in_assistance,
        logistics_notes,
        contact_name,
        email,
        phone,
        status,
        reviewed_at
      FROM event_leads
      ORDER BY created_at DESC
    `;
    return rows.map((r) => ({
      id: r.id,
      createdAt: r.created_at,
      eventName: r.event_name,
      eventDate: r.event_date,
      guestCount: r.guest_count,
      venues: r.venues ?? "",
      checkInAssistance: r.check_in_assistance,
      logisticsNotes: r.logistics_notes ?? "",
      contactName: r.contact_name,
      email: r.email,
      phone: r.phone,
      status: normalizeLeadStatus(r.status),
      reviewedAt: r.reviewed_at ?? null,
    }));
  }
  const store = await readFileStore();
  return store.events.map((r) => ({
    ...r,
    status: normalizeLeadStatus(r.status),
    reviewedAt: r.reviewedAt ?? null,
  }));
}

function mapExperienceRow(r) {
  const p =
    r.payload && typeof r.payload === "object" && !Array.isArray(r.payload)
      ? /** @type {Record<string, unknown>} */ (r.payload)
      : {};
  return {
    id: r.id,
    createdAt: r.created_at ?? r.createdAt,
    status: normalizeLeadStatus(r.status),
    reviewedAt: r.reviewed_at ?? r.reviewedAt ?? null,
    firstName: String(p.firstName ?? ""),
    lastName: String(p.lastName ?? ""),
    email: String(p.email ?? ""),
    phone: String(p.phone ?? ""),
    serviceInterest: String(p.serviceInterest ?? ""),
    pickupDate: String(p.pickupDate ?? ""),
    pickupTime: String(p.pickupTime ?? ""),
    pickupAddress: String(p.pickupAddress ?? ""),
    destinationAddress: String(p.destinationAddress ?? ""),
    payload: p,
  };
}

/** @returns {Promise<Array<Record<string, unknown>>>} */
export async function listExperienceLeads() {
  if (isDatabaseStorage()) {
    const sql = getSql();
    await ensureDbSchema(sql);
    const rows = await sql`
      SELECT id, created_at, status, reviewed_at, payload
      FROM experience_leads
      ORDER BY created_at DESC
    `;
    return rows.map((r) => mapExperienceRow(r));
  }
  const store = await readFileStore();
  return store.experience.map((r) =>
    mapExperienceRow({
      id: r.id,
      createdAt: r.createdAt,
      status: r.status,
      reviewedAt: r.reviewedAt,
      payload: r.payload,
    }),
  );
}

/**
 * @param {"corporate" | "events" | "experience"} scope
 * @param {string} id
 * @param {import("@/lib/lead-status").LeadStatus} status
 */
export async function updateLeadStatus(scope, id, status) {
  if (!isLeadStatus(status)) {
    throw new Error("Invalid status.");
  }
  const reviewedAt = status === "pending" ? null : new Date();

  if (isDatabaseStorage()) {
    const sql = getSql();
    await ensureDbSchema(sql);
    if (scope === "corporate") {
      const rows = await sql`
        UPDATE corporate_leads
        SET status = ${status}, reviewed_at = ${reviewedAt}
        WHERE id = ${id}::uuid
        RETURNING id
      `;
      return rows.length > 0;
    }
    if (scope === "events") {
      const rows = await sql`
        UPDATE event_leads
        SET status = ${status}, reviewed_at = ${reviewedAt}
        WHERE id = ${id}::uuid
        RETURNING id
      `;
      return rows.length > 0;
    }
    if (scope === "experience") {
      const rows = await sql`
        UPDATE experience_leads
        SET status = ${status}, reviewed_at = ${reviewedAt}
        WHERE id = ${id}::uuid
        RETURNING id
      `;
      return rows.length > 0;
    }
    throw new Error("Invalid scope.");
  }

  const store = await readFileStore();
  const list =
    scope === "corporate" ? store.corporate : scope === "events" ? store.events : store.experience;
  const row = list.find((r) => String(r.id) === String(id));
  if (!row) return false;
  row.status = status;
  row.reviewedAt = reviewedAt ? reviewedAt.toISOString() : null;
  await writeFileStore(store);
  return true;
}

export function storageMode() {
  return isDatabaseStorage() ? "database" : "file";
}

/**
 * Returns a Neon SQL client with B2B lead tables ensured. Null when DATABASE_URL is unset (file mode).
 * @returns {Promise<ReturnType<typeof neon> | null>}
 */
export async function getLeadDatabaseSql() {
  if (!isDatabaseStorage()) return null;
  const sql = getSql();
  await ensureDbSchema(sql);
  return sql;
}
