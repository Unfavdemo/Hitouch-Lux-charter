export function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-accent/35 bg-accent-soft/40 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent ${className}`}
    >
      {children}
    </span>
  );
}
