import { LeadRowActions } from "@/components/admin/lead-row-actions";
import { membershipNeedOptions, travelFrequencyOptions } from "@/content/membership-form";
import { membershipTiers } from "@/content/memberships";
import { listMembershipApplications } from "@/lib/lead-storage";

const tierLabels = new Map(membershipTiers.map((t) => [t.id, t.name]));
const frequencyLabels = new Map(travelFrequencyOptions.map((o) => [o.value, o.label]));
const needLabels = new Map(membershipNeedOptions.map((o) => [o.value, o.label]));

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
  title: "Membership applications",
  robots: { index: false, follow: false },
};

export default async function AdminMembershipsPage() {
  let rows = [];
  let error = null;
  try {
    rows = await listMembershipApplications();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load membership applications.";
  }

  const foundingCount = rows.filter((r) => r.foundingInterest).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl text-white">Membership applications</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Newest first. {foundingCount} applicant{foundingCount === 1 ? "" : "s"} flagged for
          Founding Membership (five available).
        </p>
      </div>

      {error ? (
        <p className="rounded-md border border-red-500/35 bg-red-950/35 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      {rows.length === 0 && !error ? (
        <p className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-zinc-400">
          No applications yet.
        </p>
      ) : null}

      {rows.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04] text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">Travel</th>
                <th className="px-4 py-3">Needs</th>
                <th className="px-4 py-3">Notes</th>
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
                    <span className="block font-medium text-white">{String(r.contactName ?? "")}</span>
                    {r.company ? (
                      <span className="mt-1 block text-xs text-zinc-400">{String(r.company)}</span>
                    ) : null}
                    {r.city ? (
                      <span className="mt-1 block text-xs text-zinc-500">{String(r.city)}</span>
                    ) : null}
                  </td>
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
                  <td className="px-4 py-3 text-xs">
                    <span className="block text-zinc-200">
                      {tierLabels.get(String(r.membershipType)) ?? String(r.membershipType)}
                    </span>
                    {r.foundingInterest ? (
                      <span className="mt-1.5 inline-block rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-100 ring-1 ring-amber-500/30">
                        Founding
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-400">
                    {frequencyLabels.get(String(r.travelFrequency)) ?? "—"}
                    {r.currentProvider ? (
                      <div className="mt-1.5 text-zinc-500">
                        Today: {trunc(r.currentProvider, 40)}
                      </div>
                    ) : null}
                  </td>
                  <td className="max-w-[14rem] px-4 py-3 text-xs text-zinc-400">
                    {Array.isArray(r.primaryNeeds) && r.primaryNeeds.length > 0 ? (
                      <ul className="space-y-1">
                        {r.primaryNeeds.map((need) => (
                          <li key={String(need)}>
                            {needLabels.get(String(need)) ?? String(need)}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="max-w-xs px-4 py-3 text-xs text-zinc-400">{trunc(r.notes, 180)}</td>
                  <td className="min-w-[9rem] px-4 py-3">
                    <LeadRowActions
                      scope="membership"
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
