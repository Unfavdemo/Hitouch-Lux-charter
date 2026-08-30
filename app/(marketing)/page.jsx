import { HomeConciergeWidget } from "@/components/marketing/home-concierge-widget";
import { HomeExperiencePreview } from "@/components/marketing/home-experience-preview";
import { HomeFleetSection } from "@/components/marketing/home-fleet-section";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomeServicesBento } from "@/components/marketing/home-services-bento";
import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { aeoSnippets } from "@/content/aeo-snippets";
import { brandStatement } from "@/content/home";
import { fleet } from "@/content/fleet";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqPageJsonLd, itemListJsonLd } from "@/lib/seo/json-ld";
import { experienceCategories, experiences } from "@/content/experiences";

export const metadata = buildPageMetadata({
  title: "Private mobility & curated experiences",
  description:
    "Your time. Your experience. Your standard. HiTouch delivers private mobility and curated experiences in Philadelphia—game days, executive travel, escapes, and concierge-level service for people who expect more from how they move.",
  path: "/",
});

export default function HomePage() {
  const experienceList = experiences.map((e) => ({
    name: e.title,
    description: e.cardBlurb,
    url: `/experiences/${e.slug}`,
  }));

  return (
    <>
      <JsonLdScript
        data={[
          faqPageJsonLd(aeoSnippets),
          itemListJsonLd({ name: "Private experiences", items: experienceList }),
        ]}
      />
      <HomeHero
        site={{
          phoneTel: site.phoneTel,
          phoneDisplay: site.phoneDisplay,
        }}
      />

      <HomeFleetSection vehicles={fleet} />

      <Section className="border-b border-light-ink/8 bg-cream py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <LuxuryEyebrow className="justify-center">{brandStatement.eyebrow}</LuxuryEyebrow>
            <h2 className="luxury-display mt-5 text-3xl text-light-ink sm:text-4xl lg:text-[2.5rem]">
              {brandStatement.headline}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-light-muted sm:text-base">
              {brandStatement.supporting}
            </p>
          </div>
        </Container>
      </Section>

      <HomeExperiencePreview categories={experienceCategories} />

      <HomeServicesBento />

      <HomeConciergeWidget
        phoneTel={site.phoneTel}
        phoneDisplay={site.phoneDisplay}
        moovsBookingUrl={site.moovsBookingUrl}
      />
    </>
  );
}
