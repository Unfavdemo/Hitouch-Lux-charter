/** Safe post-login redirects for unified /login */

export function safeAdminRedirect(raw) {
  if (
    typeof raw === "string" &&
    raw.startsWith("/admin") &&
    !raw.startsWith("/admin/login")
  ) {
    return raw;
  }
  return "/admin";
}

export function safePortalRedirect(raw) {
  if (typeof raw === "string" && raw.startsWith("/portal/corporate")) {
    return raw;
  }
  return "/portal/corporate";
}
