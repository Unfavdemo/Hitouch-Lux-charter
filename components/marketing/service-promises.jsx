import { servicePromises } from "@/content/brand";
import { MarketingSectionHeading } from "@/components/marketing/marketing-section-heading";

/** The five service promises that define what HiTouch sells. */
export function ServicePromises({
  eyebrow = "Why HiTouch",
  title = "Five things we promise, and are measured against.",
  description = "We sell reliability, relationships, access, and attention to detail. Here is what that means in practice.",
  light = true,
}) {
  const cardClass = light
    ? "luxury-card-light"
    : "luxury-card-dark";
  const titleClass = light ? "text-light-ink" : "text-heading";
  const bodyClass = light ? "text-light-muted" : "text-on-dark-body";
  const numberClass = light ? "text-accent/45" : "text-accent-readable/40";

  return (
    <>
      <MarketingSectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        light={light}
      />
      <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servicePromises.map((promise, index) => (
          <li
            key={promise.id}
            className={`${cardClass} group flex flex-col p-7 sm:p-8 ${
              index === 3 ? "lg:col-start-1" : ""
            }`}
          >
            <span className={`font-serif text-3xl leading-none ${numberClass}`} aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className={`mt-5 font-serif text-xl uppercase tracking-[0.08em] sm:text-[1.35rem] ${titleClass}`}
            >
              {promise.title}
            </h3>
            <p className={`mt-4 flex-1 text-sm leading-relaxed ${bodyClass}`}>{promise.body}</p>
            <span
              className="mt-7 h-px w-10 bg-gradient-to-r from-accent/90 to-accent/20 transition-all duration-500 group-hover:w-16"
              aria-hidden
            />
          </li>
        ))}
      </ol>
    </>
  );
}
