"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ERR_COPY = {
  portal_config:
    "The portal is not fully configured on this server. Ask your HiTouch contact or try again later.",
  missing_token: "The sign-in link was incomplete. Request a new link from the portal sign-in page.",
  invalid_token: "This sign-in link is invalid or has already been used. Request a fresh link below.",
};

export function CorporatePortalLoginForm({ initialErrorKey }) {
  const searchParams = useSearchParams();
  const qp = searchParams.get("corp_err");
  const fromQuery = qp && ERR_COPY[qp] ? ERR_COPY[qp] : null;
  const fromInitial =
    !fromQuery && initialErrorKey && ERR_COPY[initialErrorKey] ? ERR_COPY[initialErrorKey] : null;
  const [clearedAfterSend, setClearedAfterSend] = useState(false);
  const bannerErr = clearedAfterSend ? null : (fromQuery ?? fromInitial);

  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);
  const [devMagicLinkUrl, setDevMagicLinkUrl] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setPending(true);
    setMessage(null);
    setDevMagicLinkUrl(null);
    try {
      const res = await fetch("/api/portal/corporate/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setMessage(data.message ?? "Something went wrong.");
        return;
      }
      setMessage(data.message ?? "Check your inbox.");
      if (typeof data.devMagicLinkUrl === "string" && data.devMagicLinkUrl.startsWith("http")) {
        setDevMagicLinkUrl(data.devMagicLinkUrl);
      }
      setClearedAfterSend(true);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", "/portal/corporate");
      }
    } catch {
      setMessage("Network error.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={(e) => void onSubmit(e)}>
      <div>
        <label
          htmlFor="corp-portal-email"
          className="block text-xs font-semibold uppercase tracking-wider text-muted"
        >
          Work email
        </label>
        <input
          id="corp-portal-email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-md border border-accent/25 bg-paper px-3 py-2.5 text-sm text-light-ink outline-none ring-accent/25 focus:border-accent focus:ring-2"
          required
        />
        <p className="mt-2 text-xs leading-relaxed text-muted">
          Use the email your HiTouch onboarding team enabled for portal access. We will email you a
          one-time sign-in link.
        </p>
      </div>
      {bannerErr ? (
        <p className="rounded-md border border-amber-600/35 bg-amber-50/80 px-3 py-2 text-sm text-amber-950" role="alert">
          {bannerErr}
        </p>
      ) : null}
      {message ? (
        <p className="rounded-md border border-accent/25 bg-accent-soft/30 px-3 py-2 text-sm text-heading" role="status">
          {message}
        </p>
      ) : null}
      {devMagicLinkUrl ? (
        <div
          className="rounded-md border border-dashed border-accent/40 bg-accent-soft/20 px-3 py-3 text-sm"
          role="region"
          aria-label="Development sign-in link"
        >
          <p className="font-semibold text-heading">Local testing (no email sent)</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            This link appears only in development or when{" "}
            <code className="rounded bg-paper/80 px-1 py-0.5 text-[11px]">CORPORATE_PORTAL_DEV_RETURN_LINK=true</code>.
            It expires in 30 minutes and works once.
          </p>
          <a
            href={devMagicLinkUrl}
            className="mt-3 block break-all font-medium text-accent-readable underline-offset-2 hover:underline"
          >
            Open magic sign-in link
          </a>
        </div>
      ) : null}
      <Button type="submit" variant="onLight" disabled={pending} className="w-full">
        {pending ? "Sending link…" : "Email me a sign-in link"}
      </Button>
    </form>
  );
}
