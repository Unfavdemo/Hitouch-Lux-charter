import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Terms",
  description: "Terms of use for the HiTouch Luxury Charter website and digital concierge tools.",
};

export default function TermsPage() {
  return (
    <div className="pt-24">
      <Section className="bg-page pb-6 pt-10">
        <Container>
          <Badge>Legal</Badge>
          <h1 className="mt-4 font-serif text-4xl text-heading sm:text-5xl">Terms of use</h1>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            By using {site.brandName} websites, booking tools, or email correspondence, you
            agree to these terms. Transportation services themselves are governed by separate
            confirmations and contracts where applicable.
          </p>
        </Container>
      </Section>

      <Section className="bg-surface pb-24">
        <Container>
          <article className="max-w-3xl space-y-8 text-sm leading-relaxed text-muted">
            <div>
              <h2 className="font-serif text-xl text-heading">Website accuracy</h2>
              <p className="mt-3">
              Content on this site—including sample pricing, vehicle imagery, and descriptive
              copy—is provided for planning purposes and may change without notice. Final terms
              appear in written confirmations from our concierge team.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-heading">Acceptable use</h2>
              <p className="mt-3">
              You agree not to misuse forms, APIs, or contact channels for harassment, fraud, or
              unlawful requests. We reserve the right to refuse service that violates law or
              operational safety policies.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-heading">Third-party tools</h2>
              <p className="mt-3">
              External booking links (including Moovs) are subject to the third party&apos;s own
              terms. HiTouch is not responsible for outages or policy changes on external
              platforms.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-heading">Limitation of liability</h2>
              <p className="mt-3">
              To the maximum extent permitted by law, {site.brandName} disclaims liability for
              indirect or consequential damages arising from use of this website. Some
              jurisdictions do not allow certain limitations; in those cases, limitations apply
              only to the extent permitted.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl text-heading">Contact</h2>
              <p className="mt-3">
              Questions about these terms:{" "}
              <a className="text-heading underline decoration-accent/50" href={`mailto:${site.email}`}>
                {site.email}
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
