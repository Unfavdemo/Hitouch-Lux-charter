import { NextResponse } from "next/server";
import { insertEventLead } from "@/lib/lead-storage";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const b = body;
  if (!b.eventName?.trim() || !b.eventDate) {
    return NextResponse.json({ ok: false, message: "Event name and date are required." }, { status: 400 });
  }
  if (typeof b.guestCount !== "number" || b.guestCount < 1) {
    return NextResponse.json({ ok: false, message: "Guest count is required." }, { status: 400 });
  }
  if (!b.contactName?.trim() || !b.email?.includes("@") || !b.phone?.trim()) {
    return NextResponse.json({ ok: false, message: "Coordinator contact details are required." }, { status: 400 });
  }

  console.info("[events]", JSON.stringify(b, null, 2));

  try {
    await insertEventLead({
      eventName: b.eventName.trim(),
      eventDate: b.eventDate,
      guestCount: b.guestCount,
      venues: typeof b.venues === "string" ? b.venues.trim() : "",
      checkInAssistance: Boolean(b.checkInAssistance),
      logisticsNotes: typeof b.logisticsNotes === "string" ? b.logisticsNotes.trim() : "",
      contactName: b.contactName.trim(),
      email: b.email.trim(),
      phone: b.phone.trim(),
    });
  } catch (err) {
    console.error("[events] persist failed", err);
    return NextResponse.json(
      { ok: false, message: "We could not save your inquiry. Please call the concierge line." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, message: "Event coordination inquiry received." });
}
