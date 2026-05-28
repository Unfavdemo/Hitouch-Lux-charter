import { NextResponse } from "next/server";
import { consumeMagicLinkToken } from "@/lib/corporate-portal-storage";
import {
  CORPORATE_PORTAL_SESSION_COOKIE,
  corporatePortalAuthConfigured,
  corporatePortalSessionCookieOptions,
  createCorporatePortalSessionToken,
} from "@/lib/corporate-portal-auth";

export async function GET(request) {
  const login = new URL("/login", request.url);
  login.searchParams.set("mode", "corporate");
  const dash = new URL("/portal/corporate", request.url);

  if (!corporatePortalAuthConfigured()) {
    login.searchParams.set("corp_err", "portal_config");
    return NextResponse.redirect(login);
  }

  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token?.trim()) {
    login.searchParams.set("corp_err", "missing_token");
    return NextResponse.redirect(login);
  }

  const grantId = await consumeMagicLinkToken(token.trim());
  if (!grantId) {
    login.searchParams.set("corp_err", "invalid_token");
    return NextResponse.redirect(login);
  }

  const sess = createCorporatePortalSessionToken(grantId);
  const res = NextResponse.redirect(dash);
  res.cookies.set(CORPORATE_PORTAL_SESSION_COOKIE, sess, corporatePortalSessionCookieOptions());
  return res;
}
