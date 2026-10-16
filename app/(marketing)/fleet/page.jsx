import { FleetShowcase } from "@/components/marketing/fleet-showcase";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { FleetVehicleCard } from "@/components/marketing/fleet-vehicle-card";
import { Button } from "@/components/ui/button";
import { fleet } from "@/content/fleet";
import { pageHeroes } from "@/content/media";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Preview the fleet | Luxury black car & Sprinter",
  description:
    "Preview the HiTouch Luxury Charter fleet in Philadelphia—sedans, SUVs, and Sprinters. Private black car service assigned by concierge based on your needs. Request a quote; no online vehicle booking.",
  path: "/fleet",
});

export default function FleetPage() {
  return (
    <>
      <MarketingPageHero
        eyebrow="Preview the fleet"
        title="More than a ride, it's an experience."
        description="High-quality looks at the cabins we deploy. Share party size, luggage, and timing—we assign the vehicle. There are no individual car booking pages and no à la carte picker."
        image={pageHeroes.fleet}
        imageAlt="HiTouch Sprinter and Suburban fleet lined up at dusk"
        actions={
          <Button href="/experience-request" variant="primary">
            Request a quote
          </Button>
        }
      />

      <MarketingPageSection tone="dark" className="!py-12 lg:!py-16">
        <FleetShowcase vehicles={fleet} />
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <MarketingSectionHeading
          eyebrow="The cabins we stage"
          title="Photos and short descriptions—assignment is ours."
          description="This preview is for context only. Final vehicles are confirmed after your quote questionnaire when driver availability is verified."
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map((v) => (
            <FleetVehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        title="Ready for a quote?"
        description="Tell us the occasion through our questionnaire. We confirm availability, assign the cabin, and return a proposal—no instant online booking."
        primaryHref="/experience-request"
        primaryLabel="Request a quote"
      />
    </>
  );
}
