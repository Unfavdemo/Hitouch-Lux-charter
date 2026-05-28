import { createHmac, timingSafeEqual } from "node:crypto";
import type { GlobalRole } from "@prisma/client";

export const USER_SESSION_COOKIE = "hitouch_user_sess";
const SESSION_MAX_MS = 7 * 24 * 60 * 60 * 1000;

export type UserSessionPayload = {
  userId: string;
  role: GlobalRole;
  exp: number;
};

function getSessionSecret(): string {
  return (
    process.env.USER_SESSION_SECRET?.trim() ||
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    ""
  );
}

export function userAuthConfigured(): boolean {
  return Boolean(getSessionSecret());
}

export function createUserSessionToken(payload: Omit<UserSessionPayload, "exp">): string {
  const secret = getSessionSecret();
  if (!secret) throw new Error("USER_SESSION_SECRET is not set.");
  const full: UserSessionPayload = { ...payload, exp: Date.now() + SESSION_MAX_MS };
  const payloadB64 = Buffer.from(JSON.stringify(full), "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(payloadB64).digest("base64url");
  return `${payloadB64}.${sig}`;
}

export function parseUserSessionToken(token: string): UserSessionPayload | null {
  const secret = getSessionSecret();
  if (!secret) return null;
  const dot = token.indexOf(".");
  if (dot < 1) return null;
  const payloadB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(payloadB64).digest("base64url");
  try {
    if (expected.length !== sig.length) return null;
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null;
  } catch {
    return null;
  }
  try {
    const parsed = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8"),
    ) as UserSessionPayload;
    if (
      typeof parsed.userId !== "string" ||
      (parsed.role !== "ADMIN" && parsed.role !== "CHAUFFEUR") ||
      typeof parsed.exp !== "number" ||
      parsed.exp <= Date.now()
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

type CookieJar = { get: (name: string) => { value?: string } | undefined };

export function getUserSessionFromCookies(jar: CookieJar): UserSessionPayload | null {
  const token = jar.get(USER_SESSION_COOKIE)?.value;
  if (!token) return null;
  return parseUserSessionToken(token);
}

export function isValidAdminUserSession(jar: CookieJar): boolean {
  const session = getUserSessionFromCookies(jar);
  return session?.role === "ADMIN";
}

export function isValidChauffeurSession(jar: CookieJar): boolean {
  const session = getUserSessionFromCookies(jar);
  return session?.role === "CHAUFFEUR";
}

export function userSessionCookieOptions() {
  const secure = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: Math.floor(SESSION_MAX_MS / 1000),
  };
}
