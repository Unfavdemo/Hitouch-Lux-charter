import Link from "next/link";
import { EventCoordinatorForm } from "@/components/marketing/event-coordinator-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Event coordination",
  description:
    "Multi-vehicle coordination, front-of-house logistics, and guest check-in management for galas, weddings, and corporate summits.",
};

const checklist = [
  "Single run-of-show document shared with producing teams",
  "Staggered arrivals, VIP holds, and Sprinter staging windows",
  "Manifest reconciliation with door teams and photography pauses",
  "Branded welcome lines and discreet escorts on request",
  "After-party sequencing and late-night principal coverage",
];

const matrix = [
  { scenario: "Multi-venue wedding", sedan: "2", suv: "4", sprinter: "2" },
  { scenario: "Gala + after-party", sedan: "VIP holds", suv: "Shuttle loops", sprinter: "Talent pods" },
  { scenario: "Corporate summit", sedan: "Executive legs", suv: "Team blocks", sprinter: "Press moves" },
];

export default function EventsPage() {
  return (
    <div className="pt-24">
      <Section className="bg-page pb-8 pt-10">
        <Container>
          <Badge>Event coordinators</Badge>
          <h1 className="mt-4 font-serif text-4xl text-heading sm:text-5xl">
            Production-grade logistics for high-attention guest lists.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            From multi-venue weddings to gala evenings with tight turnaround windows, HiTouch
            sequences vehicles, load-in times, and arrival cues so your front of house stays
            composed—while guests feel effortlessly guided.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={site.moovsBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Start an event inquiry
            </Button>
            <Button href="/fleet" variant="secondary">
              Review fleet mix
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border-subtle bg-surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl text-heading">Capabilities checklist</h2>
              <ul className="mt-6 space-y-3 text-sm text-muted">
                {checklist.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-0.5 text-accent" aria-hidden>
                      ✓
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-border-subtle bg-page p-6">
              <h3 className="font-serif text-xl text-heading">Illustrative vehicle matrix</h3>
              <p className="mt-2 text-xs text-muted">
                Counts are planning examples only—final staging is bespoke to your run-of-show.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[320px] text-left text-xs text-muted">
                  <thead>
                    <tr className="border-b border-border-subtle text-[10px] font-semibold uppercase tracking-widest text-charcoal">
                      <th className="py-2 pr-4">Scenario</th>
                      <th className="py-2 pr-4">Sedan</th>
                      <th className="py-2 pr-4">SUV</th>
                      <th className="py-2">Sprinter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.map((row) => (
                      <tr key={row.scenario} className="border-b border-border-subtle last:border-0">
                        <td className="py-3 pr-4 font-medium text-charcoal">{row.scenario}</td>
                        <td className="py-3 pr-4">{row.sedan}</td>
                        <td className="py-3 pr-4">{row.suv}</td>
                        <td className="py-3">{row.sprinter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-page pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              <Card className="border-border-subtle bg-surface p-6">
                <h2 className="font-serif text-2xl text-heading">Multi-vehicle coordination</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Staggered arrivals, VIP holds, and Sprinter staging for wedding parties or board
                  shuttles—all orchestrated from a single run-of-show document shared with your
                  producing team.
                </p>
              </Card>
              <Card className="border-border-subtle bg-surface p-6">
                <h2 className="font-serif text-2xl text-heading">Front-of-house alignment</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Chauffeurs align with door teams on pronunciation preferences, accessibility paths,
                  and photography pauses so guests feel guided—not rushed.
                </p>
              </Card>
              <Card className="border-border-subtle bg-surface p-6">
                <h2 className="font-serif text-2xl text-heading">Guest check-in management</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Optional branded welcome lines, manifest reconciliation, and discreet escorts for
                  talent or executive principals moving through dense crowds.
                </p>
                <Link
                  className="mt-4 inline-block text-sm font-medium text-heading underline decoration-accent/50 underline-offset-4"
                  href="/contact"
                >
                  Talk with a coordinator
                </Link>
              </Card>
            </div>
            <EventCoordinatorForm />
          </div>
        </Container>
      </Section>
    </div>
  );
}
