import { HomeConciergeWidget } from "@/components/marketing/home-concierge-widget";
import { HomeHero } from "@/components/marketing/home-hero";
import { HomeServicesBento } from "@/components/marketing/home-services-bento";
import { HomeValueProps } from "@/components/marketing/home-value-props";
import { FleetShowcase } from "@/components/marketing/fleet-showcase";
import { MetricsStrip } from "@/components/marketing/metrics-strip";
import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { fleet } from "@/content/fleet";
import { metrics } from "@/content/metrics";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Executive chauffeur & concierge booking",
};

export default function HomePage() {
  return (
    <>
      <HomeHero
        site={{
          tagline: site.tagline,
          phoneTel: site.phoneTel,
          phoneDisplay: site.phoneDisplay,
          moovsBookingUrl: site.moovsBookingUrl,
        }}
      />

      <HomeValueProps />

      <HomeServicesBento />

      <Section className="bg-midnight py-20 text-foreground lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
                Fleet at a glance
              </p>
              <h2 className="mt-4 font-serif text-3xl font-normal leading-tight tracking-tight text-heading sm:text-4xl lg:text-5xl">
                Studio-prepared vehicles for boardroom privacy or celebration scale.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-base">
                Sedans, executive SUVs, and custom Sprinters—each class is inspected, detailed,
                and briefed before your wheels roll.
              </p>
            </div>
            <Button href="/fleet" variant="secondary" className="border-heading/35 text-heading hover:bg-white/10">
              Full fleet gallery
            </Button>
          </div>
          <div className="mt-14">
            <FleetShowcase vehicles={fleet} />
          </div>
        </Container>
      </Section>

      <Section className="bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
                Social proof
              </p>
              <h2 className="mt-4 font-serif text-3xl tracking-tight text-light-ink sm:text-4xl">
                Trusted by discerning clients
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-light-muted sm:text-base">
                From corporate road shows to multi-venue weddings, HiTouch choreographs arrivals
                with discretion and precision.
              </p>
            </div>
            <TestimonialCarousel items={testimonials} light />
          </div>
          <div className="mt-20">
            <MetricsStrip items={metrics} light />
          </div>
        </Container>
      </Section>

      <HomeConciergeWidget
        phoneTel={site.phoneTel}
        phoneDisplay={site.phoneDisplay}
        moovsBookingUrl={site.moovsBookingUrl}
      />
    </>
  );
}
