import Link from "next/link";
import { BrandLogo } from "@/components/marketing/brand-logo";

export function SiteFooter({ site: s }) {
  return (
    <footer className="border-t border-white/10 bg-charcoal-footer text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Link href="/" className="inline-block">
              {s.logoSrc ? (
                <BrandLogo src={s.logoSrc} alt={s.logoAlt ?? s.brandName} className="h-20 w-auto sm:h-24" />
              ) : (
                <p className="font-serif text-xl tracking-tight text-heading sm:text-2xl">{s.brandName}</p>
              )}
            </Link>
            <p className="mt-3 text-sm text-accent-readable">{s.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-charcoal">
              <a className="hover:text-accent-readable" href={`tel:${s.phoneTel}`}>
                {s.phoneDisplay}
              </a>
              <a className="hover:text-accent-readable" href={`mailto:${s.email}`}>
                {s.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm text-charcoal">
              {s.footerExplore.map((l) => (
                <li key={l.href}>
                  <Link className="hover:text-accent-readable" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
              Company
            </p>
            <ul className="mt-3 space-y-2 text-sm text-charcoal">
              {s.footerCompany.map((l) => (
                <li key={l.href}>
                  <Link className="hover:text-accent-readable" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-charcoal sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {s.brandName}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {s.footerLegal.map((l) => (
              <Link key={l.href} className="hover:text-accent-readable" href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-charcoal">
            {s.city}, {s.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
