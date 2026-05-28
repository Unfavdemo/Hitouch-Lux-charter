import { NextResponse } from "next/server";
import { z } from "zod";
import { getChauffeurSessionOrNull, unauthorizedResponse } from "@/lib/require-chauffeur-api";
import { upsertTripLocation } from "@/lib/trip-location-service";

const bodySchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  accuracyMeters: z.number().min(0).optional().nullable(),
  heading: z.number().min(0).max(360).optional().nullable(),
  speedMps: z.number().min(0).optional().nullable(),
});

type RouteContext = { params: Promise<{ tripId: string }> };

export async function POST(request: Request, context: RouteContext) {
  const session = await getChauffeurSessionOrNull();
  if (!session) return unauthorizedResponse();

  const { tripId } = await context.params;
  if (!tripId?.trim()) {
    return NextResponse.json({ ok: false, message: "Missing trip id." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Invalid coordinates." }, { status: 400 });
  }

  const result = await upsertTripLocation(tripId, session.userId, parsed.data);
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.error }, { status: 403 });
  }

  return NextResponse.json({
    ok: true,
    updatedAt: result.location.updatedAt.toISOString(),
  });
}
