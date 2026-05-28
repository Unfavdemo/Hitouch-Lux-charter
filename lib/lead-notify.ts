import { notifyLeadReviewed } from "@/lib/notifications";
import { isPrismaConfigured, prisma } from "@/lib/prisma";
import type { LeadScope } from "@/lib/auto-book-from-lead";

export async function notifyLeadStatusChange(
  scope: LeadScope,
  leadId: string,
  status: "accepted" | "declined" | "pending",
): Promise<void> {
  if (!isPrismaConfigured()) return;

  let email: string | null = null;
  const label =
    scope === "corporate" ? "corporate account" : scope === "events" ? "event" : "experience";

  if (scope === "corporate") {
    const row = await prisma.corporateLead.findUnique({ where: { id: leadId }, select: { email: true } });
    email = row?.email ?? null;
  } else if (scope === "events") {
    const row = await prisma.eventLead.findUnique({ where: { id: leadId }, select: { email: true } });
    email = row?.email ?? null;
  } else {
    const row = await prisma.experienceLead.findUnique({ where: { id: leadId } });
    const p =
      row?.payload && typeof row.payload === "object" && !Array.isArray(row.payload)
        ? (row.payload as Record<string, unknown>)
        : {};
    email = typeof p.email === "string" ? p.email : null;
  }

  if (email) {
    await notifyLeadReviewed(email, label, status);
  }
}
