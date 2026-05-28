import { DispatchFleetMap } from "@/components/admin/dispatch-fleet-map";
import { isPrismaConfigured } from "@/lib/prisma";
import { listTripsForDispatchMap } from "@/lib/trip-location-service";

export const dynamic = "force-dynamic";

export default async function AdminDispatchMapPage() {
  let initialTrips = [];
  let error = null;

  if (isPrismaConfigured()) {
    try {
      initialTrips = await listTripsForDispatchMap();
    } catch (e) {
      error = e instanceof Error ? e.message : "Could not load trips.";
    }
  } else {
    error = "DATABASE_URL is required for the dispatch map.";
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl text-white">Live dispatch map</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          All active trips on one map. Chauffeurs share GPS from their phone on the driver dashboard.
          Click a trip in the list to focus the map.
        </p>
      </div>

      {error ? (
        <p className="rounded-md border border-red-500/35 bg-red-950/35 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : (
        <DispatchFleetMap initialTrips={initialTrips} />
      )}
    </div>
  );
}
