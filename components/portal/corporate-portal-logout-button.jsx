"use client";

import { Button } from "@/components/ui/button";

export function CorporatePortalLogoutButton() {
  async function logout() {
    await fetch("/api/portal/corporate/logout", { method: "POST" });
    window.location.href = "/login?mode=corporate";
  }

  return (
    <Button type="button" variant="onLightSecondary" className="text-sm" onClick={() => void logout()}>
      Sign out
    </Button>
  );
}
