import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidAdminSession } from "@/lib/admin-auth";
import { isLeadStatus } from "@/lib/lead-status";
import { updateLeadStatus } from "@/lib/lead-storage";

export async function POST(request) {
  const jar = await cookies();
  if (!isValidAdminSession(jar)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON." }, { status: 400 });
  }

  const scope = body.scope;
  const id = typeof body.id === "string" ? body.id.trim() : "";
  const status = body.status;

  if (scope !== "corporate" && scope !== "events" && scope !== "experience") {
    return NextResponse.json({ ok: false, message: "Invalid scope." }, { status: 400 });
  }
  if (!id || !isLeadStatus(status)) {
    return NextResponse.json({ ok: false, message: "Invalid id or status." }, { status: 400 });
  }

  try {
    const ok = await updateLeadStatus(scope, id, status);
    if (!ok) {
      return NextResponse.json({ ok: false, message: "Lead not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin lead-status]", err);
    return NextResponse.json({ ok: false, message: "Update failed." }, { status: 500 });
  }
}
