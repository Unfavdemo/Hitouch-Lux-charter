import { ExperienceRequestForm } from "@/components/marketing/experience-request-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Luxury experience request",
  description:
    "Request a personalized HiTouch luxury experience on our site. Expect a team response within 24–48 hours.",
};

export default function ExperienceRequestPage() {
  return (
    <div className="pt-24">
      <Section className="bg-page pb-8 pt-10">
        <Container>
          <Badge>Luxury experience request</Badge>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-heading sm:text-5xl">
            HiTouch Luxury Experience Request
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Thank you for considering HiTouch Luxury Charter Services for your personalized,
            luxury experience. Complete this form so we can customize details for your special
            occasion. Upon completion, please allow our team{" "}
            <span className="font-medium text-charcoal">24–48 hours</span> to contact you and
            finalize your experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={site.moovsBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Reserve online
            </Button>
            <Button href="/contact" variant="secondary">
              Contact us
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface pb-24">
        <Container>
          <ExperienceRequestForm />
        </Container>
      </Section>
    </div>
  );
}
