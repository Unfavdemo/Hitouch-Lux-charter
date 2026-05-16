import { philosophyIntro, valuePillars } from "@/content/home";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const cardBase =
  "flex flex-col justify-between rounded-[var(--radius-card)] border border-light-ink/10 bg-paper p-8 shadow-sm transition-shadow hover:shadow-md lg:p-10";

export function HomeValueProps() {
  return (
    <Section id="experience" className="scroll-mt-28 bg-cream py-20 lg:py-28">
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
          {philosophyIntro.eyebrow}
        </p>
        <h2 className="mt-5 max-w-4xl font-serif text-3xl font-normal leading-[1.15] tracking-tight text-light-ink sm:text-4xl lg:text-[2.65rem]">
          {philosophyIntro.headline}
        </h2>
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
              <article
                key={p.id}
                className={`${cardBase} ${span}`}
              >
                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-light-ink lg:text-[1.65rem]">
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-prose text-sm leading-relaxed text-light-muted lg:text-base">
                    {p.body}
                  </p>
                </div>
                <div className="mt-10 h-px w-12 bg-accent/80" aria-hidden />
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
