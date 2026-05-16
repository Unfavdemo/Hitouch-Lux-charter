import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "hitouch_admin_sess";
const SESSION_MAX_MS = 7 * 24 * 60 * 60 * 1000;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

/** Expected staff username (default `admin` if unset). */
function getAdminUsername() {
  return process.env.ADMIN_USERNAME ?? "admin";
}

export function adminAuthConfigured() {
  return Boolean(getSessionSecret() && getAdminPassword());
}

/** @param {{ get: (name: string) => { value?: string } | undefined }} jar */
export function isValidAdminSession(jar) {
  const secret = getSessionSecret();
  if (!secret) return false;
  const token = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token, secret);
}

/**
 * @param {string} token
 * @param {string} secret
 */
export function verifySessionToken(token, secret) {
  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const payloadB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(payloadB64).digest("base64url");
  try {
    if (expected.length !== sig.length) return false;
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return false;
  } catch {
    return false;
  }
  let exp;
  try {
    const raw = Buffer.from(payloadB64, "base64url").toString("utf8");
    const parsed = JSON.parse(raw);
    exp = parsed.exp;
  } catch {
    return false;
  }
  return typeof exp === "number" && exp > Date.now();
}

export function createSessionToken() {
  const secret = getSessionSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set.");
  const exp = Date.now() + SESSION_MAX_MS;
  const payloadB64 = Buffer.from(JSON.stringify({ exp }), "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(payloadB64).digest("base64url");
  return `${payloadB64}.${sig}`;
}

export function verifyAdminPassword(plain) {
  const expected = getAdminPassword();
  if (!expected) return false;
  try {
    const a = Buffer.from(String(plain), "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyAdminUsername(plain) {
  const expected = getAdminUsername();
  if (!expected) return false;
  try {
    const a = Buffer.from(String(plain), "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function sessionCookieOptions() {
  const secure = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_MAX_MS / 1000),
  };
}
