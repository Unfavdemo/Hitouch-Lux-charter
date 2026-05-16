"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HomeHero({ site }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[min(92vh,52rem)] overflow-hidden bg-midnight text-foreground">
      <Image
        src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2400&q=85"
        alt="Luxury vehicle interior with leather seating and ambient cabin lighting"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/75 to-midnight/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 via-transparent to-midnight/40" />

      <div className="relative mx-auto flex min-h-[min(92vh,52rem)] max-w-6xl flex-col justify-end px-4 pb-24 pt-36 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable"
        >
          Philadelphia · Tri-state executive chauffeur
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 0.05 }}
          className="mt-5 max-w-4xl font-serif text-4xl font-normal leading-[1.08] tracking-tight text-heading sm:text-5xl lg:text-6xl"
        >
          {site.tagline}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 0.1 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg lg:text-xl"
        >
          Premium transportation with discreet chauffeurs, immaculate vehicles, and optional
          executive protection—choreographed for boardroom privacy or celebration scale.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 0.15 }}
          className="mt-12 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Button
            href={site.moovsBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="sm:min-w-[240px]"
          >
            Reserve online
          </Button>
          <Button href="/fleet" variant="outlineLight" className="sm:min-w-[200px]">
            View fleet
          </Button>
        </motion.div>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.22 }}
          className="mt-6 text-sm text-foreground/75"
        >
          Private line{" "}
          <a
            className="font-medium text-heading underline decoration-accent/60 underline-offset-4"
            href={`tel:${site.phoneTel}`}
          >
            {site.phoneDisplay}
          </a>
        </motion.p>
      </div>
    </section>
  );
}
