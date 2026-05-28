import { ExperienceRequestForm } from "@/components/marketing/experience-request-form";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { Button } from "@/components/ui/button";
import { pageHeroes } from "@/content/media";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Custom experience request",
  description:
    "Request a personalized HiTouch luxury experience. Expect a concierge response within 24–48 hours with a choreographed proposal.",
  path: "/experience-request",
});

export default function ExperienceRequestPage() {
  return (
    <>
      <MarketingPageHero
        eyebrow="Begin your experience"
        title="Tell us the occasion—we'll architect the movement."
        description="Share venues, guest count, timing, and the mood you want guests to feel. Our concierge team responds within 24–48 hours with vehicle class, route cadence, and cabin staging."
        image={pageHeroes.experienceRequest}
        imageAlt="Fine dining table with candlelight"
        actions={
          <Button href="/experiences" variant="outlineLight">
            Browse curated packages
          </Button>
        }
      />

      <MarketingPageSection tone="cream" className="!pb-24">
        <ExperienceRequestForm />
      </MarketingPageSection>
    </>
  );
}
