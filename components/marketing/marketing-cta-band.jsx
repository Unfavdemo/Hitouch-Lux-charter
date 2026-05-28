import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function MarketingCtaBand({
  eyebrow = "Begin your experience",
  title,
  description,
  primaryHref,
  primaryLabel,
  primaryExternal = false,
  secondaryHref,
  secondaryLabel,
  tone = "dark",
}) {
  const isLight = tone === "cream";
  const panelClass = isLight ? "luxury-cta-panel-light" : "luxury-cta-panel";
  const titleClass = isLight ? "text-light-ink" : "text-heading";
  const descClass = isLight ? "text-light-muted" : "text-on-dark-body";

  return (
    <section className={`relative py-16 lg:py-24 ${isLight ? "luxury-mesh-cream bg-cream" : "luxury-grain bg-midnight"}`}>
      {!isLight ? <div className="pointer-events-none absolute inset-0 luxury-mesh-dark" aria-hidden /> : null}
      <Container className="relative">
        <div className={`${panelClass} p-8 sm:p-10 lg:p-12`}>
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <LuxuryEyebrow light={isLight}>{eyebrow}</LuxuryEyebrow>
              <h2 className={`luxury-display mt-5 text-3xl sm:text-4xl ${titleClass}`}>{title}</h2>
              {description ? (
                <p className={`mt-4 text-sm leading-relaxed sm:text-base ${descClass}`}>{description}</p>
              ) : null}
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              {primaryHref ? (
                <Button
                  href={primaryHref}
                  variant={isLight ? "onLight" : "primary"}
                  target={primaryExternal ? "_blank" : undefined}
                  rel={primaryExternal ? "noopener noreferrer" : undefined}
                  className="justify-center shadow-lg sm:min-w-[240px]"
                >
                  {primaryLabel}
                </Button>
              ) : null}
              {secondaryHref && secondaryLabel ? (
                <Button
                  href={secondaryHref}
                  variant={isLight ? "onLightSecondary" : "secondary"}
                  className={
                    isLight
                      ? "justify-center sm:min-w-[200px]"
                      : "justify-center border-heading/35 text-heading hover:bg-white/10 sm:min-w-[200px]"
                  }
                >
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
