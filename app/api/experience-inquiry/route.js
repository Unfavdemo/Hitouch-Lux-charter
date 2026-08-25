import { NextResponse } from "next/server";
import { getExperienceBySlug } from "@/content/experiences";
import { insertExperienceLead } from "@/lib/lead-storage";

/**
 * Lightweight inquiry endpoint for individual experience landing pages
 * (/experiences/[slug]). Stores into the experience lead pipeline tagged
 * with the experience so the concierge desk knows what was requested.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const b = body;

  const experience = typeof b.experienceSlug === "string" ? getExperienceBySlug(b.experienceSlug) : null;
  if (!experience) {
    return NextResponse.json(
      { ok: false, message: "Unknown experience. Please refresh and try again." },
      { status: 400 },
    );
  }

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

  const payload = {
    inquiryType: "experience-landing-page",
    experienceSlug: experience.slug,
    experienceTitle: experience.title,
    firstName: String(b.firstName).trim(),
    lastName: String(b.lastName).trim(),
    email: String(b.email).trim(),
    phone: String(b.phone).trim(),
    /* Mapped into the shared experience-lead shape for the admin desk */
    serviceInterest: experience.title,
    pickupDate: typeof b.preferredDate === "string" ? b.preferredDate : "",
    guestCount: typeof b.guestCount === "string" ? b.guestCount : "",
    tripDetails: typeof b.details === "string" ? b.details.trim() : "",
  };

  console.info("[experience-inquiry]", JSON.stringify(payload, null, 2));

  try {
    await insertExperienceLead(payload);
  } catch (err) {
    console.error("[experience-inquiry] persist failed", err);
    return NextResponse.json(
      {
        ok: false,
        message: "We could not save your inquiry. Please call the concierge line.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. Your concierge will reach out within 24 hours to design the details of your experience.",
  });
}
