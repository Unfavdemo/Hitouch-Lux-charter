import { GlobalRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { isPrismaConfigured } from "@/lib/prisma";
import { authenticateUser } from "@/lib/user-service";
import {
  createUserSessionToken,
  userAuthConfigured,
  userSessionCookieOptions,
  USER_SESSION_COOKIE,
} from "@/lib/user-auth";

/** Staff User ADMIN login (email + password). */
export async function POST(request: Request) {
  if (!isPrismaConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Database is not configured." },
      { status: 503 },
    );
  }
  if (!userAuthConfigured()) {
    return NextResponse.json(
      { ok: false, message: "User sign-in is not configured (USER_SESSION_SECRET)." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const email =
    body && typeof body === "object" && "email" in body && typeof body.email === "string"
      ? body.email
      : "";
  const password =
    body &&
    typeof body === "object" &&
    "password" in body &&
    typeof body.password === "string"
      ? body.password
      : "";

  const user = await authenticateUser(email, password, GlobalRole.ADMIN);
  if (!user) {
    return NextResponse.json({ ok: false, message: "Invalid credentials." }, { status: 401 });
  }

  const token = createUserSessionToken({ userId: user.id, role: GlobalRole.ADMIN });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(USER_SESSION_COOKIE, token, userSessionCookieOptions());
  return res;
}
