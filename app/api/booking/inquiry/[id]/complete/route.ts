import { NextResponse } from "next/server";
import { bookingErrorResponse } from "@/lib/booking/api-error";
import { completeBookingInquiry } from "@/lib/booking/inquiry-service";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    await completeBookingInquiry(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return bookingErrorResponse(error);
  }
}
