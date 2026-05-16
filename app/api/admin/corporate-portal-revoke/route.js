import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidAdminSession } from "@/lib/admin-auth";
import {
  getActivePortalGrantByCorporateLeadId,
  revokePortalGrant,
} from "@/lib/corporate-portal-storage";

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

  const grant = await getActivePortalGrantByCorporateLeadId(corporateLeadId);
  if (!grant) {
    return NextResponse.json({ ok: false, message: "No active portal grant for this lead." }, { status: 404 });
  }

  const ok = await revokePortalGrant(grant.id);
  if (!ok) {
    return NextResponse.json({ ok: false, message: "Could not revoke portal access." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Portal access revoked." });
}
