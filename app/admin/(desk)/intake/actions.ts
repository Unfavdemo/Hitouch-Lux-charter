"use server";

import { PendingSubmissionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getAdminAccess, getAdminUserIdForAudit } from "@/lib/admin-session";
import { intakePayloadToTripDraft } from "@/lib/intake-to-trip";
import { updateSubmissionStatus } from "@/lib/intake-service";
import { prisma } from "@/lib/prisma";
import { createTrip, findTripBySource } from "@/lib/trip-service";

async function guard() {
  const access = await getAdminAccess();
  if (!access) throw new Error("Unauthorized");
}

export async function markSubmissionProcessed(id: string) {
  await guard();
  const userId = await getAdminUserIdForAudit();
  await updateSubmissionStatus(id, PendingSubmissionStatus.PROCESSED, userId);
  revalidatePath("/admin/intake");
  return { ok: true };
}

export async function dismissSubmission(id: string) {
  await guard();
  const userId = await getAdminUserIdForAudit();
  await updateSubmissionStatus(id, PendingSubmissionStatus.DISMISSED, userId);
  revalidatePath("/admin/intake");
  return { ok: true };
}

export async function createTripFromIntakeAction(
  submissionId: string,
  formData: FormData,
) {
  await guard();

  const row = await prisma.pendingSubmission.findUnique({ where: { id: submissionId } });
  if (!row) return { ok: false, error: "Submission not found." };

  const existing = await findTripBySource("smith_intake", submissionId);
  if (existing) {
    return { ok: true, tripId: existing.id, alreadyExisted: true };
  }

  const draft = intakePayloadToTripDraft(row.payload);
  const scheduledAtRaw = String(formData.get("scheduledAt") ?? "");
  const scheduledAt = scheduledAtRaw ? new Date(scheduledAtRaw) : draft.scheduledAt;
  const pickupLabel = String(formData.get("pickupLabel") ?? "").trim() || draft.pickupLabel;
  const dropoffLabel = String(formData.get("dropoffLabel") ?? "").trim() || draft.dropoffLabel;
  const passengerName = String(formData.get("passengerName") ?? "").trim() || draft.passenger.name;
  const passengerPhone = String(formData.get("passengerPhone") ?? "").trim() || draft.passenger.phone;
  const chauffeurId = String(formData.get("chauffeurId") ?? "").trim() || null;
  const notes = String(formData.get("notes") ?? "").trim() || draft.notes;

  if (Number.isNaN(scheduledAt.getTime())) {
    return { ok: false, error: "Invalid schedule." };
  }

  const trip = await createTrip({
    scheduledAt,
    pickupLabel,
    dropoffLabel,
    notes,
    chauffeurId,
    sourceScope: "smith_intake",
    sourceLeadId: submissionId,
    passenger: {
      name: passengerName,
      phone: passengerPhone,
      email: draft.passenger.email,
    },
  });

  const userId = await getAdminUserIdForAudit();
  await updateSubmissionStatus(submissionId, PendingSubmissionStatus.PROCESSED, userId);

  revalidatePath("/admin/intake");
  revalidatePath("/admin/trips");
  revalidatePath("/admin");
  return { ok: true, tripId: trip.id, alreadyExisted: false };
}

export async function getIntakeTripDraftAction(submissionId: string) {
  await guard();
  const row = await prisma.pendingSubmission.findUnique({ where: { id: submissionId } });
  if (!row) return { ok: false, error: "Not found." };
  const draft = intakePayloadToTripDraft(row.payload);
  const scheduledAt = draft.scheduledAt.toISOString().slice(0, 16);
  return {
    ok: true,
    draft: {
      scheduledAt,
      pickupLabel: draft.pickupLabel,
      dropoffLabel: draft.dropoffLabel,
      passengerName: draft.passenger.name,
      passengerPhone: draft.passenger.phone,
      notes: draft.notes ?? "",
    },
  };
}
