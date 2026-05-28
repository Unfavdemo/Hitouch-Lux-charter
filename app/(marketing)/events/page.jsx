import Link from "next/link";
import { EventCoordinatorForm } from "@/components/marketing/event-coordinator-form";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { pageHeroes } from "@/content/media";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Event coordination",
  description:
    "Multi-vehicle celebration choreography, front-of-house logistics, and guest movement for galas, weddings, and corporate summits.",
  path: "/events",
});

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
    <>
      <MarketingPageHero
        eyebrow="Celebration choreography"
        title="Production-grade logistics for high-attention guest lists."
        description="From multi-venue weddings to gala evenings with tight turnaround windows, we sequence vehicles and arrival cues so your front of house stays composed—and guests feel effortlessly guided."
        image={pageHeroes.events}
        imageAlt="Elegant wedding celebration setting"
        actions={
          <>
            <Button href="/experience-request" variant="primary">
              Start event inquiry
            </Button>
            <Button href="/fleet" variant="outlineLight">
              Review fleet mix
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <MarketingSectionHeading
              eyebrow="Capabilities"
              title="Every guest movement treated like a performance."
            />
            <ul className="mt-8 space-y-3 text-sm text-light-muted">
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
          <Card variant="light" className="p-6">
            <h3 className="font-serif text-xl text-light-ink">Illustrative vehicle matrix</h3>
            <p className="mt-2 text-xs text-light-muted">
              Counts are planning examples only—final staging is bespoke to your run-of-show.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[320px] text-left text-xs text-light-muted">
                <thead>
                  <tr className="border-b border-light-ink/10 text-[10px] font-semibold uppercase tracking-widest text-light-ink">
                    <th className="py-2 pr-4">Scenario</th>
                    <th className="py-2 pr-4">Sedan</th>
                    <th className="py-2 pr-4">SUV</th>
                    <th className="py-2">Sprinter</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row) => (
                    <tr key={row.scenario} className="border-b border-light-ink/10 last:border-0">
                      <td className="py-3 pr-4 font-medium text-light-ink">{row.scenario}</td>
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
      </MarketingPageSection>

      <MarketingPageSection tone="cream">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <Card variant="light" className="bg-paper p-6">
              <h2 className="font-serif text-2xl text-light-ink">Multi-vehicle coordination</h2>
              <p className="mt-3 text-sm leading-relaxed text-light-muted">
                Staggered arrivals, VIP holds, and Sprinter staging for wedding parties or board
                shuttles—all orchestrated from a single run-of-show document shared with your
                producing team.
              </p>
            </Card>
            <Card variant="light" className="bg-paper p-6">
              <h2 className="font-serif text-2xl text-light-ink">Front-of-house alignment</h2>
              <p className="mt-3 text-sm leading-relaxed text-light-muted">
                Chauffeurs align with door teams on pronunciation preferences, accessibility paths,
                and photography pauses so guests feel guided—not rushed.
              </p>
            </Card>
            <Card variant="light" className="bg-paper p-6">
              <h2 className="font-serif text-2xl text-light-ink">Guest check-in management</h2>
              <p className="mt-3 text-sm leading-relaxed text-light-muted">
                Optional branded welcome lines, manifest reconciliation, and discreet escorts for
                talent or executive principals moving through dense crowds.
              </p>
              <Link
                className="mt-4 inline-block text-sm font-medium text-light-ink underline decoration-accent/50 underline-offset-4"
                href="/contact"
              >
                Talk with a coordinator
              </Link>
            </Card>
          </div>
          <EventCoordinatorForm />
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        title="Building a run-of-show?"
        description="Share venues, guest counts, and timing windows—our coordinators return a choreographed vehicle plan."
        primaryHref="/experience-request"
        primaryLabel="Event experience request"
        secondaryHref="/contact"
        secondaryLabel="Contact desk"
      />
    </>
  );
}
