import Link from "next/link";
import { ExperienceInquiryForm } from "@/components/marketing/experience-inquiry-form";
import { FaqList } from "@/components/marketing/faq-list";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getExperienceBySlug, teamAffiliationDisclaimer } from "@/content/experiences";
import { site } from "@/content/site";

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

/**
 * Renders a complete experience landing page from a catalog entry. Shared by
 * /experiences/[slug] and /game-day/[slug] so every experience gets the same
 * depth of content and its own inquiry form.
 */
export function ExperienceLanding({ experience }) {
  const related = (experience.related ?? [])
    .map((slug) => getExperienceBySlug(slug))
    .filter(Boolean);
  const isGameDay = experience.categoryId === "game-day";

  return (
    <>
      <MarketingPageHero
        eyebrow={experience.eyebrow}
        title={experience.h1}
        description={experience.tagline}
        image={experience.image}
        imageAlt={experience.imageAlt}
        actions={
          <>
            <Button href="#inquire" variant="primary">
              Request this experience
            </Button>
            <Button href={`tel:${site.phoneTel}`} variant="outlineLight">
              {site.phoneDisplay}
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-light-muted lg:text-lg">
              {experience.intro.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {experience.highlights.map((h) => (
                <div key={h.title} className="luxury-card-light group p-6 sm:p-7">
                  <h3 className="font-serif text-lg tracking-tight text-light-ink sm:text-xl">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-light-muted">{h.body}</p>
                  <span
                    className="mt-6 block h-px w-8 bg-gradient-to-r from-accent/90 to-accent/20 transition-all duration-500 group-hover:w-14"
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <ExperienceInquiryForm
                experienceSlug={experience.slug}
                experienceTitle={experience.title}
                categoryName={experience.categoryName}
                conciergeAddOns={experience.conciergeAddOns}
                status={experience.status}
              />
            </div>
          </div>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="cream" borderTop>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <MarketingSectionHeading eyebrow="What's included" title="Everything in the reservation." />
            <ul className="mt-10 space-y-4">
              {experience.included.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-light-ink/90 sm:text-base">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <MarketingSectionHeading eyebrow="How the day runs" title="From first call to final door." />
            <ol className="mt-10 space-y-6">
              {experience.itinerary.map((step, index) => (
                <li key={step.label} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-xs font-semibold tabular-nums text-light-ink">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-light-ink">{step.label}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-light-muted">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="dark">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <MarketingSectionHeading
              eyebrow="HiTouch Concierge"
              title="Tell us where you want to go and how you want it to feel."
              description="Transportation is only the beginning. These additions are arranged through the same thread as your reservation, billed at cost with a transparent coordination fee."
              light={false}
            />
            <Button href="/concierge" variant="secondary" className="mt-9 border-heading/35 text-heading hover:bg-white/10">
              About HiTouch Concierge
            </Button>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {experience.conciergeAddOns.map((addOn) => (
              <li
                key={addOn}
                className="flex gap-3 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-relaxed text-on-dark-body"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{addOn}</span>
              </li>
            ))}
          </ul>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <MarketingSectionHeading eyebrow="Questions" title={`${experience.title} — frequently asked.`} />
        <div className="mt-10 max-w-3xl">
          <FaqList items={experience.faqs} light />
        </div>
        {isGameDay ? (
          <p className="mt-12 max-w-3xl rounded-[var(--radius-card)] border border-light-ink/10 bg-cream px-5 py-4 text-xs leading-relaxed text-light-muted">
            {teamAffiliationDisclaimer}
          </p>
        ) : null}
      </MarketingPageSection>

      {related.length > 0 ? (
        <MarketingPageSection tone="cream" borderTop>
          <MarketingSectionHeading eyebrow="Also consider" title="Other experiences clients pair with this one." />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Card variant="luxury" className="group h-full">
                  <Link href={item.href} className="flex h-full flex-col p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
                      {item.categoryDisplayName}
                    </p>
                    <h3 className="mt-4 font-serif text-xl tracking-tight text-light-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-light-muted">
                      {item.tagline}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-light-ink">
                      Explore
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                        &rarr;
                      </span>
                    </span>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </MarketingPageSection>
      ) : null}

      <MarketingCtaBand
        eyebrow="One call. Every detail handled."
        title="Tell us the occasion. We'll handle the details."
        description="Membership gives you priority booking, preferred pricing, and concierge support across every experience we run."
        primaryHref="#inquire"
        primaryLabel="Request this experience"
        secondaryHref="/memberships"
        secondaryLabel="Explore membership"
      />
    </>
  );
}
