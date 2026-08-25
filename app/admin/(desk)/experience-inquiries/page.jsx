import { LeadRowActions } from "@/components/admin/lead-row-actions";
import { listExperienceInquiries } from "@/lib/lead-storage";

function fmtDate(value) {
  if (!value) return "—";
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
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
  title: "Experience inquiries",
  robots: { index: false, follow: false },
};

export default async function AdminExperienceInquiriesPage() {
  let rows = [];
  let error = null;
  try {
    rows = await listExperienceInquiries();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load experience inquiries.";
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl text-white">Experience landing page inquiries</h2>
        <p className="mt-1 text-sm text-zinc-400">
          One row per inquiry form submitted from an individual experience page. Newest first.
        </p>
      </div>

      {error ? (
        <p className="rounded-md border border-red-500/35 bg-red-950/35 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      {rows.length === 0 && !error ? (
        <p className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-zinc-400">
          No inquiries yet.
        </p>
      ) : null}

      {rows.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04] text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Date / guests</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={String(r.id)}
                  className="border-b border-white/5 align-top text-zinc-200 last:border-0"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-400">
                    {fmtDate(r.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="block font-medium text-white">{String(r.experienceName)}</span>
                    <span className="mt-1 block text-[10px] uppercase tracking-wider text-amber-200/70">
                      {String(r.categoryName)}
                    </span>
                    {r.sourcePath ? (
                      <a
                        className="mt-1 block text-[10px] text-zinc-500 underline-offset-2 hover:underline"
                        href={String(r.sourcePath)}
                      >
                        {String(r.sourcePath)}
                      </a>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{String(r.contactName ?? "")}</td>
                  <td className="px-4 py-3 text-xs">
                    <a
                      className="text-amber-200/90 underline-offset-2 hover:underline"
                      href={`mailto:${r.email}`}
                    >
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
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-400">
                    {r.preferredDate ? String(r.preferredDate) : "Flexible"}
                    <div className="mt-1">
                      {r.guestCount ? `${r.guestCount} guests` : "Guests TBD"}
                    </div>
                  </td>
                  <td className="max-w-sm px-4 py-3 text-xs text-zinc-400">
                    <span className="block">{trunc(r.details, 160)}</span>
                    {Array.isArray(r.conciergeAddOns) && r.conciergeAddOns.length > 0 ? (
                      <ul className="mt-2 space-y-1 text-[10px] text-amber-200/70">
                        {r.conciergeAddOns.map((addOn) => (
                          <li key={String(addOn)}>+ {String(addOn)}</li>
                        ))}
                      </ul>
                    ) : null}
                  </td>
                  <td className="min-w-[9rem] px-4 py-3">
                    <LeadRowActions
                      scope="experience-inquiry"
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
