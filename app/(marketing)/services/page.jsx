import Link from "next/link";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { Button } from "@/components/ui/button";
import { MarketingFeatureCard } from "@/components/marketing/marketing-feature-card";
import { pageHeroes } from "@/content/media";
import { services } from "@/content/services";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Occasions & service frames",
  description:
    "Occasion-led chauffeur frames—hourly charter, airport rituals, corporate evenings, weddings, and tasting days—each choreographed with HiTouch discretion.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <MarketingPageHero
        eyebrow="Occasions we choreograph"
        title="Every frame is an experience arc—not a menu item."
        description="Choose the occasion that matches your evening. Our concierge team returns a choreographed proposal with vehicle class, route cadence, and cabin staging."
        image={pageHeroes.services}
        imageAlt="Vineyard rows in soft evening light"
        actions={
          <>
            <Button href="/experience-request" variant="primary">
              Design your evening
            </Button>
            <Button href="/experiences" variant="outlineLight">
              Curated packages
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper">
        <div className="grid gap-8 lg:grid-cols-2">
            {services.map((s) => (
              <MarketingFeatureCard
                key={s.id}
                className="flex h-full flex-col"
                footer={
                  <div className="flex flex-wrap gap-3">
                    <Button href="/experience-request" variant="onLight" className="text-sm">
                      Request this frame
                    </Button>
                    <Link
                      className="inline-flex items-center text-sm font-medium text-light-ink underline decoration-accent/50 underline-offset-4"
                      href="/contact"
                    >
                      Ask concierge first
                    </Link>
                  </div>
                }
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-light-muted">
                  {s.name}
                </p>
                <h2 className="mt-3 font-serif text-2xl text-light-ink">{s.headline}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-light-muted">{s.description}</p>
                <div className="mt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-light-muted">
                    Ideal for
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-light-ink/90">
                    {s.idealFor.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </MarketingFeatureCard>
            ))}
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="dark">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <MarketingSectionHeading
            eyebrow="Programs & productions"
            title="Beyond a single evening."
            description="Corporate travel teams and event coordinators receive structured playbooks, consolidated invoicing, and multi-vehicle choreography."
            light={false}
          />
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button
              href="/corporate"
              variant="secondary"
              className="border-heading/35 text-heading hover:bg-white/10"
            >
              Corporate programs
            </Button>
            <Button
              href="/events"
              variant="secondary"
              className="border-heading/35 text-heading hover:bg-white/10"
            >
              Event coordination
            </Button>
          </div>
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        tone="cream"
        title="Know your itinerary already?"
        description="Get a trip estimate online—our team still reviews every request for timing and vehicle fit. Same-day scheduling is also available through reserve online."
        primaryHref="/book"
        primaryLabel="Get a trip estimate"
        secondaryHref="/contact"
        secondaryLabel="Contact concierge"
      />
    </>
  );
}
