import Link from "next/link";
import { FaqList } from "@/components/marketing/faq-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { faqItems } from "@/content/faq";
import { site } from "@/content/site";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "FAQ",
  description:
    "Answers about booking windows, airports, executive protection coordination, pricing, cancellations, and special requests for HiTouch Luxury Charter.",
};

export default function FaqPage() {
  return (
    <div className="pt-24">
      <Section className="bg-page pb-8 pt-10">
        <Container>
          <Badge>Questions</Badge>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl text-heading sm:text-5xl">
            Straight answers—before you step into the cabin.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            If you do not see your scenario here, call the private line or route your note
            through the contact page. For itinerary builds, use secure online booking so we have
            the details to respond quickly.
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
              Contact concierge
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface pb-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FaqList items={faqItems} />
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted">
            Policies referenced here are summarized for planning purposes. Executed services
            are governed by written confirmations and executed agreements.
          </p>
        </Container>
      </Section>
    </div>
  );
}
