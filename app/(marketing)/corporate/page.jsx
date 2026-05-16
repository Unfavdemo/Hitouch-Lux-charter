import Link from "next/link";
import { CorporateAccountForm } from "@/components/marketing/corporate-account-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Corporate accounts",
  description:
    "Streamlined B2B onboarding for recurring executive travel profiles and structured monthly invoicing.",
};

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
      "Route patterns, principal preferences, after-hours coverage, and NDAs are captured alongside insurance certificate requirements.",
  },
  {
    phase: "Playbook build",
    detail:
      "We document door protocols, pronunciation cues, backup vehicles, and escalation trees so every movement feels repeatable.",
  },
  {
    phase: "Live operations",
    detail:
      "Dedicated account lead monitors changes, consolidates invoices, and adjusts staffing for board weeks or investor events.",
  },
];

export default function CorporatePage() {
  return (
    <div className="pt-24">
      <Section className="bg-page pb-8 pt-10">
        <Container>
          <Badge>Corporate travel desk</Badge>
          <h1 className="mt-4 font-serif text-4xl text-heading sm:text-5xl">
            Recurring executive mobility with predictable billing.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            HiTouch supports road-show cadence, after-hours movements, and consolidated reporting
            for finance teams. Submit your profile and we respond with contract templates and
            duty-of-care documentation aligned to procurement standards.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={site.moovsBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Book executive travel
            </Button>
            <Button href="/fleet" variant="secondary">
              Review fleet classes
            </Button>
            <Button href="/portal/corporate" variant="ghost" className="border border-heading/20">
              Corporate client sign-in
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border-subtle bg-surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl text-heading">Where we embed deepest</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Programs are tailored to teams that cannot afford friction at the door. We align
                with security, EA desks, and finance stakeholders from day one.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-charcoal">
                {industries.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-border-subtle bg-page p-8">
              <h3 className="font-serif text-xl text-heading">Implementation arc</h3>
              <ol className="mt-6 space-y-6">
                {timeline.map((t, idx) => (
                  <li key={t.phase} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-xs font-semibold text-charcoal">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-heading">{t.phase}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{t.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-page pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              <Card className="border-border-subtle bg-surface p-6">
                <h2 className="font-serif text-2xl text-heading">Program highlights</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                  <li>Dedicated account lead for routing changes and after-hours coverage.</li>
                  <li>Monthly invoicing with NET 15 / NET 30 options and line-item transparency.</li>
                  <li>Chauffeurs briefed on confidentiality, arrival choreography, and venue protocols.</li>
                  <li>Optional security coordination layered onto existing itineraries.</li>
                </ul>
              </Card>
              <Card className="border-border-subtle bg-surface p-6">
                <h2 className="font-serif text-2xl text-heading">Duty of care</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Vehicles are inspected on a recurring maintenance calendar with interior detailing
                  between principal assignments. Insurance certificates are available for
                  procurement teams upon request.
                </p>
                <Link
                  className="mt-4 inline-block text-sm font-medium text-heading underline decoration-accent/50 underline-offset-4"
                  href="/faq"
                >
                  Corporate FAQ topics
                </Link>
              </Card>
            </div>
            <CorporateAccountForm />
          </div>
        </Container>
      </Section>
    </div>
  );
}
