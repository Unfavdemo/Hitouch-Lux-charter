import { experienceJourney } from "@/content/home";
import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function HomeExperienceJourney() {
  return (
    <Section className="luxury-mesh-light relative overflow-hidden border-y border-light-ink/8 bg-paper py-20 lg:py-28">
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <LuxuryEyebrow className="justify-center">{experienceJourney.eyebrow}</LuxuryEyebrow>
          <h2 className="luxury-display mt-6 text-3xl text-light-ink sm:text-4xl">
            {experienceJourney.headline}
          </h2>
          <div className="mx-auto mt-5 h-px w-14 bg-gradient-to-r from-transparent via-accent/80 to-transparent" aria-hidden />
          <p className="mt-6 text-sm leading-relaxed text-light-muted sm:text-base">
            {experienceJourney.supporting}
          </p>
        </div>

        <ol className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6">
          {experienceJourney.steps.map((step, index) => (
            <li key={step.id} className="luxury-card-light relative flex flex-col p-8">
              <span
                className="font-serif text-5xl font-normal leading-none text-accent/30"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-xl tracking-tight text-light-ink sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-light-muted">{step.body}</p>
              {index < experienceJourney.steps.length - 1 ? (
                <span
                  className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-accent/50 to-transparent md:block"
                  aria-hidden
                />
              ) : null}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
