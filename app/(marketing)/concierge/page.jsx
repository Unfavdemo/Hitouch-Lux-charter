import Link from "next/link";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { conciergeClosing, conciergeIntro, conciergeServices } from "@/content/concierge";
import { experienceCategoriesWithItems } from "@/content/experiences";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbListJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "HiTouch Concierge",
  description:
    "Restaurant coordination, flowers, champagne, game tickets, spa appointments, golf tee times, wine tastings, and special requests—arranged through the same thread as your transportation.",
  path: "/concierge",
});

export default function ConciergePage() {
  return (
    <>
      <JsonLdScript
        data={[
          serviceJsonLd({
            name: "HiTouch Concierge",
            description:
              "Concierge coordination for restaurants, tickets, flowers, champagne, spa appointments, tee times, wine tastings, and special requests in Philadelphia.",
            path: "/concierge",
          }),
          breadcrumbListJsonLd([
            { name: "Home", path: "/" },
            { name: "Concierge", path: "/concierge" },
          ]),
        ]}
      />

      <MarketingPageHero
        eyebrow={conciergeIntro.eyebrow}
        title={conciergeIntro.headline}
        description={conciergeIntro.supporting}
        image={pageHeroes.concierge}
        imageAlt={conciergeIntro.imageAlt}
        actions={
          <>
            <Button href="/experience-request" variant="primary">
              Request your experience
            </Button>
            <Button href={`tel:${site.phoneTel}`} variant="outlineLight">
              {site.phoneDisplay}
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper">
        <MarketingSectionHeading
          eyebrow="What we handle"
          title="The things that turn a reservation into an evening."
          description="Concierge requests are handled through the same thread as your transportation. Vendor costs are billed at cost with a transparent coordination fee—never a hidden markup."
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {conciergeServices.map((service) => (
            <li key={service.id} className="luxury-card-light group flex flex-col p-6 sm:p-7">
              <h3 className="font-serif text-lg tracking-tight text-light-ink sm:text-xl">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-light-muted">{service.body}</p>
              <span
                className="mt-6 h-px w-8 bg-gradient-to-r from-accent/90 to-accent/20 transition-all duration-500 group-hover:w-14"
                aria-hidden
              />
            </li>
          ))}
        </ul>
      </MarketingPageSection>

      <MarketingPageSection tone="dark">
        <div className="mx-auto max-w-3xl text-center">
          <p className="luxury-display text-3xl leading-tight text-heading sm:text-4xl lg:text-[2.75rem]">
            {conciergeClosing.headline}
          </p>
          <div
            className="mx-auto mt-7 h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent"
            aria-hidden
          />
          <p className="mt-7 text-sm leading-relaxed text-on-dark-body sm:text-base">
            {conciergeClosing.supporting}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/memberships" variant="primary">
              Explore membership
            </Button>
            <Button
              href="/experiences"
              variant="secondary"
              className="border-heading/35 text-heading hover:bg-white/10"
            >
              Browse experiences
            </Button>
          </div>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="cream">
        <MarketingSectionHeading
          eyebrow="Where concierge shows up"
          title="Built into every experience we run."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experienceCategoriesWithItems.map((category) => (
            <Card key={category.id} variant="luxury" className="flex flex-col p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
                {category.displayName}
              </p>
              <h3 className="mt-4 font-serif text-xl tracking-tight text-light-ink">
                {category.tagline}
              </h3>
              <ul className="mt-5 flex-1 space-y-2">
                {category.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      className="text-sm text-light-muted underline decoration-accent/40 underline-offset-4 transition-colors hover:text-light-ink"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        eyebrow="Once you're with HiTouch, you're taken care of."
        title="Tell us where you want to go and how you want it to feel."
        description="Share the occasion and the details you care about. We come back with a plan."
        primaryHref="/experience-request"
        primaryLabel="Request your experience"
        secondaryHref="/contact"
        secondaryLabel="Speak with concierge"
      />
    </>
  );
}
