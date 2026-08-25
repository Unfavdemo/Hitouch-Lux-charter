import Link from "next/link";
import { conversionPaths } from "@/content/brand";

/** The three primary conversions: book, join, or request an experience. */
export function ConversionPaths({ light = false }) {
  const cardClass = light ? "luxury-card-light" : "luxury-card-dark";
  const titleClass = light ? "text-light-ink" : "text-heading";
  const bodyClass = light ? "text-light-muted" : "text-on-dark-body";

  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {conversionPaths.map((path, index) => (
        <li key={path.id}>
          <Link
            href={path.href}
            className={`${cardClass} group flex h-full flex-col p-7 sm:p-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
          >
            <span
              className={`text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] ${
                light ? "text-accent" : "text-accent-readable"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={`mt-4 font-serif text-2xl tracking-tight ${titleClass}`}>{path.title}</h3>
            <p className={`mt-4 flex-1 text-sm leading-relaxed ${bodyClass}`}>{path.blurb}</p>
            <span
              className={`mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] ${
                light ? "text-light-ink" : "text-accent-readable"
              }`}
            >
              {path.cta}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
