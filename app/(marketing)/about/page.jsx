import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "About HiTouch",
  description:
    "Philadelphia-founded luxury chauffeur service with gold-glove standards, discreet professionals, and vehicles prepared for principals and guests of honor.",
};

const standards = [
  {
    title: "Chauffeur excellence",
    body: "Professional presentation, route intelligence, and quiet confidence behind the wheel—trained to read the room and protect your time.",
  },
  {
    title: "Vehicle discipline",
    body: "Interior detailing between assignments, climate staging before pickup, and proactive mechanical programs that keep the cabin showroom-calm.",
  },
  {
    title: "Confidentiality first",
    body: "We understand high-profile itineraries. Executive protection and licensed armed security details are coordinated only after compliance review.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      <Section className="bg-page pb-10 pt-10">
        <Container>
          <Badge>Our firm</Badge>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-heading sm:text-5xl">
            A Philadelphia house style with tri-state reach.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            HiTouch Luxury Charter was built for clients who notice the details—the
            temperature of the cabin, the pronunciation of a venue name, the calm tempo
            of a chauffeur who never rushes a principal. We combine hospitality instincts
            with executive transportation discipline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={site.moovsBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Plan a movement
            </Button>
            <Button href="/contact" variant="secondary">
              Speak with concierge
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border-subtle bg-surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="font-serif text-3xl text-heading">What “HiTouch” means here</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                It is not a slogan—it is an operating standard. From curated refreshments to
                music preferences, we stage the cabin before you arrive. From airport greets
                to gala departures, we choreograph door times with your hosts, security, and
                production teams so the evening feels effortless on the surface.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {site.coverageBlurb}
              </p>
            </div>
            <Card className="border-border-subtle bg-page p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
                At a glance
              </p>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-6 border-b border-border-subtle pb-4">
                  <dt className="text-muted">Private line</dt>
                  <dd>
                    <a className="font-medium text-heading" href={`tel:${site.phoneTel}`}>
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-border-subtle pb-4">
                  <dt className="text-muted">Concierge email</dt>
                  <dd>
                    <a className="font-medium text-heading" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-muted">HQ region</dt>
                  <dd className="text-right font-medium text-charcoal">
                    {site.city}, {site.region}
                  </dd>
                </div>
              </dl>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-midnight text-foreground">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
            Operating standards
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Non-negotiables on every assignment</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {standards.map((s) => (
              <Card key={s.title} className="border-white/10 bg-midnight/40 p-6 text-foreground">
                <h3 className="font-serif text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{s.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-page">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] border border-border-subtle bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="font-serif text-2xl text-heading">Ready for a curated proposal?</h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Share your itinerary through secure online booking or call the private line for
                same-day pivots.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                href={site.moovsBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                Reserve online
              </Button>
              <Link
                className="inline-flex items-center justify-center rounded-md border border-border-subtle px-5 py-2.5 text-sm font-medium text-charcoal hover:border-accent hover:bg-accent-soft/40"
                href="/faq"
              >
                Read FAQ
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
