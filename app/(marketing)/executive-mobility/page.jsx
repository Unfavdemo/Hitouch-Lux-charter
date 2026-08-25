import { FaqList } from "@/components/marketing/faq-list";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { ServicePromises } from "@/components/marketing/service-promises";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { pageHeroes } from "@/content/media";
import { executiveMobility } from "@/content/mobility";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbListJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Philadelphia executive car service",
  description:
    "Executive car service in Philadelphia and the Main Line. Consistent chauffeurs, a private working cabin, punctuality as the standard, and monthly consolidated billing your finance team will accept.",
  path: "/executive-mobility",
});

export default function ExecutiveMobilityPage() {
  const { hero, intro, pillars, useCases, faqs } = executiveMobility;

  return (
    <>
      <JsonLdScript
        data={[
          serviceJsonLd({
            name: "Executive car service",
            description:
              "Recurring chauffeured executive mobility for principals, deal teams, and executive assistants in Philadelphia and the tri-state region.",
            path: "/executive-mobility",
          }),
          faqPageJsonLd(faqs),
          breadcrumbListJsonLd([
            { name: "Home", path: "/" },
            { name: "Executive Mobility", path: "/executive-mobility" },
          ]),
        ]}
      />

      <MarketingPageHero
        eyebrow={hero.eyebrow}
        title={hero.headline}
        description={hero.supporting}
        image={pageHeroes.executiveMobility}
        imageAlt={hero.imageAlt}
        actions={
          <>
            <Button href="/book" variant="primary">
              Book transportation
            </Button>
            <Button href="/memberships" variant="outlineLight">
              Explore membership
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <MarketingSectionHeading
              eyebrow={intro.eyebrow}
              title={intro.headline}
              description={intro.supporting}
            />
          </div>
          <div className="lg:col-span-5">
            <Card variant="luxury" className="h-full p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
                Where we work hardest
              </p>
              <ul className="mt-6 space-y-3">
                {useCases.map((useCase) => (
                  <li key={useCase} className="flex gap-3 text-sm leading-relaxed text-light-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <ServicePromises
          eyebrow="Our standard"
          title="Punctuality is fundamental. The rest is what separates us."
          description="These five promises apply to every executive movement we run, whether it is a standing Tuesday airport run or a twelve-stop road show."
        />
      </MarketingPageSection>

      <MarketingPageSection tone="dark">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <MarketingSectionHeading
            eyebrow="Corporate programs"
            title="If more than one person travels, it should be one account."
            description="Consolidated invoicing, NET 15 and NET 30 terms, named traveler profiles, duty-of-care documentation, and a dedicated account lead who knows your calendar."
            light={false}
          />
          <div className="flex flex-wrap gap-3">
            <Button href="/corporate" variant="primary">
              Corporate accounts
            </Button>
            <Button
              href="/airport"
              variant="secondary"
              className="border-heading/35 text-heading hover:bg-white/10"
            >
              Airport service
            </Button>
          </div>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <MarketingSectionHeading eyebrow="Questions" title="Executive car service, answered." />
        <div className="mt-10 max-w-3xl">
          <FaqList items={faqs} light />
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        eyebrow="Your plans. Our responsibility."
        title="Put your calendar in one set of hands."
        description="Book a single movement, or talk to us about a membership or corporate program built around how your team actually travels."
        primaryHref="/book"
        primaryLabel="Book transportation"
        secondaryHref={`tel:${site.phoneTel}`}
        secondaryLabel={site.phoneDisplay}
      />
    </>
  );
}
