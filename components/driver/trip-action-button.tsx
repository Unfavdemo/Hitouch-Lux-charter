"use client";

import { useState, useTransition } from "react";
import { advanceMyTrip } from "@/app/driver/dashboard/actions";
import { getDriverActionLabel, type TripStatusValue } from "@/lib/trip-status";

type Props = {
  tripId: string;
  status: TripStatusValue;
};

export function TripActionButton({ tripId, status }: Props) {
  const label = getDriverActionLabel(status);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!label) return null;

  function handlePress() {
    setError(null);
    startTransition(async () => {
      const result = await advanceMyTrip(tripId);
      if (!result.ok) {
        setError(result.error ?? "Update failed.");
      }
    });
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handlePress}
        disabled={pending}
        className="w-full rounded-xl bg-amber-200 py-4 text-base font-bold uppercase tracking-[0.12em] text-black shadow-lg transition hover:bg-amber-100 active:scale-[0.99] disabled:opacity-60"
      >
        {pending ? "Updating…" : label}
      </button>
      {error ? (
        <p className="mt-3 rounded-md border border-red-500/40 bg-red-950/50 px-3 py-2 text-sm text-red-100" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
