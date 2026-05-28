export function FaqList({ items, light = false }) {
  const shell = light
    ? "border-light-ink/10 bg-gradient-to-b from-paper to-cream"
    : "border-border-subtle bg-gradient-to-b from-surface to-page";
  const openBg = light ? "open:bg-white/90" : "open:bg-page/70";
  const questionClass = light ? "text-light-ink" : "text-charcoal";
  const answerClass = light ? "text-light-muted" : "text-charcoal";
  const toggleClass = light ? "text-accent" : "text-accent-readable";
  const divideClass = light ? "divide-light-ink/10" : "divide-border-subtle";

  return (
    <div
      className={`divide-y overflow-hidden rounded-[var(--radius-card-lg)] border shadow-[var(--shadow-luxury)] ${divideClass} ${shell}`}
    >
      {items.map((item, i) => (
        <details
          key={item.question}
          className={`group px-6 py-5 transition-colors sm:px-8 ${openBg}`}
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <summary
            className={`cursor-pointer list-none font-medium marker:content-none [&::-webkit-details-marker]:hidden ${questionClass}`}
          >
            <span className="flex items-center justify-between gap-6">
              <span className="pr-4 font-serif text-lg tracking-tight">{item.question}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition-all duration-300 group-open:rotate-45 ${
                  light
                    ? "border-accent/30 bg-accent/5 text-accent"
                    : "border-accent/40 bg-accent/10 text-accent-readable"
                }`}
                aria-hidden
              >
                +
              </span>
            </span>
          </summary>
          <p className={`mt-5 max-w-3xl border-t border-accent/10 pt-5 text-sm leading-relaxed ${answerClass}`}>
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
