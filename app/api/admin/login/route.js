import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminAuthConfigured,
  createSessionToken,
  sessionCookieOptions,
  verifyAdminPassword,
  verifyAdminUsername,
} from "@/lib/admin-auth";

export async function POST(request) {
  if (!adminAuthConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Admin sign-in is not configured on this server." },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!verifyAdminUsername(username) || !verifyAdminPassword(password)) {
    return NextResponse.json({ ok: false, message: "Invalid credentials." }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, sessionCookieOptions());
  return res;
}
