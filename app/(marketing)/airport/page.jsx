import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingFeatureCard } from "@/components/marketing/marketing-feature-card";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { serviceJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Airport transfers | PHL private car service",
  description:
    "Private airport transfers in Philadelphia—PHL, PNE, and private FBOs. Flight-aware pickup timing, meet-and-greet, luggage stewardship, and a chauffeur already waiting when you land.",
  path: "/airport",
});

const airportStandards = [
  {
    title: "Flight-aware timing",
    body: "We track your flight, not the clock. Early arrivals, delays, and gate changes adjust your pickup automatically—no calls required.",
  },
  {
    title: "Meet-and-greet",
    body: "Curbside coordination or in-terminal greeting with luggage stewardship—your name, never a cardboard sign energy.",
  },
  {
    title: "Private aviation",
    body: "Tarmac-adjacent standards at PNE and regional FBOs, coordinated directly with your flight crew.",
  },
  {
    title: "The composed departure",
    body: "Departure pickups timed to security waits and terminal traffic—protecting your buffer without padding your morning.",
  },
];

export default function AirportPage() {
  return (
    <>
      <JsonLdScript
        data={serviceJsonLd({
          name: "Airport transfer service in Philadelphia",
          description:
            "Private airport car service for PHL, PNE, and private FBOs with flight monitoring, meet-and-greet, and luggage assistance.",
          path: "/airport",
        })}
      />
      <MarketingPageHero
        eyebrow="Airport"
        title="Land. Walk out. Your car is already there."
        description="PHL, PNE, and private FBOs—flight-aware timing, meet-and-greet standards, and luggage handled. The trip home starts the moment you're wheels-down."
        image={pageHeroes.airport}
        imageAlt="Aircraft on the runway at golden hour"
        actions={
          <>
            <Button href="/book" variant="primary">
              Book Transportation
            </Button>
            <Button href={`tel:${site.phoneTel}`} variant="outlineLight">
              Call {site.phoneDisplay}
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="cream">
        <MarketingSectionHeading
          eyebrow="Arrival & departure rituals"
          title="No arrivals hall roulette. No ride-share lot."
          description="Airport transportation is where unreliability costs the most. It's also where the HiTouch standard is most obvious."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {airportStandards.map((s) => (
            <MarketingFeatureCard key={s.title} title={s.title}>
              <p>{s.body}</p>
            </MarketingFeatureCard>
          ))}
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        eyebrow="Once you're with HiTouch, you're taken care of"
        title="Make every landing feel handled."
        description="Book a single transfer, or let membership keep a standing profile—preferences, addresses, and flight patterns already on file."
        primaryHref="/book"
        primaryLabel="Book Transportation"
        secondaryHref="/memberships"
        secondaryLabel="Explore Membership"
      />
    </>
  );
}
