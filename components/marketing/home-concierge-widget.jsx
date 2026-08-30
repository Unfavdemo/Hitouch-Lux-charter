import { homeConcierge } from "@/content/home";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function HomeConciergeWidget({ phoneTel, phoneDisplay, moovsBookingUrl }) {
  return (
    <Section className="border-y border-light-ink/8 bg-cream py-14 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-on-light">
            {homeConcierge.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-tight text-light-ink sm:text-4xl">
            {homeConcierge.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-light-muted sm:text-base">
            {homeConcierge.supporting}
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4">
          <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row">
            <Button
              href={homeConcierge.primaryCta.href}
              variant="onLight"
              className="justify-center px-8 py-3 sm:min-w-[240px]"
            >
              {homeConcierge.primaryCta.label}
            </Button>
            <Button
              href={homeConcierge.secondaryCta.href}
              variant="onLightSecondary"
              className="justify-center sm:min-w-[220px]"
            >
              {homeConcierge.secondaryCta.label}
            </Button>
            {homeConcierge.membershipCta ? (
              <Button
                href={homeConcierge.membershipCta.href}
                variant="onLightSecondary"
                className="justify-center sm:min-w-[220px]"
              >
                {homeConcierge.membershipCta.label}
              </Button>
            ) : null}
          </div>
          <p className="mt-2 text-center text-xs leading-relaxed text-light-muted">
            {homeConcierge.tertiaryNote}{" "}
            <a
              className="font-medium text-light-ink underline decoration-accent-on-light/50 underline-offset-4 transition hover:text-accent-on-light"
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
              className="font-medium text-light-ink underline decoration-accent-on-light/50 underline-offset-4 transition hover:text-accent-on-light"
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
