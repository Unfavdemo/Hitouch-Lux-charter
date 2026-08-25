import { founderStory, philosophyQuote } from "@/content/brand";
import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";

/** Short founder story explaining why HiTouch exists, plus the philosophy. */
export function FounderStory({ light = true, headingLevel: Heading = "h2" }) {
  const titleClass = light ? "text-light-ink" : "text-heading";
  const bodyClass = light ? "text-light-muted" : "text-on-dark-body";
  const panelClass = light ? "luxury-card-light" : "luxury-card-dark";

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <LuxuryEyebrow light={light}>{founderStory.eyebrow}</LuxuryEyebrow>
        <Heading className={`luxury-display mt-6 text-3xl sm:text-4xl lg:text-[2.65rem] ${titleClass}`}>
          {founderStory.headline}
        </Heading>
        <div className="mt-6 h-px w-14 bg-gradient-to-r from-accent/90 to-transparent" aria-hidden />
        <div className={`mt-8 space-y-5 text-sm leading-relaxed sm:text-base ${bodyClass}`}>
          {founderStory.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <p className={`mt-8 font-serif text-xl tracking-tight sm:text-2xl ${titleClass}`}>
          {founderStory.closingLine}
        </p>
      </div>

      <div className="lg:col-span-5">
        <figure className={`${panelClass} h-full p-8 sm:p-10`}>
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/[0.09] blur-3xl"
            aria-hidden
          />
          <span
            className="relative block font-serif text-6xl leading-none text-accent/40"
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote
            className={`relative -mt-4 font-serif text-2xl leading-[1.3] tracking-tight sm:text-[1.75rem] ${titleClass}`}
          >
            {philosophyQuote.quote}
          </blockquote>
          <figcaption
            className={`relative mt-8 text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] ${
              light ? "text-accent" : "text-accent-readable"
            }`}
          >
            {philosophyQuote.attribution}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
