import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy",
  description: "How HiTouch Luxury Charter handles information submitted through this website, forms, and concierge workflows.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <MarketingPageHero
        eyebrow="Legal"
        title="Privacy policy"
        description={`Effective ${new Date().getFullYear()}. How we treat information collected through ${site.brandName} digital touchpoints. Executed transportation agreements may include additional confidentiality terms.`}
      />

      <MarketingPageSection tone="paper" className="!pb-24">
        <article className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-light-muted">
          <div>
            <h2 className="font-serif text-xl text-light-ink">Information we collect</h2>
            <p className="mt-3">
              When you submit forms, booking requests, or onboarding documents, we collect contact
              details, itinerary data, preferences, and billing identifiers necessary to fulfill the
              service. Device and analytics data may be collected in standard web logs for security
              and performance.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-light-ink">How we use information</h2>
            <p className="mt-3">
              We use submitted information to confirm availability, coordinate chauffeurs, communicate
              about your itinerary, and maintain duty-of-care records. Corporate accounts may receive
              additional reporting in line with executed contracts.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-light-ink">Sharing</h2>
            <p className="mt-3">
              We do not sell personal information. We may share limited data with operational partners
              (e.g., payment processors, insurance certificate issuers, or licensed security
              coordinators) strictly as required to deliver the services you request.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-light-ink">Retention</h2>
            <p className="mt-3">
              Records are retained for operational, accounting, and regulatory periods consistent with
              chauffeured transportation practice. You may request deletion where no longer required
              by law or contract, subject to verification.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-light-ink">Contact</h2>
            <p className="mt-3">
              For privacy inquiries, email{" "}
              <a className="text-light-ink underline decoration-accent/50" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              or call{" "}
              <a className="text-light-ink underline decoration-accent/50" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </article>
      </MarketingPageSection>
    </>
  );
}
