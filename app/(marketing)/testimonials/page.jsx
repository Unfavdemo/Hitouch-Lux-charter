import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MetricsStrip } from "@/components/marketing/metrics-strip";
import { SuccessStory } from "@/components/marketing/success-story";
import { Card } from "@/components/ui/card";
import { metrics } from "@/content/metrics";
import { industryAward, importedReviews } from "@/content/reviews";
import { testimonials } from "@/content/testimonials";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Testimonials & guest stories",
  description:
    "Client reflections, industry recognition, and the standards behind HiTouch Luxury Charter—private mobility and curated experiences in Philadelphia.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <MarketingPageHero
        eyebrow="Guest stories"
        title="Once you're with HiTouch, you're taken care of."
        description="From board weekends to game days—clients remember how the night felt, not just that the car was on time."
      />

      <MarketingPageSection tone="paper">
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.id} variant="light" className="flex flex-col p-7 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-on-light">
                Client reflection
              </p>
              <blockquote className="mt-5 flex-1 font-serif text-xl leading-snug text-light-ink">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 border-t border-accent/10 pt-5 text-sm text-light-muted">
                <span className="font-medium text-light-ink">{item.attribution}</span>
                <span className="mx-2">·</span>
                <span>{item.role}</span>
                <span className="mx-2">·</span>
                <span>{item.city}</span>
              </footer>
            </Card>
          ))}
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="cream">
        <SuccessStory award={industryAward} reviews={importedReviews} light />
        <div className="mt-16">
          <MetricsStrip items={metrics} light />
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        title="Ready to experience the standard?"
        description="Request a curated experience or book transportation—the same concierge team handles both."
        primaryHref="/experience-request"
        primaryLabel="Request experience"
        secondaryHref="/book"
        secondaryLabel="Book transportation"
        tone="cream"
      />
    </>
  );
}
