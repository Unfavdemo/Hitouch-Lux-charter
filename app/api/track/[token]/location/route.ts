import { NextResponse } from "next/server";
import {
  getTripLocationByTrackingToken,
  isLocationStale,
} from "@/lib/trip-location-service";
import { TripStatus } from "@/lib/trip-status";

type RouteContext = { params: Promise<{ token: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { token } = await context.params;
  const result = await getTripLocationByTrackingToken(token);

  if (!result.ok) {
    const status = result.error === "invalid_token" ? 404 : 404;
    return NextResponse.json({ ok: false, message: "Not found." }, { status });
  }

  const loc = result.location;
  const shareLive =
    result.trip.status !== TripStatus.COMPLETED &&
    result.trip.status !== TripStatus.CANCELLED;

  return NextResponse.json({
    ok: true,
    trip: result.trip,
    location: loc
      ? {
          latitude: loc.latitude,
          longitude: loc.longitude,
          accuracyMeters: loc.accuracyMeters,
          heading: loc.heading,
          speedMps: loc.speedMps,
          updatedAt: loc.updatedAt.toISOString(),
          stale: isLocationStale(loc.updatedAt),
        }
      : null,
    sharingExpected: shareLive,
  });
}
