"use client";

import { useState } from "react";

export function CorporatePortalGrantControls({ leadId, hasGrant: initialHasGrant }) {
  const [hasGrant, setHasGrant] = useState(initialHasGrant);
  const [pending, setPending] = useState(false);
  const [note, setNote] = useState(null);

  async function grant() {
    setPending(true);
    setNote(null);
    try {
      const res = await fetch("/api/admin/corporate-portal-grant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ corporateLeadId: leadId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setNote(data.message ?? "Grant failed.");
        return;
      }
      setHasGrant(true);
      setNote(data.message ?? "Granted.");
    } catch {
      setNote("Network error.");
    } finally {
      setPending(false);
    }
  }

  async function revoke() {
    setPending(true);
    setNote(null);
    try {
      const res = await fetch("/api/admin/corporate-portal-revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ corporateLeadId: leadId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setNote(data.message ?? "Revoke failed.");
        return;
      }
      setHasGrant(false);
      setNote(data.message ?? "Revoked.");
    } catch {
      setNote("Network error.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {hasGrant ? (
        <button
          type="button"
          disabled={pending}
          onClick={() => void revoke()}
          className="rounded-md border border-red-500/40 bg-red-950/30 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-red-100 transition hover:bg-red-950/50 disabled:opacity-50"
        >
          {pending ? "…" : "Revoke portal"}
        </button>
      ) : (
        <button
          type="button"
          disabled={pending}
          onClick={() => void grant()}
          className="rounded-md border border-emerald-500/40 bg-emerald-950/25 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-100 transition hover:bg-emerald-950/45 disabled:opacity-50"
        >
          {pending ? "…" : "Grant portal"}
        </button>
      )}
      {note ? <p className="text-[10px] text-zinc-500">{note}</p> : null}
    </div>
  );
}
