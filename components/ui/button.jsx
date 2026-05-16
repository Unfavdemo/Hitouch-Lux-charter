import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  primary:
    "border-transparent bg-accent text-ink shadow-sm hover:brightness-110 focus-visible:outline-accent",
  secondary:
    "border-accent/45 bg-transparent text-heading hover:border-accent hover:bg-accent-soft/30",
  ghost:
    "border-transparent text-muted hover:bg-white/5 hover:text-heading",
  /** High-contrast ghost on dark photography (hero) */
  outlineLight:
    "border-2 border-white/95 bg-transparent text-heading shadow-sm hover:bg-white/10 hover:border-white",
  /** Primary actions on cream / white sections */
  onLight:
    "border-transparent bg-light-ink text-paper shadow-sm hover:bg-midnight focus-visible:outline-accent",
  /** Secondary on light backgrounds */
  onLightSecondary:
    "border-light-ink/15 bg-transparent text-light-ink hover:border-accent hover:bg-accent-soft/40",
};

export function Button({ variant = "primary", children, className = "", ...rest }) {
  const styles = `${base} ${variants[variant] ?? variants.primary} ${className}`;
  if ("href" in rest && rest.href) {
    const { href, type: _type, ...linkProps } = rest;
    return (
      <Link href={href} className={styles} {...linkProps}>
        {children}
      </Link>
    );
  }
  const { type = "button", ...btnRest } = rest;
  return (
    <button type={type} className={styles} {...btnRest}>
      {children}
    </button>
  );
}
