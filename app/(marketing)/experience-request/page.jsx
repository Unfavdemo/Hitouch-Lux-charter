import { ExperienceRequestForm } from "@/components/marketing/experience-request-form";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { pageHeroes } from "@/content/media";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Request a quote | HiTouch Luxury Charter",
  description:
    "Request a quote for Philadelphia private black car service and luxury transportation. Complete our questionnaire—we confirm driver availability and assign the vehicle before anything is locked.",
  path: "/experience-request",
});

export default function ExperienceRequestPage() {
  return (
    <>
      <MarketingPageHero
        eyebrow="Request a quote"
        title="Tell us the occasion—we'll confirm availability."
        description="Complete the questionnaire below. HiTouch reviews every request, confirms driver availability, and assigns the cabin. There is no instant online booking."
        image={pageHeroes.experienceRequest}
        imageAlt="Fine dining table with candlelight"
      />

      <MarketingPageSection tone="cream" id="request" className="scroll-mt-24 !pb-24">
        <MarketingSectionHeading
          eyebrow="Quote questionnaire"
          title="One form. Everything we need to respond."
          description="Answer what you know now—venues can stay approximate. We return a proposal with assigned vehicle, timing, and pricing once availability is confirmed."
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <ExperienceRequestForm />
        </div>
      </MarketingPageSection>
    </>
  );
}
