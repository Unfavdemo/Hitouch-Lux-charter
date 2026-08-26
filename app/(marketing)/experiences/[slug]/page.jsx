import { notFound } from "next/navigation";
import { ConciergePanel } from "@/components/marketing/concierge-panel";
import { ExperienceInquiryForm } from "@/components/marketing/experience-inquiry-form";
import { ExperiencePackageCard } from "@/components/marketing/experience-package-card";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import {
  experienceSlugs,
  getCategoryById,
  getExperienceBySlug,
  getExperiencesByCategory,
  teamDisclaimer,
} from "@/content/experiences";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { serviceJsonLd } from "@/lib/seo/json-ld";

export function generateStaticParams() {
  return experienceSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) return {};
  return buildPageMetadata({
    title: exp.seoTitle,
    description: exp.seoDescription,
    path: `/experiences/${exp.slug}`,
  });
}

export default async function ExperienceLandingPage({ params }) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) notFound();

  const category = getCategoryById(exp.categoryId);
  const related = getExperiencesByCategory(exp.categoryId).filter((e) => e.id !== exp.id);

  return (
    <>
      <JsonLdScript
        data={serviceJsonLd({
          name: exp.seoTitle,
          description: exp.seoDescription,
          path: `/experiences/${exp.slug}`,
        })}
      />
      <MarketingPageHero
        eyebrow={exp.heroEyebrow}
        title={exp.heroHeadline}
        description={exp.heroSupporting}
        image={exp.image}
        imageAlt={exp.alt}
        actions={
          <>
            <Button href="#inquire" variant="primary">
              Request This Experience
            </Button>
            <Button href={`tel:${site.phoneTel}`} variant="outlineLight">
              Call {site.phoneDisplay}
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="cream" id="inquire" className="scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16">
          <div>
            <MarketingSectionHeading
              eyebrow="The experience"
              title="Every detail, already handled."
              description={exp.cardBlurb}
            />
            <ul className="mt-10 space-y-5">
              {exp.included.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span
                    className="mt-2.5 h-px w-6 shrink-0 bg-gradient-to-r from-accent to-accent/30"
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-light-ink sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-[var(--radius-card)] border border-light-ink/10 bg-paper/70 p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
                HiTouch Concierge additions
              </p>
              <p className="mt-3 text-sm leading-relaxed text-light-muted">
                Tell us where you want to go and how you want it to feel. We&rsquo;ll handle the
                rest—starting with:
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {exp.conciergeAdditions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-light-ink">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-10 font-serif text-2xl text-light-ink">{exp.closingLine}</p>
            {exp.disclaimer ? (
              <p className="mt-6 max-w-xl text-xs leading-relaxed text-light-muted">
                {teamDisclaimer}
              </p>
            ) : null}
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ExperienceInquiryForm experienceSlug={exp.slug} experienceTitle={exp.title} />
          </div>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="dark" borderTop>
        <ConciergePanel light={false} />
      </MarketingPageSection>

      {related.length > 0 ? (
        <MarketingPageSection tone="paper">
          <MarketingSectionHeading
            eyebrow={category ? `More ${category.name}` : "More experiences"}
            title="Keep exploring."
          />
          <div className={`mt-12 grid gap-6 sm:grid-cols-2 ${related.length >= 3 ? "lg:grid-cols-3" : ""}`}>
            {related.map((e, index) => (
              <ExperiencePackageCard
                key={e.id}
                pkg={{
                  id: e.id,
                  title: e.title,
                  blurb: e.cardBlurb,
                  image: e.image,
                  alt: e.alt,
                  href: `/experiences/${e.slug}`,
                }}
                index={index}
              />
            ))}
          </div>
        </MarketingPageSection>
      ) : null}

      <MarketingCtaBand
        eyebrow="One call. Every detail handled."
        title="Prefer to talk it through?"
        description={`Call ${site.phoneDisplay} and describe the occasion—your concierge will design the rest.`}
        primaryHref="#inquire"
        primaryLabel="Request This Experience"
        secondaryHref="/experiences"
        secondaryLabel="All experiences"
      />
    </>
  );
}
