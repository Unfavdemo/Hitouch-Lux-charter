import { NextResponse } from "next/server";
import { bookingErrorResponse } from "@/lib/booking/api-error";
import { createBookingInquiry } from "@/lib/booking/inquiry-service";
import { contactStepSchema } from "@/lib/booking/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = contactStepSchema.parse(body);
    const result = await createBookingInquiry(input);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return bookingErrorResponse(error);
  }
}
