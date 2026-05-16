import { createHash, randomBytes, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getCorporateLeadById, getLeadDatabaseSql } from "@/lib/lead-storage";

const PORTAL_FILE = path.join(process.cwd(), "data", "corporate-portal.json");

/** @param {unknown} email */
export function normalizePortalEmail(email) {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

let portalDbEnsured = false;

/**
 * @param {*} sql
 */
async function ensurePortalTables(sql) {
  if (portalDbEnsured) return;
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
  portalDbEnsured = true;
}

async function readPortalFileStore() {
  try {
    const raw = await readFile(PORTAL_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      grants: Array.isArray(parsed.grants) ? parsed.grants : [],
      tokens: Array.isArray(parsed.tokens) ? parsed.tokens : [],
    };
  } catch (e) {
    if (e && typeof e === "object" && "code" in e && e.code === "ENOENT") {
      return { grants: [], tokens: [] };
    }
    throw e;
  }
}

async function writePortalFileStore(data) {
  await mkdir(path.dirname(PORTAL_FILE), { recursive: true });
  await writeFile(PORTAL_FILE, JSON.stringify(data, null, 2), "utf8");
}

function sha256Hex(value) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

/**
 * @param {string} corporateLeadId
 * @returns {Promise<{ id: string; corporateLeadId: string; email: string; createdAt: string; revokedAt: string | null } | null>}
 */
export async function getActivePortalGrantByCorporateLeadId(corporateLeadId) {
  const sql = await getLeadDatabaseSql();
  if (sql) {
    await ensurePortalTables(sql);
    const rows = await sql`
      SELECT id, corporate_lead_id, email, created_at, revoked_at
      FROM corporate_portal_grants
      WHERE corporate_lead_id = ${corporateLeadId}::uuid AND revoked_at IS NULL
      LIMIT 1
    `;
    const r = rows[0];
    if (!r) return null;
    return {
      id: r.id,
      corporateLeadId: r.corporate_lead_id,
      email: r.email,
      createdAt: r.created_at,
      revokedAt: r.revoked_at ?? null,
    };
  }
  const store = await readPortalFileStore();
  const g = store.grants.find(
    (x) => String(x.corporateLeadId) === corporateLeadId && !x.revokedAt,
  );
  if (!g) return null;
  return {
    id: String(g.id),
    corporateLeadId: String(g.corporateLeadId),
    email: String(g.email),
    createdAt: String(g.createdAt),
    revokedAt: g.revokedAt ? String(g.revokedAt) : null,
  };
}

/**
 * @param {string} corporateLeadId
 */
export async function insertPortalGrant(corporateLeadId) {
  const lead = await getCorporateLeadById(corporateLeadId);
  if (!lead) {
    throw new Error("Corporate lead not found.");
  }
  const email = normalizePortalEmail(lead.email);
  if (!email) {
    throw new Error("Lead has no email.");
  }

  const sql = await getLeadDatabaseSql();
  if (sql) {
    await ensurePortalTables(sql);
    const rows = await sql`
      INSERT INTO corporate_portal_grants (corporate_lead_id, email)
      VALUES (${corporateLeadId}::uuid, ${email})
      RETURNING id, corporate_lead_id, email, created_at, revoked_at
    `;
    const r = rows[0];
    return {
      id: r.id,
      corporateLeadId: r.corporate_lead_id,
      email: r.email,
      createdAt: r.created_at,
      revokedAt: r.revoked_at ?? null,
    };
  }

  const store = await readPortalFileStore();
  const existing = store.grants.find(
    (x) => String(x.corporateLeadId) === corporateLeadId && !x.revokedAt,
  );
  if (existing) {
    throw new Error("Portal access already granted for this lead.");
  }
  const row = {
    id: randomUUID(),
    corporateLeadId,
    email,
    createdAt: new Date().toISOString(),
    revokedAt: null,
  };
  store.grants.push(row);
  await writePortalFileStore(store);
  return {
    id: row.id,
    corporateLeadId: row.corporateLeadId,
    email: row.email,
    createdAt: row.createdAt,
    revokedAt: null,
  };
}

/**
 * @param {string} grantId
 */
export async function revokePortalGrant(grantId) {
  const sql = await getLeadDatabaseSql();
  if (sql) {
    await ensurePortalTables(sql);
    const rows = await sql`
      UPDATE corporate_portal_grants
      SET revoked_at = now()
      WHERE id = ${grantId}::uuid AND revoked_at IS NULL
      RETURNING id
    `;
    return rows.length > 0;
  }
  const store = await readPortalFileStore();
  const g = store.grants.find((x) => String(x.id) === grantId && !x.revokedAt);
  if (!g) return false;
  g.revokedAt = new Date().toISOString();
  await writePortalFileStore(store);
  return true;
}

/**
 * @param {string} email normalized
 * @returns {Promise<{ id: string; corporateLeadId: string; email: string } | null>}
 */
export async function findActiveGrantByEmailForMagicLink(email) {
  const norm = normalizePortalEmail(email);
  if (!norm) return null;

  const sql = await getLeadDatabaseSql();
  if (sql) {
    await ensurePortalTables(sql);
    const rows = await sql`
      SELECT id, corporate_lead_id, email
      FROM corporate_portal_grants
      WHERE lower(trim(email)) = ${norm} AND revoked_at IS NULL
      LIMIT 1
    `;
    const r = rows[0];
    if (!r) return null;
    return { id: r.id, corporateLeadId: r.corporate_lead_id, email: r.email };
  }
  const store = await readPortalFileStore();
  const g = store.grants.find((x) => normalizePortalEmail(x.email) === norm && !x.revokedAt);
  if (!g) return null;
  return {
    id: String(g.id),
    corporateLeadId: String(g.corporateLeadId),
    email: String(g.email),
  };
}

const MAGIC_TTL_MS = 30 * 60 * 1000;

/**
 * @param {string} grantId
 * @returns {Promise<{ plainToken: string; expiresAt: Date }>}
 */
export async function createMagicLinkToken(grantId) {
  const plainToken = randomBytes(32).toString("base64url");
  const tokenHash = sha256Hex(plainToken);
  const expiresAt = new Date(Date.now() + MAGIC_TTL_MS);

  const sql = await getLeadDatabaseSql();
  if (sql) {
    await ensurePortalTables(sql);
    await sql`
      INSERT INTO corporate_portal_magic_tokens (grant_id, token_hash, expires_at)
      VALUES (${grantId}::uuid, ${tokenHash}, ${expiresAt.toISOString()}::timestamptz)
    `;
    return { plainToken, expiresAt };
  }
  const store = await readPortalFileStore();
  store.tokens.push({
    id: randomUUID(),
    grantId,
    tokenHash,
    expiresAt: expiresAt.toISOString(),
    consumedAt: null,
  });
  await writePortalFileStore(store);
  return { plainToken, expiresAt };
}

/**
 * @param {string} plainToken
 * @returns {Promise<string | null>} grant id
 */
export async function consumeMagicLinkToken(plainToken) {
  if (!plainToken || typeof plainToken !== "string") return null;
  const tokenHash = sha256Hex(plainToken.trim());

  const sql = await getLeadDatabaseSql();
  if (sql) {
    await ensurePortalTables(sql);
    const rows = await sql`
      UPDATE corporate_portal_magic_tokens
      SET consumed_at = now()
      WHERE token_hash = ${tokenHash}
        AND consumed_at IS NULL
        AND expires_at > now()
      RETURNING grant_id
    `;
    if (rows.length === 0) return null;
    return String(rows[0].grant_id);
  }
  const store = await readPortalFileStore();
  const now = Date.now();
  const t = store.tokens.find(
    (x) =>
      x.tokenHash === tokenHash &&
      !x.consumedAt &&
      new Date(String(x.expiresAt)).getTime() > now,
  );
  if (!t) return null;
  t.consumedAt = new Date().toISOString();
  await writePortalFileStore(store);
  return String(t.grantId);
}

/**
 * @param {string} grantId
 * @returns {Promise<{ grantId: string; email: string; company: string; corporateLeadId: string } | null>}
 */
export async function getPortalSessionContext(grantId) {
  const sql = await getLeadDatabaseSql();
  if (sql) {
    await ensurePortalTables(sql);
    const rows = await sql`
      SELECT g.id AS grant_id, g.email, g.corporate_lead_id, l.company
      FROM corporate_portal_grants g
      INNER JOIN corporate_leads l ON l.id = g.corporate_lead_id
      WHERE g.id = ${grantId}::uuid AND g.revoked_at IS NULL
      LIMIT 1
    `;
    const r = rows[0];
    if (!r) return null;
    return {
      grantId: String(r.grant_id),
      email: r.email,
      company: r.company,
      corporateLeadId: String(r.corporate_lead_id),
    };
  }
  const store = await readPortalFileStore();
  const g = store.grants.find((x) => String(x.id) === grantId && !x.revokedAt);
  if (!g) return null;
  const lead = await getCorporateLeadById(String(g.corporateLeadId));
  if (!lead) return null;
  return {
    grantId: String(g.id),
    email: String(g.email),
    company: String(lead.company ?? ""),
    corporateLeadId: String(g.corporateLeadId),
  };
}

export function portalStorageMode() {
  return process.env.DATABASE_URL?.trim() ? "database" : "file";
}

/** @returns {Promise<Set<string>>} corporate lead ids with an active portal grant */
export async function getActivePortalGrantLeadIdSet() {
  const sql = await getLeadDatabaseSql();
  if (sql) {
    await ensurePortalTables(sql);
    const rows = await sql`
      SELECT corporate_lead_id
      FROM corporate_portal_grants
      WHERE revoked_at IS NULL
    `;
    return new Set(rows.map((r) => String(r.corporate_lead_id)));
  }
  const store = await readPortalFileStore();
  return new Set(
    store.grants.filter((g) => !g.revokedAt).map((g) => String(g.corporateLeadId)),
  );
}
