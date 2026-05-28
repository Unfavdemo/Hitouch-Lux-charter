import type { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { verifySmithAiHmac, verifySmithAiWebhook } from "@/lib/integrations/smith-ai";
import { isPrismaConfigured, prisma } from "@/lib/prisma";

const smithIntakeSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().optional(),
    companyName: z.string().optional(),
    tripUpdateNotes: z.string().optional(),
    transcription: z.string().optional(),
  })
  .passthrough();

export async function POST(request: Request) {
  const rawBody = await request.text();
  const hmacHeader = request.headers.get("x-smith-ai-signature-hmac");

  const authorized =
    verifySmithAiWebhook(request) ||
    verifySmithAiHmac(rawBody, hmacHeader);

  if (!authorized) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  if (!isPrismaConfigured()) {
    return NextResponse.json({ ok: false, message: "Database unavailable." }, { status: 503 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON." }, { status: 400 });
  }

  const fields = smithIntakeSchema.safeParse(parsed);
  const normalized = fields.success ? fields.data : {};

  try {
    const payload: Prisma.InputJsonValue = {
      name: normalized.name ?? null,
      email: normalized.email ?? null,
      companyName: normalized.companyName ?? null,
      tripUpdateNotes: normalized.tripUpdateNotes ?? null,
      transcription: normalized.transcription ?? null,
      receivedAt: new Date().toISOString(),
      raw: parsed as Prisma.InputJsonValue,
    };

    await prisma.pendingSubmission.create({
      data: {
        source: "smith_intake",
        payload,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[smith-intake]", err);
    return NextResponse.json({ ok: false, message: "Could not store submission." }, { status: 500 });
  }
}
