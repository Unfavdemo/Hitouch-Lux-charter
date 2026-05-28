"use server";

import { InquiryStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getAdminAccess } from "@/lib/admin-session";
import { inquiryToTripDraft } from "@/lib/booking/inquiry-admin";
import { prisma } from "@/lib/prisma";
import { createTrip, findTripBySource } from "@/lib/trip-service";

async function guard() {
  const access = await getAdminAccess();
  if (!access) throw new Error("Unauthorized");
}

export async function convertInquiryToTripAction(inquiryId: string) {
  await guard();

  const inquiry = await prisma.bookingInquiry.findUnique({ where: { id: inquiryId } });
  if (!inquiry) return { ok: false, error: "Inquiry not found." };

  const existing = await findTripBySource("booking_inquiry", inquiryId);
  if (existing) {
    return { ok: true, tripId: existing.id, alreadyExisted: true };
  }

  const draft = inquiryToTripDraft(inquiry);
  if (!draft) {
    return {
      ok: false,
      error: "Inquiry has no trip details yet — guest must complete the trip step on /book.",
    };
  }

  const trip = await createTrip({
    ...draft,
    sourceScope: "booking_inquiry",
    sourceLeadId: inquiryId,
  });

  if (inquiry.status !== InquiryStatus.COMPLETED) {
    await prisma.bookingInquiry.update({
      where: { id: inquiryId },
      data: {
        status: InquiryStatus.COMPLETED,
        lastStep: "converted",
        completedAt: new Date(),
      },
    });
  }

  revalidatePath("/admin/booking-inquiries");
  revalidatePath("/admin/trips");
  revalidatePath("/admin");
  return { ok: true, tripId: trip.id, alreadyExisted: false };
}
