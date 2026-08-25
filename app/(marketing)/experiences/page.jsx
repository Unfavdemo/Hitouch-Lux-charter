import { ExperienceCategorySection } from "@/components/marketing/experience-category-section";
import { FeaturedSprinterSpotlight } from "@/components/marketing/featured-sprinter-spotlight";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { conciergeServices } from "@/content/concierge";
import {
  experienceCategoriesWithItems,
  experiences,
  experiencesHero,
  experiencesIntro,
  featuredSprinter,
} from "@/content/experiences";
import { pageHeroes } from "@/content/media";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbListJsonLd, itemListJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Private experiences in Philadelphia",
  description:
    "Game day, wine country, wellness, golf, fine dining, and completely custom experiences—planned, booked, and run by HiTouch across Philadelphia and the tri-state region. Tell us the occasion; we handle the details.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  const listItems = experiences.map((e) => ({
    name: e.title,
    description: e.tagline,
    url: e.href,
  }));

  return (
    <>
      <JsonLdScript
        data={[
          itemListJsonLd({ name: "HiTouch private experiences", items: listItems }),
          breadcrumbListJsonLd([
            { name: "Home", path: "/" },
            { name: "Private Experiences", path: "/experiences" },
          ]),
        ]}
      />
      <MarketingPageHero
        eyebrow={experiencesHero.eyebrow}
        title={experiencesHero.headline}
        description={experiencesHero.supporting}
        image={pageHeroes.experiences}
        imageAlt="Calm spa treatment room prepared for a guest"
        actions={
          <>
            <Button href="/experience-request" variant="primary">
              Request your experience
            </Button>
            <Button href="/game-day" variant="outlineLight">
              Game day
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper">
        <div className="mx-auto max-w-3xl text-center">
          <p className="luxury-display text-3xl leading-tight text-light-ink sm:text-4xl lg:text-[2.75rem]">
            {experiencesIntro.primary}
          </p>
          <div className="mx-auto mt-7 h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden />
          <p className="mt-7 text-base leading-relaxed text-light-muted sm:text-lg">
            {experiencesIntro.secondary} Every experience below has its own team, its own timing, and
            one person who owns all of it from the first call to the final door.
          </p>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="cream" borderTop containerClassName="space-y-24 lg:space-y-32">
        {experienceCategoriesWithItems.map((category, index) => (
          <ExperienceCategorySection key={category.id} category={category} index={index} />
        ))}
      </MarketingPageSection>

      <MarketingPageSection tone="dark">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <MarketingSectionHeading
              eyebrow="HiTouch Concierge"
              title="Tell us where you want to go and how you want it to feel. We'll handle the rest."
              description="Every experience can be extended with concierge coordination—booked through the same thread as your transportation and billed at cost with a transparent coordination fee."
              light={false}
            />
            <Button
              href="/concierge"
              variant="secondary"
              className="mt-9 border-heading/35 text-heading hover:bg-white/10"
            >
              About HiTouch Concierge
            </Button>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {conciergeServices.map((s) => (
              <li
                key={s.id}
                className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] px-5 py-4"
              >
                <p className="text-sm font-semibold text-heading">{s.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-on-dark-body">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <FeaturedSprinterSpotlight sprinter={featuredSprinter} />
      </MarketingPageSection>

      <MarketingCtaBand
        eyebrow="One call. Every detail handled."
        title="Designing something entirely your own?"
        description="Share the occasion, the guests, and how you want it to feel. Our concierge desk returns a written plan—vehicles, timing, reservations, and pricing."
        primaryHref="/experience-request"
        primaryLabel="Request your experience"
        secondaryHref="/memberships"
        secondaryLabel="Explore membership"
      />
    </>
  );
}
