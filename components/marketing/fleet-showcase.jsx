"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function FleetShowcase({ vehicles }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [detail, setDetail] = useState(null);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % vehicles.length);
  }, [vehicles.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + vehicles.length) % vehicles.length);
  }, [vehicles.length]);

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

  const v = vehicles[index];

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-[var(--radius-card)] border border-border-subtle bg-surface"
        role="region"
        aria-roledescription="carousel"
        aria-label="Fleet showcase"
      >
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[22rem]">
            <Image
              src={v.imageSrc}
              alt={v.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 to-transparent lg:bg-gradient-to-r" />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <Badge>{v.class.toUpperCase()}</Badge>
            <h3 className="mt-4 font-serif text-3xl text-heading">{v.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{v.tagline}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Passengers
                </dt>
                <dd className="mt-1 font-medium text-heading">{v.passengers}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Luggage
                </dt>
                <dd className="mt-1 font-medium text-heading">{v.luggage} bags</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Wi‑Fi
                </dt>
                <dd className="mt-1 font-medium text-heading">{v.wifi ? "Yes" : "On request"}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Partition
                </dt>
                <dd className="mt-1 font-medium text-heading">
                  {v.partition ? "Available" : "N/A"}
                </dd>
              </div>
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

        <div className="flex items-center justify-between border-t border-border-subtle px-4 py-3">
          <button
            type="button"
            className="rounded-md border border-border-subtle px-3 py-2 text-xs font-semibold uppercase tracking-[var(--tracking-nav)] text-foreground hover:bg-page"
            onClick={prev}
            aria-label="Previous vehicle"
          >
            Prev
          </button>
          <p className="text-xs text-muted">
            {index + 1} / {vehicles.length}
          </p>
          <button
            type="button"
            className="rounded-md border border-border-subtle px-3 py-2 text-xs font-semibold uppercase tracking-[var(--tracking-nav)] text-foreground hover:bg-page"
            onClick={next}
            aria-label="Next vehicle"
          >
            Next
          </button>
        </div>
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
              className="absolute inset-0 bg-midnight/60 backdrop-blur-sm"
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
              className="relative z-[81] m-4 w-full max-w-2xl rounded-[var(--radius-card)] border border-border-subtle bg-surface p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
                    Vehicle specifications
                  </p>
                  <h2
                    id={`fleet-${detail.id}-title`}
                    className="mt-2 font-serif text-3xl text-heading"
                  >
                    {detail.name}
                  </h2>
                  {detail.detailIntro ? (
                    <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
                      {detail.detailIntro}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="rounded-md border border-border-subtle px-2 py-1 text-xs uppercase tracking-widest text-muted hover:text-accent-readable"
                  onClick={() => setDetail(null)}
                >
                  Close
                </button>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {detail.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-md border border-border-subtle bg-page px-3 py-2 text-sm text-foreground"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={site.moovsBookingUrl} target="_blank" rel="noopener noreferrer" variant="primary">
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
