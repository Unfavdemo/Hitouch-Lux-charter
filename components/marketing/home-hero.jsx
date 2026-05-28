"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { heroContent } from "@/content/home";
import { Button } from "@/components/ui/button";

export function HomeHero({ site }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-midnight text-foreground md:min-h-[min(92vh,52rem)]">
      <Image
        src={heroContent.image}
        alt={heroContent.imageAlt}
        fill
        priority
        sizes="100dvw"
        className="object-cover object-center opacity-50"
      />
      <div className="absolute inset-0 hero-scrim-strong" />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/85 via-midnight/30 to-midnight/55" />

      <div className="relative mx-auto flex max-w-6xl flex-col justify-start px-4 pb-16 pt-28 sm:px-6 sm:pb-20 md:min-h-[min(92vh,52rem)] md:justify-end md:pb-24 md:pt-36 lg:px-8 lg:pb-28 lg:pt-40">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable"
        >
          {heroContent.eyebrow}
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 0.05 }}
          className="mt-5 max-w-4xl font-serif text-4xl font-normal leading-[1.08] tracking-tight text-heading text-hero-shadow sm:text-5xl lg:text-6xl"
        >
          {heroContent.headline}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 0.1 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-on-dark-body sm:text-lg lg:text-xl"
        >
          {heroContent.supporting}
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 0.15 }}
          className="mt-12 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Button
            href={heroContent.primaryCta.href}
            variant="primary"
            className="sm:min-w-[260px]"
          >
            {heroContent.primaryCta.label}
          </Button>
          <Button
            href={heroContent.secondaryCta.href}
            variant="outlineLight"
            className="sm:min-w-[220px]"
          >
            {heroContent.secondaryCta.label}
          </Button>
        </motion.div>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.22 }}
          className="mt-6 text-sm text-charcoal"
        >
          Experience concierge{" "}
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
