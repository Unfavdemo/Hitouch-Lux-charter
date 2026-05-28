import { NextResponse } from "next/server";
import { processDueFollowUps, sweepStaleInquiries } from "@/lib/booking/follow-up";

/** Off by default — set ENABLE_BOOKING_CRON=1 + CRON_SECRET and restore vercel.json crons to enable. */
function cronEnabled(): boolean {
  return process.env.ENABLE_BOOKING_CRON === "1";
}

export async function GET(request: Request) {
  if (!cronEnabled()) {
    return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 });
  }

  const secret = process.env.CRON_SECRET?.trim();
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const abandoned = await sweepStaleInquiries();
  const followUps = await processDueFollowUps();

  return NextResponse.json({
    ok: true,
    abandoned,
    followUps,
  });
}
