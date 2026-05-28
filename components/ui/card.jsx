export function Card({ children, className = "", variant = "default" }) {
  const variants = {
    /** Dark panels (forms, admin) */
    default:
      "rounded-[var(--radius-card-lg)] border border-accent/15 bg-surface shadow-sm shadow-black/40 ring-1 ring-inset ring-accent/5",
    /** Cream / paper marketing cards */
    light:
      "rounded-[var(--radius-card-lg)] border border-light-ink/10 bg-cream text-light-ink shadow-[var(--shadow-luxury)]",
    luxury: "luxury-card-light",
    luxuryDark: "luxury-card-dark",
  };

  return (
    <div className={`${variants[variant] ?? variants.default} ${className}`.trim()}>
      {children}
    </div>
  );
}
