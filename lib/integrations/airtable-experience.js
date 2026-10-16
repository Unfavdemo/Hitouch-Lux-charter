/**
 * Airtable REST client for experience request / inquiry leads.
 * Field names must match the Experience Leads table (see .env.example).
 */

const API_BASE = "https://api.airtable.com/v0";

/** @returns {boolean} */
export function isAirtableExperienceConfigured() {
  return Boolean(
    process.env.AIRTABLE_PAT?.trim() &&
      process.env.AIRTABLE_BASE_ID?.trim() &&
      process.env.AIRTABLE_EXPERIENCE_TABLE?.trim(),
  );
}

function config() {
  const pat = process.env.AIRTABLE_PAT?.trim();
  const baseId = process.env.AIRTABLE_BASE_ID?.trim();
  const table = process.env.AIRTABLE_EXPERIENCE_TABLE?.trim();
  if (!pat || !baseId || !table) {
    throw new Error("Airtable experience leads are not configured.");
  }
  return { pat, baseId, table };
}

/**
 * @param {string} method
 * @param {string} pathSuffix
 * @param {Record<string, unknown> | null} [body]
 */
async function airtableFetch(method, pathSuffix, body = null) {
  const { pat, baseId, table } = config();
  const url = `${API_BASE}/${baseId}/${encodeURIComponent(table)}${pathSuffix}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${pat}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const msg =
      data && typeof data === "object" && "error" in data
        ? JSON.stringify(/** @type {{ error?: unknown }} */ (data).error)
        : text || res.statusText;
    throw new Error(`Airtable ${method} failed (${res.status}): ${msg}`);
  }
  return data;
}

/** @param {unknown} value */
function asText(value) {
  if (value == null) return "";
  if (Array.isArray(value)) return value.map(String).filter(Boolean).join(", ");
  return String(value);
}

/**
 * @param {Record<string, unknown>} payload
 * @returns {Record<string, unknown>}
 */
export function payloadToAirtableFields(payload) {
  const inquiryType =
    typeof payload.inquiryType === "string" && payload.inquiryType.trim()
      ? payload.inquiryType.trim()
      : "experience-request";

  /** @type {Record<string, unknown>} */
  const fields = {
    Status: "pending",
    "First Name": asText(payload.firstName).trim(),
    "Last Name": asText(payload.lastName).trim(),
    Email: asText(payload.email).trim(),
    Phone: asText(payload.phone).trim(),
    "Inquiry Type": inquiryType,
    "Experience Slug": asText(payload.experienceSlug).trim(),
    "Experience Title": asText(payload.experienceTitle).trim(),
    "Service Interest": asText(payload.serviceInterest).trim(),
    "Service Other": asText(payload.serviceOther).trim(),
    Occasions: asText(payload.occasions),
    "Occasion Other": asText(payload.occasionOther).trim(),
    "Pickup Date": asText(payload.pickupDate).trim(),
    "Pickup Time": asText(payload.pickupTime).trim(),
    "Pickup Address": asText(payload.pickupAddress).trim(),
    "Destination Address": asText(payload.destinationAddress).trim(),
    "Return Date": asText(payload.returnDate).trim(),
    "Return Time": asText(payload.returnTime).trim(),
    "Driver Wait": asText(payload.driverWait).trim(),
    "Guest Count": asText(payload.guestCount).trim(),
    "Large Bags Count": asText(payload.largeBagsCount).trim(),
    Accommodations: asText(payload.accommodations),
    "Trip Details": asText(payload.tripDetails).trim(),
    "Payload JSON": JSON.stringify(payload),
  };

  // Omit empty optional strings so Airtable doesn't reject blank single-selects, etc.
  for (const key of Object.keys(fields)) {
    if (key === "Status" || key === "Payload JSON") continue;
    if (fields[key] === "") delete fields[key];
  }

  return fields;
}

/**
 * @param {Record<string, unknown>} fields
 * @returns {Record<string, unknown>}
 */
function fieldsToPayload(fields) {
  const raw = fields["Payload JSON"];
  if (typeof raw === "string" && raw.trim()) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return /** @type {Record<string, unknown>} */ (parsed);
      }
    } catch {
      /* fall through to field reconstruction */
    }
  }

  const occasionsRaw = asText(fields.Occasions);
  const accommodationsRaw = asText(fields.Accommodations);

  return {
    inquiryType: asText(fields["Inquiry Type"]) || "experience-request",
    experienceSlug: asText(fields["Experience Slug"]),
    experienceTitle: asText(fields["Experience Title"]),
    firstName: asText(fields["First Name"]),
    lastName: asText(fields["Last Name"]),
    email: asText(fields.Email),
    phone: asText(fields.Phone),
    serviceInterest: asText(fields["Service Interest"]),
    serviceOther: asText(fields["Service Other"]),
    occasions: occasionsRaw
      ? occasionsRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    occasionOther: asText(fields["Occasion Other"]),
    pickupDate: asText(fields["Pickup Date"]),
    pickupTime: asText(fields["Pickup Time"]),
    pickupAddress: asText(fields["Pickup Address"]),
    destinationAddress: asText(fields["Destination Address"]),
    returnDate: asText(fields["Return Date"]),
    returnTime: asText(fields["Return Time"]),
    driverWait: asText(fields["Driver Wait"]),
    guestCount: asText(fields["Guest Count"]),
    largeBagsCount: asText(fields["Large Bags Count"]),
    accommodations: accommodationsRaw
      ? accommodationsRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    tripDetails: asText(fields["Trip Details"]),
  };
}

/**
 * @param {{ id: string; createdTime?: string; fields?: Record<string, unknown> }} record
 */
export function mapAirtableRecord(record) {
  const fields = record.fields && typeof record.fields === "object" ? record.fields : {};
  const payload = fieldsToPayload(fields);
  const reviewedAt = fields["Reviewed At"];
  return {
    id: record.id,
    createdAt: record.createdTime ?? null,
    status: typeof fields.Status === "string" ? fields.Status : "pending",
    reviewedAt: reviewedAt ? String(reviewedAt) : null,
    payload,
  };
}

/**
 * @param {Record<string, unknown>} payload
 * @returns {Promise<{ id: string; createdAt: string | null; status: string; reviewedAt: null; payload: Record<string, unknown> }>}
 */
export async function createExperienceRecord(payload) {
  const data = await airtableFetch("POST", "", {
    fields: payloadToAirtableFields(payload),
    typecast: true,
  });
  const mapped = mapAirtableRecord(
    /** @type {{ id: string; createdTime?: string; fields?: Record<string, unknown> }} */ (data),
  );
  return {
    id: mapped.id,
    createdAt: mapped.createdAt,
    status: mapped.status,
    reviewedAt: null,
    payload: mapped.payload,
  };
}

/**
 * @returns {Promise<Array<ReturnType<typeof mapAirtableRecord>>>}
 */
export async function listExperienceRecords() {
  /** @type {Array<ReturnType<typeof mapAirtableRecord>>} */
  const rows = [];
  let offset = "";
  do {
    const qs = new URLSearchParams({ pageSize: "100" });
    if (offset) qs.set("offset", offset);
    const data = await airtableFetch("GET", `?${qs.toString()}`);
    const records = Array.isArray(data?.records) ? data.records : [];
    for (const record of records) {
      rows.push(mapAirtableRecord(record));
    }
    offset = typeof data?.offset === "string" ? data.offset : "";
  } while (offset);

  rows.sort((a, b) => {
    const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
    const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
    return tb - ta;
  });
  return rows;
}

/**
 * @param {string} id
 */
export async function getExperienceRecord(id) {
  if (!id || typeof id !== "string") return null;
  try {
    const data = await airtableFetch("GET", `/${encodeURIComponent(id)}`);
    return mapAirtableRecord(
      /** @type {{ id: string; createdTime?: string; fields?: Record<string, unknown> }} */ (data),
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("(404)")) return null;
    throw err;
  }
}

/**
 * @param {string} id
 * @param {string} status
 * @param {Date | null} reviewedAt
 */
export async function updateExperienceStatus(id, status, reviewedAt) {
  /** @type {Record<string, unknown>} */
  const fields = { Status: status };
  if (reviewedAt) {
    fields["Reviewed At"] = reviewedAt.toISOString().slice(0, 10);
  } else {
    fields["Reviewed At"] = null;
  }

  try {
    await airtableFetch("PATCH", `/${encodeURIComponent(id)}`, {
      fields,
      typecast: true,
    });
    return true;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("(404)")) return false;
    throw err;
  }
}
