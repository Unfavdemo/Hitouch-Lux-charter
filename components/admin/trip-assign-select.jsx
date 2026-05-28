"use client";

import { useTransition } from "react";
import { assignChauffeurAction } from "@/app/admin/(desk)/trips/actions";

export function TripAssignSelect({ tripId, chauffeurs, currentChauffeurId }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      disabled={pending}
      className="rounded-md border border-white/15 bg-black/40 px-2 py-1 text-xs text-white"
      value={currentChauffeurId ?? ""}
      onChange={(e) => {
        const value = e.target.value;
        startTransition(async () => {
          await assignChauffeurAction(tripId, value);
        });
      }}
    >
      <option value="">Unassigned</option>
      {chauffeurs.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
