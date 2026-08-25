import { BrandPromiseBand } from "@/components/marketing/brand-promise-band";
import { ConversionPaths } from "@/components/marketing/conversion-paths";
import { FounderStory } from "@/components/marketing/founder-story";
import { HomeConciergeWidget } from "@/components/marketing/home-concierge-widget";
import { HomeExperienceJourney } from "@/components/marketing/home-experience-journey";
import { HomeExperiencePreview } from "@/components/marketing/home-experience-preview";
import { HomeGameDayBand } from "@/components/marketing/home-game-day-band";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomeMembershipTeaser } from "@/components/marketing/home-membership-teaser";
import { HomeServicesBento } from "@/components/marketing/home-services-bento";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { ServicePromises } from "@/components/marketing/service-promises";
import { FleetShowcase } from "@/components/marketing/fleet-showcase";
import { MetricsStrip } from "@/components/marketing/metrics-strip";
import { SuccessStory } from "@/components/marketing/success-story";
import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { aeoSnippets } from "@/content/aeo-snippets";
import { experiences, featuredExperienceSlugs, getExperienceBySlug } from "@/content/experiences";
import { fleet } from "@/content/fleet";
import { metrics } from "@/content/metrics";
import { industryAward, importedReviews } from "@/content/reviews";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqPageJsonLd, itemListJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Private mobility & curated experiences in Philadelphia",
  description:
    "Your time. Your experience. Your standard. Private mobility and curated experiences for people who expect more from how they move—memberships, executive mobility, game day, private experiences, and airport service in Philadelphia.",
  path: "/",
});

export default function HomePage() {
  const experienceList = experiences.map((e) => ({
    name: e.title,
    description: e.tagline,
    url: e.href,
  }));

  const featuredExperiences = featuredExperienceSlugs
    .map((slug) => getExperienceBySlug(slug))
    .filter(Boolean);

  return (
    <>
      <JsonLdScript
        data={[
          faqPageJsonLd(aeoSnippets),
          itemListJsonLd({ name: "HiTouch private experiences", items: experienceList }),
        ]}
      />

      <HomeHero
        site={{
          phoneTel: site.phoneTel,
          phoneDisplay: site.phoneDisplay,
        }}
      />

      <BrandPromiseBand />

      <MarketingPageSection tone="paper">
        <MarketingSectionHeading
          eyebrow="Where to begin"
          title="Three ways to start with HiTouch."
          description="Book a single movement, join the membership, or hand us an occasion and let us build it."
        />
        <div className="mt-14">
          <ConversionPaths light />
        </div>
      </MarketingPageSection>

      <HomeExperiencePreview experiences={featuredExperiences} />

      <HomeGameDayBand />

      <MarketingPageSection tone="cream" borderTop>
        <FounderStory />
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <ServicePromises />
      </MarketingPageSection>

      <HomeMembershipTeaser />

      <HomeExperienceJourney />

      <HomeServicesBento />

      <Section className="bg-paper py-20 lg:py-28">
        <Container>
          <SuccessStory award={industryAward} reviews={importedReviews} light />
        </Container>
      </Section>

      <Section className="border-t border-light-ink/10 bg-cream py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
                Client stories
              </p>
              <h2 className="mt-4 font-serif text-3xl tracking-tight text-light-ink sm:text-4xl">
                Clients are relationships, not transactions
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-light-muted sm:text-base">
                From board weeks to game nights—people remember how the day felt, not just that the
                car was on time.
              </p>
            </div>
            <TestimonialCarousel items={testimonials} light />
          </div>
          <div className="mt-20">
            <MetricsStrip items={metrics} light />
          </div>
        </Container>
      </Section>

      <Section className="bg-midnight py-20 text-foreground lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
                The fleet
              </p>
              <h2 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-tight text-heading sm:text-4xl lg:text-5xl">
                Your cabin is part of the experience—not an afterthought.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-base">
                Executive sedans, SUVs, and custom Sprinters—prepared, detailed, and staged to your
                preferences before you step in.
              </p>
            </div>
            <Button
              href="/fleet"
              variant="secondary"
              className="border-heading/35 text-heading hover:bg-white/10"
            >
              Explore the fleet
            </Button>
          </div>
          <div className="mt-14">
            <FleetShowcase vehicles={fleet} />
          </div>
        </Container>
      </Section>

      <HomeConciergeWidget
        phoneTel={site.phoneTel}
        phoneDisplay={site.phoneDisplay}
        moovsBookingUrl={site.moovsBookingUrl}
      />
    </>
  );
}
