"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LiveTripMap } from "@/components/tracking/live-trip-map";

type LocationPayload = {
  latitude: number;
  longitude: number;
};

type Props = {
  trackHref: string;
  trackToken: string;
};

/** Mini live map for admin trip desk (polls public track API). */
export function TripLiveLocationPreview({ trackHref, trackToken }: Props) {
  const [location, setLocation] = useState<LocationPayload | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open || !trackToken) return;
    let cancelled = false;

    async function load() {
      const res = await fetch(`/api/track/${encodeURIComponent(trackToken)}/location`, {
        cache: "no-store",
      });
      if (!res.ok || cancelled) return;
      const data = await res.json();
      if (data.location && !cancelled) setLocation(data.location);
    }

    void load();
    const id = window.setInterval(() => void load(), 8000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [open, trackToken]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Link
          href={trackHref}
          target="_blank"
          className="text-[10px] font-semibold uppercase tracking-wider text-sky-300/90 hover:text-sky-200"
        >
          Track link ↗
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-300"
        >
          {open ? "Hide map" : "Live map"}
        </button>
      </div>
      {open && location ? (
        <LiveTripMap
          latitude={location.latitude}
          longitude={location.longitude}
          label="Chauffeur"
          className="h-40"
          zoom={14}
        />
      ) : null}
      {open && !location ? (
        <p className="text-[10px] text-zinc-600">Waiting for driver GPS…</p>
      ) : null}
    </div>
  );
}
