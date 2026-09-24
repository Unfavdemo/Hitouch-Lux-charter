"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

function SpecItem({ label, value }) {
  return (
    <div className="rounded-md border border-white/10 bg-midnight/40 px-3 py-3">
      <dt className="text-[10px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
        {label}
      </dt>
      <dd className="mt-1 text-base font-medium text-heading">{value}</dd>
    </div>
  );
}

function galleryFor(vehicle) {
  if (Array.isArray(vehicle.gallery) && vehicle.gallery.length > 0) {
    return vehicle.gallery;
  }
  return [{ src: vehicle.imageSrc, alt: vehicle.imageAlt }];
}

export function FleetShowcase({ vehicles }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [detail, setDetail] = useState(null);

  const v = vehicles[index];
  const photos = useMemo(() => galleryFor(v), [v]);
  const activePhoto = photos[Math.min(photoIndex, photos.length - 1)] ?? photos[0];

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % vehicles.length);
    setPhotoIndex(0);
  }, [vehicles.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + vehicles.length) % vehicles.length);
    setPhotoIndex(0);
  }, [vehicles.length]);

  useEffect(() => {
    setPhotoIndex(0);
  }, [index]);

  useEffect(() => {
    if (!detail) return;
    const onKey = (e) => {
      if (e.key === "Escape") setDetail(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [detail]);

  const detailPhotos = detail ? galleryFor(detail) : [];

  return (
    <div>
      <div
        className="luxury-image-card overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Fleet showcase"
      >
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="relative min-h-[14rem] w-full aspect-[4/3] lg:aspect-auto lg:min-h-[24rem]">
            <Image
              key={`${v.id}-${activePhoto.src}`}
              src={activePhoto.src}
              alt={activePhoto.alt || v.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-midnight/40" />
            {photos.length > 1 ? (
              <p className="absolute bottom-3 left-3 rounded-md bg-midnight/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[var(--tracking-nav)] text-heading backdrop-blur-sm">
                Photo {photoIndex + 1} / {photos.length}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col justify-center border-t border-white/10 bg-gradient-to-b from-surface to-midnight p-8 sm:p-10 lg:border-t-0 lg:border-l">
            <LuxuryEyebrow light={false}>{v.class}</LuxuryEyebrow>
            <h3 className="mt-4 font-serif text-2xl text-heading sm:text-3xl">{v.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-on-dark-body sm:text-base">{v.tagline}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              <SpecItem label="Seats" value={v.passengers} />
              <SpecItem label="Luggage" value={`${v.luggage} bags`} />
              <SpecItem label="Wi‑Fi" value={v.wifi ? "Yes" : "On request"} />
              <SpecItem label="Partition" value={v.partition ? "Available" : "N/A"} />
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={() => setDetail(v)}>
                Specifications
              </Button>
              <Button
                href={site.moovsBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                Reserve vehicle
              </Button>
            </div>
          </div>
        </div>

        {photos.length > 1 ? (
          <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-midnight/60 px-4 py-3">
            {photos.map((photo, i) => (
              <button
                key={`${v.id}-photo-${i}`}
                type="button"
                onClick={() => setPhotoIndex(i)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition ${
                  i === photoIndex ? "border-accent" : "border-white/15 opacity-70 hover:opacity-100"
                }`}
                aria-label={`Show photo ${i + 1} of ${v.name}`}
                aria-current={i === photoIndex ? "true" : undefined}
              >
                <Image src={photo.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex items-center justify-between border-t border-white/10 bg-midnight/80 px-4 py-3">
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-[var(--tracking-nav)] text-heading hover:bg-white/10"
            onClick={prev}
            aria-label="Previous vehicle"
          >
            Prev
          </button>
          <p className="text-xs font-medium text-on-dark-muted">
            {index + 1} / {vehicles.length}
          </p>
          <button
            type="button"
            className="rounded-md border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-[var(--tracking-nav)] text-heading hover:bg-white/10"
            onClick={next}
            aria-label="Next vehicle"
          >
            Next
          </button>
        </div>
      </div>

      {/* Vehicle strip */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {vehicles.map((vehicle, i) => (
          <button
            key={vehicle.id}
            type="button"
            onClick={() => {
              setIndex(i);
              setPhotoIndex(0);
            }}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition ${
              i === index ? "border-accent" : "border-white/15 opacity-70 hover:opacity-100"
            }`}
            aria-label={`Show ${vehicle.name}`}
            aria-current={i === index ? "true" : undefined}
          >
            <Image src={vehicle.imageSrc} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {detail ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-midnight/70 backdrop-blur-sm"
              aria-label="Close fleet details"
              onClick={() => setDetail(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`fleet-${detail.id}-title`}
              initial={reduce ? undefined : { y: 24, opacity: 0 }}
              animate={reduce ? undefined : { y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: 16, opacity: 0 }}
              className="relative z-[81] m-4 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[var(--radius-card-lg)] border border-white/15 bg-surface p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <LuxuryEyebrow light={false}>Vehicle specifications</LuxuryEyebrow>
                  <h2
                    id={`fleet-${detail.id}-title`}
                    className="mt-3 font-serif text-3xl text-heading"
                  >
                    {detail.name}
                  </h2>
                  {detail.detailIntro ? (
                    <p className="mt-4 max-w-prose text-sm leading-relaxed text-on-dark-body">
                      {detail.detailIntro}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="rounded-md border border-white/20 px-3 py-1.5 text-xs uppercase tracking-widest text-heading hover:bg-white/10"
                  onClick={() => setDetail(null)}
                >
                  Close
                </button>
              </div>

              {detailPhotos.length > 0 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {detailPhotos.map((photo) => (
                    <div
                      key={photo.src}
                      className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt || detail.imageAlt}
                        fill
                        sizes="(min-width: 640px) 40vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {detail.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-md border border-white/10 bg-midnight/50 px-3 py-2 text-sm text-on-dark-body"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={site.moovsBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  Reserve online
                </Button>
                <Button type="button" variant="ghost" onClick={() => setDetail(null)}>
                  Return
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
