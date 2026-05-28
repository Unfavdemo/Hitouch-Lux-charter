-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('CONTACT_CAPTURED', 'QUOTED', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "FollowUpStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE IF NOT EXISTS "booking_inquiries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "InquiryStatus" NOT NULL DEFAULT 'CONTACT_CAPTURED',
    "contact_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "last_step" TEXT NOT NULL DEFAULT 'contact',
    "trip_payload" JSONB,
    "quote_summary" JSONB,
    "quoted_at" TIMESTAMPTZ(6),
    "completed_at" TIMESTAMPTZ(6),
    "abandoned_at" TIMESTAMPTZ(6),

    CONSTRAINT "booking_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "inquiry_follow_ups" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "booking_inquiry_id" UUID NOT NULL,
    "scheduled_for" TIMESTAMPTZ(6) NOT NULL,
    "sent_at" TIMESTAMPTZ(6),
    "status" "FollowUpStatus" NOT NULL DEFAULT 'PENDING',
    "template_key" TEXT NOT NULL DEFAULT 'touchback_v1',
    "error_message" TEXT,

    CONSTRAINT "inquiry_follow_ups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "booking_inquiries_email_idx" ON "booking_inquiries"("email");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "booking_inquiries_status_updated_at_idx" ON "booking_inquiries"("status", "updated_at");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "inquiry_follow_ups_status_scheduled_for_idx" ON "inquiry_follow_ups"("status", "scheduled_for");

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "inquiry_follow_ups" ADD CONSTRAINT "inquiry_follow_ups_booking_inquiry_id_fkey" FOREIGN KEY ("booking_inquiry_id") REFERENCES "booking_inquiries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
