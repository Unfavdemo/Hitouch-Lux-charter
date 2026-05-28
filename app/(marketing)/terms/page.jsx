import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Terms",
  description: "Terms of use for the HiTouch Luxury Charter website and digital concierge tools.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <MarketingPageHero
        eyebrow="Legal"
        title="Terms of use"
        description={`By using ${site.brandName} websites, booking tools, or email correspondence, you agree to these terms. Transportation services are governed by separate confirmations and contracts where applicable.`}
      />

      <MarketingPageSection tone="paper" className="!pb-24">
        <article className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-light-muted">
          <div>
            <h2 className="font-serif text-xl text-light-ink">Website accuracy</h2>
            <p className="mt-3">
              Content on this site—including sample pricing, vehicle imagery, and descriptive
              copy—is provided for planning purposes and may change without notice. Final terms
              appear in written confirmations from our concierge team.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-light-ink">Acceptable use</h2>
            <p className="mt-3">
              You agree not to misuse forms, APIs, or contact channels for harassment, fraud, or
              unlawful requests. We reserve the right to refuse service that violates law or
              operational safety policies.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-light-ink">Third-party tools</h2>
            <p className="mt-3">
              External booking links (including Moovs) are subject to the third party&apos;s own terms.
              HiTouch is not responsible for outages or policy changes on external platforms.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-light-ink">Limitation of liability</h2>
            <p className="mt-3">
              To the maximum extent permitted by law, {site.brandName} disclaims liability for
              indirect or consequential damages arising from use of this website. Some jurisdictions
              do not allow certain limitations; in those cases, limitations apply only to the extent
              permitted.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-light-ink">Contact</h2>
            <p className="mt-3">
              Questions about these terms:{" "}
              <a className="text-light-ink underline decoration-accent/50" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
        </article>
      </MarketingPageSection>
    </>
  );
}
