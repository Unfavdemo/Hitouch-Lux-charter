import { notifyLeadReviewed } from "@/lib/notifications";
import { isPrismaConfigured, prisma } from "@/lib/prisma";
import type { LeadScope } from "@/lib/auto-book-from-lead";

const SCOPE_LABELS: Record<LeadScope, string> = {
  corporate: "corporate account",
  events: "event",
  experience: "experience",
  "experience-inquiry": "experience",
  membership: "membership",
};

async function lookupEmail(scope: LeadScope, leadId: string): Promise<string | null> {
  if (scope === "corporate") {
    const row = await prisma.corporateLead.findUnique({
      where: { id: leadId },
      select: { email: true },
    });
    return row?.email ?? null;
  }
  if (scope === "events") {
    const row = await prisma.eventLead.findUnique({
      where: { id: leadId },
      select: { email: true },
    });
    return row?.email ?? null;
  }
  if (scope === "experience-inquiry") {
    const row = await prisma.experienceInquiry.findUnique({
      where: { id: leadId },
      select: { email: true },
    });
    return row?.email ?? null;
  }
  if (scope === "membership") {
    const row = await prisma.membershipApplication.findUnique({
      where: { id: leadId },
      select: { email: true },
    });
    return row?.email ?? null;
  }

  // Legacy experience requests keep the contact details inside a JSON payload.
  const row = await prisma.experienceLead.findUnique({ where: { id: leadId } });
  const payload =
    row?.payload && typeof row.payload === "object" && !Array.isArray(row.payload)
      ? (row.payload as Record<string, unknown>)
      : {};
  return typeof payload.email === "string" ? payload.email : null;
}

export async function notifyLeadStatusChange(
  scope: LeadScope,
  leadId: string,
  status: "accepted" | "declined" | "pending",
): Promise<void> {
  if (!isPrismaConfigured()) return;

  const email = await lookupEmail(scope, leadId);
  if (email) {
    await notifyLeadReviewed(email, SCOPE_LABELS[scope] ?? "request", status);
  }
}
