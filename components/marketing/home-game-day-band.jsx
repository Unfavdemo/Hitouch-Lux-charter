import Image from "next/image";
import Link from "next/link";
import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { gameDayExperiences } from "@/content/experiences";
import { gameDayPromise } from "@/content/game-day";
import { media } from "@/content/media";

/** Home page Game Day feature — links into the hub and each team page. */
export function HomeGameDayBand() {
  return (
    <section className="luxury-grain relative overflow-hidden bg-midnight py-20 text-foreground lg:py-28">
      <Image
        src={media.arenaInterior}
        alt=""
        fill
        sizes="100dvw"
        className="object-cover object-center opacity-[0.18]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/92 to-midnight/70" />
      <div className="pointer-events-none absolute inset-0 luxury-mesh-dark" aria-hidden />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <LuxuryEyebrow light={false}>Game day</LuxuryEyebrow>
            <h2 className="luxury-display mt-6 text-3xl leading-tight text-heading sm:text-4xl lg:text-[3rem]">
              The game starts before tipoff.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-on-dark-body">
              Private pickup. Curated vehicle experience. Coordinated arrival. Dedicated return
              transportation.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {gameDayPromise.negatives.map((line) => (
                <li key={line} className="text-sm font-medium text-charcoal">
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-serif text-2xl tracking-tight text-accent-readable sm:text-3xl">
              {gameDayPromise.closing}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/game-day" variant="primary">
                Game day experiences
              </Button>
              <Button
                href="/experience-request"
                variant="secondary"
                className="border-heading/35 text-heading hover:bg-white/10"
              >
                Request game day service
              </Button>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {gameDayExperiences.map((experience) => (
              <li key={experience.slug}>
                <Link
                  href={experience.href}
                  className="group flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] px-5 py-4 transition-colors hover:border-accent/40 hover:bg-white/[0.07]"
                >
                  <span>
                    <span className="block font-serif text-lg tracking-tight text-heading">
                      {experience.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] uppercase tracking-[var(--tracking-nav)] text-accent-readable">
                      {experience.eyebrow}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-accent-readable transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
