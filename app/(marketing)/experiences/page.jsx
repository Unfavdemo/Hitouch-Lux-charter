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
  title: "Executive transportation, luxury experiences & travel",
  description:
    "Philadelphia private black car service and luxury transportation across three offerings: executive transportation, luxury experiences, and travel (airports, stations, intercity). Request a quote—availability confirmed first.",
  path: "/experiences",
});

const sectionTones = {
  executive: "dark",
  "luxury-experiences": "cream",
  travel: "paper",
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
      <JsonLdScript data={itemListJsonLd({ name: "HiTouch offerings", items: listItems })} />
      <MarketingPageHero
        eyebrow={experiencesHero.eyebrow}
        title={experiencesHero.headline}
        description={experiencesHero.supporting}
        image={pageHeroes.experiences}
        imageAlt="Relaxing spa atmosphere with soft lighting"
        actions={
          <Button href="/experience-request" variant="primary">
            Request a quote
          </Button>
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
            <MarketingSectionHeading
              eyebrow={category.name}
              title={category.tagline}
              description={category.description}
              light={light}
            />
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
            {category.id === "luxury-experiences" ? (
              <p className="mt-8 max-w-3xl text-xs leading-relaxed text-light-muted">
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
        eyebrow="Availability confirmed first"
        title="Tell us the occasion. We'll handle the details."
        description="Request a quote through our questionnaire. We confirm driver availability, assign the cabin, and return a proposal—no instant online booking."
        primaryHref="/experience-request"
        primaryLabel="Request a quote"
        secondaryHref="/contact"
        secondaryLabel="Speak with concierge"
      />
    </>
  );
}
