import Image from "next/image";
import Link from "next/link";

export function ExperiencePackageCard({ pkg, index }) {
  const num = index != null ? String(index + 1).padStart(2, "0") : null;

  return (
    <Link href={pkg.href} className="luxury-image-card group flex flex-col bg-midnight/80">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.06] group-hover:saturate-110"
        />
        <div className="absolute inset-0 image-caption-scrim" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {num ? (
          <span
            className="absolute left-4 top-4 font-serif text-4xl leading-none text-accent-readable/45 transition-colors duration-500 group-hover:text-accent-readable/70"
            aria-hidden
          >
            {num}
          </span>
        ) : null}
      </div>
      <div className="relative flex flex-1 flex-col border-t border-white/10 bg-gradient-to-b from-surface/60 to-midnight p-6 sm:p-7">
        <h3 className="font-serif text-xl tracking-tight text-heading sm:text-2xl">{pkg.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-on-dark-body">{pkg.blurb}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
          Begin this experience
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
