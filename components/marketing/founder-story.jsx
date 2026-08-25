import Image from "next/image";
import { founderStory } from "@/content/home";
import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/** Why HiTouch exists — founder story with the service philosophy. */
export function FounderStory({ id = "why-hitouch" }) {
  return (
    <Section
      id={id}
      className="luxury-grain relative scroll-mt-28 overflow-hidden bg-midnight py-20 text-foreground lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 luxury-mesh-dark" aria-hidden />
      <Container className="relative z-[1]">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <LuxuryEyebrow light={false}>{founderStory.eyebrow}</LuxuryEyebrow>
            <h2 className="luxury-display mt-6 text-3xl text-heading sm:text-4xl lg:text-[2.75rem]">
              {founderStory.headline}
            </h2>
            <div className="mt-6 h-px w-16 bg-gradient-to-r from-accent/90 to-transparent" aria-hidden />
            {founderStory.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-6 max-w-xl text-sm leading-relaxed text-on-dark-body sm:text-base"
              >
                {paragraph}
              </p>
            ))}
            <figure className="mt-10 border-l-2 border-accent/70 pl-6">
              <blockquote className="font-serif text-xl leading-snug text-heading sm:text-2xl">
                “{founderStory.quote}”
              </blockquote>
              <figcaption className="mt-3 text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
                {founderStory.quoteLabel}
              </figcaption>
            </figure>
          </div>
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/10">
            <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={founderStory.image}
                alt={founderStory.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
