import Link from "next/link";
import { conciergeStatus } from "@/content/home";

export function SiteFooter({ site: s }) {
  return (
    <footer className="border-t border-white/10 bg-charcoal-footer text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 rounded-[var(--radius-card)] border border-white/10 bg-midnight/50 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
              {conciergeStatus.label}
            </p>
            <a
              href={`tel:${s.phoneTel}`}
              className="mt-2 block font-serif text-2xl tracking-tight text-heading sm:text-3xl"
            >
              {s.phoneDisplay}
            </a>
          </div>
          <div className="flex max-w-md items-start gap-3 sm:items-center">
            <span className="relative mt-1 flex h-2.5 w-2.5 shrink-0 sm:mt-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/35 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <div>
              <p className="text-sm font-semibold text-heading">
                {conciergeStatus.state === "available" ? "Routing desk online" : "Routing desk"}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-charcoal">{conciergeStatus.detail}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-serif text-2xl tracking-tight text-heading">{s.brandName}</p>
            <p className="mt-2 text-sm text-accent-readable/95">{s.tagline}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal">
              {s.coverageBlurb}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[var(--tracking-brand)] text-accent-readable/95">
              {s.partnerNote}
            </p>
          </div>
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
              Company
            </p>
            <ul className="mt-4 space-y-2 text-sm text-charcoal">
              {s.footerCompany.map((l) => (
                <li key={l.href}>
                  <Link className="hover:text-accent-readable" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
              Experiences
            </p>
            <ul className="mt-4 space-y-2 text-sm text-charcoal">
              <li>
                <Link className="hover:text-accent-readable" href="/services">
                  Service catalog
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent-readable" href="/experiences">
                  Curated experiences
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent-readable" href="/experience-request">
                  Custom experience request
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent-readable" href="/book">
                  Reserve & price inquiry
                </Link>
              </li>
              <li>
                <a
                  className="hover:text-accent-readable"
                  href={s.moovsBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserve online
                </a>
              </li>
              <li>
                <Link className="hover:text-accent-readable" href="/fleet">
                  Fleet
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent-readable" href="/corporate">
                  Corporate accounts
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent-readable" href="/login?mode=corporate">
                  Corporate client sign-in
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent-readable" href="/events">
                  Event coordination
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
              Connect
            </p>
            <ul className="mt-4 space-y-3 text-sm text-charcoal">
              <li>
                <a className="hover:text-accent-readable" href={`tel:${s.phoneTel}`}>
                  {s.phoneDisplay}
                </a>
              </li>
              <li>
                <a className="hover:text-accent-readable" href={`mailto:${s.email}`}>
                  {s.email}
                </a>
              </li>
              <li>
                {s.city}, {s.region}
                <br />
                {s.country}
              </li>
              <li>
                <a
                  className="underline decoration-accent/50 underline-offset-4 hover:text-accent-readable"
                  href={s.moovsBookingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Reserve online
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-charcoal/90 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {s.brandName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {s.footerLegal.map((l) => (
              <Link key={l.href} className="hover:text-accent-readable" href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <p className="max-w-xl text-charcoal/80 lg:text-right">
            Licensed, insured chauffeur service. Executive protection details available upon
            request and subject to jurisdictional compliance.
          </p>
        </div>
      </div>
    </footer>
  );
}
