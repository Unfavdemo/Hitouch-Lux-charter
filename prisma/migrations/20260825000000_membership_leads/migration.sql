-- Membership applications (HiTouch Private Membership intake)
CREATE TABLE IF NOT EXISTS "membership_leads" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reviewed_at" TIMESTAMPTZ(6),
    "payload" JSONB NOT NULL,

    CONSTRAINT "membership_leads_pkey" PRIMARY KEY ("id")
);
