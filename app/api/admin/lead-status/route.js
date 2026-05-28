import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { autoBookTripFromLead } from "@/lib/auto-book-from-lead";
import { getAdminAccess } from "@/lib/admin-session";
import { notifyLeadStatusChange } from "@/lib/lead-notify";
import { isLeadStatus } from "@/lib/lead-status";
import { updateLeadStatus } from "@/lib/lead-storage";
import { isPrismaConfigured } from "@/lib/prisma";

export async function POST(request) {
  const access = await getAdminAccess();
  if (!access) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
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

    if (status === "accepted" || status === "declined" || status === "pending") {
      void notifyLeadStatusChange(scope, id, status);
    }

    let tripBooked = null;
    if (status === "accepted" && isPrismaConfigured()) {
      const book = await autoBookTripFromLead(scope, id);
      if (book.created) {
        tripBooked = { tripId: book.tripId, created: true };
      } else if ("tripId" in book && book.tripId) {
        tripBooked = { tripId: book.tripId, created: false, alreadyExisted: book.alreadyExisted };
      } else if (book.skipped) {
        tripBooked = { skipped: true, reason: book.reason };
      }
    }

    return NextResponse.json({ ok: true, tripBooked });
  } catch (err) {
    console.error("[admin lead-status]", err);
    return NextResponse.json({ ok: false, message: "Update failed." }, { status: 500 });
  }
}
