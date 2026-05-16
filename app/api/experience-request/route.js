import { NextResponse } from "next/server";
import { insertExperienceLead } from "@/lib/lead-storage";

const serviceValues = new Set([
  "black_car_only",
  "sixers_only",
  "black_car_and_sixers",
  "black_car_and_curated",
  "wine_tour",
  "airport",
  "corporate_travel",
  "other",
]);

const driverWaitValues = new Set(["yes", "no", "maybe"]);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const b = body;

  if (!b.firstName?.trim() || !b.lastName?.trim()) {
    return NextResponse.json(
      { ok: false, message: "First and last name are required." },
      { status: 400 },
    );
  }
  if (!b.email?.trim() || !String(b.email).includes("@")) {
    return NextResponse.json({ ok: false, message: "A valid email is required." }, { status: 400 });
  }
  if (!b.phone?.trim()) {
    return NextResponse.json({ ok: false, message: "Phone number is required." }, { status: 400 });
  }

  const occasions = Array.isArray(b.occasions) ? b.occasions : [];
  if (occasions.length === 0) {
    return NextResponse.json(
      { ok: false, message: "Select at least one occasion (or “No Special Occasion”)." },
      { status: 400 },
    );
  }
  if (occasions.includes("Other") && !b.occasionOther?.trim()) {
    return NextResponse.json(
      { ok: false, message: "Please describe the occasion under “Other.”" },
      { status: 400 },
    );
  }

  if (!b.serviceInterest || !serviceValues.has(b.serviceInterest)) {
    return NextResponse.json(
      { ok: false, message: "Please select which service you are interested in." },
      { status: 400 },
    );
  }
  if (b.serviceInterest === "other" && !b.serviceOther?.trim()) {
    return NextResponse.json(
      { ok: false, message: "Please describe the service under “Other.”" },
      { status: 400 },
    );
  }

  if (!b.pickupDate || !b.pickupTime) {
    return NextResponse.json(
      { ok: false, message: "Pick-up date and time are required." },
      { status: 400 },
    );
  }
  if (!b.pickupAddress?.trim()) {
    return NextResponse.json({ ok: false, message: "Pick-up address is required." }, { status: 400 });
  }
  if (!b.destinationAddress?.trim()) {
    return NextResponse.json(
      { ok: false, message: "Destination address or venue name is required." },
      { status: 400 },
    );
  }
  if (!b.returnDate || !b.returnTime) {
    return NextResponse.json(
      { ok: false, message: "Drop-off/return date and time are required." },
      { status: 400 },
    );
  }

  if (!b.driverWait || !driverWaitValues.has(b.driverWait)) {
    return NextResponse.json(
      { ok: false, message: "Please indicate if the driver should wait between stops." },
      { status: 400 },
    );
  }

  if (!b.guestCount) {
    return NextResponse.json({ ok: false, message: "Number of guests is required." }, { status: 400 });
  }

  if (b.largeBagsCount == null || String(b.largeBagsCount).trim() === "") {
    return NextResponse.json(
      { ok: false, message: "Please enter how many bags (larger than a briefcase) you expect." },
      { status: 400 },
    );
  }

  const accommodations = Array.isArray(b.accommodations) ? b.accommodations : [];
  if (accommodations.length === 0) {
    return NextResponse.json(
      { ok: false, message: "Please select accommodation requests (or “No additional accommodations”)." },
      { status: 400 },
    );
  }
  if (accommodations.includes("none") && accommodations.length > 1) {
    return NextResponse.json(
      {
        ok: false,
        message: 'If you select "No additional accommodations", uncheck the other accommodation options.',
      },
      { status: 400 },
    );
  }

  if (!b.tripDetails?.trim()) {
    return NextResponse.json(
      { ok: false, message: "Please include other trip details we should know." },
      { status: 400 },
    );
  }

  console.info("[experience-request]", JSON.stringify(b, null, 2));

  try {
    await insertExperienceLead(b);
  } catch (err) {
    console.error("[experience-request] persist failed", err);
    return NextResponse.json(
      {
        ok: false,
        message: "We could not save your request. Please call the concierge line.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. Our team will contact you within 24–48 hours to finalize your experience details.",
  });
}
