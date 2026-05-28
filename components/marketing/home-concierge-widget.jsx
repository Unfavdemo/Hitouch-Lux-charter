import { homeConcierge } from "@/content/home";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function HomeConciergeWidget({ phoneTel, phoneDisplay, moovsBookingUrl }) {
  return (
    <Section className="border-y border-light-ink/8 bg-cream py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
            {homeConcierge.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-light-ink sm:text-4xl">
            {homeConcierge.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-light-muted sm:text-base">
            {homeConcierge.supporting}
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-4">
          <Button
            href={homeConcierge.primaryCta.href}
            variant="onLight"
            className="w-full justify-center px-10 py-3 sm:w-auto sm:min-w-[280px]"
          >
            {homeConcierge.primaryCta.label}
          </Button>
          <Button
            href={homeConcierge.secondaryCta.href}
            variant="onLightSecondary"
            className="w-full justify-center sm:w-auto sm:min-w-[220px]"
          >
            {homeConcierge.secondaryCta.label}
          </Button>
          <p className="mt-2 text-center text-xs leading-relaxed text-light-muted">
            {homeConcierge.tertiaryNote}{" "}
            <a
              className="font-medium text-light-ink underline decoration-accent/50 underline-offset-4 transition hover:text-accent"
              href={moovsBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {homeConcierge.tertiaryLabel}
            </a>
          </p>
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
