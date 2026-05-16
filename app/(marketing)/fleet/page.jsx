import Image from "next/image";
import Link from "next/link";
import { FleetShowcase } from "@/components/marketing/fleet-showcase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { fleet } from "@/content/fleet";
import { site } from "@/content/site";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Fleet",
  description:
    "HiTouch Luxury Charter vehicle classes for Greater Philadelphia and tri-state executive travel—seating, luggage, Wi‑Fi, and partition options.",
};

const standards = [
  {
    title: "Detailing cadence",
    body: "Interiors are vacuumed, surfaces treated, and glass polished between principal assignments. Cabin scent is neutral unless a signature preference is on file.",
  },
  {
    title: "Mechanical readiness",
    body: "Preventive maintenance schedules align with manufacturer guidance and duty-of-care expectations for highway and urban driving.",
  },
  {
    title: "Wi‑Fi & power",
    body: "Productivity-ready power at every seat with hotspot-first connectivity for live calls and document review while in motion.",
  },
];

export default function FleetPage() {
  return (
    <div className="pt-24">
      <Section className="bg-page pb-8 pt-10">
        <Container>
          <Badge>Fleet</Badge>
          <h1 className="mt-4 font-serif text-4xl text-heading sm:text-5xl">
            A disciplined vehicle program for principals who notice the cabin.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Every class below is staged the same way we operate on the road: inspected, detailed,
            and briefed before wheels roll. Use this page to compare seating, luggage, connectivity,
            and privacy options across {site.brandName}&apos;s core lineup.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            When you{" "}
            <a
              className="font-medium text-heading underline decoration-accent/50 underline-offset-4 hover:decoration-accent"
              href={site.moovsBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              reserve online
            </a>
            , you&apos;ll choose a vehicle class in the same spirit as our gallery—live inventory
            and exact assignments are confirmed for your date and route by the routing desk.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={site.moovsBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Reserve a class
            </Button>
            <Button href="/services" variant="secondary">
              Review services
            </Button>
          </div>
        </Container>
      </Section>
      <Section className="bg-midnight pb-16 text-foreground">
        <Container>
          <FleetShowcase vehicles={fleet} />
        </Container>
      </Section>

      <Section className="bg-page">
        <Container>
          <h2 className="font-serif text-3xl text-heading">Class-by-class snapshot</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Scroll each card for photography; open specifications for amenity highlights. Final
            assignments may vary by availability and itinerary.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {fleet.map((v) => (
              <Card key={v.id} className="overflow-hidden border-border-subtle bg-surface">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={v.imageSrc}
                    alt={v.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    {v.class}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-heading">{v.name}</h3>
                  <p className="mt-2 text-sm text-muted">{v.tagline}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted">
                    <div>
                      <dt className="font-semibold text-charcoal">Seats</dt>
                      <dd>{v.passengers}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-charcoal">Luggage</dt>
                      <dd>{v.luggage} bags</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-charcoal">Wi‑Fi</dt>
                      <dd>{v.wifi ? "Yes" : "On request"}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-charcoal">Partition</dt>
                      <dd>{v.partition ? "Available" : "N/A"}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 font-serif text-lg text-heading">
                    {v.requestQuote || v.fromPriceUsd == null
                      ? "Request quote"
                      : `From $${v.fromPriceUsd}`}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border-subtle bg-surface">
        <Container>
          <h2 className="font-serif text-3xl text-heading">Readiness standards</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {standards.map((s) => (
              <Card key={s.title} className="border-border-subtle bg-page p-6">
                <h3 className="font-serif text-xl text-heading">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-midnight text-foreground">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-serif text-3xl">Need a tailored proposal?</h2>
              <p className="mt-2 max-w-xl text-sm text-foreground/80">
                Share party size, luggage profile, and timing when you reserve online—or call the
                private line for same-day pivots.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                href={site.moovsBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="border-heading/35 text-heading hover:bg-white/10"
              >
                Reserve online
              </Button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-white/25 px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent hover:bg-white/5"
              >
                Contact desk
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
