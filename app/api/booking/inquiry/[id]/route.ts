import { NextResponse } from "next/server";
import { bookingErrorResponse } from "@/lib/booking/api-error";
import { getBookingInquiry, quoteBookingInquiry } from "@/lib/booking/inquiry-service";
import { tripStepSchema } from "@/lib/booking/schemas";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const inquiry = await getBookingInquiry(id);
    if (!inquiry) {
      return NextResponse.json({ ok: false, message: "Inquiry not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, inquiry });
  } catch (error) {
    return bookingErrorResponse(error);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const trip = tripStepSchema.parse(body);
    const { quoteSummary } = await quoteBookingInquiry(id, trip);
    return NextResponse.json({ ok: true, inquiryId: id, quoteSummary });
  } catch (error) {
    return bookingErrorResponse(error);
  }
}
