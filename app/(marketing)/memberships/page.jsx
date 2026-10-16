import { MembershipApplicationForm } from "@/components/marketing/membership-application-form";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { membershipBenefits, membershipHero } from "@/content/memberships";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { serviceJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "High Touch Private Membership | Priority access",
  description:
    "High Touch Private Membership—priority access and convenience at your fingertips for Philadelphia private black car service. Skip repeating the full quote form. Apply today.",
  path: "/memberships",
});

export default function MembershipsPage() {
  return (
    <>
      <JsonLdScript
        data={serviceJsonLd({
          name: "High Touch Private Membership",
          description:
            "Priority access membership for Philadelphia private black car service and luxury transportation—convenience at your fingertips.",
          path: "/memberships",
        })}
      />
      <MarketingPageHero
        eyebrow={membershipHero.eyebrow}
        title={membershipHero.headline}
        description={membershipHero.supporting}
        image={pageHeroes.memberships}
        imageAlt={membershipHero.imageAlt}
        actions={
          <Button href="#apply" variant="primary">
            {membershipHero.cta.label}
          </Button>
        }
      />

      <MarketingPageSection tone="cream">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          {membershipBenefits.map((benefit) => (
            <article key={benefit.id} className="text-center sm:text-left">
              <h3 className="text-sm font-semibold uppercase tracking-[var(--tracking-brand)] text-light-ink">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-light-muted">{benefit.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button href="#apply" variant="onLight" className="min-w-[240px] justify-center">
            {membershipHero.cta.label}
          </Button>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="paper" id="apply" className="scroll-mt-24 !pb-24" borderTop>
        <div className="mx-auto max-w-3xl">
          <MembershipApplicationForm />
          <p className="mt-6 text-center text-xs text-light-muted">
            Prefer a conversation first? Call{" "}
            <a
              className="font-medium text-light-ink underline decoration-accent/50 underline-offset-4"
              href={`tel:${site.phoneTel}`}
            >
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </MarketingPageSection>
    </>
  );
}
