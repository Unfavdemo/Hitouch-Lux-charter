import { MarketingCtaBand } from "@/components/marketing/marketing-cta-band";
import { MarketingFeatureCard } from "@/components/marketing/marketing-feature-card";
import { MarketingPageHero } from "@/components/marketing/marketing-page-hero";
import { MarketingPageSection } from "@/components/marketing/marketing-page-section";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { Button } from "@/components/ui/button";
import { pageHeroes } from "@/content/media";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { serviceJsonLd } from "@/lib/seo/json-ld";

export const metadata = buildPageMetadata({
  title: "Executive Mobility | Philadelphia executive car service",
  description:
    "Philadelphia executive car service for principals and leadership teams—hourly retainers, point-to-point service, road shows, and board weeks. Punctual, discreet, and consistent. One call. Every detail handled.",
  path: "/executive-mobility",
});

const programs = [
  {
    title: "Hourly executive retainer",
    body: "A chauffeur and vehicle held on your schedule—multi-stop days, shifting calendars, and board-ready punctuality without re-booking between meetings.",
  },
  {
    title: "Point-to-point",
    body: "Door-to-door service, precisely timed, with proactive traffic intelligence and white-glove arrival standards.",
  },
  {
    title: "Road shows & board weeks",
    body: "Multi-day, multi-principal tempo with one coordinator, consolidated reporting, and cabins tuned for confidential conversation.",
  },
];

const standards = [
  {
    title: "We protect your time",
    body: "Punctuality is fundamental. Vehicles are staged early, routes are planned around your calendar, and buffers are ours to manage—not yours.",
  },
  {
    title: "We know you",
    body: "Temperature, seating, music, newspaper, silence—preferences are remembered on every trip, so nothing is re-explained.",
  },
  {
    title: "Discretion by default",
    body: "NDA-minded chauffeurs, privacy glass, and quiet cabins. What happens in the car stays in the car.",
  },
];

export default function ExecutiveMobilityPage() {
  return (
    <>
      <JsonLdScript
        data={serviceJsonLd({
          name: "Executive car service in Philadelphia",
          description:
            "Executive mobility programs for principals and leadership teams—hourly retainers, point-to-point service, road shows, and recurring executive travel.",
          path: "/executive-mobility",
        })}
      />
      <MarketingPageHero
        eyebrow="Executive Mobility"
        title="Your calendar moves. So do we."
        description="Executive car service for people who value their time differently—punctual, discreet, and consistent, whether it's one meeting across town or a week of them."
        image={pageHeroes.executiveMobility}
        imageAlt="Executive vehicle interior with refined details"
        actions={
          <>
            <Button href="/book" variant="primary">
              Book Transportation
            </Button>
            <Button href="/corporate" variant="outlineLight">
              Corporate accounts
            </Button>
          </>
        }
      />

      <MarketingPageSection tone="cream">
        <MarketingSectionHeading
          eyebrow="Programs"
          title="Built around how executives actually move."
          description="Single trips are welcome—but Executive Mobility is at its best as a standing arrangement, where your preferences and cadence are already known."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {programs.map((p) => (
            <MarketingFeatureCard key={p.title} title={p.title}>
              <p>{p.body}</p>
            </MarketingFeatureCard>
          ))}
        </div>
      </MarketingPageSection>

      <MarketingPageSection tone="dark">
        <MarketingSectionHeading
          eyebrow="The standard"
          title="You don't just book a vehicle. You have HiTouch."
          light={false}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {standards.map((s) => (
            <MarketingFeatureCard key={s.title} title={s.title} tone="glass">
              <p>{s.body}</p>
            </MarketingFeatureCard>
          ))}
        </div>
      </MarketingPageSection>

      <MarketingCtaBand
        eyebrow="Your plans. Our responsibility."
        title="Put your movement on one thread."
        description={`Book a single trip, open a corporate account, or call ${site.phoneDisplay} to design a standing executive program.`}
        primaryHref="/book"
        primaryLabel="Book Transportation"
        secondaryHref="/memberships"
        secondaryLabel="Explore Membership"
        tone="cream"
      />
    </>
  );
}
