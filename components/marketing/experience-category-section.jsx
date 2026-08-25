import Image from "next/image";
import Link from "next/link";
import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";

/**
 * One experience category (GAME DAY, ESCAPE, WELLNESS, LEISURE, SIGNATURE)
 * with a card per experience linking to its own landing page.
 */
export function ExperienceCategorySection({ category, light = true, index = 0 }) {
  const titleClass = light ? "text-light-ink" : "text-heading";
  const bodyClass = light ? "text-light-muted" : "text-on-dark-body";
  const items = category.items ?? [];

  return (
    <section id={category.slug} className="scroll-mt-28">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <LuxuryEyebrow light={light}>
            {String(index + 1).padStart(2, "0")} · {category.displayName}
          </LuxuryEyebrow>
          <h2 className={`luxury-display mt-5 text-3xl sm:text-4xl ${titleClass}`}>
            {category.tagline}
          </h2>
          <p className={`mt-5 text-sm leading-relaxed sm:text-base ${bodyClass}`}>
            {category.blurb}
          </p>
        </div>
        {category.id === "game-day" ? (
          <Link
            href={category.hubPath}
            className={`shrink-0 text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] underline decoration-accent/50 underline-offset-4 ${
              light ? "text-light-ink" : "text-accent-readable"
            }`}
          >
            All game day experiences &rarr;
          </Link>
        ) : null}
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.slug} className="flex">
            <Link href={item.href} className="luxury-image-card group flex w-full flex-col bg-midnight/85">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 image-caption-scrim" />
                {item.status === "by-request" ? (
                  <span className="absolute right-4 top-4 rounded-full border border-accent/40 bg-midnight/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
                    By request
                  </span>
                ) : null}
                <p className="absolute bottom-4 left-5 right-5 font-serif text-xl text-heading text-hero-shadow sm:text-2xl">
                  {item.title}
                </p>
              </div>
              <div className="flex flex-1 flex-col border-t border-white/10 bg-gradient-to-b from-surface/50 to-midnight p-5 sm:p-6">
                <p className="flex-1 text-sm leading-relaxed text-on-dark-body">{item.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
                  Explore
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
