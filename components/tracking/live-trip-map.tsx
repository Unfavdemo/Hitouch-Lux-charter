"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, CircleMarker } from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  latitude: number;
  longitude: number;
  label?: string;
  className?: string;
  zoom?: number;
};

export function LiveTripMap({ latitude, longitude, label, className = "", zoom = 15 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<CircleMarker | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const L = await import("leaflet");

      if (cancelled || !containerRef.current) return;

      if (!mapRef.current) {
        mapRef.current = L.map(containerRef.current, {
          zoomControl: true,
          attributionControl: true,
        }).setView([latitude, longitude], zoom);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapRef.current);
      }

      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      } else {
        markerRef.current = L.circleMarker([latitude, longitude], {
          radius: 12,
          fillColor: "#fbbf24",
          color: "#fef3c7",
          weight: 3,
          opacity: 1,
          fillOpacity: 0.95,
        }).addTo(mapRef.current);

        if (label) {
          markerRef.current.bindPopup(label);
        }
      }

      mapRef.current.setView([latitude, longitude], mapRef.current.getZoom(), {
        animate: true,
      });
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude, label, zoom]);

  useEffect(() => {
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`z-0 h-56 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900 sm:h-64 ${className}`}
      aria-label="Live map"
    />
  );
}
