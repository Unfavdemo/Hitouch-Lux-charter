"use server";

import { revalidatePath } from "next/cache";
import { getAdminAccess } from "@/lib/admin-session";
import { type TripStatusValue, isTripStatusValue } from "@/lib/trip-status";
import {
  assignChauffeur,
  cancelTrip,
  createCorporateCompany,
  createTrip,
  updateTrip,
} from "@/lib/trip-service";
import { createUserWithRole } from "@/lib/user-service";
import { GlobalRole } from "@prisma/client";

async function guard() {
  const access = await getAdminAccess();
  if (!access) throw new Error("Unauthorized");
}

export async function createTripAction(formData: FormData) {
  await guard();

  const scheduledAtRaw = String(formData.get("scheduledAt") ?? "");
  const pickupLabel = String(formData.get("pickupLabel") ?? "").trim();
  const dropoffLabel = String(formData.get("dropoffLabel") ?? "").trim();
  const passengerName = String(formData.get("passengerName") ?? "").trim();
  const passengerPhone = String(formData.get("passengerPhone") ?? "").trim();
  const chauffeurId = String(formData.get("chauffeurId") ?? "").trim() || null;
  const corporateCompanyId = String(formData.get("corporateCompanyId") ?? "").trim() || null;
  const newCompanyName = String(formData.get("newCompanyName") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim() || null;

  const scheduledAt = new Date(scheduledAtRaw);
  if (Number.isNaN(scheduledAt.getTime())) {
    return { ok: false, error: "Invalid schedule date." };
  }
  if (!pickupLabel || !dropoffLabel || !passengerName || !passengerPhone) {
    return { ok: false, error: "Pickup, dropoff, and passenger details are required." };
  }

  let companyId = corporateCompanyId;
  if (newCompanyName) {
    const co = await createCorporateCompany(newCompanyName);
    companyId = co.id;
  }

  await createTrip({
    scheduledAt,
    pickupLabel,
    dropoffLabel,
    notes,
    chauffeurId,
    corporateCompanyId: companyId,
    passenger: { name: passengerName, phone: passengerPhone },
  });

  revalidatePath("/admin/trips");
  revalidatePath("/admin");
  return { ok: true };
}

export async function assignChauffeurAction(tripId: string, chauffeurId: string) {
  await guard();
  const id = chauffeurId.trim() || null;
  try {
    await assignChauffeur(tripId, id);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Assign failed." };
  }
  revalidatePath("/admin/trips");
  return { ok: true };
}

export async function updateTripAction(tripId: string, formData: FormData) {
  await guard();

  const scheduledAtRaw = String(formData.get("scheduledAt") ?? "");
  const pickupLabel = String(formData.get("pickupLabel") ?? "").trim();
  const dropoffLabel = String(formData.get("dropoffLabel") ?? "").trim();
  const passengerName = String(formData.get("passengerName") ?? "").trim();
  const passengerPhone = String(formData.get("passengerPhone") ?? "").trim();
  const chauffeurId = String(formData.get("chauffeurId") ?? "").trim() || null;
  const corporateCompanyId = String(formData.get("corporateCompanyId") ?? "").trim() || null;
  const notes = String(formData.get("notes") ?? "").trim();

  const scheduledAt = new Date(scheduledAtRaw);
  if (Number.isNaN(scheduledAt.getTime())) {
    return { ok: false, error: "Invalid schedule." };
  }

  try {
    await updateTrip(tripId, {
      scheduledAt,
      pickupLabel,
      dropoffLabel,
      notes: notes || null,
      chauffeurId,
      corporateCompanyId,
      passengerName: passengerName || undefined,
      passengerPhone: passengerPhone || undefined,
    });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Update failed." };
  }

  revalidatePath("/admin/trips");
  revalidatePath("/admin");
  return { ok: true };
}

export async function cancelTripAction(tripId: string) {
  await guard();
  try {
    await cancelTrip(tripId);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Cancel failed." };
  }
  revalidatePath("/admin/trips");
  revalidatePath("/admin");
  return { ok: true };
}

export async function createChauffeurAction(formData: FormData) {
  await guard();

  const email = String(formData.get("email") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const phone = String(formData.get("phone") ?? "").trim() || null;

  if (!email || !name || password.length < 8) {
    return { ok: false, error: "Email, name, and password (8+ chars) are required." };
  }

  try {
    await createUserWithRole({
      email,
      name,
      password,
      globalRole: GlobalRole.CHAUFFEUR,
      phone,
    });
    revalidatePath("/admin/chauffeurs");
    revalidatePath("/admin/trips");
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not create chauffeur (email may already exist)." };
  }
}

export async function setTripStatusAction(tripId: string, status: TripStatusValue) {
  await guard();
  if (!isTripStatusValue(status)) {
    return { ok: false, error: "Invalid status." };
  }
  const { prisma } = await import("@/lib/prisma");
  await prisma.trip.update({ where: { id: tripId }, data: { status } });
  revalidatePath("/admin/trips");
  return { ok: true };
}
