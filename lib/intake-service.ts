import { PendingSubmissionStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function listPendingSubmissions(status?: PendingSubmissionStatus) {
  return prisma.pendingSubmission.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function updateSubmissionStatus(
  id: string,
  status: PendingSubmissionStatus,
  processedByUserId: string | null,
) {
  return prisma.pendingSubmission.update({
    where: { id },
    data: {
      status,
      processedAt: new Date(),
      processedByUserId,
    },
  });
}

export function parseIntakePayload(payload: Prisma.JsonValue): {
  name?: string;
  email?: string;
  companyName?: string;
  tripUpdateNotes?: string;
  transcription?: string;
} {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return {};
  const p = payload as Record<string, unknown>;
  return {
    name: typeof p.name === "string" ? p.name : undefined,
    email: typeof p.email === "string" ? p.email : undefined,
    companyName: typeof p.companyName === "string" ? p.companyName : undefined,
    tripUpdateNotes: typeof p.tripUpdateNotes === "string" ? p.tripUpdateNotes : undefined,
    transcription: typeof p.transcription === "string" ? p.transcription : undefined,
  };
}
