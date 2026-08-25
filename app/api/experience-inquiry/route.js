import { NextResponse } from "next/server";
import { getExperienceBySlug } from "@/content/experiences";
import { pushLeadToCrm } from "@/lib/crm";
import { insertExperienceInquiry } from "@/lib/lead-storage";

const MAX_TEXT = 4000;

function clean(value, max = 300) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const experienceSlug = clean(body.experienceSlug, 120);
  const experience = getExperienceBySlug(experienceSlug);
  if (!experience) {
    return NextResponse.json(
      { ok: false, message: "Unknown experience." },
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

  const guestCountRaw = Number.parseInt(String(body.guestCount ?? ""), 10);
  const guestCount = Number.isFinite(guestCountRaw) && guestCountRaw > 0 ? guestCountRaw : null;

  const validAddOns = new Set(experience.conciergeAddOns ?? []);
  const conciergeAddOns = Array.isArray(body.conciergeAddOns)
    ? body.conciergeAddOns.map((v) => clean(v, 200)).filter((v) => validAddOns.has(v))
    : [];

  const row = {
    experienceSlug: experience.slug,
    experienceName: experience.title,
    categoryName: experience.categoryName,
    sourcePath: experience.href,
    contactName,
    email,
    phone,
    preferredDate: clean(body.preferredDate, 40),
    guestCount,
    details: clean(body.details, MAX_TEXT),
    conciergeAddOns,
  };

  let recordId = null;
  try {
    recordId = await insertExperienceInquiry(row);
  } catch (err) {
    console.error("[experience-inquiry] persist failed", err);
    return NextResponse.json(
      { ok: false, message: "We could not save your inquiry. Please call the concierge line." },
      { status: 500 },
    );
  }

  // Lead is safely stored; CRM delivery must never block or fail the response.
  void pushLeadToCrm({
    event: "experience_inquiry",
    recordId,
    subject: `${experience.categoryName} — ${experience.title}`,
    sourcePath: experience.href,
    contact: { name: contactName, email, phone },
    fields: {
      experienceSlug: experience.slug,
      experienceName: experience.title,
      categoryName: experience.categoryName,
      preferredDate: row.preferredDate,
      guestCount,
      details: row.details,
      conciergeAddOns,
    },
  });

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. A member of our team will reach out within one business day to plan the details.",
  });
}
