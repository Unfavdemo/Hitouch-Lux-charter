import { ConciergePanel } from "@/components/marketing/concierge-panel";
import { ExperienceRequestForm } from "@/components/marketing/experience-request-form";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { Button } from "@/components/ui/button";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
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
          <>
            <Button href="#request" variant="primary">
              Start your request
            </Button>
            <Button href="/experiences" variant="outlineLight">
              Browse curated packages
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="cream" id="request" className="scroll-mt-24 !pb-24">
        <MarketingSectionHeading
          eyebrow="Concierge intake"
          title="One form. Every detail we need to design the night."
          description="Answer what you know now—venues can stay approximate. Your concierge will refine vehicle class, timing, and staging before anything is locked."
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <ExperienceRequestForm />
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="dark">
        <ConciergePanel
          light={false}
          headline="Prefer to talk it through first?"
          supporting={`Call ${site.phoneDisplay} and describe the occasion—your concierge will open the request with you.`}
        />
      </MarketingPageSection>

      <MarketingCtaBand
        eyebrow="Curated packages"
        title="Already know the experience you want?"
        description="Browse private packages—from game days to wine country—then inquire on the page, or return here for a fully custom itinerary."
        primaryHref="/experiences"
        primaryLabel="View experiences"
        secondaryHref={`tel:${site.phoneTel}`}
        secondaryLabel="Call concierge"
      />
    </>
  );
}
