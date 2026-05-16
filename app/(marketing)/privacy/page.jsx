import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Privacy",
  description: "How HiTouch Luxury Charter handles information submitted through this website, forms, and concierge workflows.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24">
      <Section className="bg-page pb-6 pt-10">
        <Container>
          <Badge>Legal</Badge>
          <h1 className="mt-4 font-serif text-4xl text-heading sm:text-5xl">Privacy policy</h1>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            Effective date: {new Date().getFullYear()}. This summary explains how we treat
            information collected through {site.brandName} digital touchpoints. For executed
            transportation agreements, additional confidentiality terms may apply.
          </p>
        </Container>
      </Section>

      <Section className="bg-surface pb-24">
        <Container>
          <article className="max-w-3xl space-y-8 text-sm leading-relaxed text-muted">
            <div>
              <h2 className="font-serif text-xl text-heading">Information we collect</h2>
              <p className="mt-3">
              When you submit forms, booking requests, or onboarding documents, we collect
              contact details, itinerary data, preferences, and billing identifiers necessary to
              fulfill the service. Device and analytics data may be collected in standard web
              logs for security and performance.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-heading">How we use information</h2>
              <p className="mt-3">
              We use submitted information to confirm availability, coordinate chauffeurs,
              communicate about your itinerary, and maintain duty-of-care records. Corporate
              accounts may receive additional reporting in line with executed contracts.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-heading">Sharing</h2>
              <p className="mt-3">
              We do not sell personal information. We may share limited data with operational
              partners (e.g., payment processors, insurance certificate issuers, or licensed
              security coordinators) strictly as required to deliver the transportation or
              protection services you request.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-heading">Retention</h2>
              <p className="mt-3">
              Records are retained for operational, accounting, and regulatory periods
              consistent with chauffeured transportation practice. You may request deletion where
              no longer required by law or contract, subject to verification.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-heading">Contact</h2>
              <p className="mt-3">
              For privacy inquiries, email{" "}
              <a className="text-heading underline decoration-accent/50" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              or call{" "}
              <a className="text-heading underline decoration-accent/50" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
              .
              </p>
            </div>
          </article>
        </Container>
      </Section>
    </div>
  );
}
