import { brandLines, brandPromise } from "@/content/brand";
import { Container } from "@/components/ui/container";

/**
 * The core brand statement. Appears on the home page and repeats across the
 * site so the promise reads identically everywhere.
 */
export function BrandPromiseBand({ lines = brandLines }) {
  return (
    <section className="luxury-grain relative overflow-hidden border-y border-accent/15 bg-midnight py-16 text-foreground lg:py-20">
      <div className="pointer-events-none absolute inset-0 luxury-mesh-dark" aria-hidden />
      <Container className="relative text-center">
        <p className="luxury-display mx-auto max-w-4xl text-3xl leading-[1.15] text-heading sm:text-4xl lg:text-[3rem]">
          You don&rsquo;t just book a vehicle.{" "}
          <span className="text-accent-readable">You have HiTouch.</span>
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-on-dark-body sm:text-base">
          {brandPromise.supporting}
        </p>
        {lines.length > 0 ? (
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-5">
            {lines.map((line) => (
              <li
                key={line}
                className="rounded-full border border-accent/25 bg-white/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-[var(--tracking-nav)] text-accent-readable sm:text-xs"
              >
                {line}
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}
