import { createHmac, timingSafeEqual } from "node:crypto";

function trackingSecret(): string {
  return (
    process.env.USER_SESSION_SECRET?.trim() ||
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    "hitouch-dev-tracking"
  );
}

function signTripId(tripId: string): string {
  return createHmac("sha256", trackingSecret()).update(tripId, "utf8").digest("base64url").slice(0, 22);
}

/** Public URL token: `{tripId}.{signature}` */
export function createTripTrackingToken(tripId: string): string {
  return `${tripId}.${signTripId(tripId)}`;
}

export function verifyTripTrackingToken(token: string): string | null {
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  const tripId = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!tripId || !sig) return null;
  const expected = signTripId(tripId);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  return tripId;
}

export function getTripTrackingPath(tripId: string): string {
  return `/track/${createTripTrackingToken(tripId)}`;
}

export function getTripTrackingUrl(tripId: string, siteUrl?: string): string {
  const base = (siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  return `${base}${getTripTrackingPath(tripId)}`;
}
