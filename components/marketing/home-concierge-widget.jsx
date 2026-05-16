import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function HomeConciergeWidget({ phoneTel, phoneDisplay, moovsBookingUrl }) {
  return (
    <Section className="border-y border-light-ink/8 bg-cream py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
            Reserve
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-light-ink sm:text-4xl">
            Confirm your movement
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-light-muted sm:text-base">
            Secure online booking for itineraries, vehicle class, and timing. Same concierge team
            reviews every request. For urgent or same-day service, call the private line.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-6">
          <Button
            href={moovsBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="onLight"
            className="w-full justify-center px-10 py-3 sm:w-auto sm:min-w-[260px]"
          >
            Reserve online
          </Button>
          <p className="text-center text-sm text-light-muted">
            Private line{" "}
            <a
              className="font-medium text-light-ink underline decoration-accent/50 underline-offset-4 transition hover:text-accent"
              href={`tel:${phoneTel}`}
            >
              {phoneDisplay}
            </a>
          </p>
        </div>
      </Container>
    </Section>
  );
}
