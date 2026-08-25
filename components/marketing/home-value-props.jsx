import { philosophyIntro, servicePromises } from "@/content/home";
import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function HomeValueProps() {
  return (
    <Section id="experience" className="luxury-mesh-cream relative scroll-mt-28 overflow-hidden bg-cream py-20 lg:py-28">
      <Container className="relative">
        <LuxuryEyebrow className="max-w-full">{philosophyIntro.eyebrow}</LuxuryEyebrow>
        <h2 className="luxury-display mt-6 max-w-4xl text-3xl text-light-ink sm:text-4xl lg:text-[2.75rem]">
          {philosophyIntro.headline}
        </h2>
        <div className="mt-6 h-px w-16 bg-gradient-to-r from-accent/90 to-transparent" aria-hidden />
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-light-muted lg:text-lg">
          {philosophyIntro.supporting}
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {servicePromises.map((p, index) => (
            <article
              key={p.id}
              className={`luxury-card-light group flex flex-col justify-between p-8 lg:p-9 ${
                index === servicePromises.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div>
                <p
                  className="font-serif text-3xl leading-none text-accent/40 transition-colors duration-500 group-hover:text-accent/70"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-sm font-semibold uppercase tracking-[var(--tracking-brand)] text-light-ink">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-prose text-sm leading-relaxed text-light-muted lg:text-base">
                  {p.body}
                </p>
              </div>
              <div
                className="mt-8 h-px w-12 bg-gradient-to-r from-accent/90 to-accent/20 transition-all duration-500 group-hover:w-20"
                aria-hidden
              />
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
