import { BookingWizard } from "@/components/marketing/booking-wizard";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { serviceJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Trip estimate & reservation inquiry",
  description:
    "Save your contact details first, then view an indicative estimate—final choreography is confirmed by the HiTouch experience concierge.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <JsonLdScript
        data={serviceJsonLd({
          name: "Lead-first reservation inquiry",
          description:
            "Contact capture before indicative pricing for curated chauffeur experiences.",
          path: "/book",
        })}
      />
      <MarketingPageHero
        eyebrow="Trip estimate"
        title="Plan your movement with concierge follow-through."
        description="Your contact details are saved before any pricing appears—so our team can reach you if you step away. Final confirmations remain with the experience concierge desk."
      />

      <MarketingPageSection tone="paper" className="!pb-24">
        <div className="mx-auto max-w-3xl">
          <BookingWizard moovsBookingUrl={site.moovsBookingUrl} />
        </div>
      </MarketingPageSection>
    </>
  );
}
