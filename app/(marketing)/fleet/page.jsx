import { FleetShowcase } from "@/components/marketing/fleet-showcase";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { FleetVehicleCard } from "@/components/marketing/fleet-vehicle-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fleet } from "@/content/fleet";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Fleet — your mobile salon",
  description:
    "Studio-prepared sedans, executive SUVs, and custom Sprinters—each class staged to match the tone of your curated experience.",
  path: "/fleet",
});

const standards = [
  {
    title: "Detailing cadence",
    body: "Interiors vacuumed, surfaces treated, and glass polished between assignments. Neutral scent unless a signature preference is on file.",
  },
  {
    title: "Mechanical readiness",
    body: "Preventive maintenance aligned with manufacturer guidance and duty-of-care expectations for highway and urban driving.",
  },
  {
    title: "Wi‑Fi & power",
    body: "Productivity-ready power at every seat with hotspot-first connectivity for live calls and document review in motion.",
  },
];

export default function FleetPage() {
  return (
    <>
      <MarketingPageHero
        eyebrow="The mobile salon"
        title="Your cabin is part of the experience—not an afterthought."
        description="Every class is inspected, detailed, and briefed before wheels roll—staged to match the tone of your evening, from boardroom privacy to celebration scale."
        image={pageHeroes.fleet}
        imageAlt="Luxury vehicle interior with leather seating"
        actions={
          <>
            <Button href="/experience-request" variant="primary">
              Match a vehicle to your evening
            </Button>
            <Button href="/experiences" variant="outlineLight">
              View experiences
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="dark" className="!py-12 lg:!py-16">
        <FleetShowcase vehicles={fleet} />
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <MarketingSectionHeading
          eyebrow="Class snapshot"
          title="Compare seating, luggage, and privacy."
          description="Final assignments vary by availability and itinerary—our concierge confirms the right class for your experience arc."
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map((v) => (
            <FleetVehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="cream">
        <MarketingSectionHeading eyebrow="Readiness" title="Standards before every pickup." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {standards.map((s) => (
            <Card key={s.title} variant="light" className="bg-paper p-6">
              <h3 className="font-serif text-xl text-light-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-light-muted">{s.body}</p>
            </Card>
          ))}
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        title="Need a tailored proposal?"
        description="Share party size, luggage, and timing—or begin with a curated experience package."
        primaryHref="/experience-request"
        primaryLabel="Request an experience"
        secondaryHref="/book"
        secondaryLabel="Get a trip estimate"
      />
    </>
  );
}
