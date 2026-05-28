import type { Prisma } from "@prisma/client";
import { parseIntakePayload } from "@/lib/intake-service";
import type { CreateTripInput } from "@/lib/trip-service";

function defaultScheduledAt(hoursFromNow = 24): Date {
  const d = new Date();
  d.setHours(d.getHours() + hoursFromNow);
  d.setMinutes(0, 0, 0);
  return d;
}

function parseRouteFromNotes(notes: string): { pickup: string; dropoff: string } | null {
  const arrow = notes.match(/^(.+?)\s*(?:→|->| to )\s*(.+)$/i);
  if (!arrow) return null;
  return { pickup: arrow[1].trim(), dropoff: arrow[2].trim() };
}

/** Build a trip draft from a Smith intake payload for admin pre-fill / one-click create. */
export function intakePayloadToTripDraft(payload: Prisma.JsonValue): CreateTripInput & {
  passengerEmail?: string | null;
} {
  const fields = parseIntakePayload(payload);
  const notes = fields.tripUpdateNotes ?? fields.transcription ?? null;

  let pickupLabel = "Philadelphia — pickup TBD";
  let dropoffLabel = "Destination TBD";
  if (notes) {
    const route = parseRouteFromNotes(notes);
    if (route) {
      pickupLabel = route.pickup;
      dropoffLabel = route.dropoff;
    } else if (/PHL|airport/i.test(notes)) {
      pickupLabel = "PHL Airport";
      dropoffLabel = "Center City Philadelphia";
    }
  }

  const p =
    payload && typeof payload === "object" && !Array.isArray(payload)
      ? (payload as Record<string, unknown>)
      : {};
  const phone =
    typeof p.phone === "string" && p.phone.trim()
      ? p.phone.trim()
      : "+12155550000";

  return {
    scheduledAt: defaultScheduledAt(),
    pickupLabel,
    dropoffLabel,
    notes: notes
      ? `Smith intake: ${notes}`
      : fields.transcription
        ? `Smith intake transcription: ${fields.transcription.slice(0, 500)}`
        : "Created from Smith.ai intake queue",
    passenger: {
      name: fields.name ?? "Caller",
      phone,
      email: fields.email ?? null,
    },
    passengerEmail: fields.email ?? null,
  };
}
