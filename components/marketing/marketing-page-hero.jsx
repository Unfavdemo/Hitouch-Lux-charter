"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";
import { Container } from "@/components/ui/container";

const fade = (reduce, delay = 0) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
      };

export function MarketingPageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  actions,
  variant = "image",
}) {
  const reduce = useReducedMotion();
  const isImage = variant === "image" && image;

  return (
    <section
      className={
        isImage
          ? "luxury-grain relative min-h-[min(52vh,36rem)] overflow-hidden bg-midnight pt-28 text-foreground sm:min-h-[min(56vh,40rem)]"
          : "luxury-grain luxury-mesh-cream relative overflow-hidden border-b border-light-ink/8 bg-cream pt-28 text-light-ink"
      }
    >
      {isImage ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100dvw"
            className="object-cover object-center opacity-45 saturate-[0.92] contrast-[1.05]"
          />
          <div className="absolute inset-0 luxury-mesh-dark" />
          <div className="absolute inset-0 hero-scrim-strong" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/85 via-midnight/30 to-midnight/60" />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            aria-hidden
          />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 luxury-mesh-light opacity-80" aria-hidden />
      )}

      <Container
        className={`relative z-[2] ${isImage ? "pb-16 sm:pb-20 lg:pb-28" : "pb-14 sm:pb-16"}`}
      >
        <div className="flex gap-5 sm:gap-8">
          <div
            className={`luxury-hero-accent mt-2 hidden w-px shrink-0 sm:block ${isImage ? "min-h-[8rem]" : "min-h-[6rem] opacity-80"}`}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <motion.div {...fade(reduce, 0)}>
              <LuxuryEyebrow light={!isImage}>{eyebrow}</LuxuryEyebrow>
            </motion.div>
            <motion.h1
              {...fade(reduce, 0.06)}
              className={`luxury-display mt-6 max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-[3.35rem] ${
                isImage ? "text-heading text-hero-shadow" : "text-light-ink"
              }`}
            >
              {title}
            </motion.h1>
            {description ? (
              <motion.p
                {...fade(reduce, 0.12)}
                className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${
                  isImage ? "text-on-dark-body" : "text-light-muted"
                }`}
              >
                {description}
              </motion.p>
            ) : null}
            {actions ? (
              <motion.div {...fade(reduce, 0.18)} className="mt-10 flex flex-wrap gap-3">
                {actions}
              </motion.div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
