import { philosophyIntro, valuePillars } from "@/content/home";
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

        <div className="mt-16 grid auto-rows-fr gap-6 md:grid-cols-12 md:gap-8">
          {valuePillars.map((p) => {
            const span =
              p.span === "tall"
                ? "md:col-span-7 md:row-span-2 md:min-h-[22rem]"
                : p.span === "wide"
                  ? "md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3"
                  : "md:col-span-5";
            return (
              <article key={p.id} className={`luxury-card-light group flex flex-col justify-between p-8 lg:p-10 ${span}`}>
                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-light-ink lg:text-[1.65rem]">
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-prose text-sm leading-relaxed text-light-muted lg:text-base">
                    {p.body}
                  </p>
                </div>
                <div
                  className="mt-10 h-px w-12 bg-gradient-to-r from-accent/90 to-accent/20 transition-all duration-500 group-hover:w-20"
                  aria-hidden
                />
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
