"use client";

import type { TripStatusValue } from "@/lib/trip-status";
import { TripActionButton } from "@/components/driver/trip-action-button";
import { DriverLocationPublisher } from "@/components/driver/driver-location-publisher";

type Passenger = { name: string; phone: string };

type Props = {
  tripId: string;
  status: TripStatusValue;
  scheduled: string;
  companyName: string | null;
  pickupLabel: string;
  dropoffLabel: string;
  passenger: Passenger | null;
  notes: string | null;
  statusLabel: string;
};

export function DriverTripCard({
  tripId,
  status,
  scheduled,
  companyName,
  pickupLabel,
  dropoffLabel,
  passenger,
  notes,
  statusLabel,
}: Props) {
  return (
    <li className="rounded-xl border border-white/10 bg-white/[0.04] p-5 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-amber-200/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
          {statusLabel}
        </span>
        <time className="text-right text-xs text-zinc-500">{scheduled}</time>
      </div>

      {companyName ? (
        <p className="mt-3 text-xs font-medium uppercase tracking-wider text-zinc-500">{companyName}</p>
      ) : null}

      <div className="mt-4 space-y-3 text-sm">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Pickup</p>
          <p className="mt-0.5 text-white">{pickupLabel}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Dropoff</p>
          <p className="mt-0.5 text-zinc-200">{dropoffLabel}</p>
        </div>
        {passenger ? (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Passenger
            </p>
            <p className="mt-0.5 text-zinc-200">
              {passenger.name}
              <span className="text-zinc-500"> · </span>
              <a href={`tel:${passenger.phone}`} className="text-amber-200/90">
                {passenger.phone}
              </a>
            </p>
          </div>
        ) : null}
      </div>

      {notes ? (
        <p className="mt-4 rounded-md bg-black/30 px-3 py-2 text-xs leading-relaxed text-zinc-400">
          {notes}
        </p>
      ) : null}

      <DriverLocationPublisher tripId={tripId} status={status} />
      <TripActionButton tripId={tripId} status={status} />
    </li>
  );
}
