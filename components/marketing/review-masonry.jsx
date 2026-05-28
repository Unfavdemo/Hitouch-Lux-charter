function SourceBadge({ source }) {
  const label = source === "google" ? "Google" : "Yelp";
  const className =
    source === "google"
      ? "border-blue-400/30 bg-blue-950/40 text-blue-100"
      : "border-red-400/30 bg-red-950/40 text-red-100";
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${className}`}
    >
      {label}
    </span>
  );
}

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-accent" : "text-muted/40"}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewMasonry({ reviews, light = false }) {
  const cardClass = light
    ? "border-light-ink/10 bg-paper"
    : "border-border-subtle bg-surface";
  const textClass = light ? "text-light-ink" : "text-heading";
  const mutedClass = light ? "text-light-muted" : "text-charcoal";

  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {reviews.map((review) => (
        <article
          key={review.id}
          className={`mb-4 break-inside-avoid rounded-[var(--radius-card)] border p-5 shadow-sm ${cardClass}`}
        >
          <div className="flex items-center justify-between gap-2">
            <SourceBadge source={review.source} />
            <Stars rating={review.rating} />
          </div>
          <p className={`mt-4 text-sm leading-relaxed ${textClass}`}>&ldquo;{review.text}&rdquo;</p>
          <footer className={`mt-4 text-xs ${mutedClass}`}>
            <span className="font-medium">{review.author}</span>
            <span className="mx-2 opacity-50">·</span>
            <time dateTime={review.date}>{review.date}</time>
            {review.city ? (
              <>
                <span className="mx-2 opacity-50">·</span>
                <span>{review.city}</span>
              </>
            ) : null}
          </footer>
        </article>
      ))}
    </div>
  );
}
