import Link from "next/link";
import { Button } from "@/components/ui/button";

const placeholderTrips = [
  { principal: "Principal — PHL ▶ NYC", status: "Confirmed", window: "Thu · 14:30" },
  { principal: "Road show — Day 2", status: "Staging", window: "Fri · 08:00" },
  { principal: "After-hours return", status: "Pending", window: "Fri · 22:15" },
];

export function CorporateDashboardWireframe() {
  return (
    <div className="mt-14 overflow-hidden rounded-[var(--radius-card)] border border-border-subtle bg-midnight shadow-xl">
      <div className="border-b border-white/10 px-5 py-4 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
          Corporate client portal — preview
        </p>
        <p className="mt-1 text-sm text-charcoal">
          Wireframe of the signed-in experience for onboarded accounts.
        </p>
      </div>
      <div className="grid lg:grid-cols-[12rem_1fr]">
        <aside className="hidden border-r border-white/10 bg-page/40 p-4 lg:block">
          <nav className="space-y-2 text-xs uppercase tracking-widest text-charcoal">
            <p className="rounded-md bg-accent-soft/30 px-3 py-2 text-accent-readable">Trips</p>
            <p className="px-3 py-2">Invoices</p>
            <p className="px-3 py-2">Playbooks</p>
            <p className="px-3 py-2">Concierge</p>
          </nav>
        </aside>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-serif text-lg text-heading">Upcoming movements</h3>
            <span className="rounded-full border border-accent/30 px-3 py-1 text-[10px] uppercase tracking-widest text-accent-readable">
              NET 30 · Active
            </span>
          </div>
          <ul className="mt-5 space-y-3">
            {placeholderTrips.map((trip) => (
              <li
                key={trip.principal}
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-white/10 bg-surface/80 px-4 py-3 text-sm"
              >
                <span className="text-heading">{trip.principal}</span>
                <span className="text-charcoal">{trip.window}</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-readable">
                  {trip.status}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/login?mode=corporate" variant="primary">
              Corporate client sign-in
            </Button>
            <Link
              href="/corporate"
              className="inline-flex items-center text-sm text-charcoal underline decoration-accent/40 underline-offset-4 hover:text-heading"
            >
              Submit account intake
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
