import { NextResponse } from "next/server";
import { getAdminAccess } from "@/lib/admin-session";

export async function getAdminAccessOrNull() {
  return getAdminAccess();
}

export function adminUnauthorizedResponse() {
  return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
}
