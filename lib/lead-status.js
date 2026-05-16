/** @typedef {"pending" | "accepted" | "declined"} LeadStatus */

export const LEAD_STATUSES = /** @type {const} */ (["pending", "accepted", "declined"]);

/**
 * @param {unknown} value
 * @returns {value is LeadStatus}
 */
export function isLeadStatus(value) {
  return typeof value === "string" && LEAD_STATUSES.includes(/** @type {LeadStatus} */ (value));
}

/** @param {unknown} value */
export function normalizeLeadStatus(value) {
  return isLeadStatus(value) ? value : "pending";
}
