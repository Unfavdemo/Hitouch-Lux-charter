/**
 * Trip GPS persistence via SQL — works even when Prisma Client was not regenerated
 * after adding TripLocation (prisma.tripLocation may be undefined).
 */
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type TripLocationPayload = {
  latitude: number;
  longitude: number;
  accuracyMeters?: number | null;
  heading?: number | null;
  speedMps?: number | null;
};

export type StoredTripLocation = {
  tripId: string;
  latitude: number;
  longitude: number;
  accuracyMeters: number | null;
  heading: number | null;
  speedMps: number | null;
  updatedAt: Date;
};

type RawRow = {
  trip_id: string;
  latitude: number;
  longitude: number;
  accuracy_meters: number | null;
  heading: number | null;
  speed_mps: number | null;
  updated_at: Date;
};

function mapRow(row: RawRow): StoredTripLocation {
  return {
    tripId: row.trip_id,
    latitude: row.latitude,
    longitude: row.longitude,
    accuracyMeters: row.accuracy_meters,
    heading: row.heading,
    speedMps: row.speed_mps,
    updatedAt: row.updated_at,
  };
}

export async function findLocationByTripId(tripId: string): Promise<StoredTripLocation | null> {
  const rows = await prisma.$queryRaw<RawRow[]>`
    SELECT trip_id, latitude, longitude, accuracy_meters, heading, speed_mps, updated_at
    FROM trip_locations
    WHERE trip_id = ${tripId}::uuid
    LIMIT 1
  `;
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function findLocationsByTripIds(tripIds: string[]): Promise<Map<string, StoredTripLocation>> {
  const out = new Map<string, StoredTripLocation>();
  if (tripIds.length === 0) return out;

  const rows = await prisma.$queryRaw<RawRow[]>`
    SELECT trip_id, latitude, longitude, accuracy_meters, heading, speed_mps, updated_at
    FROM trip_locations
    WHERE trip_id IN (${Prisma.join(tripIds.map((id) => Prisma.sql`${id}::uuid`))})
  `;

  for (const row of rows) {
    out.set(row.trip_id, mapRow(row));
  }
  return out;
}

export async function upsertTripLocationRow(
  tripId: string,
  data: TripLocationPayload,
): Promise<StoredTripLocation> {
  const rows = await prisma.$queryRaw<RawRow[]>`
    INSERT INTO trip_locations (trip_id, latitude, longitude, accuracy_meters, heading, speed_mps)
    VALUES (
      ${tripId}::uuid,
      ${data.latitude},
      ${data.longitude},
      ${data.accuracyMeters ?? null},
      ${data.heading ?? null},
      ${data.speedMps ?? null}
    )
    ON CONFLICT (trip_id) DO UPDATE SET
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude,
      accuracy_meters = EXCLUDED.accuracy_meters,
      heading = EXCLUDED.heading,
      speed_mps = EXCLUDED.speed_mps,
      updated_at = NOW()
    RETURNING trip_id, latitude, longitude, accuracy_meters, heading, speed_mps, updated_at
  `;
  if (!rows[0]) throw new Error("Failed to save trip location.");
  return mapRow(rows[0]);
}
