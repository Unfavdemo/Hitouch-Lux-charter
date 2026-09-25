import Image from "next/image";
import { owned } from "@/content/media";

const teamPhotos = [
  {
    src: owned.chauffeurSprinter,
    alt: "HiTouch chauffeur with Mercedes Sprinter at golden hour",
    caption: "Sprinter-ready",
  },
  {
    src: owned.team,
    alt: "HiTouch team standing in front of a branded black SUV",
    caption: "The standard, personified",
  },
  {
    src: owned.teamFull,
    alt: "Full-length portrait of the HiTouch team at a hotel entrance",
    caption: "Ready at the curb",
  },
  {
    src: owned.teamPortrait,
    alt: "Close portrait of HiTouch principals with fleet behind them",
    caption: "Quiet confidence",
  },
  {
    src: owned.doorService,
    alt: "HiTouch chauffeur opening the rear door of a branded SUV",
    caption: "Door service, every time",
  },
  {
    src: owned.sprinterNightExit,
    alt: "Guest exiting the lit Sprinter cabin at night",
    caption: "Night arrivals, handled",
  },
];

/** Owned team / service photography strip for the About page. */
export function AboutTeamGallery() {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {teamPhotos.map((photo, index) => (
        <figure
          key={photo.src}
          className={`group relative overflow-hidden rounded-[var(--radius-card)] border border-light-ink/10 bg-midnight ${
            index === 0 ? "sm:col-span-2 lg:col-span-2" : ""
          }`}
        >
          <div className={`relative w-full ${index === 0 ? "aspect-[16/10]" : "aspect-[4/5] sm:aspect-[3/4]"}`}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={index === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-heading">
              {photo.caption}
            </figcaption>
          </div>
        </figure>
      ))}
    </div>
  );
}
