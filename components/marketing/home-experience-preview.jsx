import Image from "next/image";
import Link from "next/link";
import { homeExperienceIntro } from "@/content/home";
import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function HomeExperiencePreview({ packages }) {
  return (
    <Section className="luxury-grain relative overflow-hidden bg-midnight py-20 text-foreground lg:py-28">
      <div className="pointer-events-none absolute inset-0 luxury-mesh-dark" aria-hidden />
      <Container className="relative z-[1]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <LuxuryEyebrow light={false}>{homeExperienceIntro.eyebrow}</LuxuryEyebrow>
            <h2 className="luxury-display mt-6 text-3xl text-heading sm:text-4xl lg:text-[2.75rem]">
              {homeExperienceIntro.headline}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-on-dark-body sm:text-base">
              {homeExperienceIntro.supporting}
            </p>
          </div>
          <Button href={homeExperienceIntro.viewAllHref} variant="secondary" className="shrink-0">
            {homeExperienceIntro.viewAllLabel}
          </Button>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {packages.map((pkg, index) => (
            <Link
              key={pkg.id}
              href={pkg.href}
              className="luxury-image-card group flex flex-col bg-midnight/90"
            >
              <div className="relative aspect-[5/4] w-full overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 image-caption-scrim" />
                <span
                  className="absolute left-4 top-4 font-serif text-4xl text-accent-readable/40 transition-colors group-hover:text-accent-readable/60"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="absolute bottom-4 left-5 right-5 font-serif text-xl text-heading text-hero-shadow sm:text-2xl">
                  {pkg.title}
                </p>
              </div>
              <div className="flex flex-1 flex-col border-t border-white/10 bg-gradient-to-b from-surface/50 to-midnight p-5 sm:p-6">
                <p className="flex-1 text-sm leading-relaxed text-on-dark-body">{pkg.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
                  Begin this experience
                  <span aria-hidden className="transition-transform group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
