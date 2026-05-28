"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
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
        const params = new URLSearchParams(searchParams.toString());
        params.set("mode", "corporate");
        params.delete("corp_err");
        window.history.replaceState(null, "", `/login?${params.toString()}`);
      }
    } catch {
      setMessage("Network error.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={(e) => void onSubmit(e)}>
      <div>
        <label
          htmlFor="corp-portal-email"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-400"
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
          className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white outline-none ring-amber-200/30 focus:border-amber-200/50 focus:ring-2"
          required
        />
      </div>
      {bannerErr ? (
        <p
          className="rounded-md border border-amber-500/35 bg-amber-950/40 px-3 py-2 text-sm text-amber-100"
          role="alert"
        >
          {bannerErr}
        </p>
      ) : null}
      {message ? (
        <p
          className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-zinc-200"
          role="status"
        >
          {message}
        </p>
      ) : null}
      {devMagicLinkUrl ? (
        <div
          className="rounded-md border border-dashed border-amber-200/35 bg-amber-200/5 px-3 py-3 text-sm"
          role="region"
          aria-label="Development sign-in link"
        >
          <p className="font-semibold text-amber-100">Local testing (no email sent)</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">
            This link appears only in development or when{" "}
            <code className="rounded bg-black/50 px-1 py-0.5 text-[11px]">
              CORPORATE_PORTAL_DEV_RETURN_LINK=true
            </code>
            . It expires in 30 minutes and works once.
          </p>
          <a
            href={devMagicLinkUrl}
            className="mt-3 block break-all font-medium text-amber-200 underline-offset-2 hover:underline"
          >
            Open magic sign-in link
          </a>
        </div>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-amber-200/90 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-black transition hover:bg-amber-200 disabled:opacity-60"
      >
        {pending ? "Sending link…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
