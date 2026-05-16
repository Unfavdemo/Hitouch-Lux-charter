import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Contact",
  description:
    "Reach HiTouch Luxury Charter by phone, email, or concierge booking—Philadelphia executive chauffeur service with tri-state coverage.",
};

const hours = [
  { label: "Concierge desk", value: "Monday–Saturday, 8:00a–8:00p ET" },
  { label: "After-hours movements", value: "On-call routing for retained accounts & emergencies" },
  { label: "Event weekends", value: "Extended coverage for contracted productions" },
];

export default function ContactPage() {
  return (
    <div className="pt-24">
      <Section className="bg-page pb-10 pt-10">
        <Container>
          <Badge>Contact</Badge>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-heading sm:text-5xl">
            Speak with a human—never a call center tree.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            For time-sensitive routing, call the private line. For detailed itineraries and
            vehicle selection, continue with secure online booking.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border-subtle bg-surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <Card className="border-border-subtle bg-page p-8">
              <h2 className="font-serif text-2xl text-heading">Direct lines</h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                    Phone
                  </dt>
                  <dd className="mt-2">
                    <a className="text-lg font-medium text-heading" href={`tel:${site.phoneTel}`}>
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                    Email
                  </dt>
                  <dd className="mt-2">
                    <a className="font-medium text-heading" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                    Service area
                  </dt>
                  <dd className="mt-2 text-muted">
                    {site.city}, {site.region} — {site.country}
                  </dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={site.moovsBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  Reserve online
                </Button>
              </div>
            </Card>
            <div className="space-y-6">
              <Card className="border-border-subtle bg-page p-8">
                <h2 className="font-serif text-2xl text-heading">Hours & escalation</h2>
                <ul className="mt-6 space-y-4 text-sm text-muted">
                  {hours.map((h) => (
                    <li key={h.label} className="border-b border-border-subtle pb-4 last:border-0 last:pb-0">
                      <p className="font-semibold text-charcoal">{h.label}</p>
                      <p className="mt-1">{h.value}</p>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="border-border-subtle bg-page p-8">
                <h2 className="font-serif text-2xl text-heading">Visit-by-appointment</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Operational briefings and walkthroughs for corporate procurement teams are
                  available by appointment. Day-of movements are coordinated digitally to keep
                  chauffeurs on schedule.
                </p>
                <Link
                  className="mt-4 inline-block text-sm font-medium text-heading underline decoration-accent/50 underline-offset-4"
                  href="/faq"
                >
                  Browse common questions
                </Link>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
