"use client";

import { useState, useTransition } from "react";
import { createTripAction } from "@/app/admin/(desk)/trips/actions";

export function CreateTripForm({ chauffeurs, companies }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    setMessage(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    startTransition(async () => {
      const result = await createTripAction(formData);
      if (!result.ok) {
        setMessage(result.error ?? "Failed to create trip.");
        return;
      }
      form.reset();
      setMessage("Trip created.");
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-lg border border-white/10 bg-white/[0.03] p-5"
    >
      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Create trip</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs text-zinc-500">
          Scheduled at
          <input
            type="datetime-local"
            name="scheduledAt"
            required
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500">
          Chauffeur
          <select
            name="chauffeurId"
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            defaultValue=""
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
          Pickup
          <input
            name="pickupLabel"
            required
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500 sm:col-span-2">
          Dropoff
          <input
            name="dropoffLabel"
            required
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500">
          Passenger name
          <input
            name="passengerName"
            required
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500">
          Passenger phone
          <input
            name="passengerPhone"
            required
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500">
          Company
          <select
            name="corporateCompanyId"
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
            defaultValue=""
          >
            <option value="">None</option>
            {companies.map((co) => (
              <option key={co.id} value={co.id}>
                {co.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs text-zinc-500">
          Or new company name
          <input
            name="newCompanyName"
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500 sm:col-span-2">
          Notes
          <textarea
            name="notes"
            rows={2}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
      </div>
      {message ? (
        <p className="text-sm text-amber-200/90" role="status">
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-amber-200/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black disabled:opacity-50"
      >
        {pending ? "Creating…" : "Create trip"}
      </button>
    </form>
  );
}
