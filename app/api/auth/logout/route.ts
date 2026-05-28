import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import { USER_SESSION_COOKIE, userSessionCookieOptions } from "@/lib/user-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const base = userSessionCookieOptions();
  const opts = { ...base, maxAge: 0 };
  res.cookies.set(ADMIN_SESSION_COOKIE, "", opts);
  res.cookies.set(USER_SESSION_COOKIE, "", opts);
  return res;
}
