import type { Prisma } from "@prisma/client";
import { isPrismaConfigured, prisma } from "@/lib/prisma";

export async function logConciergeCallEvent({
  source = "smith_ai",
  inquiryId,
  eventType,
  payload,
}: {
  source?: string;
  inquiryId?: string | null;
  eventType?: string | null;
  payload: Prisma.InputJsonValue;
}) {
  if (!isPrismaConfigured()) {
    console.info("[concierge-call-log]", { source, inquiryId, eventType, payload });
    return null;
  }

  return prisma.conciergeCallLog.create({
    data: {
      source,
      inquiryId: inquiryId ?? null,
      eventType: eventType ?? null,
      payload,
    },
  });
}
