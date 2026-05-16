import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { services } from "@/content/services";
import { site } from "@/content/site";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Services",
  description:
    "Hourly charter, point-to-point, airport transfers, corporate VIP programs, weddings, and wine tours—each delivered with HiTouch discretion and hospitality.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24">
      <Section className="bg-page pb-10 pt-10">
        <Container>
          <Badge>Service catalog</Badge>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-heading sm:text-5xl">
            Every itinerary frame, executed with the same gold-glove discipline.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Select the service that best matches your day—then complete pickup, timing, and vehicle
            class when you reserve online.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={site.moovsBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Reserve online
            </Button>
            <Button href="/fleet" variant="secondary">
              Compare vehicle classes
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border-subtle bg-surface">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((s) => (
              <Card
                key={s.id}
                className="flex h-full flex-col border-border-subtle bg-page p-8"
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                  {s.name}
                </p>
                <h2 className="mt-3 font-serif text-2xl text-heading">{s.headline}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
                <div className="mt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Ideal for
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-charcoal">
                    {s.idealFor.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    href={site.moovsBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                  >
                    Book this frame
                  </Button>
                  <Link
                    className="text-sm font-medium text-heading underline decoration-accent/50 underline-offset-4"
                    href="/contact"
                  >
                    Ask a question first
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-midnight text-foreground">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
                B2B & production desks
              </p>
              <h2 className="mt-3 font-serif text-3xl">Programs beyond a single movement</h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                Corporate travel teams and event coordinators receive structured playbooks,
                consolidated invoicing options, and multi-vehicle choreography. Explore the
                dedicated portals below.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button href="/corporate" variant="secondary" className="border-heading/35 text-heading hover:bg-white/10">
                Corporate accounts
              </Button>
              <Button href="/events" variant="secondary" className="border-heading/35 text-heading hover:bg-white/10">
                Event coordination
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
