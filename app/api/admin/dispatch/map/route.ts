import { NextResponse } from "next/server";
import { adminUnauthorizedResponse, getAdminAccessOrNull } from "@/lib/require-admin-api";
import { listTripsForDispatchMap } from "@/lib/trip-location-service";

export async function GET(request: Request) {
  const access = await getAdminAccessOrNull();
  if (!access) return adminUnauthorizedResponse();

  const { searchParams } = new URL(request.url);
  const includeTerminal = searchParams.get("all") === "1";

  try {
    const trips = await listTripsForDispatchMap({ includeTerminal });
    const withGps = trips.filter((t) => t.latitude != null && t.longitude != null).length;

    return NextResponse.json({
      ok: true,
      trips,
      summary: { total: trips.length, withGps },
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[admin dispatch map]", err);
    return NextResponse.json({ ok: false, message: "Could not load trips." }, { status: 500 });
  }
}
