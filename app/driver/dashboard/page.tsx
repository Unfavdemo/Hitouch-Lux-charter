import Link from "next/link";
import { DriverTripCard } from "@/components/driver/driver-trip-card";
import { formatTripStatus, type TripStatusValue } from "@/lib/trip-status";
import { listActiveTripsForChauffeur } from "@/lib/trip-service";
import { requireChauffeurSession } from "@/lib/require-chauffeur";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DriverDashboardPage() {
  const session = await requireChauffeurSession();
  const driver = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true, email: true },
  });

  const trips = await listActiveTripsForChauffeur(session.userId);

  return (
    <div className="mx-auto min-h-full max-w-lg px-4 py-6 pb-12">
      <header className="mb-8 border-b border-white/10 pb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/80">
          HiTouch · Chauffeur
        </p>
        <h1 className="mt-1 font-serif text-2xl text-white">Active trips</h1>
        {driver ? (
          <p className="mt-1 text-sm text-zinc-400">
            {driver.name} · {driver.email}
          </p>
        ) : null}
        <p className="mt-3 text-xs leading-relaxed text-zinc-500">
          Allow location access on your phone while a trip is active — passengers see your position
          on their tracking link, like ride-share apps.
        </p>
        <Link
          href="/login?mode=driver"
          className="mt-3 inline-block text-xs text-zinc-500 underline-offset-2 hover:text-zinc-300 hover:underline"
        >
          Switch account
        </Link>
      </header>

      {trips.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="text-sm text-zinc-400">No active trips assigned to you.</p>
          <p className="mt-2 text-xs text-zinc-500">Check back when operations assigns a run.</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {trips.map((trip) => {
            const passenger = trip.passengerTrips[0];
            const scheduled = new Date(trip.scheduledAt).toLocaleString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            });

            return (
              <DriverTripCard
                key={trip.id}
                tripId={trip.id}
                status={trip.status as TripStatusValue}
                statusLabel={formatTripStatus(trip.status)}
                scheduled={scheduled}
                companyName={trip.corporateCompany?.name ?? null}
                pickupLabel={trip.pickupLabel}
                dropoffLabel={trip.dropoffLabel}
                passenger={passenger ? { name: passenger.name, phone: passenger.phone } : null}
                notes={trip.notes}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
