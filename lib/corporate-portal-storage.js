import { createHash, randomBytes, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getCorporateLeadById } from "@/lib/lead-storage";
import { isPrismaConfigured, prisma } from "@/lib/prisma";

const PORTAL_FILE = path.join(process.cwd(), "data", "corporate-portal.json");

/** @param {unknown} email */
export function normalizePortalEmail(email) {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

function useDatabase() {
  return isPrismaConfigured();
}

function sha256Hex(value) {
  return createHash("sha256").update(value, "utf8").digest("hex");
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

function mapGrantRow(r) {
  return {
    id: r.id,
    corporateLeadId: r.corporateLeadId,
    email: r.email,
    createdAt: r.createdAt.toISOString(),
    revokedAt: r.revokedAt ? r.revokedAt.toISOString() : null,
  };
}

/**
 * @param {string} corporateLeadId
 * @returns {Promise<{ id: string; corporateLeadId: string; email: string; createdAt: string; revokedAt: string | null } | null>}
 */
export async function getActivePortalGrantByCorporateLeadId(corporateLeadId) {
  if (useDatabase()) {
    const r = await prisma.corporatePortalGrant.findFirst({
      where: { corporateLeadId, revokedAt: null },
    });
    return r ? mapGrantRow(r) : null;
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

  if (useDatabase()) {
    const existing = await prisma.corporatePortalGrant.findFirst({
      where: { corporateLeadId, revokedAt: null },
    });
    if (existing) {
      throw new Error("Portal access already granted for this lead.");
    }
    const r = await prisma.corporatePortalGrant.create({
      data: { corporateLeadId, email },
    });
    return mapGrantRow(r);
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
  if (useDatabase()) {
    const result = await prisma.corporatePortalGrant.updateMany({
      where: { id: grantId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    return result.count > 0;
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

  if (useDatabase()) {
    const rows = await prisma.corporatePortalGrant.findMany({
      where: { revokedAt: null },
      select: { id: true, corporateLeadId: true, email: true },
    });
    const r = rows.find((g) => normalizePortalEmail(g.email) === norm);
    if (!r) return null;
    return { id: r.id, corporateLeadId: r.corporateLeadId, email: r.email };
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

  if (useDatabase()) {
    await prisma.corporatePortalMagicToken.create({
      data: { grantId, tokenHash, expiresAt },
    });
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

  if (useDatabase()) {
    const row = await prisma.corporatePortalMagicToken.findFirst({
      where: {
        tokenHash,
        consumedAt: null,
        expiresAt: { gt: new Date() },
      },
    });
    if (!row) return null;
    await prisma.corporatePortalMagicToken.update({
      where: { id: row.id },
      data: { consumedAt: new Date() },
    });
    return row.grantId;
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
  if (useDatabase()) {
    const g = await prisma.corporatePortalGrant.findFirst({
      where: { id: grantId, revokedAt: null },
      include: { corporateLead: { select: { company: true } } },
    });
    if (!g || !g.corporateLead) return null;
    return {
      grantId: g.id,
      email: g.email,
      company: g.corporateLead.company,
      corporateLeadId: g.corporateLeadId,
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
  return useDatabase() ? "database" : "file";
}

/** @returns {Promise<Set<string>>} corporate lead ids with an active portal grant */
export async function getActivePortalGrantLeadIdSet() {
  if (useDatabase()) {
    const rows = await prisma.corporatePortalGrant.findMany({
      where: { revokedAt: null },
      select: { corporateLeadId: true },
    });
    return new Set(rows.map((r) => String(r.corporateLeadId)));
  }
  const store = await readPortalFileStore();
  return new Set(
    store.grants.filter((g) => !g.revokedAt).map((g) => String(g.corporateLeadId)),
  );
}
