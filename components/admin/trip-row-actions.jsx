"use client";

import { useState, useTransition } from "react";
import { cancelTripAction, updateTripAction } from "@/app/admin/(desk)/trips/actions";
import { TripLiveLocationPreview } from "@/components/admin/trip-live-location-link";

export function TripRowActions({ trip, chauffeurs, companies, trackHref, trackToken }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState(null);
  const passenger = trip.passengerTrips[0];
  const isTerminal = trip.status === "COMPLETED" || trip.status === "CANCELLED";
  const scheduledLocal = new Date(trip.scheduledAt).toISOString().slice(0, 16);

  function onUpdate(e) {
    e.preventDefault();
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await updateTripAction(trip.id, formData);
      if (!result.ok) {
        setMessage(result.error ?? "Update failed.");
        return;
      }
      setMessage("Saved.");
      setEditing(false);
    });
  }

  function onCancel() {
    if (!window.confirm("Cancel this trip? Chauffeurs will no longer see it.")) return;
    startTransition(async () => {
      const result = await cancelTripAction(trip.id);
      if (!result.ok) setMessage(result.error ?? "Could not cancel.");
      else setMessage("Trip cancelled.");
    });
  }

  return (
    <div className="min-w-[10rem] space-y-2">
      <TripLiveLocationPreview trackHref={trackHref} trackToken={trackToken} />
      {!isTerminal ? (
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            disabled={pending}
            onClick={() => setEditing((v) => !v)}
            className="rounded border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-400 hover:text-white"
          >
            {editing ? "Close" : "Edit"}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={onCancel}
            className="rounded border border-red-500/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-red-300/90 hover:bg-red-950/30"
          >
            Cancel
          </button>
        </div>
      ) : null}
      {message ? <p className="text-[10px] text-amber-200/80">{message}</p> : null}
      {editing && !isTerminal ? (
        <form onSubmit={onUpdate} className="space-y-2 rounded border border-white/10 bg-black/30 p-2">
          <input
            type="datetime-local"
            name="scheduledAt"
            defaultValue={scheduledLocal}
            className="w-full rounded border border-white/15 bg-black/50 px-2 py-1 text-[11px] text-white"
          />
          <input
            name="pickupLabel"
            defaultValue={trip.pickupLabel}
            className="w-full rounded border border-white/15 bg-black/50 px-2 py-1 text-[11px] text-white"
          />
          <input
            name="dropoffLabel"
            defaultValue={trip.dropoffLabel}
            className="w-full rounded border border-white/15 bg-black/50 px-2 py-1 text-[11px] text-white"
          />
          {passenger ? (
            <>
              <input
                name="passengerName"
                defaultValue={passenger.name}
                className="w-full rounded border border-white/15 bg-black/50 px-2 py-1 text-[11px] text-white"
              />
              <input
                name="passengerPhone"
                defaultValue={passenger.phone}
                className="w-full rounded border border-white/15 bg-black/50 px-2 py-1 text-[11px] text-white"
              />
            </>
          ) : null}
          <select
            name="chauffeurId"
            defaultValue={trip.chauffeurId ?? ""}
            className="w-full rounded border border-white/15 bg-black/50 px-2 py-1 text-[11px] text-white"
          >
            <option value="">Unassigned</option>
            {chauffeurs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            name="corporateCompanyId"
            defaultValue={trip.corporateCompanyId ?? ""}
            className="w-full rounded border border-white/15 bg-black/50 px-2 py-1 text-[11px] text-white"
          >
            <option value="">No company</option>
            {companies.map((co) => (
              <option key={co.id} value={co.id}>
                {co.name}
              </option>
            ))}
          </select>
          <textarea
            name="notes"
            rows={2}
            defaultValue={trip.notes ?? ""}
            className="w-full rounded border border-white/15 bg-black/50 px-2 py-1 text-[11px] text-white"
          />
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded bg-amber-200/90 py-1 text-[10px] font-semibold uppercase text-black"
          >
            Save
          </button>
        </form>
      ) : null}
    </div>
  );
}
