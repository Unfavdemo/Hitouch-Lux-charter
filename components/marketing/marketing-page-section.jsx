import { Container } from "@/components/ui/container";

const toneClasses = {
  cream: "luxury-mesh-cream bg-cream text-light-ink",
  paper: "luxury-mesh-light bg-paper text-light-ink",
  dark: "luxury-grain luxury-mesh-dark bg-midnight text-foreground",
  surface: "bg-page text-foreground border-t border-border-subtle",
};

export function MarketingPageSection({
  tone = "cream",
  borderTop = false,
  className = "",
  containerClassName = "",
  id,
  children,
}) {
  const border =
    borderTop && tone !== "surface"
      ? tone === "dark"
        ? "border-t border-white/10"
        : "border-t border-light-ink/10"
      : "";

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-16 lg:py-28 ${toneClasses[tone] ?? toneClasses.cream} ${border} ${className}`}
    >
      {tone === "paper" ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          aria-hidden
          style={{
            backgroundImage:
              "repeating-linear-gradient(-12deg, transparent, transparent 48px, rgba(10,22,40,0.015) 48px, rgba(10,22,40,0.015) 49px)",
          }}
        />
      ) : null}
      <Container className={`relative ${containerClassName}`}>{children}</Container>
    </section>
  );
}
