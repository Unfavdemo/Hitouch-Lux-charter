import { NextResponse } from "next/server";
import { bookingErrorResponse } from "@/lib/booking/api-error";
import { abandonBookingInquiry } from "@/lib/booking/inquiry-service";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const result = await abandonBookingInquiry(id);
    return NextResponse.json({ ...result, ok: true });
  } catch (error) {
    return bookingErrorResponse(error);
  }
}
