/** Premium editorial card for interior marketing pages */
export function MarketingFeatureCard({
  title,
  children,
  footer,
  tone = "light",
  className = "",
  as: Tag = "article",
}) {
  const shell =
    tone === "dark" ? "luxury-card-dark" : tone === "glass" ? "luxury-card-glass" : "luxury-card-light";

  return (
    <Tag className={`${shell} group p-7 sm:p-8 lg:p-9 ${className}`}>
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
        aria-hidden
      />
      <div className="relative">
        {title ? (
          <h3
            className={`font-serif text-xl tracking-tight sm:text-2xl ${
              tone === "dark" ? "text-heading" : "text-light-ink"
            }`}
          >
            {title}
          </h3>
        ) : null}
        <div
          className={`${title ? "mt-4" : ""} text-sm leading-relaxed ${
            tone === "dark" ? "text-on-dark-body" : "text-light-muted"
          }`}
        >
          {children}
        </div>
        {footer ? <div className="mt-6 border-t border-accent/15 pt-5">{footer}</div> : null}
        <div
          className="mt-8 h-px w-10 bg-gradient-to-r from-accent/90 to-accent/20 transition-all duration-500 group-hover:w-16"
          aria-hidden
        />
      </div>
    </Tag>
  );
}
