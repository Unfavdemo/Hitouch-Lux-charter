import {
  accommodationOptions,
  driverWaitOptions,
  guestCountOptions,
  serviceInterestOptions,
} from "@/content/experience-request";

/**
 * @param {{ value: string; label: string }[]} options
 * @param {unknown} value
 */
function labelFor(options, value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const hit = options.find((o) => o.value === raw);
  return hit ? hit.label : raw;
}

/**
 * Normalize experience form / inquiry payloads so Airtable columns show
 * human-readable values that match the on-site form labels.
 * @param {Record<string, unknown>} payload
 * @returns {Record<string, unknown>}
 */
export function normalizeExperienceLeadPayload(payload) {
  const source = payload && typeof payload === "object" ? payload : {};
  const inquiryType =
    typeof source.inquiryType === "string" && source.inquiryType.trim()
      ? source.inquiryType.trim()
      : "experience-request";

  const occasions = Array.isArray(source.occasions)
    ? source.occasions.map(String).filter(Boolean)
    : [];

  const accommodationsRaw = Array.isArray(source.accommodations)
    ? source.accommodations.map(String).filter(Boolean)
    : [];
  const accommodations = accommodationsRaw.map((v) => labelFor(accommodationOptions, v));

  const serviceInterestRaw = String(source.serviceInterest ?? "").trim();
  const serviceInterest =
    serviceInterestRaw === "other"
      ? "Other"
      : labelFor(serviceInterestOptions, serviceInterestRaw) || serviceInterestRaw;

  return {
    ...source,
    inquiryType,
    firstName: String(source.firstName ?? "").trim(),
    lastName: String(source.lastName ?? "").trim(),
    email: String(source.email ?? "").trim(),
    phone: String(source.phone ?? "").trim(),
    occasions,
    occasionOther: String(source.occasionOther ?? "").trim(),
    serviceInterest,
    serviceInterestCode: serviceInterestRaw || undefined,
    serviceOther: String(source.serviceOther ?? "").trim(),
    pickupDate: String(source.pickupDate ?? "").trim(),
    pickupTime: String(source.pickupTime ?? "").trim(),
    pickupAddress: String(source.pickupAddress ?? "").trim(),
    destinationAddress: String(source.destinationAddress ?? "").trim(),
    returnDate: String(source.returnDate ?? "").trim(),
    returnTime: String(source.returnTime ?? "").trim(),
    driverWait: labelFor(driverWaitOptions, source.driverWait) || String(source.driverWait ?? "").trim(),
    driverWaitCode: String(source.driverWait ?? "").trim() || undefined,
    guestCount: labelFor(guestCountOptions, source.guestCount) || String(source.guestCount ?? "").trim(),
    guestCountCode: String(source.guestCount ?? "").trim() || undefined,
    largeBagsCount: String(source.largeBagsCount ?? "").trim(),
    accommodations,
    accommodationCodes: accommodationsRaw.length ? accommodationsRaw : undefined,
    tripDetails: String(source.tripDetails ?? "").trim(),
    experienceSlug: String(source.experienceSlug ?? "").trim(),
    experienceTitle: String(source.experienceTitle ?? "").trim(),
  };
}
