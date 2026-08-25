import { NextResponse } from "next/server";
import { pushLeadToCrm } from "@/lib/crm";
import { insertMembershipApplication } from "@/lib/lead-storage";
import { membershipTiers } from "@/content/memberships";
import { membershipNeedOptions, travelFrequencyOptions } from "@/content/membership-form";

const MAX_TEXT = 4000;

function clean(value, max = 300) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const validTypes = new Set(membershipTiers.map((t) => t.id));
const validFrequencies = new Set(travelFrequencyOptions.map((o) => o.value));
const validNeeds = new Set(membershipNeedOptions.map((o) => o.value));

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const membershipType = clean(body.membershipType, 40);
  if (!validTypes.has(membershipType)) {
    return NextResponse.json(
      { ok: false, message: "Please select a membership type." },
      { status: 400 },
    );
  }

  const contactName = clean(body.contactName, 160);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);

  if (!contactName) {
    return NextResponse.json({ ok: false, message: "Your name is required." }, { status: 400 });
  }
  if (!email.includes("@")) {
    return NextResponse.json({ ok: false, message: "A valid email is required." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ ok: false, message: "A phone number is required." }, { status: 400 });
  }

  const travelFrequency = clean(body.travelFrequency, 40);
  if (!validFrequencies.has(travelFrequency)) {
    return NextResponse.json(
      { ok: false, message: "Please tell us how often you travel." },
      { status: 400 },
    );
  }

  const primaryNeeds = Array.isArray(body.primaryNeeds)
    ? body.primaryNeeds.map((v) => clean(v, 60)).filter((v) => validNeeds.has(v))
    : [];
  if (primaryNeeds.length === 0) {
    return NextResponse.json(
      { ok: false, message: "Please select at least one thing you would use membership for." },
      { status: 400 },
    );
  }

  const row = {
    membershipType,
    foundingInterest: Boolean(body.foundingInterest),
    contactName,
    email,
    phone,
    company: clean(body.company, 200),
    city: clean(body.city, 120),
    travelFrequency,
    primaryNeeds,
    currentProvider: clean(body.currentProvider, 200),
    notes: clean(body.notes, MAX_TEXT),
  };

  let recordId = null;
  try {
    recordId = await insertMembershipApplication(row);
  } catch (err) {
    console.error("[membership] persist failed", err);
    return NextResponse.json(
      { ok: false, message: "We could not save your application. Please call the concierge line." },
      { status: 500 },
    );
  }

  // Lead is safely stored; CRM delivery must never block or fail the response.
  void pushLeadToCrm({
    event: "membership_application",
    recordId,
    subject: row.foundingInterest
      ? `Founding Membership — ${membershipType}`
      : `Private Membership — ${membershipType}`,
    sourcePath: "/memberships/apply",
    contact: { name: contactName, email, phone, company: row.company || null },
    fields: {
      membershipType,
      foundingInterest: row.foundingInterest,
      city: row.city,
      travelFrequency,
      primaryNeeds,
      currentProvider: row.currentProvider,
      notes: row.notes,
    },
  });

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. Membership applications are reviewed individually—we will call you within one business day.",
  });
}
