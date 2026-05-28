"use client";

import { useEffect, useRef, useState } from "react";
import { isLocationSharingStatus } from "@/lib/trip-location-service";
import type { TripStatusValue } from "@/lib/trip-status";

const POST_INTERVAL_MS = 8000;

type Props = {
  tripId: string;
  status: TripStatusValue;
};

type ShareState = "idle" | "requesting" | "sharing" | "denied" | "unsupported" | "error";

export function DriverLocationPublisher({ tripId, status }: Props) {
  const [shareState, setShareState] = useState<ShareState>("idle");
  const [lastSent, setLastSent] = useState<Date | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const lastPostRef = useRef(0);

  const shouldShare = isLocationSharingStatus(status);

  useEffect(() => {
    if (!shouldShare) {
      if (watchIdRef.current != null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setShareState("idle");
      return;
    }

    if (!navigator.geolocation) {
      setShareState("unsupported");
      return;
    }

    setShareState("requesting");

    async function postPosition(pos: GeolocationPosition) {
      const now = Date.now();
      if (now - lastPostRef.current < POST_INTERVAL_MS - 500) return;
      lastPostRef.current = now;

      try {
        const res = await fetch(`/api/driver/trips/${tripId}/location`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracyMeters: pos.coords.accuracy,
            heading:
              pos.coords.heading != null && pos.coords.heading >= 0 ? pos.coords.heading : null,
            speedMps: pos.coords.speed != null && pos.coords.speed >= 0 ? pos.coords.speed : null,
          }),
        });
        if (res.ok) {
          setShareState("sharing");
          setLastSent(new Date());
        } else {
          const data = await res.json().catch(() => ({}));
          if (res.status === 403) {
            setShareState("idle");
          } else {
            setShareState("error");
            console.warn("[location]", data.message ?? res.status);
          }
        }
      } catch {
        setShareState("error");
      }
    }

    function onError(err: GeolocationPositionError) {
      if (err.code === err.PERMISSION_DENIED) {
        setShareState("denied");
      } else {
        setShareState("error");
      }
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => void postPosition(pos),
      onError,
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 15000,
      },
    );

    return () => {
      if (watchIdRef.current != null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [tripId, shouldShare, status]);

  if (!shouldShare) return null;

  const statusLine = {
    idle: "Enable location when trip is active",
    requesting: "Requesting GPS permission…",
    sharing: lastSent
      ? `Sharing live location · ${lastSent.toLocaleTimeString()}`
      : "Sharing live location with passenger",
    denied: "Location blocked — allow GPS in browser settings",
    unsupported: "GPS not available on this device",
    error: "Could not send location — check connection",
  }[shareState];

  const tone =
    shareState === "sharing"
      ? "border-emerald-500/30 bg-emerald-950/25 text-emerald-100"
      : shareState === "denied" || shareState === "error"
        ? "border-red-500/30 bg-red-950/25 text-red-100"
        : "border-amber-400/25 bg-amber-950/20 text-amber-100";

  return (
    <div className={`mt-4 flex items-start gap-3 rounded-lg border px-3 py-3 text-xs ${tone}`}>
      <span
        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
          shareState === "sharing" ? "animate-pulse bg-emerald-400" : "bg-amber-400/80"
        }`}
        aria-hidden
      />
      <div>
        <p className="font-semibold uppercase tracking-wider">Live GPS</p>
        <p className="mt-1 leading-relaxed opacity-90">{statusLine}</p>
        <p className="mt-1 text-[10px] opacity-70">
          Keep this page open while driving — passengers see your position on their tracking link.
        </p>
      </div>
    </div>
  );
}
