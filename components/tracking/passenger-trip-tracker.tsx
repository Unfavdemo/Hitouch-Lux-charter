"use client";

import { useCallback, useEffect, useState } from "react";
import { LiveTripMap } from "@/components/tracking/live-trip-map";
import { formatTripStatus } from "@/lib/trip-status";

type LocationPayload = {
  latitude: number;
  longitude: number;
  accuracyMeters: number | null;
  updatedAt: string;
  stale: boolean;
};

type Props = {
  token: string;
  initialStatus: string;
  chauffeurName: string | null;
};

const POLL_MS = 5000;

export function PassengerTripTracker({ token, initialStatus, chauffeurName }: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [location, setLocation] = useState<LocationPayload | null>(null);
  const [sharingExpected, setSharingExpected] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    try {
      const res = await fetch(`/api/track/${encodeURIComponent(token)}/location`, {
        cache: "no-store",
      });
      if (!res.ok) {
        setError("Could not load location.");
        return;
      }
      const data = await res.json();
      if (!data.ok) return;
      setStatus(data.trip.status);
      setSharingExpected(data.sharingExpected);
      setLocation(data.location);
      setError(null);
    } catch {
      setError("Connection lost — retrying…");
    }
  }, [token]);

  useEffect(() => {
    void fetchLocation();
    const id = window.setInterval(() => void fetchLocation(), POLL_MS);
    return () => window.clearInterval(id);
  }, [fetchLocation]);

  const waiting =
    sharingExpected && !location && (status === "ASSIGNED" || status === "IN_ROUTE");

  return (
    <div className="space-y-3">
      {location ? (
        <>
          <LiveTripMap
            latitude={location.latitude}
            longitude={location.longitude}
            label={chauffeurName ? `${chauffeurName} · HiTouch` : "Your chauffeur"}
          />
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
            <span>
              {location.stale ? (
                <span className="text-amber-300/90">Location may be outdated</span>
              ) : (
                <span className="text-emerald-300/90">Live · updating every few seconds</span>
              )}
            </span>
            <time dateTime={location.updatedAt}>
              Updated {new Date(location.updatedAt).toLocaleTimeString()}
            </time>
          </div>
          {location.accuracyMeters != null && location.accuracyMeters > 0 ? (
            <p className="text-[10px] text-zinc-600">
              GPS accuracy ~{Math.round(location.accuracyMeters)} m
            </p>
          ) : null}
        </>
      ) : waiting ? (
        <div className="flex h-56 flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-6 text-center sm:h-64">
          <p className="text-sm text-zinc-300">Waiting for chauffeur GPS…</p>
          <p className="mt-2 text-xs text-zinc-500">
            Your driver shares location from their phone when the trip is active (
            {formatTripStatus(status)}).
          </p>
        </div>
      ) : !sharingExpected ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center text-sm text-zinc-500">
          Live map ended — trip {formatTripStatus(status).toLowerCase()}.
        </p>
      ) : (
        <p className="text-center text-xs text-zinc-500">No location shared yet.</p>
      )}
      {error ? <p className="text-center text-xs text-amber-300/80">{error}</p> : null}
    </div>
  );
}
