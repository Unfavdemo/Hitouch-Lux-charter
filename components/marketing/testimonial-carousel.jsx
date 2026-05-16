"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export function TestimonialCarousel({ items, light = false }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [items.length, reduce]);

  const item = items[index];

  return (
    <div className="relative">
      <Card
        className={`overflow-hidden p-8 sm:p-10 ${
          light
            ? "border-light-ink/10 bg-cream shadow-sm"
            : ""
        }`}
      >
        <p
          className={`text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] ${
            light ? "text-accent" : "text-accent-readable"
          }`}
          aria-live="polite"
        >
          Client reflections
        </p>
        <motion.blockquote
          key={item.id}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={`mt-6 font-serif text-2xl leading-snug sm:text-3xl ${
            light ? "text-light-ink" : "text-heading"
          }`}
        >
          “{item.quote}”
        </motion.blockquote>
        <footer className={`mt-8 text-sm ${light ? "text-light-muted" : "text-muted"}`}>
          <span className={`font-medium ${light ? "text-light-ink" : "text-charcoal"}`}>
            {item.attribution}
          </span>
          <span className="mx-2 text-border-subtle">·</span>
          <span>{item.role}</span>
          <span className="mx-2 text-border-subtle">·</span>
          <span>{item.city}</span>
        </footer>
      </Card>

      <div
        className="mt-4 flex justify-center gap-2"
        role="tablist"
        aria-label="Testimonials"
      >
        {items.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`h-2 w-8 rounded-full border transition ${
              i === index
                ? "border-accent bg-accent"
                : light
                  ? "border-light-ink/15 bg-paper hover:border-accent/50"
                  : "border-border-subtle bg-surface hover:border-accent/50"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
