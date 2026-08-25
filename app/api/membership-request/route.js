import { NextResponse } from "next/server";
import { insertMembershipLead } from "@/lib/lead-storage";

const membershipTypes = new Set(["individual", "family", "organization"]);
const usageValues = new Set(["occasional", "weekly", "several-weekly", "daily"]);

/** HiTouch Private Membership application intake — feeds the membership lead pipeline (CRM). */
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
  if (!b.membershipType || !membershipTypes.has(b.membershipType)) {
    return NextResponse.json(
      { ok: false, message: "Please select a membership type." },
      { status: 400 },
    );
  }
  if (b.membershipType === "organization" && !b.organization?.trim()) {
    return NextResponse.json(
      { ok: false, message: "Please provide your organization name." },
      { status: 400 },
    );
  }
  if (!b.homeBase?.trim()) {
    return NextResponse.json(
      { ok: false, message: "Please tell us your home base (city or neighborhood)." },
      { status: 400 },
    );
  }
  if (!b.usageFrequency || !usageValues.has(b.usageFrequency)) {
    return NextResponse.json(
      { ok: false, message: "Please select your anticipated usage." },
      { status: 400 },
    );
  }

  const payload = {
    firstName: String(b.firstName).trim(),
    lastName: String(b.lastName).trim(),
    email: String(b.email).trim(),
    phone: String(b.phone).trim(),
    membershipType: String(b.membershipType),
    foundingInterest: b.foundingInterest === true,
    organization: typeof b.organization === "string" ? b.organization.trim() : "",
    homeBase: String(b.homeBase).trim(),
    usageFrequency: String(b.usageFrequency),
    primaryNeeds: Array.isArray(b.primaryNeeds) ? b.primaryNeeds.map(String) : [],
    notes: typeof b.notes === "string" ? b.notes.trim() : "",
  };

  console.info("[membership-request]", JSON.stringify(payload, null, 2));

  try {
    await insertMembershipLead(payload);
  } catch (err) {
    console.error("[membership-request] persist failed", err);
    return NextResponse.json(
      {
        ok: false,
        message: "We could not save your application. Please call the concierge line.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. Your application has been received—we review every application personally and respond within 48 hours.",
  });
}
