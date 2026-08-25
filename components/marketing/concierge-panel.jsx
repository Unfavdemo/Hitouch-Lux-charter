import { conciergeIntro, conciergeServices } from "@/content/concierge";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";

/**
 * HiTouch Concierge — service grid introduced throughout the Experiences section.
 * Render inside a MarketingPageSection (pass light=false for dark tones).
 */
export function ConciergePanel({ light = true, headline, supporting }) {
  const cardClass = light
    ? "rounded-[var(--radius-card)] border border-light-ink/10 bg-paper/80 p-6"
    : "rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm";
  const titleClass = light ? "text-light-ink" : "text-heading";
  const bodyClass = light ? "text-light-muted" : "text-on-dark-body";

  return (
    <div>
      <MarketingSectionHeading
        eyebrow={conciergeIntro.eyebrow}
        title={headline ?? conciergeIntro.headline}
        description={supporting ?? conciergeIntro.supporting}
        light={light}
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {conciergeServices.map((service) => (
          <div key={service.id} className={cardClass}>
            <div className="h-px w-8 bg-gradient-to-r from-accent/90 to-transparent" aria-hidden />
            <h3 className={`mt-4 text-[13px] font-semibold uppercase tracking-[var(--tracking-brand)] ${titleClass}`}>
              {service.title}
            </h3>
            <p className={`mt-3 text-sm leading-relaxed ${bodyClass}`}>{service.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
