import { FleetShowcase } from "@/components/marketing/fleet-showcase";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function HomeFleetSection({ vehicles }) {
  return (
    <Section className="bg-midnight py-14 text-foreground lg:py-20">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
              The fleet
            </p>
            <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-heading sm:text-4xl">
              Your cabin is part of the experience—not an afterthought.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-on-dark-body sm:text-base">
              Sedans, executive SUVs, and the Executive Sprinter—studio-prepared, detailed, and
              briefed to match the tone of your day.
            </p>
          </div>
          <Button href="/fleet" variant="secondary" className="border-heading/35 text-heading hover:bg-white/10">
            Explore the fleet
          </Button>
        </div>
        <div className="mt-10">
          <FleetShowcase vehicles={vehicles} />
        </div>
      </Container>
    </Section>
  );
}
