import { NextResponse } from "next/server";
import { processDueFollowUps, sweepStaleInquiries } from "@/lib/booking/follow-up";

export async function GET(request: Request) {
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
