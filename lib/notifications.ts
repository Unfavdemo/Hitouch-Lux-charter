import { prisma } from "@/lib/prisma";
import { isDemoMode } from "@/lib/demo-mode";
import { getTripTrackingUrl } from "@/lib/trip-tracking";
import { TripStatus, type TripStatusValue } from "@/lib/trip-status";

function twilioConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID?.trim() &&
      process.env.TWILIO_AUTH_TOKEN?.trim() &&
      process.env.TWILIO_FROM_NUMBER?.trim(),
  );
}

function shouldMockNotify(): boolean {
  return isDemoMode() || process.env.NODE_ENV !== "production";
}

function logMock(channel: string, payload: Record<string, unknown>): void {
  if (shouldMockNotify()) {
    console.info(`[notifications:mock:${channel}]`, payload);
  }
}

function buildSmsBody(
  nextStatus: TripStatusValue,
  pickup: string,
  companyName: string | null,
  trackingUrl: string | null,
): string | null {
  const brand = "HiTouch Luxury Charter";
  const track = trackingUrl ? ` Track: ${trackingUrl}` : "";
  if (nextStatus === TripStatus.IN_ROUTE) {
    const who = companyName ? `${companyName} · ` : "";
    return `${brand}: Your chauffeur is en route. ${who}Pickup: ${pickup}.${track}`;
  }
  if (nextStatus === TripStatus.ARRIVED) {
    return `${brand}: Your chauffeur has arrived at ${pickup}. Please meet curbside when ready.${track}`;
  }
  return null;
}

async function sendSms(to: string, body: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID!.trim();
  const token = process.env.TWILIO_AUTH_TOKEN!.trim();
  const from = process.env.TWILIO_FROM_NUMBER!.trim();
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const form = new URLSearchParams({ To: to, From: from, Body: body });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Twilio error ${res.status}: ${text.slice(0, 200)}`);
  }
}

export async function triggerTripStatusUpdate(
  tripId: string,
  nextStatus: TripStatusValue,
): Promise<void> {
  try {
    if (nextStatus !== TripStatus.IN_ROUTE && nextStatus !== TripStatus.ARRIVED) {
      return;
    }

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        passengerTrips: { orderBy: [{ isPrimary: "desc" }, { name: "asc" }] },
        corporateCompany: { select: { name: true } },
      },
    });

    if (!trip) return;

    const passenger = trip.passengerTrips[0];
    if (!passenger?.phone) return;

    const trackingUrl = getTripTrackingUrl(tripId);
    const body = buildSmsBody(
      nextStatus,
      trip.pickupLabel,
      trip.corporateCompany?.name ?? null,
      trackingUrl,
    );
    if (!body) return;

    if (twilioConfigured()) {
      await sendSms(passenger.phone, body);
    } else {
      logMock("passenger-sms", {
        tripId,
        nextStatus,
        to: passenger.phone,
        body,
        trackingUrl,
      });
    }
  } catch (err) {
    console.error("[notifications] triggerTripStatusUpdate failed:", err);
  }
}

export async function notifyChauffeurAssigned(tripId: string): Promise<void> {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        chauffeur: { select: { id: true, name: true, email: true, phone: true } },
        passengerTrips: { take: 1, orderBy: { isPrimary: "desc" } },
      },
    });
    if (!trip?.chauffeur) return;

    const when = new Date(trip.scheduledAt).toLocaleString();
    const passenger = trip.passengerTrips[0];
    const body = [
      `New assignment: ${trip.pickupLabel} → ${trip.dropoffLabel}`,
      `When: ${when}`,
      passenger ? `Passenger: ${passenger.name} (${passenger.phone})` : null,
      `Driver dashboard: ${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/driver/dashboard`,
    ]
      .filter(Boolean)
      .join("\n");

    const to = trip.chauffeur.phone || trip.chauffeur.email;
    if (!to) return;

    if (twilioConfigured() && trip.chauffeur.phone) {
      await sendSms(trip.chauffeur.phone, body);
    } else {
      logMock("chauffeur-assign", {
        tripId,
        to,
        chauffeur: trip.chauffeur.name,
        body,
      });
    }
  } catch (err) {
    console.error("[notifications] notifyChauffeurAssigned failed:", err);
  }
}

export async function notifyLeadReviewed(
  email: string,
  leadType: string,
  status: "accepted" | "declined" | "pending",
): Promise<void> {
  const subject =
    status === "accepted"
      ? `Your ${leadType} request was approved`
      : status === "declined"
        ? `Update on your ${leadType} request`
        : `Your ${leadType} request is under review`;

  const body =
    status === "accepted"
      ? `Thank you — HiTouch has approved your ${leadType} inquiry. Our team will follow up with scheduling details.`
      : status === "declined"
        ? `Thank you for your interest. We are unable to proceed with this ${leadType} request at this time.`
        : `We are reviewing your ${leadType} request and will be in touch shortly.`;

  logMock("lead-email", { to: email, subject, body, status, leadType });
}
