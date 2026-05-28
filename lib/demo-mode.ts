/** True when running a local/staging demo without vendor API keys. */
export function isDemoMode(): boolean {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "1") return true;
  return process.env.NODE_ENV === "development";
}

export function isSmithWebhookDevAllowed(request: Request): boolean {
  if (!isDemoMode()) return false;
  return request.headers.get("x-hitouch-demo-webhook") === "1";
}
