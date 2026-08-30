import Image from "next/image";
import { heroContent } from "@/content/home";
import { Button } from "@/components/ui/button";

export function HomeHero({ site }) {
  return (
    <section className="relative overflow-hidden bg-midnight text-foreground md:min-h-[min(92vh,52rem)]">
      <Image
        src={heroContent.image}
        alt={heroContent.imageAlt}
        fill
        priority
        sizes="100dvw"
        className="object-cover object-center opacity-50"
      />
      <div className="absolute inset-0 hero-scrim-strong" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/85 via-midnight/30 to-midnight/55" />

      <div className="relative mx-auto flex max-w-6xl flex-col justify-start px-4 pb-16 pt-28 sm:px-6 sm:pb-20 md:min-h-[min(92vh,52rem)] md:justify-end md:pb-24 md:pt-36 lg:px-8 lg:pb-28 lg:pt-40">
        <p className="luxury-reveal text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
          {heroContent.eyebrow}
        </p>
        <h1 className="luxury-reveal luxury-reveal-delay-1 mt-5 max-w-4xl font-serif text-[2.1rem] font-normal uppercase leading-[1.14] tracking-[0.06em] text-heading text-hero-shadow sm:text-5xl lg:text-6xl">
          {(heroContent.headlineLines ?? [heroContent.headline]).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="luxury-reveal luxury-reveal-delay-2 mt-8 max-w-2xl text-base leading-relaxed text-on-dark-body sm:text-lg lg:text-xl">
          {heroContent.supporting}
        </p>
        <div className="luxury-reveal luxury-reveal-delay-3 mt-12 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            href={heroContent.primaryCta.href}
            variant="primary"
            className="sm:min-w-[260px]"
          >
            {heroContent.primaryCta.label}
          </Button>
          <Button
            href={heroContent.secondaryCta.href}
            variant="outlineLight"
            className="sm:min-w-[220px]"
          >
            {heroContent.secondaryCta.label}
          </Button>
        </div>
        <p className="luxury-reveal luxury-reveal-delay-3 mt-6 text-sm text-on-dark-muted">
          Experience concierge{" "}
          <a
            className="font-medium text-heading underline decoration-accent-readable/70 underline-offset-4"
            href={`tel:${site.phoneTel}`}
          >
            {site.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
