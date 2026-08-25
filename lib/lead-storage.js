import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { isPrismaConfigured, prisma } from "@/lib/prisma";
import { isLeadStatus, normalizeLeadStatus } from "@/lib/lead-status";

const FILE_STORE = path.join(process.cwd(), "data", "b2b-leads.json");

function isDatabaseStorage() {
  return isPrismaConfigured();
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
    await prisma.corporateLead.create({
      data: {
        company: row.company,
        contactName: row.contactName,
        email: row.email,
        phone: row.phone,
        invoicing: row.invoicing,
        profileNotes: row.profileNotes || null,
        status: "pending",
      },
    });
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
    await prisma.eventLead.create({
      data: {
        eventName: row.eventName,
        eventDate: new Date(row.eventDate),
        guestCount: row.guestCount,
        venues: row.venues || null,
        checkInAssistance: row.checkInAssistance,
        logisticsNotes: row.logisticsNotes || null,
        contactName: row.contactName,
        email: row.email,
        phone: row.phone,
        status: "pending",
      },
    });
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
 * @param {Record<string, unknown>} payload
 */
export async function insertExperienceLead(payload) {
  if (isDatabaseStorage()) {
    await prisma.experienceLead.create({
      data: {
        payload,
        status: "pending",
      },
    });
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

/**
 * Per-experience landing page inquiry.
 *
 * @param {{
 *   experienceSlug: string;
 *   experienceName: string;
 *   categoryName: string;
 *   sourcePath: string;
 *   contactName: string;
 *   email: string;
 *   phone: string;
 *   preferredDate: string;
 *   guestCount: number | null;
 *   details: string;
 *   conciergeAddOns: string[];
 * }} row
 * @returns {Promise<string | null>} Persisted record id when available.
 */
export async function insertExperienceInquiry(row) {
  if (isDatabaseStorage()) {
    const created = await prisma.experienceInquiry.create({
      data: {
        experienceSlug: row.experienceSlug,
        experienceName: row.experienceName,
        categoryName: row.categoryName,
        sourcePath: row.sourcePath || null,
        contactName: row.contactName,
        email: row.email,
        phone: row.phone,
        preferredDate: row.preferredDate || null,
        guestCount: row.guestCount ?? null,
        details: row.details || null,
        conciergeAddOns: row.conciergeAddOns ?? [],
        status: "pending",
      },
      select: { id: true },
    });
    return created.id;
  }
  const store = await readFileStore();
  const id = randomUUID();
  store.experienceInquiries.unshift({
    id,
    createdAt: new Date().toISOString(),
    status: "pending",
    reviewedAt: null,
    ...row,
  });
  await writeFileStore(store);
  return id;
}

/**
 * HiTouch Private Membership application.
 *
 * @param {{
 *   membershipType: string;
 *   foundingInterest: boolean;
 *   contactName: string;
 *   email: string;
 *   phone: string;
 *   company: string;
 *   city: string;
 *   travelFrequency: string;
 *   primaryNeeds: string[];
 *   currentProvider: string;
 *   notes: string;
 * }} row
 * @returns {Promise<string | null>} Persisted record id when available.
 */
export async function insertMembershipApplication(row) {
  if (isDatabaseStorage()) {
    const created = await prisma.membershipApplication.create({
      data: {
        membershipType: row.membershipType,
        foundingInterest: row.foundingInterest,
        contactName: row.contactName,
        email: row.email,
        phone: row.phone,
        company: row.company || null,
        city: row.city || null,
        travelFrequency: row.travelFrequency || null,
        primaryNeeds: row.primaryNeeds ?? [],
        currentProvider: row.currentProvider || null,
        notes: row.notes || null,
        status: "pending",
      },
      select: { id: true },
    });
    return created.id;
  }
  const store = await readFileStore();
  const id = randomUUID();
  store.memberships.unshift({
    id,
    createdAt: new Date().toISOString(),
    status: "pending",
    reviewedAt: null,
    ...row,
  });
  await writeFileStore(store);
  return id;
}

/** @returns {Promise<Array<Record<string, unknown>>>} */
export async function listExperienceInquiries() {
  if (isDatabaseStorage()) {
    const rows = await prisma.experienceInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => ({
      id: r.id,
      createdAt: r.createdAt,
      experienceSlug: r.experienceSlug,
      experienceName: r.experienceName,
      categoryName: r.categoryName,
      sourcePath: r.sourcePath ?? "",
      contactName: r.contactName,
      email: r.email,
      phone: r.phone,
      preferredDate: r.preferredDate ?? "",
      guestCount: r.guestCount ?? null,
      details: r.details ?? "",
      conciergeAddOns: Array.isArray(r.conciergeAddOns) ? r.conciergeAddOns : [],
      status: normalizeLeadStatus(r.status),
      reviewedAt: r.reviewedAt ?? null,
    }));
  }
  const store = await readFileStore();
  return store.experienceInquiries.map((r) => ({
    ...r,
    conciergeAddOns: Array.isArray(r.conciergeAddOns) ? r.conciergeAddOns : [],
    status: normalizeLeadStatus(r.status),
    reviewedAt: r.reviewedAt ?? null,
  }));
}

/** @returns {Promise<Array<Record<string, unknown>>>} */
export async function listMembershipApplications() {
  if (isDatabaseStorage()) {
    const rows = await prisma.membershipApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => ({
      id: r.id,
      createdAt: r.createdAt,
      membershipType: r.membershipType,
      foundingInterest: r.foundingInterest,
      contactName: r.contactName,
      email: r.email,
      phone: r.phone,
      company: r.company ?? "",
      city: r.city ?? "",
      travelFrequency: r.travelFrequency ?? "",
      primaryNeeds: Array.isArray(r.primaryNeeds) ? r.primaryNeeds : [],
      currentProvider: r.currentProvider ?? "",
      notes: r.notes ?? "",
      status: normalizeLeadStatus(r.status),
      reviewedAt: r.reviewedAt ?? null,
    }));
  }
  const store = await readFileStore();
  return store.memberships.map((r) => ({
    ...r,
    primaryNeeds: Array.isArray(r.primaryNeeds) ? r.primaryNeeds : [],
    status: normalizeLeadStatus(r.status),
    reviewedAt: r.reviewedAt ?? null,
  }));
}

/** @param {string} id */
export async function getCorporateLeadById(id) {
  if (!id || typeof id !== "string") return null;
  if (isDatabaseStorage()) {
    const r = await prisma.corporateLead.findUnique({ where: { id } });
    if (!r) return null;
    return {
      id: r.id,
      createdAt: r.createdAt,
      company: r.company,
      contactName: r.contactName,
      email: r.email,
      phone: r.phone,
      invoicing: r.invoicing,
      profileNotes: r.profileNotes ?? "",
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
    const rows = await prisma.corporateLead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => ({
      id: r.id,
      createdAt: r.createdAt,
      company: r.company,
      contactName: r.contactName,
      email: r.email,
      phone: r.phone,
      invoicing: r.invoicing,
      profileNotes: r.profileNotes ?? "",
      status: normalizeLeadStatus(r.status),
      reviewedAt: r.reviewedAt ?? null,
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
    const rows = await prisma.eventLead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => ({
      id: r.id,
      createdAt: r.createdAt,
      eventName: r.eventName,
      eventDate: r.eventDate,
      guestCount: r.guestCount,
      venues: r.venues ?? "",
      checkInAssistance: r.checkInAssistance,
      logisticsNotes: r.logisticsNotes ?? "",
      contactName: r.contactName,
      email: r.email,
      phone: r.phone,
      status: normalizeLeadStatus(r.status),
      reviewedAt: r.reviewedAt ?? null,
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
    createdAt: r.createdAt ?? r.created_at,
    status: normalizeLeadStatus(r.status),
    reviewedAt: r.reviewedAt ?? r.reviewed_at ?? null,
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
    const rows = await prisma.experienceLead.findMany({
      orderBy: { createdAt: "desc" },
    });
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

/** @type {Record<string, string>} File-store key for each lead scope. */
const SCOPE_STORE_KEYS = {
  corporate: "corporate",
  events: "events",
  experience: "experience",
  "experience-inquiry": "experienceInquiries",
  membership: "memberships",
};

/** @param {unknown} value */
export function isLeadScope(value) {
  return typeof value === "string" && Object.hasOwn(SCOPE_STORE_KEYS, value);
}

/**
 * @param {"corporate" | "events" | "experience" | "experience-inquiry" | "membership"} scope
 * @param {string} id
 * @param {import("@/lib/lead-status").LeadStatus} status
 */
export async function updateLeadStatus(scope, id, status) {
  if (!isLeadStatus(status)) {
    throw new Error("Invalid status.");
  }
  if (!isLeadScope(scope)) {
    throw new Error("Invalid scope.");
  }
  const reviewedAt = status === "pending" ? null : new Date();

  if (isDatabaseStorage()) {
    /** @type {Record<string, { updateMany: (args: unknown) => Promise<{ count: number }> }>} */
    const delegates = {
      corporate: prisma.corporateLead,
      events: prisma.eventLead,
      experience: prisma.experienceLead,
      "experience-inquiry": prisma.experienceInquiry,
      membership: prisma.membershipApplication,
    };
    const result = await delegates[scope].updateMany({
      where: { id },
      data: { status, reviewedAt },
    });
    return result.count > 0;
  }

  const store = await readFileStore();
  const list = store[SCOPE_STORE_KEYS[scope]];
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

async function readFileStore() {
  try {
    const raw = await readFile(FILE_STORE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      corporate: Array.isArray(parsed.corporate) ? parsed.corporate : [],
      events: Array.isArray(parsed.events) ? parsed.events : [],
      experience: Array.isArray(parsed.experience) ? parsed.experience : [],
      experienceInquiries: Array.isArray(parsed.experienceInquiries)
        ? parsed.experienceInquiries
        : [],
      memberships: Array.isArray(parsed.memberships) ? parsed.memberships : [],
    };
  } catch (e) {
    if (e && typeof e === "object" && "code" in e && e.code === "ENOENT") {
      return {
        corporate: [],
        events: [],
        experience: [],
        experienceInquiries: [],
        memberships: [],
      };
    }
    throw e;
  }
}

async function writeFileStore(data) {
  await mkdir(path.dirname(FILE_STORE), { recursive: true });
  await writeFile(FILE_STORE, JSON.stringify(data, null, 2), "utf8");
}
