export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-accent/15 bg-surface shadow-sm shadow-black/40 ring-1 ring-inset ring-accent/5 ${className}`}
    >
      {children}
    </div>
  );
}
