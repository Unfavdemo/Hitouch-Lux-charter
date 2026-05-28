"use client";

import { useState, useTransition } from "react";
import { createTripFromIntakeAction } from "@/app/admin/(desk)/intake/actions";

export function IntakeCreateTripForm({ submissionId, draft, chauffeurs }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState(null);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md border border-amber-400/50 bg-amber-950/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-100 hover:bg-amber-950/60"
      >
        Create trip
      </button>
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await createTripFromIntakeAction(submissionId, formData);
      if (!result.ok) {
        setMessage(result.error ?? "Failed.");
        return;
      }
      if (result.alreadyExisted) {
        setMessage("Trip already linked to this intake.");
      } else {
        setMessage(`Trip created. ID ${result.tripId?.slice(0, 8)}…`);
      }
      setOpen(false);
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3 rounded-md border border-amber-400/20 bg-amber-950/20 p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-200/80">
        Create trip from intake
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-xs text-zinc-500 sm:col-span-2">
          Scheduled
          <input
            type="datetime-local"
            name="scheduledAt"
            required
            defaultValue={draft.scheduledAt}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500 sm:col-span-2">
          Pickup
          <input
            name="pickupLabel"
            required
            defaultValue={draft.pickupLabel}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500 sm:col-span-2">
          Dropoff
          <input
            name="dropoffLabel"
            required
            defaultValue={draft.dropoffLabel}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500">
          Passenger
          <input
            name="passengerName"
            required
            defaultValue={draft.passengerName}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500">
          Phone
          <input
            name="passengerPhone"
            required
            defaultValue={draft.passengerPhone}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500 sm:col-span-2">
          Chauffeur
          <select
            name="chauffeurId"
            defaultValue=""
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          >
            <option value="">Unassigned</option>
            {chauffeurs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs text-zinc-500 sm:col-span-2">
          Notes
          <textarea
            name="notes"
            rows={2}
            defaultValue={draft.notes}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
      </div>
      {message ? (
        <p className="text-sm text-amber-200/90" role="status">
          {message}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-amber-200/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-black disabled:opacity-50"
        >
          {pending ? "Creating…" : "Confirm trip"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-md border border-white/15 px-3 py-1.5 text-xs text-zinc-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
