import { FaqList } from "@/components/marketing/faq-list";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { pageHeroes } from "@/content/media";
import { airportService } from "@/content/mobility";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbListJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "PHL airport car service & private transportation",
  description:
    "Private airport transportation for PHL, PNE, Trenton-Mercer, and regional airports. Live flight monitoring, meet-and-greet at baggage claim, generous included wait time, and FBO coordination.",
  path: "/airport",
});

export default function AirportPage() {
  const { hero, intro, airports, pillars, faqs } = airportService;

  return (
    <>
      <JsonLdScript
        data={[
          serviceJsonLd({
            name: "Airport transfer service",
            description:
              "Flight-aware private airport transportation for PHL, PNE, Trenton-Mercer, and regional airports, including FBO and private aviation coordination.",
            path: "/airport",
          }),
          faqPageJsonLd(faqs),
          breadcrumbListJsonLd([
            { name: "Home", path: "/" },
            { name: "Airport", path: "/airport" },
          ]),
        ]}
      />

      <MarketingPageHero
        eyebrow={hero.eyebrow}
        title={hero.headline}
        description={hero.supporting}
        image={pageHeroes.airport}
        imageAlt={hero.imageAlt}
        actions={
          <>
            <Button href="/book" variant="primary">
              Book transportation
            </Button>
            <Button href={`tel:${site.phoneTel}`} variant="outlineLight">
              {site.phoneDisplay}
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper">
        <MarketingSectionHeading
          eyebrow={intro.eyebrow}
          title={intro.headline}
          description={intro.supporting}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.id} className="luxury-card-light group p-7 sm:p-8">
              <h3 className="font-serif text-xl tracking-tight text-light-ink">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-light-muted">{pillar.body}</p>
              <span
                className="mt-7 block h-px w-10 bg-gradient-to-r from-accent/90 to-accent/20 transition-all duration-500 group-hover:w-16"
                aria-hidden
              />
            </article>
          ))}
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="cream" borderTop>
        <MarketingSectionHeading
          eyebrow="Airports we serve"
          title="Commercial terminals, regional fields, and private aviation."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {airports.map((airport) => (
            <li key={airport.code}>
              <Card variant="luxury" className="h-full p-7 sm:p-8">
                <p className="font-serif text-2xl tracking-tight text-accent">{airport.code}</p>
                <h3 className="mt-2 text-sm font-semibold uppercase tracking-[var(--tracking-nav)] text-light-ink">
                  {airport.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-light-muted">{airport.detail}</p>
              </Card>
            </li>
          ))}
        </ul>
      </MarketingPageSection>

      <MarketingPageSection tone="dark">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <MarketingSectionHeading
            eyebrow="For teams that fly often"
            title="If your team is at PHL every week, stop booking it every week."
            description="Membership and corporate accounts hold your traveler profiles, preferred vehicles, and billing on file—so an airport run becomes a one-line request instead of a booking conversation."
            light={false}
          />
          <div className="flex flex-wrap gap-3">
            <Button href="/memberships" variant="primary">
              Explore membership
            </Button>
            <Button
              href="/corporate"
              variant="secondary"
              className="border-heading/35 text-heading hover:bg-white/10"
            >
              Corporate accounts
            </Button>
          </div>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <MarketingSectionHeading eyebrow="Questions" title="Airport transportation, answered." />
        <div className="mt-10 max-w-3xl">
          <FaqList items={faqs} light />
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        eyebrow="One call. Every detail handled."
        title="Send us the flight. We'll handle the rest."
        description="Give us the flight number and the address. We watch the aircraft and adjust so you never have to call us from the curb."
        primaryHref="/book"
        primaryLabel="Book transportation"
        secondaryHref={`tel:${site.phoneTel}`}
        secondaryLabel={site.phoneDisplay}
      />
    </>
  );
}
