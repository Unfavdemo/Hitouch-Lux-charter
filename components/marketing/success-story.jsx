import Image from "next/image";
import { ReviewMasonry } from "@/components/marketing/review-masonry";

export function SuccessStory({ award, reviews, light = false }) {
  const headingClass = light ? "text-light-ink" : "text-heading";
  const mutedClass = light ? "text-light-muted" : "text-charcoal";

  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-accent/50 bg-accent-soft/20 shadow-lg shadow-accent/10 sm:h-32 sm:w-32">
          {award.badgeImage ? (
            <Image src={award.badgeImage} alt={award.title} fill className="object-contain p-4" />
          ) : (
            <div className="px-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
                Award
              </p>
              <p className="mt-1 font-serif text-lg leading-tight text-heading">{award.year}</p>
            </div>
          )}
        </div>
        <h2 className={`mt-6 font-serif text-3xl tracking-tight sm:text-4xl ${headingClass}`}>
          {award.title}
        </h2>
        <p className={`mt-2 max-w-lg text-sm ${mutedClass}`}>{award.subtitle}</p>
      </div>

      <div className="mt-14">
        <p className={`text-center text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] ${light ? "text-accent" : "text-accent-readable"}`}>
          Guest reflections
        </p>
        <p className={`mt-3 text-center text-sm ${mutedClass}`}>
          Imported review placeholders — ready for Google and Yelp API wiring.
        </p>
        <div className="mt-10">
          <ReviewMasonry reviews={reviews} light={light} />
        </div>
      </div>
    </div>
  );
}
