import { createHmac, timingSafeEqual } from "node:crypto";

export const CORPORATE_PORTAL_SESSION_COOKIE = "hitouch_corp_sess";
const SESSION_MAX_MS = 14 * 24 * 60 * 60 * 1000;
const PORTAL_COOKIE_PATH = "/portal/corporate";

function getSessionSecret() {
  return process.env.CORPORATE_PORTAL_SESSION_SECRET ?? "";
}

export function corporatePortalAuthConfigured() {
  return Boolean(getSessionSecret());
}

/** @param {{ get: (name: string) => { value?: string } | undefined }} jar */
export function isValidCorporatePortalSession(jar) {
  const secret = getSessionSecret();
  if (!secret) return false;
  const token = jar.get(CORPORATE_PORTAL_SESSION_COOKIE)?.value;
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
  let grantId;
  try {
    const raw = Buffer.from(payloadB64, "base64url").toString("utf8");
    const parsed = JSON.parse(raw);
    exp = parsed.exp;
    grantId = parsed.grantId;
  } catch {
    return false;
  }
  return typeof exp === "number" && exp > Date.now() && typeof grantId === "string" && grantId.length > 0;
}

/**
 * @param {string} token
 * @param {string} secret
 * @returns {string | null} grantId
 */
export function readGrantIdFromSessionToken(token, secret) {
  if (!verifySessionToken(token, secret)) return null;
  const dot = token.indexOf(".");
  const payloadB64 = token.slice(0, dot);
  try {
    const raw = Buffer.from(payloadB64, "base64url").toString("utf8");
    const parsed = JSON.parse(raw);
    return typeof parsed.grantId === "string" ? parsed.grantId : null;
  } catch {
    return null;
  }
}

/**
 * @param {string} grantId
 */
export function createCorporatePortalSessionToken(grantId) {
  const secret = getSessionSecret();
  if (!secret) throw new Error("CORPORATE_PORTAL_SESSION_SECRET is not set.");
  const exp = Date.now() + SESSION_MAX_MS;
  const payloadB64 = Buffer.from(JSON.stringify({ exp, grantId }), "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(payloadB64).digest("base64url");
  return `${payloadB64}.${sig}`;
}

export function corporatePortalSessionCookieOptions() {
  const secure = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: PORTAL_COOKIE_PATH,
    maxAge: Math.floor(SESSION_MAX_MS / 1000),
  };
}

/** @param {{ get: (name: string) => { value?: string } | undefined }} jar */
export function getGrantIdFromCookies(jar) {
  const secret = getSessionSecret();
  if (!secret) return null;
  const token = jar.get(CORPORATE_PORTAL_SESSION_COOKIE)?.value;
  if (!token) return null;
  return readGrantIdFromSessionToken(token, secret);
}
