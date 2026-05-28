import { BookingInquiryActions } from "@/components/admin/booking-inquiry-actions";
import { listBookingInquiriesForAdmin } from "@/lib/booking/inquiry-admin";

export const dynamic = "force-dynamic";

const STATUS_LABELS = {
  CONTACT_CAPTURED: "Contact only",
  QUOTED: "Quoted",
  COMPLETED: "Completed",
  ABANDONED: "Abandoned",
};

export default async function AdminBookingInquiriesPage() {
  let inquiries = [];
  let error = null;

  try {
    inquiries = await listBookingInquiriesForAdmin();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load booking inquiries.";
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-xl text-white">Booking inquiries</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Leads from the <code className="text-zinc-300">/book</code> wizard. Convert quoted runs to
          trips for dispatch — no Moovs API required for demo.
        </p>
      </div>

      {error ? (
        <p className="rounded-md border border-red-500/35 bg-red-950/35 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Trip / quote</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {inquiries.map((row) => {
              const updated = new Date(row.updatedAt).toLocaleString();
              const trip =
                row.tripPayload && typeof row.tripPayload === "object" && !Array.isArray(row.tripPayload)
                  ? row.tripPayload
                  : null;
              const quote =
                row.quoteSummary && typeof row.quoteSummary === "object" && !Array.isArray(row.quoteSummary)
                  ? row.quoteSummary
                  : null;
              const canConvert = Boolean(trip?.pickupAddress && trip?.destinationAddress);

              return (
                <tr key={row.id} className="text-zinc-300">
                  <td className="px-4 py-3 text-xs text-zinc-500 whitespace-nowrap">{updated}</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-200/90">
                      {STATUS_LABELS[row.status] ?? row.status}
                    </span>
                    <p className="mt-1 text-[10px] text-zinc-600">Step: {row.lastStep}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white">{row.contactName}</p>
                    <p className="text-xs text-zinc-500">{row.email}</p>
                    <p className="text-xs text-zinc-500">{row.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-400">
                    {trip ? (
                      <>
                        <p>
                          {trip.pickupAddress} → {trip.destinationAddress}
                        </p>
                        <p className="mt-1 text-zinc-500">
                          {trip.pickupDate} {trip.pickupTime} · {trip.vehicleClass}
                        </p>
                      </>
                    ) : (
                      <p className="text-zinc-600">No trip step yet</p>
                    )}
                    {quote?.totalDisplay ? (
                      <p className="mt-1 text-amber-200/80">Quote: {String(quote.totalDisplay)}</p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <BookingInquiryActions inquiryId={row.id} canConvert={canConvert} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {inquiries.length === 0 && !error ? (
          <p className="px-4 py-8 text-center text-sm text-zinc-500">
            No inquiries yet. Run <code className="text-zinc-400">npm run seed:all</code> or complete{" "}
            <code className="text-zinc-400">/book</code>.
          </p>
        ) : null}
      </div>
    </div>
  );
}
