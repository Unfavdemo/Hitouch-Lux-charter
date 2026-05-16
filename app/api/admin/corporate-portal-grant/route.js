import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidAdminSession } from "@/lib/admin-auth";
import { insertPortalGrant } from "@/lib/corporate-portal-storage";

export async function POST(request) {
  const jar = await cookies();
  if (!isValidAdminSession(jar)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const corporateLeadId = typeof body.corporateLeadId === "string" ? body.corporateLeadId.trim() : "";
  if (!corporateLeadId) {
    return NextResponse.json({ ok: false, message: "Missing corporateLeadId." }, { status: 400 });
  }

  try {
    await insertPortalGrant(corporateLeadId);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Grant failed.";
    const pgCode =
      e && typeof e === "object" && "code" in e
        ? String(/** @type {{ code?: string }} */ (e).code)
        : "";
    const cause =
      e && typeof e === "object" && "cause" in e && e.cause && typeof e.cause === "object"
        ? /** @type {{ code?: string }} */ (e.cause)
        : null;
    const causeCode = cause?.code ? String(cause.code) : "";
    if (msg.includes("not found")) {
      return NextResponse.json({ ok: false, message: msg }, { status: 404 });
    }
    if (msg.includes("already granted") || pgCode === "23505" || causeCode === "23505") {
      return NextResponse.json({ ok: false, message: "Portal access is already active for this lead." }, { status: 409 });
    }
    console.error("[corporate-portal-grant]", e);
    return NextResponse.json({ ok: false, message: "Could not create portal grant." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Portal access granted." });
}
