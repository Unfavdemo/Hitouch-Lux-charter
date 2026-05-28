import { HomeConciergeWidget } from "@/components/marketing/home-concierge-widget";
import { HomeExperienceJourney } from "@/components/marketing/home-experience-journey";
import { HomeExperiencePreview } from "@/components/marketing/home-experience-preview";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomeServicesBento } from "@/components/marketing/home-services-bento";
import { HomeValueProps } from "@/components/marketing/home-value-props";
import { FleetShowcase } from "@/components/marketing/fleet-showcase";
import { MetricsStrip } from "@/components/marketing/metrics-strip";
import { SuccessStory } from "@/components/marketing/success-story";
import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { aeoSnippets } from "@/content/aeo-snippets";
import { featuredExperienceIds } from "@/content/home";
import { fleet } from "@/content/fleet";
import { metrics } from "@/content/metrics";
import { industryAward, importedReviews } from "@/content/reviews";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqPageJsonLd, itemListJsonLd } from "@/lib/seo/json-ld";
import { experiencePackages } from "@/content/experiences";

export const metadata = buildPageMetadata({
  title: "Curated luxury experiences & executive chauffeur",
  description:
    "HiTouch Luxury Charter choreographs curated experiences in Philadelphia and the tri-state region—date nights, retreats, corporate evenings, and celebration movement with discreet chauffeurs.",
  path: "/",
});

export default function HomePage() {
  const experienceList = experiencePackages.map((p) => ({
    name: p.title,
    description: p.blurb,
    url: p.href,
  }));

  const featuredPackages = featuredExperienceIds
    .map((id) => experiencePackages.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <>
      <JsonLdScript
        data={[
          faqPageJsonLd(aeoSnippets),
          itemListJsonLd({ name: "Curated experiences", items: experienceList }),
        ]}
      />
      <HomeHero
        site={{
          phoneTel: site.phoneTel,
          phoneDisplay: site.phoneDisplay,
        }}
      />

      <HomeExperiencePreview packages={featuredPackages} />

      <HomeExperienceJourney />

      <HomeValueProps />

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
                Guest stories
              </p>
              <h2 className="mt-4 font-serif text-3xl tracking-tight text-light-ink sm:text-4xl">
                Evenings they still talk about
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-light-muted sm:text-base">
                From board weekends to wedding choreography—clients remember how the night felt,
                not just that the car was on time.
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
                The mobile salon
              </p>
              <h2 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-tight text-heading sm:text-4xl lg:text-5xl">
                Your cabin is part of the experience—not an afterthought.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-base">
                Sedans, executive SUVs, and custom Sprinters—studio-prepared, detailed, and briefed
                to match the tone of your evening.
              </p>
            </div>
            <Button href="/fleet" variant="secondary" className="border-heading/35 text-heading hover:bg-white/10">
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
