import Link from "next/link";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Contact concierge",
  description:
    "Reach the HiTouch experience concierge by phone or email—Philadelphia curated luxury programs with tri-state coverage.",
  path: "/contact",
});

const hours = [
  { label: "Concierge desk", value: "Monday–Saturday, 8:00a–8:00p ET" },
  { label: "After-hours movements", value: "On-call routing for retained accounts & emergencies" },
  { label: "Event weekends", value: "Extended coverage for contracted productions" },
];

export default function ContactPage() {
  return (
    <>
      <MarketingPageHero
        eyebrow="Experience concierge"
        title="Speak with a human—never a call center tree."
        description="For time-sensitive choreography, call the private line. For curated proposals and bespoke evenings, start with an experience request."
        actions={
          <>
            <Button href={`tel:${site.phoneTel}`} variant="onLight">
              {site.phoneDisplay}
            </Button>
            <Button href="/experience-request" variant="onLightSecondary">
              Experience request
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper">
        <div className="grid gap-10 lg:grid-cols-2">
          <Card variant="light" className="p-8">
            <h2 className="font-serif text-2xl text-light-ink">Direct lines</h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-light-muted">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a className="text-lg font-medium text-light-ink" href={`tel:${site.phoneTel}`}>
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-light-muted">
                  Email
                </dt>
                <dd className="mt-2">
                  <a className="font-medium text-light-ink" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-light-muted">
                  Service area
                </dt>
                <dd className="mt-2 text-light-muted">
                  {site.city}, {site.region} — {site.country}
                </dd>
              </div>
            </dl>
          </Card>
          <div className="space-y-6">
            <Card variant="light" className="p-8">
              <h2 className="font-serif text-2xl text-light-ink">Hours & escalation</h2>
              <ul className="mt-6 space-y-4 text-sm text-light-muted">
                {hours.map((h) => (
                  <li key={h.label} className="border-b border-light-ink/10 pb-4 last:border-0 last:pb-0">
                    <p className="font-semibold text-light-ink">{h.label}</p>
                    <p className="mt-1">{h.value}</p>
                  </li>
                ))}
              </ul>
            </Card>
            <Card variant="light" className="p-8">
              <h2 className="font-serif text-2xl text-light-ink">Visit-by-appointment</h2>
              <p className="mt-3 text-sm leading-relaxed text-light-muted">
                Operational briefings for corporate procurement teams are available by appointment.
                Day-of movements are coordinated digitally to keep chauffeurs on schedule.
              </p>
              <Link
                className="mt-4 inline-block text-sm font-medium text-light-ink underline decoration-accent/50 underline-offset-4"
                href="/faq"
              >
                Browse common questions
              </Link>
            </Card>
          </div>
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        title="Ready to architect your evening?"
        description="Tell us the occasion—we'll return a choreographed proposal with vehicle class, route cadence, and cabin staging."
        primaryHref="/experience-request"
        primaryLabel="Request an experience"
        secondaryHref="/book"
        secondaryLabel="Get a trip estimate"
      />
    </>
  );
}
