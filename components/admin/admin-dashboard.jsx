import Link from "next/link";

function StatCard({ label, value, hint, href, accent }) {
  const inner = (
    <>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
      <p className={`mt-2 font-serif text-3xl tabular-nums ${accent ? "text-amber-200" : "text-white"}`}>
        {value}
      </p>
      {hint ? <p className="mt-2 text-xs text-zinc-400">{hint}</p> : null}
    </>
  );

  const className =
    "block rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 transition hover:border-amber-200/30 hover:from-white/[0.08]";

  return href ? (
    <Link href={href} className={className}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  );
}

function SectionHeading({ title, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <h2 className="font-serif text-lg text-white">{title}</h2>
      {action}
    </div>
  );
}

function typeBadge(type) {
  const styles = {
    corporate: "bg-sky-500/15 text-sky-200",
    events: "bg-violet-500/15 text-violet-200",
    experience: "bg-rose-500/15 text-rose-200",
  };
  const labels = { corporate: "Corporate", events: "Event", experience: "Experience" };
  return (
    <span
      className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${styles[type]}`}
    >
      {labels[type]}
    </span>
  );
}

export function AdminDashboard({ data, error }) {
  const { leads, ops, tripByStatus, upcomingTrips, recentIntake, pendingLeads } = data;
  const maxPipeline = Math.max(1, ...tripByStatus.map((s) => s.count));

  return (
    <div className="space-y-10">
      {error ? (
        <p className="rounded-md border border-red-500/35 bg-red-950/35 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/80">
            Today · {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            {ops
              ? `${ops.inProgressTrips} live on the road · ${ops.pendingIntake} calls to review`
              : `${leads.pendingTotal} leads awaiting review`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/trips"
            className="rounded-md bg-amber-200/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-black hover:bg-amber-200"
          >
            New trip
          </Link>
          <Link
            href="/admin/dispatch"
            className="rounded-md border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-200 hover:border-amber-200/40"
          >
            Live map
          </Link>
          <Link
            href="/admin/intake"
            className="rounded-md border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-200 hover:border-amber-200/40"
          >
            Intake queue
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Pending leads"
          value={leads.pendingTotal}
          hint={`${leads.corporate} corporate · ${leads.events} events · ${leads.experience} experience`}
          href="/admin/corporate"
          accent={leads.pendingTotal > 0}
        />
        {ops ? (
          <>
            <StatCard
              label="Active trips"
              value={ops.activeTrips}
              hint={`${ops.tripsToday} scheduled today`}
              href="/admin/trips"
              accent={ops.inProgressTrips > 0}
            />
            <StatCard
              label="Live on road"
              value={ops.inProgressTrips}
              hint={`${ops.completedToday} completed today`}
              href="/admin/trips"
              accent={ops.inProgressTrips > 0}
            />
            <StatCard
              label="Smith intake"
              value={ops.pendingIntake}
              hint={`${ops.chauffeurs} chauffeurs on roster`}
              href="/admin/intake"
              accent={ops.pendingIntake > 0}
            />
            <StatCard
              label="/book inquiries"
              value={ops.openBookingInquiries}
              hint="Quoted & abandoned — convert to trips"
              href="/admin/booking-inquiries"
              accent={ops.openBookingInquiries > 0}
            />
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5 sm:col-span-3">
            <p className="text-sm text-zinc-400">
              Set <code className="text-zinc-200">DATABASE_URL</code> to enable trip tracking, intake
              queue, and live operations metrics.
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <section className="space-y-4 lg:col-span-2">
          <SectionHeading
            title="Trip pipeline"
            action={
              <Link href="/admin/trips" className="text-xs text-amber-200/90 hover:underline">
                View all
              </Link>
            }
          />
          {!ops ? (
            <p className="text-sm text-zinc-500">Requires database.</p>
          ) : (
            <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              {tripByStatus.map((row) => (
                <div key={row.status}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-zinc-400">{row.label}</span>
                    <span className="tabular-nums font-medium text-zinc-200">{row.count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-black/40">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-200/80 to-amber-400/60 transition-all"
                      style={{ width: `${Math.max(row.count > 0 ? 8 : 0, (row.count / maxPipeline) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4 lg:col-span-3">
          <SectionHeading
            title="Active & upcoming trips"
            action={
              <Link href="/admin/trips" className="text-xs text-amber-200/90 hover:underline">
                Trip desk
              </Link>
            }
          />
          {!ops || upcomingTrips.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center text-sm text-zinc-500">
              {ops ? "No active trips on the board." : "Requires database."}
            </p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.04] text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-4 py-3">When</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Route</th>
                    <th className="hidden px-4 py-3 sm:table-cell">Chauffeur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {upcomingTrips.map((trip) => (
                    <tr key={trip.id} className="bg-white/[0.02] hover:bg-white/[0.04]">
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-400">
                        {trip.scheduledAt.toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-amber-200/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-200/90">
                          {trip.statusLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-zinc-200">{trip.pickupLabel}</p>
                        <p className="text-xs text-zinc-500">→ {trip.dropoffLabel}</p>
                      </td>
                      <td className="hidden px-4 py-3 text-zinc-400 sm:table-cell">
                        {trip.chauffeurName ?? (
                          <span className="text-amber-200/70">Unassigned</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-4">
          <SectionHeading
            title="Smith.ai intake"
            action={
              <Link href="/admin/intake" className="text-xs text-amber-200/90 hover:underline">
                Open queue
              </Link>
            }
          />
          {recentIntake.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-6 text-sm text-zinc-500">
              No pending call submissions.
            </p>
          ) : (
            <ul className="space-y-2">
              {recentIntake.map((item) => (
                <li
                  key={item.id}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <div className="flex justify-between gap-2">
                    <p className="font-medium text-white">{item.name}</p>
                    <time className="shrink-0 text-[10px] text-zinc-500">
                      {item.createdAt.toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                  {item.companyName ? (
                    <p className="mt-0.5 text-xs text-zinc-500">{item.companyName}</p>
                  ) : null}
                  {item.notesSnippet ? (
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">{item.notesSnippet}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-4">
          <SectionHeading
            title="Leads to review"
            action={
              <Link href="/admin/corporate" className="text-xs text-amber-200/90 hover:underline">
                All leads
              </Link>
            }
          />
          {pendingLeads.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-6 text-sm text-zinc-500">
              No pending lead submissions.
            </p>
          ) : (
            <ul className="space-y-2">
              {pendingLeads.map((lead) => (
                <li key={`${lead.type}-${lead.id}`}>
                  <Link
                    href={lead.href}
                    className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-amber-200/25 hover:bg-white/[0.05]"
                  >
                    {typeBadge(lead.type)}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-white">{lead.title}</p>
                      <p className="truncate text-xs text-zinc-500">{lead.subtitle}</p>
                    </div>
                    <time className="shrink-0 text-[10px] text-zinc-600">
                      {lead.createdAt.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <p className="text-xs text-zinc-600">
        Storage: <span className="text-zinc-400">{data.storageMode}</span>
        {data.storageMode === "file" ? " — configure DATABASE_URL for production operations." : null}
      </p>
    </div>
  );
}
