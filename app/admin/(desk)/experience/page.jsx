import { listExperienceLeads } from "@/lib/lead-storage";
import { LeadRowActions } from "@/components/admin/lead-row-actions";

function fmtDate(value) {
  if (!value) return "—";
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return String(value);
  }
}

function trunc(s, max) {
  const t = String(s ?? "").trim();
  if (!t) return "—";
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

/** @type {import("next").Metadata} */
export const metadata = {
  title: "Experience requests",
  robots: { index: false, follow: false },
};

export default async function AdminExperiencePage() {
  let rows = [];
  let error = null;
  try {
    rows = await listExperienceLeads();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load experience requests.";
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl text-white">Luxury experience requests</h2>
        <p className="mt-1 text-sm text-zinc-400">Newest first. Full itinerary lives in each row.</p>
      </div>
      {error ? (
        <p className="rounded-md border border-red-500/35 bg-red-950/35 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}
      {rows.length === 0 && !error ? (
        <p className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-zinc-400">
          No submissions yet.
        </p>
      ) : null}
      {rows.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[960px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04] text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Pickup</th>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Request</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={String(r.id)} className="border-b border-white/5 align-top text-zinc-200 last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-400">{fmtDate(r.createdAt)}</td>
                  <td className="px-4 py-3 font-medium text-white">
                    {String(r.firstName ?? "").trim()} {String(r.lastName ?? "").trim()}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <a className="text-amber-200/90 underline-offset-2 hover:underline" href={`mailto:${r.email}`}>
                      {String(r.email ?? "")}
                    </a>
                    <div className="mt-1">
                      <a
                        className="text-amber-200/90 underline-offset-2 hover:underline"
                        href={`tel:${String(r.phone ?? "").replace(/\s/g, "")}`}
                      >
                        {String(r.phone ?? "")}
                      </a>
                    </div>
                  </td>
                  <td className="max-w-[8rem] px-4 py-3 text-xs text-zinc-400">
                    {trunc(r.serviceInterest, 24)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-400">
                    {String(r.pickupDate ?? "")} {String(r.pickupTime ?? "")}
                  </td>
                  <td className="max-w-xs px-4 py-3 text-xs text-zinc-400">
                    <span className="block">{trunc(r.pickupAddress, 80)}</span>
                    <span className="mt-1 block text-zinc-500">→ {trunc(r.destinationAddress, 80)}</span>
                  </td>
                  <td className="min-w-[9rem] px-4 py-3">
                    <LeadRowActions
                      scope="experience"
                      id={String(r.id)}
                      status={String(r.status ?? "pending")}
                      reviewedAt={r.reviewedAt ? String(r.reviewedAt) : null}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
