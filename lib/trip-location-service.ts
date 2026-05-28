import { TripStatus, type TripStatusValue } from "@/lib/trip-status";
import {
  findLocationByTripId,
  findLocationsByTripIds,
  upsertTripLocationRow,
  type StoredTripLocation,
  type TripLocationPayload,
} from "@/lib/trip-location-store";
import { prisma } from "@/lib/prisma";
import { verifyTripTrackingToken } from "@/lib/trip-tracking";

export type { TripLocationPayload };

const SHAREABLE_STATUSES: TripStatusValue[] = [
  TripStatus.ASSIGNED,
  TripStatus.IN_ROUTE,
  TripStatus.ARRIVED,
  TripStatus.PASSENGER_ONBOARD,
];

export function isLocationSharingStatus(status: TripStatusValue): boolean {
  return SHAREABLE_STATUSES.includes(status);
}

export async function upsertTripLocation(
  tripId: string,
  chauffeurId: string,
  data: TripLocationPayload,
) {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    select: { id: true, chauffeurId: true, status: true },
  });

  if (!trip) return { ok: false as const, error: "Trip not found." };
  if (trip.chauffeurId !== chauffeurId) {
    return { ok: false as const, error: "Not your trip." };
  }
  if (!isLocationSharingStatus(trip.status as TripStatusValue)) {
    return { ok: false as const, error: "Trip is not active for location sharing." };
  }

  const location = await upsertTripLocationRow(tripId, data);
  return { ok: true as const, location };
}

export async function getTripLocationForTrip(tripId: string): Promise<StoredTripLocation | null> {
  return findLocationByTripId(tripId);
}

export async function getTripLocationByTrackingToken(token: string) {
  const tripId = verifyTripTrackingToken(token);
  if (!tripId) return { ok: false as const, error: "invalid_token" as const };

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    select: {
      id: true,
      status: true,
      pickupLabel: true,
      dropoffLabel: true,
      chauffeur: { select: { name: true } },
    },
  });

  if (!trip) return { ok: false as const, error: "not_found" as const };

  const location = await findLocationByTripId(tripId);

  return {
    ok: true as const,
    trip: {
      id: trip.id,
      status: trip.status,
      pickupLabel: trip.pickupLabel,
      dropoffLabel: trip.dropoffLabel,
      chauffeurName: trip.chauffeur?.name ?? null,
    },
    location,
  };
}

/** Location older than this is shown as stale on the passenger map. */
export const LOCATION_STALE_MS = 2 * 60 * 1000;

export function isLocationStale(updatedAt: Date): boolean {
  return Date.now() - updatedAt.getTime() > LOCATION_STALE_MS;
}

export type DispatchMapTrip = {
  id: string;
  status: TripStatusValue;
  scheduledAt: string;
  pickupLabel: string;
  dropoffLabel: string;
  chauffeurName: string | null;
  passengerName: string | null;
  latitude: number | null;
  longitude: number | null;
  locationUpdatedAt: string | null;
  locationStale: boolean;
  trackPath: string;
};

/** All active trips (+ optional terminal) for the dispatch map. */
export async function listTripsForDispatchMap(options?: {
  includeTerminal?: boolean;
}): Promise<DispatchMapTrip[]> {
  const { getTripTrackingPath } = await import("@/lib/trip-tracking");

  const trips = await prisma.trip.findMany({
    where: options?.includeTerminal
      ? undefined
      : { status: { notIn: [TripStatus.COMPLETED, TripStatus.CANCELLED] } },
    include: {
      chauffeur: { select: { name: true } },
      passengerTrips: { take: 1, orderBy: [{ isPrimary: "desc" }, { name: "asc" }] },
    },
    orderBy: [{ scheduledAt: "asc" }],
  });

  const locMap = await findLocationsByTripIds(trips.map((t) => t.id));

  return trips.map((t) => {
    const loc = locMap.get(t.id);
    return {
      id: t.id,
      status: t.status as TripStatusValue,
      scheduledAt: t.scheduledAt.toISOString(),
      pickupLabel: t.pickupLabel,
      dropoffLabel: t.dropoffLabel,
      chauffeurName: t.chauffeur?.name ?? null,
      passengerName: t.passengerTrips[0]?.name ?? null,
      latitude: loc?.latitude ?? null,
      longitude: loc?.longitude ?? null,
      locationUpdatedAt: loc?.updatedAt.toISOString() ?? null,
      locationStale: loc ? isLocationStale(loc.updatedAt) : false,
      trackPath: getTripTrackingPath(t.id),
    };
  });
}
