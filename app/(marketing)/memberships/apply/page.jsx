import { MembershipApplicationForm } from "@/components/marketing/membership-application-form";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Card } from "@/components/ui/card";
import { foundingMembership, membershipBenefits, membershipProcess } from "@/content/memberships";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbListJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Request HiTouch Private Membership",
  description:
    "Apply for HiTouch Private Membership or the limited Founding Membership. Preferred fleet access, priority booking, concierge support, and member pricing in Philadelphia and the tri-state region.",
  path: "/memberships/apply",
});

export default function MembershipApplyPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Memberships", path: "/memberships" },
          { name: "Request membership", path: "/memberships/apply" },
        ])}
      />

      <MarketingPageHero
        eyebrow="HiTouch Private Membership"
        title="Request membership"
        description="Transportation shouldn't be something you repeatedly arrange. Tell us how you move today and we will come back with a proposal built around it."
        image={pageHeroes.memberships}
        imageAlt="Executive vehicle interior prepared for a client"
      />

      <MarketingPageSection tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <MembershipApplicationForm />
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <Card variant="luxury" className="p-7 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
                {foundingMembership.eyebrow}
              </p>
              <p className="mt-4 font-serif text-2xl tracking-tight text-light-ink">
                {foundingMembership.headline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-light-muted">
                {foundingMembership.supporting}
              </p>
              <ul className="mt-6 space-y-3">
                {foundingMembership.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-light-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="luxury" className="p-7 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
                Included with every tier
              </p>
              <ul className="mt-5 space-y-3">
                {membershipBenefits.map((benefit) => (
                  <li key={benefit.id} className="flex gap-3 text-sm leading-relaxed text-light-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span className="text-light-ink">{benefit.title}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="luxury" className="p-7 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
                What happens next
              </p>
              <ol className="mt-5 space-y-4">
                {membershipProcess.map((step, index) => (
                  <li key={step.step} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 text-[11px] font-semibold tabular-nums text-light-ink">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-light-ink">{step.step}</p>
                      <p className="mt-1 text-xs leading-relaxed text-light-muted">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-light-ink/10 pt-5 text-sm text-light-muted">
                Prefer to talk first?{" "}
                <a
                  className="font-medium text-light-ink underline decoration-accent/50 underline-offset-4"
                  href={`tel:${site.phoneTel}`}
                >
                  {site.phoneDisplay}
                </a>
              </p>
            </Card>
          </aside>
        </div>
      </MarketingPageSection>
    </>
  );
}
