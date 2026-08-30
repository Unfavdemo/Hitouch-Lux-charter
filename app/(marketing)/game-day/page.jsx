import { ExperiencePackageCard } from "@/components/marketing/experience-package-card";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { gameDayExperiences, gameDayHub, teamDisclaimer } from "@/content/experiences";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { itemListJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Game Day transportation & experiences | Sixers, Eagles, Phillies, Flyers",
  description:
    "Private game day transportation in Philadelphia. Sixers, Eagles, Phillies, and Flyers experiences—private pickup, curated vehicle experience, coordinated arrival, and dedicated return. No parking. No surge pricing. No logistics.",
  path: "/game-day",
});

const gameDaySteps = [
  {
    id: "pickup",
    title: "Private pickup",
    body: "From home, office, or dinner—your chauffeur arrives with the cabin staged and the route already planned.",
  },
  {
    id: "arrival",
    title: "Coordinated arrival",
    body: "Timed to tipoff, kickoff, first pitch, or puck drop—with traffic and venue approach handled for you.",
  },
  {
    id: "return",
    title: "Dedicated return",
    body: "Your vehicle is staged before the game ends. Walk out, get in, go home. No searching, no surge.",
  },
];

export default function GameDayPage() {
  const listItems = gameDayExperiences.map((e) => ({
    name: e.title,
    description: e.cardBlurb,
    url: `/experiences/${e.slug}`,
  }));

  return (
    <>
      <JsonLdScript
        data={itemListJsonLd({ name: "Game Day experiences", items: listItems })}
      />
      <MarketingPageHero
        eyebrow={gameDayHub.eyebrow}
        title={gameDayHub.headline}
        description={gameDayHub.supporting}
        image={pageHeroes.gameDay}
        imageAlt="Stadium under bright evening floodlights"
        actions={
          <>
            <Button href="#teams" variant="primary">
              Choose your game
            </Button>
            <Button href={`tel:${site.phoneTel}`} variant="outlineLight">
              Call {site.phoneDisplay}
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="cream">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="luxury-display text-3xl text-light-ink sm:text-4xl">
            {gameDayHub.promise}
          </h2>
          <p className="mt-6 font-serif text-2xl text-accent-on-light sm:text-3xl">{gameDayHub.closing}</p>
        </div>
        <ol className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3 md:gap-6">
          {gameDaySteps.map((step, index) => (
            <li key={step.id} className="luxury-card-light flex flex-col p-8">
              <span className="font-serif text-5xl leading-none text-accent/30" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-xl tracking-tight text-light-ink sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-light-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </MarketingPageSection>

      <MarketingPageSection tone="dark" id="teams" className="scroll-mt-24">
        <MarketingSectionHeading
          eyebrow="Choose your game"
          title="Four seasons of game day, handled."
          description="Every experience has its own dedicated page and inquiry form—pick your team and tell us the date."
          light={false}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gameDayExperiences.map((exp, index) => (
            <ExperiencePackageCard
              key={exp.id}
              pkg={{
                id: exp.id,
                title: exp.title,
                blurb: exp.cardBlurb,
                image: exp.image,
                alt: exp.alt,
                href: `/experiences/${exp.slug}`,
              }}
              index={index}
            />
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-on-dark-muted">
          {teamDisclaimer}
        </p>
      </MarketingPageSection>

      <MarketingCtaBand
        eyebrow="Season after season"
        title="Make game day a standing arrangement."
        description="Members get priority booking on game days, preferred fleet access, and concierge ticket coordination—so the season is handled before it starts."
        primaryHref="/memberships"
        primaryLabel="Request Membership"
        secondaryHref="/experience-request"
        secondaryLabel="Request Your Experience"
        tone="cream"
      />
    </>
  );
}
