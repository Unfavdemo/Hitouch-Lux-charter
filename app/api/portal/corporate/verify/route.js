import { NextResponse } from "next/server";
import { consumeMagicLinkToken } from "@/lib/corporate-portal-storage";
import {
  CORPORATE_PORTAL_SESSION_COOKIE,
  corporatePortalAuthConfigured,
  corporatePortalSessionCookieOptions,
  createCorporatePortalSessionToken,
} from "@/lib/corporate-portal-auth";

export async function GET(request) {
  const dash = new URL("/portal/corporate", request.url);

  if (!corporatePortalAuthConfigured()) {
    dash.searchParams.set("corp_err", "portal_config");
    return NextResponse.redirect(dash);
  }

  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token?.trim()) {
    dash.searchParams.set("corp_err", "missing_token");
    return NextResponse.redirect(dash);
  }

  const grantId = await consumeMagicLinkToken(token.trim());
  if (!grantId) {
    dash.searchParams.set("corp_err", "invalid_token");
    return NextResponse.redirect(dash);
  }

  const sess = createCorporatePortalSessionToken(grantId);
  const res = NextResponse.redirect(dash);
  res.cookies.set(CORPORATE_PORTAL_SESSION_COOKIE, sess, corporatePortalSessionCookieOptions());
  return res;
}
