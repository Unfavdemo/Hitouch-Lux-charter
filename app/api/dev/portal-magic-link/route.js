import { NextResponse } from "next/server";
import { isDevAuthHelperEnabled } from "@/lib/dev-auth-helper";
import {
  createMagicLinkToken,
  findActiveGrantByEmailForMagicLink,
  normalizePortalEmail,
} from "@/lib/corporate-portal-storage";

/**
 * Development only: mint a fresh magic link and redirect through verify so you
 * land on the corporate portal dashboard in one click (no email / console).
 *
 * Requires DEV_AUTH_HELPER=1 and NODE_ENV=development.
 *
 * @example GET /api/dev/portal-magic-link?email=demo-alpha@hitouch-portal.test
 */
export async function GET(request) {
  if (!isDevAuthHelperEnabled()) {
    return new NextResponse(null, { status: 404 });
  }

  const url = new URL(request.url);
  const raw = url.searchParams.get("email");
  const email = normalizePortalEmail(
    typeof raw === "string" && raw.trim() ? raw : "demo-alpha@hitouch-portal.test",
  );

  const grant = await findActiveGrantByEmailForMagicLink(email);
  if (!grant) {
    return NextResponse.json(
      {
        ok: false,
        message: `No active portal grant for "${email}". From the repo root run: npm run seed:corporate-demo`,
      },
      { status: 404 },
    );
  }

  let plainToken;
  try {
    const created = await createMagicLinkToken(grant.id);
    plainToken = created.plainToken;
  } catch (e) {
    console.error("[dev/portal-magic-link]", e);
    return NextResponse.json(
      { ok: false, message: "Could not create magic link token (check server logs)." },
      { status: 500 },
    );
  }

  const verify = new URL("/api/portal/corporate/verify", request.url);
  verify.searchParams.set("token", plainToken);
  return NextResponse.redirect(verify);
}
