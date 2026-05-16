import { NextResponse } from "next/server";
import { sendTransactionalEmail } from "@/lib/email";
import {
  createMagicLinkToken,
  findActiveGrantByEmailForMagicLink,
  normalizePortalEmail,
} from "@/lib/corporate-portal-storage";
import { allowKeyedRequest } from "@/lib/portal-request-limit";

const GENERIC_OK =
  "If this email has portal access, you will receive a sign-in link shortly. Check spam folders.";

function clientIp(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function requestOrigin(request) {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (env) return env.replace(/\/$/, "");
  return new URL(request.url).origin;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Never true in production builds unless explicitly opted in (e.g. `next start` local QA). */
function allowDevMagicLinkInApiResponse() {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.CORPORATE_PORTAL_DEV_RETURN_LINK === "true"
  );
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const rawEmail = typeof body.email === "string" ? body.email : "";
  const email = normalizePortalEmail(rawEmail);
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, message: "Enter a valid email address." }, { status: 400 });
  }

  const ip = clientIp(request);
  const ipOk = allowKeyedRequest(`corp-portal-magic:ip:${ip}`, { max: 20, windowMs: 15 * 60 * 1000 });
  const emOk = allowKeyedRequest(`corp-portal-magic:em:${email}`, { max: 5, windowMs: 15 * 60 * 1000 });
  if (!ipOk || !emOk) {
    return NextResponse.json({ ok: true, message: GENERIC_OK });
  }

  const grant = await findActiveGrantByEmailForMagicLink(email);
  if (!grant) {
    return NextResponse.json({ ok: true, message: GENERIC_OK });
  }

  let plainToken;
  try {
    const created = await createMagicLinkToken(grant.id);
    plainToken = created.plainToken;
  } catch (err) {
    console.error("[corporate-portal] createMagicLinkToken failed", err);
    return NextResponse.json({ ok: true, message: GENERIC_OK });
  }

  const origin = requestOrigin(request);
  const verifyUrl = `${origin}/api/portal/corporate/verify?token=${encodeURIComponent(plainToken)}`;

  const sendResult = await sendTransactionalEmail({
    to: email,
    subject: "Your HiTouch corporate portal link",
    html: `<p>Hi,</p><p>Click the link below to open your <strong>HiTouch corporate client portal</strong>. This link expires in 30 minutes and works once.</p><p><a href="${escapeHtml(verifyUrl)}">Sign in to corporate portal</a></p><p>If you did not request this, you can ignore this email.</p>`,
    text: `Sign in to your HiTouch corporate portal (link expires in 30 minutes):\n${verifyUrl}\n`,
  });

  if (!sendResult.ok) {
    if (sendResult.skipped) {
      console.info("[corporate-portal] magic link (configure RESEND to email):", verifyUrl);
    } else {
      console.error("[corporate-portal] email send failed", sendResult.error);
    }
  }

  const emailSent = sendResult.ok;
  const exposeDevLink = !emailSent && allowDevMagicLinkInApiResponse();

  return NextResponse.json({
    ok: true,
    message: GENERIC_OK,
    ...(exposeDevLink ? { devMagicLinkUrl: verifyUrl } : {}),
  });
}
