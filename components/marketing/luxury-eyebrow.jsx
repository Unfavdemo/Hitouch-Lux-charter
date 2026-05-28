/** Ornamental small-caps label with gold flanking rules */
export function LuxuryEyebrow({ children, light = true, className = "" }) {
  const textClass = light ? "text-accent" : "text-accent-readable";
  const lineClass = light
    ? "bg-gradient-to-r from-transparent via-accent/70 to-transparent"
    : "bg-gradient-to-r from-transparent via-accent-readable/80 to-transparent";

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4 ${className}`}>
      <span className={`h-px w-6 shrink-0 sm:w-10 ${lineClass}`} aria-hidden />
      <p
        className={`max-w-full whitespace-normal text-[10px] font-semibold uppercase leading-snug tracking-[0.16em] sm:text-[11px] sm:tracking-[var(--tracking-brand)] ${textClass}`}
      >
        {children}
      </p>
      <span className={`hidden h-px min-w-[2rem] flex-1 sm:block ${lineClass}`} aria-hidden />
    </div>
  );
}
