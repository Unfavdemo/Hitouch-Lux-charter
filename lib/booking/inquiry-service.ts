import { InquiryStatus } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import { buildMockQuote } from "@/lib/booking/mock-pricing";
import type { ContactStepInput, TripStepInput } from "@/lib/booking/schemas";
import { scheduleTouchback } from "@/lib/booking/follow-up";
import { isPrismaConfigured, prisma } from "@/lib/prisma";

export class BookingServiceError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

function requireDb() {
  if (!isPrismaConfigured()) {
    throw new BookingServiceError(
      "Booking inquiries require DATABASE_URL. Configure Postgres to continue.",
      503,
    );
  }
}

export async function createBookingInquiry(input: ContactStepInput) {
  requireDb();
  const row = await prisma.bookingInquiry.create({
    data: {
      contactName: input.contactName,
      email: input.email.toLowerCase(),
      phone: input.phone,
      status: InquiryStatus.CONTACT_CAPTURED,
      lastStep: "contact",
    },
  });
  return { inquiryId: row.id };
}

export async function quoteBookingInquiry(inquiryId: string, trip: TripStepInput) {
  requireDb();
  const existing = await prisma.bookingInquiry.findUnique({ where: { id: inquiryId } });
  if (!existing) {
    throw new BookingServiceError("Inquiry not found.", 404);
  }
  if (existing.status === InquiryStatus.COMPLETED || existing.status === InquiryStatus.ABANDONED) {
    throw new BookingServiceError("This inquiry can no longer be updated.", 409);
  }

  const quoteSummary = buildMockQuote(trip);
  const tripPayload = trip as unknown as Prisma.InputJsonValue;

  const updated = await prisma.bookingInquiry.update({
    where: { id: inquiryId },
    data: {
      tripPayload,
      quoteSummary: quoteSummary as unknown as Prisma.InputJsonValue,
      status: InquiryStatus.QUOTED,
      lastStep: "quote",
      quotedAt: new Date(),
    },
  });

  return { inquiry: updated, quoteSummary };
}

export async function completeBookingInquiry(inquiryId: string) {
  requireDb();
  const existing = await prisma.bookingInquiry.findUnique({ where: { id: inquiryId } });
  if (!existing) {
    throw new BookingServiceError("Inquiry not found.", 404);
  }

  await prisma.bookingInquiry.update({
    where: { id: inquiryId },
    data: {
      status: InquiryStatus.COMPLETED,
      lastStep: "complete",
      completedAt: new Date(),
    },
  });

  await prisma.inquiryFollowUp.updateMany({
    where: {
      bookingInquiryId: inquiryId,
      status: "PENDING",
    },
    data: { status: "CANCELLED" },
  });

  return { ok: true };
}

export async function abandonBookingInquiry(inquiryId: string) {
  requireDb();
  const existing = await prisma.bookingInquiry.findUnique({ where: { id: inquiryId } });
  if (!existing) {
    throw new BookingServiceError("Inquiry not found.", 404);
  }
  if (existing.status === InquiryStatus.COMPLETED) {
    return { ok: true, skipped: true };
  }

  await prisma.bookingInquiry.update({
    where: { id: inquiryId },
    data: {
      status: InquiryStatus.ABANDONED,
      lastStep: "abandoned",
      abandonedAt: new Date(),
    },
  });

  await scheduleTouchback(inquiryId);

  return { ok: true };
}

export async function getBookingInquiry(inquiryId: string) {
  requireDb();
  return prisma.bookingInquiry.findUnique({
    where: { id: inquiryId },
    select: {
      id: true,
      status: true,
      contactName: true,
      email: true,
      phone: true,
      lastStep: true,
      quoteSummary: true,
      tripPayload: true,
    },
  });
}
