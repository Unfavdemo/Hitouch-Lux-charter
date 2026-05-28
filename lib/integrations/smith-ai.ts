import { createHmac, timingSafeEqual } from "node:crypto";
import { isSmithWebhookDevAllowed } from "@/lib/demo-mode";

export function verifySmithAiWebhook(request: Request): boolean {
  if (isSmithWebhookDevAllowed(request)) return true;
  const secret = process.env.SMITH_AI_WEBHOOK_SECRET?.trim();
  if (!secret) return false;

  const signature = request.headers.get("x-smith-ai-signature")?.trim();
  if (signature) {
    return signature === secret;
  }

  const auth = request.headers.get("authorization")?.trim();
  if (auth === `Bearer ${secret}`) return true;

  const headerSecret = request.headers.get("x-webhook-secret")?.trim();
  return Boolean(headerSecret && timingSafeEqualString(headerSecret, secret));
}

/** Optional HMAC body verification when Smith.ai sends hex digest of raw body. */
export function verifySmithAiHmac(rawBody: string, signatureHeader: string | null): boolean {
  const secret = process.env.SMITH_AI_WEBHOOK_SECRET?.trim();
  if (!secret || !signatureHeader) return false;
  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  return timingSafeEqualString(expected, signatureHeader.replace(/^sha256=/, ""));
}

function timingSafeEqualString(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export type SmithAiWebhookPayload = {
  event?: string;
  type?: string;
  inquiryId?: string;
  email?: string;
  phone?: string;
  [key: string]: unknown;
};

export function parseSmithAiPayload(body: unknown): SmithAiWebhookPayload {
  if (body && typeof body === "object" && !Array.isArray(body)) {
    return body as SmithAiWebhookPayload;
  }
  return {};
}
