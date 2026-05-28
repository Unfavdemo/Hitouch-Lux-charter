import { ExperiencePackageCard } from "@/components/marketing/experience-package-card";
import { FeaturedSprinterSpotlight } from "@/components/marketing/featured-sprinter-spotlight";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import {
  experiencePackages,
  experiencesHero,
  featuredSprinter,
} from "@/content/experiences";
import { pageHeroes } from "@/content/media";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { itemListJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Curated experiences",
  description:
    "Spa retreats, golf outings, date nights, winery days, and VIP artist transportation—choreographed by HiTouch Luxury Charter in Philadelphia.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  const listItems = experiencePackages.map((p) => ({
    name: p.title,
    description: p.blurb,
    url: p.href,
  }));

  return (
    <>
      <JsonLdScript data={itemListJsonLd({ name: "Curated experiences", items: listItems })} />
      <MarketingPageHero
        eyebrow={experiencesHero.eyebrow}
        title={experiencesHero.headline}
        description={experiencesHero.supporting}
        image={pageHeroes.experiences}
        imageAlt="Relaxing spa atmosphere with soft lighting"
        actions={
          <Button href="/experience-request" variant="primary">
            Design a bespoke evening
          </Button>
        }
      />

      <MarketingPageSection tone="paper">
        <FeaturedSprinterSpotlight sprinter={featuredSprinter} />
      </MarketingPageSection>

      <MarketingPageSection tone="cream">
        <MarketingSectionHeading
          eyebrow="Signature packages"
          title="Curated frames for principals who expect more than a transfer."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiencePackages.map((pkg, index) => (
              <ExperiencePackageCard key={pkg.id} pkg={pkg} index={index} />
            ))}
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        title="Designing something entirely bespoke?"
        description="Share venues, timing, and preferences—our concierge desk responds with a choreographed proposal within 24–48 hours."
        primaryHref="/experience-request"
        primaryLabel="Custom experience request"
        secondaryHref="/contact"
        secondaryLabel="Speak with concierge"
      />
    </>
  );
}
