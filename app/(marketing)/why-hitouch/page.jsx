import { ConversionPaths } from "@/components/marketing/conversion-paths";
import { FounderStory } from "@/components/marketing/founder-story";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { ServicePromises } from "@/components/marketing/service-promises";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { brandLines, brandPromise } from "@/content/brand";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbListJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Why HiTouch",
  description:
    "HiTouch was created after experiencing unreliable, impersonal transportation. We built the opposite: a reliable network of elevated experiences for people who value their time, professionalism, and attention to detail.",
  path: "/why-hitouch",
});

export default function WhyHitouchPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Why HiTouch", path: "/why-hitouch" },
        ])}
      />

      <MarketingPageHero
        eyebrow="Why HiTouch"
        title="You don't just book a vehicle. You have HiTouch."
        description={brandPromise.supporting}
        image={pageHeroes.whyHitouch}
        imageAlt="Glass office towers rising against the sky"
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
        <ServicePromises
          eyebrow="Our promises"
          title="Five things we promise, and are measured against."
          description="Not slogans. These are the standards a client can hold us to on any given Tuesday."
        />
      </MarketingPageSection>

      <MarketingPageSection tone="dark">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
            What we actually sell
          </p>
          <p className="luxury-display mt-7 text-3xl leading-tight text-heading sm:text-4xl">
            Reliability. Relationships. Access. Attention to detail.
          </p>
          <p className="mt-7 text-sm leading-relaxed text-on-dark-body sm:text-base">
            The vehicle is how we deliver it. It is not what you are buying.
          </p>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {brandLines.map((line) => (
              <li
                key={line}
                className="rounded-full border border-accent/25 bg-white/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-[var(--tracking-nav)] text-accent-readable"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <MarketingSectionHeading
          eyebrow="Where to start"
          title="Three ways clients begin with us."
          description="Most people start with a single trip and end up with a membership. Either is a fine place to begin."
        />
        <div className="mt-14">
          <ConversionPaths light />
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        eyebrow="Once you're with HiTouch, you're taken care of."
        title="Start with one call."
        description="Tell us how you move today and what has not worked. We will tell you honestly whether we are the right fit."
        primaryHref="/memberships/apply"
        primaryLabel="Request membership"
        secondaryHref={`tel:${site.phoneTel}`}
        secondaryLabel={site.phoneDisplay}
      />
    </>
  );
}
