import Link from "next/link";
import { CorporateAccountForm } from "@/components/marketing/corporate-account-form";
import { CorporateDashboardWireframe } from "@/components/marketing/corporate-dashboard-wireframe";
import { CorporatePartnerPathway } from "@/components/marketing/corporate-partner-pathway";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { corporateAeoSnippets } from "@/content/aeo-snippets";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqPageJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Corporate experience programs",
  description:
    "B2B executive experience programs for EAs and hotel partners—NET 15/NET 30 invoicing, dedicated account leads, and corporate client portal access.",
  path: "/corporate",
});

const industries = [
  "Public company road shows",
  "Private equity & deal teams",
  "Hospitality & aviation partners",
  "Legal & advisory partnerships",
  "Healthcare executive transport",
];

const timeline = [
  {
    phase: "Discovery",
    detail:
      "Route patterns, principal preferences, after-hours coverage, and NDAs captured alongside insurance certificate requirements.",
  },
  {
    phase: "Playbook build",
    detail:
      "Door protocols, pronunciation cues, backup vehicles, and escalation trees documented so every movement feels repeatable.",
  },
  {
    phase: "Live operations",
    detail:
      "Dedicated account lead monitors changes, consolidates invoices, and adjusts staffing for board weeks or investor events.",
  },
];

export default function CorporatePage() {
  return (
    <>
      <JsonLdScript
        data={[
          serviceJsonLd({
            name: "Corporate executive experience program",
            description:
              "Recurring executive mobility with NET 15/NET 30 billing and dedicated account management.",
            path: "/corporate",
          }),
          faqPageJsonLd(corporateAeoSnippets),
        ]}
      />
      <MarketingPageHero
        eyebrow="Corporate programs"
        title="Executive evenings with predictable rhythm—and billing."
        description="Road-show cadence, after-hours movements, and consolidated reporting for finance teams. We respond with contract templates and duty-of-care documentation aligned to procurement standards."
        image={pageHeroes.corporate}
        imageAlt="Modern glass office towers at dusk"
        actions={
          <>
            <Button href="/experience-request" variant="primary">
              Request program briefing
            </Button>
            <Button href="/login?mode=corporate" variant="outlineLight">
              Corporate sign-in
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <MarketingSectionHeading
              eyebrow="Where we embed deepest"
              title="Built for teams that cannot afford friction at the door."
              description="We align with security, EA desks, and finance stakeholders from day one."
            />
            <ul className="mt-8 space-y-3 text-sm text-light-ink/90">
              {industries.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card variant="light" className="p-8">
            <h3 className="font-serif text-xl text-light-ink">Implementation arc</h3>
            <ol className="mt-6 space-y-6">
              {timeline.map((t, idx) => (
                <li key={t.phase} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-xs font-semibold text-light-ink">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-light-ink">{t.phase}</p>
                    <p className="mt-2 text-sm leading-relaxed text-light-muted">{t.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="cream">
        <CorporatePartnerPathway />
        <div className="mt-16">
          <CorporateDashboardWireframe />
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <Card variant="light" className="p-6">
              <h2 className="font-serif text-2xl text-light-ink">Program highlights</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-light-muted">
                <li>Dedicated account lead for routing changes and after-hours coverage.</li>
                <li>Monthly invoicing with NET 15 / NET 30 options and line-item transparency.</li>
                <li>Chauffeurs briefed on confidentiality, arrival choreography, and venue protocols.</li>
                <li>Optional security coordination layered onto existing itineraries.</li>
              </ul>
            </Card>
            <Card variant="light" className="p-6">
              <h2 className="font-serif text-2xl text-light-ink">Duty of care</h2>
              <p className="mt-3 text-sm leading-relaxed text-light-muted">
                Vehicles are inspected on a recurring maintenance calendar with interior detailing
                between principal assignments. Insurance certificates are available for procurement
                teams upon request.
              </p>
              <Link
                className="mt-4 inline-block text-sm font-medium text-light-ink underline decoration-accent/50 underline-offset-4"
                href="/faq"
              >
                Corporate FAQ topics
              </Link>
            </Card>
          </div>
          <CorporateAccountForm />
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        title="Schedule an executive program review"
        description="Submit your corporate profile or speak with the routing desk for same-day pivots."
        primaryHref="/experience-request"
        primaryLabel="Request briefing"
        secondaryHref={`tel:${site.phoneTel}`}
        secondaryLabel={site.phoneDisplay}
      />
    </>
  );
}
