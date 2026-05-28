"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden strokeWidth="1.5" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

export function SiteNav({
  brandName,
  brandNameNav = brandName,
  links,
  phoneTel,
  phoneDisplay,
  primaryCta,
  signInCta,
  externalBookingUrl,
}) {
  const ctaHref = primaryCta?.href ?? externalBookingUrl;
  const ctaLabel = primaryCta?.label ?? "Book now";
  const ctaExternal = Boolean(primaryCta?.href && !primaryCta.href.startsWith("/"));
  const signInHref = signInCta?.href ?? "/login";
  const signInLabel = signInCta?.label ?? "Sign in";
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [solid, setSolid] = useState(!isHome);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const shell = solid
    ? "border-b border-border-subtle bg-page/95 shadow-sm backdrop-blur-md"
    : "bg-transparent";

  const brandClass = solid
    ? "font-serif text-lg tracking-tight text-heading sm:text-xl"
    : "font-serif text-lg tracking-tight text-heading drop-shadow-[0_1px_14px_rgba(0,0,0,0.95)] sm:text-xl";

  const desktopLinkClass = solid
    ? "text-[11px] font-medium uppercase tracking-[0.12em] text-charcoal transition-colors hover:text-heading"
    : "text-[11px] font-medium uppercase tracking-[0.12em] text-heading drop-shadow-[0_1px_8px_rgba(0,0,0,0.75)] transition-colors hover:text-accent-readable";

  const menuBtnClass = solid
    ? "inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle text-heading"
    : "inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 text-heading drop-shadow-[0_1px_10px_rgba(0,0,0,0.85)]";

  const barClass = solid ? "block h-0.5 w-5 bg-heading" : "block h-0.5 w-5 bg-heading drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]";

  const dividerClass = solid ? "bg-border-subtle" : "bg-white/12";

  const phoneClass = solid
    ? "inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-[11px] font-medium tabular-nums tracking-wide text-heading transition-colors hover:border-border-subtle hover:bg-surface/60"
    : "inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-1.5 text-[11px] font-medium tabular-nums tracking-wide text-heading drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] transition-colors hover:border-white/25 hover:bg-white/10";

  const ctaButtonClass =
    "inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_1px_0_rgba(255,255,255,0.25)_inset] transition-[filter,transform] hover:brightness-105 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const signInButtonClass = solid
    ? "inline-flex shrink-0 items-center justify-center rounded-full border border-border-subtle bg-transparent px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-heading transition-colors hover:border-heading/30 hover:bg-surface/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    : "inline-flex shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-heading drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] transition-colors hover:border-white/45 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-colors duration-300 ${shell}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 2xl:grid 2xl:grid-cols-[auto_1fr_auto] 2xl:items-center 2xl:gap-8 2xl:px-8">
        <Link
          href="/"
          className={`${brandClass} min-w-0 shrink-0`}
          title={brandName}
        >
          <span className="2xl:hidden">{brandNameNav}</span>
          <span className="hidden 2xl:inline">{brandName}</span>
        </Link>

        <nav
          className="hidden items-center justify-center gap-1 2xl:flex"
          aria-label="Primary"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${desktopLinkClass} whitespace-nowrap rounded-md px-2.5 py-2`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 2xl:flex">
          <span aria-hidden className={`h-5 w-px shrink-0 ${dividerClass}`} />
          <Link href={signInHref} className={signInButtonClass}>
            {signInLabel}
          </Link>
          {ctaExternal ? (
            <a href={ctaHref} target="_blank" rel="noopener noreferrer" className={ctaButtonClass}>
              {ctaLabel}
            </a>
          ) : (
            <Link href={ctaHref} className={ctaButtonClass}>
              {ctaLabel}
            </Link>
          )}
          <a href={`tel:${phoneTel}`} className={phoneClass} aria-label={`Call ${phoneDisplay}`}>
            <PhoneIcon className="h-3.5 w-3.5 shrink-0 opacity-70" />
            <span>{phoneDisplay}</span>
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2 2xl:hidden">
          {ctaExternal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-transparent bg-accent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink shadow-sm"
            >
              Plan
            </a>
          ) : (
            <Link
              href={ctaHref}
              className="rounded-full border border-transparent bg-accent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink shadow-sm"
            >
              Plan
            </Link>
          )}
          <a
            href={`tel:${phoneTel}`}
            className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-heading"
          >
            Call
          </a>
          <button
            type="button"
            className={menuBtnClass}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className={barClass} />
              <span className={barClass} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`2xl:hidden overflow-hidden border-border-subtle bg-page transition-[max-height,opacity] duration-300 ${
          open
            ? "pointer-events-auto max-h-[80vh] overflow-y-auto border-t opacity-100"
            : "pointer-events-none max-h-0 overflow-hidden border-t-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-0.5 px-4 py-4 sm:px-6">
          <Link
            href="/#experience"
            className="rounded-lg px-3 py-3 text-sm font-medium tracking-wide text-charcoal hover:bg-surface hover:text-heading"
            onClick={() => setOpen(false)}
          >
            Our philosophy
          </Link>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-3 text-sm font-medium tracking-wide text-charcoal hover:bg-surface hover:text-heading"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={signInHref}
            className="mt-3 inline-flex items-center justify-center rounded-full border border-border-subtle px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-heading hover:bg-surface"
            onClick={() => setOpen(false)}
          >
            {signInLabel}
          </Link>
          {ctaExternal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink"
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
            </a>
          ) : (
            <Link
              href={ctaHref}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink"
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
