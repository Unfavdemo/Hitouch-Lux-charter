import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingFeatureCard } from "@/components/marketing/marketing-feature-card";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { SuccessStory } from "@/components/marketing/success-story";
import { Button } from "@/components/ui/button";
import { industryAward, importedReviews } from "@/content/reviews";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "About HiTouch",
  description:
    "A Philadelphia studio for curated luxury experiences—discreet chauffeurs, staged cabins, and concierge-led choreography.",
  path: "/about",
});

const standards = [
  {
    title: "Chauffeur excellence",
    body: "Professional presentation, route intelligence, and quiet confidence—trained to read the room and protect your time.",
  },
  {
    title: "Cabin as experience",
    body: "Climate, refreshments, and music staged before pickup so the drive feels like part of the evening—not an interlude.",
  },
  {
    title: "Confidentiality first",
    body: "High-profile itineraries handled with discretion. Executive protection coordinated only after compliance review.",
  },
];

export default function AboutPage() {
  return (
    <>
      <MarketingPageHero
        eyebrow="Our studio"
        title="We choreograph how principals feel—not only where they go."
        description="HiTouch Luxury Charter was built for clients who notice atmosphere: the temperature of the cabin, the calm tempo of a chauffeur who never rushes an arrival, the way a door opens exactly on cue."
        image={pageHeroes.about}
        imageAlt="Philadelphia skyline at dusk"
        actions={
          <>
            <Button href="/experience-request" variant="primary">
              Plan an experience
            </Button>
            <Button href="/contact" variant="outlineLight">
              Speak with concierge
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <MarketingSectionHeading
              eyebrow="What HiTouch means"
              title="Hospitality instincts with executive discipline."
              description="From curated refreshments to pronunciation of venue names, we stage the cabin before you arrive. From airport greets to gala departures, we choreograph door times with hosts, security, and production teams."
            />
            <p className="mt-6 text-sm leading-relaxed text-light-muted">{site.coverageBlurb}</p>
          </div>
          <MarketingFeatureCard
            title="At a glance"
            footer={
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between gap-6 border-b border-light-ink/10 pb-4">
                  <dt className="text-light-muted">Private line</dt>
                  <dd>
                    <a className="font-medium text-light-ink" href={`tel:${site.phoneTel}`}>
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-light-ink/10 pb-4">
                  <dt className="text-light-muted">Concierge email</dt>
                  <dd>
                    <a className="font-medium text-light-ink" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-light-muted">HQ region</dt>
                  <dd className="text-right font-medium text-light-ink">
                    {site.city}, {site.region}
                  </dd>
                </div>
              </dl>
            }
          />
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="dark">
        <MarketingSectionHeading
          eyebrow="Operating standards"
          title="Non-negotiables on every experience."
          light={false}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {standards.map((s) => (
            <MarketingFeatureCard key={s.title} title={s.title} tone="glass">
              <p>{s.body}</p>
            </MarketingFeatureCard>
          ))}
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="cream">
        <SuccessStory award={industryAward} reviews={importedReviews.slice(0, 4)} />
      </MarketingPageSection>

      <MarketingCtaBand
        title="Ready for a choreographed proposal?"
        description="Share your vision through a custom experience request—or explore curated packages to start the conversation."
        primaryHref="/experience-request"
        primaryLabel="Request an experience"
        secondaryHref="/experiences"
        secondaryLabel="Browse experiences"
      />
    </>
  );
}
