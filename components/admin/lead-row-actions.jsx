"use client";

import { useState } from "react";

function badgeClass(status) {
  if (status === "accepted") return "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/30";
  if (status === "declined") return "bg-red-500/15 text-red-200 ring-1 ring-red-500/30";
  return "bg-amber-500/15 text-amber-100 ring-1 ring-amber-500/25";
}

/**
 * @param {{ scope: "corporate" | "events" | "experience"; id: string; status: string; reviewedAt?: string | null }} props
 */
export function LeadRowActions({ scope, id, status: initialStatus, reviewedAt }) {
  const [status, setStatus] = useState(initialStatus);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  async function patch(next) {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/lead-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope, id, status: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Could not update.");
        return;
      }
      setStatus(next);
      if (next === "accepted" && data.tripBooked?.tripId) {
        const msg = data.tripBooked.created
          ? "Lead accepted — trip created on the trip desk."
          : "Lead accepted — trip already exists for this request.";
        window.alert(msg);
      } else if (next === "accepted" && data.tripBooked?.skipped) {
        window.alert(
          data.tripBooked.reason ??
            "Lead accepted, but a trip could not be auto-created. Create one manually under Trips.",
        );
      }
      window.location.reload();
    } catch {
      setError("Network error.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badgeClass(status)}`}
      >
        {String(status)}
      </span>
      {reviewedAt && status !== "pending" ? (
        <p className="text-[10px] text-zinc-500">
          {new Date(reviewedAt).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
        </p>
      ) : null}
      {error ? <p className="text-[10px] text-red-300">{error}</p> : null}
      <div className="flex flex-wrap gap-1.5">
        {status === "pending" ? (
          <>
            <button
              type="button"
              disabled={pending}
              onClick={() => void patch("accepted")}
              className="rounded-md bg-emerald-600/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white transition hover:bg-emerald-500 disabled:opacity-50"
            >
              Accept
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => void patch("declined")}
              className="rounded-md border border-red-400/50 bg-red-950/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-100 transition hover:bg-red-950/70 disabled:opacity-50"
            >
              Decline
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={pending}
            onClick={() => void patch("pending")}
            className="rounded-md border border-white/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-200 transition hover:bg-white/10 disabled:opacity-50"
          >
            Mark pending
          </button>
        )}
      </div>
    </div>
  );
}
