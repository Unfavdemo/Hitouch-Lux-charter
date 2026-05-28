import { InquiryStatus, type Prisma } from "@prisma/client";
import type { TripStepInput } from "@/lib/booking/schemas";
import { prisma } from "@/lib/prisma";
import type { CreateTripInput } from "@/lib/trip-service";

function combineDateAndTime(datePart: string, timePart: string): Date {
  const d = new Date(`${datePart}T${timePart}`);
  if (!Number.isNaN(d.getTime())) return d;
  const fallback = new Date(datePart);
  fallback.setHours(12, 0, 0, 0);
  return fallback;
}

export async function listBookingInquiriesForAdmin(limit = 50) {
  return prisma.bookingInquiry.findMany({
    orderBy: { updatedAt: "desc" },
    take: limit,
  });
}

export async function countOpenBookingInquiries() {
  return prisma.bookingInquiry.count({
    where: {
      status: {
        in: [InquiryStatus.CONTACT_CAPTURED, InquiryStatus.QUOTED, InquiryStatus.ABANDONED],
      },
    },
  });
}

export function inquiryToTripDraft(inquiry: {
  contactName: string;
  email: string;
  phone: string;
  tripPayload: Prisma.JsonValue;
  quoteSummary: Prisma.JsonValue;
}): CreateTripInput | null {
  if (!inquiry.tripPayload || typeof inquiry.tripPayload !== "object" || Array.isArray(inquiry.tripPayload)) {
    return null;
  }
  const trip = inquiry.tripPayload as TripStepInput;
  if (!trip.pickupDate || !trip.pickupAddress || !trip.destinationAddress) return null;

  const scheduledAt = combineDateAndTime(trip.pickupDate, trip.pickupTime || "12:00");
  const quote =
    inquiry.quoteSummary && typeof inquiry.quoteSummary === "object" && !Array.isArray(inquiry.quoteSummary)
      ? (inquiry.quoteSummary as Record<string, unknown>)
      : null;

  return {
    scheduledAt,
    pickupLabel: trip.pickupAddress,
    dropoffLabel: trip.destinationAddress,
    notes: [
      "Converted from /book inquiry.",
      trip.vehicleClass ? `Vehicle: ${trip.vehicleClass}` : null,
      trip.passengers ? `Passengers: ${trip.passengers}` : null,
      trip.notes ? `Notes: ${trip.notes}` : null,
      quote?.totalDisplay ? `Quote: ${String(quote.totalDisplay)}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
    passenger: {
      name: inquiry.contactName,
      phone: inquiry.phone,
      email: inquiry.email,
    },
  };
}
