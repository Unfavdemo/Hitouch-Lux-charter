export function FaqList({ items }) {
  return (
    <div className="divide-y divide-border-subtle rounded-[var(--radius-card)] border border-border-subtle bg-surface">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-4 open:bg-page/60">
          <summary className="cursor-pointer list-none font-medium text-charcoal marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-4">
              <span>{item.question}</span>
              <span
                className="text-xs font-semibold uppercase tracking-widest text-muted transition group-open:rotate-180"
                aria-hidden
              >
                +
              </span>
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
