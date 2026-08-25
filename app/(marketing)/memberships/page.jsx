import { MembershipApplicationForm } from "@/components/marketing/membership-application-form";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import {
  foundingMembership,
  membershipBenefits,
  membershipHero,
  membershipPhilosophy,
} from "@/content/memberships";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { serviceJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "HiTouch Private Membership | Priority booking & concierge access",
  description:
    "HiTouch Private Membership—preferred fleet access, priority booking, concierge support, preferred member pricing, and private HiTouch experiences. Now accepting five Founding Memberships, by application.",
  path: "/memberships",
});

export default function MembershipsPage() {
  return (
    <>
      <JsonLdScript
        data={serviceJsonLd({
          name: "HiTouch Private Membership",
          description:
            "Private transportation membership in Philadelphia with preferred fleet access, priority booking, concierge support, and member pricing.",
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
          <>
            <Button href="#apply" variant="primary">
              {membershipHero.cta.label}
            </Button>
            <Button href="#founding" variant="outlineLight">
              Founding Membership
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="cream">
        <MarketingSectionHeading
          eyebrow="Member privileges"
          title="A relationship, not a transaction."
          description="Membership is designed around how you actually move—so every trip begins with someone who already knows the answer."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {membershipBenefits.map((benefit, index) => (
            <article
              key={benefit.id}
              className={`luxury-card-light group flex flex-col p-8 ${
                index === membershipBenefits.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <span className="font-serif text-4xl leading-none text-accent/35" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-sm font-semibold uppercase tracking-[var(--tracking-brand)] text-light-ink">
                {benefit.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-light-muted">{benefit.body}</p>
              <div
                className="mt-8 h-px w-12 bg-gradient-to-r from-accent/90 to-accent/20 transition-all duration-500 group-hover:w-20"
                aria-hidden
              />
            </article>
          ))}
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="dark" id="founding" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
            {foundingMembership.eyebrow}
          </p>
          <h2 className="luxury-display mt-6 text-4xl uppercase tracking-[0.06em] text-heading sm:text-5xl">
            {foundingMembership.headline}
          </h2>
          <div
            className="mx-auto mt-7 h-px w-16 bg-gradient-to-r from-transparent via-accent/80 to-transparent"
            aria-hidden
          />
          <p className="mt-7 text-sm leading-relaxed text-on-dark-body sm:text-base lg:text-lg">
            {foundingMembership.supporting}
          </p>
          <p className="mt-5 text-xs uppercase tracking-[var(--tracking-nav)] text-accent-readable/90">
            {foundingMembership.note}
          </p>
          <div className="mt-10">
            <Button href="#apply" variant="primary" className="min-w-[240px] justify-center">
              Apply for Founding Membership
            </Button>
          </div>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <blockquote className="font-serif text-2xl leading-snug text-light-ink sm:text-3xl">
            “{membershipPhilosophy.quote}”
          </blockquote>
          <p className="mt-5 text-sm leading-relaxed text-light-muted sm:text-base">
            {membershipPhilosophy.body}
          </p>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="cream" id="apply" className="scroll-mt-24 !pb-24" borderTop>
        <div className="mx-auto max-w-3xl">
          <MembershipApplicationForm />
          <p className="mt-6 text-center text-xs text-light-muted">
            Prefer a conversation first? Call{" "}
            <a
              className="font-medium text-light-ink underline decoration-accent/50 underline-offset-4"
              href={`tel:${site.phoneTel}`}
            >
              {site.phoneDisplay}
            </a>{" "}
            and ask for membership.
          </p>
        </div>
      </MarketingPageSection>
    </>
  );
}
