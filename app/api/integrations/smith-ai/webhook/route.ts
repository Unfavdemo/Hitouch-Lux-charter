import type { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { logConciergeCallEvent } from "@/lib/integrations/concierge-call-log";
import {
  parseSmithAiPayload,
  verifySmithAiHmac,
  verifySmithAiWebhook,
} from "@/lib/integrations/smith-ai";
import { scheduleTouchback } from "@/lib/booking/follow-up";
import { prisma, isPrismaConfigured } from "@/lib/prisma";
import { InquiryStatus } from "@prisma/client";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const hmacHeader = request.headers.get("x-smith-ai-signature-hmac");

  const authorized =
    verifySmithAiWebhook(request) ||
    verifySmithAiHmac(rawBody, hmacHeader);

  if (!authorized) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON." }, { status: 400 });
  }

  const payload = parseSmithAiPayload(body);
  const eventType = String(payload.event ?? payload.type ?? "unknown");
  const inquiryId =
    typeof payload.inquiryId === "string" && payload.inquiryId.length > 0
      ? payload.inquiryId
      : null;

  await logConciergeCallEvent({
    inquiryId,
    eventType,
    payload: payload as Prisma.InputJsonValue,
  });

  const highIntent = /missed|abandon|incomplete|callback/i.test(eventType);
  if (highIntent && inquiryId && isPrismaConfigured()) {
    const inquiry = await prisma.bookingInquiry.findUnique({
      where: { id: inquiryId },
      select: { status: true },
    });
    if (inquiry && inquiry.status !== InquiryStatus.COMPLETED) {
      await scheduleTouchback(inquiryId);
    }
  }

  return NextResponse.json({ ok: true });
}
