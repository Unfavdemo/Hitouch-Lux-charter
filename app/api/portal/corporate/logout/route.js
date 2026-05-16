import { NextResponse } from "next/server";
import { CORPORATE_PORTAL_SESSION_COOKIE } from "@/lib/corporate-portal-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(CORPORATE_PORTAL_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/portal/corporate",
    maxAge: 0,
  });
  return res;
}
