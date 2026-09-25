import { FaqList } from "@/components/marketing/faq-list";
import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { aeoSnippets } from "@/content/aeo-snippets";
import { faqItems } from "@/content/faq";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { faqPageJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "FAQ",
  description:
    "Answers about private black car service, luxury transportation, airports, membership, pricing, and requesting a quote with HiTouch Luxury Charter.",
  path: "/faq",
});

export default function FaqPage() {
  const allFaq = [...aeoSnippets, ...faqItems];

  return (
    <>
      <JsonLdScript data={faqPageJsonLd(allFaq)} />
      <MarketingPageHero
        eyebrow="Questions"
        title="Straight answers—before you step into the cabin."
        description="If you do not see your scenario here, call the private line or submit an experience request so we have the details to respond quickly."
        actions={
          <>
            <Button href="/experience-request" variant="onLight">
              Experience request
            </Button>
            <Button href="/contact" variant="onLightSecondary">
              Contact concierge
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="paper" className="!pb-24">
        <div className="mx-auto max-w-3xl">
          <FaqList items={faqItems} light />
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-light-muted">
          Policies referenced here are summarized for planning purposes. Executed services are
          governed by written confirmations and executed agreements.
        </p>
      </MarketingPageSection>

      <MarketingCtaBand
        title="Ready to request a quote?"
        description="Complete our questionnaire—we confirm availability and assign the vehicle before anything is locked."
        primaryHref="/experience-request"
        primaryLabel="Request a quote"
        secondaryHref="/experiences"
        secondaryLabel="View offerings"
      />
    </>
  );
}
