import { FounderStory } from "@/components/marketing/founder-story";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingFeatureCard } from "@/components/marketing/marketing-feature-card";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { ServicePromises } from "@/components/marketing/service-promises";
import { SuccessStory } from "@/components/marketing/success-story";
import { Button } from "@/components/ui/button";
import { industryAward, importedReviews } from "@/content/reviews";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "About HiTouch",
  description:
    "HiTouch Luxury Charter provides private mobility and curated experiences in Philadelphia for people who value their time, professionalism, and attention to detail.",
  path: "/about",
});

const standards = [
  {
    title: "Chauffeur excellence",
    body: "Professional presentation, route intelligence, and quiet confidence. Vetted, briefed, and trained to protect your time rather than fill it with conversation.",
  },
  {
    title: "The cabin is part of it",
    body: "Climate, refreshments, and music set before pickup. Say it once and it is on file—you should never have to explain your preferences twice.",
  },
  {
    title: "Confidentiality first",
    body: "High-profile itineraries handled discreetly. NDAs available, and executive protection coordinated only after compliance review.",
  },
];

export default function AboutPage() {
  return (
    <>
      <MarketingPageHero
        eyebrow="About HiTouch"
        title="Private mobility and curated experiences, run like a relationship."
        description="HiTouch Luxury Charter exists for people who value their time differently—clients who notice the temperature of the cabin, the chauffeur who never rushes an arrival, and the door that opens exactly on cue."
        image={pageHeroes.about}
        imageAlt="City skyline at dusk"
        actions={
          <>
            <Button href="/memberships" variant="primary">
              Request membership
            </Button>
            <Button href="/experience-request" variant="outlineLight">
              Request your experience
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper">
        <FounderStory />
      </MarketingPageSection>

      <MarketingPageSection tone="cream" borderTop>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <MarketingSectionHeading
              eyebrow="What HiTouch means"
              title="Hospitality instincts with executive discipline."
              description="From the pronunciation of a venue name to the buffer before a board meeting, the details are the product. Transportation is how we deliver them."
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

      <MarketingPageSection tone="paper">
        <ServicePromises />
      </MarketingPageSection>

      <MarketingPageSection tone="dark">
        <MarketingSectionHeading
          eyebrow="Operating standards"
          title="Non-negotiables on every movement."
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
        eyebrow="Once you're with HiTouch, you're taken care of."
        title="Start the relationship."
        description="Book a single movement, request an experience, or apply for membership. All three begin with the same conversation."
        primaryHref="/memberships/apply"
        primaryLabel="Request membership"
        secondaryHref="/why-hitouch"
        secondaryLabel="Why HiTouch"
      />
    </>
  );
}
