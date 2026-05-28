import type { Prisma } from "@prisma/client";
import { GlobalRole } from "@prisma/client";
import { notifyChauffeurAssigned } from "@/lib/notifications";
import { triggerTripStatusUpdate } from "@/lib/notifications";
import { prisma } from "@/lib/prisma";
import { getNextTripStatus, TripStatus, type TripStatusValue } from "@/lib/trip-status";

export type CreateTripInput = {
  scheduledAt: Date;
  pickupLabel: string;
  dropoffLabel: string;
  notes?: string | null;
  chauffeurId?: string | null;
  corporateCompanyId?: string | null;
  sourceScope?: string | null;
  sourceLeadId?: string | null;
  passenger: {
    name: string;
    phone: string;
    email?: string | null;
  };
};

export type UpdateTripInput = {
  scheduledAt?: Date;
  pickupLabel?: string;
  dropoffLabel?: string;
  notes?: string | null;
  chauffeurId?: string | null;
  corporateCompanyId?: string | null;
  passengerName?: string;
  passengerPhone?: string;
};

const TERMINAL_STATUSES: TripStatusValue[] = [TripStatus.COMPLETED, TripStatus.CANCELLED];

export async function listActiveTripsForChauffeur(chauffeurId: string) {
  return prisma.trip.findMany({
    where: {
      chauffeurId,
      status: { notIn: TERMINAL_STATUSES },
    },
    include: {
      passengerTrips: { orderBy: [{ isPrimary: "desc" }, { name: "asc" }] },
      corporateCompany: true,
    },
    orderBy: { scheduledAt: "asc" },
  });
}

export async function listTrips(filters?: {
  status?: TripStatusValue;
  chauffeurId?: string;
  includeTerminal?: boolean;
}) {
  const where: Prisma.TripWhereInput = {};
  if (filters?.status) {
    where.status = filters.status;
  } else if (!filters?.includeTerminal) {
    where.status = { notIn: TERMINAL_STATUSES };
  }
  if (filters?.chauffeurId) where.chauffeurId = filters.chauffeurId;

  return prisma.trip.findMany({
    where,
    include: {
      chauffeur: { select: { id: true, name: true, email: true } },
      corporateCompany: { select: { id: true, name: true } },
      passengerTrips: true,
    },
    orderBy: { scheduledAt: "desc" },
  });
}

export async function getTripForTracking(tripId: string) {
  return prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      chauffeur: { select: { name: true } },
      corporateCompany: { select: { name: true } },
      passengerTrips: { take: 1, orderBy: { isPrimary: "desc" } },
    },
  });
}

export async function createTrip(input: CreateTripInput) {
  const trip = await prisma.trip.create({
    data: {
      scheduledAt: input.scheduledAt,
      pickupLabel: input.pickupLabel,
      dropoffLabel: input.dropoffLabel,
      notes: input.notes ?? null,
      chauffeurId: input.chauffeurId ?? null,
      corporateCompanyId: input.corporateCompanyId ?? null,
      sourceScope: input.sourceScope ?? null,
      sourceLeadId: input.sourceLeadId ?? null,
      status: TripStatus.ASSIGNED,
      passengerTrips: {
        create: {
          name: input.passenger.name,
          phone: input.passenger.phone,
          email: input.passenger.email ?? null,
          isPrimary: true,
        },
      },
    },
    include: {
      chauffeur: { select: { id: true, name: true } },
      corporateCompany: true,
      passengerTrips: true,
    },
  });

  if (trip.chauffeurId) {
    void notifyChauffeurAssigned(trip.id);
  }

  return trip;
}

export async function updateTrip(tripId: string, input: UpdateTripInput) {
  const existing = await prisma.trip.findUnique({
    where: { id: tripId },
    include: { passengerTrips: { take: 1, orderBy: { isPrimary: "desc" } } },
  });
  if (!existing) throw new Error("Trip not found.");
  if (TERMINAL_STATUSES.includes(existing.status as TripStatusValue)) {
    throw new Error("Cannot edit a completed or cancelled trip.");
  }

  const prevChauffeur = existing.chauffeurId;

  const trip = await prisma.trip.update({
    where: { id: tripId },
    data: {
      ...(input.scheduledAt !== undefined ? { scheduledAt: input.scheduledAt } : {}),
      ...(input.pickupLabel !== undefined ? { pickupLabel: input.pickupLabel } : {}),
      ...(input.dropoffLabel !== undefined ? { dropoffLabel: input.dropoffLabel } : {}),
      ...(input.notes !== undefined ? { notes: input.notes } : {}),
      ...(input.chauffeurId !== undefined ? { chauffeurId: input.chauffeurId } : {}),
      ...(input.corporateCompanyId !== undefined
        ? { corporateCompanyId: input.corporateCompanyId }
        : {}),
    },
  });

  const passenger = existing.passengerTrips[0];
  if (passenger && (input.passengerName !== undefined || input.passengerPhone !== undefined)) {
    await prisma.passengerTrip.update({
      where: { id: passenger.id },
      data: {
        ...(input.passengerName !== undefined ? { name: input.passengerName } : {}),
        ...(input.passengerPhone !== undefined ? { phone: input.passengerPhone } : {}),
      },
    });
  }

  if (input.chauffeurId && input.chauffeurId !== prevChauffeur) {
    void notifyChauffeurAssigned(tripId);
  }

  return trip;
}

export async function cancelTrip(tripId: string) {
  const existing = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!existing) throw new Error("Trip not found.");
  if (existing.status === TripStatus.CANCELLED) return existing;
  if (existing.status === TripStatus.COMPLETED) {
    throw new Error("Cannot cancel a completed trip.");
  }

  return prisma.trip.update({
    where: { id: tripId },
    data: { status: TripStatus.CANCELLED },
  });
}

export async function assignChauffeur(tripId: string, chauffeurId: string | null) {
  if (chauffeurId) {
    const user = await prisma.user.findFirst({
      where: { id: chauffeurId, globalRole: GlobalRole.CHAUFFEUR },
    });
    if (!user) throw new Error("Invalid chauffeur.");
  }

  const existing = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!existing) throw new Error("Trip not found.");
  if (existing.status === TripStatus.CANCELLED) {
    throw new Error("Cannot assign a cancelled trip.");
  }

  const trip = await prisma.trip.update({
    where: { id: tripId },
    data: {
      chauffeurId,
      status:
        existing.status === TripStatus.COMPLETED ? TripStatus.COMPLETED : TripStatus.ASSIGNED,
    },
  });

  if (chauffeurId && chauffeurId !== existing.chauffeurId) {
    void notifyChauffeurAssigned(tripId);
  }

  return trip;
}

export async function advanceTripStatus(
  tripId: string,
  options?: { expectedChauffeurId?: string },
): Promise<{ ok: true; nextStatus: TripStatusValue } | { ok: false; error: string }> {
  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip) return { ok: false, error: "Trip not found." };
  if (trip.status === TripStatus.CANCELLED) {
    return { ok: false, error: "Trip was cancelled." };
  }
  if (options?.expectedChauffeurId && trip.chauffeurId !== options.expectedChauffeurId) {
    return { ok: false, error: "Not authorized for this trip." };
  }
  if (!trip.chauffeurId) {
    return { ok: false, error: "No chauffeur assigned." };
  }

  const next = getNextTripStatus(trip.status as TripStatusValue);
  if (!next) return { ok: false, error: "No further status transitions." };

  await prisma.trip.update({
    where: { id: tripId },
    data: { status: next },
  });

  void triggerTripStatusUpdate(tripId, next);

  return { ok: true, nextStatus: next };
}

export async function listChauffeurs() {
  return prisma.user.findMany({
    where: { globalRole: GlobalRole.CHAUFFEUR },
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true, phone: true },
  });
}

export async function listCorporateCompanies() {
  return prisma.corporateCompany.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

export async function createCorporateCompany(name: string) {
  return prisma.corporateCompany.create({ data: { name } });
}

export async function findTripBySource(scope: string, leadId: string) {
  return prisma.trip.findFirst({
    where: { sourceScope: scope, sourceLeadId: leadId },
    select: { id: true },
  });
}
