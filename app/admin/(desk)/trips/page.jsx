import { CreateTripForm } from "@/components/admin/create-trip-form";
import { TripAssignSelect } from "@/components/admin/trip-assign-select";
import { TripRowActions } from "@/components/admin/trip-row-actions";
import { formatTripStatus } from "@/lib/trip-status";
import { createTripTrackingToken, getTripTrackingPath } from "@/lib/trip-tracking";
import { listChauffeurs, listCorporateCompanies, listTrips } from "@/lib/trip-service";

export const dynamic = "force-dynamic";

export default async function AdminTripsPage() {
  let trips = [];
  let chauffeurs = [];
  let companies = [];
  let error = null;

  try {
    [trips, chauffeurs, companies] = await Promise.all([
      listTrips({ includeTerminal: true }),
      listChauffeurs(),
      listCorporateCompanies(),
    ]);
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load trips.";
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-xl text-white">Trip desk</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Create, assign, edit, and cancel runs. Share passenger tracking links from each row.
          Chauffeurs advance live status from the driver dashboard.
        </p>
      </div>

      {error ? (
        <p className="rounded-md border border-red-500/35 bg-red-950/35 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <CreateTripForm chauffeurs={chauffeurs} companies={companies} />

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Chauffeur</th>
              <th className="px-4 py-3">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {trips.map((trip) => {
              const when = new Date(trip.scheduledAt).toLocaleString();
              const passenger = trip.passengerTrips[0];
              const isCancelled = trip.status === "CANCELLED";
              return (
                <tr
                  key={trip.id}
                  className={`text-zinc-300 ${isCancelled ? "opacity-60" : ""}`}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-zinc-400">{when}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        isCancelled
                          ? "bg-red-500/15 text-red-200"
                          : "bg-white/10 text-amber-200/90"
                      }`}
                    >
                      {formatTripStatus(trip.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white">{trip.pickupLabel}</p>
                    <p className="text-xs text-zinc-500">→ {trip.dropoffLabel}</p>
                    {passenger ? (
                      <p className="mt-1 text-xs text-zinc-500">
                        {passenger.name} · {passenger.phone}
                      </p>
                    ) : null}
                    {trip.sourceScope ? (
                      <p className="mt-1 text-[10px] capitalize text-zinc-600">
                        Source: {trip.sourceScope.replace(/_/g, " ")}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {trip.corporateCompany?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    {isCancelled ? (
                      <span className="text-xs text-zinc-600">—</span>
                    ) : (
                      <TripAssignSelect
                        tripId={trip.id}
                        chauffeurs={chauffeurs}
                        currentChauffeurId={trip.chauffeurId}
                      />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <TripRowActions
                      trip={trip}
                      chauffeurs={chauffeurs}
                      companies={companies}
                      trackHref={getTripTrackingPath(trip.id)}
                      trackToken={createTripTrackingToken(trip.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {trips.length === 0 && !error ? (
          <p className="px-4 py-8 text-center text-sm text-zinc-500">No trips yet.</p>
        ) : null}
      </div>
    </div>
  );
}
