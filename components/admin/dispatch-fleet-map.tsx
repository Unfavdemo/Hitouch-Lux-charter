"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CircleMarker, LayerGroup, Map as LeafletMap, Polyline } from "leaflet";
import { formatTripStatus, TripStatus, type TripStatusValue } from "@/lib/trip-status";
import "leaflet/dist/leaflet.css";

type TripPin = {
  id: string;
  status: TripStatusValue;
  scheduledAt: string;
  pickupLabel: string;
  dropoffLabel: string;
  chauffeurName: string | null;
  passengerName: string | null;
  latitude: number | null;
  longitude: number | null;
  locationUpdatedAt: string | null;
  locationStale: boolean;
  trackPath: string;
};

const POLL_MS = 10000;
const DEFAULT_CENTER: [number, number] = [39.9526, -75.1652];
const DEFAULT_ZOOM = 11;
const FOCUS_ZOOM = 14;

/** Muted marker palette — less loud on dark UI */
function statusColor(status: TripStatusValue, selected: boolean): { fill: string; stroke: string } {
  const alpha = selected ? 0.95 : 0.55;
  const colors: Record<string, { fill: string; stroke: string }> = {
    [TripStatus.IN_ROUTE]: { fill: `rgba(180, 140, 60, ${alpha})`, stroke: "rgba(220, 190, 120, 0.7)" },
    [TripStatus.ARRIVED]: { fill: `rgba(70, 130, 100, ${alpha})`, stroke: "rgba(120, 170, 140, 0.6)" },
    [TripStatus.PASSENGER_ONBOARD]: { fill: `rgba(80, 120, 140, ${alpha})`, stroke: "rgba(130, 160, 180, 0.6)" },
    [TripStatus.COMPLETED]: { fill: `rgba(100, 100, 110, ${alpha})`, stroke: "rgba(140, 140, 150, 0.5)" },
    [TripStatus.CANCELLED]: { fill: `rgba(120, 80, 80, ${alpha})`, stroke: "rgba(160, 110, 110, 0.5)" },
    [TripStatus.ASSIGNED]: { fill: `rgba(110, 100, 130, ${alpha})`, stroke: "rgba(150, 140, 170, 0.55)" },
  };
  return colors[status] ?? colors[TripStatus.ASSIGNED];
}

const geocodeCache = new Map<string, [number, number] | null>();

async function geocodeLabel(label: string): Promise<[number, number] | null> {
  const key = label.trim().toLowerCase();
  if (geocodeCache.has(key)) return geocodeCache.get(key) ?? null;

  try {
    const q = encodeURIComponent(`${label}, Philadelphia, PA`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${q}`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) {
      geocodeCache.set(key, null);
      return null;
    }
    const data = (await res.json()) as { lat: string; lon: string }[];
    if (data[0]) {
      const point: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      geocodeCache.set(key, point);
      return point;
    }
  } catch {
    /* optional geocode */
  }
  geocodeCache.set(key, null);
  return null;
}

type Props = {
  initialTrips?: TripPin[];
};

export function DispatchFleetMap({ initialTrips = [] }: Props) {
  const [trips, setTrips] = useState<TripPin[]>(initialTrips);
  const [includeTerminal, setIncludeTerminal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [summary, setSummary] = useState({ total: 0, withGps: 0 });
  const [error, setError] = useState<string | null>(null);
  const [routeHint, setRouteHint] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersLayerRef = useRef<LayerGroup | null>(null);
  const routeLayerRef = useRef<LayerGroup | null>(null);
  const markersRef = useRef<Map<string, CircleMarker>>(new Map());
  const routeLineRef = useRef<Polyline | null>(null);
  const selectedIdRef = useRef<string | null>(null);
  const focusTripRef = useRef<(id: string) => void>(() => {});
  const initialFitDoneRef = useRef(false);
  const mapReadyRef = useRef(false);

  selectedIdRef.current = selectedId;

  const fetchTrips = useCallback(async () => {
    try {
      const q = includeTerminal ? "?all=1" : "";
      const res = await fetch(`/api/admin/dispatch/map${q}`, { cache: "no-store" });
      if (!res.ok) {
        setError("Could not load fleet data.");
        return;
      }
      const data = await res.json();
      if (!data.ok) return;
      setTrips(data.trips);
      setSummary(data.summary);
      setError(null);
    } catch {
      setError("Connection error — retrying…");
    }
  }, [includeTerminal]);

  useEffect(() => {
    void fetchTrips();
    const id = window.setInterval(() => void fetchTrips(), POLL_MS);
    return () => window.clearInterval(id);
  }, [fetchTrips]);

  const gpsTrips = trips.filter((t) => t.latitude != null && t.longitude != null);
  const selectedTrip = trips.find((t) => t.id === selectedId) ?? null;

  const drawRouteForTrip = useCallback(async (trip: TripPin) => {
    const L = await import("leaflet");
    if (!routeLayerRef.current || !mapRef.current) return;

    routeLayerRef.current.clearLayers();
    routeLineRef.current = null;

    setRouteHint("Loading route…");

    const [pickup, dropoff] = await Promise.all([
      geocodeLabel(trip.pickupLabel),
      geocodeLabel(trip.dropoffLabel),
    ]);

    const points: [number, number][] = [];
    if (pickup) points.push(pickup);
    if (trip.latitude != null && trip.longitude != null) {
      points.push([trip.latitude, trip.longitude]);
    }
    if (dropoff) points.push(dropoff);

    if (points.length >= 2) {
      routeLineRef.current = L.polyline(points, {
        color: "rgba(161, 161, 170, 0.45)",
        weight: 3,
        dashArray: "6 10",
        lineCap: "round",
      }).addTo(routeLayerRef.current);

      if (pickup) {
        L.circleMarker(pickup, {
          radius: 5,
          fillColor: "rgba(120, 120, 130, 0.5)",
          color: "rgba(180, 180, 190, 0.4)",
          weight: 1,
          fillOpacity: 0.6,
        })
          .bindTooltip("Pickup", { permanent: false, className: "dispatch-tooltip" })
          .addTo(routeLayerRef.current);
      }
      if (dropoff) {
        L.circleMarker(dropoff, {
          radius: 5,
          fillColor: "rgba(120, 120, 130, 0.5)",
          color: "rgba(180, 180, 190, 0.4)",
          weight: 1,
          fillOpacity: 0.6,
        })
          .bindTooltip("Dropoff", { permanent: false, className: "dispatch-tooltip" })
          .addTo(routeLayerRef.current);
      }

      const bounds = L.latLngBounds(points);
      mapRef.current.flyToBounds(bounds, {
        padding: [72, 72],
        maxZoom: FOCUS_ZOOM,
        duration: 0.85,
      });
      setRouteHint(null);
    } else if (trip.latitude != null && trip.longitude != null) {
      mapRef.current.flyTo([trip.latitude, trip.longitude], FOCUS_ZOOM, { duration: 0.85 });
      setRouteHint("Showing live GPS — route addresses could not be placed on map.");
    } else {
      setRouteHint("No GPS yet — assign a driver and open the driver app with location enabled.");
    }
  }, []);

  const focusTripById = useCallback(
    async (tripId: string) => {
      const trip = trips.find((t) => t.id === tripId);
      if (!trip) return;
      setSelectedId(tripId);
      selectedIdRef.current = tripId;
      initialFitDoneRef.current = true;

      await drawRouteForTrip(trip);

      if (trip.latitude != null && trip.longitude != null) {
        markersRef.current.get(tripId)?.openPopup();
      }
    },
    [trips, drawRouteForTrip],
  );

  focusTripRef.current = (id) => {
    void focusTripById(id);
  };

  /** Init map once — quiet Carto dark tiles */
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const L = await import("leaflet");
      if (cancelled || !mapContainerRef.current || mapRef.current) return;

      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: true,
        fadeAnimation: true,
        zoomAnimation: true,
      }).setView(DEFAULT_CENTER, DEFAULT_ZOOM);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
      }).addTo(mapRef.current);

      markersLayerRef.current = L.layerGroup().addTo(mapRef.current);
      routeLayerRef.current = L.layerGroup().addTo(mapRef.current);
      mapReadyRef.current = true;
    }

    void init();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
      routeLayerRef.current = null;
      markersRef.current.clear();
      routeLineRef.current = null;
      mapReadyRef.current = false;
      initialFitDoneRef.current = false;
    };
  }, []);

  /** Update marker positions only — do not move the camera */
  useEffect(() => {
    if (!mapReadyRef.current) return;

    let cancelled = false;

    async function syncMarkers() {
      const L = await import("leaflet");
      if (cancelled || !markersLayerRef.current) return;

      const layer = markersLayerRef.current;
      const markers = markersRef.current;
      const seen = new Set<string>();
      const selId = selectedIdRef.current;

      for (const trip of gpsTrips) {
        seen.add(trip.id);
        const lat = trip.latitude!;
        const lng = trip.longitude!;
        const selected = trip.id === selId;
        const colors = statusColor(trip.status, selected);
        const label = [
          `<span style="font-size:12px"><strong>${trip.chauffeurName ?? "Unassigned"}</strong></span>`,
          `<span style="color:#a1a1aa;font-size:11px">${formatTripStatus(trip.status)}</span>`,
          `<span style="font-size:11px">${trip.pickupLabel}</span>`,
          `<span style="font-size:11px;color:#71717a">→ ${trip.dropoffLabel}</span>`,
        ].join("<br/>");

        let marker = markers.get(trip.id);
        if (marker) {
          marker.setLatLng([lat, lng]);
          marker.setStyle({
            fillColor: colors.fill,
            color: colors.stroke,
            fillOpacity: selected ? 0.9 : 0.5,
            radius: selected ? 10 : 7,
            weight: selected ? 2 : 1.5,
          });
          marker.setPopupContent(label);
        } else {
          marker = L.circleMarker([lat, lng], {
            radius: selected ? 10 : 7,
            fillColor: colors.fill,
            color: colors.stroke,
            weight: selected ? 2 : 1.5,
            fillOpacity: selected ? 0.9 : 0.5,
          })
            .bindPopup(label, { className: "dispatch-popup" })
            .on("click", () => {
              focusTripRef.current(trip.id);
            });
          marker.addTo(layer);
          markers.set(trip.id, marker);
        }
      }

      for (const [id, marker] of markers) {
        if (!seen.has(id)) {
          layer.removeLayer(marker);
          markers.delete(id);
        }
      }

      // If a trip is selected, gently follow its live GPS without resetting route fit
      if (selId) {
        const sel = gpsTrips.find((t) => t.id === selId);
        if (sel && mapRef.current) {
          mapRef.current.panTo([sel.latitude!, sel.longitude!], {
            animate: true,
            duration: 0.6,
            noMoveStart: true,
          });
        }
      }
    }

    void syncMarkers();

    return () => {
      cancelled = true;
    };
  }, [gpsTrips, selectedId]);

  /** Fit all vehicles once when data first arrives (no selection) */
  useEffect(() => {
    if (!mapReadyRef.current || selectedIdRef.current || initialFitDoneRef.current) return;
    if (gpsTrips.length === 0) return;

    void (async () => {
      const L = await import("leaflet");
      if (!mapRef.current) return;
      const bounds = L.latLngBounds(gpsTrips.map((t) => [t.latitude!, t.longitude!]));
      mapRef.current.fitBounds(bounds, { padding: [56, 56], maxZoom: 12, animate: true });
      initialFitDoneRef.current = true;
    })();
  }, [gpsTrips]);

  function focusTrip(trip: TripPin) {
    void focusTripById(trip.id);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-zinc-500">
          <span className="text-zinc-400">{summary.withGps}</span> on map ·{" "}
          <span className="text-zinc-400">{summary.total}</span> trips · quiet refresh every{" "}
          {POLL_MS / 1000}s
        </p>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-zinc-500">
          <input
            type="checkbox"
            checked={includeTerminal}
            onChange={(e) => {
              setIncludeTerminal(e.target.checked);
              initialFitDoneRef.current = false;
            }}
            className="rounded border-white/15"
          />
          Completed & cancelled
        </label>
      </div>

      {selectedTrip ? (
        <p className="text-xs text-zinc-500">
          <span className="text-zinc-400">Selected:</span>{" "}
          <span className="text-zinc-300">
            {selectedTrip.pickupLabel} → {selectedTrip.dropoffLabel}
          </span>
          {routeHint ? <span className="ml-2 text-zinc-600">· {routeHint}</span> : null}
        </p>
      ) : (
        <p className="text-xs text-zinc-600">Select a trip to zoom the map and show pickup → dropoff.</p>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_minmax(260px,300px)]">
        <div
          ref={mapContainerRef}
          className="dispatch-map-shell z-0 min-h-[50vh] w-full overflow-hidden rounded-lg border border-white/[0.06] bg-[#0c0c0e] lg:min-h-[68vh]"
          aria-label="Fleet map"
        />

        <aside className="flex max-h-[68vh] flex-col overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]">
          <p className="border-b border-white/[0.06] px-3 py-2.5 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
            Trips
          </p>
          <ul className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
            {trips.length === 0 ? (
              <li className="px-3 py-8 text-center text-sm text-zinc-600">No trips to show.</li>
            ) : (
              trips.map((trip) => {
                const hasGps = trip.latitude != null;
                const when = new Date(trip.scheduledAt).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                });
                const selected = trip.id === selectedId;
                return (
                  <li key={trip.id}>
                    <button
                      type="button"
                      onClick={() => focusTrip(trip)}
                      className={`w-full px-3 py-2.5 text-left transition-colors ${
                        selected
                          ? "bg-white/[0.05] border-l-2 border-l-zinc-400"
                          : "hover:bg-white/[0.03] border-l-2 border-l-transparent"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                          {formatTripStatus(trip.status)}
                        </span>
                        {hasGps ? (
                          <span
                            className={`shrink-0 text-[9px] ${
                              trip.locationStale ? "text-zinc-500" : "text-zinc-600"
                            }`}
                          >
                            {trip.locationStale ? "stale" : "live"}
                          </span>
                        ) : (
                          <span className="shrink-0 text-[9px] text-zinc-700">no gps</span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-zinc-300">
                        {trip.chauffeurName ?? "Unassigned"}
                      </p>
                      <p className="mt-0.5 text-[11px] text-zinc-600">{when}</p>
                      <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-zinc-500">
                        {trip.pickupLabel} → {trip.dropoffLabel}
                      </p>
                      <Link
                        href={trip.trackPath}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1.5 inline-block text-[10px] text-zinc-600 underline-offset-2 hover:text-zinc-400 hover:underline"
                      >
                        Passenger track
                      </Link>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </aside>
      </div>

      <div className="flex flex-wrap gap-3 text-[10px] text-zinc-600">
        {(
          [
            TripStatus.ASSIGNED,
            TripStatus.IN_ROUTE,
            TripStatus.ARRIVED,
            TripStatus.PASSENGER_ONBOARD,
          ] as const
        ).map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full opacity-70"
              style={{ backgroundColor: statusColor(s, false).fill }}
            />
            {formatTripStatus(s)}
          </span>
        ))}
      </div>

      {error ? <p className="text-sm text-zinc-500">{error}</p> : null}

      <style jsx global>{`
        .dispatch-map-shell .leaflet-control-attribution {
          font-size: 9px;
          opacity: 0.45;
          background: transparent !important;
        }
        .dispatch-map-shell .leaflet-control-zoom a {
          background: rgba(20, 20, 22, 0.9) !important;
          color: #a1a1aa !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
        }
        .dispatch-popup .leaflet-popup-content-wrapper {
          background: rgba(18, 18, 20, 0.95);
          color: #e4e4e7;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .dispatch-popup .leaflet-popup-tip {
          background: rgba(18, 18, 20, 0.95);
        }
      `}</style>
    </div>
  );
}
