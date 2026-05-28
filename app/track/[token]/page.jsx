import Link from "next/link";
import { PassengerTripTracker } from "@/components/tracking/passenger-trip-tracker";
import { formatTripStatus, TripStatus } from "@/lib/trip-status";
import { getTripForTracking } from "@/lib/trip-service";
import { verifyTripTrackingToken } from "@/lib/trip-tracking";

export const dynamic = "force-dynamic";

const STEPS = [
  TripStatus.ASSIGNED,
  TripStatus.IN_ROUTE,
  TripStatus.ARRIVED,
  TripStatus.PASSENGER_ONBOARD,
  TripStatus.COMPLETED,
];

function stepIndex(status) {
  if (status === TripStatus.CANCELLED) return -1;
  const i = STEPS.indexOf(status);
  return i < 0 ? 0 : i;
}

export default async function TrackTripPage({ params }) {
  const { token } = await params;
  const tripId = verifyTripTrackingToken(token);

  if (!tripId) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16 text-center">
        <p className="text-sm uppercase tracking-widest text-zinc-500">HiTouch Luxury</p>
        <h1 className="mt-4 font-serif text-2xl text-white">Link not found</h1>
        <p className="mt-3 text-sm text-zinc-400">This tracking link is invalid or has expired.</p>
        <Link href="/" className="mt-8 text-sm text-amber-200/90 hover:text-amber-100">
          Return home
        </Link>
      </main>
    );
  }

  const trip = await getTripForTracking(tripId);

  if (!trip) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16 text-center">
        <h1 className="font-serif text-2xl text-white">Trip not found</h1>
        <Link href="/" className="mt-8 text-sm text-amber-200/90">
          Return home
        </Link>
      </main>
    );
  }

  const current = stepIndex(trip.status);
  const cancelled = trip.status === TripStatus.CANCELLED;
  const when = new Date(trip.scheduledAt).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const showLiveMap = !cancelled && trip.status !== TripStatus.COMPLETED;

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-zinc-200">
      <div className="mx-auto max-w-lg px-6 py-12">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-200/70">
          HiTouch Luxury Charter
        </p>
        <h1 className="mt-3 text-center font-serif text-2xl text-white">Your chauffeur</h1>
        <p className="mt-2 text-center text-sm text-zinc-400">{when}</p>

        {showLiveMap ? (
          <div className="mt-8">
            <PassengerTripTracker
              token={token}
              initialStatus={trip.status}
              chauffeurName={trip.chauffeur?.name ?? null}
            />
          </div>
        ) : null}

        <div className={`rounded-xl border border-white/10 bg-white/[0.04] p-6 ${showLiveMap ? "mt-6" : "mt-10"}`}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Status</p>
          <p className="mt-2 font-serif text-xl text-amber-100">
            {cancelled ? "Ride cancelled" : formatTripStatus(trip.status)}
          </p>

          {!cancelled ? (
            <ol className="mt-8 space-y-3">
              {STEPS.map((step, i) => {
                const done = i < current;
                const active = i === current;
                return (
                  <li
                    key={step}
                    className={`flex items-center gap-3 text-sm ${
                      done ? "text-emerald-300/90" : active ? "text-white" : "text-zinc-600"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        done
                          ? "bg-emerald-500/30"
                          : active
                            ? "bg-amber-400/30 ring-1 ring-amber-300/50"
                            : "bg-white/5"
                      }`}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    {formatTripStatus(step)}
                  </li>
                );
              })}
            </ol>
          ) : null}
        </div>

        <div className="mt-6 space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Pickup</p>
            <p className="mt-1 text-white">{trip.pickupLabel}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Dropoff
            </p>
            <p className="mt-1 text-white">{trip.dropoffLabel}</p>
          </div>
          {trip.chauffeur?.name ? (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Chauffeur
              </p>
              <p className="mt-1 text-white">{trip.chauffeur.name}</p>
            </div>
          ) : null}
          {trip.corporateCompany?.name ? (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Account
              </p>
              <p className="mt-1 text-white">{trip.corporateCompany.name}</p>
            </div>
          ) : null}
        </div>

        <p className="mt-8 text-center text-xs text-zinc-600">
          Map updates automatically while your chauffeur has this trip open on their phone.
        </p>
        <p className="mt-4 text-center">
          <Link href="/" className="text-sm text-amber-200/80 hover:text-amber-100">
            hitouchluxurycharter.com
          </Link>
        </p>
      </div>
    </main>
  );
}
