import { ConciergePanel } from "@/components/marketing/concierge-panel";
import { ExperiencePackageCard } from "@/components/marketing/experience-package-card";
import { FeaturedSprinterSpotlight } from "@/components/marketing/featured-sprinter-spotlight";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import {
  experienceCategories,
  experiences,
  experiencesHero,
  featuredSprinter,
  getExperiencesByCategory,
  teamDisclaimer,
} from "@/content/experiences";
import { pageHeroes } from "@/content/media";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { itemListJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Private experiences | Game Day, Escape, Wellness, Leisure & Signature",
  description:
    "Tell us the occasion. We'll handle the details. Private luxury experiences in Philadelphia—game day transportation, wine country tours, spa days, golf, fine dining, and fully bespoke Signature experiences.",
  path: "/experiences",
});

const sectionTones = {
  "game-day": "dark",
  escape: "cream",
  wellness: "paper",
  leisure: "cream",
  signature: "dark",
};

/** Keep each category's card row balanced rather than leaving orphans. */
function gridClass(count) {
  if (count === 1) return "mx-auto max-w-xl";
  if (count === 2) return "sm:grid-cols-2 lg:mx-auto lg:max-w-4xl";
  if (count === 4) return "sm:grid-cols-2 lg:grid-cols-4";
  return "sm:grid-cols-2 lg:grid-cols-3";
}

export default function ExperiencesPage() {
  const listItems = experiences.map((e) => ({
    name: e.title,
    description: e.cardBlurb,
    url: `/experiences/${e.slug}`,
  }));

  return (
    <>
      <JsonLdScript data={itemListJsonLd({ name: "Private experiences", items: listItems })} />
      <MarketingPageHero
        eyebrow={experiencesHero.eyebrow}
        title={experiencesHero.headline}
        description={experiencesHero.supporting}
        image={pageHeroes.experiences}
        imageAlt="Relaxing spa atmosphere with soft lighting"
        actions={
          <>
            <Button href="/experience-request" variant="primary">
              Request Your Experience
            </Button>
            <Button href="/memberships" variant="outlineLight">
              Explore Membership
            </Button>
          </>
        }
      />

      {experienceCategories.map((category) => {
        const tone = sectionTones[category.id] ?? "cream";
        const light = tone !== "dark";
        const items = getExperiencesByCategory(category.id);
        return (
          <MarketingPageSection
            key={category.id}
            id={category.id}
            tone={tone}
            className="scroll-mt-24"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <MarketingSectionHeading
                eyebrow={category.name}
                title={category.tagline}
                description={category.description}
                light={light}
              />
              {category.id === "game-day" ? (
                <Button
                  href="/game-day"
                  variant="secondary"
                  className="shrink-0 border-heading/35 text-heading hover:bg-white/10"
                >
                  Explore Game Day
                </Button>
              ) : null}
            </div>
            <div className={`mt-12 grid gap-6 ${gridClass(items.length)}`}>
              {items.map((exp, index) => (
                <ExperiencePackageCard
                  key={exp.id}
                  pkg={{
                    id: exp.id,
                    title: exp.title,
                    blurb: exp.cardBlurb,
                    image: exp.image,
                    alt: exp.alt,
                    href: `/experiences/${exp.slug}`,
                  }}
                  index={index}
                />
              ))}
            </div>
            {category.id === "game-day" ? (
              <p className="mt-8 max-w-3xl text-xs leading-relaxed text-on-dark-body/70">
                {teamDisclaimer}
              </p>
            ) : null}
          </MarketingPageSection>
        );
      })}

      <MarketingPageSection tone="paper" borderTop>
        <ConciergePanel />
      </MarketingPageSection>

      <MarketingPageSection tone="cream" borderTop>
        <FeaturedSprinterSpotlight sprinter={featuredSprinter} />
      </MarketingPageSection>

      <MarketingCtaBand
        eyebrow="Transportation is only the beginning"
        title="Tell us the occasion. We'll handle the details."
        description="Share your vision, guest count, and timing—your concierge returns a complete proposal, from vehicles to reservations, within 24–48 hours."
        primaryHref="/experience-request"
        primaryLabel="Request Your Experience"
        secondaryHref="/contact"
        secondaryLabel="Speak with concierge"
      />
    </>
  );
}
