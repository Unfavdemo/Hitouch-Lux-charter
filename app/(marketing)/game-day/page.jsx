import Image from "next/image";
import Link from "next/link";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { gameDayExperiences, teamAffiliationDisclaimer } from "@/content/experiences";
import { gameDayCorporate, gameDayHero, gameDayPillars, gameDayPromise } from "@/content/game-day";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbListJsonLd, itemListJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Game day transportation in Philadelphia",
  description:
    "Private game day transportation in Philadelphia for basketball, football, baseball, and hockey. Private pickup, coordinated arrival, and a dedicated chauffeur waiting after the game. No parking, no surge pricing.",
  path: "/game-day",
});

export default function GameDayPage() {
  return (
    <>
      <JsonLdScript
        data={[
          serviceJsonLd({
            name: "Game day private transportation",
            description:
              "Private round-trip game day transportation in Philadelphia with coordinated arrival and dedicated return service.",
            path: "/game-day",
          }),
          itemListJsonLd({
            name: "Game day experiences",
            items: gameDayExperiences.map((e) => ({
              name: e.title,
              description: e.tagline,
              url: e.href,
            })),
          }),
          breadcrumbListJsonLd([
            { name: "Home", path: "/" },
            { name: "Game Day", path: "/game-day" },
          ]),
        ]}
      />

      <MarketingPageHero
        eyebrow={gameDayHero.eyebrow}
        title={gameDayHero.headline}
        description={gameDayHero.supporting}
        image={pageHeroes.gameDay}
        imageAlt={gameDayHero.imageAlt}
        actions={
          <>
            <Button href="/experience-request" variant="primary">
              Request game day service
            </Button>
            <Button href={`tel:${site.phoneTel}`} variant="outlineLight">
              {site.phoneDisplay}
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="dark">
        <div className="mx-auto max-w-3xl text-center">
          <ul className="flex flex-col items-center gap-3 sm:gap-4">
            {gameDayPromise.negatives.map((line) => (
              <li
                key={line}
                className="luxury-display text-2xl leading-tight text-heading sm:text-3xl lg:text-[2.25rem]"
              >
                {line}
              </li>
            ))}
          </ul>
          <div
            className="mx-auto mt-10 h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent"
            aria-hidden
          />
          <p className="mt-10 luxury-display text-3xl text-accent-readable sm:text-4xl">
            {gameDayPromise.closing}
          </p>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <MarketingSectionHeading
          eyebrow="What game day looks like"
          title="Four things, handled every time."
          description="The same standard whether it is a Tuesday in January or a Sunday in December."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {gameDayPillars.map((pillar, index) => (
            <article key={pillar.id} className="luxury-card-light group p-7 sm:p-8">
              <span className="font-serif text-3xl leading-none text-accent/45" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-serif text-xl tracking-tight text-light-ink sm:text-2xl">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-light-muted">{pillar.body}</p>
              <span
                className="mt-7 block h-px w-10 bg-gradient-to-r from-accent/90 to-accent/20 transition-all duration-500 group-hover:w-16"
                aria-hidden
              />
            </article>
          ))}
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="cream" borderTop>
        <MarketingSectionHeading
          eyebrow="Choose your night"
          title="Every game has its own rhythm. So does the transportation."
          description="Each experience below has its own page, its own timing, and its own inquiry form."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {gameDayExperiences.map((experience) => (
            <li key={experience.slug} className="flex">
              <Link
                href={experience.href}
                className="luxury-image-card group flex w-full flex-col bg-midnight/85"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={experience.image}
                    alt={experience.imageAlt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 image-caption-scrim" />
                  <div className="absolute bottom-5 left-6 right-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
                      {experience.eyebrow}
                    </p>
                    <p className="mt-2 font-serif text-2xl text-heading text-hero-shadow">
                      {experience.title}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col border-t border-white/10 bg-gradient-to-b from-surface/50 to-midnight p-6">
                  <p className="flex-1 text-sm leading-relaxed text-on-dark-body">
                    {experience.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
                    View this experience
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </MarketingPageSection>

      <MarketingPageSection tone="dark">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <MarketingSectionHeading
              eyebrow={gameDayCorporate.eyebrow}
              title={gameDayCorporate.headline}
              description={gameDayCorporate.body}
              light={false}
            />
            <Button
              href={gameDayCorporate.cta.href}
              variant="secondary"
              className="mt-9 border-heading/35 text-heading hover:bg-white/10"
            >
              {gameDayCorporate.cta.label}
            </Button>
          </div>
          <div className="luxury-card-glass p-8 sm:p-10">
            <p className="font-serif text-xl text-heading sm:text-2xl">Season-long arrangements</p>
            <p className="mt-4 text-sm leading-relaxed text-on-dark-body">
              If you hold season tickets, membership is usually the better answer. Your game nights
              are reserved in advance, priced at member rates with no surge, and handled without a
              booking conversation each time.
            </p>
            <Button href="/memberships" variant="primary" className="mt-7">
              Explore membership
            </Button>
          </div>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <p className="mx-auto max-w-3xl rounded-[var(--radius-card)] border border-light-ink/10 bg-cream px-6 py-5 text-xs leading-relaxed text-light-muted">
          {teamAffiliationDisclaimer}
        </p>
      </MarketingPageSection>

      <MarketingCtaBand
        eyebrow="Just game day, handled."
        title="Tell us the game. We'll handle the rest."
        description="Send us the date and the group size. We return a plan and a firm quote within one business day."
        primaryHref="/experience-request"
        primaryLabel="Request game day service"
        secondaryHref={`tel:${site.phoneTel}`}
        secondaryLabel={site.phoneDisplay}
      />
    </>
  );
}
