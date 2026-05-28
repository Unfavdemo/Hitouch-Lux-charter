import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";

export function MarketingSectionHeading({
  eyebrow,
  title,
  description,
  light = true,
  align = "left",
  className = "",
}) {
  const titleClass = light ? "text-light-ink" : "text-heading";
  const descClass = light ? "text-light-muted" : "text-on-dark-body";
  const alignClass = align === "center" ? "mx-auto text-center items-center" : "";

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <LuxuryEyebrow light={light} className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </LuxuryEyebrow>
      ) : null}
      <h2
        className={`luxury-display mt-5 text-3xl sm:text-4xl lg:text-[2.65rem] ${titleClass} ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-5 h-px w-14 bg-gradient-to-r from-accent/90 to-transparent ${
          align === "center" ? "mx-auto" : ""
        }`}
        aria-hidden
      />
      {description ? (
        <p className={`mt-5 text-sm leading-relaxed sm:text-base ${descClass}`}>{description}</p>
      ) : null}
    </div>
  );
}
