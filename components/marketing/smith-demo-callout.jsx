import Link from "next/link";

/**
 * Shown in demo/dev when the real Smith.ai widget is not configured.
 */
export function SmithDemoCallout() {
  const demoMode =
    process.env.NEXT_PUBLIC_DEMO_MODE === "1" || process.env.NODE_ENV === "development";
  const widgetOn =
    process.env.NEXT_PUBLIC_ENABLE_SMITH_AI === "1" &&
    Boolean(process.env.NEXT_PUBLIC_SMITH_AI_WIDGET_ID?.trim());

  if (!demoMode || widgetOn) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 max-w-xs rounded-lg border border-amber-400/30 bg-[#14120f]/95 p-4 shadow-xl backdrop-blur"
      role="complementary"
      aria-label="Demo concierge"
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-200/80">
        Demo · Smith.ai
      </p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-300">
        Virtual receptionist calls stage to the{" "}
        <Link href="/admin/intake" className="text-amber-200/90 underline">
          intake queue
        </Link>
        . No widget API key required locally.
      </p>
    </div>
  );
}
