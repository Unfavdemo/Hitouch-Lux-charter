import Image from "next/image";
import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { membershipTeaser } from "@/content/home";
import { membershipBenefits } from "@/content/memberships";

/** Home page membership feature, routed at the Request Membership conversion. */
export function HomeMembershipTeaser() {
  return (
    <section className="luxury-mesh-cream relative overflow-hidden border-y border-light-ink/10 bg-cream py-20 text-light-ink lg:py-28">
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <LuxuryEyebrow>{membershipTeaser.eyebrow}</LuxuryEyebrow>
            <h2 className="luxury-display mt-6 text-3xl leading-tight text-light-ink sm:text-4xl lg:text-[2.75rem]">
              {membershipTeaser.headline}
            </h2>
            <div className="mt-6 h-px w-14 bg-gradient-to-r from-accent/90 to-transparent" aria-hidden />
            <p className="mt-7 max-w-xl text-base leading-relaxed text-light-muted">
              {membershipTeaser.supporting}
            </p>

            <ul className="mt-9 grid gap-2.5 sm:grid-cols-2">
              {membershipBenefits.map((benefit) => (
                <li key={benefit.id} className="flex gap-2.5 text-sm text-light-ink/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>{benefit.title}</span>
                </li>
              ))}
            </ul>

            <p className="mt-9 rounded-[var(--radius-card)] border border-accent/25 bg-accent-soft/20 px-5 py-4 text-sm leading-relaxed text-light-ink">
              {membershipTeaser.note}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={membershipTeaser.primaryCta.href} variant="onLight">
                {membershipTeaser.primaryCta.label}
              </Button>
              <Button href={membershipTeaser.secondaryCta.href} variant="onLightSecondary">
                {membershipTeaser.secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="luxury-image-card relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={membershipTeaser.image}
                alt={membershipTeaser.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 image-caption-scrim opacity-80" />
              <p className="absolute bottom-6 left-6 right-6 font-serif text-2xl leading-snug text-heading text-hero-shadow sm:text-3xl">
                Once you&rsquo;re with HiTouch, you&rsquo;re taken care of.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
