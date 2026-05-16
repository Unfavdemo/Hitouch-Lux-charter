import { CorporatePortalGrantControls } from "@/components/admin/corporate-portal-grant-controls";
import { LeadRowActions } from "@/components/admin/lead-row-actions";
import { getActivePortalGrantLeadIdSet } from "@/lib/corporate-portal-storage";
import { listCorporateLeads } from "@/lib/lead-storage";

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

export default async function AdminCorporatePage() {
  let rows = [];
  let error = null;
  try {
    rows = await listCorporateLeads();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load corporate leads.";
  }

  let portalLeadIds = new Set();
  try {
    portalLeadIds = await getActivePortalGrantLeadIdSet();
  } catch {
    /* portal storage unavailable */
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl text-white">Corporate leads</h2>
        <p className="mt-1 text-sm text-zinc-400">Newest first.</p>
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
          <table className="w-full min-w-[880px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04] text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Invoicing</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3">Portal</th>
                <th className="px-4 py-3">Request</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                return (
                  <tr key={String(r.id)} className="border-b border-white/5 align-top text-zinc-200 last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-400">
                      {fmtDate(r.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{String(r.company ?? "")}</td>
                    <td className="px-4 py-3">{String(r.contactName ?? "")}</td>
                    <td className="px-4 py-3">
                      <a className="text-amber-200/90 underline-offset-2 hover:underline" href={`mailto:${r.email}`}>
                        {String(r.email ?? "")}
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <a
                        className="text-amber-200/90 underline-offset-2 hover:underline"
                        href={`tel:${String(r.phone ?? "").replace(/\s/g, "")}`}
                      >
                        {String(r.phone ?? "")}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-400">{String(r.invoicing ?? "")}</td>
                    <td className="max-w-xs px-4 py-3 text-xs text-zinc-400">
                      {(String(r.profileNotes ?? "").trim() || "—")}
                    </td>
                    <td className="min-w-[7rem] px-4 py-3">
                      <CorporatePortalGrantControls
                        leadId={String(r.id)}
                        hasGrant={portalLeadIds.has(String(r.id))}
                      />
                    </td>
                    <td className="min-w-[9rem] px-4 py-3">
                      <LeadRowActions
                        scope="corporate"
                        id={String(r.id)}
                        status={String(r.status ?? "pending")}
                        reviewedAt={r.reviewedAt ? String(r.reviewedAt) : null}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
