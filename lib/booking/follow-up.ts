import { FollowUpStatus, InquiryStatus } from "@prisma/client";
import { touchbackEmail } from "@/content/emails/touchback-v1";
import { sendTransactionalEmail } from "@/lib/email";
import { isPrismaConfigured, prisma } from "@/lib/prisma";

const DEFAULT_DELAY_HOURS = 2;

function followUpDelayMs(): number {
  const hours = Number(process.env.INQUIRY_FOLLOW_UP_DELAY_HOURS ?? DEFAULT_DELAY_HOURS);
  if (!Number.isFinite(hours) || hours <= 0) return DEFAULT_DELAY_HOURS * 60 * 60 * 1000;
  return hours * 60 * 60 * 1000;
}

export async function scheduleTouchback(bookingInquiryId: string) {
  if (!isPrismaConfigured()) return null;

  const existing = await prisma.inquiryFollowUp.findFirst({
    where: {
      bookingInquiryId,
      status: { in: [FollowUpStatus.PENDING, FollowUpStatus.SENT] },
    },
  });
  if (existing) return existing;

  return prisma.inquiryFollowUp.create({
    data: {
      bookingInquiryId,
      scheduledFor: new Date(Date.now() + followUpDelayMs()),
      templateKey: "touchback_v1",
      status: FollowUpStatus.PENDING,
    },
  });
}

export async function processDueFollowUps() {
  if (!isPrismaConfigured()) {
    return { processed: 0, skipped: true };
  }

  const now = new Date();
  const due = await prisma.inquiryFollowUp.findMany({
    where: {
      status: FollowUpStatus.PENDING,
      scheduledFor: { lte: now },
    },
    include: {
      bookingInquiry: true,
    },
    take: 50,
  });

  let processed = 0;

  for (const row of due) {
    const inquiry = row.bookingInquiry;
    const { subject, html, text } = touchbackEmail({
      contactName: inquiry.contactName,
      inquiryId: inquiry.id,
    });

    const sent = await sendTransactionalEmail({
      to: inquiry.email,
      subject,
      html,
      text,
    });

    if (sent.ok) {
      await prisma.inquiryFollowUp.update({
        where: { id: row.id },
        data: {
          status: FollowUpStatus.SENT,
          sentAt: new Date(),
          errorMessage: null,
        },
      });
      processed += 1;
    } else {
      await prisma.inquiryFollowUp.update({
        where: { id: row.id },
        data: {
          status: FollowUpStatus.FAILED,
          errorMessage: sent.error ?? sent.skipped ? "Email not configured." : "Send failed.",
        },
      });
    }
  }

  return { processed, skipped: false };
}

export async function sweepStaleInquiries() {
  if (!isPrismaConfigured()) return { abandoned: 0 };

  const hours = Number(process.env.INQUIRY_ABANDON_AFTER_HOURS ?? 24);
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);

  const stale = await prisma.bookingInquiry.findMany({
    where: {
      status: { in: [InquiryStatus.CONTACT_CAPTURED, InquiryStatus.QUOTED] },
      updatedAt: { lt: cutoff },
      completedAt: null,
      abandonedAt: null,
    },
    select: { id: true },
    take: 100,
  });

  let abandoned = 0;
  for (const row of stale) {
    await prisma.bookingInquiry.update({
      where: { id: row.id },
      data: {
        status: InquiryStatus.ABANDONED,
        abandonedAt: new Date(),
        lastStep: "abandoned",
      },
    });
    await scheduleTouchback(row.id);
    abandoned += 1;
  }

  return { abandoned };
}
