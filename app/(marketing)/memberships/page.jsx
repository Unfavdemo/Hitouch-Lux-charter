import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  foundingMembership,
  membershipBenefits,
  membershipHero,
  membershipIntro,
  membershipProcess,
  membershipTiers,
} from "@/content/memberships";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbListJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "HiTouch Private Membership",
  description:
    "Transportation shouldn't be something you repeatedly arrange. HiTouch Private Membership offers preferred fleet access, priority booking, concierge support, member pricing, and private experiences in Philadelphia.",
  path: "/memberships",
});

const membershipFaqs = [
  {
    question: "What is HiTouch Private Membership?",
    answer:
      "A relationship-based transportation program rather than a block of prepaid hours. Members receive preferred fleet access, priority booking, concierge support, preferred pricing, and access to private HiTouch experiences. Your preferences are held on file so you never repeat them.",
  },
  {
    question: "How is membership different from just booking rides?",
    answer:
      "Booking is transactional—you arrange each trip and start from scratch each time. Membership means we already know your addresses, your preferred vehicle, your buffer before meetings, and who else travels under your account. Over time you tell us less and more is simply handled.",
  },
  {
    question: "What is Founding Membership?",
    answer:
      "A limited group of five memberships, by application, for individuals, families, and organizations who want HiTouch integrated into how they move. Founding members receive rates held for the life of the membership, a direct line to the founder, and input on the experiences we build next.",
  },
  {
    question: "How do I apply?",
    answer:
      "Submit the membership application, which takes a few minutes. We call within one business day to talk through how you travel today, then send a written proposal with the tier, rates, and terms that fit. Nothing is committed until you accept.",
  },
  {
    question: "Is there a minimum spend?",
    answer:
      "Membership tiers carry a monthly commitment that varies by tier and usage. We size it to how you actually travel rather than selling you a bucket of hours you will not use, and we will tell you honestly if membership is not the right fit.",
  },
];

export default function MembershipsPage() {
  return (
    <>
      <JsonLdScript
        data={[
          serviceJsonLd({
            name: "HiTouch Private Membership",
            description:
              "Membership transportation program with preferred fleet access, priority booking, concierge support, and preferred member pricing.",
            path: "/memberships",
          }),
          faqPageJsonLd(membershipFaqs),
          breadcrumbListJsonLd([
            { name: "Home", path: "/" },
            { name: "Memberships", path: "/memberships" },
          ]),
        ]}
      />

      <MarketingPageHero
        eyebrow={membershipHero.eyebrow}
        title={membershipHero.headline}
        description={membershipHero.supporting}
        image={pageHeroes.memberships}
        imageAlt={membershipHero.imageAlt}
        actions={
          <>
            <Button href="/memberships/apply" variant="primary">
              Request membership
            </Button>
            <Button href="#founding" variant="outlineLight">
              Founding membership
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <MarketingSectionHeading
              eyebrow={membershipIntro.eyebrow}
              title={membershipIntro.headline}
            />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-light-muted lg:text-lg">
              {membershipIntro.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <Card variant="luxury" className="h-full p-8 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
                For people who value their time differently
              </p>
              <p className="mt-6 font-serif text-2xl leading-snug tracking-tight text-light-ink sm:text-[1.75rem]">
                Once you&rsquo;re with HiTouch, you&rsquo;re taken care of.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-light-muted">
                That is the whole proposition. Not a discount on rides—an arrangement where
                transportation stops being something you manage.
              </p>
              <Button href="/memberships/apply" variant="onLight" className="mt-8">
                Request membership
              </Button>
            </Card>
          </div>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="cream" borderTop>
        <MarketingSectionHeading
          eyebrow="Member benefits"
          title="What membership actually gets you."
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {membershipBenefits.map((benefit, index) => (
            <li key={benefit.id} className="luxury-card-light group flex flex-col p-7 sm:p-8">
              <span className="font-serif text-3xl leading-none text-accent/45" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-serif text-xl tracking-tight text-light-ink sm:text-[1.35rem]">
                {benefit.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-light-muted">{benefit.body}</p>
              <span
                className="mt-7 h-px w-10 bg-gradient-to-r from-accent/90 to-accent/20 transition-all duration-500 group-hover:w-16"
                aria-hidden
              />
            </li>
          ))}
        </ul>
      </MarketingPageSection>

      <MarketingPageSection tone="paper">
        <MarketingSectionHeading
          eyebrow="Membership tiers"
          title="Sized to how you actually move."
          description="Every tier includes the full benefit set. The difference is who travels under the account and how the billing is structured."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {membershipTiers.map((tier) => (
            <Card key={tier.id} variant="luxury" className="flex flex-col p-8">
              <h3 className="font-serif text-2xl tracking-tight text-light-ink">{tier.name}</h3>
              <p className="mt-3 text-[13px] font-medium uppercase tracking-[var(--tracking-nav)] text-accent">
                {tier.audience}
              </p>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-light-muted">{tier.body}</p>
              <Button href="/memberships/apply" variant="onLightSecondary" className="mt-8 justify-center">
                Request this tier
              </Button>
            </Card>
          ))}
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="dark" id="founding" className="scroll-mt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <MarketingSectionHeading
              eyebrow={foundingMembership.eyebrow}
              title={foundingMembership.headline}
              description={foundingMembership.supporting}
              light={false}
            />
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-on-dark-body sm:text-base">
              {foundingMembership.detail.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <Button href={foundingMembership.cta.href} variant="primary" className="mt-9">
              {foundingMembership.cta.label}
            </Button>
          </div>
          <div className="lg:col-span-5">
            <div className="luxury-cta-panel h-full p-8 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
                Founding terms
              </p>
              <ul className="mt-7 space-y-4">
                {foundingMembership.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-on-dark-body">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="cream">
        <MarketingSectionHeading
          eyebrow="How it works"
          title="Four steps, and a real conversation in the middle of them."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {membershipProcess.map((step, index) => (
            <li key={step.step} className="luxury-card-light p-7">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 text-xs font-semibold tabular-nums text-light-ink">
                {index + 1}
              </span>
              <h3 className="mt-5 font-serif text-lg tracking-tight text-light-ink">{step.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-light-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </MarketingPageSection>

      <MarketingCtaBand
        eyebrow="By application"
        title="Request membership"
        description="Applications are reviewed individually. It takes a few minutes and there is no obligation—we are both deciding whether it is a fit."
        primaryHref="/memberships/apply"
        primaryLabel="Request membership"
        secondaryHref={`tel:${site.phoneTel}`}
        secondaryLabel={site.phoneDisplay}
      />
    </>
  );
}
