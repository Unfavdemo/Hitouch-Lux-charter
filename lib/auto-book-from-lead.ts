import { createCorporateCompany, createTrip } from "@/lib/trip-service";
import { isPrismaConfigured, prisma } from "@/lib/prisma";

export type LeadScope = "corporate" | "events" | "experience";

export type AutoBookResult =
  | { created: true; tripId: string; alreadyExisted: false }
  | { created: false; tripId: string; alreadyExisted: true }
  | { created: false; skipped: true; reason: string };

function combineDateAndTime(datePart: string, timePart: string): Date {
  const d = new Date(`${datePart}T${timePart}`);
  if (!Number.isNaN(d.getTime())) return d;
  const fallback = new Date(datePart);
  fallback.setHours(12, 0, 0, 0);
  return fallback;
}

function defaultScheduledAt(daysFromNow = 2): Date {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(10, 0, 0, 0);
  return d;
}

function buildNotes(lines: (string | null | undefined)[]): string {
  return lines.filter(Boolean).join("\n");
}

async function findExistingTrip(scope: LeadScope, leadId: string) {
  return prisma.trip.findFirst({
    where: { sourceScope: scope, sourceLeadId: leadId },
    select: { id: true },
  });
}

async function createTripFromLead(
  scope: LeadScope,
  leadId: string,
  input: Parameters<typeof createTrip>[0],
) {
  const trip = await createTrip({
    ...input,
    sourceScope: scope,
    sourceLeadId: leadId,
  });
  return trip.id;
}

async function bookFromExperience(leadId: string): Promise<AutoBookResult> {
  const lead = await prisma.experienceLead.findUnique({ where: { id: leadId } });
  if (!lead) return { created: false, skipped: true, reason: "Lead not found." };

  const p =
    lead.payload && typeof lead.payload === "object" && !Array.isArray(lead.payload)
      ? (lead.payload as Record<string, unknown>)
      : {};

  const firstName = String(p.firstName ?? "").trim();
  const lastName = String(p.lastName ?? "").trim();
  const pickupDate = String(p.pickupDate ?? "");
  const pickupTime = String(p.pickupTime ?? "12:00");
  const pickupAddress = String(p.pickupAddress ?? "").trim();
  const destinationAddress = String(p.destinationAddress ?? "").trim();
  const phone = String(p.phone ?? "").trim();
  const email = typeof p.email === "string" ? p.email.trim() : null;

  if (!pickupAddress || !destinationAddress || !pickupDate || !phone) {
    return {
      created: false,
      skipped: true,
      reason: "Experience lead missing required trip fields.",
    };
  }

  const scheduledAt = combineDateAndTime(pickupDate, pickupTime);
  const tripId = await createTripFromLead("experience", leadId, {
    scheduledAt,
    pickupLabel: pickupAddress,
    dropoffLabel: destinationAddress,
    notes: buildNotes([
      "Auto-booked from approved experience request.",
      p.serviceInterest ? `Service: ${String(p.serviceInterest)}` : null,
      p.guestCount ? `Guests: ${String(p.guestCount)}` : null,
      p.tripDetails ? `Details: ${String(p.tripDetails)}` : null,
      p.driverWait ? `Driver wait: ${String(p.driverWait)}` : null,
    ]),
    passenger: {
      name: [firstName, lastName].filter(Boolean).join(" ") || "Guest",
      phone,
      email,
    },
  });

  return { created: true, tripId, alreadyExisted: false };
}

async function bookFromEvent(leadId: string): Promise<AutoBookResult> {
  const lead = await prisma.eventLead.findUnique({ where: { id: leadId } });
  if (!lead) return { created: false, skipped: true, reason: "Lead not found." };

  const eventDate =
    lead.eventDate instanceof Date
      ? lead.eventDate
      : new Date(String(lead.eventDate));
  const scheduledAt = new Date(eventDate);
  scheduledAt.setHours(14, 0, 0, 0);

  const venue = String(lead.venues ?? "").trim();
  const pickupLabel = venue || `Event: ${lead.eventName}`;
  const dropoffLabel = venue || "Per event logistics";

  const tripId = await createTripFromLead("events", leadId, {
    scheduledAt,
    pickupLabel,
    dropoffLabel,
    notes: buildNotes([
      "Auto-booked from approved event inquiry.",
      `Event: ${lead.eventName}`,
      `Guests: ${lead.guestCount}`,
      lead.checkInAssistance ? "Check-in assistance requested." : null,
      lead.logisticsNotes ? `Logistics: ${lead.logisticsNotes}` : null,
    ]),
    passenger: {
      name: lead.contactName,
      phone: lead.phone,
      email: lead.email,
    },
  });

  return { created: true, tripId, alreadyExisted: false };
}

async function bookFromCorporate(leadId: string): Promise<AutoBookResult> {
  const lead = await prisma.corporateLead.findUnique({ where: { id: leadId } });
  if (!lead) return { created: false, skipped: true, reason: "Lead not found." };

  let company = await prisma.corporateCompany.findFirst({
    where: { corporateLeadId: lead.id },
  });
  if (!company) {
    company = await createCorporateCompany(lead.company);
    await prisma.corporateCompany.update({
      where: { id: company.id },
      data: {
        contactEmail: lead.email,
        phone: lead.phone,
        corporateLeadId: lead.id,
      },
    });
  }

  const tripId = await createTripFromLead("corporate", leadId, {
    scheduledAt: defaultScheduledAt(3),
    pickupLabel: "To be confirmed — corporate onboarding",
    dropoffLabel: lead.company,
    corporateCompanyId: company.id,
    notes: buildNotes([
      "Auto-booked from approved corporate account request.",
      `Contact: ${lead.contactName}`,
      `Invoicing: ${lead.invoicing}`,
      lead.profileNotes ? `Notes: ${lead.profileNotes}` : null,
    ]),
    passenger: {
      name: lead.contactName,
      phone: lead.phone,
      email: lead.email,
    },
  });

  return { created: true, tripId, alreadyExisted: false };
}

/** Create a trip when a lead is accepted (idempotent per lead). */
export async function autoBookTripFromLead(
  scope: LeadScope,
  leadId: string,
): Promise<AutoBookResult> {
  if (!isPrismaConfigured()) {
    return { created: false, skipped: true, reason: "Database not configured." };
  }

  const existing = await findExistingTrip(scope, leadId);
  if (existing) {
    return { created: false, tripId: existing.id, alreadyExisted: true };
  }

  try {
    if (scope === "experience") return await bookFromExperience(leadId);
    if (scope === "events") return await bookFromEvent(leadId);
    if (scope === "corporate") return await bookFromCorporate(leadId);
    return { created: false, skipped: true, reason: "Invalid scope." };
  } catch (err) {
    console.error("[autoBookTripFromLead]", scope, leadId, err);
    return { created: false, skipped: true, reason: "Could not create trip." };
  }
}
