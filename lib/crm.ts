import { createHmac } from "node:crypto";

/**
 * Outbound CRM bridge.
 *
 * Marketing intake (experience inquiries, membership applications) is pushed to
 * whatever CRM the business runs via a single signed webhook, so switching
 * vendors is a configuration change rather than a code change.
 *
 * Configure with:
 *   CRM_WEBHOOK_URL     — endpoint that receives the JSON payload
 *   CRM_WEBHOOK_SECRET  — optional; adds an HMAC-SHA256 signature header
 *   CRM_WEBHOOK_TOKEN   — optional; sent as `Authorization: Bearer <token>`
 *
 * Delivery never blocks the visitor: the lead is already persisted before this
 * runs, and a failed push is logged for replay rather than surfaced as an error.
 */

export type CrmEvent = "experience_inquiry" | "membership_application";

export type CrmContact = {
  name: string;
  email: string;
  phone: string;
  company?: string | null;
};

export type CrmLead = {
  event: CrmEvent;
  /** Stable id of the persisted record, when the database is configured. */
  recordId?: string | null;
  contact: CrmContact;
  /** Human-readable label for the thing they asked about. */
  subject: string;
  sourcePath?: string | null;
  fields: Record<string, unknown>;
};

const TIMEOUT_MS = 8000;

export function isCrmConfigured(): boolean {
  return Boolean(process.env.CRM_WEBHOOK_URL?.trim());
}

/**
 * Push a lead to the configured CRM.
 *
 * Resolves to `true` only when the CRM accepted the payload. Never throws —
 * callers can safely `void` this.
 */
export async function pushLeadToCrm(lead: CrmLead): Promise<boolean> {
  const url = process.env.CRM_WEBHOOK_URL?.trim();
  if (!url) {
    // No CRM wired up yet; the lead still lives in the database and admin desk.
    console.info("[crm] skipped (CRM_WEBHOOK_URL unset)", lead.event, lead.subject);
    return false;
  }

  const body = JSON.stringify({
    event: lead.event,
    source: "hitouchluxurycharter.com",
    occurredAt: new Date().toISOString(),
    recordId: lead.recordId ?? null,
    subject: lead.subject,
    sourcePath: lead.sourcePath ?? null,
    contact: {
      name: lead.contact.name,
      email: lead.contact.email,
      phone: lead.contact.phone,
      company: lead.contact.company ?? null,
    },
    fields: lead.fields,
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "HiTouch-Site/1.0",
  };

  const token = process.env.CRM_WEBHOOK_TOKEN?.trim();
  if (token) headers.Authorization = `Bearer ${token}`;

  const secret = process.env.CRM_WEBHOOK_SECRET?.trim();
  if (secret) {
    headers["X-HiTouch-Signature"] = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error("[crm] rejected", lead.event, res.status, await safeText(res));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[crm] delivery failed", lead.event, err);
    return false;
  }
}

async function safeText(res: Response): Promise<string> {
  try {
    return (await res.text()).slice(0, 500);
  } catch {
    return "";
  }
}
