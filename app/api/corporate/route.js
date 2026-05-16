import { NextResponse } from "next/server";
import { insertCorporateLead } from "@/lib/lead-storage";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const b = body;
  if (!b.company?.trim() || !b.contactName?.trim()) {
    return NextResponse.json({ ok: false, message: "Company and contact are required." }, { status: 400 });
  }
  if (!b.email?.includes("@") || !b.phone?.trim()) {
    return NextResponse.json({ ok: false, message: "Valid email and phone are required." }, { status: 400 });
  }
  if (!b.invoicing) {
    return NextResponse.json({ ok: false, message: "Invoicing preference is required." }, { status: 400 });
  }

  console.info("[corporate]", JSON.stringify(b, null, 2));

  try {
    await insertCorporateLead({
      company: b.company.trim(),
      contactName: b.contactName.trim(),
      email: b.email.trim(),
      phone: b.phone.trim(),
      invoicing: b.invoicing,
      profileNotes: typeof b.profileNotes === "string" ? b.profileNotes.trim() : "",
    });
  } catch (err) {
    console.error("[corporate] persist failed", err);
    return NextResponse.json(
      { ok: false, message: "We could not save your request. Please call the concierge line." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, message: "Corporate onboarding received." });
}
