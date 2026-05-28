import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { BookingServiceError } from "@/lib/booking/inquiry-service";

export function bookingErrorResponse(error: unknown) {
  if (error instanceof ZodError) {
    const message = error.issues[0]?.message ?? "Invalid request.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
  if (error instanceof BookingServiceError) {
    return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
  }
  console.error("[booking]", error);
  return NextResponse.json({ ok: false, message: "Server error." }, { status: 500 });
}
