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

function joinList(value) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean).join(", ") || "—";
  const t = String(value ?? "").trim();
  return t || "—";
}

function Detail({ label, children }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200/70">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-zinc-200">{children}</dd>
    </div>
  );
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
        <p className="mt-1 text-sm text-zinc-400">
          Synced from Airtable Experience Leads. Expand a card for the full itinerary.
        </p>
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

      <div className="space-y-4">
        {rows.map((r) => {
          const p =
            r.payload && typeof r.payload === "object" && !Array.isArray(r.payload) ? r.payload : {};
          const name = `${String(r.firstName ?? "").trim()} ${String(r.lastName ?? "").trim()}`.trim();
          return (
            <article
              key={String(r.id)}
              className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02]"
            >
              <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200/70">
                    {fmtDate(r.createdAt)}
                    {p.inquiryType ? ` · ${String(p.inquiryType)}` : ""}
                  </p>
                  <h3 className="font-serif text-lg text-white">{name || "Guest"}</h3>
                  <p className="text-sm text-zinc-400">
                    {String(r.serviceInterest || p.experienceTitle || "Custom request")}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs">
                    <a
                      className="text-amber-200/90 underline-offset-2 hover:underline"
                      href={`mailto:${r.email}`}
                    >
                      {String(r.email ?? "")}
                    </a>
                    <a
                      className="text-amber-200/90 underline-offset-2 hover:underline"
                      href={`tel:${String(r.phone ?? "").replace(/\s/g, "")}`}
                    >
                      {String(r.phone ?? "")}
                    </a>
                  </div>
                </div>
                <LeadRowActions
                  scope="experience"
                  id={String(r.id)}
                  status={String(r.status ?? "pending")}
                  reviewedAt={r.reviewedAt ? String(r.reviewedAt) : null}
                />
              </div>

              <details className="group">
                <summary className="cursor-pointer list-none px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 transition hover:text-amber-100 [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex items-center gap-2">
                    <span className="text-accent transition group-open:rotate-90" aria-hidden>
                      ▸
                    </span>
                    Full itinerary
                  </span>
                </summary>
                <dl className="grid gap-5 border-t border-white/10 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
                  <Detail label="Experience">
                    {joinList(p.experienceTitle || p.experienceSlug)}
                  </Detail>
                  <Detail label="Occasions">{joinList(p.occasions)}</Detail>
                  <Detail label="Occasion other">{joinList(p.occasionOther)}</Detail>
                  <Detail label="Service">{joinList(r.serviceInterest || p.serviceInterest)}</Detail>
                  <Detail label="Service other">{joinList(p.serviceOther)}</Detail>
                  <Detail label="Guests">{joinList(p.guestCount)}</Detail>
                  <Detail label="Pickup">
                    {joinList([r.pickupDate || p.pickupDate, r.pickupTime || p.pickupTime].filter(Boolean))}
                  </Detail>
                  <Detail label="Return">
                    {joinList([p.returnDate, p.returnTime].filter(Boolean))}
                  </Detail>
                  <Detail label="Driver wait">{joinList(p.driverWait)}</Detail>
                  <Detail label="Pickup address">{joinList(r.pickupAddress || p.pickupAddress)}</Detail>
                  <Detail label="Destination">
                    {joinList(r.destinationAddress || p.destinationAddress)}
                  </Detail>
                  <Detail label="Large bags">{joinList(p.largeBagsCount)}</Detail>
                  <Detail label="Accommodations">{joinList(p.accommodations)}</Detail>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <Detail label="Trip details">{joinList(p.tripDetails)}</Detail>
                  </div>
                </dl>
              </details>
            </article>
          );
        })}
      </div>
    </div>
  );
}
