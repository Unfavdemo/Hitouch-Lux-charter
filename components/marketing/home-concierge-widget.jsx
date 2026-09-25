import { homeConcierge } from "@/content/home";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function HomeConciergeWidget({ phoneTel, phoneDisplay }) {
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

        <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4">
          <Button
            href={homeConcierge.primaryCta.href}
            variant="onLight"
            className="w-full justify-center px-8 py-3 sm:min-w-[260px]"
          >
            {homeConcierge.primaryCta.label}
          </Button>
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
